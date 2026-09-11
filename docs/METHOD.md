# MarginShield Methodology

MarginShield implements an integrated Leakage Ledger framework:

- canonical transaction economics
- evidence classification
- leakage check library
- single-count tranche allocation
- evidence lineage
- bankability planning
- commercial risk guardrails
- action modelling
- outcome calibration
- repeated scan memory

## Value classes

Every finding belongs to exactly one value class: detected leakage, policy leakage, modelled margin opportunity, cash entitlement, opportunity, insight, overlay, or billing risk.

## Tranche allocation

Sell-side detectors overlap. For customer × SKU, priority is P1 > P2 > P3 > P4 > P5 > P6. Allocation uses a running maximum so overlapping gaps are counted once.

## Cross-family netting

- P1 vs S3: linked price-adjustment credits reduce realised line price before P1.
- Outbound freight included in pocket revenue must not double-count as sell-price gap.
- Supplier rebates in true landed cost may still generate B1 when earned vs claimed differs.
