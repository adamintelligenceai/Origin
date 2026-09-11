-- MarginShield DuckDB projections (large-file mode).
-- Authoritative money arithmetic for v1 lives in the TypeScript Decimal engine.
-- These views are the intended SQL shape when DuckDB-Wasm loads canonical tables.

CREATE VIEW IF NOT EXISTS line_economics AS
SELECT
  t.transaction_id,
  t.invoice_no,
  t.invoice_date,
  t.customer_id,
  t.sku,
  CAST(t.quantity AS DECIMAL(28,4)) AS quantity,
  CAST(t.invoice_revenue AS DECIMAL(28,4)) AS invoice_revenue,
  CAST(t.invoice_unit_price AS DECIMAL(28,4)) AS invoice_unit_price,
  CAST(COALESCE(c.true_landed_cost, t.erp_cost) AS DECIMAL(28,4)) AS landed_cost_per_unit
FROM transactions t
LEFT JOIN supplier_costs c
  ON c.sku = t.sku
 AND c.effective_from <= t.invoice_date
 AND (c.effective_to IS NULL OR c.effective_to >= t.invoice_date);

CREATE VIEW IF NOT EXISTS t12m_sales AS
SELECT
  SUM(invoice_revenue) AS t12m_net_sales
FROM line_economics
WHERE invoice_date > DATE_ADD(analysis_period_end, INTERVAL -12 MONTH)
  AND invoice_date <= analysis_period_end;
