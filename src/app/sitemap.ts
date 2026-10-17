import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { getBuildDate } from "@/lib/date";

/**
 * Single-page site, so the sitemap has one entry. If you later add routes
 * (a blog, project case studies), add them to this array.
 *
 * `lastModified` comes from a cached helper rather than `new Date()` directly,
 * which would otherwise make this route dynamic.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getBuildDate();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
