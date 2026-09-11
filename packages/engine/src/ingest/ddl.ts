/** Canonical DuckDB / in-memory DDL for MarginShield local projects. */
export const CANONICAL_DDL = `
CREATE TABLE IF NOT EXISTS customers (
  customer_id VARCHAR PRIMARY KEY,
  customer_name VARCHAR,
  branch_id VARCHAR,
  sector VARCHAR,
  rep_id VARCHAR
);

CREATE TABLE IF NOT EXISTS skus (
  sku VARCHAR PRIMARY KEY,
  sku_name VARCHAR,
  product_group VARCHAR,
  list_price DECIMAL(18,4),
  standard_cost DECIMAL(18,4),
  supplier_id VARCHAR,
  margin_floor_pct DECIMAL(12,8)
);

CREATE TABLE IF NOT EXISTS suppliers (
  supplier_id VARCHAR PRIMARY KEY,
  supplier_name VARCHAR,
  rebate_rate_pct DECIMAL(12,8)
);

CREATE TABLE IF NOT EXISTS sales_lines (
  invoice_no VARCHAR,
  invoice_date DATE,
  customer_id VARCHAR,
  customer_name VARCHAR,
  sku VARCHAR,
  sku_name VARCHAR,
  product_group VARCHAR,
  branch_id VARCHAR,
  rep_id VARCHAR,
  qty DECIMAL(18,4),
  list_price DECIMAL(18,4),
  unit_price DECIMAL(18,4),
  line_sales DECIMAL(18,4),
  unit_cost DECIMAL(18,4),
  line_cogs DECIMAL(18,4),
  currency VARCHAR,
  source_file VARCHAR,
  source_row INTEGER
);

CREATE TABLE IF NOT EXISTS customer_agreements (
  agreement_id VARCHAR PRIMARY KEY,
  customer_id VARCHAR,
  sku VARCHAR,
  valid_from DATE,
  valid_to DATE,
  agreed_price DECIMAL(18,4),
  status VARCHAR
);

CREATE TABLE IF NOT EXISTS freight (
  freight_id VARCHAR PRIMARY KEY,
  invoice_no VARCHAR,
  customer_id VARCHAR,
  freight_cost DECIMAL(18,4),
  freight_charged DECIMAL(18,4),
  policy_code VARCHAR
);

CREATE TABLE IF NOT EXISTS supplier_rebates (
  rebate_id VARCHAR PRIMARY KEY,
  supplier_id VARCHAR,
  period_start DATE,
  period_end DATE,
  earned_aud DECIMAL(18,4),
  claimed_aud DECIMAL(18,4),
  claimable_now_aud DECIMAL(18,4)
);

CREATE TABLE IF NOT EXISTS commercial_policies (
  policy_id VARCHAR PRIMARY KEY,
  policy_code VARCHAR,
  policy_name VARCHAR,
  threshold_aud DECIMAL(18,4),
  rate_pct DECIMAL(12,8),
  active VARCHAR
);

CREATE TABLE IF NOT EXISTS purchases (
  purchase_id VARCHAR PRIMARY KEY,
  supplier_id VARCHAR,
  sku VARCHAR,
  qty DECIMAL(18,4),
  unit_cost DECIMAL(18,4),
  purchase_date DATE
);

CREATE TABLE IF NOT EXISTS supplier_costs (
  cost_id VARCHAR PRIMARY KEY,
  sku VARCHAR,
  effective_from DATE,
  landed_cost DECIMAL(18,4),
  prior_landed_cost DECIMAL(18,4)
);

CREATE TABLE IF NOT EXISTS findings (
  finding_id VARCHAR PRIMARY KEY,
  run_hash VARCHAR,
  check_id VARCHAR,
  family VARCHAR,
  value_class VARCHAR,
  basis_class VARCHAR,
  status VARCHAR,
  customer_id VARCHAR,
  sku VARCHAR,
  supplier_id VARCHAR,
  raw_gap DECIMAL(18,4),
  allocated_value DECIMAL(18,4),
  evidence_grade VARCHAR,
  bankable_low DECIMAL(18,4),
  bankable_base DECIMAL(18,4),
  bankable_high DECIMAL(18,4),
  cash_claimable DECIMAL(18,4),
  root_cause VARCHAR,
  method_version VARCHAR
);
`.trim();

export const TABLE_NAMES = [
  'customers',
  'skus',
  'suppliers',
  'sales_lines',
  'customer_agreements',
  'freight',
  'supplier_rebates',
  'commercial_policies',
  'purchases',
  'supplier_costs',
  'findings',
] as const;

export type CanonicalTable = (typeof TABLE_NAMES)[number];
