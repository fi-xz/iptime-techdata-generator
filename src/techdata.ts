import {
  filterSocVendorByModelName,
  filterSocVendorBySoc,
  filterWifiStandardByModelName,
  filterWifiStandardByWireless,
} from "./filters.js";
import { applyManualOverrides } from "./overrides.js";
import { applySiTechData, emptySiFields } from "./si.js";
import { SocVendor, WifiStandard, type ProductPage, type RouterTechData } from "./types.js";

const socChipPattern = /\b(MT\d{4}[A-Z]*|BCM\d{4,5}[A-Z]*|RTL\d{4}[A-Z]*|IPQ\d{4}[A-Z]*|QCA\d{4}[A-Z]*|AN\d{4}[A-Z]*|EN\d{4}[A-Z]*|GRX\d{3})\b/i;

const targetBySocPrefix: [RegExp, string][] = [
  [/^MT76(20|21|28|88)/, "ramips"],
  [/^MT(7622|7623|7629|7981|7986|7988)/, "mediatek"],
  [/^BCM(4708|4709|47094|53573)/, "bcm53xx"],
  [/^BCM4718/, "bcm47xx"],
  [/^BCM490[68]/, "bcm4908"],
  [/^QCA95/, "ath79"],
  [/^IPQ40/, "ipq40xx"],
  [/^IPQ806/, "ipq806x"],
  [/^IPQ(807|60|50)/, "qualcommax"],
  [/^EN7523|^AN758/, "airoha"],
];

function parseSoc(page: ProductPage): string {
  const cpu = page.spec["CPU"]?.split("\n")[0] ?? page.properties["SoC"] ?? "";
  const chip = cpu.match(socChipPattern)?.[1]?.toUpperCase();
  const vendor = filterSocVendorBySoc(cpu);

  if (!chip) {
    return cpu
      .replace(/\(.*?\)|\bCPU\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return vendor === SocVendor.Unknown ? chip : `${vendor} ${chip}`;
}

function parseSize(text: string | undefined): string {
  if (!text) {
    return "";
  }

  const sizes = Array.from(text.matchAll(/(\d+(?:\.\d+)?)\s*([MG])\s*(?:B|byte)/gi)).map(
    (match) => `${match[1]}${match[2]!.toUpperCase()}B`,
  );
  const storageType = text.match(/\b(NAND|NOR|eMMC)\b/i)?.[1];

  if (sizes.length === 0) {
    return text;
  }

  return [sizes.join(" + "), storageType].filter((part) => part).join(" ");
}

function parseEthernetPorts(page: ProductPage): number {
  const interfaces = [page.spec["WAN Interface"], page.spec["LAN Interface"]].join("\n");

  return Array.from(interfaces.matchAll(/^(\d+)\s*x/gim)).reduce((count, match) => count + Number(match[1]), 0);
}

function parseUsbPorts(page: ProductPage): number {
  const usb = page.spec["인터페이스"];

  if (!usb || !/usb/i.test(usb)) {
    return 0;
  }

  return usb
    .split(/[,/]/)
    .filter((segment) => /\d/.test(segment))
    .reduce((count, segment) => count + Number(segment.match(/x\s*(\d+)/i)?.[1] ?? 1), 0);
}

function findTarget(soc: string): string {
  const chip = soc.match(socChipPattern)?.[1]?.toUpperCase() ?? "";

  return targetBySocPrefix.find(([pattern]) => pattern.test(chip))?.[1] ?? "";
}

function findWlanDriver(socVendor: SocVendor, wifiStandard: WifiStandard): string {
  if (socVendor === SocVendor.MediaTek) {
    return "mt76";
  } else if (socVendor === SocVendor.Qualcomm) {
    switch (wifiStandard) {
      case WifiStandard.Wifi5:
        return "ath10k";
      case WifiStandard.Wifi6:
        return "ath11k";
      case WifiStandard.Wifi7:
        return "ath12k";
    }
  }

  return "";
}

export function buildRouterTechData(model: string, page: ProductPage): RouterTechData {
  const soc = parseSoc(page);
  const socVendorBySoc = filterSocVendorBySoc(soc);
  const socVendor = socVendorBySoc === SocVendor.Unknown ? filterSocVendorByModelName(model) : socVendorBySoc;
  const wifiStandardBySpec = filterWifiStandardByWireless(page.spec["Wireless Interface"] ?? "");
  const wifiStandard =
    wifiStandardBySpec === WifiStandard.Unknown ? filterWifiStandardByModelName(model) : wifiStandardBySpec;

  // OEM si data (scripts/collect-si.sh) overrides wlan/switch/serial fields when available
  // manual-overrides.json is applied last so hand-checked facts always win
  return applyManualOverrides(applySiTechData({
    model: model,
    target: findTarget(soc),
    bootloader: "",
    soc: soc,
    soc_vendor: socVendor,
    flash: parseSize(page.spec["FLASH"] ?? page.properties["Flash"]),
    ram: parseSize(page.spec["DRAM"] ?? page.properties["DRAM"]),
    switch: "",
    wlan2_4: "",
    wlan5: "",
    wlan_driver: findWlanDriver(socVendor, wifiStandard),
    usb: parseUsbPorts(page),
    ethernet_ports: parseEthernetPorts(page),
    serial_port: 0,
    serial_port_info: "",
    uart_exposed: true, // most ipTIME boards expose a UART header; set false per model in manual-overrides.json
    uart_note: "",
    wifi_standard: wifiStandard,
    ...emptySiFields(),
  }));
}
