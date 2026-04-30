import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { allCitySlugs } from "@/lib/areas";

// sitemap.xml — emitted at /sitemap.xml.
//
// Includes:
//   - Homepage
//   - /estimate (the funnel entry; /estimate/results is intentionally
//     excluded — it requires sessionStorage to render, so a crawler
//     would land on a redirect)
//   - All 16 /areas/[city] pages
//
// Priorities are directional, not absolute: the homepage and city
// pages get higher weight (real landing pages with content); /estimate
// is a tool surface so it sits a notch lower.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const cityEntries = allCitySlugs().map((slug) => ({
    url: `${SITE_URL}/areas/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/estimate`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...cityEntries,
  ];
}
