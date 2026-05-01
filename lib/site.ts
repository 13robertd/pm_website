// Site-wide constants. Single source of truth so the canonical URL,
// sitemap, robots, and JSON-LD all agree.
//
// Swap SITE_URL to the production domain when one is wired up.
export const SITE_URL = "https://pm-website-lemon.vercel.app";

export const SITE_NAME = "Bayline Property Co.";

// Public-facing contact email used by mailto: links in CTA sections.
// Currently a placeholder on the .example reserved TLD — swap to a
// real inbox before production. The /api/leads route is the primary
// lead path; this email is only for ad-hoc human contact links.
export const CONTACT_EMAIL = "hello@bayline.example";
