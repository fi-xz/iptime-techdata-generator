#!/usr/bin/env bash
set -uo pipefail

FIRMWARE_DIR="${1:-firmware}"
IPTIME_DIR="${2:-$HOME/iptime}"

# binwalk runs external extractors by name (ubireader_extract_files, jefferson, sasquatch, lzop ...).
# `wsl bash` is a non-login shell, so add the uv tool bin dir (uv tool install ubi_reader / jefferson).
export PATH="$HOME/.local/bin:$PATH"
missing_tools=()
for tool in sasquatch ubireader_extract_files jefferson lzop; do
  command -v "$tool" > /dev/null || missing_tools+=("$tool")
done
if [ ${#missing_tools[@]} -gt 0 ]; then
  echo "warning: extractors not found, some rootfs will not be unpacked: ${missing_tools[*]}" >&2
fi

if ! command -v binwalk > /dev/null; then
  echo "binwalk not found. Install it first (e.g. sudo apt install binwalk)" >&2
  exit 1
fi

if [ ! -d "$FIRMWARE_DIR" ]; then
  echo "Firmware directory not found: $FIRMWARE_DIR (run pnpm download first)" >&2
  exit 1
fi

BINWALK_ARGS=(-Me)
if [ "$EUID" -eq 0 ] && binwalk --help 2>&1 | grep -q -- "--run-as"; then
  BINWALK_ARGS+=(--run-as=root)
fi

# binwalk's UBI handler (ubireader_extract_files) only understands UBIFS. QCA/BCM firmwares keep the
# rootfs as a squashfs *volume* inside UBI (ubi_rootfs / rootfs_squashfs), which ends up as an empty
# ubifs-root. Dump the volumes and unsquash them into ubi-squashfs-root-<volume>/ (idempotent).
unpack_ubi_squashfs() {
  local extracted="$1" ubi images img vol
  command -v ubireader_extract_images > /dev/null || return 0
  while IFS= read -r -d "" ubi; do
    images="$extracted/_$(basename "$ubi").images"
    [ -d "$images" ] && continue
    mkdir -p "$images"
    ubireader_extract_images -o "$images" "$ubi" > /dev/null 2>&1 || continue
    while IFS= read -r -d "" img; do
      file -b "$img" | grep -q '^Squashfs filesystem' || continue
      vol="$(basename "$img" .ubifs)"
      vol="${vol##*_vol-}"
      unsquashfs -q -n -d "$extracted/ubi-squashfs-root-$vol" "$img" > /dev/null 2>&1 ||
        sasquatch -q -d "$extracted/ubi-squashfs-root-$vol" "$img" > /dev/null 2>&1 ||
        echo "  unsquashfs failed: $img" >&2
    done < <(find "$images" -type f -print0)
  done < <(find "$extracted" -maxdepth 1 -type f -name "*.ubi" -print0)
}

mapfile -d "" FIRMWARES < <(find "$FIRMWARE_DIR" -type f ! -name "*.json" ! -name "*.part" -print0 | sort -z)

total=${#FIRMWARES[@]}
count=0
failed=()

for firmware in "${FIRMWARES[@]}"; do
  count=$((count + 1))
  model="$(basename "$(dirname "$firmware")")"
  name="$(basename "$firmware")"
  directory="$IPTIME_DIR/$model/oem_firmware"
  extracted="_$name.extracted"

  mkdir -p "$directory"

  if [ ! -f "$directory/$name" ]; then
    cp "$firmware" "$directory/$name"
  fi

  if [ -d "$directory/$extracted" ]; then
    echo "[$count/$total] skip $model/$name"
    unpack_ubi_squashfs "$directory/$extracted"
    continue
  fi

  echo "[$count/$total] extract $model/$name"

  if ! (cd "$directory" && binwalk "${BINWALK_ARGS[@]}" "$name" > "binwalk_$name.log" 2>&1) || [ ! -d "$directory/$extracted" ]; then
    rm -rf "${directory:?}/$extracted"
    failed+=("$model/$name")
    echo "  failed, see $directory/binwalk_$name.log" >&2
  else
    unpack_ubi_squashfs "$directory/$extracted"
  fi
done

echo "Extracted $((total - ${#failed[@]}))/$total firmwares into $IPTIME_DIR"

if [ ${#failed[@]} -gt 0 ]; then
  printf "Failed: %s\n" "${failed[@]}" >&2
  exit 1
fi
