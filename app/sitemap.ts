import type { MetadataRoute } from "next";
import { products } from "./products/product-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
