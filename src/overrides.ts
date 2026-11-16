import { existsSync, readFileSync } from "fs";
import { normalizeModelName } from "./filters.js";
import type { RouterTechData } from "./types.js";

// Hand-maintained corrections that cannot be derived automatically (e.g. whether the
// UART header is exposed). Keyed by model name (any spelling, normalized on load);
// every field is applied last, on top of crawled + si data. Keys starting with "_" are ignored.
//
// manual-overrides.json
// {
//   "AX3000plus": { "uart_exposed": false, "uart_note": "UART 핀 미노출, 패드에 납땜 필요" }
// }

export const OVERRIDES_PATH = "./manual-overrides.json";

type Override = Partial<RouterTechData> & Record<string, unknown>;

let cache: Map<string, Override> | undefined;

function loadOverrides(path: string): Map<string, Override> {
  if (cache) return cache;
  cache = new Map();
  if (!existsSync(path)) return cache;

  const raw = JSON.parse(readFileSync(path, "utf-8")) as Record<string, Override>;
  for (const [model, override] of Object.entries(raw)) {
    if (model.startsWith("_")) continue;
    cache.set(normalizeModelName(model), override);
  }
  return cache;
}

export function applyManualOverrides(techdata: RouterTechData, path = OVERRIDES_PATH): RouterTechData {
  const override = loadOverrides(path).get(normalizeModelName(techdata.model));
  if (!override) return techdata;

  const fields = Object.fromEntries(Object.entries(override).filter(([key]) => !key.startsWith("_")));
  return { ...techdata, ...fields };
}
