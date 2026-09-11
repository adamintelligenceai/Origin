export type SynthVariant = 'clean' | 'planted' | 'messy' | 'partial';

export type SynthOptions = {
  seed: number;
  variant: SynthVariant;
  /** Compact mode keeps planted economics with fewer lines for local/demo. */
  mode?: 'compact' | 'full';
};

export type GroundTruthFinding = {
  checkId: string;
  grain: Record<string, string>;
  expectedValueAud: number;
  valueClass: string;
  sourceRefs: string[];
};

export type GroundTruth = {
  company: string;
  fictional: true;
  seed: number;
  variant: SynthVariant;
  t12mNetSalesAud: number;
  planted: GroundTruthFinding[];
  totals: {
    detectedLeakageAud: number;
    modelledOpportunityAud: number;
    addressableMarginAud: number;
    cashEntitlementAud: number;
  };
};

export type HarbourlineDataset = {
  customers: Array<Record<string, string | number>>;
  skus: Array<Record<string, string | number>>;
  suppliers: Array<Record<string, string | number>>;
  transactions: Array<Record<string, string | number>>;
  supplierCosts: Array<Record<string, string | number>>;
  agreements: Array<Record<string, string | number>>;
  rebates: Array<Record<string, string | number>>;
  freight: Array<Record<string, string | number>>;
  policies: Array<Record<string, string | number>>;
  groundTruth: GroundTruth;
};
