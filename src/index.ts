import { withJsonCache, writeJsonFile } from "./cache.js";
import { fetchProductPages } from "./crawler.js";
import { normalizeModelName } from "./filters.js";
import { findWifiStandardDirectory, isTargetWifiStandard, loadLinkByModel, readTargetRouterModels } from "./models.js";
import { deviceModelKeys, loadSnapshot } from "./porting/snapshot.js";
import { buildRouterTechData } from "./techdata.js";
import { SocVendor, WifiStandard, type ProductPage, type RouterTechData } from "./types.js";

// upstream ipTIME devices (target/linux/*/image) from snapshot.json — `pnpm snapshot` to update
const snapshot = await loadSnapshot();
const openwrtSupportedKeys = new Set(snapshot.upstream_devices.flatMap(deviceModelKeys));

const wifiFiveBroadcomModels: string[] = [];
const wifiFiveRealtekModels: string[] = [];
const wifiFiveMediatekModels: string[] = [];

const wifiSixBroadcomModels: string[] = [];
const wifiSixRealtekModels: string[] = [];
const wifiSixMediatekModels: string[] = [];

const wifiSevenBroadcomModels: string[] = [];
const wifiSevenRealtekModels: string[] = [];
const wifiSevenMediatekModels: string[] = [];

const otherModels: Record<string, string[]> = {};
const missingModels: string[] = [];

const modelGroups: Partial<Record<WifiStandard, Partial<Record<SocVendor, string[]>>>> = {
  [WifiStandard.Wifi5]: {
    [SocVendor.Broadcom]: wifiFiveBroadcomModels,
    [SocVendor.Realtek]: wifiFiveRealtekModels,
    [SocVendor.MediaTek]: wifiFiveMediatekModels,
  },
  [WifiStandard.Wifi6]: {
    [SocVendor.Broadcom]: wifiSixBroadcomModels,
    [SocVendor.Realtek]: wifiSixRealtekModels,
    [SocVendor.MediaTek]: wifiSixMediatekModels,
  },
  [WifiStandard.Wifi7]: {
    [SocVendor.Broadcom]: wifiSevenBroadcomModels,
    [SocVendor.Realtek]: wifiSevenRealtekModels,
    [SocVendor.MediaTek]: wifiSevenMediatekModels,
  },
};

function groupRouterModel(routerTechData: RouterTechData) {
  const group = modelGroups[routerTechData.wifi_standard]?.[routerTechData.soc_vendor];

  if (group) {
    group.push(routerTechData.model);
  } else {
    const key = `${routerTechData.wifi_standard} / ${routerTechData.soc_vendor}`;
    (otherModels[key] ??= []).push(routerTechData.model);
  }
}

const routerModels = readTargetRouterModels();
const linkByModel = await loadLinkByModel();

const targetLinks = routerModels
  .map((model) => linkByModel.get(normalizeModelName(model)))
  .filter((link) => link !== undefined);

// incremental: only fetch pages that are not cached yet (the model list may grow)
const PRODUCT_PAGES_PATH = "./cache/product-pages.json";
const cachedPages = await withJsonCache<ProductPage[]>(PRODUCT_PAGES_PATH, async () => []);
const cachedUrls = new Set(cachedPages.map((page) => page.link.url));
const newLinks = [...new Map(targetLinks.filter((link) => !cachedUrls.has(link.url)).map((link) => [link.url, link])).values()];
const productPages = newLinks.length > 0 ? [...cachedPages, ...(await fetchProductPages(newLinks))] : cachedPages;
if (newLinks.length > 0) writeJsonFile(PRODUCT_PAGES_PATH, productPages);

const pageByUrl = new Map<string, ProductPage>(productPages.map((page) => [page.link.url, page]));
const routerTechDataList: RouterTechData[] = [];
const excludedModels: Record<string, string> = {};

for (const model of routerModels) {
  const link = linkByModel.get(normalizeModelName(model));
  const page = link && pageByUrl.get(link.url);

  if (!page) {
    missingModels.push(model);
    continue;
  }

  const routerTechData = buildRouterTechData(model, page);
  if (!isTargetWifiStandard(routerTechData.wifi_standard)) {
    excludedModels[model] = routerTechData.wifi_standard;
    continue;
  }
  groupRouterModel(routerTechData);

  routerTechDataList.push(routerTechData);
  const directory = findWifiStandardDirectory(routerTechData.wifi_standard);
  writeJsonFile(`./techdata/${directory}/${normalizeModelName(model)}.json`, routerTechData);
}

writeJsonFile("./techdata/index.json", {
  openwrt_supported: routerTechDataList
    .map((routerTechData) => routerTechData.model)
    .filter((model) => openwrtSupportedKeys.has(normalizeModelName(model)))
    .sort((a, b) => a.localeCompare(b)),
  openwrt_snapshot: { fetched_at: snapshot.fetched_at, openwrt_tree_sha: snapshot.openwrt_tree_sha },
  wifi5: {
    broadcom: wifiFiveBroadcomModels,
    realtek: wifiFiveRealtekModels,
    mediatek: wifiFiveMediatekModels,
  },
  wifi6: {
    broadcom: wifiSixBroadcomModels,
    realtek: wifiSixRealtekModels,
    mediatek: wifiSixMediatekModels,
  },
  wifi7: {
    broadcom: wifiSevenBroadcomModels,
    realtek: wifiSevenRealtekModels,
    mediatek: wifiSevenMediatekModels,
  },
  others: otherModels,
  excluded_wifi_standard: excludedModels, // Wi-Fi 4 / unknown per product page spec
  missing: missingModels,
});
writeJsonFile("./techdata/techdata.json", routerTechDataList);

console.log(
  `Generated ${routerTechDataList.length} techdata, excluded ${Object.keys(excludedModels).length} (Wi-Fi 4/unknown), missing ${missingModels.length} models`,
);
