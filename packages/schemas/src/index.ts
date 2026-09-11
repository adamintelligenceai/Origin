export {
  AUTH_ROLES,
  BANKABILITY_SCENARIOS,
  BASIS_CLASSES,
  CHECK_FAMILIES,
  CHECK_IDS,
  EVIDENCE_GRADES,
  EVIDENCE_KINDS,
  FINDING_STATUSES,
  PRICE_ACTION_SCENARIOS,
  PRICE_BASES,
  REBATE_TYPES,
  RISK_BANDS,
  SYNTHETIC_VARIANTS,
  VALUE_CLASSES,
  assertNever,
} from "./enums";
export type {
  AuthRole,
  BankabilityScenario,
  BasisClass,
  CheckFamily,
  CheckId,
  EvidenceGrade,
  EvidenceKind,
  FindingStatus,
  PriceActionScenario,
  PriceBasis,
  RebateType,
  RiskBand,
  SyntheticVariant,
  ValueClass,
} from "./enums";

export { DEFAULT_REPORTING_CURRENCY, money } from "./money";
export type { ConvertedMoney, Money } from "./money";

export {
  DETECTED_OR_POLICY_CHECKS,
  MODELLED_OPPORTUNITY_CHECKS,
  SELL_TRANCHE_PRIORITY,
} from "./findings";
export type { BankabilityFactors, Finding, FindingEvidence, HeadlineMetrics } from "./findings";

export { GOLDEN_THRESHOLDS, HARBOURLINE_PROFILE, PLANTED_APPROXIMATE_AUD } from "./harbourline";

export {
  ANALYSIS_WORKER_TRADE_SPACING_MS,
  COMMERCIAL_RISK_MULTIPLIERS,
  COMMERCIAL_RISK_WEIGHTS,
  COST_MATCH_GATE,
  COVERAGE_COMPARABILITY_WARNING_POINTS,
  COVERAGE_WEIGHTS,
  DEFAULT_CAPTURE_FACTORS,
  DEFAULT_MATERIALITY_AUD,
  DEFAULT_P1_TOLERANCE,
  DEFAULT_P3_COST_CHANGE,
  DEFAULT_P3_PASS_THROUGH_GAP,
  DEFAULT_P6_ANNUAL_GAP_AUD,
  DEFAULT_P6_MATERIALITY_PCT,
  DEFAULT_P6_MIN_PEERS,
  DUPLICATE_RATE_GATE,
  ENGINE_MAJOR_VERSION,
  ENGINE_VERSION,
  EVIDENCE_PLANNING_WEIGHTS,
  METHOD_VERSION,
  OUTCOME_SHRINKAGE_K,
  PRICE_INCREASE_GUARDRAILS,
} from "./method-config";
export type { NetSalesSemantics } from "./method-config";

export {
  ACCEPTED_UPLOAD_EXTENSIONS,
  FILE_SAFETY_LIMITS,
  FORMULA_INJECTION_PREFIXES,
  REJECTED_UPLOAD_EXTENSIONS,
} from "./ingestion";
