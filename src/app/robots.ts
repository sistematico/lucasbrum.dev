import { site } from "@/config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${site.baseUrl}/sitemap.xml`,
  };
}