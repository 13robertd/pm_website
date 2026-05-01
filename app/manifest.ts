import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

// Web app manifest — emitted at /manifest.webmanifest. Lets browsers
// treat the site as installable (Chrome "Install app", iOS "Add to
// Home Screen") and gives the splash screen the right colors.
//
// theme_color matches the brand-500 accent; background_color is white.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Bayline",
    description:
      "Modern property management for Peninsula and South Bay homeowners.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
