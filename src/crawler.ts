import { parseFirmwareReleases, parseProductList, parseProductProperties, parseSpecTable } from "./parser.js";
import type { FirmwareRelease, ProductLink, ProductPage } from "./types.js";

export const BASE_URL = "https://iptime.com";
const RETRY_COUNT = 3;
const CONCURRENCY = 4;

export const routerCategories = ["router_be", "router_ax", "router_ac", "mesh", "discontinued"];

export async function fetchWithRetry(url: string): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (attempt >= RETRY_COUNT) {
        throw new Error(`Failed to fetch ${url}: ${error}`);
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
}

async function fetchHtml(url: string): Promise<string> {
  return await (await fetchWithRetry(url)).text();
}

export async function mapConcurrent<T, R>(items: T[], task: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  const queue = [...items];

  async function worker() {
    for (let item = queue.shift(); item !== undefined; item = queue.shift()) {
      results.push(await task(item));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  return results;
}

export async function fetchCategoryProducts(category: string): Promise<ProductLink[]> {
  const products: ProductLink[] = [];
  const seenUrls = new Set<string>();

  for (let page = 1; ; page++) {
    const html = await fetchHtml(`${BASE_URL}/products?cat=${category}&page=${page}`);
    const newProducts = parseProductList(html).filter((product) => !seenUrls.has(product.url));

    if (newProducts.length === 0) {
      break;
    }

    for (const product of newProducts) {
      seenUrls.add(product.url);
      products.push(product);
    }
  }

  return products;
}

export async function fetchProductPage(link: ProductLink): Promise<ProductPage> {
  const html = await fetchHtml(`${link.url}?pd=3`);

  return {
    link: link,
    spec: parseSpecTable(html),
    properties: parseProductProperties(html),
  };
}

export async function fetchProductPages(links: ProductLink[]): Promise<ProductPage[]> {
  let count = 0;

  return await mapConcurrent(links, async (link) => {
    const page = await fetchProductPage(link);
    console.log(`[${++count}/${links.length}] ${link.name}`);
    return page;
  });
}

export async function fetchFirmwareReleases(link: ProductLink): Promise<FirmwareRelease[]> {
  return parseFirmwareReleases(await fetchHtml(`${link.url}?pd=6`), BASE_URL);
}
