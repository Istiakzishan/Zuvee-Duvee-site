import type { MetadataRoute } from "next";
import { products } from "./products/product-data";
import { articles } from "./articles/article-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/articles`, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((article) => ({ url: `${baseUrl}/articles/${article.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
