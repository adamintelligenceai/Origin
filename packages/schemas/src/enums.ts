export const VALUE_CLASSES = [
  "DETECTED_LEAKAGE",
  "POLICY_LEAKAGE",
  "MODELLED_MARGIN_OPPORTUNITY",
  "CASH_ENTITLEMENT",
  "OPPORTUNITY",
  "INSIGHT",
  "OVERLAY",
  "BILLING_RISK",
] as const;

export type ValueClass = (typeof VALUE_CLASSES)[number];

export const BASIS_CLASSES = [
  "CONTRACTUAL",
  "EXTERNAL_TERM",
  "INTERNAL_POLICY",
  "HISTORICAL",
  "DERIVED",
  "PEER_BENCHMARK",
  "MODELLED",
] as const;

export type BasisClass = (typeof BASIS_CLASSES)[number];

export const EVIDENCE_GRADES = ["A", "B", "C"] as const;

export type EvidenceGrade = (typeof EVIDENCE_GRADES)[number];

export const FINDING_STATUSES = [
  "DETECTED",
  "REVIEWED",
  "VERIFIED",
  "REJECTED",
  "ACTION_PLANNED",
  "IMPLEMENTED",
  "REALIZED",
  "CLOSED",
] as const;

export type FindingStatus = (typeof FINDING_STATUSES)[number];

export const CHECK_FAMILIES = ["BUY", "SERVE", "SELL"] as const;

export type CheckFamily = (typeof CHECK_FAMILIES)[number];

export const CHECK_IDS = [
  "B1",
  "B2",
  "B3",
  "S1",
  "S2",
  "S3",
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
] as const;

export type CheckId = (typeof CHECK_IDS)[number];

export const EVIDENCE_KINDS = [
  "TRANSACTION",
  "AGREEMENT",
  "COST",
  "FREIGHT",
  "REBATE",
  "PURCHASE",
  "POLICY",
  "CALCULATION",
] as const;

export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];

export const RISK_BANDS = ["LOW", "MEDIUM", "HIGH"] as const;

export type RiskBand = (typeof RISK_BANDS)[number];

export const BANKABILITY_SCENARIOS = ["LOW", "BASE", "HIGH"] as const;

export type BankabilityScenario = (typeof BANKABILITY_SCENARIOS)[number];

export const PRICE_ACTION_SCENARIOS = ["CONSERVATIVE", "RECOMMENDED", "FULL_RESTORE"] as const;

export type PriceActionScenario = (typeof PRICE_ACTION_SCENARIOS)[number];

export const PRICE_BASES = ["INVOICE", "POCKET"] as const;

export type PriceBasis = (typeof PRICE_BASES)[number];

export const REBATE_TYPES = [
  "FLAT",
  "RETROSPECTIVE_TIER",
  "INCREMENTAL_TIER",
  "GROWTH",
  "CLAIM_BACK",
] as const;

export type RebateType = (typeof REBATE_TYPES)[number];

export const SYNTHETIC_VARIANTS = ["clean", "planted", "messy", "partial"] as const;

export type SyntheticVariant = (typeof SYNTHETIC_VARIANTS)[number];

export const AUTH_ROLES = ["Owner", "Analyst", "Viewer"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

export function assertNever(value: never, message = "Unhandled union member"): never {
  throw new Error(`${message}: ${String(value)}`);
}
