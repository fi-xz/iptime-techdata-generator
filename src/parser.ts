import * as cheerio from "cheerio";
import type { FirmwareRelease, ProductLink, SpecTable } from "./types.js";

function normalizeText(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

function readJsonLd(html: string): any[] {
  const $ = cheerio.load(html);

  return $('script[type="application/ld+json"]')
    .toArray()
    .map((script) => {
      try {
        return JSON.parse($(script).text());
      } catch {
        return undefined;
      }
    })
    .filter((data) => data !== undefined);
}

export function parseProductList(html: string): ProductLink[] {
  const collection = readJsonLd(html).find((data) => data["@type"] === "CollectionPage");
  const items: any[] = collection?.mainEntity?.itemListElement ?? [];

  return items
    .map((item) => item.item ?? item)
    .filter((item) => item.name && item.url)
    .map((item) => ({ name: item.name, url: item.url }));
}

export function parseProductProperties(html: string): Record<string, string> {
  const product = readJsonLd(html).find((data) => data["@type"] === "Product");
  const properties: Record<string, string> = {};

  for (const property of product?.additionalProperty ?? []) {
    properties[property.name] = String(property.value);
  }

  return properties;
}

export function parseFirmwareReleases(html: string, baseUrl: string): FirmwareRelease[] {
  const $ = cheerio.load(html);
  const header = $("b")
    .filter((_, element) => normalizeText($(element).text()).startsWith("[펌웨어]"))
    .first();
  const table = header.closest("div").nextAll("table").first();

  return table
    .find("tbody tr")
    .toArray()
    .map((row) => {
      const cells = $(row).children("td");
      const titleLink = cells.eq(0).find("a").first();
      const title = normalizeText(titleLink.text());

      return {
        title: title,
        version: title.match(/(\d+\.\d+\.\d+)/)?.[1] ?? "",
        date: normalizeText(cells.eq(1).text()),
        post_url: new URL(titleLink.attr("href") ?? "", baseUrl).href,
        files: cells
          .eq(2)
          .find("a[href]")
          .toArray()
          .map((link) => {
            const url = new URL($(link).attr("href") ?? "", baseUrl);
            const name = $(link).attr("title") || url.pathname.split("/").pop() || "";
            return { name: name, url: url.href };
          })
          .filter((file) => file.name.length > 0),
      };
    })
    .filter((release) => release.title.length > 0);
}

export function parseSpecTable(html: string): SpecTable {
  const $ = cheerio.load(html);
  const spec: SpecTable = {};

  $(".legacy-spec tr").each((_, row) => {
    const cells = $(row).children("td");
    if (cells.length !== 2) {
      return;
    }

    cells.find("br").replaceWith("\n");

    const key = normalizeText(cells.eq(0).text());
    const value = normalizeText(cells.eq(1).text());

    if (key && !(key in spec)) {
      spec[key] = value;
    }
  });

  return spec;
}
