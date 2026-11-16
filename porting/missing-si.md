# OEM `si` 데이터 누락 — 해결 기록

2026-11-09 기준으로 **techdata 99개 모델 전부 si가 수집됨** (`si/` 99개). 아래는 누락됐던 11개의 원인과 해결 과정입니다.

## 원인

`scripts/extract-firmware.sh`(binwalk 2.3.3 `-Me`)가 rootfs를 풀지 못해 `collect-si.sh`가
`default/var/run/si`를 찾지 못했습니다. 원인은 두 가지였습니다.

1. **WSL에 외부 추출기가 없었음.** `binwalk_*.log`에 다음 경고가 남아 있었습니다.
   `failed to run external extractor ... No such file or directory: '<tool>'`
   - `sasquatch` (43개 로그) — 구형 LZMA squashfs. 대부분은 `unsquashfs`가 대신 풀었지만 A104, A104ns, A3004-dual, A3004ns-dual은 실패
   - `ubireader_extract_files` (7개), `jefferson` (3개), `lzop` (6개)
2. **UBI 안의 rootfs가 UBIFS가 아니라 squashfs 볼륨이었음.** QCA(BE19000QCA, BE3600QCA, BE9400QCA)와
   BCM4908(AX11000, AX8004BCM)은 `ubi_rootfs` / `rootfs_squashfs` 볼륨이 squashfs입니다.
   `ubireader_extract_files`는 UBIFS만 처리하므로 도구를 설치해도 빈 `ubifs-root`만 생겼습니다.

## 해결

- 도구 설치: `lzop`(apt), `ubi_reader`·`jefferson`(`uv tool install`), `sasquatch`(소스 빌드)
- `extract-firmware.sh` 변경
  - `wsl bash`는 비로그인 셸이라 `~/.local/bin`을 PATH에 추가(uv tool 실행 파일 위치). 추출기가 없으면 시작할 때 경고 출력
  - `unpack_ubi_squashfs`를 추가함. `.ubi`를 `ubireader_extract_images`로 볼륨별로 뽑고, squashfs 볼륨은
    `ubi-squashfs-root-<볼륨>/`에 풂. 이미 추출된 펌웨어에도 적용되며, 한 번 처리한 것은 건너뜀
- 영향받은 모델의 `_*.extracted`를 지우고 다시 추출 → `collect-si` → `start` → `candidates`

| 모델 | 해결 방법 | 새로 얻은 정보 |
|---|---|---|
| A3004-dual | sasquatch | **IP04290B = A3004ns-dual(upstream)** → "동일 내부 보드명" +10, 순위 16 → 11 (단 4MB 플래시라 현행 이미지 불가) |
| A104 | sasquatch | **IP04253B = A104ns·A1004NS(upstream)** → +10, 순위 18 → 13 |
| A104ns, A3004ns-dual | sasquatch | upstream 지원 모델. 형제 매칭에 쓰임 |
| AX2004BCM | ubi_reader (UBIFS) | 보드 04413A, bcm43217/bcm6750 |
| A8004BCM | ubi_reader + jefferson | bcm4366 ×2 |
| AX11000, AX8004BCM | UBI squashfs 볼륨 | bcm43684, UART 115200. `board.name`이 비어 있음(OEM si에 없음) |
| BE19000QCA | UBI squashfs 볼륨 | WR19000BE, qcn5224/qcn6224, 스위치 rtl8372n + qca8111 |
| BE3600QCA | UBI squashfs 볼륨 | WR3604BE, 스위치 qca8386 |
| BE9400QCA | UBI squashfs 볼륨 | WR9404BE, qcn6274, 스위치 qca8386 + rtl8221b |

## 남은 데이터 이상

- **BE3600QCA wlan5 = `qca8386`**: OEM si 원본(`chipset.wl[5g].name=qca8386`)이 그렇게 적혀 있습니다. qca8386은 스위치 칩이라
  OEM의 복붙 실수로 보입니다. 실제 5GHz 칩은 부트로그나 `wifi_fw` 볼륨으로 확인해야 합니다. 확인되면 `manual-overrides.json`으로 고칩니다.
