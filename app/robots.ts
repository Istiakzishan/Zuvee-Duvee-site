import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://zuvee-duvee.istiakzishan.chatgpt.site/sitemap.xml",
  };
}
