import type {
  BasisClass,
  CheckId,
  EvidenceGrade,
  EvidenceKind,
  Family,
  FindingStatus,
  PriceBasis,
  RebateType,
  RiskBand,
  ValueClass,
} from '@marginshield/schemas';
import type { Dec } from './money';

export type {
  BasisClass,
  CheckId,
  EvidenceGrade,
  EvidenceKind,
  Family,
  FindingStatus,
  PriceBasis,
  RebateType,
  RiskBand,
  ValueClass,
};

export interface Customer {
  customer_id: string;
  name: string;
  segment: string;
  region: string;
  branch_id: string;
  sales_rep_id: string;
  opened_on: string;
  currency: string;
}

export interface Sku {
  sku: string;
  description: string;
  product_group: string;
  supplier_id: string;
  standard_price?: string;
}

export interface Supplier {
  supplier_id: string;
  name: string;
}

export interface Transaction {
  transaction_id: string;
  invoice_no: string;
  invoice_date: string;
  customer_id: string;
  sku: string;
  product_group: string;
  supplier_id: string;
  branch_id: string;
  sales_rep_id: string;
  quantity: string;
  list_price_per_unit?: string;
  invoice_unit_price: string;
  invoice_revenue: string;
  discount_amount: string;
  promotional_discount: string;
  credit_amount: string;
  freight_charged: string;
  freight_cost: string;
  erp_cost: string;
  customer_rebate: string;
  commercial_allowance: string;
  pick_pack: string;
  commission: string;
  payment_processing: string;
  service_expense: string;
  net_sales_includes_discount: boolean;
  net_sales_includes_credit: boolean;
  net_sales_includes_freight: boolean;
  net_sales_includes_rebate: boolean;
  is_return: boolean;
  restocking_fee_charged: string;
  currency: string;
  source_file: string;
  source_sheet?: string;
  source_row: number;
}

export interface SupplierCost {
  sku: string;
  effective_from: string;
  effective_to?: string;
  supplier_list_cost: string;
  supplier_discount: string;
  earned_rebate_per_unit: string;
  inbound_freight: string;
  duty: string;
  import_charges: string;
  fx_adjustment: string;
  true_landed_cost: string;
  rebate_component_status: 'available' | 'unavailable';
  source_file: string;
  source_row: number;
}

export interface CustomerAgreement {
  agreement_id: string;
  customer_id: string;
  sku?: string;
  product_group?: string;
  valid_from: string;
  valid_to: string;
  price_basis: PriceBasis;
  unit_price?: string;
  discount_rate?: string;
  source_file: string;
  source_row: number;
}

export interface RebateTier {
  threshold: string;
  rate: string;
}

export interface SupplierRebate {
  rebate_id: string;
  supplier_id: string;
  rebate_type: RebateType;
  period_start: string;
  period_end: string;
  claim_window_end: string;
  rate?: string;
  tiers?: RebateTier[];
  eligible_base: string;
  earned: string;
  claimed: string;
  received_pending_match: string;
  source_file: string;
  source_row: number;
}

export interface Purchase {
  purchase_id: string;
  supplier_id: string;
  sku: string;
  purchase_date: string;
  amount: string;
  source_file: string;
  source_row: number;
}

export interface FreightRecord {
  freight_id: string;
  invoice_no?: string;
  customer_id?: string;
  freight_date: string;
  freight_cost: string;
  freight_charged: string;
  source_file: string;
  source_row: number;
}

export type PolicyKind = 'FREIGHT' | 'MINIMUM_ORDER' | 'RESTOCKING' | 'MARGIN_FLOOR';

export interface CommercialPolicy {
  policy_id: string;
  kind: PolicyKind;
  basis: 'CONTRACTUAL' | 'INTERNAL_POLICY';
  valid_from: string;
  valid_to?: string;
  min_order_value?: string;
  surcharge?: string;
  handling_cost_per_order?: string;
  handling_cost_per_line?: string;
  restocking_rate?: string;
  floor_margin?: string;
  freight_flat?: string;
  freight_free_above?: string;
  source_file: string;
  source_row: number;
}

export interface MappingProfile {
  files: Record<string, string>;
  confirmed_semantics: Record<string, string>;
}

export interface MethodConfig {
  materiality_absolute: number;
  materiality_pct_of_sales?: number;
  min_transaction_count: number;
  agreement_tolerance: number;
  p3_material_cost_increase: number;
  p3_pass_through_gap: number;
  p4_derived_percentile: number;
  p5_min_months: number;
  p5_trend_pp_per_month: number;
  p5_current_vs_baseline_pp: number;
  p6_min_peers: number;
  p6_flag_percentile: number;
  p6_target_percentile: number;
  p6_min_gap_pct: number;
  p6_min_annual_gap: number;
  b2_near_miss_pct: number;
  p1_back_billing_enabled: boolean;
  capture: Record<CheckId, { low: number; base: number; high: number }>;
  evidence_weight: Record<EvidenceGrade, number>;
  risk_multiplier: Record<RiskBand, number>;
  risk_weights: {
    concentration: number;
    price_position: number;
    recency: number;
    volume: number;
    breadth: number;
    tenure: number;
  };
  guardrail_increase: Record<RiskBand, number>;
  coverage_weights: Record<CoverageComponent, number>;
  shrinkage_k: number;
  annualisation_days: number;
}

export type CoverageComponent =
  | 'realised_sales'
  | 'supplier_direct_cost'
  | 'customer_discounts_credits'
  | 'supplier_adjustments_rebates'
  | 'inbound_freight'
  | 'outbound_freight'
  | 'agreement_data'
  | 'variable_cost_to_serve';

export interface CanonicalDataset {
  customers: Customer[];
  skus: Sku[];
  suppliers: Supplier[];
  transactions: Transaction[];
  supplier_costs: SupplierCost[];
  customer_agreements: CustomerAgreement[];
  supplier_rebates: SupplierRebate[];
  purchases: Purchase[];
  freight: FreightRecord[];
  commercial_policies: CommercialPolicy[];
  analysis_period: { start: string; end: string };
  reporting_currency: string;
  mapping_profile: MappingProfile;
  method_config: MethodConfig;
  source_file_hashes: Record<string, string>;
  sales_tieout_confirmed: boolean;
  cost_tieout_confirmed: boolean;
  known_sales_total?: string;
  previous_coverage?: number;
}

export interface LineEconomics {
  transaction: Transaction;
  gross_list_value: Dec;
  invoice_revenue: Dec;
  pocket_revenue: Dec;
  front_end_contribution: Dec;
  pocket_contribution: Dec;
  economic_contribution: Dec;
  landed_cost_per_unit: Dec;
  landed_cost_total: Dec;
  in_t12m: boolean;
}

export interface FindingDraft {
  check_id: CheckId;
  family: Family;
  value_class: ValueClass;
  basis_class: BasisClass;
  evidence_grade: EvidenceGrade;
  customer_id?: string;
  sku?: string;
  product_group?: string;
  supplier_id?: string;
  invoice_no?: string;
  grain_key: string;
  raw_gap: Dec;
  title: string;
  facts: Record<string, unknown>;
  evidence: Omit<EvidenceRow, 'finding_id'>[];
  cash_claimable?: Dec;
  not_assessed?: boolean;
}

export interface EvidenceRow {
  finding_id: string;
  evidence_kind: EvidenceKind;
  source_file?: string;
  source_sheet?: string;
  source_row?: number;
  record_id?: string;
  field?: string;
  value_display: string;
  role: string;
}

export interface CoverageResult {
  score: number;
  components: Record<CoverageComponent, { weight: number; available: number; contribution: number }>;
  missing: string[];
}

export interface Headlines {
  detected_leakage: string;
  modelled_opportunity: string;
  addressable_margin: string;
  bankable_low: string;
  bankable_base: string;
  bankable_high: string;
  cash_claimable: string;
  billing_risk: string;
  t12m_net_sales: string;
  mii: number;
  coverage: number;
  comparability_warning: boolean;
}

export interface ScanResult {
  run_hash: string;
  engine_version: string;
  method_version: string;
  period: { start: string; end: string; t12m_start: string; t12m_end: string };
  reporting_currency: string;
  headlines: Headlines;
  coverage: CoverageResult;
  findings: import('@marginshield/schemas').Finding[];
  evidence: EvidenceRow[];
  waterfall: {
    gross_list_value: string;
    invoice_revenue: string;
    pocket_revenue: string;
    true_landed_cost: string;
    pocket_contribution: string;
    economic_contribution: string;
  };
  customers: CustomerSnapshot[];
  sales_tieout_confirmed: boolean;
  limited_history: boolean;
  duplicates: DuplicateGroup[];
}

export interface CustomerSnapshot {
  customer_id: string;
  name: string;
  revenue: string;
  pocket_contribution: string;
  detected_leakage: string;
  modelled_opportunity: string;
  risk_band: RiskBand;
  risk_score: number;
}

export interface DuplicateGroup {
  key: string;
  count: number;
  transaction_ids: string[];
  ambiguous: boolean;
}

export interface ActionRecommendation {
  finding_id: string;
  current_price: string;
  restore_price: string;
  guarded_price: string;
  conservative_price: string;
  static_volume_upside: string;
  break_even_volume_retention: number;
  maximum_volume_decline: number;
  exceeds_guardrail: boolean;
}
