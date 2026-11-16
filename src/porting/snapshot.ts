import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { writeJsonFile } from "../cache.js";
import { normalizeModelName } from "../filters.js";

// Fetches a point-in-time snapshot of everything OpenWrt knows about ipTIME:
//  - GitHub issues / PRs mentioning ipTIME (openwrt/openwrt)
//  - upstream device definitions (target/linux/*/image/*.mk) and DTS files
//  - per-SoC DTS counts (how mature the platform is upstream)
//  - model ids known by firmware-utils' iptime-crc32 (factory image tooling)

const REPO = "openwrt/openwrt";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const CRC32_URL = "https://raw.githubusercontent.com/openwrt/firmware-utils/master/src/iptime-crc32.c";

export const SNAPSHOT_PATH = "./snapshot.json";

// ipTIME `define Device/...` blocks added by an open PR (parsed from the PR's image makefile patches)
export interface PrDevice {
  device: string;
  model: string;
  variant: string;
  dts: string[];
  iptime_crc32_id: string;
}

export interface GithubItem {
  number: number;
  title: string;
  is_pr: boolean;
  state: "open" | "closed";
  merged: boolean;
  draft: boolean;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
  labels: string[];
  pr_devices?: PrDevice[]; // open PRs only; missing in snapshots taken before this field existed
}

export interface UpstreamDevice {
  target: string;
  makefile: string;
  device: string;
  vendor: string;
  model: string;
  variant: string;
  dts: string[];
  uimage_name: string;
  iptime_crc32_id: string;
}

export interface Snapshot {
  fetched_at: string;
  openwrt_branch: string;
  openwrt_tree_sha: string;
  github_query: string;
  github_items: GithubItem[];
  upstream_devices: UpstreamDevice[];
  upstream_iptime_dts: string[];
  dts_count_by_soc: Record<string, number>;
  iptime_crc32_models: string[];
}

function githubToken(): string | undefined {
  if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
    return process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  }
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }).trim() || undefined;
  } catch {
    return undefined;
  }
}

const token = githubToken();

async function getJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {
    "User-Agent": "iptime-porting-candidates",
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}\n${await res.text()}`);
  }
  return (await res.json()) as T;
}

async function getText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "iptime-porting-candidates" } });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status}`);
  }
  return res.text();
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await fn(items[index]!);
      }
    }),
  );
  return results;
}

interface SearchResponse {
  total_count: number;
  items: {
    number: number;
    title: string;
    state: "open" | "closed";
    draft?: boolean;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    html_url: string;
    labels: { name: string }[];
    pull_request?: { merged_at: string | null };
  }[];
}

async function fetchGithubItems(query: string): Promise<GithubItem[]> {
  const items: GithubItem[] = [];
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100&page=${page}`;
    const res = await getJson<SearchResponse>(url);
    for (const item of res.items) {
      items.push({
        number: item.number,
        title: item.title,
        is_pr: Boolean(item.pull_request),
        state: item.state,
        merged: Boolean(item.pull_request?.merged_at),
        draft: Boolean(item.draft),
        created_at: item.created_at,
        updated_at: item.updated_at,
        closed_at: item.closed_at,
        html_url: item.html_url,
        labels: item.labels.map((label) => label.name),
      });
    }
    if (items.length >= res.total_count || res.items.length < 100) {
      break;
    }
  }
  return items.sort((a, b) => b.number - a.number);
}

function makeVar(block: string, name: string): string {
  return block.match(new RegExp(`^\\s*${name}\\s*:?=\\s*(.*)$`, "m"))?.[1]?.trim() ?? "";
}

function parseImageMakefile(target: string, makefile: string, text: string): UpstreamDevice[] {
  const devices: UpstreamDevice[] = [];
  const blocks = text.matchAll(/^define Device\/(\S+)\n([\s\S]*?)^endef/gm);

  for (const [, device, body] of blocks) {
    if (!device || !body) {
      continue;
    }
    const vendor = makeVar(body, "DEVICE_VENDOR");
    if (!/iptime/i.test(vendor) && !/^iptime[_-]/i.test(device)) {
      continue;
    }
    const dtsVar = makeVar(body, "DEVICE_DTS");
    devices.push({
      target,
      makefile,
      device,
      vendor,
      model: makeVar(body, "DEVICE_MODEL"),
      variant: makeVar(body, "DEVICE_VARIANT"),
      dts: dtsVar ? dtsVar.split(/\s+/) : [],
      uimage_name: makeVar(body, "UIMAGE_NAME"),
      iptime_crc32_id: body.match(/iptime-crc32\s+([\w-]+)/)?.[1] ?? "",
    });
  }
  return devices;
}

const IMAGE_MAKEFILE = /^target\/linux\/([^/]+)\/image\/(.+\.mk|Makefile)$/;

// Device blocks added by a PR: only the "+" lines of image makefile patches are parsed,
// so PRs that merely touch an existing device (e.g. "use nmbm for ...") yield nothing.
async function fetchPrDevices(number: number): Promise<PrDevice[]> {
  const files = await getJson<{ filename: string; patch?: string }[]>(
    `https://api.github.com/repos/${REPO}/pulls/${number}/files?per_page=100`,
  );
  return files.flatMap((file) => {
    const target = file.filename.match(IMAGE_MAKEFILE)?.[1];
    if (!target || !file.patch) return [];
    const added = file.patch
      .split("\n")
      .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
      .map((line) => line.slice(1))
      .join("\n");
    return parseImageMakefile(target, file.filename, added).map(({ device, model, variant, dts, iptime_crc32_id }) => ({
      device,
      model,
      variant,
      dts,
      iptime_crc32_id,
    }));
  });
}

export function socFamilyFromDtsName(fileName: string): string | undefined {
  return fileName.toLowerCase().match(/^(mt|an|en|ipq|qca|bcm|rtl)(\d{4,5})/)?.slice(1, 3).join("");
}

// Normalized model keys a device definition can match (DEVICE_MODEL, + DEVICE_VARIANT, Device/ id).
export function deviceModelKeys(device: { device: string; model: string; variant: string }): string[] {
  return [
    normalizeModelName(device.model),
    normalizeModelName(device.model + device.variant),
    normalizeModelName(device.device.replace(/^iptime[_-]/i, "")),
  ];
}

// Reads ./snapshot.json, fetching (and saving) it first when missing or when `refresh` is set.
export async function loadSnapshot(refresh = false): Promise<Snapshot> {
  if (!refresh && existsSync(SNAPSHOT_PATH)) {
    const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf-8")) as Snapshot;
    console.log(`[snapshot] using ${SNAPSHOT_PATH} (${snapshot.fetched_at}), \`pnpm snapshot\` to update`);
    return snapshot;
  }
  const snapshot = await fetchSnapshot();
  writeJsonFile(SNAPSHOT_PATH, snapshot);
  console.log(`[snapshot] saved ${SNAPSHOT_PATH}`);
  return snapshot;
}

export async function fetchSnapshot(): Promise<Snapshot> {
  const query = `repo:${REPO} iptime`;
  console.log(`[snapshot] GitHub search: ${query}${token ? " (authenticated)" : " (anonymous)"}`);
  const githubItems = await fetchGithubItems(query);

  const openPrs = githubItems.filter((item) => item.is_pr && item.state === "open");
  console.log(`[snapshot] reading image makefile changes of ${openPrs.length} open PRs`);
  await mapLimit(openPrs, 4, async (item) => {
    item.pr_devices = await fetchPrDevices(item.number);
  });

  console.log(`[snapshot] OpenWrt tree (${BRANCH})`);
  const tree = await getJson<{ sha: string; truncated: boolean; tree: { path: string; type: string }[] }>(
    `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`,
  );
  if (tree.truncated) {
    console.warn("[snapshot] warning: git tree response truncated, results may be incomplete");
  }

  const paths = tree.tree.filter((entry) => entry.type === "blob").map((entry) => entry.path);
  const dtsPaths = paths.filter((path) => path.startsWith("target/linux/") && /\.dts$/.test(path));
  const dtsCountBySoc: Record<string, number> = {};
  for (const path of dtsPaths) {
    const family = socFamilyFromDtsName(path.split("/").pop()!);
    if (family) {
      dtsCountBySoc[family] = (dtsCountBySoc[family] ?? 0) + 1;
    }
  }

  const makefiles = paths.filter((path) => IMAGE_MAKEFILE.test(path));
  console.log(`[snapshot] scanning ${makefiles.length} image makefiles for ipTIME devices`);
  const deviceLists = await mapLimit(makefiles, 8, async (path) => {
    const text = await getText(`${RAW}/${path}`);
    return /iptime/i.test(text) ? parseImageMakefile(path.split("/")[2]!, path, text) : [];
  });

  console.log("[snapshot] firmware-utils iptime-crc32 model table");
  const crc32Source = await getText(CRC32_URL);
  const crc32Models = [...crc32Source.matchAll(/\.model\s*=\s*"([^"]+)"/g)].map((m) => m[1]!);

  return {
    fetched_at: new Date().toISOString(),
    openwrt_branch: BRANCH,
    openwrt_tree_sha: tree.sha,
    github_query: query,
    github_items: githubItems,
    upstream_devices: deviceLists.flat(),
    upstream_iptime_dts: dtsPaths.filter((path) => /iptime/i.test(path)).concat(
      paths.filter((path) => path.startsWith("target/linux/") && /iptime.*\.dtsi$/i.test(path)),
    ),
    dts_count_by_soc: Object.fromEntries(Object.entries(dtsCountBySoc).sort(([a], [b]) => a.localeCompare(b))),
    iptime_crc32_models: crc32Models,
  };
}
