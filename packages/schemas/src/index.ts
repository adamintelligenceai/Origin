import { z } from 'zod';

export const valueClassSchema = z.enum([
  'DETECTED_LEAKAGE',
  'POLICY_LEAKAGE',
  'MODELLED_MARGIN_OPPORTUNITY',
  'CASH_ENTITLEMENT',
  'OPPORTUNITY',
  'INSIGHT',
  'OVERLAY',
  'BILLING_RISK',
]);
export type ValueClass = z.infer<typeof valueClassSchema>;

export const basisClassSchema = z.enum([
  'CONTRACTUAL',
  'EXTERNAL_TERM',
  'INTERNAL_POLICY',
  'HISTORICAL',
  'DERIVED',
  'PEER_BENCHMARK',
  'MODELLED',
]);
export type BasisClass = z.infer<typeof basisClassSchema>;

export const evidenceGradeSchema = z.enum(['A', 'B', 'C']);
export type EvidenceGrade = z.infer<typeof evidenceGradeSchema>;

export const findingStatusSchema = z.enum([
  'DETECTED',
  'REVIEWED',
  'VERIFIED',
  'REJECTED',
  'ACTION_PLANNED',
  'IMPLEMENTED',
  'REALIZED',
  'CLOSED',
]);
export type FindingStatus = z.infer<typeof findingStatusSchema>;

export const checkIdSchema = z.enum([
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
  'S1',
  'S2',
  'S3',
  'B1',
  'B2',
  'B3',
]);
export type CheckId = z.infer<typeof checkIdSchema>;

export const familySchema = z.enum(['BUY', 'SERVE', 'SELL']);
export type Family = z.infer<typeof familySchema>;

export const riskBandSchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type RiskBand = z.infer<typeof riskBandSchema>;

export const evidenceKindSchema = z.enum([
  'TRANSACTION',
  'AGREEMENT',
  'COST',
  'FREIGHT',
  'REBATE',
  'PURCHASE',
  'POLICY',
  'CALCULATION',
]);
export type EvidenceKind = z.infer<typeof evidenceKindSchema>;

export const priceBasisSchema = z.enum(['INVOICE', 'POCKET']);
export type PriceBasis = z.infer<typeof priceBasisSchema>;

export const rebateTypeSchema = z.enum([
  'FLAT',
  'RETROSPECTIVE_TIER',
  'INCREMENTAL_TIER',
  'GROWTH',
  'CLAIM_BACK',
]);
export type RebateType = z.infer<typeof rebateTypeSchema>;

export const moneyString = z.string().regex(/^-?\d+\.\d{4}$/);

export const findingEvidenceSchema = z.object({
  finding_id: z.string(),
  evidence_kind: evidenceKindSchema,
  source_file: z.string().optional(),
  source_sheet: z.string().optional(),
  source_row: z.number().int().optional(),
  record_id: z.string().optional(),
  field: z.string().optional(),
  value_display: z.string(),
  role: z.string(),
});
export type FindingEvidence = z.infer<typeof findingEvidenceSchema>;

export const findingSchema = z.object({
  finding_id: z.string(),
  run_hash: z.string(),
  check_id: checkIdSchema,
  family: familySchema,
  value_class: valueClassSchema,
  basis_class: basisClassSchema,
  status: findingStatusSchema,
  customer_id: z.string().optional(),
  sku: z.string().optional(),
  product_group: z.string().optional(),
  supplier_id: z.string().optional(),
  invoice_no: z.string().optional(),
  raw_gap: moneyString,
  allocated_value: moneyString,
  evidence_grade: evidenceGradeSchema,
  capture_low: z.number(),
  capture_base: z.number(),
  capture_high: z.number(),
  risk_band: riskBandSchema,
  bankable_low: moneyString,
  bankable_base: moneyString,
  bankable_high: moneyString,
  cash_claimable: moneyString,
  root_cause: z.boolean(),
  facts_json: z.record(z.string(), z.unknown()),
  method_version: z.string(),
  title: z.string(),
  grain_key: z.string(),
});
export type Finding = z.infer<typeof findingSchema>;
