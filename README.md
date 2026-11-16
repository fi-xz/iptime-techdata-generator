# ipTIME Router Techdata Generator

An organized techdata generator for ipTIME firmwares

## Porting Candidates

현행 ipTIME 모델 중 가장 포팅 가능성이 높은 제품 리스트를 보고 싶으신 경우 [candidates.md](./porting/candidates.md)를 참고해주세요.

## Prerequisites

- Node.js (v26.13에서 확인) + pnpm — 처음 한 번 `pnpm install`
- WSL2 (Debian/Ubuntu) — `pnpm extract` / `pnpm collect-si` 용
  - `binwalk`, `lzop`, `squashfs-tools` (`sudo apt install binwalk lzop squashfs-tools`)
  - `sasquatch` (소스 빌드), `ubi_reader` · `jefferson` (`uv tool install ubi_reader`, `uv tool install jefferson`) — `~/.local/bin`에 있으면 됨
- (선택) GitHub CLI `gh` 로그인 또는 `GITHUB_TOKEN` — `pnpm snapshot` API 한도용

## Scripts

순서대로 실행하면 됩니다. 앞 단계 결과물이 있으면 건너뛰어도 됩니다.

```sh
pnpm download        # OEM 펌웨어 다운로드 -> firmware/ (+ firmware/index.json)
pnpm extract         # (WSL) binwalk 추출 -> ~/iptime/<model>/oem_firmware
pnpm collect-si      # (WSL) rootfs default/var/run/si/{hw,sw,net,pi,wifi} + 커널 console= 수집 -> si/<model>/
pnpm start           # techdata/ 생성 (si/ 가 있으면 WLAN/스위치/GPIO/LED/팬/UART/내부모델/git 필드 채움)
pnpm snapshot        # OpenWrt upstream 스냅샷 -> snapshot.json (GitHub 이슈/PR, 열린 PR이 추가하는 Device, upstream 기기/DTS, iptime-crc32)
pnpm candidates      # OpenWrt 포팅 후보 순위 -> porting/candidates.md, candidates.json
pnpm prices          # 다나와 최저가 -> porting/prices.json price_krw (끝나면 pnpm candidates 다시 실행)
```

`firmware/`, `cache/`, `snapshot.json`은 커밋하지 않으므로, 새로 clone했다면 `pnpm download` → `pnpm start` 후에 `pnpm candidates`를 실행하세요 (`snapshot.json`은 없으면 자동으로 받음).

대상 모델 목록은 `iptime-router-models.json`입니다. 새 모델(예: BE5100plus)은 여기에 추가한 뒤 `download`부터 다시 돌려야 techdata/후보 계산에 들어갑니다.

`porting/prices.json`

- `price_krw`: 새 제품 최저가. `pnpm prices`가 다나와 카탈로그에서 채웁니다. 출처가 다나와가 아닌 수동 입력값은 건너뛰며, `--force`를 주면 덮어씁니다. `pnpm prices a2004se ax2004t`처럼 키를 지정할 수도 있습니다.
- `used_price_krw`: 중고가. 수동으로만 입력합니다.

수동 보정: `manual-overrides.json`에 `{ "<모델명>": { "<techdata 필드>": 값 } }` 형태로 적으면 `pnpm start` 때 마지막에 덮어씁니다.
`uart_exposed`는 기본 `true`이며, UART 핀이 노출되지 않은 모델만 `false` + `uart_note`로 표시하면 됩니다.

`pnpm candidates` 동작

- upstream에 이미 있는 모델은 제외합니다.
- 열린 PR이 추가하는 모델은 "지원 예정"으로 빼서 순위에서 제외합니다. PR 제목이 `add support ... <모델>`이거나, PR의 image makefile에 `define Device/iptime_*`가 새로 추가되면 해당됩니다. 데이터셋에 없는 모델의 PR은 별도 섹션에 나옵니다.
- 수동 지식은 `src/porting-candidates.ts` 상단 테이블에 있습니다: `PR_REVIEWS`(열린 PR 평가), `COMMUNITY_PORTS`(비공식 포팅), `WLAN_DRIVER_BLOCKERS` 등.
- `porting/notes/<모델>.md` 조사 노트는 해당 모델과, SoC+스위치가 같은 모델의 상세에 링크됩니다.

`pnpm candidates` 옵션

- `--refresh` : `pnpm snapshot`과 같음 (`snapshot.json`이 없으면 자동 1회). 새 PR을 반영하려면 둘 중 하나를 먼저 실행
- `--mediatek-only` : MediaTek/Airoha 계열만
- `--max-price=80000` : `porting/prices.json` 가격 기준 필터 (가격 미입력 모델은 유지)
- `--sort=value` : 점수 / 만원 기준 정렬
- `--stale-days=180` : 열린 PR이 이 기간 이상 갱신 없으면 "정체"로 표시

GitHub API 인증은 `GITHUB_TOKEN`/`GH_TOKEN` → `gh auth token` 순으로 찾고, 없으면 익명(60/h)으로 요청합니다.

## Disclosure

- 프로젝트의 코드는 일부는 직접 작성했고, 일부는 Claude Opus 5.5를 이용하여 코드 생성 및 환경을 구성하였음.
- `iptime.com` 및 `danawa.com`을 크롤링하는 행위가 있어 관련되어 문제가 발생될 수 있음. `robots.txt` 기준 이러한 크롤링을 차단하지 않는것으로 보이나 약관에 위반될 수 있음.
  - Use At Your Own Risk.
- techdata는 OpenWrt 포팅 작업 진행 시 단순 참고를 위해 사용되는것이며, 이 데이터가 무조건 완벽함을 보증할 수 없음.
- 저작권적인 문제를 피하기 위해 OEM 펌웨어 바이너리 파일은 제외하였음.
  - Claude 왈, ipTIME 제품들이 물리적인 NAND 플래시에 자체적으로 수정한 OpenWrt 펌웨어와 u-boot 부트로더를 쓰고 판매를 진행하더라도, GPL v2.0 기준 "바이너리 배포"에 해당하는 행위이기에 Claude 본인의 의견으로는 ipTIME 측이 수정한 소스들에 대해서는 소스 코드를 공개해야 하는게 맞다고 합니다.
  - 당연히 기존에 `gpl.iptime.org`에서 공개한 모델처럼 칩셋 제조사들의 SDK 코드는 따로 제외시켜두고 툴체인이나 펌웨어를 만들기 위해 "어떻게 작업했고 빌드 방법은 무엇인지"까지만 제공해주기만 해도 GPL은 만족할겁니다.
  - 다만 정말로 확실치는 않습니다. I'm not a lawyer. 제 주변 지인에게 물어볼 사람들은 있어도 주변 지인 중 변호사가 없는게 문제네요. 항상 이럴 때 변호사 지인이 없는게 아쉽습니다.
- 중고가 데이터는 당근마켓 앱에서 제가 사는 동네 매물을 눈으로 보고 적은 값이라 오류가 있거나 시세가 안 맞을수도...

## License

MIT