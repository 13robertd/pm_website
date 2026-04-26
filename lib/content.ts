// Centralized content/data for the homepage.
// Edit values here to update copy across the site without touching components.

export const COMPANY_NAME = "Bayline Property Co.";

export const NAV_LINKS = [
  { label: "Property Management", href: "#property-management" },
  { label: "Homeowner Services", href: "#homeowner-services" },
  { label: "Owner Dashboard", href: "#dashboard" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
] as const;

export const TRUST_BADGES = [
  "Bay Area focused",
  "Fast response standards",
  "Online owner dashboard",
  "Transparent monthly reporting",
  "Local vendor network",
] as const;

export const PROPERTY_MANAGEMENT_SERVICES = [
  {
    title: "Residential Property Management",
    description:
      "Full-service management for single-family rentals, condos, and townhomes across the South Bay.",
  },
  {
    title: "Small Multifamily Management",
    description:
      "Hands-on operations for duplexes, triplexes, and small apartment buildings owned by local investors.",
  },
  {
    title: "Leasing & Tenant Placement",
    description:
      "Modern listings, fast tours, careful screening, and digital lease execution.",
  },
  {
    title: "Rent Collection",
    description:
      "Automated collection, owner payouts, and clear, on-time financial reporting.",
  },
  {
    title: "Maintenance Coordination",
    description:
      "Same-day triage, vetted vendors, and full visibility into every work order.",
  },
  {
    title: "Turnover Management",
    description:
      "Coordinated punch lists, clean trade scheduling, and quick re-list timelines.",
  },
  {
    title: "Owner Reporting",
    description:
      "Monthly statements, NOI tracking, and a live dashboard you can check anytime.",
  },
  {
    title: "Vendor Oversight",
    description:
      "Quotes, scope review, and quality checks so the work matches what you paid for.",
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
      "One trusted point of contact to help coordinate home maintenance and repairs.",
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
      "Get a home ready for rent, sale, or owner move-in with a coordinated punch list.",
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
