import { readFileSync } from "fs";
import { withJsonCache } from "./cache.js";
import { fetchCategoryProducts, routerCategories } from "./crawler.js";
import { normalizeModelName } from "./filters.js";
import { WifiStandard, type ProductLink } from "./types.js";

export const wifiStandardDirectories: Partial<Record<WifiStandard, string>> = {
  [WifiStandard.Wifi5]: "11ac_11n",
  [WifiStandard.Wifi6]: "11ax",
  [WifiStandard.Wifi7]: "11be",
};

export function findWifiStandardDirectory(wifiStandard: WifiStandard): string {
  return wifiStandardDirectories[wifiStandard] ?? "unknown";
}

export function readRouterModels(filePath: string): string[] {
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

// Wi-Fi standards that are worth tracking for OpenWrt porting (11n-only boards are 4/32 or 8/64 class).
export const TARGET_WIFI_STANDARDS = new Set<WifiStandard>([WifiStandard.Wifi5, WifiStandard.Wifi6, WifiStandard.Wifi7]);

// Every router model is a candidate here: names like N604/N8004R/EW302N do not tell the Wi-Fi
// standard, so the final decision is made from the product page spec in buildRouterTechData().
export function readTargetRouterModels(): string[] {
  return readRouterModels("./iptime-router-models.json");
}

export function isTargetWifiStandard(wifiStandard: WifiStandard): boolean {
  return TARGET_WIFI_STANDARDS.has(wifiStandard);
}

async function fetchRouterLinks(): Promise<ProductLink[]> {
  const links: ProductLink[] = [];

  for (const category of routerCategories) {
    links.push(...(await fetchCategoryProducts(category)));
  }

  return links;
}

export async function loadLinkByModel(): Promise<Map<string, ProductLink>> {
  const routerLinks = await withJsonCache("./cache/product-links.json", fetchRouterLinks);
  const linkByModel = new Map<string, ProductLink>();

  for (const link of routerLinks) {
    const key = normalizeModelName(link.name);
    if (!linkByModel.has(key)) {
      linkByModel.set(key, link);
    }
  }

  return linkByModel;
}
