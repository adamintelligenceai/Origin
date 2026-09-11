export const COMPANY = {
  name: "Harbourline Trade Supply Pty Ltd",
  tag: "Fictional demonstration company",
  currency: "AUD",
  targetT12mRevenue: 85_000_000,
  targetLineCount: 1_100_000,
  customers: 420,
  skus: 5800,
  suppliers: 60,
  reps: 28,
  branches: 6,
  months: 24,
} as const;

export const PLANTED_TARGETS = {
  P1: 286_000,
  P2: 196_000,
  P3: 411_000,
  P4: 188_000,
  P5: 151_000,
  P6: 98_000,
  S1: 221_000,
  S2: 64_000,
  S3: 57_000,
  B1: 168_000,
} as const;

export const PLANTED_TOTAL = Object.values(PLANTED_TARGETS).reduce((a, b) => a + b, 0);

export const DETECTED_LEAKAGE_CHECKS = ["P1", "S1", "S2", "S3", "B1"] as const;
export const MODELLED_CHECKS = ["P2", "P3", "P4", "P5", "P6"] as const;

export const DETECTED_LEAKAGE_TARGET = DETECTED_LEAKAGE_CHECKS.reduce(
  (sum, id) => sum + PLANTED_TARGETS[id],
  0,
);

export const MODELLED_TARGET = MODELLED_CHECKS.reduce((sum, id) => sum + PLANTED_TARGETS[id], 0);

export const CASH_ENTITLEMENT_TARGET = 124_000;

export const BRANCH_NAMES = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Newcastle",
] as const;

export const PRODUCT_GROUPS = ["HVAC", "Electrical", "Plumbing", "Industrial", "Safety"] as const;

export const CUSTOMER_PREFIXES = [
  "North Coast",
  "Metro",
  "Regional",
  "Coastal",
  "Inland",
  "Trade",
  "Pro",
  "Alliance",
] as const;

export const CUSTOMER_SUFFIXES = [
  "HVAC",
  "Electrical",
  "Plumbing",
  "Supplies",
  "Services",
  "Trade",
  "Wholesale",
] as const;
