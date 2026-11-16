// Re-fetches the OpenWrt upstream snapshot (GitHub issues/PRs, image makefiles, DTS, iptime-crc32)
// into ./snapshot.json. `pnpm candidates` reads this file; run this first to pick up new PRs.
//
//   pnpm snapshot
//
// Auth: GITHUB_TOKEN / GH_TOKEN, otherwise `gh auth token` (gh CLI login), otherwise anonymous (60 req/h).

import { writeJsonFile } from "./cache.js";
import { fetchSnapshot, SNAPSHOT_PATH } from "./porting/snapshot.js";

const snapshot = await fetchSnapshot();
writeJsonFile(SNAPSHOT_PATH, snapshot);

const openPrs = snapshot.github_items.filter((item) => item.is_pr && item.state === "open");
console.log(
  `[snapshot] saved ${SNAPSHOT_PATH}: ${snapshot.github_items.length} issues/PRs (${openPrs.length} open PRs), ` +
    `${snapshot.upstream_devices.length} upstream ipTIME devices, tree ${snapshot.openwrt_tree_sha.slice(0, 12)}`,
);
for (const pr of openPrs.filter((item) => item.pr_devices?.length)) {
  const devices = pr.pr_devices!.map((d) => `${d.model}${d.variant ? ` ${d.variant}` : ""} (${d.device})`).join(", ");
  console.log(`  #${pr.number} ${pr.title}\n      adds: ${devices}`);
}
