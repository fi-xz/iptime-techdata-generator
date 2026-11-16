export enum SocVendor {
  Broadcom = "Broadcom",
  Realtek = "Realtek",
  MediaTek = "MediaTek",
  Qualcomm = "Qualcomm",
  Airoha = "Airoha",
  Intel = "Intel",
  Unknown = "Unknown",
}

export enum WifiStandard {
  Wifi4 = "Wi-Fi 4",
  Wifi5 = "Wi-Fi 5",
  Wifi6 = "Wi-Fi 6",
  Wifi7 = "Wi-Fi 7",
  Unknown = "Unknown",
}

export interface RouterTechData {
  model: string; // The model name of the router
  target: string; // The target architecture
  bootloader: string; // Which bootloader is using. Mostly modified u-boot
  soc: string; // The SoC model name
  soc_vendor: SocVendor; // The SoC vendor name
  flash: string; // The flash size of the router
  ram: string; // The RAM size of the router
  switch: string; // The switch chip model name.
  wlan2_4: string; // The 2.4GHz Wi-Fi module name.
  wlan5: string; // The 5GHz Wi-fi module name.
  wlan_driver: string; // The Wi-Fi driver name.
  usb: number; // The number of USB ports
  ethernet_ports: number; // The number of Ethernet ports
  serial_port: number; // The number of serial ports
  serial_port_info: string; // The serial port information (e.g. UART 3.3V baudrate 57600 8N1)
  uart_exposed: boolean; // UART header/pins reachable without soldering. Defaults to true, override in manual-overrides.json
  uart_note: string; // Manual note about the UART (e.g. "pads only, soldering required")
  wifi_standard: WifiStandard; // The Wi-Fi standard (Wi-Fi 5, Wi-Fi 6, Wi-Fi 7)

  // ---- filled from the OEM rootfs default/var/run/si/{hw,sw,net} (see src/si.ts)
  wlan5_2: string; // Second 5GHz radio chip (tri-band), if any
  wlan6: string; // 6GHz radio chip, if any
  switch_ext: string; // External/cascaded switch chip (e.g. rtl8370 on 8-LAN models)
  switch_mapping: SwitchPort[]; // Physical port label -> switch chip/port
  gpio_base: number | null; // board.gpio.chip_base_num (OEM GPIO numbers may be relative to it)
  gpio_buttons: Record<string, GpioPin | null>; // reset / wps (+ wifi_switch, led_switch when present)
  leds: LedPin[]; // GPIO driven LEDs
  led_port_control: string; // Who drives port LEDs (e.g. "switch")
  fan: boolean | null; // null = unknown (no si data)
  fan_info: string; // Fan GPIOs (sense/control)
  uart_baudrate: number | null; // From the OEM kernel console= argument
  internal_model: string; // EFM internal board name (IPxxxxxx)
  firmware_git_commit: string; // git.commit of the OEM firmware build
  firmware_git_branch: string;
  si_source: string; // Which OEM firmware the si data came from
}

export interface GpioPin {
  gpio: number;
  active_low: boolean | null; // null = not stated (old si format)
  raw: string;
}

export interface LedPin extends GpioPin {
  name: string;
}

export interface SwitchPort {
  label: string; // WAN, LAN1, ... (physical order), or OEM ifname
  switch: string; // switch chip that owns the port
  port: string; // switch port number
  role: string; // wan / lan / iptv / mirror ...
}

export interface ProductLink {
  name: string;
  url: string;
}

export type SpecTable = Record<string, string>;

export interface FirmwareRelease {
  title: string;
  version: string;
  date: string;
  post_url: string;
  files: FirmwareFile[];
}

export interface FirmwareFile {
  name: string;
  url: string;
}

export interface ProductPage {
  link: ProductLink;
  spec: SpecTable;
  properties: Record<string, string>;
}
