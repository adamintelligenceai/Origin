# Method

MarginShield combines established transaction-economics concepts (list → invoice → pocket price waterfalls) with its proprietary **Leakage Ledger** methodology: evidence classification, check library, single-count tranche allocation, evidence lineage, bankability planning, commercial risk guardrails, action modelling, and outcome calibration.

MarginShield does **not** invent the pocket-price waterfall. It does develop the integrated classification and evidence system described in `docs/BLUEPRINT.md` §§5–35.

## Value classes

| Class | Meaning |
|---|---|
| DETECTED_LEAKAGE | Documentary or client-approved policy basis |
| POLICY_LEAKAGE | Approved internal policy not followed |
| MODELLED_MARGIN_OPPORTUNITY | Plausible improvement; no contractual entitlement |
| CASH_ENTITLEMENT | Documented amount claimable within window |
| OPPORTUNITY | Future upside (e.g. rebate tier) |
| INSIGHT | Explains economics; no headline dollars |
| OVERLAY | Severity/context on another finding |
| BILLING_RISK | May have charged more than agreement supports |

## Engine order

1. Input validation → 2. Source hashing → 3. Normalisation → 4. Duplicate analysis → 5. Tie-out → 6. Economic waterfall → 7. Baseline aggregation → 8. Checks → 9. Tranche allocation → 10. Risk → 11. Bankability → 12. Recommendations → 13. MII → 14. Reports payload → 15. Run hash

## Money arithmetic

Authoritative money uses DuckDB `DECIMAL(18,4)`. Rates use `DECIMAL(12,8)`. JavaScript floating-point is never authoritative.
