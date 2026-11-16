import { SocVendor, WifiStandard } from "./types.js";

export function normalizeModelName(model: string): string {
  return model
    .toLowerCase()
    .replace("iptime", "")
    .replace(/[^a-z0-9]/g, "");
}

export function filterSocVendorByModelName(model: string): SocVendor {
  const formattedModel = normalizeModelName(model);

  if (formattedModel.endsWith("bcm")) {
    return SocVendor.Broadcom;
  } else if (formattedModel.endsWith("qca")) {
    return SocVendor.Qualcomm;
  } else if (formattedModel.endsWith("itl")) {
    return SocVendor.Intel;
  } else if (formattedModel.endsWith("r")) {
    return SocVendor.Realtek;
  } else if (formattedModel.endsWith("m")) {
    return SocVendor.MediaTek;
  } else {
    return SocVendor.Unknown;
  }
}

export function filterSocVendorBySoc(soc: string): SocVendor {
  const formattedSoc = soc.toLowerCase();

  if (/broadcom|브로드컴|bcm\d/.test(formattedSoc)) {
    return SocVendor.Broadcom;
  } else if (/realtek|리얼텍|rtl\d/.test(formattedSoc)) {
    return SocVendor.Realtek;
  } else if (/airoha|에어로하|\ban\d{4}|\ben\d{4}/.test(formattedSoc)) {
    return SocVendor.Airoha;
  } else if (/mediatek|미디어텍|\bmt\d{4}/.test(formattedSoc)) {
    return SocVendor.MediaTek;
  } else if (/qualcomm|퀄컴|qca|ipq\d/.test(formattedSoc)) {
    return SocVendor.Qualcomm;
  } else if (/intel|인텔|lantiq|grx\d/.test(formattedSoc)) {
    return SocVendor.Intel;
  } else {
    return SocVendor.Unknown;
  }
}

export function filterWifiStandardByModelName(model: string): WifiStandard {
  const formattedModel = normalizeModelName(model);

  if (formattedModel.startsWith("be")) {
    return WifiStandard.Wifi7;
  } else if (formattedModel.startsWith("ax")) {
    return WifiStandard.Wifi6;
  } else if (/^a\d/.test(formattedModel)) {
    return WifiStandard.Wifi5;
  } else if (formattedModel.startsWith("n")) {
    return WifiStandard.Wifi4;
  } else {
    return WifiStandard.Unknown;
  }
}

export function filterWifiStandardByWireless(wireless: string): WifiStandard {
  const formattedWireless = wireless.toLowerCase();

  if (/11be|wi-?fi ?7/.test(formattedWireless)) {
    return WifiStandard.Wifi7;
  } else if (/11ax|\bax\b|wi-?fi ?6/.test(formattedWireless)) {
    return WifiStandard.Wifi6;
  } else if (/11ac|\bac\b|wi-?fi ?5/.test(formattedWireless)) {
    return WifiStandard.Wifi5;
  } else if (/11n|\/n\b|\bn\b|wi-?fi ?4/.test(formattedWireless)) {
    return WifiStandard.Wifi4;
  } else {
    return WifiStandard.Unknown;
  }
}
