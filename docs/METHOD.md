# MarginShield Leakage Ledger method

This document is the product methodology. Established pricing concepts (list price, invoice price, pocket price, price waterfalls) are not claimed as MarginShield inventions. What is proprietary is the integrated system of canonical transaction economics, evidence classification, the leakage check library, single-count tranche allocation, evidence lineage, bankability planning, commercial risk guardrails, action modelling, outcome calibration and repeated scan memory.

Engine version: see `ENGINE_VERSION` in `@marginshield/engine`.

## Economic waterfalls

### Price waterfall (per transaction line)

```
Gross list value
− on-invoice discount
− promotional discount
= invoice revenue

Invoice revenue
− linked price adjustment credits
− customer retrospective rebates
− commercial allowances
− unrecovered outbound freight where economically attributable
= pocket revenue
```

A deduction is never subtracted twice. Canonical flags record whether source `net_sales` already includes discount, credit, freight or rebate. Mapping must resolve those flags before a scan runs.

### Cost waterfall (per SKU and effective date)

```
Supplier list cost
− on-invoice supplier discount
= supplier net cost

Supplier net cost
− evidenced earned supplier rebate per unit
+ inbound freight allocation
+ duty
+ import charges
+/− attributable FX adjustment
= true landed cost
```

Theoretical unearned rebates are not subtracted. If the rebate field is absent, `rebate_component_status = unavailable` and economic coverage falls.

### Contribution hierarchy

- **Front-end contribution** = invoice revenue − ERP/direct cost
- **Pocket contribution** = pocket revenue − true landed cost
- **Economic contribution** = pocket contribution − attributable outbound freight − variable pick/pack − sales commission − payment processing − directly attributable service expense

Corporate overhead is not allocated in v1. Economic contribution is not labelled “gross margin”.

## Value classes

Every finding belongs to exactly one of: `DETECTED_LEAKAGE`, `POLICY_LEAKAGE`, `MODELLED_MARGIN_OPPORTUNITY`, `CASH_ENTITLEMENT`, `OPPORTUNITY`, `INSIGHT`, `OVERLAY`, `BILLING_RISK`.

Detected leakage never auto-promotes to verified. Billing risk is never netted against leakage in a way that hides it.

## Single-count tranche allocation

Sell-side detectors overlap. For each customer × SKU, priority is `P1 > P2 > P3 > P4 > P5 > P6`. Allocation uses an explicit running maximum:

```
running_max = 0
for detector in priority:
    allocated = max(0, gap_detector − running_max)
    running_max = max(running_max, gap_detector)
```

`sum(allocated) = max(all detector gaps)`. The highest-priority detector with positive allocated value is the primary root cause.

## Cross-family netting

### P1 vs S3

Linked price-adjustment credits reduce realised line price before P1. An already-issued corrective credit cannot also appear as unresolved P1 leakage.

### Freight

Outbound freight included in pocket revenue is not simultaneously counted as a sell-price gap unless the check is intentionally modelling a pricing gap independent of freight.

### Supplier rebate

Only earned and expected rebate reduces true landed cost. The unclaimed amount remains a B1 cash entitlement (when inside the claim window) and is not double-counted as a sell-side opportunity.

## Bankability

Bankability is scenario planning, not a statistical probability:

```
bankable_scenario(f) =
  allocated_value
  × capture_factor[check][scenario]
  × evidence_weight[grade]
  × risk_modifier
```

Scenarios are LOW, BASE and HIGH. Factors are client-editable. UI copy: “Initial MarginShield assumption. Confirm with management.”

## Margin Integrity Index

```
weighted_exposure = verified_or_detected_leakage + 0.50 × modelled_margin_opportunity
exposure_rate = weighted_exposure / T12M_net_sales
MII = round(clamp(100 − 1000 × exposure_rate, 0, 100))
```

The index compares this organisation with itself over time. It is not an industry benchmark. If economic coverage falls more than 5 percentage points versus the previous scan, a comparability warning is shown. MII must not increase merely because data disappeared.

## Checks

See `docs/BLUEPRINT.md` §§30–32 for detector specifications. Classification by check is in §17.

## Materiality

Global default A$250 annualised, plus optional percentage-of-sales and minimum transaction-count gates. Materiality is printed on every report.

## Outcome calibration

Until a large outcome sample exists, calibrated capture uses shrinkage toward the prior:

```
calibrated_factor = (n × observed_mean + k × prior_factor) / (n + k)
```

Default `k = 10`. Sample size is always displayed.
