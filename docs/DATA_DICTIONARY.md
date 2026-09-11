# MarginShield Data Dictionary

Canonical tables and field definitions per `BLUEPRINT.md` §59–61.

| Table | Purpose |
|---|---|
| customers | Customer master |
| skus | Product master |
| suppliers | Supplier master |
| transactions | Sales line transactions |
| supplier_costs | Landed/direct cost by SKU and date |
| customer_agreements | Contractual pricing terms |
| supplier_rebates | Rebate schedules |
| purchases | Purchase history for rebate eligibility |
| freight | Freight cost/charge data |
| commercial_policies | Internal commercial policies |
| findings | Analysis findings |
| finding_evidence | Generic evidence references |
| actions | Recovery plan actions |
| outcomes | Outcome memory records |

Money fields use `DECIMAL(18,4)`. Rate fields use `DECIMAL(12,8)`.
