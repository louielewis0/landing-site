import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/pipeline", "/scripts", "/r/"],
      },
    ],
    sitemap: "https://marketcenterrealty.com/sitemap.xml",
  };
}
