import { createWriteStream, existsSync, mkdirSync, renameSync } from "fs";
import { basename, join } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import type { ReadableStream } from "stream/web";
import { fetchWithRetry } from "./crawler.js";
import type { FirmwareFile, FirmwareRelease } from "./types.js";

function compareVersion(a: string, b: string): number {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

function isOfficialRelease(release: FirmwareRelease): boolean {
  return !/베타|beta|테스트/i.test(release.title) && release.version.length > 0 && release.files.length > 0;
}

export function selectLatestRelease(releases: FirmwareRelease[]): FirmwareRelease | undefined {
  return releases.filter(isOfficialRelease).sort((a, b) => compareVersion(b.version, a.version))[0];
}

export async function downloadFile(file: FirmwareFile, directory: string): Promise<string> {
  const filePath = join(directory, basename(file.name));

  if (existsSync(filePath)) {
    return filePath;
  }

  mkdirSync(directory, { recursive: true });

  const response = await fetchWithRetry(file.url);
  const partialPath = `${filePath}.part`;

  await pipeline(Readable.fromWeb(response.body as ReadableStream), createWriteStream(partialPath));
  renameSync(partialPath, filePath);

  return filePath;
}
