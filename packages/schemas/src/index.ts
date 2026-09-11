import { z } from "zod";

export const ValueClassSchema = z.enum([
  "DETECTED_LEAKAGE",
  "POLICY_LEAKAGE",
  "MODELLED_MARGIN_OPPORTUNITY",
  "CASH_ENTITLEMENT",
  "OPPORTUNITY",
  "INSIGHT",
  "OVERLAY",
  "BILLING_RISK",
]);

export type ValueClass = z.infer<typeof ValueClassSchema>;

export const BasisClassSchema = z.enum([
  "CONTRACTUAL",
  "EXTERNAL_TERM",
  "INTERNAL_POLICY",
  "HISTORICAL",
  "DERIVED",
  "PEER_BENCHMARK",
  "MODELLED",
]);

export type BasisClass = z.infer<typeof BasisClassSchema>;

export const EvidenceGradeSchema = z.enum(["A", "B", "C"]);

export type EvidenceGrade = z.infer<typeof EvidenceGradeSchema>;

export const FindingStatusSchema = z.enum([
  "DETECTED",
  "REVIEWED",
  "VERIFIED",
  "REJECTED",
  "ACTION_PLANNED",
  "IMPLEMENTED",
  "REALIZED",
  "CLOSED",
]);

export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const CheckFamilySchema = z.enum(["BUY", "SERVE", "SELL"]);

export type CheckFamily = z.infer<typeof CheckFamilySchema>;

export const CheckIdSchema = z.enum([
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
]);

export type CheckId = z.infer<typeof CheckIdSchema>;

export const EvidenceKindSchema = z.enum([
  "TRANSACTION",
  "AGREEMENT",
  "COST",
  "FREIGHT",
  "REBATE",
  "PURCHASE",
  "POLICY",
  "CALCULATION",
]);

export type EvidenceKind = z.infer<typeof EvidenceKindSchema>;

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
  risk_band: z.enum(["LOW", "MEDIUM", "HIGH"]),
  bankable_low: z.string(),
  bankable_base: z.string(),
  bankable_high: z.string(),
  cash_claimable: z.string(),
  root_cause: z.boolean(),
  facts_json: z.record(z.unknown()),
  method_version: z.string(),
});

export type Finding = z.infer<typeof FindingSchema>;

export const FindingEvidenceSchema = z.object({
  finding_id: z.string(),
  evidence_kind: EvidenceKindSchema,
  source_file: z.string().nullable(),
  source_sheet: z.string().nullable(),
  source_row: z.number().nullable(),
  record_id: z.string().nullable(),
  field: z.string().nullable(),
  value_display: z.string().nullable(),
  role: z.string().nullable(),
});

export type FindingEvidence = z.infer<typeof FindingEvidenceSchema>;

export const ENGINE_MAJOR_VERSION = "0.1";
