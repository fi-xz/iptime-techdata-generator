import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { normalizeModelName } from "./filters.js";
import type { GpioPin, LedPin, RouterTechData, SwitchPort } from "./types.js";

// Parses ipTIME OEM "system info" files collected by scripts/collect-si.sh
// (rootfs default/var/run/si/{hw,sw,net}) into techdata fields.
//
// Two dialects exist:
//   old: chipset.wl2g.name=rtl8192ce / board.gpio.wps_bt=-1 / board.eport.lan[1]=1
//   new: chipset.wl[2g].name=mt7976 / board.gpio.wps_bt.{type,num,active} / board.eport.lan[PORT1]=4 / net eport[]

export const SI_DIR = "./si";

export type SiFields = Pick<
  RouterTechData,
  | "wlan5_2"
  | "wlan6"
  | "switch_ext"
  | "switch_mapping"
  | "gpio_base"
  | "gpio_buttons"
  | "leds"
  | "led_port_control"
  | "fan"
  | "fan_info"
  | "uart_baudrate"
  | "internal_model"
  | "firmware_git_commit"
  | "firmware_git_branch"
  | "si_source"
>;

export function emptySiFields(): SiFields {
  return {
    wlan5_2: "",
    wlan6: "",
    switch_ext: "",
    switch_mapping: [],
    gpio_base: null,
    gpio_buttons: {},
    leds: [],
    led_port_control: "",
    fan: null,
    fan_info: "",
    uart_baudrate: null,
    internal_model: "",
    firmware_git_commit: "",
    firmware_git_branch: "",
    si_source: "",
  };
}

type Kv = Map<string, string>;

function normalizeKey(key: string): string {
  return key
    .replace(/^chipset\.wl(2g|5g2|5g|6g)\./, "chipset.wl[$1].")
    .replace(/^board\.gpio\.wl(2g|5g2|5g|6g)_led$/, "board.gpio.wl_led[$1]");
}

function parseKv(text: string): Kv {
  const kv: Kv = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(#|$)/.test(line) || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = normalizeKey(line.slice(0, index).trim());
    const value = line.slice(index + 1).replace(/\s+#.*$/, "").trim();
    kv.set(key, value);
  }
  return kv;
}

function readFile(dir: string, name: string): string {
  const path = join(dir, name);
  return existsSync(path) ? readFileSync(path, "utf-8") : "";
}

const toInt = (value: string | undefined) => {
  if (value === undefined || value === "") return NaN;
  return /^0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
};

// new style: <prefix>.type/.num/.active ; old style: <prefix>=<num> ; fan style: in/14/0/-1/4
function readGpio(kv: Kv, prefix: string): GpioPin | null | undefined {
  if (kv.has(`${prefix}.num`) || kv.has(`${prefix}.type`)) {
    const type = kv.get(`${prefix}.type`) ?? "";
    const gpio = toInt(kv.get(`${prefix}.num`));
    const active = kv.get(`${prefix}.active`);
    if (type === "none" || !(gpio >= 0)) return null;
    return { gpio, active_low: active === undefined ? null : active === "0", raw: `${type}/${gpio}/${active ?? "?"}` };
  }
  if (kv.has(prefix)) {
    return parseSlashGpio(kv.get(prefix)!);
  }
  return undefined;
}

function parseSlashGpio(value: string): GpioPin | null {
  const parts = value.split("/");
  if (parts.length >= 2 && /^(in|out)$/.test(parts[0]!)) {
    const gpio = toInt(parts[1]);
    return gpio >= 0 ? { gpio, active_low: parts[2] === undefined ? null : parts[2] === "0", raw: value } : null;
  }
  const gpio = toInt(value);
  return gpio >= 0 ? { gpio, active_low: null, raw: value } : null;
}

function readWlan(kv: Kv): Record<string, string> {
  const bands: Record<string, string> = {};
  for (const [key, value] of kv) {
    const band = key.match(/^chipset\.wl\[([^\]]+)\]\.name$/)?.[1];
    if (band && value) bands[band] = value;
  }
  return bands;
}

function readButtons(kv: Kv): Record<string, GpioPin | null> {
  const buttons: Record<string, GpioPin | null> = {};
  const names: [string, string][] = [
    ["reset", "board.gpio.reset_bt"],
    ["wps", "board.gpio.wps_bt"],
    ["wifi_switch", "board.gpio.wifi_switch"],
    ["led_switch", "board.gpio.led_switch"],
  ];
  for (const [name, prefix] of names) {
    const pin = readGpio(kv, prefix);
    if (pin !== undefined && (pin !== null || name === "reset" || name === "wps")) buttons[name] = pin;
  }
  return buttons;
}

function ledName(prefix: string): string {
  return prefix
    .replace(/^board\.(gpio|led|eport)\./, "")
    .replace(/^cpu_led$/, "cpu")
    .replace(/^wl_led\[(.+)\]$/, "wlan$1")
    .replace(/^usb_led\[(\d+)\]$/, "usb$1")
    .replace(/^usb_led$/, "usb")
    .replace(/^wan_led_gpio\[\D*(\d+)\]$/, "wan$1")
    .replace(/^sys\[(\d+)\]$/, "sys$1");
}

function readLeds(kv: Kv): LedPin[] {
  const prefixes = new Set<string>();
  for (const key of kv.keys()) {
    const prefix = key.replace(/\.(num|type|active|gpio_mux)$/, "");
    if (
      /^board\.gpio\.[^.]*led[^.]*$/.test(prefix) &&
      !/led_switch|_led_type$/.test(prefix)
    ) {
      prefixes.add(prefix);
    } else if (/^board\.led\.[^.]+$/.test(prefix) || /^board\.eport\.wan_led_gpio\[[^\]]+\]$/.test(prefix)) {
      prefixes.add(prefix);
    }
  }
  const leds: LedPin[] = [];
  for (const prefix of [...prefixes].sort()) {
    const pin = readGpio(kv, prefix);
    if (pin) leds.push({ name: ledName(prefix), ...pin });
  }
  return leds;
}

function readFan(kv: Kv, hasSi: boolean): { fan: boolean | null; fan_info: string } {
  const fanEntries = [...kv].filter(([key]) => /^board\.(fan\.|gpio\.fan_)/.test(key));
  const info = fanEntries.map(([key, value]) => `${key.replace(/^board\.(fan\.gpio|gpio)\.?/, "")}=${value}`).join(", ");
  const count = toInt(kv.get("board.nofan"));
  if (!Number.isNaN(count)) return { fan: count > 0, fan_info: count > 0 ? info : "" };
  if (fanEntries.length > 0) return { fan: true, fan_info: info };
  return { fan: hasSi ? false : null, fan_info: "" };
}

function readSwitchMapping(hw: Kv, net: Kv): SwitchPort[] {
  const internal = hw.get("chipset.eswitch.name") ?? "";
  const external = hw.get("chipset.eswitch_ext.name") ?? "";
  const ports: SwitchPort[] = [];

  const eportKeys = [...hw.keys()].filter((key) => /^board\.eport\.(wan|lan)\[[^\]]+\]$/.test(key));
  const wanCount = eportKeys.filter((key) => key.includes(".wan[")).length;
  for (const key of eportKeys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    const [, kind, index] = key.match(/^board\.eport\.(wan|lan)\[\D*(\d+)\]$/) ?? [];
    if (!kind) continue;
    const value = hw.get(key)!;
    const ext = value.match(/^e(\d+)$/);
    ports.push({
      label: kind === "wan" ? (wanCount > 1 ? `WAN${index}` : "WAN") : `LAN${index}`,
      switch: ext ? external || "ext" : internal,
      port: ext ? ext[1]! : value,
      role: kind,
    });
  }

  // newer firmwares describe ports in si/net instead
  if (ports.length === 0) {
    // eport[] index order = physical order; "joint" entries are CPU <-> switch links
    const indexes = new Set([...net.keys()].map((key) => key.match(/^eport\[(\d+)\]\./)?.[1]).filter(Boolean));
    const sorted = [...indexes].sort((a, b) => Number(a) - Number(b));
    const wanTotal = sorted.filter((i) => /wan/.test(net.get(`eport[${i}].role`) ?? "")).length;
    let lan = 0;
    let wan = 0;
    for (const index of sorted) {
      const role = net.get(`eport[${index}].role`) ?? "lan";
      const ifname = net.get(`eport[${index}].ifname`);
      const suffix = ifname ? `(${ifname})` : "";
      const label = /^cpu$/.test(role)
        ? `CPU${suffix}`
        : /joint/.test(role)
        ? `CPU-LINK${suffix}`
        : /wan/.test(role)
          ? `WAN${wanTotal > 1 ? ++wan : ""}${suffix}`
          : `LAN${++lan}${suffix}`;
      ports.push({
        label,
        switch: net.get(`eport[${index}].derived`) ?? internal,
        port: net.get(`eport[${index}].reg`) ?? "",
        role,
      });
    }
  }

  const cpu = hw.get("board.eport.cpu");
  if (cpu && !ports.some((p) => p.role === "cpu")) ports.push({ label: "CPU", switch: internal, port: cpu, role: "cpu" });
  return ports;
}

function readConsole(text: string): { tty: string; baud: number | null; raw: string } | undefined {
  const line = text.split(/\r?\n/).map((l) => l.trim()).find(Boolean);
  if (!line) return undefined;
  const raw = line.replace(/^\d+\s+/, "");
  const match = raw.match(/(tty[A-Za-z]*\d+)(?:,(\d+)([nNoOeE]?\d*))?/);
  if (!match) return undefined;
  return { tty: match[1]!, baud: match[2] ? Number(match[2]) : null, raw };
}

export function loadSiTechData(
  model: string,
  dir = SI_DIR,
): { fields: SiFields; overrides: Partial<RouterTechData> } {
  const siDir = join(dir, normalizeModelName(model));
  const fields = emptySiFields();
  if (!existsSync(join(siDir, "hw"))) return { fields, overrides: {} };

  const hw = parseKv(readFile(siDir, "hw"));
  const sw = parseKv(readFile(siDir, "sw"));
  const net = parseKv(readFile(siDir, "net"));
  const source = parseKv(readFile(siDir, "source.txt"));
  const wlan = readWlan(hw);
  const console = readConsole(readFile(siDir, "console.txt"));
  const internalSwitch = hw.get("chipset.eswitch.name") ?? "";
  const extPort = hw.get("chipset.eswitch.ext_port");

  fields.wlan5_2 = wlan["5g2"] ?? "";
  fields.wlan6 = wlan["6g"] ?? "";
  // si/net ethdev[] also lists switch chips hw omits (e.g. BE7200M: rtl8372n behind mt7988)
  const soc = (hw.get("chipset.soc.name") ?? "").toLowerCase();
  const netSwitches = [...net]
    .filter(([key]) => /^ethdev\[\d+\]\.name$/.test(key))
    .map(([, value]) => value)
    .filter((name) => name && !name.toLowerCase().startsWith(soc || "\0") && name !== internalSwitch);
  fields.switch_ext = [...new Set([hw.get("chipset.eswitch_ext.name") ?? "", ...netSwitches].filter(Boolean))].join(" + ");
  fields.switch_mapping = readSwitchMapping(hw, net);
  fields.gpio_base = Number.isNaN(toInt(hw.get("board.gpio.chip_base_num"))) ? null : toInt(hw.get("board.gpio.chip_base_num"));
  fields.gpio_buttons = readButtons(hw);
  fields.leds = readLeds(hw);
  fields.led_port_control = hw.get("board.eport.led_control") ?? "";
  Object.assign(fields, readFan(hw, true));
  fields.uart_baudrate = console?.baud ?? null;
  fields.internal_model = hw.get("board.name") ?? "";
  fields.firmware_git_commit = sw.get("git.commit") ?? "";
  fields.firmware_git_branch = sw.get("git.branch") ?? "";
  fields.si_source = source.get("firmware") ?? "";

  const overrides: Partial<RouterTechData> = {};
  if (wlan["2g"]) overrides.wlan2_4 = wlan["2g"];
  if (wlan["5g"]) overrides.wlan5 = wlan["5g"];
  if (internalSwitch) {
    overrides.switch =
      internalSwitch + (fields.switch_ext ? ` + ${fields.switch_ext}${extPort ? ` (cpu-switch port ${extPort})` : ""}` : "");
  }
  if (console) {
    overrides.serial_port = 1;
    overrides.serial_port_info = console.baud
      ? `${console.tty} ${console.baud}bps (OEM kernel ${console.raw.startsWith("console=") ? console.raw : "console"})`
      : `${console.tty} (baudrate unknown, ${console.raw})`;
  }

  return { fields, overrides };
}

export function applySiTechData(techdata: RouterTechData, dir = SI_DIR): RouterTechData {
  const { fields, overrides } = loadSiTechData(techdata.model, dir);
  return { ...techdata, ...fields, ...overrides };
}
