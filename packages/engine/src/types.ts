export type ValueClass =
  | 'DETECTED_LEAKAGE'
  | 'POLICY_LEAKAGE'
  | 'MODELLED_MARGIN_OPPORTUNITY'
  | 'CASH_ENTITLEMENT'
  | 'OPPORTUNITY'
  | 'INSIGHT'
  | 'OVERLAY'
  | 'BILLING_RISK';

export type EvidenceGrade = 'A' | 'B' | 'C';

export type Finding = {
  findingId: string;
  checkId: string;
  family: 'SELL' | 'SERVE' | 'BUY';
  valueClass: ValueClass;
  evidenceGrade: EvidenceGrade;
  rawGapAud: number;
  allocatedValueAud: number;
  cashEntitlementAud: number;
  customerId?: string;
  sku?: string;
  title: string;
  rationale: string;
  evidence: Array<{ kind: string; ref: string; detail: string }>;
};

export type ScanHeadline = {
  detectedLeakageAud: number;
  modelledOpportunityAud: number;
  addressableMarginAud: number;
  expectedBankableBaseAud: number;
  expectedBankableLowAud: number;
  expectedBankableHighAud: number;
  cashEntitlementAud: number;
  marginIntegrityIndex: number;
  economicCoverage: number;
  t12mNetSalesAud: number;
  runHash: string;
  methodVersion: string;
};

export type ScanResult = {
  headline: ScanHeadline;
  findings: Finding[];
  waterfall: {
    listValueAud: number;
    invoiceRevenueAud: number;
    pocketRevenueAud: number;
    trueLandedCostAud: number;
    pocketContributionAud: number;
  };
  assumptions: Record<string, number | string | boolean>;
};
