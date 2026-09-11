# MarginShield Method

MarginShield reconstructs distributor transaction economics and classifies findings into:

- **Detected leakage** — documentary or policy-supported variance
- **Policy leakage** — approved internal policy not followed
- **Modelled margin opportunity** — economically plausible improvement without contractual entitlement
- **Cash entitlement** — claimable within a valid window
- **Billing risk** — charged above agreement (never netted away)

Sell-side overlapping gaps use single-count tranche allocation with priority P1>P2>P3>P4>P5>P6 so `sum(allocated) = max(gaps)`.

Bankability is scenario planning (LOW/BASE/HIGH), not statistical probability.

See `docs/BLUEPRINT.md` for the full specification.
