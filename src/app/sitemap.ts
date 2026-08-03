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
    { url: `${base}/best-metro-detroit-suburbs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/best-school-districts-metro-detroit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/troy-vs-rochester-hills`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/water-damage-sell-or-restore`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...cityPages,
  ];
}
