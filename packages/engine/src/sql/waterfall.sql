-- Canonical waterfall projections (DuckDB). Authoritative v1 arithmetic is the TypeScript Decimal engine.
-- Same formulas as packages/engine/src/waterfall.ts.

CREATE VIEW IF NOT EXISTS line_economics AS
SELECT
  t.transaction_id,
  t.invoice_date,
  t.customer_id,
  t.sku,
  CAST(t.list_price_per_unit AS DECIMAL(18,4)) * CAST(t.quantity AS DECIMAL(18,4)) AS gross_list_value,
  CAST(t.invoice_revenue AS DECIMAL(18,4)) AS invoice_revenue,
  CAST(t.invoice_revenue AS DECIMAL(18,4))
    - CASE WHEN t.net_sales_includes_credit THEN 0 ELSE CAST(t.credit_amount AS DECIMAL(18,4)) END
    - CASE WHEN t.net_sales_includes_rebate THEN 0 ELSE CAST(t.customer_rebate AS DECIMAL(18,4)) END
    - CAST(t.commercial_allowance AS DECIMAL(18,4))
    - CASE WHEN t.net_sales_includes_freight THEN 0 ELSE GREATEST(0, CAST(t.freight_cost AS DECIMAL(18,4)) - CAST(t.freight_charged AS DECIMAL(18,4))) END
    AS pocket_revenue
FROM transactions t;
