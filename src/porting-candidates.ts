// Ranks ipTIME routers that are NOT yet supported (or pending) in OpenWrt by how
// likely they are to be portable, favouring MediaTek boards that already have a
// close sibling (same SoC, same OEM flash layout) in upstream target/linux.
//
//   pnpm candidates                 # use local snapshot (fetch once if missing)
//   pnpm candidates --refresh       # re-fetch GitHub/OpenWrt snapshot (same as `pnpm snapshot` first)
//   pnpm candidates --mediatek-only --max-price=80000 --sort=value
//
// Models with an open PR that adds them (title "add support for <model>", or a new
// `define Device/iptime_*` block in the PR's image makefile) are "pending" and left out of the ranking.
//
// Inputs : techdata/techdata.json, cache/product-pages.json, firmware/index.json (+ .bin files), snapshot.json
// Outputs: snapshot.json (if missing / --refresh), porting/{candidates.md,candidates.json,oem-dtb.json,prices.json}

import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { writeJsonFile } from "./cache.js";
import { normalizeModelName } from "./filters.js";
import { compareLayouts, extractOemDeviceTree, formatLayout, type LayoutMatch, type OemDeviceTree } from "./porting/fdt.js";
import { deviceModelKeys, loadSnapshot, type GithubItem, type PrDevice, type Snapshot, type UpstreamDevice } from "./porting/snapshot.js";
import type { ProductPage, RouterTechData } from "./types.js";
import { writeFileSync } from "fs";

// ---------------------------------------------------------------- options

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];

const REFRESH = flag("refresh");
const MEDIATEK_ONLY = flag("mediatek-only");
const MAX_PRICE = option("max-price") ? Number(option("max-price")) : undefined;
const SORT = option("sort") ?? "score"; // score | value
const STALE_DAYS = Number(option("stale-days") ?? 180);

const OUT_DIR = "./porting";

// ---------------------------------------------------------------- knowledge tables

// Upstream maturity per SoC family. Score is the "platform" part (max 35).
const PLATFORM: Record<string, { score: number; note: string }> = {
  mt7621: { score: 35, note: "ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream" },
  mt7981: { score: 35, note: "mediatek/filogic: ipTIME AX3000 계열 다수 upstream" },
  mt7986: { score: 33, note: "mediatek/filogic: 성숙, Wi-Fi(mt7915/mt7986) 안정" },
  mt7622: { score: 30, note: "mediatek/mt7622: 성숙, 단 신규 보드 유입은 적음" },
  mt7988: { score: 28, note: "mediatek/filogic: Wi-Fi 7(mt7996) 지원 중, 아직 활발히 변하는 중" },
  mt7629: { score: 24, note: "mediatek/mt7629: 보드 수 적음" },
  mt7623: { score: 22, note: "mediatek/mt7623: 레거시 성격" },
  mt7628: { score: 18, note: "ramips/mt76x8: 성숙하지만 저사양(8/64) 위주" },
  mt7620: { score: 16, note: "ramips/mt7620: 레거시, 저사양 보드는 이미지 크기 압박" },
};
const NON_MTK_WITH_TARGET = { score: 8, note: "upstream 타겟은 있으나 MediaTek 외 (무선 드라이버/부트로더 제약 확인 필요)" };
const NO_TARGET = { score: 0, note: "upstream 타겟 없음 (SoC 자체 포팅 필요)" };
const MEDIATEK_LIKE = /^(mt|an|en)\d/;

// SoCs whose upstream support is still an open PR (used when the snapshot has no DTS for them).
const PENDING_PLATFORM: Record<string, { score: number; note: string }> = {
  an7563: {
    score: 14,
    note:
      "airoha/an7563 미머지 — openwrt#23960(AN7563/AN7552 + Xiaomi BE5000, CHANGES_REQUESTED), " +
      "openwrt#26339(AN7563 base + TP-Link XX530v v2, 2026-10 신규) 리뷰 중. 어느 쪽이 머지되느냐에 따라 보드 DTS 라벨/드라이버가 바뀔 수 있음",
  },
};

// Out-of-tree ports that are known to boot on real hardware. Not upstream, so the
// model stays a candidate, but the porting effort is mostly "rebase + clean up".
const COMMUNITY_PORTS: Record<string, { points: number; url: string; note: string; review: string[] }> = {
  be5100m: {
    points: 15,
    url: "https://github.com/junkim0215/openwrt/commits/be5100m-r115/",
    note:
      "junkim0215/openwrt be5100m-r115: BE5100M 보드 커밋 4개(1개 revert)가 AN7563 비공식 포팅(Iscle·Ray Liu·Pavel Bragin, Xiaomi BE5000용 ~110커밋) 위에 얹힘. " +
      "스톡 듀얼슬롯 유지(tclinux_slave에 설치, 스톡 웹 UI factory.bin), Factory nvmem MAC/EEPROM, mt7996e(MT7992)+NPU 오프로드",
    review: [
      "DTS에 gpio-keys 없음 — si 기준 reset=GPIO0, wps=GPIO5 (active-low) 추가 필요 (failsafe/리셋 불가)",
      "LAN 라벨 순서 확인 필요 — si net은 물리 LAN1→switch reg3 … LAN4→reg0 (역순), DTS는 gsw_port1..4 = lan1..4 오름차순",
      "SoC 레벨 노드(usb@1fab0000, usb phy, /memreserve/ ATF)가 보드 DTS에 있음 — an7563.dtsi로 이동해야 upstream 리뷰 통과",
      "이미지 생성이 scripts/iptime-be-image.py(Python) — upstream 관례상 firmware-utils C 도구로 옮겨야 함",
      "스톡 U-Boot의 root=/dev/mtdblockN에 맞추려고 파티션 DT 순서를 주소 순서와 다르게 배치 — 리뷰어가 문제 삼을 가능성 큼",
      "en8811h 'airoha,led-active-low' 커스텀 DT 속성 패치 — 바인딩 upstream 필요",
      "브랜치에 VPN/xray/NPU 펌웨어 등 보드와 무관한 커밋 다수 — PR 시 보드 커밋만 분리 필요",
    ],
  },
};

// Manual reviews of open add-support PRs, shown in the "지원 예정" section.
const PR_REVIEWS: Record<number, { checked_at: string; verdict: string; notes: string[] }> = {
  26627: {
    checked_at: "2026-11-16",
    verdict: "머지 가능성 높음 — 블로커는 firmware-utils#89",
    notes: [
      "AX3000Q와 동일 HW(OEM DTB model도 'ipTIME AX3000Q') → mt7981b-iptime-ax3000q.dts를 include하고 model/compatible만 바꾼 8줄 DTS. 변경 범위 최소",
      "실기 테스트: OEM 복구툴(A/B 슬롯 양쪽), TFTP, sysupgrade, fw_setenv boot_from B로 순정 복귀, Wi-Fi/WAN/LAN/LED/버튼, MAC 일치",
      "블로커: openwrt/firmware-utils#89(iptime-crc32 ax3000p) 미머지 → 머지 후 tools/firmware-utils 버전 bump도 필요",
      "uboot-tools PKG_RELEASE 미증가 (봇 경고 미반영). #26729도 같은 PKG_RELEASE를 올려서 늦게 머지되는 쪽은 rebase 필요",
      "리뷰어 achterin 지적(11_fix_wifi_mac case 순서) 반영 완료. 빌드 CI는 아직 안 돌았음 (FormalityCheck만 통과)",
    ],
  },
  26729: {
    checked_at: "2026-11-16",
    verdict: "완성도 높음, 머지 가능성 중상 — 블로커는 firmware-utils#91 + 리뷰 대기",
    notes: [
      "MT7987A + AN8855(4 LAN) + 내장 2.5G PHY(WAN) + MT7992. 신규 DTS 468줄, 빌드 CI 전부 통과",
      "스톡 MediaTek dual-boot: 기존 mtk_dual_boot_flash_both_slots(ltc,vl7m19k 선례)로 양 슬롯 기록 + bootcount에서 dual_boot.slot_*_invalid 초기화. " +
        "U-Boot 폴백 보호를 사실상 끄는 방식이라 리뷰어가 의도를 물을 수 있음",
      "factory.bin에 IMAGE_SIZE/check-size 없음, &pcie1 disabled는 dtsi 기본값이면 중복 — 리뷰 nit 예상",
      "블로커: openwrt/firmware-utils#91(iptime-crc32 be5100p) 미머지 → 머지 후 tools/firmware-utils bump 필요",
      "techdata 데이터셋(iptime-router-models.json)에 BE5100plus 없음 — 순위 계산 대상이 아님",
    ],
  },
};

// Switch / SoC Ethernet knowledge (warnings only, no score). Matched against techdata.switch / soc.
// Source for the rtl8367 entries: porting/notes/a2004se.md
const SWITCH_KNOWLEDGE: { pattern: RegExp; note: string }[] = [
  {
    pattern: /rtl8367r|rtl8367s|rtl8365/i,
    note:
      "메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. " +
      "SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. " +
      "CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)",
  },
  { pattern: /rtl8370|rtl8372/i, note: "메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음" },
];
// Switch nodes found in the OEM DTB (all_compatibles). `upstream: true` = the same binding exists
// upstream, so it is informational; otherwise the OEM node cannot be reused as-is.
const OEM_SWITCH_COMPATIBLES: { pattern: RegExp; name: string; upstream: boolean; note: string }[] = [
  {
    pattern: /^mediatek,mt7531$/,
    name: "MT7531",
    upstream: true,
    note: "upstream DSA 드라이버 mt7530이 같은 `mediatek,mt7531` 바인딩을 지원 — 스위치 쪽 추가 드라이버 작업 없음",
  },
  {
    pattern: /^mediatek,mt753x$/,
    name: "MediaTek SDK mt753x",
    upstream: false,
    note:
      "OEM은 MediaTek SDK 전용 `mt753x` gsw 드라이버를 씀 (upstream에 없는 바인딩) — OEM 스위치 노드는 그대로 못 쓰고 " +
      "upstream DSA 노드(`mediatek,mt7621` 내장 스위치 또는 `mediatek,mt7531`)로 새로 써야 함. 포트 번호는 si switch_mapping 기준",
  },
  {
    // informational only: the chip-level concern is raised by SWITCH_KNOWLEDGE (matched on si switch)
    pattern: /^(mediatek,rtk-gsw|realtek,rtk-\w+-gsw)$/,
    name: "Realtek SDK rtk-gsw",
    upstream: true,
    note: "OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고)",
  },
  {
    pattern: /rtl83\d\d|rtl8367|an8855|qca8k|aqr/i,
    name: "기타 스위치/PHY",
    upstream: false,
    note: "OEM DTB에 스위치/PHY 노드가 있음 — upstream 드라이버/바인딩 지원 여부 미분류, 수동 확인 필요",
  },
];

const SOC_ETHERNET_KNOWLEDGE: { pattern: RegExp; note: string }[] = [
  {
    pattern: /rtl8197f/i,
    note: "메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함",
  },
];

// WLAN chips with no realistic upstream driver path. Matched against si chip names
// (wlan2_4 / wlan5 / wlan5_2 / wlan6). Any hit marks the model as "upstream merge unlikely".
const WLAN_DRIVER_BLOCKERS: { pattern: RegExp; points: number; note: string }[] = [
  {
    pattern: /^rtl8812f/i,
    points: -30,
    note:
      "RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). " +
      "Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. " +
      "유선 전용(1차 목표) 포팅에는 영향 없음",
  },
];

// WLAN chips with a plausible (but unverified) upstream path — warnings only, no score.
// Source: porting/notes/a2004se.md §RTL 칩 정리
const WLAN_DRIVER_INFO: { pattern: RegExp; note: string }[] = [
  {
    pattern: /^rtl8197f/i,
    note: "RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음",
  },
  {
    pattern: /^rtl8812br/i,
    note: "RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요",
  },
  {
    pattern: /^rtl8832br/i,
    note: "RTL8832BR = 8852B 계열 AP용(11ax AX1200 2x2 PCIe). 순정은 rtk_wifi6.ko(PHL/g6, 커널 4.4). rtw89 rtw8852b(be) 대상이지만 AP 변종 PCI ID·AP 모드 동작 미확인",
  },
];

// ---------------------------------------------------------------- helpers

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, "utf-8")) as T;

function socFamily(soc: string): string | undefined {
  return soc.toLowerCase().match(/\b(mt|an|en|ipq|qca|bcm|rtl)(\d{4,5})/)?.slice(1, 3).join("");
}

function sizeMB(text: string): number {
  return Math.max(
    0,
    ...Array.from(text.matchAll(/(\d+(?:\.\d+)?)\s*([MG])B/gi), (m) => Number(m[1]) * (m[2]!.toUpperCase() === "G" ? 1024 : 1)),
  );
}

const flashClass = (flash: string) => (/nand|emmc/i.test(flash) || sizeMB(flash) >= 64 ? "NAND/eMMC" : "NOR");

function titleModels(title: string, known: Set<string>): string[] {
  const tokens = title.split(/[\s,;:()[\]/]+/).filter(Boolean);
  const found = new Set<string>();
  tokens.forEach((token, i) => {
    for (const candidate of [token, token + (tokens[i + 1] ?? "")]) {
      const norm = normalizeModelName(candidate);
      if (known.has(norm)) found.add(norm);
    }
  });
  return [...found];
}

const daysSince = (iso: string) => (Date.now() - Date.parse(iso)) / 86_400_000;
const md = (text: string | number) => String(text).replace(/\|/g, "\\|").replace(/\n/g, " ");
const won = (n: number | null | undefined) => (n == null ? "-" : `${n.toLocaleString("ko-KR")}원`);

// ---------------------------------------------------------------- load data

const techdata = readJson<RouterTechData[]>("./techdata/techdata.json");
const productPages = readJson<ProductPage[]>("./cache/product-pages.json");
const firmwareIndex = readJson<{ firmwares: { model: string; release: { files: { name: string }[] }; paths: string[] }[] }>(
  "./firmware/index.json",
);

const snapshot: Snapshot = await loadSnapshot(REFRESH);

const pageByModel = new Map(productPages.map((page) => [normalizeModelName(page.link.name), page]));
const firmwareByModel = new Map(firmwareIndex.firmwares.map((fw) => [normalizeModelName(fw.model), fw]));
const knownModels = new Set(techdata.map((t) => normalizeModelName(t.model)));
const crc32Ids = new Set(snapshot.iptime_crc32_models.map((id) => id.toLowerCase()));

// ---------------------------------------------------------------- upstream status

const upstreamByModel = new Map<string, UpstreamDevice>();
for (const device of snapshot.upstream_devices) {
  const keys = deviceModelKeys(device);
  keys.filter((key) => knownModels.has(key)).forEach((key) => upstreamByModel.set(key, device));
  // keep upstream devices that are not in our dataset (e.g. NAS1, T5004) reachable too
  upstreamByModel.set(keys[0]!, device);
}

const isAddSupport = (item: GithubItem) => /add(s|ing)?\s+(initial\s+)?support/i.test(item.title);
const prDeviceKeys = (d: PrDevice) => deviceModelKeys(d);

const itemsByModel = new Map<string, GithubItem[]>();
// open PRs that add a model: "add support" title naming it, or a new Device/ block for it
const pendingPrsByModel = new Map<string, GithubItem[]>();
const pushTo = (map: Map<string, GithubItem[]>, key: string, item: GithubItem) => {
  const list = map.get(key) ?? map.set(key, []).get(key)!;
  if (!list.includes(item)) list.push(item);
};
// open PRs adding ipTIME devices that are neither in our dataset nor upstream (e.g. BE5100plus)
const pendingOutsideDataset: { item: GithubItem; device: PrDevice }[] = [];

for (const item of snapshot.github_items) {
  const fromTitle = titleModels(item.title, knownModels);
  const isOpenPr = item.is_pr && item.state === "open";
  for (const model of fromTitle) {
    pushTo(itemsByModel, model, item);
    if (isOpenPr && isAddSupport(item)) pushTo(pendingPrsByModel, model, item);
  }
  for (const device of isOpenPr ? item.pr_devices ?? [] : []) {
    const known = prDeviceKeys(device).find((key) => knownModels.has(key));
    if (known) {
      pushTo(itemsByModel, known, item);
      pushTo(pendingPrsByModel, known, item);
    } else if (!prDeviceKeys(device).some((key) => upstreamByModel.has(key))) {
      pendingOutsideDataset.push({ item, device });
    }
  }
}

// ---------------------------------------------------------------- OEM device trees

const oemDtbByModel = new Map<string, OemDeviceTree>();
const oemIdByModel = new Map<string, string>();
for (const t of techdata) {
  const key = normalizeModelName(t.model);
  const fw = firmwareByModel.get(key);
  const fileName = fw?.release.files[0]?.name;
  if (fileName) {
    oemIdByModel.set(key, fileName.split("_")[0]!.toLowerCase());
  }
  for (const path of fw?.paths ?? []) {
    const full = join("./firmware", path);
    if (!existsSync(full)) continue;
    const dtb = extractOemDeviceTree(full);
    if (dtb) {
      oemDtbByModel.set(key, { ...dtb, file: path });
      break;
    }
  }
}

// ---------------------------------------------------------------- prices
// price_krw: new, lowest price — filled by `pnpm prices` (Danawa), or by hand.
// used_price_krw: used price — manual only.

interface PriceEntry {
  model: string;
  price_krw: number | null;
  used_price_krw?: number | null;
  source: string;
  checked_at: string;
  note: string;
}
const PRICES_PATH = join(OUT_DIR, "prices.json");
const prices: Record<string, PriceEntry> = existsSync(PRICES_PATH) ? readJson(PRICES_PATH) : {};

// ---------------------------------------------------------------- research notes (manual)
// porting/notes/<model key>.md — linked from the model itself and from models with the
// same SoC family + switch chip (findings usually carry over to those).

const NOTES_DIR = join(OUT_DIR, "notes");
const noteKeys = existsSync(NOTES_DIR)
  ? readdirSync(NOTES_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
  : [];
const switchBase = (s: string) => (s ?? "").split(/[\s+]/)[0]!.toLowerCase();
// SoC incl. revision letter (RTL8197F ≠ RTL8197D, RTL8197FH → rtl8197f)
const socVariant = (soc: string) => soc.toLowerCase().match(/\b([a-z]{2,3}\d{4,5}[a-z]?)/)?.[1] ?? "";

function notesFor(t: RouterTechData): { file: string; relation: string }[] {
  const key = normalizeModelName(t.model);
  return noteKeys.flatMap((noteKey) => {
    if (noteKey === key) return [{ file: `notes/${noteKey}.md`, relation: "직접" }];
    const owner = techdata.find((o) => normalizeModelName(o.model) === noteKey);
    if (owner && socVariant(owner.soc) && socVariant(owner.soc) === socVariant(t.soc) && switchBase(owner.switch) && switchBase(owner.switch) === switchBase(t.switch)) {
      return [{ file: `notes/${noteKey}.md`, relation: `${owner.model.replace("ipTIME ", "")}와 같은 SoC+스위치` }];
    }
    return [];
  });
}

// ---------------------------------------------------------------- scoring

interface ScoreItem {
  label: string;
  points: number;
  detail: string;
}

interface Candidate {
  rank?: number;
  model: string;
  key: string;
  score: number;
  status: "candidate" | "supported" | "pending";
  soc: string;
  family: string;
  target_guess: string;
  flash: string;
  ram: string;
  ethernet_ports: number;
  usb: number;
  wifi_standard: string;
  sale_status: string;
  release_date: string;
  oem_id: string;
  price_krw: number | null;
  used_price_krw: number | null;
  breakdown: ScoreItem[];
  warnings: string[];
  reference_dts: string[];
  sibling_layouts: { model: string; match: LayoutMatch; jaccard: number }[];
  same_board: string[];
  internal_model: string;
  upstream_merge_unlikely: boolean; // a WLAN_DRIVER_BLOCKERS chip is present
  community_port: string; // URL of a known out-of-tree port (COMMUNITY_PORTS)
  notes: { file: string; relation: string }[]; // porting/notes/*.md that apply to this model
  oem_layout: string;
  oem_compatible: string[];
  github: { number: number; title: string; state: string; merged: boolean; url: string; updated_at: string }[];
  links: { danawa: string; naver: string; iptime: string };
}

const supportedKeys = new Set(techdata.map((t) => normalizeModelName(t.model)).filter((key) => upstreamByModel.has(key)));
const supportedByFamily = new Map<string, RouterTechData[]>();
for (const t of techdata) {
  const family = socFamily(t.soc);
  if (family && supportedKeys.has(normalizeModelName(t.model))) {
    (supportedByFamily.get(family) ?? supportedByFamily.set(family, []).get(family)!).push(t);
  }
}

function dtsFor(device: UpstreamDevice): string[] {
  const names = device.dts.length > 0 ? device.dts : [device.device.replace(/^iptime_/, "")];
  return snapshot.upstream_iptime_dts.filter((path) => names.some((name) => path.toLowerCase().includes(name.toLowerCase())));
}

function scoreModel(t: RouterTechData): Candidate {
  const key = normalizeModelName(t.model);
  const family = socFamily(t.soc) ?? "";
  const breakdown: ScoreItem[] = [];
  const warnings: string[] = [];
  const add = (label: string, points: number, detail: string) => breakdown.push({ label, points, detail });
  let mergeUnlikely = false;

  // 1) platform maturity
  const upstreamDtsCount = snapshot.dts_count_by_soc[family] ?? 0;
  const platform =
    PLATFORM[family] && upstreamDtsCount > 0
      ? PLATFORM[family]!
      : upstreamDtsCount > 0
        ? NON_MTK_WITH_TARGET
        : PENDING_PLATFORM[family] ?? NO_TARGET;
  add("플랫폼", platform.score, `${family || t.soc} (upstream DTS ${upstreamDtsCount}개) — ${platform.note}`);

  // 1b) out-of-tree ports (this model, or another model on the same SoC)
  const community = COMMUNITY_PORTS[key];
  if (community) {
    add("비공식 포팅 존재", community.points, `${community.note} (${community.url})`);
    community.review.forEach((r) => warnings.push(`[포팅 리뷰] ${r}`));
  } else {
    const communitySiblings = techdata.filter(
      (s) => COMMUNITY_PORTS[normalizeModelName(s.model)] && socFamily(s.soc) === family && normalizeModelName(s.model) !== key,
    );
    if (communitySiblings.length > 0) {
      add(
        "같은 SoC 비공식 포팅",
        5,
        `${communitySiblings.map((s) => s.model.replace("ipTIME ", "")).join(", ")} 포팅을 템플릿으로 사용 가능`,
      );
    }
  }

  // 2) upstream ipTIME siblings on the same SoC + OEM layout similarity
  const siblings = (supportedByFamily.get(family) ?? []).filter((s) => normalizeModelName(s.model) !== key);
  const referenceDts = siblings.flatMap((s) => dtsFor(upstreamByModel.get(normalizeModelName(s.model))!));
  const oem = oemDtbByModel.get(key);
  const siblingLayouts: Candidate["sibling_layouts"] = [];

  if (siblings.length > 0) {
    add("ipTIME 형제 보드", 13, `같은 SoC의 upstream ipTIME 보드: ${siblings.map((s) => s.model.replace("ipTIME ", "")).join(", ")}`);
    if (siblings.some((s) => flashClass(s.flash) === flashClass(t.flash))) {
      add("플래시 방식 일치", 4, `${flashClass(t.flash)} — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능`);
    }
    if (oem?.partitions.length) {
      for (const sibling of siblings) {
        const siblingOem = oemDtbByModel.get(normalizeModelName(sibling.model));
        if (siblingOem?.partitions.length) {
          siblingLayouts.push({ model: sibling.model, ...compareLayouts(oem.partitions, siblingOem.partitions) });
        }
      }
      siblingLayouts.sort((a, b) => b.jaccard - a.jaccard || Number(b.match === "identical") - Number(a.match === "identical"));
      const best = siblingLayouts.find((l) => l.match === "identical") ?? siblingLayouts[0];
      const layoutPoints: Record<LayoutMatch, number> = { identical: 12, "same-labels": 8, partial: 4, different: 0 };
      if (best) {
        add(
          "OEM 파티션 레이아웃",
          layoutPoints[best.match],
          `${best.model.replace("ipTIME ", "")}와(과) ${best.match} (label Jaccard ${best.jaccard.toFixed(2)})`,
        );
      }
    }
  } else if (MEDIATEK_LIKE.test(family) && upstreamDtsCount > 0) {
    add("ipTIME 형제 보드", 3, "같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요");
  }

  // 2b) same EFM internal board name (si board.name) as an upstream board = practically the same PCB
  const sameBoard = t.internal_model
    ? techdata.filter(
        (s) =>
          s.internal_model?.toUpperCase() === t.internal_model.toUpperCase() &&
          socFamily(s.soc) === family && // board names are sometimes reused across SoCs

          normalizeModelName(s.model) !== key &&
          supportedKeys.has(normalizeModelName(s.model)),
      )
    : [];
  if (sameBoard.length > 0) {
    add("동일 내부 보드명", 10, `${t.internal_model} = ${sameBoard.map((s) => s.model.replace("ipTIME ", "")).join(", ")} (upstream 지원)`);
    referenceDts.unshift(...sameBoard.flatMap((s) => dtsFor(upstreamByModel.get(normalizeModelName(s.model))!)));
  }

  // 3) OEM device tree evidence (from stock firmware)
  if (oem) {
    add("OEM DTB 확보", 4, `${oem.file} @0x${oem.offset.toString(16)} (${oem.compatible.join(", ") || "compatible 없음"})`);

    const siblingCompat = new Set(
      siblings.flatMap((s) => oemDtbByModel.get(normalizeModelName(s.model))?.allCompatibles ?? []),
    );
    if (siblingCompat.size > 0) {
      const newBlocks = oem.allCompatibles.filter((c) => !siblingCompat.has(c));
      if (newBlocks.length > 0) {
        add("형제 대비 신규 HW 블록", -Math.min(5, newBlocks.length), newBlocks.slice(0, 8).join(", "));
      }
    }
    for (const known of OEM_SWITCH_COMPATIBLES) {
      const compats = oem.allCompatibles.filter((c) => known.pattern.test(c));
      if (compats.length === 0) continue;
      // upstream siblings whose OEM DTB has the same switch node already went through this
      const sameOnSiblings = siblings.filter((s) =>
        oemDtbByModel.get(normalizeModelName(s.model))?.allCompatibles.some((c) => known.pattern.test(c)),
      );
      const siblingNote =
        sameOnSiblings.length > 0
          ? ` · upstream 형제 ${sameOnSiblings.map((s) => s.model.replace("ipTIME ", "")).join(", ")}도 OEM이 동일 → 형제 DTS의 스위치 노드 재사용`
          : "";
      const unusedRealtek = /rtk/.test(compats.join()) && t.switch && !/rtl/i.test(t.switch);
      const note = unusedRealtek
        ? "si에는 Realtek 스위치가 없음 → SDK 공통 DTS에 남은 미사용 노드로 보임, 포팅 시 무시"
        : known.note;
      const text = `${known.name} (OEM DTB \`${compats.join("`, `")}\`, si 스위치: ${t.switch || "?"}): ${note}${siblingNote}`;
      if (known.upstream || sameOnSiblings.length > 0) add("스위치(정보)", 0, text);
      else warnings.push(`스위치 ${text}`);
    }
  } else if (MEDIATEK_LIKE.test(family)) {
    warnings.push("OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요");
  }

  // 4) factory image tooling
  const oemId = oemIdByModel.get(key) ?? "";
  if (oemId && crc32Ids.has(oemId)) {
    add("factory 이미지 도구", 6, `firmware-utils iptime-crc32에 '${oemId}' 이미 등록`);
  } else if (/^(mt7621|mt7620|mt7628)$/.test(family) && t.wifi_standard !== "Wi-Fi 6") {
    add("factory 이미지 도구", 4, `ramips 방식(UIMAGE_NAME := ${oemId || "?"})으로 factory 이미지 생성 가능`);
  } else if (MEDIATEK_LIKE.test(family)) {
    add("factory 이미지 도구", 0, `iptime-crc32에 '${oemId || "?"}' 추가 필요 (firmware-utils PR)`);
  }

  // 5) hardware resources
  const flashMB = sizeMB(t.flash);
  const ramMB = sizeMB(t.ram);
  const flashPoints = flashClass(t.flash) === "NAND/eMMC" || flashMB >= 16 ? 6 : flashMB >= 8 ? 2 : -15;
  const ramPoints = ramMB >= 256 ? 6 : ramMB >= 128 ? 4 : ramMB >= 64 ? 0 : -15;
  add("Flash", flashPoints, t.flash || "?");
  add("RAM", ramPoints, t.ram || "?");
  if (flashMB > 0 && flashMB <= 4) warnings.push("4MB 플래시: 현행 OpenWrt 이미지 불가");
  if (ramMB > 0 && ramMB <= 32) warnings.push("32MB RAM: 현행 OpenWrt 비권장(4/32 경고 대상)");
  if (ramMB === 64) warnings.push("64MB RAM: 동작은 하나 여유가 거의 없음");

  if (t.uart_exposed === false) {
    warnings.push(`UART 미노출 — 납땜 필요${t.uart_note ? ` (${t.uart_note})` : ""}`);
  }

  // from OEM si data (pnpm collect-si && pnpm start)
  for (const k of SWITCH_KNOWLEDGE.filter((k) => k.pattern.test(t.switch ?? ""))) {
    warnings.push(`스위치(${t.switch}): ${k.note}`);
  }
  for (const k of SOC_ETHERNET_KNOWLEDGE.filter((k) => k.pattern.test(t.soc))) {
    warnings.push(`SoC 이더넷(${t.soc}): ${k.note}`);
  }
  const wlanChips = [t.wlan2_4, t.wlan5, t.wlan5_2, t.wlan6].filter((chip): chip is string => Boolean(chip));
  const blockers = WLAN_DRIVER_BLOCKERS.filter((b) => wlanChips.some((chip) => b.pattern.test(chip)));
  if (blockers.length > 0) {
    for (const blocker of blockers) add("WLAN 드라이버 없음", blocker.points, blocker.note);
    mergeUnlikely = true;
  } else if (wlanChips.length > 0) {
    add("WLAN 칩(정보)", 0, wlanChips.join(" / "));
  }
  for (const k of WLAN_DRIVER_INFO.filter((k) => wlanChips.some((chip) => k.pattern.test(chip)))) {
    warnings.push(`WLAN: ${k.note}`);
  }

  if (t.ethernet_ports >= 9) {
    add("포트 구성", -4, `${t.ethernet_ports}포트(8 LAN) — 외장/캐스케이드 스위치 여부 확인 필요`);
  }

  // 6) community signals
  const github = itemsByModel.get(key) ?? [];
  const previousAttempts = github.filter((i) => i.is_pr && isAddSupport(i) && i.state === "closed" && !i.merged);
  if (previousAttempts.length > 0) {
    add("이전 포팅 시도", 3, previousAttempts.map((i) => `#${i.number}`).join(", ") + " (닫힘, 코드 참고 가능)");
  }
  const issues = github.filter((i) => !i.is_pr);
  if (issues.length > 0) {
    add("이슈 언급", 1, issues.map((i) => `#${i.number}`).join(", "));
  }

  // status
  const status: Candidate["status"] = supportedKeys.has(key)
    ? "supported"
    : pendingPrsByModel.has(key)
      ? "pending"
      : "candidate";

  const page = pageByModel.get(key);
  const query = encodeURIComponent(t.model);
  const price = prices[key]?.price_krw ?? null;

  return {
    model: t.model,
    key,
    score: breakdown.reduce((sum, item) => sum + item.points, 0),
    status,
    soc: t.soc,
    family,
    target_guess: t.target,
    flash: t.flash,
    ram: t.ram,
    ethernet_ports: t.ethernet_ports,
    usb: t.usb,
    wifi_standard: t.wifi_standard,
    sale_status: page?.properties["판매 상태"] ?? "",
    release_date: page?.spec["출시년월"] ?? "",
    oem_id: oemId,
    price_krw: price,
    used_price_krw: prices[key]?.used_price_krw ?? null,
    breakdown,
    warnings,
    reference_dts: [...new Set(referenceDts)],
    sibling_layouts: siblingLayouts,
    upstream_merge_unlikely: mergeUnlikely,
    community_port: community?.url ?? "",
    notes: notesFor(t),
    same_board: sameBoard.map((s) => s.model),
    internal_model: t.internal_model ?? "",
    oem_layout: oem ? formatLayout(oem.partitions) : "",
    oem_compatible: oem?.compatible ?? [],
    github: github.map((i) => ({
      number: i.number,
      title: i.title,
      state: i.is_pr ? (i.merged ? "merged" : i.state) : `issue/${i.state}`,
      merged: i.merged,
      url: i.html_url,
      updated_at: i.updated_at.slice(0, 10),
    })),
    links: {
      danawa: `https://search.danawa.com/dsearch.php?query=${query}`,
      naver: `https://search.shopping.naver.com/search/all?query=${query}`,
      iptime: page?.link.url ?? "",
    },
  };
}

// ---------------------------------------------------------------- rank

const all = techdata.map(scoreModel);
const supported = all.filter((c) => c.status === "supported");
const pending = all.filter((c) => c.status === "pending");

let candidates = all.filter((c) => c.status === "candidate");
if (MEDIATEK_ONLY) candidates = candidates.filter((c) => MEDIATEK_LIKE.test(c.family));
if (MAX_PRICE !== undefined) candidates = candidates.filter((c) => c.price_krw == null || c.price_krw <= MAX_PRICE);

const valueOf = (c: Candidate) => (c.price_krw ? c.score / (c.price_krw / 10_000) : -Infinity);
candidates.sort((a, b) =>
  SORT === "value" ? valueOf(b) - valueOf(a) || b.score - a.score : b.score - a.score || (a.price_krw ?? 1e12) - (b.price_krw ?? 1e12),
);
candidates.forEach((c, i) => (c.rank = i + 1));

// keep prices.json as an editable template that lists every candidate
for (const c of [...candidates, ...pending]) {
  prices[c.key] ??= { model: c.model, price_krw: null, used_price_krw: null, source: "", checked_at: "", note: "" };
  prices[c.key]!.used_price_krw ??= null;
}
writeJsonFile(
  PRICES_PATH,
  Object.fromEntries(Object.entries(prices).sort(([a], [b]) => a.localeCompare(b))),
);

// ---------------------------------------------------------------- outputs

writeJsonFile(join(OUT_DIR, "candidates.json"), {
  generated_at: new Date().toISOString(),
  snapshot: { fetched_at: snapshot.fetched_at, openwrt_tree_sha: snapshot.openwrt_tree_sha },
  options: { mediatek_only: MEDIATEK_ONLY, max_price: MAX_PRICE ?? null, sort: SORT, stale_days: STALE_DAYS },
  candidates,
  pending,
  pending_outside_dataset: pendingOutsideDataset.map(({ item, device }) => ({ ...device, pr: item.number, url: item.html_url })),
  supported: supported.map((c) => c.model),
  upstream_not_in_dataset: snapshot.upstream_devices
    .filter((d) => !knownModels.has(normalizeModelName(d.model)) && !knownModels.has(normalizeModelName(d.model + d.variant)))
    .map((d) => `${d.vendor} ${d.model}${d.variant ? ` ${d.variant}` : ""} (${d.target})`),
});

writeJsonFile(
  join(OUT_DIR, "oem-dtb.json"),
  Object.fromEntries(
    [...oemDtbByModel].map(([key, dtb]) => [
      key,
      { file: dtb.file, offset: dtb.offset, model: dtb.model, compatible: dtb.compatible, partitions: dtb.partitions, all_compatibles: dtb.allCompatibles },
    ]),
  ),
);

const lines: string[] = [];
const push = (...text: string[]) => lines.push(...text);

push(
  "# ipTIME OpenWrt 포팅 후보",
  "",
  `- 생성: ${new Date().toISOString()}`,
  `- 스냅샷: ${snapshot.fetched_at} · openwrt/${snapshot.openwrt_branch} tree \`${snapshot.openwrt_tree_sha.slice(0, 12)}\` · GitHub 검색 \`${snapshot.github_query}\` ${snapshot.github_items.length}건`,
  `- 옵션: sort=${SORT}${MEDIATEK_ONLY ? ", MediaTek 계열만" : ""}${MAX_PRICE !== undefined ? `, max-price=${won(MAX_PRICE)}` : ""}`,
  `- 제외: upstream 지원 ${supported.length}개, 지원 예정(열린 add-support PR) ${pending.length}개`,
  "- 가격은 `porting/prices.json`에 직접 입력하면 반영됩니다 (`--sort=value`는 점수/만원).",
  "",
  "## 순위",
  "",
  "| # | 모델 | 점수 | SoC | Flash / RAM | 포트 | 판매(출시) | 가격 | 가장 가까운 upstream 형제 | 주의 |",
  "|---:|---|---:|---|---|---:|---|---:|---|---|",
);
for (const c of candidates) {
  const layout = c.sibling_layouts[0];
  const sibling = c.same_board.length
    ? `${c.same_board.map((m) => m.replace("ipTIME ", "")).join(", ")} (동일 보드 ${c.internal_model})`
    : layout
    ? `${layout.model.replace("ipTIME ", "")} (${layout.match})`
    : c.reference_dts[0]?.split("/").pop() ?? "-";
  push(
    `| ${c.rank} | [${md(c.model.replace("ipTIME ", ""))}](#${c.key}) | ${c.score} | ${md(c.soc)} | ${md(c.flash)} / ${md(c.ram)} | ${c.ethernet_ports} | ${md(c.sale_status || "?")} (${md(c.release_date || "?")}) | ${won(c.price_krw)} | ${md(sibling)} | ${[c.community_port ? "🧪 비공식 포팅" : "", c.upstream_merge_unlikely ? "⛔ 머지 가능성 낮음" : "", c.warnings.length ? "⚠ " + c.warnings.length : ""].filter(Boolean).join(" ")} |`,
  );
}

const reviewLines = (numbers: number[]) =>
  numbers.flatMap((n) => {
    const review = PR_REVIEWS[n];
    return review
      ? [`  - #${n} 평가 (${review.checked_at}): **${review.verdict}**`, ...review.notes.map((note) => `    - ${md(note)}`)]
      : [];
  });

push("", "## 지원 예정 (열린 add-support PR, 순위에서 제외)", "");
for (const c of pending.sort((a, b) => b.score - a.score)) {
  const prs = c.github.filter((g) => g.state === "open");
  const stale = prs.every((g) => daysSince(g.updated_at) > STALE_DAYS);
  push(
    `- **${c.model}** (점수 ${c.score} · 가격 ${won(c.price_krw)}${c.used_price_krw != null ? ` · 중고 ${won(c.used_price_krw)}` : ""}` +
      `${stale ? `, ⏸ ${STALE_DAYS}일 이상 정체 — 인수 검토 가능` : ""}): ` +
      prs.map((g) => `[#${g.number}](${g.url}) ${md(g.title)} (갱신 ${g.updated_at})`).join("; "),
    ...reviewLines(prs.map((g) => g.number)),
  );
}
if (pendingOutsideDataset.length > 0) {
  push("", "### 데이터셋에 없는 모델의 열린 PR", "", "`iptime-router-models.json`에 없는 모델이라 점수 계산 대상이 아님.", "");
  for (const { item, device } of pendingOutsideDataset) {
    push(
      `- **ipTIME ${device.model}${device.variant ? ` ${device.variant}` : ""}** (\`${device.device}\`${device.dts[0] ? `, ${device.dts[0]}` : ""}): ` +
        `[#${item.number}](${item.html_url}) ${md(item.title)} (갱신 ${item.updated_at.slice(0, 10)})`,
      ...reviewLines([item.number]),
    );
  }
}

push("", "## 이미 지원됨 (제외)", "", supported.map((c) => c.model.replace("ipTIME ", "")).join(", "), "");

push("## 상세", "");
for (const c of candidates) {
  push(`### ${c.rank}. ${c.model} <a id="${c.key}"></a>`, "");
  push(
    `- 점수 **${c.score}** · ${c.soc} · ${c.flash} / ${c.ram} · 이더넷 ${c.ethernet_ports} · USB ${c.usb} · ${c.wifi_standard}`,
    `- 판매: ${c.sale_status || "?"} · 출시 ${c.release_date || "?"} · OEM ID \`${c.oem_id || "?"}\` · 가격 ${won(c.price_krw)}${c.used_price_krw != null ? ` · 중고 ${won(c.used_price_krw)}` : ""}`,
    `- 가격 확인: [다나와](${c.links.danawa}) · [네이버쇼핑](${c.links.naver})${c.links.iptime ? ` · [제품 페이지](${c.links.iptime})` : ""}`,
    "",
    "| 항목 | 점수 | 근거 |",
    "|---|---:|---|",
    ...c.breakdown.map((b) => `| ${b.label} | ${b.points > 0 ? "+" : ""}${b.points} | ${md(b.detail)} |`),
    "",
  );
  if (c.notes.length) push(`- 조사 노트: ${c.notes.map((n) => `[${n.file.split("/").pop()}](${n.file}) (${n.relation})`).join(", ")}`);
  if (c.reference_dts.length) push(`- 참고 DTS: ${c.reference_dts.map((p) => `\`${p}\``).join(", ")}`);
  if (c.sibling_layouts.length)
    push(`- 레이아웃 비교: ${c.sibling_layouts.map((l) => `${l.model.replace("ipTIME ", "")}=${l.match}(${l.jaccard.toFixed(2)})`).join(", ")}`);
  if (c.oem_layout) push(`- OEM 파티션: \`${c.oem_layout}\``);
  if (c.github.length) push(`- GitHub: ${c.github.map((g) => `[#${g.number}](${g.url}) ${g.state}`).join(", ")}`);
  c.warnings.forEach((w) => push(`- ⚠ ${w}`));
  push("");
}

writeFileSync(join(OUT_DIR, "candidates.md"), lines.join("\n") + "\n", "utf-8");

console.log(
  `candidates=${candidates.length} pending=${pending.length} supported=${supported.length} oem-dtb=${oemDtbByModel.size} -> ${OUT_DIR}/candidates.md`,
);
console.log(candidates.slice(0, 15).map((c) => `  ${String(c.rank).padStart(2)}. ${c.model.padEnd(22)} ${String(c.score).padStart(3)}  ${c.soc}`).join("\n"));
