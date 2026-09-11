export const GOLDEN_THRESHOLDS = {
  plantedPairRecall: 0.95,
  economicTotalTolerance: 0.03,
  headlineTotalTolerance: 0.02,
} as const;

export const HARBOURLINE_PROFILE = {
  legalName: "Harbourline Trade Supply Pty Ltd",
  fictionalNotice: "Fictional demonstration company",
  approximateT12mSalesAud: 85_000_000,
  branches: 6,
  customers: 420,
  skus: 5_800,
  suppliers: 60,
  salesRepresentatives: 28,
  months: 24,
  approximateTransactionLines: 1_100_000,
  sectors: ["HVAC", "electrical", "plumbing"] as const,
} as const;

export const PLANTED_APPROXIMATE_AUD = {
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
  totalAddressable: 1_840_000,
  detectedOrPolicy: 796_000,
  modelledOpportunity: 1_044_000,
  cashEntitlement: 124_000,
} as const;
