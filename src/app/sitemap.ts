import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/lib/city-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://marketcenterrealty.com";
  const now = new Date().toISOString();

  const cityPages = getAllCitySlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...cityPages,
  ];
}
