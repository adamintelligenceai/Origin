# Data dictionary

Money is `DECIMAL(18,4)`. Rates are `DECIMAL(12,8)`. Authoritative arithmetic is DuckDB DECIMAL, not JavaScript floats.

## Canonical tables

| Table               | Grain                           | Purpose                          |
| ------------------- | ------------------------------- | -------------------------------- |
| customers           | customer_id                     | Customer master                  |
| skus                | sku                             | Product master                   |
| suppliers           | supplier_id                     | Supplier master                  |
| transactions        | invoice/line                    | Realised sales lines             |
| supplier_costs      | sku × effective date            | Landed/direct cost               |
| customer_agreements | customer × sku/group × validity | Documented prices/discounts      |
| supplier_rebates    | supplier × program × period     | Rebate schemas and claims        |
| purchases           | purchase line                   | Eligible rebate base             |
| freight             | invoice or allocation           | Outbound/inbound freight         |
| commercial_policies | policy_id                       | Freight, MOS, restocking, floors |
| findings            | finding_id                      | Classified economic findings     |
| finding_evidence    | finding_id × evidence row       | Generic evidence ledger          |
| actions             | action_id                       | Recovery-plan items              |
| outcomes            | outcome_id                      | MarginShield Outcome Memory      |

## Findings fields

`finding_id`, `run_hash`, `check_id`, `family`, `value_class`, `basis_class`, `status`, `customer_id`, `sku`, `product_group`, `supplier_id`, `invoice_no`, `raw_gap`, `allocated_value`, `evidence_grade`, capture low/base/high, `risk_band`, bankable low/base/high, `cash_claimable`, `root_cause`, `facts_json`, `method_version`.

## Evidence kinds

TRANSACTION, AGREEMENT, COST, FREIGHT, REBATE, PURCHASE, POLICY, CALCULATION.

## Net-sales semantic flags

`net_sales_includes_discount`, `net_sales_includes_credit`, `net_sales_includes_freight`, `net_sales_includes_rebate`.
