import { z } from 'zod';

/** MarginShield engine major version for finding IDs and run hashes */
export const ENGINE_MAJOR_VERSION = '1';

export const ValueClassSchema = z.enum([
  'DETECTED_LEAKAGE',
  'POLICY_LEAKAGE',
  'MODELLED_MARGIN_OPPORTUNITY',
  'CASH_ENTITLEMENT',
  'OPPORTUNITY',
  'INSIGHT',
  'OVERLAY',
  'BILLING_RISK',
]);
export type ValueClass = z.infer<typeof ValueClassSchema>;

export const BasisClassSchema = z.enum([
  'CONTRACTUAL',
  'EXTERNAL_TERM',
  'INTERNAL_POLICY',
  'HISTORICAL',
  'DERIVED',
  'PEER_BENCHMARK',
  'MODELLED',
]);
export type BasisClass = z.infer<typeof BasisClassSchema>;

export const EvidenceGradeSchema = z.enum(['A', 'B', 'C']);
export type EvidenceGrade = z.infer<typeof EvidenceGradeSchema>;

export const FindingStatusSchema = z.enum([
  'DETECTED',
  'REVIEWED',
  'VERIFIED',
  'REJECTED',
  'ACTION_PLANNED',
  'IMPLEMENTED',
  'REALIZED',
  'CLOSED',
]);
export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const CheckFamilySchema = z.enum(['BUY', 'SERVE', 'SELL']);
export type CheckFamily = z.infer<typeof CheckFamilySchema>;

export const CheckIdSchema = z.enum([
  'B1',
  'B2',
  'B3',
  'S1',
  'S2',
  'S3',
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
]);
export type CheckId = z.infer<typeof CheckIdSchema>;

export const MoneySchema = z.object({
  amount: z.string(),
  currency: z.string().length(3),
});
export type Money = z.infer<typeof MoneySchema>;

export const FindingSchema = z.object({
  finding_id: z.string(),
  run_hash: z.string(),
  check_id: CheckIdSchema,
  family: CheckFamilySchema,
  value_class: ValueClassSchema,
  basis_class: BasisClassSchema,
  status: FindingStatusSchema,
  customer_id: z.string().nullable(),
  sku: z.string().nullable(),
  product_group: z.string().nullable(),
  supplier_id: z.string().nullable(),
  invoice_no: z.string().nullable(),
  raw_gap: z.string(),
  allocated_value: z.string(),
  evidence_grade: EvidenceGradeSchema,
  capture_low: z.number(),
  capture_base: z.number(),
  capture_high: z.number(),
  risk_band: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  bankable_low: z.string(),
  bankable_base: z.string(),
  bankable_high: z.string(),
  cash_claimable: z.string().nullable(),
  root_cause: z.string().nullable(),
  facts_json: z.record(z.unknown()),
  method_version: z.string(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const ScanHeadlinesSchema = z.object({
  detected_leakage: MoneySchema,
  verified_leakage: MoneySchema.nullable(),
  modelled_margin_opportunity: MoneySchema,
  total_addressable_margin: MoneySchema,
  expected_bankable_base: MoneySchema,
  expected_bankable_low: MoneySchema,
  expected_bankable_high: MoneySchema,
  cash_claimable_now: MoneySchema,
  margin_integrity_index: z.number().min(0).max(100),
  economic_coverage_pct: z.number().min(0).max(100),
});
export type ScanHeadlines = z.infer<typeof ScanHeadlinesSchema>;
