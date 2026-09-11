# Data Dictionary

Canonical tables (authoritative money: `DECIMAL(18,4)`, rates: `DECIMAL(12,8)`):

| Table | Purpose |
|---|---|
| customers | Customer master |
| skus | Product / SKU master |
| suppliers | Supplier master |
| transactions | Sales transaction lines |
| supplier_costs | Landed / supplier cost history |
| customer_agreements | Customer price agreements |
| supplier_rebates | Rebate schemas and claims |
| purchases | Purchase lines for rebate base |
| freight | Outbound freight costs / charges |
| commercial_policies | Freight, MOQ, restocking, floors |
| findings | Engine findings |
| finding_evidence | Generic evidence ledger |
| actions | Recovery plan actions |
| outcomes | Outcome memory |

Finding fields are defined in BLUEPRINT §60. Evidence kinds: TRANSACTION, AGREEMENT, COST, FREIGHT, REBATE, PURCHASE, POLICY, CALCULATION.
