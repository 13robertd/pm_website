// Centralized content/data for the homepage.
// Edit values here to update copy across the site without touching components.

export const COMPANY_NAME = "Bayline Property Co.";

export const NAV_LINKS = [
  { label: "Property Management", href: "#property-management" },
  { label: "Owner Dashboard", href: "#dashboard" },
  { label: "Homeowner Services", href: "#homeowner-services" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
] as const;

// Trust badges shown both as a strip below the hero and as inline chips
// inside the hero itself. Order matters — strongest signal first.
export const TRUST_BADGES = [
  "South Bay focused",
  "Same-business-day owner response",
  "Online owner dashboard",
  "Transparent monthly reporting",
  "Local vendor network",
] as const;

// Property management services. Copy is intentionally outcome-focused —
// it tells the owner what they get, not just what we do.
export const PROPERTY_MANAGEMENT_SERVICES = [
  {
    title: "Residential Property Management",
    description:
      "Run your single-family rental like a real asset — full-service operations focused on long-term value, not month-to-month firefighting.",
  },
  {
    title: "Small Multifamily Management",
    description:
      "Hands-on operations for duplexes, triplexes, and small apartment buildings — built to maximize occupancy and protect NOI.",
  },
  {
    title: "Leasing & Tenant Placement",
    description:
      "Modern listings, fast tours, careful screening, and digital lease execution — designed to fill units quickly with qualified residents.",
  },
  {
    title: "Maintenance Coordination",
    description:
      "Same-day triage, vetted vendors, and full visibility into every work order — fewer surprises, controlled costs, happy residents.",
  },
  {
    title: "Turnover Management",
    description:
      "Coordinated punch lists, clean trade scheduling, and quick re-list timelines — minimize vacancy days and protect your asset between tenants.",
  },
  {
    title: "Rent Collection",
    description:
      "Automated collection, on-time owner payouts, and clear monthly statements — predictable cash flow without the chase.",
  },
  {
    title: "Owner Reporting",
    description:
      "Live dashboard, monthly statements, and proactive updates — visibility into occupancy, income, and NOI you can actually act on.",
  },
  {
    title: "Vendor Oversight",
    description:
      "Quotes, scope review, and quality checks on every job — work matches what you paid for, and your property stays in great shape.",
  },
] as const;

export const HOMEOWNER_SERVICES = [
  {
    title: "Home Watch / Home Checks",
    description:
      "Scheduled property walkthroughs for owners who travel, have vacant homes, or need local eyes on the property.",
    bullets: [
      "Leak and security checks",
      "Package and exterior review",
      "Utility and thermostat check",
      "Vendor access coordination",
    ],
  },
  {
    title: "Vendor Concierge",
    description:
      "One trusted point of contact to coordinate home maintenance and repairs across your trades.",
    bullets: [
      "Plumber, electrician, handyman coordination",
      "Vendor scheduling",
      "Quote collection",
      "Work completion follow-up",
    ],
  },
  {
    title: "Move / Rental Prep",
    description:
      "Get a home ready for rent, sale, or owner move-in with a coordinated punch list and oversight.",
    bullets: [
      "Cleaning and repairs",
      "Paint and touch-ups",
      "Landscaping refresh",
      "Turnover coordination",
    ],
  },
] as const;

export const SERVICE_AREAS = [
  "Sunnyvale",
  "San Jose",
  "Santa Clara",
  "Mountain View",
  "Cupertino",
  "Campbell",
  "Los Gatos",
  "Milpitas",
] as const;

export const PROPERTY_TYPES = [
  "Rental property",
  "Small multifamily",
  "Owner-occupied home",
  "Vacant home",
  "Other",
] as const;

export const SERVICE_INTERESTS = [
  "Property Management",
  "Home Watch / Home Checks",
  "Vendor Concierge",
  "Move / Rental Prep",
  "Not sure yet",
] as const;
