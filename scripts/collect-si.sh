#!/usr/bin/env bash
# Collects ipTIME "system info" files (default/var/run/si/{hw,sw,net,pi,wifi}) and the
# kernel serial console setting from firmwares extracted by extract-firmware.sh.
#
#   wsl bash ./scripts/collect-si.sh [IPTIME_DIR] [OUT_DIR]
#
# Output: OUT_DIR/<model>/{hw,sw,net,pi,wifi,console.txt,source.txt}
set -uo pipefail

IPTIME_DIR="${1:-$HOME/iptime}"
OUT_DIR="${2:-si}"
SI_FILES=(hw sw net pi wifi)

if [ ! -d "$IPTIME_DIR" ]; then
  echo "Extracted firmware directory not found: $IPTIME_DIR (run pnpm extract first)" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
found=0
missing=()

for model_dir in "$IPTIME_DIR"/*/; do
  model="$(basename "$model_dir")"
  [ -d "$model_dir/oem_firmware" ] || continue

  # newest firmware first (file names are <id>_<region>_<major>_<minor>.bin)
  mapfile -t extracted < <(find "$model_dir/oem_firmware" -maxdepth 1 -type d -name '_*.extracted' | sort -V -r)

  si_dir=""
  firmware=""
  for dir in "${extracted[@]}"; do
    # prefer the real rootfs (squashfs) over initramfs copies
    si_dir="$(find "$dir" -type d -path '*default/var/run/si' 2>/dev/null | awk '{ print (index($0, "squashfs-root") ? 0 : 1) "\t" $0 }' | sort | head -1 | cut -f2)"
    if [ -n "$si_dir" ]; then
      firmware="$(basename "$dir" .extracted)"
      firmware="${firmware#_}"
      break
    fi
  done

  if [ -z "$si_dir" ]; then
    missing+=("$model")
    continue
  fi

  out="$OUT_DIR/$model"
  rm -rf "$out"
  mkdir -p "$out"
  for name in "${SI_FILES[@]}"; do
    [ -f "$si_dir/$name" ] && cp "$si_dir/$name" "$out/$name"
  done

  # kernel command line baked into kernel / DTB / bootloader images (outside rootfs)
  find "$model_dir/oem_firmware/_$firmware.extracted" -type f -size -80M ! -path '*-root/*' -print0 2>/dev/null |
    xargs -0 grep -a -o -h -E 'console=tty[A-Za-z]*[0-9]+,[0-9]+[nNoOeE]?[0-9]*' 2>/dev/null |
    sort | uniq -c | sort -rn > "$out/console.txt"

  # fall back to inittab / rc scripts in the rootfs
  if [ ! -s "$out/console.txt" ]; then
    rootfs="${si_dir%/default/var/run/si}"
    grep -a -o -h -E -r 'tty(S|MT|AMA|MSM|HS)[0-9]+' "$rootfs/etc/inittab" "$rootfs/etc/init.d" 2>/dev/null |
      sort | uniq -c | sort -rn | sed 's/$/ (rootfs)/' > "$out/console.txt"
  fi

  printf 'firmware=%s\nsi_dir=%s\n' "$firmware" "${si_dir#"$IPTIME_DIR"/}" > "$out/source.txt"
  found=$((found + 1))
  echo "[$found] $model <- $firmware"
done

echo "Collected si for $found models into $OUT_DIR"
if [ ${#missing[@]} -gt 0 ]; then
  echo "No default/var/run/si found: ${missing[*]}" >&2
fi
