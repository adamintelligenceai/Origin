import type {
  BankabilityScenario,
  BasisClass,
  CheckFamily,
  CheckId,
  EvidenceGrade,
  EvidenceKind,
  FindingStatus,
  RiskBand,
  ValueClass,
} from "./enums";

export interface Finding {
  finding_id: string;
  run_hash: string;
  check_id: CheckId;
  family: CheckFamily;
  value_class: ValueClass;
  basis_class: BasisClass;
  status: FindingStatus;
  customer_id: string | null;
  sku: string | null;
  product_group: string | null;
  supplier_id: string | null;
  invoice_no: string | null;
  raw_gap: string;
  allocated_value: string;
  evidence_grade: EvidenceGrade;
  capture_low: string;
  capture_base: string;
  capture_high: string;
  risk_band: RiskBand | null;
  bankable_low: string;
  bankable_base: string;
  bankable_high: string;
  cash_claimable: string;
  root_cause: boolean;
  facts_json: Record<string, string | number | boolean | null>;
  method_version: string;
}

export interface FindingEvidence {
  finding_id: string;
  evidence_kind: EvidenceKind;
  source_file: string | null;
  source_sheet: string | null;
  source_row: number | null;
  record_id: string | null;
  field: string | null;
  value_display: string;
  role: string;
}

export interface HeadlineMetrics {
  detected_leakage: string;
  verified_leakage: string | null;
  modelled_margin_opportunity: string;
  total_addressable_margin: string;
  expected_bankable_base: string;
  expected_bankable_low: string;
  expected_bankable_high: string;
  cash_claimable_now: string;
  margin_integrity_index: number;
  economic_coverage: number;
  currency: string;
}

export const SELL_TRANCHE_PRIORITY: CheckId[] = ["P1", "P2", "P3", "P4", "P5", "P6"];

export const DETECTED_OR_POLICY_CHECKS: CheckId[] = ["P1", "S1", "S2", "S3", "B1"];

export const MODELLED_OPPORTUNITY_CHECKS: CheckId[] = ["P2", "P3", "P4", "P5", "P6"];

export type BankabilityFactors = Record<CheckId, Record<BankabilityScenario, number>>;
