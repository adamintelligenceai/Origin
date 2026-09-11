# MarginShield method

This document is the product methodology. `docs/BLUEPRINT.md` remains the authoritative specification. If they conflict, follow the blueprint and record the decision in `docs/DECISIONS.md`.

MarginShield does **not** treat every theoretical pricing gap as leakage. Findings are classified before they are valued.

## Value classes

| Class                       | Meaning                                                                                                                                                                        | Headline treatment                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Detected leakage            | Documentary or client-approved policy basis that realised economics differed from what should have occurred. Becomes verified leakage only after a human validates the inputs. | Included in detected leakage                           |
| Policy leakage              | An approved internal commercial policy was not followed. Not necessarily legally recoverable.                                                                                  | Included with detected leakage in the leakage headline |
| Modelled margin opportunity | Economically plausible improvement without a contractual entitlement                                                                                                           | Included in modelled opportunity only                  |
| Cash entitlement            | Documented amount presently claimable inside a valid window                                                                                                                    | Cash claimable now                                     |
| Opportunity                 | Future commercial upside (for example next rebate tier)                                                                                                                        | Not added to leakage                                   |
| Insight                     | Explains economics                                                                                                                                                             | No dollar value in headlines                           |
| Overlay                     | Severity/context on another finding                                                                                                                                            | No separate value                                      |
| Billing risk                | Company may have charged more than an agreement supports                                                                                                                       | Never netted away                                      |

## Waterfalls

### Price waterfall

Gross list value − on-invoice discount − promotional discount = invoice revenue.

Invoice revenue − linked price-adjustment credits − customer retrospective rebates − commercial allowances − unrecovered outbound freight where economically attributable = pocket revenue.

Do not subtract a deduction twice. Mapping must record whether source `net_sales` already includes discount, credit, freight or rebate.

### Cost waterfall

Supplier list cost − on-invoice supplier discount = supplier net cost.

Supplier net cost − evidenced earned supplier rebate per unit + inbound freight allocation + duty + import charges ± attributable FX = true landed cost.

Never subtract a theoretical rebate that has not been demonstrated as earned.

### Contribution

- Front-end contribution: invoice revenue − ERP/direct cost
- Pocket contribution: pocket revenue − true landed cost
- Economic contribution: pocket contribution minus attributable outbound freight, variable pick/pack, sales commission, payment processing and directly attributable service expense

Do not allocate corporate overhead in v1. Do not call economic contribution “gross margin”.

## Coverage and evidence

Economic coverage measures available input completeness, not model confidence. Default component weights live in `@marginshield/schemas` method configuration.

Evidence Grade is not an AI confidence percentage:

- A documentary — planning weight 1.00
- B calculated — 0.85
- C modelled — 0.60

Basis class is separate: contractual, external term, internal policy, historical, derived, peer benchmark, modelled.

## Checks

Sell: P1 active agreement variance, P2 expired agreement pricing, P3 cost pass-through gap, P4 below-floor pricing, P5 discount creep, P6 peer price dispersion, P7 negative contribution (overlay).

Serve: S1 freight under-recovery, S2 small-order drain, S3 credits/returns.

Buy: B1 supplier rebate under-claim, B2 rebate tier near-miss, B3 margin illusion.

Sell-side overlapping gaps use running-maximum tranche allocation with priority `P1 > P2 > P3 > P4 > P5 > P6` so `sum(allocated) = max(gaps)`.

## Bankability

Bankable scenario value = allocated value × capture factor × evidence weight × risk modifier.

LOW / BASE / HIGH factors are planning assumptions, not statistical probabilities. Capture factors, risk multipliers and floors are client-editable.

## Identity

Finding IDs are `MSF-` plus the first 24 hex characters of `sha256(check_id | grain_keys | period_end | engine_major_version)`.

Run hashes are canonical ordered hashes of source-file SHA-256 hashes, mapping profile, method configuration, engine version, analysis period and currency configuration. No timestamp.
