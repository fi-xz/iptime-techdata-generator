# ipTIME OpenWrt 포팅 후보

- 생성: 2026-11-16T02:34:33.737Z
- 스냅샷: 2026-11-16T02:31:12.107Z · openwrt/main tree `7424e2ca306c` · GitHub 검색 `repo:openwrt/openwrt iptime` 92건
- 옵션: sort=score
- 제외: upstream 지원 18개, 지원 예정(열린 add-support PR) 5개
- 가격은 `porting/prices.json`에 직접 입력하면 반영됩니다 (`--sort=value`는 점수/만원).

## 순위

| # | 모델 | 점수 | SoC | Flash / RAM | 포트 | 판매(출시) | 가격 | 가장 가까운 upstream 형제 | 주의 |
|---:|---|---:|---|---|---:|---|---:|---|---|
| 1 | [A3004M](#a3004m) | 78 | MediaTek MT7621 | 16MB / 256MB | 5 | 단종 (2022.09) | 110,000원 | A3002MESH (동일 보드 IP04316B) | ⚠ 1 |
| 2 | [A3004TW](#a3004tw) | 76 | MediaTek MT7621 | 16MB / 128MB | 5 | 단종 (2022.06) | 61,490원 | A3002MESH (동일 보드 IP04316B) | ⚠ 1 |
| 3 | [AX3008M](#ax3008m) | 74 | MediaTek MT7981B | 128MB NAND / 256MB | 9 | 판매 중 (2024.07) | 155,100원 | AX3000M (identical) | ⚠ 1 |
| 4 | [AX6008M](#ax6008m) | 69 | MediaTek MT7986A | 128MB NAND / 512MB | 9 | 판매 중 (2024.07) | 189,000원 | AX7800M-6E (identical) | ⚠ 1 |
| 5 | [AX2004](#ax2004) | 68 | MediaTek MT7621 | 16MB / 128MB | 5 | 단종 (2022.10) | 53,590원 | AX2002MESH (partial) |  |
| 6 | [A9004M-X2](#a9004mx2) | 68 | MediaTek MT7621 | 128MB NAND / 256MB | 5 | 단종 (2019.12) | 285,000원 | mt7621_iptime_ax2002m.dts | ⚠ 1 |
| 7 | [A7004M](#a7004m) | 68 | MediaTek MT7621 | 16MB / 256MB | 5 | 단종 (2018.07) | - | mt7621_iptime_ax2002m.dts | ⚠ 1 |
| 8 | [A3003NS](#a3003ns) | 66 | MediaTek MT7621 | 16MB / 128MB | 4 | 단종 (2017.05) | - | mt7621_iptime_ax2002m.dts | ⚠ 1 |
| 9 | [A5004NS-M](#a5004nsm) | 66 | MediaTek MT7621 | 16MB / 128MB | 5 | 단종 (2018.04) | - | mt7621_iptime_ax2002m.dts | ⚠ 1 |
| 10 | [A3004-dual](#a3004dual) | 55 | MediaTek MT7621 | 4MB / 128MB | 5 | 단종 (2015.11) | - | A3004ns-dual (동일 보드 IP04290B) | ⚠ 2 |
| 11 | [A604-V3](#a604v3) | 51 | MediaTek MT7628A | 8MB / 64MB | 5 | 단종 (2017.09) | - | A3, A604M (동일 보드 IP04304) | ⚠ 2 |
| 12 | [A104](#a104) | 49 | MediaTek MT7620A | 8MB / 64MB | 5 | 단종 (2013.11) | 129,000원 | A1004NS, A104ns (동일 보드 IP04253B) | ⚠ 2 |
| 13 | [A8004T-XR](#a8004txr) | 49 | MediaTek MT7622 | 128MB NAND / 256MB | 5 | 단종 (2019.12) | 500,000원 | - | ⚠ 1 |
| 14 | [BE7200M](#be7200m) | 47 | MediaTek MT7988 | 128MB NAND / 512MB | 5 | 판매 중 (2026.10) | 165,400원 | - | ⚠ 1 |
| 15 | [BE5100M](#be5100m) | 45 | Airoha AN7563PT | 128MB NAND / 512MB | 5 | 판매 중 (2025.05) | 82,390원 | - | 🧪 비공식 포팅 ⚠ 7 |
| 16 | [AX8008M](#ax8008m) | 45 | MediaTek MT7622 | 128MB NAND / 512MB | 9 | 단종 (2022.05) | 220,000원 | - | ⚠ 2 |
| 17 | [BE7208M](#be7208m) | 43 | MediaTek MT7988 | 128MB NAND / 512MB | 9 | 판매 중 (2026.10) | 184,370원 | - | ⚠ 1 |
| 18 | [A9004M](#a9004m) | 37 | MediaTek MT7623 | 128MB NAND / 1GB | 5 | 단종 (2018.04) | 285,000원 | - | ⚠ 1 |
| 19 | [A8004NS-M](#a8004nsm) | 37 | MediaTek MT7623 | 4GB eMMC / 1GB | 5 | 단종 (2017.01) | - | - | ⚠ 1 |
| 20 | [A8ns-M](#a8nsm) | 37 | MediaTek MT7623 | 128MB / 256MB | 5 | 단종 (2017.12) | - | - | ⚠ 1 |
| 21 | [BE3600plus](#be3600plus) | 35 | Airoha AN7563PT | 128MB NAND / 256MB | 4 | 판매 중 (2026.09) | 64,700원 | - |  |
| 22 | [BE3600M](#be3600m) | 35 | Airoha AN7563PT | 128MB NAND / 512MB | 4 | 단종 (2025.04) | 71,900원 | - |  |
| 23 | [A1004](#a1004) | 32 | MediaTek MT7620A | 4MB / 64MB | 5 | 단종 (2014.06) | 43,900원 | A1004NS, A104ns (동일 보드 IP04253B) | ⚠ 3 |
| 24 | [A1004V](#a1004v) | 32 | MediaTek MT7620A | 4MB / 64MB | 5 | 단종 (2014.09) | - | A1004NS, A104ns (동일 보드 IP04253B) | ⚠ 3 |
| 25 | [AX3000R](#ax3000r) | 20 | Realtek RTL8198 | 128MB NAND / 256MB | 5 | 단종 (2024.06) | 53,690원 | - |  |
| 26 | [AX3004R](#ax3004r) | 18 | Realtek RTL8198D | 128MB / 128MB | 5 | 판매 중 (2026.02) | 44,100원 | - |  |
| 27 | [A804NS-MU](#a804nsmu) | 18 | Qualcomm QCA9561 | 16MB / 128MB | 5 | 단종 (2018.06) | 184,000원 | - |  |
| 28 | [AX3000BCM](#ax3000bcm) | 16 | Broadcom BCM6756 | 128MB NAND / 256MB | 5 | 단종 (2024.05) | 104,600원 | - |  |
| 29 | [BE9400QCA](#be9400qca) | 16 | Qualcomm IPQ5322 | 128MB NAND / 1GB | 5 | 판매 중 (2025.12) | 234,100원 | - |  |
| 30 | [AX2004BCM](#ax2004bcm) | 16 | Broadcom BCM6750 | 128MB NAND / 256MB | 5 | 단종 (2020.06) | 236,550원 | - |  |
| 31 | [AX3004BCM](#ax3004bcm) | 16 | Broadcom BCM6756 | 128MB NAND / 512MB | 5 | 단종 (2022.07) | 270,500원 | - |  |
| 32 | [BE3600QCA](#be3600qca) | 16 | Qualcomm IPQ5312 | 128MB NAND / 512MB | 4 | 단종 (2024.12) | 292,690원 | - |  |
| 33 | [AX5400BCM-6E](#ax5400bcm6e) | 16 | Broadcom BCM6756 | 128MB NAND / 512MB | 5 | 단종 (2023.04) | 346,490원 | - |  |
| 34 | [BE19000QCA](#be19000qca) | 16 | Qualcomm IPQ5424 | 256MB NAND / 2GB | 6 | 판매 중 (2026.04) | 474,100원 | - | ⚠ 1 |
| 35 | [BE19000](#be19000) | 16 | Broadcom BCM4916 | 256MB NAND / 4GB | 6 | 단종 (2024.10) | 479,000원 | - |  |
| 36 | [AX11000-6E](#ax110006e) | 16 | Broadcom BCM4908 | 128MB NAND / 1GB | 5 | 단종 (2023.05) | 479,000원 | - |  |
| 37 | [A8004BCM](#a8004bcm) | 16 | Broadcom BCM4908 | 128MB NAND / 1GB | 5 | 단종 (2020.02) | 480,000원 | - |  |
| 38 | [A5004ns](#a5004ns) | 15 | Broadcom Cortex-A9 Dual Core | 32MB / 256MB | 5 | 단종 (2014.12) | - | - |  |
| 39 | [A7NS](#a7ns) | 12 | Broadcom BCM4709 | 16MB / 256MB | 5 | 단종 (2016.07) | 285,000원 | - |  |
| 40 | [A6004ns](#a6004ns) | 12 | Broadcom BCM4709 | 32MB + 128MB / 512MB | 5 | 단종 (2015.09) | 299,000원 | - |  |
| 41 | [AX3004ITL](#ax3004itl) | 12 | Intel GRX350 | 128MB NAND / 256MB | 5 | 단종 (2020.05) | 350,000원 | - |  |
| 42 | [A8004ITL](#a8004itl) | 12 | Intel GRX350 | 128MB NAND / 512MB | 5 | 단종 (2019.06) | 350,000원 | - |  |
| 43 | [AX8004BCM](#ax8004bcm) | 12 | Broadcom BCM4908 | 128MB NAND / 1GB | 5 | 단종 (2020.01) | 724,500원 | - |  |
| 44 | [AX11000](#ax11000) | 12 | Broadcom BCM4908 | 128MB NAND / 1GB | 5 | 단종 (2022.08) | - | - |  |
| 45 | [A3004NS-BCM](#a3004nsbcm) | 12 | Broadcom BCM47189 | 16MB / 256MB | 5 | 단종 (2016.08) | - | - |  |
| 46 | [AX2004T](#ax2004t) | 10 | Realtek RTL8197F | 16MB / 128MB | 5 | 판매 중 (2025.08) | 42,100원 | - | ⚠ 4 |
| 47 | [AX1500R](#ax1500r) | 10 | Realtek RTL8197 | 16MB / 128MB | 5 | 단종 (2023.12) | 43,900원 | - | ⚠ 3 |
| 48 | [AX1500SR](#ax1500sr) | 10 | Realtek RTL8197F | 16MB / 128MB | 5 | 판매 중 (2024.05) | 44,680원 | - | ⚠ 4 |
| 49 | [A2004NS-MU](#a2004nsmu) | 10 | Realtek RTL8197F | 16MB / 128MB | 5 | 단종 (2018.12) | 118,400원 | - | ⚠ 4 |
| 50 | [A2003NS-MU](#a2003nsmu) | 10 | Realtek RTL8197F | 16MB / 128MB | 4 | 단종 (2017.08) | 134,000원 | - | ⚠ 4 |
| 51 | [A704NS-BCM](#a704nsbcm) | 10 | Broadcom BCM53573 | 16MB / 128MB | 5 | 단종 (2016.08) | - | - |  |
| 52 | [A2004NS-R](#a2004nsr) | 6 | Realtek RTL8197D | 8MB / 128MB | 5 | 단종 (2015.09) | 227,050원 | - | ⚠ 1 |
| 53 | [A3004](#a3004) | 6 | Broadcom Cortex-A9 | 8MB / 128MB | 5 | 단종 (2014.08) | - | - |  |
| 54 | [A3004ns](#a3004ns) | 6 | Broadcom Cortex-A9 | 8MB / 128MB | 5 | 단종 (2014.04) | - | - |  |
| 55 | [A2004MU](#a2004mu) | 2 | Realtek RTL8197F | 8MB / 64MB | 5 | 단종 (2018.12) | 37,900원 | - | ⚠ 5 |
| 56 | [A604](#a604) | 2 | Realtek RTL8197D | 8MB / 64MB | 5 | 단종 (2014.06) | 37,900원 | - | ⚠ 1 |
| 57 | [A604MU](#a604mu) | 2 | Realtek RTL8197FN | 8MB / 64MB | 5 | 단종 (2021.05) | 39,900원 | - | ⚠ 5 |
| 58 | [A604R](#a604r) | 2 | Realtek RTL8197FNT | 8MB / 64MB | 5 | 단종 (2019.02) | 54,870원 | - | ⚠ 5 |
| 59 | [A2004ns](#a2004ns) | 2 | Realtek RTL8197D | 8MB / 64MB | 5 | 단종 (2013.06) | 124,000원 | - | ⚠ 2 |
| 60 | [A604G-MU](#a604gmu) | 2 | Realtek RTL8197F | 8MB / 64MB | 5 | 단종 (2018.08) | 149,000원 | - | ⚠ 5 |
| 61 | [A604V](#a604v) | 2 | Realtek RTL8197D | 8MB / 64MB | 5 | 단종 (2014.07) | 169,000원 | - | ⚠ 1 |
| 62 | [A2004](#a2004) | 2 | Realtek RTL8197D | 8MB / 64MB | 5 | 단종 (2013.11) | - | - | ⚠ 2 |
| 63 | [A2004NSplus](#a2004nsplus) | 2 | Realtek RTL8197D | 8MB / 64MB | 5 | 단종 (2014.04) | - | - | ⚠ 2 |
| 64 | [A2004R](#a2004r) | -15 | Realtek RTL8197D | 4MB / 64MB | 5 | 단종 (2015.10) | 74,000원 | - | ⚠ 3 |
| 65 | [A2008](#a2008) | -15 | Realtek RTL8197D | 4MB / 64MB | 5 | 단종 (2015.02) | 259,000원 | - | ⚠ 3 |
| 66 | [A2004plus](#a2004plus) | -15 | Realtek RTL8197D | 4MB / 64MB | 5 | 단종 (2014.05) | - | - | ⚠ 3 |
| 67 | [A2004SE](#a2004se) | -20 | Realtek RTL8197FH | 16MB / 128MB | 5 | 단종 (2022.08) | 37,900원 | - | ⛔ 머지 가능성 낮음 ⚠ 3 |
| 68 | [A2004SR](#a2004sr) | -24 | Realtek RTL8197F | 16MB / 64MB | 5 | 판매 중 (2024.11) | 30,900원 | - | ⛔ 머지 가능성 낮음 ⚠ 4 |
| 69 | [A2002SR](#a2002sr) | -24 | Realtek RTL8197F | 16MB / 64MB | 3 | 단종 (2024.08) | 36,470원 | - | ⛔ 머지 가능성 낮음 ⚠ 4 |
| 70 | [A604SR](#a604sr) | -28 | Realtek RTL8197FH | 8MB / 64MB | 5 | 판매 중 (2025.02) | 27,900원 | - | ⛔ 머지 가능성 낮음 ⚠ 3 |
| 71 | [A2004S](#a2004s) | -28 | Realtek RTL8197F | 8MB / 64MB | 5 | 단종 (2024.01) | 31,270원 | - | ⛔ 머지 가능성 낮음 ⚠ 4 |
| 72 | [A604SE](#a604se) | -28 | Realtek RTL8197FH | 8MB / 64MB | 5 | 단종 (2022.10) | 36,990원 | - | ⛔ 머지 가능성 낮음 ⚠ 3 |
| 73 | [A2003MU](#a2003mu) | -28 | Realtek RTL8197F | 8MB / 64MB | 4 | 단종 (2021.08) | 114,000원 | - | ⛔ 머지 가능성 낮음 ⚠ 4 |
| 74 | [A104r](#a104r) | -30 | Realtek RTL8881A | 4MB / 32MB | 5 | 단종 (2015.07) | 119,000원 | - | ⚠ 2 |
| 75 | [A304](#a304) | -30 | Realtek RTL8881A | 4MB / 32MB | 5 | 단종 (2018.04) | 129,000원 | - | ⚠ 2 |
| 76 | [A1](#a1) | -30 | Realtek RTL8881A | 4MB / 32MB | 3 | 단종 (2016.09) | - | - | ⚠ 2 |

## 지원 예정 (열린 add-support PR, 순위에서 제외)

- **ipTIME AX3000plus** (점수 90 · 가격 55,150원): [#26627](https://github.com/openwrt/openwrt/pull/26627) mediatek: filogic: add support for ipTIME AX3000plus (갱신 2026-11-16)
  - #26627 평가 (2026-11-16): **머지 가능성 높음 — 블로커는 firmware-utils#89**
    - AX3000Q와 동일 HW(OEM DTB model도 'ipTIME AX3000Q') → mt7981b-iptime-ax3000q.dts를 include하고 model/compatible만 바꾼 8줄 DTS. 변경 범위 최소
    - 실기 테스트: OEM 복구툴(A/B 슬롯 양쪽), TFTP, sysupgrade, fw_setenv boot_from B로 순정 복귀, Wi-Fi/WAN/LAN/LED/버튼, MAC 일치
    - 블로커: openwrt/firmware-utils#89(iptime-crc32 ax3000p) 미머지 → 머지 후 tools/firmware-utils 버전 bump도 필요
    - uboot-tools PKG_RELEASE 미증가 (봇 경고 미반영). #26729도 같은 PKG_RELEASE를 올려서 늦게 머지되는 쪽은 rebase 필요
    - 리뷰어 achterin 지적(11_fix_wifi_mac case 순서) 반영 완료. 빌드 CI는 아직 안 돌았음 (FormalityCheck만 통과)
- **ipTIME AX6000M** (점수 89 · 가격 159,400원): [#24510](https://github.com/openwrt/openwrt/pull/24510) mediatek: filogic: add support for ipTIME AX6000M (갱신 2026-08-10); [#22387](https://github.com/openwrt/openwrt/pull/22387) mediatek: filogic: add support for ipTIME AX6000M (갱신 2026-05-16)
- **ipTIME A3004NS-M** (점수 81 · 가격 227,050원): [#24707](https://github.com/openwrt/openwrt/pull/24707) ramips: add support for ipTIME A3004NS-M (갱신 2026-08-18); [#22574](https://github.com/openwrt/openwrt/pull/22574) ramips: add support for ipTIME A3004NS-M (갱신 2026-04-16)
- **ipTIME A3008-MU** (점수 75 · 가격 159,000원): [#26105](https://github.com/openwrt/openwrt/pull/26105) mediatek: add support iptime A3008-MU (갱신 2026-10-23)
- **ipTIME AX8004M** (점수 58 · 가격 178,000원 · 중고 90,000원): [#13118](https://github.com/openwrt/openwrt/pull/13118) mediatek: mt7622: Add support for ipTIME AX8004M (갱신 2026-08-10)

### 데이터셋에 없는 모델의 열린 PR

`iptime-router-models.json`에 없는 모델이라 점수 계산 대상이 아님.

- **ipTIME BE5100plus** (`iptime_be5100p`, mt7987a-iptime-be5100p): [#26729](https://github.com/openwrt/openwrt/pull/26729) mediatek: filogic: add support for ipTIME BE5100plus (갱신 2026-11-15)
  - #26729 평가 (2026-11-16): **완성도 높음, 머지 가능성 중상 — 블로커는 firmware-utils#91 + 리뷰 대기**
    - MT7987A + AN8855(4 LAN) + 내장 2.5G PHY(WAN) + MT7992. 신규 DTS 468줄, 빌드 CI 전부 통과
    - 스톡 MediaTek dual-boot: 기존 mtk_dual_boot_flash_both_slots(ltc,vl7m19k 선례)로 양 슬롯 기록 + bootcount에서 dual_boot.slot_*_invalid 초기화. U-Boot 폴백 보호를 사실상 끄는 방식이라 리뷰어가 의도를 물을 수 있음
    - factory.bin에 IMAGE_SIZE/check-size 없음, &pcie1 disabled는 dtsi 기본값이면 중복 — 리뷰 nit 예상
    - 블로커: openwrt/firmware-utils#91(iptime-crc32 be5100p) 미머지 → 머지 후 tools/firmware-utils bump 필요
    - techdata 데이터셋(iptime-router-models.json)에 BE5100plus 없음 — 순위 계산 대상이 아님

## 이미 지원됨 (제외)

AX2002MESH, AX2004M, AX3000M, AX3000Q, AX3000SE, AX3000SM, AX7800M-6E, A1004NS, A104ns, A3, A3002MESH, A3004ns-dual, A3004T, A6004MX, A6004NS-M, A604M, A6ns-M, A8004T

## 상세

### 1. ipTIME A3004M <a id="a3004m"></a>

- 점수 **78** · MediaTek MT7621 · 16MB / 256MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2022.09 · OEM ID `a3004m` · 가격 110,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004M) · [제품 페이지](https://iptime.com/products/651)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04316B = A3002MESH (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a3004m)으로 factory 이미지 생성 가능 |
| Flash | +6 | 16MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 2. ipTIME A3004TW <a id="a3004tw"></a>

- 점수 **76** · MediaTek MT7621 · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2022.06 · OEM ID `a3004tw` · 가격 61,490원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004TW) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004TW) · [제품 페이지](https://iptime.com/products/619)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04316B = A3002MESH (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a3004tw)으로 factory 이미지 생성 가능 |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 3. ipTIME AX3008M <a id="ax3008m"></a>

- 점수 **74** · MediaTek MT7981B · 128MB NAND / 256MB · 이더넷 9 · USB 0 · Wi-Fi 6
- 판매: 판매 중 · 출시 2024.07 · OEM ID `ax3008m` · 가격 155,100원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3008M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3008M) · [제품 페이지](https://iptime.com/products/793)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7981 (upstream DTS 134개) — mediatek/filogic: ipTIME AX3000 계열 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX3000M, AX3000Q, AX3000SE, AX3000SM |
| 플래시 방식 일치 | +4 | NAND/eMMC — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| OEM 파티션 레이아웃 | +12 | AX3000M와(과) identical (label Jaccard 1.00) |
| OEM DTB 확보 | +4 | 11ax/ax3008m/ax3008m_ml_16_006.bin @0x33c214 (mediatek,mt7981-spim-snand-rtk) |
| 형제 대비 신규 HW 블록 | -2 | mediatek,mt7981-spim-snand-rtk, mediatek,rtk-gsw |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `mediatek,rtk-gsw`, si 스위치: rtl8370mb): OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고) |
| factory 이미지 도구 | 0 | iptime-crc32에 'ax3008m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7976 / mt7976 |
| 포트 구성 | -4 | 9포트(8 LAN) — 외장/캐스케이드 스위치 여부 확인 필요 |

- 참고 DTS: `target/linux/mediatek/dts/mt7981b-iptime-ax3000m.dts`, `target/linux/mediatek/dts/mt7981b-iptime-ax3000q.dts`, `target/linux/mediatek/dts/mt7981b-iptime-ax3000se.dts`, `target/linux/mediatek/dts/mt7981b-iptime-ax3000sm.dts`
- 레이아웃 비교: AX3000M=identical(1.00), AX3000Q=identical(1.00), AX3000SE=identical(1.00), AX3000SM=identical(1.00)
- OEM 파티션: `BL2@0x0+0x100000, u-boot-env@0x100000+0x80000, Factory@0x180000+0x200000, FIP@0x380000+0x200000, ubi@0x580000+0x6e00000`
- ⚠ 스위치(rtl8370mb): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 4. ipTIME AX6008M <a id="ax6008m"></a>

- 점수 **69** · MediaTek MT7986A · 128MB NAND / 512MB · 이더넷 9 · USB 1 · Wi-Fi 6
- 판매: 판매 중 · 출시 2024.07 · OEM ID `ax6008m` · 가격 189,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX6008M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX6008M) · [제품 페이지](https://iptime.com/products/791)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +33 | mt7986 (upstream DTS 49개) — mediatek/filogic: 성숙, Wi-Fi(mt7915/mt7986) 안정 |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX7800M-6E |
| 플래시 방식 일치 | +4 | NAND/eMMC — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| OEM 파티션 레이아웃 | +12 | AX7800M-6E와(과) identical (label Jaccard 1.00) |
| OEM DTB 확보 | +4 | 11ax/ax6008m/ax6008m_ml_16_006.bin @0x3e1014 (mediatek,mt7986a-spim-snand-rfb) |
| 형제 대비 신규 HW 블록 | -5 | mediatek,mt7986a-spim-snand-rfb, mediatek,mt79xx-si3218x-machine, mediatek,mt79xx-wm8960-machine, mediatek,rtk-gsw, silabs,proslic_spi |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `mediatek,rtk-gsw`, si 스위치: rtl8370mb): OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고) |
| factory 이미지 도구 | 0 | iptime-crc32에 'ax6008m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7975 / mt7975 |
| 포트 구성 | -4 | 9포트(8 LAN) — 외장/캐스케이드 스위치 여부 확인 필요 |

- 참고 DTS: `target/linux/mediatek/dts/mt7986a-iptime-ax7800m-6e.dts`
- 레이아웃 비교: AX7800M-6E=identical(1.00)
- OEM 파티션: `BL2@0x0+0x100000, u-boot-env@0x100000+0x80000, Factory@0x180000+0x200000, FIP@0x380000+0x200000, ubi@0x580000+0x6e00000`
- ⚠ 스위치(rtl8370mb): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 5. ipTIME AX2004 <a id="ax2004"></a>

- 점수 **68** · MediaTek MT7621 · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 단종 · 출시 2022.10 · OEM ID `ax2004` · 가격 53,590원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX2004) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX2004) · [제품 페이지](https://iptime.com/products/655)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| OEM 파티션 레이아웃 | +4 | AX2002MESH와(과) partial (label Jaccard 0.57) |
| OEM DTB 확보 | +4 | 11ax/ax2004/ax2004_ml_16_006.bin @0x37ff44 (mediatek,mt7621-rfb-nor-ax2004, mediatek,mt7621-soc) |
| 형제 대비 신규 HW 블록 | -2 | jedec,spi-nor, mediatek,mt7621-rfb-nor-ax2004 |
| 스위치(정보) | 0 | MediaTek SDK mt753x (OEM DTB `mediatek,mt753x`, si 스위치: mt7621): OEM은 MediaTek SDK 전용 `mt753x` gsw 드라이버를 씀 (upstream에 없는 바인딩) — OEM 스위치 노드는 그대로 못 쓰고 upstream DSA 노드(`mediatek,mt7621` 내장 스위치 또는 `mediatek,mt7531`)로 새로 써야 함. 포트 번호는 si switch_mapping 기준 · upstream 형제 AX2002MESH, AX2004M도 OEM이 동일 → 형제 DTS의 스위치 노드 재사용 |
| factory 이미지 도구 | 0 | iptime-crc32에 'ax2004' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | mt7915 / mt7915 |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- 레이아웃 비교: AX2002MESH=partial(0.57), AX2004M=partial(0.57)
- OEM 파티션: `Bootloader@0x0+0x40000, Config@0x40000+0x10000, Factory@0x50000+0x40000, firmware@0x90000+0xf00000, rootfs_data@0xf90000+0x70000`

### 6. ipTIME A9004M-X2 <a id="a9004mx2"></a>

- 점수 **68** · MediaTek MT7621 · 128MB NAND / 256MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2019.12 · OEM ID `a9004x2` · 가격 285,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A9004M-X2) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A9004M-X2) · [제품 페이지](https://iptime.com/products/437)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NAND/eMMC — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a9004x2)으로 factory 이미지 생성 가능 |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 / mt7613e |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 7. ipTIME A7004M <a id="a7004m"></a>

- 점수 **68** · MediaTek MT7621 · 16MB / 256MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2018.07 · OEM ID `a7004m` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A7004M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A7004M) · [제품 페이지](https://iptime.com/products/376)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a7004m)으로 factory 이미지 생성 가능 |
| Flash | +6 | 16MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 8. ipTIME A3003NS <a id="a3003ns"></a>

- 점수 **66** · MediaTek MT7621 · 16MB / 128MB · 이더넷 4 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2017.05 · OEM ID `a3003ns` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3003NS) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3003NS) · [제품 페이지](https://iptime.com/products/331)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a3003ns)으로 factory 이미지 생성 가능 |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | mt7603e / mt7612e |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 9. ipTIME A5004NS-M <a id="a5004nsm"></a>

- 점수 **66** · MediaTek MT7621 · 16MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2018.04 · OEM ID `a5004nm` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A5004NS-M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A5004NS-M) · [제품 페이지](https://iptime.com/products/370)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a5004nm)으로 factory 이미지 생성 가능 |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 10. ipTIME A3004-dual <a id="a3004dual"></a>

- 점수 **55** · MediaTek MT7621 · 4MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2015.11 · OEM ID `a3004d` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004-dual) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004-dual) · [제품 페이지](https://iptime.com/products/277)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +35 | mt7621 (upstream DTS 301개) — ramips/mt7621: 가장 성숙한 플랫폼, ipTIME 보드 다수 upstream |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: AX2002MESH, AX2004M, A3002MESH, A3004ns-dual, A3004T, A6004NS-M, A6ns-M, A8004T |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04290B = A3004ns-dual (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a3004d)으로 factory 이미지 생성 가능 |
| Flash | -15 | 4MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | mt7602e / mt7612e |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2002m.dts`, `target/linux/ramips/dts/mt7621_iptime_ax2004m.dts`, `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a6004ns-m.dtsi`, `target/linux/ramips/dts/mt7621_iptime_a6ns-m.dts`, `target/linux/ramips/dts/mt7621_iptime_a8004t.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요
- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가

### 11. ipTIME A604-V3 <a id="a604v3"></a>

- 점수 **51** · MediaTek MT7628A · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2017.09 · OEM ID `a604v3` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604-V3) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604-V3) · [제품 페이지](https://iptime.com/products/349)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +18 | mt7628 (upstream DTS 138개) — ramips/mt76x8: 성숙하지만 저사양(8/64) 위주 |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: A3, A604M |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04304 = A3, A604M (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a604v3)으로 factory 이미지 생성 가능 |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | internal |

- 참고 DTS: `target/linux/ramips/dts/mt7621_iptime_a3002mesh.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004ns-dual.dts`, `target/linux/ramips/dts/mt7621_iptime_a3004t.dts`, `target/linux/ramips/dts/mt7628an_iptime_a3.dts`, `target/linux/ramips/dts/mt7628an_iptime_a604m.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 12. ipTIME A104 <a id="a104"></a>

- 점수 **49** · MediaTek MT7620A · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2013.11 · OEM ID `a104` · 가격 129,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A104) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A104) · [제품 페이지](https://iptime.com/products/215)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +16 | mt7620 (upstream DTS 140개) — ramips/mt7620: 레거시, 저사양 보드는 이미지 크기 압박 |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: A1004NS, A104ns |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04253B = A1004NS, A104ns (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a104)으로 factory 이미지 생성 가능 |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | internal / mt7610e |

- 참고 DTS: `target/linux/ramips/dts/mt7620a_iptime_a1004ns.dts`, `target/linux/ramips/dts/mt7620a_iptime_a104ns.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 13. ipTIME A8004T-XR <a id="a8004txr"></a>

- 점수 **49** · MediaTek MT7622 · 128MB NAND / 256MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2019.12 · OEM ID `a8txr` · 가격 500,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A8004T-XR) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A8004T-XR) · [제품 페이지](https://iptime.com/products/439)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +30 | mt7622 (upstream DTS 24개) — mediatek/mt7622: 성숙, 단 신규 보드 유입은 적음 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| OEM DTB 확보 | +4 | 11ac_11n/a8004txr/a8txr_ml_16_006.bin @0x28499c (mediatek,mt7622-ac2600rfb1, mediatek,mt7622) |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `mediatek,rtk-gsw`, si 스위치: mt7531): si에는 Realtek 스위치가 없음 → SDK 공통 DTS에 남은 미사용 노드로 보임, 포팅 시 무시 |
| factory 이미지 도구 | 0 | iptime-crc32에 'a8txr' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7622 / mt7615 |

- OEM 파티션: `Preloader@0x0+0x80000, ATF@0x80000+0x40000, Bootloader@0xc0000+0x80000, Config@0x140000+0x80000, Factory@0x1c0000+0x40000, Kernel@0x200000+0x2000000, User_data@0x2200000+0x4000000, Preloader@0x0+0x80000, ATF@0x80000+0x40000, Bootloader@0xc0000+0x80000, Config@0x140000+0x80000, Factory@0x1c0000+0x40000, KernelA@0x200000+0x2000000, KernelB@0x2200000+0x2000000, User_data@0x4200000+0x33c0000, Preloader@0x0+0x40000, ATF@0x40000+0x20000, Bootloader@0x60000+0x40000, Config@0xa0000+0x20000, Factory@0xc0000+0x20000, Kernel@0xe0000+0xf20000`
- ⚠ 스위치 MediaTek SDK mt753x (OEM DTB `mediatek,mt753x`, si 스위치: mt7531): OEM은 MediaTek SDK 전용 `mt753x` gsw 드라이버를 씀 (upstream에 없는 바인딩) — OEM 스위치 노드는 그대로 못 쓰고 upstream DSA 노드(`mediatek,mt7621` 내장 스위치 또는 `mediatek,mt7531`)로 새로 써야 함. 포트 번호는 si switch_mapping 기준

### 14. ipTIME BE7200M <a id="be7200m"></a>

- 점수 **47** · MediaTek MT7988 · 128MB NAND / 512MB · 이더넷 5 · USB 1 · Wi-Fi 7
- 판매: 판매 중 · 출시 2026.10 · OEM ID `be7200m` · 가격 165,400원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE7200M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE7200M) · [제품 페이지](https://iptime.com/products/1003)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +28 | mt7988 (upstream DTS 17개) — mediatek/filogic: Wi-Fi 7(mt7996) 지원 중, 아직 활발히 변하는 중 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| OEM DTB 확보 | +4 | 11be/be7200m/be7200m_ml_16_006.bin @0x388d7c (efm,be7200m-snand, efm,be7200m, mediatek,mt7988) |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `realtek,rtk-8372n-gsw`, si 스위치: mt7988 + rtl8372n): OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고) |
| factory 이미지 도구 | 0 | iptime-crc32에 'be7200m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7992av / mt7992av |

- OEM 파티션: `BL2@0x0+0x100000, u-boot-env@0x100000+0x80000, Factory@0x180000+0x400000, FIP@0x580000+0x200000, ubi@0x780000+0x7080000`
- ⚠ 스위치(mt7988 + rtl8372n): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 15. ipTIME BE5100M <a id="be5100m"></a>

- 점수 **45** · Airoha AN7563PT · 128MB NAND / 512MB · 이더넷 5 · USB 1 · Wi-Fi 7
- 판매: 판매 중 · 출시 2025.05 · OEM ID `be5100m` · 가격 82,390원 · 중고 95,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE5100M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE5100M) · [제품 페이지](https://iptime.com/products/879)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +14 | an7563 (upstream DTS 0개) — airoha/an7563 미머지 — openwrt#23960(AN7563/AN7552 + Xiaomi BE5000, CHANGES_REQUESTED), openwrt#26339(AN7563 base + TP-Link XX530v v2, 2026-10 신규) 리뷰 중. 어느 쪽이 머지되느냐에 따라 보드 DTS 라벨/드라이버가 바뀔 수 있음 |
| 비공식 포팅 존재 | +15 | junkim0215/openwrt be5100m-r115: BE5100M 보드 커밋 4개(1개 revert)가 AN7563 비공식 포팅(Iscle·Ray Liu·Pavel Bragin, Xiaomi BE5000용 ~110커밋) 위에 얹힘. 스톡 듀얼슬롯 유지(tclinux_slave에 설치, 스톡 웹 UI factory.bin), Factory nvmem MAC/EEPROM, mt7996e(MT7992)+NPU 오프로드 (https://github.com/junkim0215/openwrt/commits/be5100m-r115/) |
| OEM DTB 확보 | +4 | 11be/be5100m/be5100m_ml_16_006.bin @0x2234 (econet,en7523, airoha,en7523) |
| factory 이미지 도구 | 0 | iptime-crc32에 'be5100m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7991a / mt7991a |

- ⚠ [포팅 리뷰] DTS에 gpio-keys 없음 — si 기준 reset=GPIO0, wps=GPIO5 (active-low) 추가 필요 (failsafe/리셋 불가)
- ⚠ [포팅 리뷰] LAN 라벨 순서 확인 필요 — si net은 물리 LAN1→switch reg3 … LAN4→reg0 (역순), DTS는 gsw_port1..4 = lan1..4 오름차순
- ⚠ [포팅 리뷰] SoC 레벨 노드(usb@1fab0000, usb phy, /memreserve/ ATF)가 보드 DTS에 있음 — an7563.dtsi로 이동해야 upstream 리뷰 통과
- ⚠ [포팅 리뷰] 이미지 생성이 scripts/iptime-be-image.py(Python) — upstream 관례상 firmware-utils C 도구로 옮겨야 함
- ⚠ [포팅 리뷰] 스톡 U-Boot의 root=/dev/mtdblockN에 맞추려고 파티션 DT 순서를 주소 순서와 다르게 배치 — 리뷰어가 문제 삼을 가능성 큼
- ⚠ [포팅 리뷰] en8811h 'airoha,led-active-low' 커스텀 DT 속성 패치 — 바인딩 upstream 필요
- ⚠ [포팅 리뷰] 브랜치에 VPN/xray/NPU 펌웨어 등 보드와 무관한 커밋 다수 — PR 시 보드 커밋만 분리 필요

### 16. ipTIME AX8008M <a id="ax8008m"></a>

- 점수 **45** · MediaTek MT7622 · 128MB NAND / 512MB · 이더넷 9 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2022.05 · OEM ID `ax8008m` · 가격 220,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX8008M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX8008M) · [제품 페이지](https://iptime.com/products/617)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +30 | mt7622 (upstream DTS 24개) — mediatek/mt7622: 성숙, 단 신규 보드 유입은 적음 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| OEM DTB 확보 | +4 | 11ax/ax8008m/ax8008m_ml_16_006.bin @0x22e790 (mediatek,mt7622-ac2600rfb1, mediatek,mt7622) |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `mediatek,rtk-gsw`, si 스위치: mt7531 + rtl8370 (cpu-switch port 0)): OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고) |
| factory 이미지 도구 | 0 | iptime-crc32에 'ax8008m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7622 / mt7915 |
| 포트 구성 | -4 | 9포트(8 LAN) — 외장/캐스케이드 스위치 여부 확인 필요 |

- OEM 파티션: `Preloader@0x0+0x80000, ATF@0x80000+0x40000, Bootloader@0xc0000+0x80000, Config@0x140000+0x80000, Factory@0x1c0000+0x100000, Kernel@0x2c0000+0x2000000, User_data@0x22c0000+0x4000000, Preloader@0x0+0x80000, ATF@0x80000+0x40000, Bootloader@0xc0000+0x80000, Config@0x140000+0x80000, Factory@0x1c0000+0x40000, firmware1@0x200000+0x2000000, firmware2@0x2200000+0x2000000, rootfs_data@0x4200000+0x3000000, Preloader@0x0+0x40000, ATF@0x40000+0x20000, Bootloader@0x60000+0x40000, Config@0xa0000+0x20000, Factory@0xc0000+0x80000, Kernel@0x140000+0xec0000`
- ⚠ 스위치 MediaTek SDK mt753x (OEM DTB `mediatek,mt753x`, si 스위치: mt7531 + rtl8370 (cpu-switch port 0)): OEM은 MediaTek SDK 전용 `mt753x` gsw 드라이버를 씀 (upstream에 없는 바인딩) — OEM 스위치 노드는 그대로 못 쓰고 upstream DSA 노드(`mediatek,mt7621` 내장 스위치 또는 `mediatek,mt7531`)로 새로 써야 함. 포트 번호는 si switch_mapping 기준
- ⚠ 스위치(mt7531 + rtl8370 (cpu-switch port 0)): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 17. ipTIME BE7208M <a id="be7208m"></a>

- 점수 **43** · MediaTek MT7988 · 128MB NAND / 512MB · 이더넷 9 · USB 1 · Wi-Fi 7
- 판매: 판매 중 · 출시 2026.10 · OEM ID `be7208m` · 가격 184,370원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE7208M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE7208M) · [제품 페이지](https://iptime.com/products/1002)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +28 | mt7988 (upstream DTS 17개) — mediatek/filogic: Wi-Fi 7(mt7996) 지원 중, 아직 활발히 변하는 중 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| OEM DTB 확보 | +4 | 11be/be7208m/be7208m_ml_16_006.bin @0x388d7c (efm,be7208m-snand, efm,be7208m, mediatek,mt7988) |
| 스위치(정보) | 0 | Realtek SDK rtk-gsw (OEM DTB `realtek,rtk-8372n-gsw`, si 스위치: mt7988 + rtl8372n): OEM은 Realtek SDK 스위치 드라이버(`rtk-gsw`)로 외장 Realtek 스위치를 제어 — upstream에서는 DSA rtl8365mb로 대체 (칩 지원 여부는 스위치 경고 참고) |
| factory 이미지 도구 | 0 | iptime-crc32에 'be7208m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7992av / mt7992av |
| 포트 구성 | -4 | 9포트(8 LAN) — 외장/캐스케이드 스위치 여부 확인 필요 |

- OEM 파티션: `BL2@0x0+0x100000, u-boot-env@0x100000+0x80000, Factory@0x180000+0x400000, FIP@0x580000+0x200000, ubi@0x780000+0x7080000`
- ⚠ 스위치(mt7988 + rtl8372n): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 18. ipTIME A9004M <a id="a9004m"></a>

- 점수 **37** · MediaTek MT7623 · 128MB NAND / 1GB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2018.04 · OEM ID `a9004m` · 가격 285,000원 · 중고 70,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A9004M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A9004M) · [제품 페이지](https://iptime.com/products/539)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +22 | mt7623 (upstream DTS 2개) — mediatek/mt7623: 레거시 성격 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| factory 이미지 도구 | 0 | iptime-crc32에 'a9004m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 / mt7615 |

- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 19. ipTIME A8004NS-M <a id="a8004nsm"></a>

- 점수 **37** · MediaTek MT7623 · 4GB eMMC / 1GB · 이더넷 5 · USB 2 · Wi-Fi 5
- 판매: 단종 · 출시 2017.01 · OEM ID `a8004nm` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A8004NS-M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A8004NS-M) · [제품 페이지](https://iptime.com/products/317)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +22 | mt7623 (upstream DTS 2개) — mediatek/mt7623: 레거시 성격 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| factory 이미지 도구 | 0 | iptime-crc32에 'a8004nm' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 4GB eMMC |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 20. ipTIME A8ns-M <a id="a8nsm"></a>

- 점수 **37** · MediaTek MT7623 · 128MB / 256MB · 이더넷 5 · USB 2 · Wi-Fi 5
- 판매: 단종 · 출시 2017.12 · OEM ID `a8nm` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A8ns-M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A8ns-M) · [제품 페이지](https://iptime.com/products/359)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +22 | mt7623 (upstream DTS 2개) — mediatek/mt7623: 레거시 성격 |
| ipTIME 형제 보드 | +3 | 같은 SoC의 upstream ipTIME 보드는 없음 — 타사 보드 DTS 참고 필요 |
| factory 이미지 도구 | 0 | iptime-crc32에 'a8nm' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7615 / mt7615 |

- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요

### 21. ipTIME BE3600plus <a id="be3600plus"></a>

- 점수 **35** · Airoha AN7563PT · 128MB NAND / 256MB · 이더넷 4 · USB 0 · Wi-Fi 7
- 판매: 판매 중 · 출시 2026.09 · OEM ID `be3600p` · 가격 64,700원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE3600plus) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE3600plus) · [제품 페이지](https://iptime.com/products/996)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +14 | an7563 (upstream DTS 0개) — airoha/an7563 미머지 — openwrt#23960(AN7563/AN7552 + Xiaomi BE5000, CHANGES_REQUESTED), openwrt#26339(AN7563 base + TP-Link XX530v v2, 2026-10 신규) 리뷰 중. 어느 쪽이 머지되느냐에 따라 보드 DTS 라벨/드라이버가 바뀔 수 있음 |
| 같은 SoC 비공식 포팅 | +5 | BE5100M 포팅을 템플릿으로 사용 가능 |
| OEM DTB 확보 | +4 | 11be/be3600plus/be3600p_ml_16_006.bin @0x2234 (econet,en7523, airoha,en7523) |
| factory 이미지 도구 | 0 | iptime-crc32에 'be3600p' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | mt7990an / mt7990an |


### 22. ipTIME BE3600M <a id="be3600m"></a>

- 점수 **35** · Airoha AN7563PT · 128MB NAND / 512MB · 이더넷 4 · USB 0 · Wi-Fi 7
- 판매: 단종 · 출시 2025.04 · OEM ID `be3600m` · 가격 71,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE3600M) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE3600M) · [제품 페이지](https://iptime.com/products/877)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +14 | an7563 (upstream DTS 0개) — airoha/an7563 미머지 — openwrt#23960(AN7563/AN7552 + Xiaomi BE5000, CHANGES_REQUESTED), openwrt#26339(AN7563 base + TP-Link XX530v v2, 2026-10 신규) 리뷰 중. 어느 쪽이 머지되느냐에 따라 보드 DTS 라벨/드라이버가 바뀔 수 있음 |
| 같은 SoC 비공식 포팅 | +5 | BE5100M 포팅을 템플릿으로 사용 가능 |
| OEM DTB 확보 | +4 | 11be/be3600m/be3600m_ml_16_006.bin @0x2234 (econet,en7523, airoha,en7523) |
| factory 이미지 도구 | 0 | iptime-crc32에 'be3600m' 추가 필요 (firmware-utils PR) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | mt7991a / mt7991a |


### 23. ipTIME A1004 <a id="a1004"></a>

- 점수 **32** · MediaTek MT7620A · 4MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.06 · OEM ID `a1004` · 가격 43,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A1004) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A1004) · [제품 페이지](https://iptime.com/products/232)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +16 | mt7620 (upstream DTS 140개) — ramips/mt7620: 레거시, 저사양 보드는 이미지 크기 압박 |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: A1004NS, A104ns |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04253B = A1004NS, A104ns (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a1004)으로 factory 이미지 생성 가능 |
| Flash | -15 | 4MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | internal / mt7610e |

- 참고 DTS: `target/linux/ramips/dts/mt7620a_iptime_a1004ns.dts`, `target/linux/ramips/dts/mt7620a_iptime_a104ns.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요
- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 24. ipTIME A1004V <a id="a1004v"></a>

- 점수 **32** · MediaTek MT7620A · 4MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.09 · OEM ID `a1004v` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A1004V) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A1004V) · [제품 페이지](https://iptime.com/products/239)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +16 | mt7620 (upstream DTS 140개) — ramips/mt7620: 레거시, 저사양 보드는 이미지 크기 압박 |
| ipTIME 형제 보드 | +13 | 같은 SoC의 upstream ipTIME 보드: A1004NS, A104ns |
| 플래시 방식 일치 | +4 | NOR — 형제 보드와 동일한 부팅/이미지 방식 재사용 가능 |
| 동일 내부 보드명 | +10 | IP04253B = A1004NS, A104ns (upstream 지원) |
| factory 이미지 도구 | +4 | ramips 방식(UIMAGE_NAME := a1004v)으로 factory 이미지 생성 가능 |
| Flash | -15 | 4MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | internal / mt7610e |

- 참고 DTS: `target/linux/ramips/dts/mt7620a_iptime_a1004ns.dts`, `target/linux/ramips/dts/mt7620a_iptime_a104ns.dts`
- ⚠ OEM 펌웨어에서 DTB를 찾지 못함 (lzma 압축 커널 등) — 시리얼/덤프로 확인 필요
- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 25. ipTIME AX3000R <a id="ax3000r"></a>

- 점수 **20** · Realtek RTL8198 · 128MB NAND / 256MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 단종 · 출시 2024.06 · OEM ID `ax3000r` · 가격 53,690원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3000R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3000R) · [제품 페이지](https://iptime.com/products/785)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +8 | rtl8198 (upstream DTS 1개) — upstream 타겟은 있으나 MediaTek 외 (무선 드라이버/부트로더 제약 확인 필요) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | rtl8192xbr / rtl8832cr |


### 26. ipTIME AX3004R <a id="ax3004r"></a>

- 점수 **18** · Realtek RTL8198D · 128MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 판매 중 · 출시 2026.02 · OEM ID `ax3004r` · 가격 44,100원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3004R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3004R) · [제품 페이지](https://iptime.com/products/955)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +8 | rtl8198 (upstream DTS 1개) — upstream 타겟은 있으나 MediaTek 외 (무선 드라이버/부트로더 제약 확인 필요) |
| Flash | +6 | 128MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8192frh / rtl8832cr |


### 27. ipTIME A804NS-MU <a id="a804nsmu"></a>

- 점수 **18** · Qualcomm QCA9561 · 16MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2018.06 · OEM ID `a804nm` · 가격 184,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A804NS-MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A804NS-MU) · [제품 페이지](https://iptime.com/products/373)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | +8 | qca9561 (upstream DTS 12개) — upstream 타겟은 있으나 MediaTek 외 (무선 드라이버/부트로더 제약 확인 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | qca9561 / qca9886 |


### 28. ipTIME AX3000BCM <a id="ax3000bcm"></a>

- 점수 **16** · Broadcom BCM6756 · 128MB NAND / 256MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 단종 · 출시 2024.05 · OEM ID `ax3000b` · 가격 104,600원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3000BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3000BCM) · [제품 페이지](https://iptime.com/products/781)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm6756 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ax/ax3000bcm/ax3000b_ml_16_006.bin @0x62afa4 (brcm,bcm96756) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | bcm6756 / bcm6756 |


### 29. ipTIME BE9400QCA <a id="be9400qca"></a>

- 점수 **16** · Qualcomm IPQ5322 · 128MB NAND / 1GB · 이더넷 5 · USB 1 · Wi-Fi 7
- 판매: 판매 중 · 출시 2025.12 · OEM ID `be9400qca` · 가격 234,100원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE9400QCA) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE9400QCA) · [제품 페이지](https://iptime.com/products/935)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | ipq5322 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11be/be9400qca/be9400qca_ml_16_006.bin @0xd485d4 (qcom,ipq5332-ap-mi01.4, qcom,ipq5332) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | ipq5322 / qcn6274 / qcn6274 |


### 30. ipTIME AX2004BCM <a id="ax2004bcm"></a>

- 점수 **16** · Broadcom BCM6750 · 128MB NAND / 256MB · 이더넷 5 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2020.06 · OEM ID `ax2004b` · 가격 236,550원 · 중고 45,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX2004BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX2004BCM) · [제품 페이지](https://iptime.com/products/495)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm6750 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ax/ax2004bcm/ax2004b_ml_16_006.bin @0x41053 (brcm,bcm963178) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | bcm43217 / bcm6750 |


### 31. ipTIME AX3004BCM <a id="ax3004bcm"></a>

- 점수 **16** · Broadcom BCM6756 · 128MB NAND / 512MB · 이더넷 5 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2022.07 · OEM ID `ax3004b` · 가격 270,500원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3004BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3004BCM) · [제품 페이지](https://iptime.com/products/631)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm6756 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ax/ax3004bcm/ax3004b_ml_16_006.bin @0x6a7ce4 (brcm,bcm96756) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | bcm6756 / bcm6756 |


### 32. ipTIME BE3600QCA <a id="be3600qca"></a>

- 점수 **16** · Qualcomm IPQ5312 · 128MB NAND / 512MB · 이더넷 4 · USB 1 · Wi-Fi 7
- 판매: 단종 · 출시 2024.12 · OEM ID `be3600qca` · 가격 292,690원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE3600QCA) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE3600QCA) · [제품 페이지](https://iptime.com/products/847)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | ipq5312 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11be/be3600qca/be3600qca_ml_16_006.bin @0xaea0a4 (qcom,ipq5332-ap-mi04.1, qcom,ipq5332) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | ipq5312 / qca8386 |


### 33. ipTIME AX5400BCM-6E <a id="ax5400bcm6e"></a>

- 점수 **16** · Broadcom BCM6756 · 128MB NAND / 512MB · 이더넷 5 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2023.04 · OEM ID `ax54b6e` · 가격 346,490원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX5400BCM-6E) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX5400BCM-6E) · [제품 페이지](https://iptime.com/products/683)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm6756 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ax/ax5400bcm6e/ax54b6e_ml_16_006.bin @0x6a7ce4 (brcm,bcm96756) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | bcm6756 / bcm6756 / bcm6756 |


### 34. ipTIME BE19000QCA <a id="be19000qca"></a>

- 점수 **16** · Qualcomm IPQ5424 · 256MB NAND / 2GB · 이더넷 6 · USB 1 · Wi-Fi 7
- 판매: 판매 중 · 출시 2026.04 · OEM ID `be19000qca` · 가격 474,100원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE19000QCA) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE19000QCA) · [제품 페이지](https://iptime.com/products/969)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | ipq5424 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11be/be19000qca/be19000qca_ml_16_006.bin @0xdaf094 (qcom,ipq5424-rdp485, qcom,ipq5424) |
| Flash | +6 | 256MB NAND |
| RAM | +6 | 2GB |
| WLAN 칩(정보) | 0 | qcn5224 / qcn6224 / qcn6274 |

- ⚠ 스위치(rtl8372n + qca8111): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 35. ipTIME BE19000 <a id="be19000"></a>

- 점수 **16** · Broadcom BCM4916 · 256MB NAND / 4GB · 이더넷 6 · USB 2 · Wi-Fi 7
- 판매: 단종 · 출시 2024.10 · OEM ID `be19000` · 가격 479,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20BE19000) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20BE19000) · [제품 페이지](https://iptime.com/products/813)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4916 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11be/be19000/be19000_ml_16_006.bin @0x793128 (brcm,brcm-v8A) |
| Flash | +6 | 256MB NAND |
| RAM | +6 | 4GB |
| WLAN 칩(정보) | 0 | bcm6726 / bcm6726 / bcm67263 |


### 36. ipTIME AX11000-6E <a id="ax110006e"></a>

- 점수 **16** · Broadcom BCM4908 · 128MB NAND / 1GB · 이더넷 5 · USB 2 · Wi-Fi 6
- 판매: 단종 · 출시 2023.05 · OEM ID `ax110006e` · 가격 479,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX11000-6E) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX11000-6E) · [제품 페이지](https://iptime.com/products/687)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4908 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ax/ax110006e/ax110006e_ml_16_006.bin @0x50cd84 (brcm,brcm94908ref, brcm,brcm-v8A) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | bcm6715 / bcm6715 / bcm6715 |


### 37. ipTIME A8004BCM <a id="a8004bcm"></a>

- 점수 **16** · Broadcom BCM4908 · 128MB NAND / 1GB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2020.02 · OEM ID `a8004nb` · 가격 480,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A8004BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A8004BCM) · [제품 페이지](https://iptime.com/products/467)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4908 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| OEM DTB 확보 | +4 | 11ac_11n/a8004bcm/a8004nb_ml_12_180.bin @0xb0 (brcm,brcm-v8A) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | bcm4366 / bcm4366 |


### 38. ipTIME A5004ns <a id="a5004ns"></a>

- 점수 **15** · Broadcom Cortex-A9 Dual Core · 32MB / 256MB · 이더넷 5 · USB 2 · Wi-Fi 5
- 판매: 단종 · 출시 2014.12 · OEM ID `a5004ns` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A5004ns) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A5004ns) · [제품 페이지](https://iptime.com/products/249)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | Broadcom Cortex-A9 Dual Core (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 32MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | bcm4360 / bcm4360 |
| 이전 포팅 시도 | +3 | #9858, #3991, #3990 (닫힘, 코드 참고 가능) |

- GitHub: [#9858](https://github.com/openwrt/openwrt/pull/9858) closed, [#3991](https://github.com/openwrt/openwrt/pull/3991) closed, [#3990](https://github.com/openwrt/openwrt/pull/3990) closed

### 39. ipTIME A7NS <a id="a7ns"></a>

- 점수 **12** · Broadcom BCM4709 · 16MB / 256MB · 이더넷 5 · USB 2 · Wi-Fi 5
- 판매: 단종 · 출시 2016.07 · OEM ID `a7ns` · 가격 285,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A7NS) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A7NS) · [제품 페이지](https://iptime.com/products/294)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4709 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | bcm4360 / bcm4360 |


### 40. ipTIME A6004ns <a id="a6004ns"></a>

- 점수 **12** · Broadcom BCM4709 · 32MB + 128MB / 512MB · 이더넷 5 · USB 2 · Wi-Fi 5
- 판매: 단종 · 출시 2015.09 · OEM ID `a6004ns` · 가격 299,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A6004ns) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A6004ns) · [제품 페이지](https://iptime.com/products/271)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4709 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 32MB + 128MB |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | bcm4360 / bcm4360 |


### 41. ipTIME AX3004ITL <a id="ax3004itl"></a>

- 점수 **12** · Intel GRX350 · 128MB NAND / 256MB · 이더넷 5 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2020.05 · OEM ID `ax3004i` · 가격 350,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX3004ITL) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX3004ITL) · [제품 페이지](https://iptime.com/products/487)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | Intel GRX350 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | wav654 / wav654 |


### 42. ipTIME A8004ITL <a id="a8004itl"></a>

- 점수 **12** · Intel GRX350 · 128MB NAND / 512MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2019.06 · OEM ID `a8004i` · 가격 350,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A8004ITL) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A8004ITL) · [제품 페이지](https://iptime.com/products/405)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | Intel GRX350 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 512MB |
| WLAN 칩(정보) | 0 | wav514 / wav524 |


### 43. ipTIME AX8004BCM <a id="ax8004bcm"></a>

- 점수 **12** · Broadcom BCM4908 · 128MB NAND / 1GB · 이더넷 5 · USB 1 · Wi-Fi 6
- 판매: 단종 · 출시 2020.01 · OEM ID `ax8004b` · 가격 724,500원 · 중고 70,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX8004BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX8004BCM) · [제품 페이지](https://iptime.com/products/451)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4908 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | bcm43684 / bcm43684 |


### 44. ipTIME AX11000 <a id="ax11000"></a>

- 점수 **12** · Broadcom BCM4908 · 128MB NAND / 1GB · 이더넷 5 · USB 2 · Wi-Fi 6
- 판매: 단종 · 출시 2022.08 · OEM ID `ax11kb` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX11000) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX11000) · [제품 페이지](https://iptime.com/products/641)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm4908 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 128MB NAND |
| RAM | +6 | 1GB |
| WLAN 칩(정보) | 0 | bcm43684 / bcm43684 / bcm43684 |


### 45. ipTIME A3004NS-BCM <a id="a3004nsbcm"></a>

- 점수 **12** · Broadcom BCM47189 · 16MB / 256MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2016.08 · OEM ID `a3004nb` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004NS-BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004NS-BCM) · [제품 페이지](https://iptime.com/products/297)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm47189 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +6 | 256MB |
| WLAN 칩(정보) | 0 | bcm43217 / internal |


### 46. ipTIME AX2004T <a id="ax2004t"></a>

- 점수 **10** · Realtek RTL8197F · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 판매 중 · 출시 2025.08 · OEM ID `ax2004t` · 가격 42,100원 · 중고 47,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX2004T) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX2004T) · [제품 페이지](https://iptime.com/products/911)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8832br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8832BR = 8852B 계열 AP용(11ax AX1200 2x2 PCIe). 순정은 rtk_wifi6.ko(PHL/g6, 커널 4.4). rtw89 rtw8852b(be) 대상이지만 AP 변종 PCI ID·AP 모드 동작 미확인

### 47. ipTIME AX1500R <a id="ax1500r"></a>

- 점수 **10** · Realtek RTL8197 · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 단종 · 출시 2023.12 · OEM ID `ax1500r` · 가격 43,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX1500R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX1500R) · [제품 페이지](https://iptime.com/products/733)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8832br |

- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8832BR = 8852B 계열 AP용(11ax AX1200 2x2 PCIe). 순정은 rtk_wifi6.ko(PHL/g6, 커널 4.4). rtw89 rtw8852b(be) 대상이지만 AP 변종 PCI ID·AP 모드 동작 미확인

### 48. ipTIME AX1500SR <a id="ax1500sr"></a>

- 점수 **10** · Realtek RTL8197F · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 6
- 판매: 판매 중 · 출시 2024.05 · OEM ID `ax15sr` · 가격 44,680원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20AX1500SR) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20AX1500SR) · [제품 페이지](https://iptime.com/products/773)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8832br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8832BR = 8852B 계열 AP용(11ax AX1200 2x2 PCIe). 순정은 rtk_wifi6.ko(PHL/g6, 커널 4.4). rtw89 rtw8852b(be) 대상이지만 AP 변종 PCI ID·AP 모드 동작 미확인

### 49. ipTIME A2004NS-MU <a id="a2004nsmu"></a>

- 점수 **10** · Realtek RTL8197F · 16MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2018.12 · OEM ID `a2004nm` · 가격 118,400원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004NS-MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004NS-MU) · [제품 페이지](https://iptime.com/products/391)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 50. ipTIME A2003NS-MU <a id="a2003nsmu"></a>

- 점수 **10** · Realtek RTL8197F · 16MB / 128MB · 이더넷 4 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2017.08 · OEM ID `a2003nm` · 가격 134,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2003NS-MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2003NS-MU) · [제품 페이지](https://iptime.com/products/340)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 51. ipTIME A704NS-BCM <a id="a704nsbcm"></a>

- 점수 **10** · Broadcom BCM53573 · 16MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2016.08 · OEM ID `a704nb` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A704NS-BCM) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A704NS-BCM) · [제품 페이지](https://iptime.com/products/296)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | bcm53573 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | bcm43217 / internal |


### 52. ipTIME A2004NS-R <a id="a2004nsr"></a>

- 점수 **6** · Realtek RTL8197D · 8MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2015.09 · OEM ID `a2004sr` · 가격 227,050원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004NS-R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004NS-R) · [제품 페이지](https://iptime.com/products/272)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8812ar |

- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 53. ipTIME A3004 <a id="a3004"></a>

- 점수 **6** · Broadcom Cortex-A9 · 8MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.08 · OEM ID `a3004` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004) · [제품 페이지](https://iptime.com/products/238)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | Broadcom Cortex-A9 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | bcm4360 / bcm4360 |


### 54. ipTIME A3004ns <a id="a3004ns"></a>

- 점수 **6** · Broadcom Cortex-A9 · 8MB / 128MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2014.04 · OEM ID `a3004ns` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A3004ns) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A3004ns) · [제품 페이지](https://iptime.com/products/224)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | Broadcom Cortex-A9 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | +4 | 128MB |
| WLAN 칩(정보) | 0 | bcm4360 / bcm4360 |


### 55. ipTIME A2004MU <a id="a2004mu"></a>

- 점수 **2** · Realtek RTL8197F · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2018.12 · OEM ID `a2004m` · 가격 37,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004MU) · [제품 페이지](https://iptime.com/products/389)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 56. ipTIME A604 <a id="a604"></a>

- 점수 **2** · Realtek RTL8197D · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.06 · OEM ID `a604` · 가격 37,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604) · [제품 페이지](https://iptime.com/products/231)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8812ar |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 57. ipTIME A604MU <a id="a604mu"></a>

- 점수 **2** · Realtek RTL8197FN · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2021.05 · OEM ID `a604mu` · 가격 39,900원 · 중고 13,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604MU) · [제품 페이지](https://iptime.com/products/551)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197FN): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 58. ipTIME A604R <a id="a604r"></a>

- 점수 **2** · Realtek RTL8197FNT · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2019.02 · OEM ID `a604r` · 가격 54,870원 · 중고 15,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604R) · [제품 페이지](https://iptime.com/products/395)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197FNT): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 59. ipTIME A2004ns <a id="a2004ns"></a>

- 점수 **2** · Realtek RTL8197D · 8MB / 64MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2013.06 · OEM ID `a2004ns` · 가격 124,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004ns) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004ns) · [제품 페이지](https://iptime.com/products/194)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192ce / rtl8812ar |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 60. ipTIME A604G-MU <a id="a604gmu"></a>

- 점수 **2** · Realtek RTL8197F · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2018.08 · OEM ID `a604gm` · 가격 149,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604G-MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604G-MU) · [제품 페이지](https://iptime.com/products/378)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8197f / rtl8812br |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음
- ⚠ WLAN: RTL8812BR = 8822B 계열 AP용(11ac 2x2 PCIe). rtw88 rtw8822be(PCI 10ec:b822)로 동작할 가능성 — lspci ID 확인 필요

### 61. ipTIME A604V <a id="a604v"></a>

- 점수 **2** · Realtek RTL8197D · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.07 · OEM ID `a604v` · 가격 169,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604V) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604V) · [제품 페이지](https://iptime.com/products/236)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8812ar |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음

### 62. ipTIME A2004 <a id="a2004"></a>

- 점수 **2** · Realtek RTL8197D · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2013.11 · OEM ID `a2004` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004) · [제품 페이지](https://iptime.com/products/211)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192ce / rtl8812ar |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 63. ipTIME A2004NSplus <a id="a2004nsplus"></a>

- 점수 **2** · Realtek RTL8197D · 8MB / 64MB · 이더넷 5 · USB 1 · Wi-Fi 5
- 판매: 단종 · 출시 2014.04 · OEM ID `a2004ns` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004NSplus) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004NSplus) · [제품 페이지](https://iptime.com/products/226)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192ce / rtl8812ar |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 64. ipTIME A2004R <a id="a2004r"></a>

- 점수 **-15** · Realtek RTL8197D · 4MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2015.10 · OEM ID `a2004r` · 가격 74,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004R) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004R) · [제품 페이지](https://iptime.com/products/274)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8812ar |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 65. ipTIME A2008 <a id="a2008"></a>

- 점수 **-15** · Realtek RTL8197D · 4MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2015.02 · OEM ID `a2008` · 가격 259,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2008) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2008) · [제품 페이지](https://iptime.com/products/258)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8812ar |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8370): 메인라인 rtl8365mb 지원 칩 목록에 있는지 미확인 — 드라이버 추가 필요할 수 있음

### 66. ipTIME A2004plus <a id="a2004plus"></a>

- 점수 **-15** · Realtek RTL8197D · 4MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2014.05 · OEM ID `a2004` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004plus) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004plus) · [제품 페이지](https://iptime.com/products/229)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | 0 | 64MB |
| WLAN 칩(정보) | 0 | rtl8192ce / rtl8812ar |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)

### 67. ipTIME A2004SE <a id="a2004se"></a>

- 점수 **-20** · Realtek RTL8197FH · 16MB / 128MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2022.08 · OEM ID `a2004se` · 가격 37,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004SE) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004SE) · [제품 페이지](https://iptime.com/products/643)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | +4 | 128MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- 조사 노트: [a2004se.md](notes/a2004se.md) (직접)
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197FH): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 68. ipTIME A2004SR <a id="a2004sr"></a>

- 점수 **-24** · Realtek RTL8197F · 16MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 판매 중 · 출시 2024.11 · OEM ID `a2sr` · 가격 30,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004SR) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004SR) · [제품 페이지](https://iptime.com/products/833)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 69. ipTIME A2002SR <a id="a2002sr"></a>

- 점수 **-24** · Realtek RTL8197F · 16MB / 64MB · 이더넷 3 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2024.08 · OEM ID `a2002sr` · 가격 36,470원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2002SR) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2002SR) · [제품 페이지](https://iptime.com/products/805)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +6 | 16MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 70. ipTIME A604SR <a id="a604sr"></a>

- 점수 **-28** · Realtek RTL8197FH · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 판매 중 · 출시 2025.02 · OEM ID `a604sr` · 가격 27,900원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604SR) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604SR) · [제품 페이지](https://iptime.com/products/859)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ SoC 이더넷(Realtek RTL8197FH): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 71. ipTIME A2004S <a id="a2004s"></a>

- 점수 **-28** · Realtek RTL8197F · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2024.01 · OEM ID `a2004s` · 가격 31,270원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2004S) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2004S) · [제품 페이지](https://iptime.com/products/739)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 72. ipTIME A604SE <a id="a604se"></a>

- 점수 **-28** · Realtek RTL8197FH · 8MB / 64MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2022.10 · OEM ID `a604se` · 가격 36,990원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A604SE) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A604SE) · [제품 페이지](https://iptime.com/products/657)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ SoC 이더넷(Realtek RTL8197FH): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 73. ipTIME A2003MU <a id="a2003mu"></a>

- 점수 **-28** · Realtek RTL8197F · 8MB / 64MB · 이더넷 4 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2021.08 · OEM ID `a2003m` · 가격 114,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A2003MU) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A2003MU) · [제품 페이지](https://iptime.com/products/563)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8197 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | +2 | 8MB |
| RAM | 0 | 64MB |
| WLAN 드라이버 없음 | -30 | RTL8812F: rtw88/rtw89 지원 계획 없음 (2026-11 Realtek rtw88 메인테이너 Ping-Ke Shih 회신: NIC 담당이라 AP 라우터용은 모름). Realtek 공개 가능성 낮음 — 바이너리 디스어셈으로 테이블 확보는 가능하나 upstream 머지 가능성 낮음. 유선 전용(1차 목표) 포팅에는 영향 없음 |

- 조사 노트: [a2004se.md](notes/a2004se.md) (A2004SE와 같은 SoC+스위치)
- ⚠ 64MB RAM: 동작은 하나 여유가 거의 없음
- ⚠ 스위치(rtl8367r): 메인라인 DSA rtl8365mb: chip_id 0x6367 계열(RTL8367RB-VB/RTL8367S/RTL8367SB/RTL8365MB-VC)만 지원 — chip_ver 확인 필요, RTL8367C/D 계열이면 미확인. SI의 'rtl8367r'은 일반 표기임: 97F 순정 커널(3.10.90)은 'Switch v1.4 API'로 8367C/8370B/8364B/8363SC_VB/8367D를 런타임 판별하므로 실제 칩은 부트로그로 확인해야 함. CPU 태그(rtl8_4/rtl8_4t, 0x8899) 필수라 conduit가 태그 프레임을 통과시켜야 함 (순정은 태그 끄고 VLAN 분리)
- ⚠ SoC 이더넷(Realtek RTL8197F): 메인라인 RTL8197F 이더넷(conduit) 드라이버 없음 — 98C용 신규 드라이버 포크 기반 최소 MAC 드라이버가 선행돼야 함
- ⚠ WLAN: RTL8197F 내장 2.4GHz(11n 2x2): 메인라인 드라이버 없음. 순정은 rtl8192cd(WLAN_HAL_88XX) 내장 — rtw88 포팅 아이디어만 있음

### 74. ipTIME A104r <a id="a104r"></a>

- 점수 **-30** · Realtek RTL8881A · 4MB / 32MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2015.07 · OEM ID `a104r` · 가격 119,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A104r) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A104r) · [제품 페이지](https://iptime.com/products/267)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8881 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | -15 | 32MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8881a |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 32MB RAM: 현행 OpenWrt 비권장(4/32 경고 대상)

### 75. ipTIME A304 <a id="a304"></a>

- 점수 **-30** · Realtek RTL8881A · 4MB / 32MB · 이더넷 5 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2018.04 · OEM ID `a304` · 가격 129,000원
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A304) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A304) · [제품 페이지](https://iptime.com/products/367)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8881 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | -15 | 32MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8881a |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 32MB RAM: 현행 OpenWrt 비권장(4/32 경고 대상)

### 76. ipTIME A1 <a id="a1"></a>

- 점수 **-30** · Realtek RTL8881A · 4MB / 32MB · 이더넷 3 · USB 0 · Wi-Fi 5
- 판매: 단종 · 출시 2016.09 · OEM ID `a1` · 가격 -
- 가격 확인: [다나와](https://search.danawa.com/dsearch.php?query=ipTIME%20A1) · [네이버쇼핑](https://search.shopping.naver.com/search/all?query=ipTIME%20A1) · [제품 페이지](https://iptime.com/products/302)

| 항목 | 점수 | 근거 |
|---|---:|---|
| 플랫폼 | 0 | rtl8881 (upstream DTS 0개) — upstream 타겟 없음 (SoC 자체 포팅 필요) |
| Flash | -15 | 4MB |
| RAM | -15 | 32MB |
| WLAN 칩(정보) | 0 | rtl8192er / rtl8881a |

- ⚠ 4MB 플래시: 현행 OpenWrt 이미지 불가
- ⚠ 32MB RAM: 현행 OpenWrt 비권장(4/32 경고 대상)

