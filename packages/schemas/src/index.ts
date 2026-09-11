import { z } from 'zod';

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
  'DETECTED', 'REVIEWED', 'VERIFIED', 'REJECTED',
  'ACTION_PLANNED', 'IMPLEMENTED', 'REALIZED', 'CLOSED',
]);
export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const CheckIdSchema = z.enum([
  'B1', 'B2', 'B3', 'S1', 'S2', 'S3',
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7',
]);
export type CheckId = z.infer<typeof CheckIdSchema>;

export const CheckFamilySchema = z.enum(['BUY', 'SERVE', 'SELL']);
export type CheckFamily = z.infer<typeof CheckFamilySchema>;

export const RiskBandSchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type RiskBand = z.infer<typeof RiskBandSchema>;

export const FindingSchema = z.object({
  findingId: z.string(),
  runHash: z.string(),
  checkId: CheckIdSchema,
  family: CheckFamilySchema,
  valueClass: ValueClassSchema,
  basisClass: BasisClassSchema,
  status: FindingStatusSchema,
  customerId: z.string().optional(),
  customerName: z.string().optional(),
  sku: z.string().optional(),
  skuName: z.string().optional(),
  productGroup: z.string().optional(),
  supplierId: z.string().optional(),
  rawGap: z.string(),
  allocatedValue: z.string(),
  evidenceGrade: EvidenceGradeSchema,
  captureLow: z.number(),
  captureBase: z.number(),
  captureHigh: z.number(),
  riskBand: RiskBandSchema,
  bankableLow: z.string(),
  bankableBase: z.string(),
  bankableHigh: z.string(),
  cashClaimable: z.string().optional(),
  rootCause: z.string(),
  question: z.string(),
  factsJson: z.record(z.unknown()),
  methodVersion: z.string(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const FindingEvidenceSchema = z.object({
  findingId: z.string(),
  evidenceKind: z.enum([
    'TRANSACTION', 'AGREEMENT', 'COST', 'FREIGHT',
    'REBATE', 'PURCHASE', 'POLICY', 'CALCULATION',
  ]),
  sourceFile: z.string().optional(),
  sourceSheet: z.string().optional(),
  sourceRow: z.number().optional(),
  recordId: z.string().optional(),
  field: z.string().optional(),
  valueDisplay: z.string(),
  role: z.string(),
});
export type FindingEvidence = z.infer<typeof FindingEvidenceSchema>;

export const RunSummarySchema = z.object({
  runHash: z.string(),
  engineVersion: z.string(),
  methodVersion: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  currency: z.string(),
  economicCoverage: z.number(),
  detectedLeakage: z.string(),
  policyLeakage: z.string(),
  modelledOpportunity: z.string(),
  totalAddressable: z.string(),
  bankableBase: z.string(),
  bankableLow: z.string(),
  bankableHigh: z.string(),
  cashClaimableNow: z.string(),
  marginIntegrityIndex: z.number(),
  t12mNetSales: z.string(),
  salesTieOutConfirmed: z.boolean(),
  byFamily: z.object({ buy: z.string(), serve: z.string(), sell: z.string() }),
  byCheck: z.record(z.string()),
});
export type RunSummary = z.infer<typeof RunSummarySchema>;

export const CommercialConfigSchema = z.object({
  scanPriceAud: z.number(),
  foundingScanPriceAud: z.number(),
  monitorMonthlyAud: z.number(),
  currency: z.literal('AUD'),
});
export type CommercialConfig = z.infer<typeof CommercialConfigSchema>;

export const DEFAULT_COMMERCIAL: CommercialConfig = {
  scanPriceAud: 9500,
  foundingScanPriceAud: 4950,
  monitorMonthlyAud: 1950,
  currency: 'AUD',
};

export const CHECK_META: Record<CheckId, { family: CheckFamily; question: string }> = {
  B1: { family: 'BUY', question: 'Has the supplier rebate earned been fully claimed?' },
  B2: { family: 'BUY', question: 'Is the next rebate tier within reach?' },
  B3: { family: 'BUY', question: 'Does ERP margin differ from reconstructed landed economics?' },
  S1: { family: 'SERVE', question: 'Was chargeable freight recovered?' },
  S2: { family: 'SERVE', question: 'Were small orders surcharged per policy?' },
  S3: { family: 'SERVE', question: 'Were restocking fees collected per policy?' },
  P1: { family: 'SELL', question: 'Were invoices priced differently from an active documented customer agreement?' },
  P2: { family: 'SELL', question: 'Are expired commercial terms still being honoured without a replacement agreement?' },
  P3: { family: 'SELL', question: 'Did supplier/landed cost increase materially faster than customer pricing?' },
  P4: { family: 'SELL', question: 'Is realised pricing below the margin floor?' },
  P5: { family: 'SELL', question: 'Has effective customer discount progressively deteriorated?' },
  P6: { family: 'SELL', question: 'Is this customer materially below comparable realised prices?' },
  P7: { family: 'SELL', question: 'Where is pocket contribution negative?' },
};
