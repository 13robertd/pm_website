import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt — emitted at /robots.txt.
//
// Allow everything except the funnel results route, which requires
// sessionStorage and would just redirect a crawler. The sitemap
// reference points crawlers at /sitemap.xml.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/estimate/results"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
