import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Inter is a clean, modern sans-serif used by Stripe, Linear, etc.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// SEO metadata. Title and description target the primary keyword
// ("Peninsula and South Bay property management") and the secondary
// city-level keywords roll up through the body copy + JSON-LD on the
// homepage. Open Graph mirrors the same language for link previews.
const siteUrl = SITE_URL;
const siteTitle =
  "Peninsula & South Bay Property Management | Bayline Property Co.";
const siteDescription =
  "Bayline Property Co. provides modern property management for Peninsula and South Bay homeowners, including leasing, maintenance coordination, owner reporting, rental analysis, and transparent asset dashboards.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Peninsula property management",
    "South Bay property management",
    "San Mateo property management",
    "Burlingame property management",
    "Belmont property management",
    "Redwood City property management",
    "Palo Alto property management",
    "Mountain View property management",
    "Sunnyvale property management",
    "Santa Clara property management",
    "Cupertino property management",
    "San Jose property management",
    "Campbell property management",
    "Los Gatos property management",
    "Bay Area rental management",
    "owner dashboard",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bayline Property Co.",
    title:
      "Peninsula & South Bay Property Management — Modern Owner Experience",
    description:
      "Modern rental management, owner reporting, and proactive maintenance for Peninsula and South Bay homeowners — single-family homes and small multifamily from San Mateo to San Jose.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Peninsula & South Bay Property Management — Bayline Property Co.",
    description:
      "Modern rental management, owner reporting, and proactive maintenance for Peninsula and South Bay homeowners.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Viewport-level chrome. theme-color paints the URL bar on mobile
// browsers (white in light mode, slate-900 in dark) and matches the
// site's actual surface, not a generic blue.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {/* Skip-to-content link for keyboard users. Visually hidden
            until focused, then sits in the top-left as a real link. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
