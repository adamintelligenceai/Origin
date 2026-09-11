# Data dictionary

Money columns are `DECIMAL(18,4)`. Rates are `DECIMAL(12,8)`. Canonical currency is carried as `amount` + `currency`. Authoritative arithmetic uses the engine Decimal type (4 d.p. money, 8 d.p. rates).

## customers

| Field | Type | Notes |
| --- | --- | --- |
| customer_id | text | Stable synthetic or mapped identifier |
| name | text | Never sent to AI or server in v1 |
| segment | text | Peer cohort key |
| region | text | Branch/region grouping |
| branch_id | text | |
| sales_rep_id | text | Tokenised as R-nn for AI |
| opened_on | date | Tenure |
| currency | text | ISO code |

## skus

| Field | Type | Notes |
| --- | --- | --- |
| sku | text | Never sent to AI unless strictly required |
| description | text | Local only |
| product_group | text | Preferred AI identifier |
| supplier_id | text | |
| standard_price | decimal | Segment standard where known |

## transactions

Line-level realised sales. Source file, sheet and row are retained for evidence.

Key economic fields: `quantity`, `list_price_per_unit`, `invoice_unit_price`, `invoice_revenue`, `discount_amount`, `promotional_discount`, `credit_amount`, `freight_charged`, `freight_cost`, `erp_cost`, `pocket_revenue`, `landed_cost_per_unit`.

Flags: `net_sales_includes_discount`, `net_sales_includes_credit`, `net_sales_includes_freight`, `net_sales_includes_rebate`.

## supplier_costs

SKU + effective date cost waterfall components, ending in `true_landed_cost`.

## customer_agreements

`valid_from`, `valid_to`, `price_basis` (`INVOICE` \| `POCKET`), price or discount, grain (SKU, product group, or customer-level).

## supplier_rebates

`rebate_type`: `FLAT`, `RETROSPECTIVE_TIER`, `INCREMENTAL_TIER`, `GROWTH`, `CLAIM_BACK`. Claim window dates. Earned vs claimed vs received.

## freight

Invoice or consignment-level outbound freight cost and charge.

## commercial_policies

Freight, minimum-order, restocking, margin-floor policies with effective dates.

## findings

See blueprint §60. `finding_id` is `MSF-` plus the first 24 hex characters of `sha256(check_id \| grain_keys \| period_end \| engine_major_version)`.

## finding_evidence

Generic evidence rows: `TRANSACTION`, `AGREEMENT`, `COST`, `FREIGHT`, `REBATE`, `PURCHASE`, `POLICY`, `CALCULATION`.
