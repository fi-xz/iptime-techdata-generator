import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";

export async function withJsonCache<T>(filePath: string, load: () => Promise<T>): Promise<T> {
  if (existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  }

  const data = await load();
  writeJsonFile(filePath, data);

  return data;
}

export function writeJsonFile(filePath: string, data: unknown) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
