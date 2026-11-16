// Fill porting/prices.json `price_krw` (new, lowest price) from Danawa search results.
//
//   pnpm prices              # every model in prices.json (skips manually entered prices)
//   pnpm prices --force      # also overwrite manually entered prices
//   pnpm prices a2004se ...  # only these keys
//
// `used_price_krw` is never touched here — fill it by hand.
//
// Danawa search (search.danawa.com) is a Next.js page; the product list is embedded in the
// React Server Components flight data (self.__next_f.push) as a dehydrated react-query state.
// Only Danawa catalog entries (companyCode "dna") are used — shop listings there include used
// units, refurbished units and accessories (power adapters) with the model name in the title.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PRICES_PATH = join(import.meta.dirname, "..", "porting", "prices.json");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const DELAY_MS = 800;

export interface PriceEntry {
  model: string;
  price_krw: number | null; // new, lowest price (crawled)
  used_price_krw?: number | null; // used price (manual)
  source: string;
  checked_at: string;
  note: string;
}

interface DanawaProduct {
  productSeq: string;
  productName: string;
  companyCode: string;
  minPrice: number;
  priceCompareStatusType?: string;
  shopCount?: number;
  makeDate?: string;
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const onlyKeys = new Set(args.filter((a) => !a.startsWith("--")));

const stripTags = (s: string) => s.replace(/<[^>]*>/g, "");
const norm = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);

/** Extract the `products` array from the RSC flight data of a Danawa search page. */
export function parseDanawaProducts(html: string): DanawaProduct[] {
  let flight = "";
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) flight += JSON.parse(m[1]!) as string;
  const marker = '"products":[';
  const at = flight.indexOf(marker);
  if (at < 0) return [];
  const start = at + marker.length - 1;
  let depth = 0;
  for (let j = start; j < flight.length; j++) {
    const c = flight[j];
    if (c === '"') {
      for (j++; flight[j] !== '"'; j++) if (flight[j] === "\\") j++;
      continue;
    }
    if (c === "[" || c === "{") depth++;
    else if (c === "]" || c === "}") {
      if (--depth === 0) return JSON.parse(flight.slice(start, j + 1)) as DanawaProduct[];
    }
  }
  return [];
}

/** True if 1–3 consecutive words of the product name spell exactly the model (e.g. "A3004NS" + "dual"). */
function nameMatchesModel(productName: string, model: string): boolean {
  const target = norm(model);
  const words = stripTags(productName).split(/\s+/).filter(Boolean);
  for (let i = 0; i < words.length; i++) {
    let joined = "";
    for (let n = 0; n < 3 && i + n < words.length; n++) {
      joined += norm(words[i + n]!);
      if (joined === target) return true;
      if (joined.length >= target.length) break;
    }
  }
  return false;
}

async function searchDanawa(query: string): Promise<DanawaProduct[]> {
  const url = `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(query)}`;
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA, "accept-language": "ko-KR,ko;q=0.9" } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return parseDanawaProducts(await res.text());
    } catch (e) {
      if (attempt >= 3) throw new Error(`Danawa search failed for "${query}": ${e}`);
      await sleep(attempt * 2000);
    }
  }
}

async function main() {
  if (!existsSync(PRICES_PATH)) throw new Error(`${PRICES_PATH} 없음 — 먼저 pnpm candidates 실행`);
  const prices = JSON.parse(readFileSync(PRICES_PATH, "utf-8")) as Record<string, PriceEntry>;

  const keys = Object.keys(prices).filter((k) => onlyKeys.size === 0 || onlyKeys.has(k));
  const allModels = Object.values(prices).map((p) => p.model.replace(/^ipTIME\s+/i, ""));
  let filled = 0, missing = 0, skipped = 0;

  for (const [i, key] of keys.entries()) {
    const entry = prices[key]!;
    entry.used_price_krw ??= null;
    const manual = entry.price_krw != null && entry.source !== "" && !entry.source.includes("danawa.com");
    if (manual && !FORCE) {
      skipped++;
      console.log(`[${i + 1}/${keys.length}] ${entry.model}: 수동 입력 유지 (${entry.price_krw})`);
      continue;
    }

    const shortModel = entry.model.replace(/^ipTIME\s+/i, "");
    const products = await searchDanawa(`ipTIME ${shortModel}`);
    // reject e.g. "A2004 plus" for A2004: the name must not also spell a longer known model
    const longer = allModels.filter((m) => norm(m).length > norm(shortModel).length && norm(m).startsWith(norm(shortModel)));
    const catalog = products.filter(
      (p) =>
        p.companyCode === "dna" &&
        nameMatchesModel(p.productName, shortModel) &&
        !longer.some((m) => nameMatchesModel(p.productName, m)),
    );
    const priced = catalog.filter((p) => p.minPrice > 0).sort((a, b) => a.minPrice - b.minPrice);
    const best = priced[0] ?? catalog[0];

    entry.checked_at = today();
    if (best) {
      entry.price_krw = best.minPrice > 0 ? best.minPrice : null;
      entry.source = `https://prod.danawa.com/info/?pcode=${best.productSeq}`;
      entry.note =
        best.minPrice > 0
          ? `다나와 최저가 (${best.priceCompareStatusType ?? ""}${best.shopCount ? `, ${best.shopCount}개 몰` : ""}) · ${stripTags(best.productName)}` +
            ((best.shopCount ?? 0) <= 3 || best.priceCompareStatusType === "단종"
              ? " · ⚠ 판매처 적음/단종 — 재고 매물 가격일 수 있음"
              : "")
          : `다나와 등록됨, 판매처 없음 (${best.priceCompareStatusType || "단종/품절"}) · ${stripTags(best.productName)}`;
      if (entry.price_krw != null) filled++;
      else missing++;
    } else {
      entry.price_krw = null;
      entry.source = "";
      entry.note = "다나와 카탈로그에 없음";
      missing++;
    }
    console.log(`[${i + 1}/${keys.length}] ${entry.model}: ${entry.price_krw ?? "-"} ${entry.note}`);
    await sleep(DELAY_MS);
  }

  writeFileSync(PRICES_PATH, JSON.stringify(prices, null, 2) + "\n");
  console.log(`\n가격 채움 ${filled} · 가격 없음 ${missing} · 수동 유지 ${skipped} → ${PRICES_PATH}`);
}

await main();
