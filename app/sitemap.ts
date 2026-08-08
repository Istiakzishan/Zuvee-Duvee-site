import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zuvee-duvee.istiakzishan.chatgpt.site";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products/little-hands-activity-cube`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
