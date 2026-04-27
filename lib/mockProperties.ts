// Mock data backing the rent estimator. In a real build these baselines
// would come from MLS comps, Rentometer, internal rent rolls, or an AI
// pricing model — this module is the seam that makes that swap easy.

// All values are rough monthly rent ranges for the property type as a
// whole (single family / condo etc.) in 2026 dollars. Numbers are
// directional placeholders, not market truth.
export type PropertyType =
  | "single-family"
  | "condo"
  | "duplex"
  | "small-multifamily"
  | "apartment";

export type PropertyStatus =
  | "vacant"
  | "owner-occupied"
  | "tenant-occupied"
  | "considering-purchase";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  "single-family": "Single Family Home",
  condo: "Condo / Townhome",
  duplex: "Duplex",
  "small-multifamily": "Small Multifamily",
  apartment: "Apartment Building",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  vacant: "Vacant",
  "owner-occupied": "Owner occupied",
  "tenant-occupied": "Tenant occupied",
  "considering-purchase": "Considering purchase",
};

// Baseline monthly rent ranges per city × property type.
// `null` for combinations we don't model — the estimator falls back to a
// nearby type when this happens.
type CityBaselines = Partial<Record<PropertyType, { low: number; high: number }>>;

export const CITY_BASELINES: Record<string, CityBaselines> = {
  // ---- Peninsula ----
  Hillsborough: {
    "single-family": { low: 7000, high: 12000 },
    condo: { low: 4500, high: 6500 },
    duplex: { low: 7500, high: 10500 },
    "small-multifamily": { low: 4000, high: 5500 },
    apartment: { low: 3800, high: 5200 },
  },
  Burlingame: {
    "single-family": { low: 5500, high: 8500 },
    condo: { low: 3800, high: 5500 },
    duplex: { low: 6500, high: 9500 },
    "small-multifamily": { low: 3300, high: 4500 },
    apartment: { low: 3200, high: 4400 },
  },
  "San Mateo": {
    "single-family": { low: 4500, high: 6500 },
    condo: { low: 3500, high: 5000 },
    duplex: { low: 5500, high: 8000 },
    "small-multifamily": { low: 3000, high: 4100 },
    apartment: { low: 2900, high: 4000 },
  },
  Belmont: {
    "single-family": { low: 4500, high: 6800 },
    condo: { low: 3400, high: 4800 },
    duplex: { low: 5500, high: 8000 },
    "small-multifamily": { low: 2900, high: 3900 },
    apartment: { low: 2800, high: 3800 },
  },
  "Redwood City": {
    "single-family": { low: 4500, high: 6500 },
    condo: { low: 3400, high: 4900 },
    duplex: { low: 5500, high: 8000 },
    "small-multifamily": { low: 2900, high: 4000 },
    apartment: { low: 2800, high: 3900 },
  },
  Atherton: {
    "single-family": { low: 9000, high: 18000 },
    condo: { low: 4500, high: 6500 },
    duplex: { low: 8000, high: 11000 },
    "small-multifamily": { low: 4200, high: 5800 },
    apartment: { low: 4000, high: 5500 },
  },
  "Menlo Park": {
    "single-family": { low: 5500, high: 9000 },
    condo: { low: 3800, high: 5500 },
    duplex: { low: 6500, high: 9500 },
    "small-multifamily": { low: 3200, high: 4400 },
    apartment: { low: 3100, high: 4300 },
  },
  "Palo Alto": {
    "single-family": { low: 6500, high: 11000 },
    condo: { low: 4200, high: 6000 },
    duplex: { low: 7000, high: 10000 },
    "small-multifamily": { low: 3500, high: 4700 },
    apartment: { low: 3400, high: 4600 },
  },
  // ---- South Bay ----
  "Mountain View": {
    "single-family": { low: 4500, high: 6500 },
    condo: { low: 3500, high: 5000 },
    duplex: { low: 5500, high: 8000 },
    "small-multifamily": { low: 3000, high: 4000 },
    apartment: { low: 2900, high: 3800 },
  },
  Sunnyvale: {
    "single-family": { low: 4000, high: 5500 },
    condo: { low: 3200, high: 4500 },
    duplex: { low: 5500, high: 8000 },
    "small-multifamily": { low: 2800, high: 3800 },
    apartment: { low: 2700, high: 3600 },
  },
  "Santa Clara": {
    "single-family": { low: 3900, high: 5300 },
    condo: { low: 3100, high: 4400 },
    duplex: { low: 5200, high: 7500 },
    "small-multifamily": { low: 2700, high: 3700 },
    apartment: { low: 2600, high: 3500 },
  },
  Cupertino: {
    "single-family": { low: 4800, high: 7000 },
    condo: { low: 3600, high: 5200 },
    duplex: { low: 6000, high: 8500 },
    "small-multifamily": { low: 3100, high: 4100 },
    apartment: { low: 3000, high: 4000 },
  },
  "San Jose": {
    "single-family": { low: 3600, high: 5000 },
    condo: { low: 2800, high: 4200 },
    duplex: { low: 4800, high: 7000 },
    "small-multifamily": { low: 2500, high: 3400 },
    apartment: { low: 2400, high: 3200 },
  },
  Campbell: {
    "single-family": { low: 3800, high: 5200 },
    condo: { low: 3000, high: 4300 },
    duplex: { low: 5000, high: 7200 },
    "small-multifamily": { low: 2600, high: 3500 },
    apartment: { low: 2500, high: 3400 },
  },
  "Los Gatos": {
    "single-family": { low: 5000, high: 7500 },
    condo: { low: 3800, high: 5500 },
    duplex: { low: 6500, high: 9000 },
    "small-multifamily": { low: 3200, high: 4300 },
    apartment: { low: 3100, high: 4200 },
  },
  Milpitas: {
    "single-family": { low: 3500, high: 4800 },
    condo: { low: 2700, high: 4000 },
    duplex: { low: 4600, high: 6800 },
    "small-multifamily": { low: 2400, high: 3300 },
    apartment: { low: 2300, high: 3200 },
  },
};

// Used when a city isn't in our table — keeps the estimator from
// throwing for off-list ZIPs. South Bay-leaning numbers.
export const FALLBACK_CITY_BASELINE: CityBaselines = {
  "single-family": { low: 3800, high: 5200 },
  condo: { low: 3000, high: 4300 },
  duplex: { low: 5000, high: 7200 },
  "small-multifamily": { low: 2600, high: 3500 },
  apartment: { low: 2500, high: 3400 },
};

// A demo property used by /estimate/results?demo=1 so the page is
// previewable without going through the form.
export const DEMO_PROPERTY = {
  street: "1247 Sunnydale Ave",
  city: "Sunnyvale",
  zip: "94087",
  type: "single-family" as PropertyType,
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1850,
  units: 1,
  status: "vacant" as PropertyStatus,
  contact: {
    name: "Demo Owner",
    email: "demo@example.com",
    phone: "",
  },
};
