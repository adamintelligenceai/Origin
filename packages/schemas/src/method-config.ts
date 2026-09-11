export const ENGINE_MAJOR_VERSION = 1;
export const ENGINE_VERSION = "1.0.0";
export const METHOD_VERSION = "1.0.0";

export const COVERAGE_WEIGHTS = {
  realised_sales: 20,
  supplier_direct_cost: 25,
  customer_discounts_credits: 10,
  supplier_adjustments_rebates: 10,
  inbound_freight: 10,
  outbound_freight: 10,
  agreement_data: 10,
  variable_cost_to_serve: 5,
} as const;

export const EVIDENCE_PLANNING_WEIGHTS = {
  A: 1.0,
  B: 0.85,
  C: 0.6,
} as const;

export const DEFAULT_CAPTURE_FACTORS = {
  B1: { LOW: 0.56, BASE: 0.8, HIGH: 1.0 },
  B2: { LOW: 0, BASE: 0, HIGH: 0 },
  B3: { LOW: 0, BASE: 0, HIGH: 0 },
  S1: { LOW: 0.35, BASE: 0.5, HIGH: 0.65 },
  S2: { LOW: 0.21, BASE: 0.3, HIGH: 0.39 },
  S3: { LOW: 0.21, BASE: 0.3, HIGH: 0.39 },
  P1: { LOW: 0.525, BASE: 0.75, HIGH: 0.975 },
  P2: { LOW: 0.42, BASE: 0.6, HIGH: 0.78 },
  P3: { LOW: 0.25, BASE: 0.45, HIGH: 0.65 },
  P4: { LOW: 0.28, BASE: 0.4, HIGH: 0.52 },
  P5: { LOW: 0.245, BASE: 0.35, HIGH: 0.455 },
  P6: { LOW: 0.175, BASE: 0.25, HIGH: 0.325 },
  P7: { LOW: 0, BASE: 0, HIGH: 0 },
} as const;

export const COMMERCIAL_RISK_WEIGHTS = {
  revenue_concentration: 0.25,
  existing_price_position: 0.25,
  recency_of_last_increase: 0.2,
  volume_trajectory: 0.15,
  purchase_breadth: 0.1,
  tenure: 0.05,
} as const;

export const COMMERCIAL_RISK_MULTIPLIERS = {
  LOW: 1.0,
  MEDIUM: 0.8,
  HIGH: 0.6,
} as const;

export const PRICE_INCREASE_GUARDRAILS = {
  LOW: 0.1,
  MEDIUM: 0.06,
  HIGH: 0.03,
} as const;

export const DEFAULT_MATERIALITY_AUD = 250;
export const DEFAULT_P1_TOLERANCE = 0.005;
export const DEFAULT_P3_COST_CHANGE = 0.02;
export const DEFAULT_P3_PASS_THROUGH_GAP = 0.03;
export const DEFAULT_P6_MIN_PEERS = 8;
export const DEFAULT_P6_MATERIALITY_PCT = 0.05;
export const DEFAULT_P6_ANNUAL_GAP_AUD = 500;
export const DUPLICATE_RATE_GATE = 0.005;
export const COST_MATCH_GATE = 0.9;
export const COVERAGE_COMPARABILITY_WARNING_POINTS = 5;
export const OUTCOME_SHRINKAGE_K = 10;
export const ANALYSIS_WORKER_TRADE_SPACING_MS = 0;

export interface NetSalesSemantics {
  net_sales_includes_discount: boolean | null;
  net_sales_includes_credit: boolean | null;
  net_sales_includes_freight: boolean | null;
  net_sales_includes_rebate: boolean | null;
}
