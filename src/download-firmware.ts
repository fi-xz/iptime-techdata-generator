import { readFileSync } from "fs";
import { relative } from "path";
import { writeJsonFile } from "./cache.js";
import { fetchFirmwareReleases, mapConcurrent } from "./crawler.js";
import { normalizeModelName } from "./filters.js";
import { downloadFile, selectLatestRelease } from "./firmware.js";
import { findWifiStandardDirectory, loadLinkByModel } from "./models.js";
import type { FirmwareRelease, RouterTechData } from "./types.js";

const FIRMWARE_DIRECTORY = "./firmware";

interface FirmwareManifest {
  model: string;
  wifi_standard: string;
  release: FirmwareRelease;
  paths: string[];
}

const routerTechDataList: RouterTechData[] = JSON.parse(readFileSync("./techdata/techdata.json", "utf-8"));
const linkByModel = await loadLinkByModel();

const manifests: FirmwareManifest[] = [];
const failedModels: Record<string, string> = {};
let count = 0;

await mapConcurrent(routerTechDataList, async (routerTechData) => {
  const model = routerTechData.model;

  try {
    const link = linkByModel.get(normalizeModelName(model));
    if (!link) {
      throw new Error("product page not found");
    }

    const release = selectLatestRelease(await fetchFirmwareReleases(link));
    if (!release) {
      throw new Error("official firmware not found");
    }

    const directory = `${FIRMWARE_DIRECTORY}/${findWifiStandardDirectory(routerTechData.wifi_standard)}/${normalizeModelName(model)}`;
    const paths: string[] = [];

    for (const file of release.files) {
      paths.push(relative(FIRMWARE_DIRECTORY, await downloadFile(file, directory)).replaceAll("\\", "/"));
    }

    manifests.push({ model: model, wifi_standard: routerTechData.wifi_standard, release: release, paths: paths });
    console.log(`[${++count}/${routerTechDataList.length}] ${model} ${release.version}`);
  } catch (error) {
    failedModels[model] = error instanceof Error ? error.message : String(error);
    console.error(`[${++count}/${routerTechDataList.length}] ${model} failed: ${failedModels[model]}`);
  }
});

manifests.sort((a, b) => a.model.localeCompare(b.model));

writeJsonFile(`${FIRMWARE_DIRECTORY}/index.json`, { firmwares: manifests, failed: failedModels });

console.log(`Downloaded ${manifests.length} firmwares, failed ${Object.keys(failedModels).length} models`);
