# MARGINSHIELD BY EVIDENCE ROOM

## Ultimate End-to-End Product, Methodology, Architecture, Cybersecurity, UX, Website, Dashboard, Testing and Cursor Execution Blueprint

**Version:** 2.0  
**Build target:** Cursor Agent  
**Primary product brand:** MarginShield  
**Parent brand:** Evidence Room  
**Customer-facing lockup:** MarginShield  
**Secondary attribution:** by Evidence Room  
**Single source of truth:** `docs/BLUEPRINT.md`

---

# 0. MASTER EXECUTION COMMAND FOR CURSOR

You are not being asked to create a prototype, wireframe, mock-up or design concept.

You are acting simultaneously as:

- principal software architect
- staff frontend engineer
- staff data engineer
- commercial pricing analyst
- management accountant
- distributor economics specialist
- product designer
- cybersecurity engineer
- QA engineer
- accessibility engineer
- enterprise SaaS product manager
- conversion-focused website designer

Your assignment is to build a **complete, working, locally runnable and deployable MarginShield product** according to this document.

Read this entire blueprint before writing code.

`docs/BLUEPRINT.md` is authoritative.

When another instruction conflicts with it:

1. follow the blueprint;
2. record the conflict in `docs/DECISIONS.md`;
3. do not silently reinterpret the requirement.

You must implement the product sequentially using the phases in §30.

Do not generate all files superficially in one pass.

For every phase:

1. inspect the existing repository;
2. implement the phase;
3. run the code;
4. run tests;
5. inspect important UI visually;
6. repair failures;
7. update documentation;
8. commit the working phase;
9. continue only when acceptance criteria are satisfied.

Do not ask the user to manually write code that you can create.

Do not leave core MVP functionality as TODOs.

Do not fake product functionality for visual effect.

Do not hard-code dashboard figures.

Do not invent customer data.

Do not invent testimonials.

Do not invent ROI.

Do not invent security certifications.

Do not call roadmap functionality live.

The marketing website, demo and authenticated application must all use the **same deterministic MarginShield calculation engine**.

The finished system must genuinely support:

**UPLOAD → MAP → RECONCILE → CALCULATE → DETECT → EVIDENCE → MODEL → PRIORITISE → ACT → REPORT**

---

# 1. BRAND ARCHITECTURE

## 1.1 Primary brand

# MarginShield

The wordmark and primary customer-facing masthead should normally show only:

**MarginShield**

## 1.2 Parent attribution

Use subtle attribution where appropriate:

**by Evidence Room**

Suitable locations:

- sign-in screen
- About page
- report footer
- Terms
- Privacy
- website footer
- metadata
- loading screen

Do not put “by Evidence Room” beside every MarginShield reference.

MarginShield must feel like a serious standalone commercial product.

## 1.3 Forbidden brand references

Do not include:

- Adam Intelligence
- AI in the brand name
- legacy Evidence Room finance-platform branding
- references to prior product versions

Search the completed repository before release and assert that no prohibited references remain.

## 1.4 Category

# Commercial Margin Control

Supporting category language:

**Margin intelligence for distributors**

## 1.5 Hero promise

# Protect every point of margin.

Alternative explanatory headline:

# Find where margin is leaking. Prove why. Decide what to do next.

## 1.6 One-line product definition

**MarginShield reconstructs transaction-level economics across a distributor's customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.**

---

# 2. PRODUCT PRINCIPLE

ERP systems primarily answer:

# WHAT WAS TRANSACTED?

BI systems answer:

# WHAT CHANGED?

Pricing applications increasingly answer:

# WHAT PRICE SHOULD WE SET?

MarginShield initially answers:

# WHERE ARE OUR COMMERCIAL ECONOMICS BREAKING DOWN, WHY, AND WHAT IS WORTH REVIEWING?

The first customer should not need:

- ERP implementation
- API integration
- data warehouse project
- pricing transformation
- six-month implementation

Initial value begins with files.

---

# 3. BUYER AND ICP

Primary buyers:

- CFO
- Financial Controller
- Head of Commercial Finance
- Commercial Director
- Pricing Director
- Finance Director
- CEO of a mid-market distributor

Initial company profile:

- approximately A$20m–A$500m revenue
- transaction-heavy distribution
- substantial customer-specific pricing
- supplier cost movements
- price files and spreadsheets
- multiple sales representatives
- many SKUs
- margin pressure
- imperfect pricing governance

Initial sectors:

- HVAC
- electrical
- plumbing
- industrial supplies
- fasteners
- safety products
- MRO
- building products
- trade distribution

Excluded verticals should live in configuration rather than being embedded into product code.

---

# 4. COMMERCIAL OFFER

All values must live in:

`apps/web/config/commercial.ts`

Never hard-code them inside components.

Initial hypothesis:

### Margin Leakage Scan

Default:

**A$9,500**

Includes:

- one diagnostic scan
- methodology review
- board pack
- action workbook
- evidence ledger
- review meeting

### Founding Client Scan

Default:

**A$4,950**

Limited founding-client offer.

Case-study permission must be separately consented.

Never require a named case study as a hidden condition.

### Margin Monitor

Default:

**A$1,950/month**

Includes:

- refreshed scan
- prior-period comparison
- resolved/new finding tracking
- recovery-plan monitoring
- trend reporting

These are pricing hypotheses.

The application must make prices configurable without code changes.

---

# 5. THE CRITICAL METHODOLOGY CORRECTION

The product must **not** describe every theoretical pricing gap as “leakage”.

That would materially undermine credibility.

MarginShield therefore separates economic findings into evidence classes.

## 5.1 Value classes

Every finding belongs to exactly one:

### DETECTED LEAKAGE

There is a clear documentary or client-approved policy basis indicating that the realised economics differed from what should have occurred.

Examples:

- invoiced below an active agreement price
- contractually chargeable freight not recovered
- documented rebate earned but not claimed

Before human review call it:

**Detected leakage**

After the user validates the underlying inputs/evidence it may become:

**Verified leakage**

Never automatically change detected to verified.

### POLICY LEAKAGE

An approved internal commercial policy exists but was not followed.

Examples:

- minimum-order surcharge policy
- freight policy
- restocking policy
- approved margin floor

Policy leakage is not necessarily legally recoverable from a customer.

### MODELLED MARGIN OPPORTUNITY

The system identifies an economically plausible commercial improvement, but no contractual entitlement exists.

Examples:

- supplier cost pass-through
- stale pricing
- peer-price dispersion
- discount creep
- below-derived-floor price
- expired contract price still being honoured

Never call these lost cash.

Never call them guaranteed savings.

### CASH ENTITLEMENT

A documented amount appears presently claimable or recoverable within an applicable claim window.

This feeds:

**Cash claimable now**

### OPPORTUNITY

Potential future commercial upside.

Example:

next supplier rebate tier.

Not added to leakage.

### INSIGHT

Explains commercial economics.

No dollar value is added to headline opportunity.

### OVERLAY

Adds severity/context to another finding.

No separate value.

### BILLING RISK

MarginShield detects that the company may have charged more than an agreement supports.

This must never be hidden simply because it is commercially inconvenient.

A credible tool identifies risk in both directions.

---

# 6. PRIMARY HEADLINE METRICS

The old single “Gross leakage” metric is replaced.

The Overview must clearly show:

## DETECTED LEAKAGE

Document or policy-supported variance.

Example synthetic display:

**A$796k**

After review:

**Verified leakage A$742k**

if some findings are rejected.

## MODELLED MARGIN OPPORTUNITY

Commercial optimisation opportunities without a contractual entitlement.

Example:

**A$1.04m**

## TOTAL ADDRESSABLE MARGIN

Detected leakage

+

Modelled margin opportunity

=

**A$1.84m**

Never imply that the full amount will be realised.

## EXPECTED BANKABLE THIS YEAR

Show as:

**A$780k base case**

and immediately underneath:

**Planning range A$520k–A$1.01m**

The number is an assumption-driven planning valuation.

It is not a statistically validated probability unless/until outcome history makes it one.

## CASH CLAIMABLE NOW

Example:

**A$124k**

Only documentary entitlement within valid recovery windows.

## MARGIN INTEGRITY INDEX

Secondary metric.

Never present it as an industry benchmark.

Label tooltip:

> MarginShield's internal trend index. Designed to compare this organisation with itself over time, not with external companies.

---

# 7. MARGINSHIELD LEAKAGE LEDGER METHOD

This methodology is a MarginShield implementation framework.

Important:

The concepts of list price, invoice price, pocket price and price waterfalls are established pricing concepts.

Do **not** claim MarginShield invented the pocket-price waterfall.

What MarginShield is developing as proprietary product methodology is the integrated system of:

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

Maintain methodology documentation in:

`docs/METHOD.md`

---

# 8. ECONOMIC WATERFALL

## 8.1 Gross list value

At transaction line:

`gross_list_value = list_price_per_unit × quantity`

Only where list price exists.

If list price is absent, do not manufacture one.

---

# 9. PRICE WATERFALL

Per transaction line:

```text
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

Do not subtract a deduction twice.

Source-field semantics must record whether source `net_sales` is already net of a particular adjustment.

Create canonical flags such as:

`net_sales_includes_discount`

`net_sales_includes_credit`

`net_sales_includes_freight`

`net_sales_includes_rebate`

Mapping wizard must resolve ambiguity.

---

# 10. COST WATERFALL

Per SKU and effective date:

```text
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

Never subtract a theoretical rebate that has not been demonstrated as earned.

If the rebate field is absent:

`rebate_component_status = unavailable`

Economic coverage falls accordingly.

---

# 11. CONTRIBUTION HIERARCHY

## Front-end contribution

`invoice_revenue − ERP/direct cost`

This helps show what conventional reporting may indicate.

## Pocket contribution

`pocket_revenue − true_landed_cost`

## Economic contribution

Where data supports it:

```text
Pocket contribution
− attributable outbound freight
− variable pick/pack
− sales commission
− payment processing
− directly attributable service expense
= true economic contribution
```

Do not allocate corporate overhead in v1.

Do not call economic contribution “gross margin”.

Use precise labels.

---

# 12. DATA COVERAGE

Every analysis has an Economic Coverage score.

Coverage measures available input completeness.

It is not model confidence.

Default component weights:

| Component | Weight |
|---|---:|
| realised sales | 20 |
| supplier/direct cost | 25 |
| customer discounts/credits | 10 |
| supplier adjustments/rebates | 10 |
| inbound freight | 10 |
| outbound freight | 10 |
| agreement data | 10 |
| variable cost-to-serve | 5 |

Weights are configuration.

Coverage is calculated from actual revenue/value coverage, not merely whether a file exists.

Example:

If landed cost is available for 94% of T12M sales value, the cost component gets 94% of its weight.

Display:

**Economic coverage 82%**

Tooltip explains missing components.

---

# 13. EVIDENCE STRENGTH

Do not present fake AI confidence percentages.

Use Evidence Grade.

## Grade A — documentary

Direct source supports the finding.

Examples:

- signed price agreement
- supplier rebate schedule
- freight invoice
- source transaction

Weight for planning model default:

`1.00`

## Grade B — calculated

Complete primary transaction/cost data supports the calculation but no direct documentary entitlement establishes the commercial outcome.

Default planning weight:

`0.85`

## Grade C — modelled

Finding depends materially on:

- allocation
- peer cohort
- derived floor
- proxy
- missing component

Default planning weight:

`0.60`

These are valuation weights, not statistical probabilities.

They must be editable.

---

# 14. FINDING BASIS

Each finding also has:

`basis_class`

Values:

- CONTRACTUAL
- EXTERNAL_TERM
- INTERNAL_POLICY
- HISTORICAL
- DERIVED
- PEER_BENCHMARK
- MODELLED

This is separate from Evidence Grade.

Example:

P1:

Basis = CONTRACTUAL  
Evidence = A

P6:

Basis = PEER_BENCHMARK  
Evidence = C

---

# 15. FINDING LIFECYCLE

Every finding supports:

DETECTED

REVIEWED

VERIFIED

REJECTED

ACTION_PLANNED

IMPLEMENTED

REALIZED

CLOSED

A finding may be REJECTED with reason.

Never delete rejected findings silently.

Store reviewer decision.

---

# 16. CHECK FAMILIES

## BUY

B1 Supplier rebate under-claim  
B2 Rebate tier near-miss  
B3 Margin illusion

## SERVE

S1 Freight under-recovery  
S2 Small-order drain  
S3 Credits/returns leakage

## SELL

P1 Active agreement price variance  
P2 Expired agreement pricing  
P3 Cost pass-through gap  
P4 Below-floor pricing  
P5 Discount creep  
P6 Peer price dispersion  
P7 Negative contribution

---

# 17. VALUE CLASSIFICATION BY CHECK

### B1

Default class:

DETECTED_LEAKAGE

If documentary terms + claims + eligible base reconcile.

May also generate CASH_ENTITLEMENT.

### B2

OPPORTUNITY

### B3

INSIGHT

### S1

If contractual customer freight terms support charge:

DETECTED_LEAKAGE.

If only client policy supports charge:

POLICY_LEAKAGE.

If no rule exists:

INSIGHT / COST-TO-SERVE only.

### S2

If an approved minimum-order policy exists:

POLICY_LEAKAGE.

Otherwise:

MODELLED_MARGIN_OPPORTUNITY.

### S3

If approved restocking/credit policy applies:

POLICY_LEAKAGE.

Otherwise:

INSIGHT.

### P1

DETECTED_LEAKAGE plus possible CASH_ENTITLEMENT only if back-billing is legally/commercially permitted and user enables it.

Also calculate BILLING_RISK for lines priced above agreement.

### P2

MODELLED_MARGIN_OPPORTUNITY.

An expired agreement does not establish the right to retrospectively charge a higher price.

### P3

MODELLED_MARGIN_OPPORTUNITY.

### P4

If client explicitly confirms an approved floor:

POLICY_LEAKAGE.

If floor is derived:

MODELLED_MARGIN_OPPORTUNITY.

### P5

MODELLED_MARGIN_OPPORTUNITY.

### P6

MODELLED_MARGIN_OPPORTUNITY.

### P7

OVERLAY.

---

# 18. SINGLE-COUNT TRANCHE ALLOCATION

Sell-side opportunity detectors overlap.

Never add overlapping gaps.

For customer × SKU:

Priority:

`P1 > P2 > P3 > P4 > P5 > P6`

For each gap:

```text
running_max = 0

for detector in priority:
    allocated_detector =
        max(0, gap_detector − running_max)

    running_max =
        max(running_max, gap_detector)
```

Thus:

`sum(allocated) = max(all detector gaps)`

Primary root cause:

highest-priority detector with positive allocated value.

Other positive detectors:

secondary signals.

This must be property tested.

Do not use:

`cum = cum + allocation`

without separately proving equivalence to the running maximum.

Implement the running maximum explicitly for clarity.

---

# 19. BUY/SERVE OVERLAP CONTROL

Buy, Sell and Serve streams can still economically overlap.

Implement explicit overlap policies.

Examples:

### P1 vs S3

Linked price-adjustment credits must reduce realised line price before P1.

Therefore an already-issued corrective credit cannot also appear as unresolved P1 leakage.

### Freight

Outbound freight included in pocket revenue calculation must not simultaneously be counted as a sell-price gap unless intentionally modelled.

### Supplier rebate

Supplier rebates included in true landed cost may still generate B1 if earned vs claimed differs.

Only **earned and expected** rebate reduces true landed cost.

The unclaimed amount remains a B1 cash entitlement.

Document every cross-family netting policy in:

`docs/METHOD.md`

---

# 20. BANKABILITY MODEL

Do not present bankability as scientific probability in v1.

Use scenario planning.

For finding `f`:

```text
bankable_scenario(f)
=
allocated_value
× capture_factor[check][scenario]
× evidence_weight[grade]
× risk_modifier
```

Scenarios:

LOW  
BASE  
HIGH

All factors are client-editable.

Example P3 defaults:

Low 0.25  
Base 0.45  
High 0.65

These are starting commercial planning assumptions.

The UI must show:

> Initial MarginShield assumption. Confirm with management.

As real outcomes accumulate, these assumptions can be calibrated.

---

# 21. INITIAL CAPTURE FACTORS

Store in configuration.

Never inline.

Example default BASE factors:

B1 0.80  
P1 0.75  
S1 0.50  
P2 0.60  
P3 0.45  
P4 0.40  
P5 0.35  
S2 0.30  
S3 0.30  
P6 0.25

LOW can default to approximately 70% of BASE.

HIGH can default to approximately 130% of BASE capped at 1.00.

Store explicit low/base/high factors so they are inspectable.

---

# 22. CUSTOMER COMMERCIAL RISK

This is a v1 heuristic, not a statistical churn model.

Score 0–100.

Factors:

### Revenue concentration — 25%

Higher risk when customer represents higher company revenue concentration.

### Existing price position — 25%

Higher risk when customer already pays above defensible peer median.

### Recency of last increase — 20%

Higher risk if a material price increase occurred recently.

### Volume trajectory — 15%

Higher risk if volume is already deteriorating materially.

### Purchase breadth — 10%

Higher risk for narrow relationships.

### Tenure — 5%

Higher risk for short-tenure relationships.

Bands:

0–39 LOW  
40–69 MEDIUM  
70–100 HIGH

Risk multipliers:

Low 1.00  
Medium 0.80  
High 0.60

Label:

**Commercial risk indicator**

Never:

**Probability customer leaves**

---

# 23. PRICE ACTION MODEL

MarginShield does not set prices autonomously.

For a sell-side finding:

## Current price

Use T3M volume-weighted average realised unit price unless an active current price is available.

## Target margin

Target margin is selected in this order:

1. client-confirmed policy floor where available;
2. defensible historical baseline;
3. derived conservative floor.

## Restore price

```text
restore_price
=
current_landed_cost
/
(1 − target_margin)
```

## Risk guardrail

Default maximum suggested increase:

Low risk: 10%  
Medium: 6%  
High: 3%

Configurable.

These are commercial guardrails, not optimisation.

## Scenarios

CONSERVATIVE

Halfway between current and guarded recommendation.

RECOMMENDED

Guarded target.

FULL RESTORE

Full target-margin price even where it exceeds guardrail.

The UI warns clearly when FULL RESTORE exceeds normal guardrail.

---

# 24. BREAK-EVEN VOLUME ANALYSIS

This is mandatory.

For current unit economics:

`C0 = current pocket contribution per unit`

For proposed price:

`C1 = proposed pocket contribution per unit`

Assuming variable unit cost remains unchanged:

```text
break_even_volume_retention
=
C0 / C1
```

Then:

```text
maximum_volume_decline
=
1 − break_even_volume_retention
```

Example:

A proposed price increase may allow a 5.8% volume reduction before total pocket contribution falls below current contribution.

Label assumptions prominently.

Do not confuse contribution break-even with revenue break-even.

---

# 25. STATIC-VOLUME UPSIDE

Initial price scenarios calculate:

```text
static_volume_upside
=
(new_price − current_price)
× T12M_quantity
```

Where discounts/rebates are percentage-driven, recompute entire price waterfall rather than only using the headline price difference.

Call it:

**Static-volume upside**

until outcome data supports volume-response modelling.

---

# 26. FUTURE ELASTICITY MODEL

Do not implement fake elasticity in MVP.

Only enable elasticity estimates after minimum data requirements.

Potential later methodology:

- customer/product price change events
- quantity before/after
- seasonality
- category demand trend
- customer fixed effects
- product fixed effects
- confounding event controls
- hierarchical shrinkage for sparse relationships

A future model may estimate:

`log(quantity) ~ β × log(price) + controls`

But price endogeneity must be acknowledged.

Do not implement sophisticated-looking regressions simply because libraries make them easy.

---

# 27. OUTCOME MEMORY

This is strategically important.

For implemented actions record:

finding_id  
customer  
SKU/group  
old price  
suggested price  
approved price  
effective date  
actual realised price  
pre-period volume  
post-period volume  
pre-period contribution  
post-period contribution  
expected upside  
realised upside  
customer notes  
commercial outcome

This supports:

# MarginShield Outcome Memory

Over time capture assumptions can be calibrated by:

- check type
- risk band
- sector
- action type
- evidence grade

---

# 28. OUTCOME CALIBRATION

Do not implement a complex probabilistic model until enough outcomes exist.

Initial calibrated recovery factor:

```text
calibrated_factor
=
(n × observed_mean + k × prior_factor)
/
(n + k)
```

Where:

`k` is a configurable shrinkage strength.

Example:

`k = 10`

Meaning sparse outcomes remain close to prior assumptions.

Display sample size.

Never hide:

`n = 2`

behind a precise prediction.

Future version can replace this with a hierarchical model.

---

# 29. MARGIN INTEGRITY INDEX

The index is only for longitudinal self-comparison.

Use weighted economic exposure.

```text
weighted_exposure
=
verified_or_detected_leakage
+
0.50 × modelled_margin_opportunity
```

```text
exposure_rate
=
weighted_exposure
/
T12M_net_sales
```

```text
MII
=
round(
    clamp(
        100 − 1000 × exposure_rate,
        0,
        100
    )
)
```

Data Coverage is shown separately.

Never increase MII merely because data disappeared.

If Economic Coverage falls more than 5 percentage points vs previous scan:

show:

**Comparability warning**

---

# 30. CHECK SPECIFICATIONS

## P1 ACTIVE AGREEMENT PRICE VARIANCE

Question:

**Were invoices priced differently from an active documented customer agreement?**

Required:

transactions  
customer agreements

Agreement matching order:

1. exact customer + SKU;
2. customer + product group;
3. customer-level agreement where explicitly applicable.

Agreement fields must include:

valid_from  
valid_to  
price_basis  
price/discount

`price_basis`:

INVOICE  
POCKET

Compare the correct economic field.

Flag under-billing:

```text
realised_basis_value
<
expected_value × (1 − tolerance)
```

Default tolerance:

0.5%.

Under-billing gap:

```text
(expected − actual) × quantity
```

Class:

DETECTED_LEAKAGE.

Grade:

A.

Also flag over-billing:

```text
actual > expected × (1 + tolerance)
```

as:

BILLING_RISK.

Never net billing risk against leakage in a way that hides it.

## P2 EXPIRED AGREEMENT PRICING

Question:

**Are expired commercial terms still being honoured without a replacement agreement?**

Requirements:

transactions  
customer agreements

Flag when:

invoice date > valid_to

AND

no active successor agreement

AND

realised price remains materially consistent with expired agreement price.

Target should never be described as contractually owed.

Use conservative comparison:

```text
reference_price
=
min(
    segment_standard_price,
    restore_price
)
```

Where sufficient segment data exists.

Class:

MODELLED_MARGIN_OPPORTUNITY.

Grade:

B or C depending reference.

## P3 COST PASS-THROUGH GAP

Question:

**Did supplier/landed cost increase materially faster than customer pricing?**

For each customer × SKU:

identify latest material landed-cost increase within T12M.

Default material cost increase:

2%.

Baseline price:

volume-weighted realised price during 90 days before material cost movement.

Current price:

volume-weighted realised price during latest 90 complete days.

Baseline landed cost:

effective landed cost immediately before shock.

Current landed cost:

latest effective cost.

```text
cost_change
=
current_cost / baseline_cost − 1
```

```text
price_change
=
current_price / baseline_price − 1
```

Flag when:

cost_change ≥ 2%

AND

cost_change − price_change ≥ 3 percentage points.

Baseline margin:

```text
(baseline_price − baseline_cost)
/
baseline_price
```

Restore price:

```text
current_cost
/
(1 − baseline_margin)
```

Gap:

```text
max(0, restore_price − current_price)
× T12M_quantity
```

Class:

MODELLED_MARGIN_OPPORTUNITY.

Grade:

B.

Show:

months since material customer price change.

## P4 BELOW-FLOOR PRICING

Use client-approved floor when available.

Basis:

INTERNAL_POLICY.

Class:

POLICY_LEAKAGE.

If no client floor exists:

derive a conservative exploratory floor.

Default:

10th percentile of positive T12M pocket margin within product group.

Label:

**Derived floor — management confirmation required**

Basis:

DERIVED.

Class:

MODELLED_MARGIN_OPPORTUNITY.

Calculate:

```text
floor_price
=
landed_cost
/
(1 − floor_margin)
```

Gap:

line-level shortfall, aggregated.

## P5 DISCOUNT CREEP

Question:

**Has effective customer discount progressively deteriorated?**

Customer × product group.

Monthly volume-weighted discount:

```text
1 −
sum(realised_invoice_revenue)
/
sum(list_price × qty)
```

Minimum:

9 complete monthly observations.

Run robust trend analysis.

Initial implementation may use OLS, but require:

- positive slope
- current window vs baseline difference
- economic materiality

Flag default:

trend ≥ +0.10 percentage points discount/month

AND

current discount − baseline discount ≥ 2 percentage points.

Gap:

difference between current and baseline effective discount × applicable list value.

Class:

MODELLED_MARGIN_OPPORTUNITY.

Grade:

B.

## P6 PEER PRICE DISPERSION

Question:

**Is this customer materially below comparable realised prices?**

Peer cohort:

same SKU  
same customer segment  
same region/branch grouping where appropriate  
same volume quartile

Minimum peers:

8.

If fewer:

NOT ASSESSED.

Calculate:

P10  
P25  
P40  
Median  
P75  
P90

Flag when:

customer realised price < P25.

Reference target:

P40.

Do not default to median.

Minimum materiality:

gap ≥5% current price

AND

annual gap ≥A$500.

Basis:

PEER_BENCHMARK.

Grade:

C.

Class:

MODELLED_MARGIN_OPPORTUNITY.

## P7 NEGATIVE CONTRIBUTION

Overlay.

Flag lines where:

pocket contribution < 0

and separately where true economic contribution < 0 where coverage allows.

Display:

count  
revenue  
negative contribution amount

Never add a separate headline opportunity if those lines already exist inside a root finding.

---

# 31. SERVE CHECKS

## S1 FREIGHT UNDER-RECOVERY

Inputs:

transactions  
freight file optional  
commercial freight policy optional

With invoice-level freight cost:

Grade A/B depending policy support.

Without freight file:

may estimate freight cost only if user supplies a valid freight-to-sales or allocation policy.

Then:

Grade C.

No freight policy:

report cost-to-serve insight only.

With policy:

```text
expected_freight_charge
=
policy(invoice)
```

Leakage:

```text
max(
    0,
    min(expected_charge, freight_cost)
    − freight_charged
)
```

Classification based on basis.

## S2 SMALL-ORDER DRAIN

Do not invent leakage simply because an order is small.

If client has minimum order/surcharge policy:

calculate policy variance.

If no policy:

show modelled opportunity using editable assumptions.

Config:

minimum order  
handling cost/order  
handling cost/line  
suggested surcharge

Class depends on policy basis.

Grade C where cost is modelled.

## S3 CREDITS AND RETURNS

Track:

return credits  
price adjustment credits  
commercial credits  
restocking fees

If client restocking policy exists:

calculate missing fee.

If no policy:

show abnormal credit/return rates as insight only.

Also show customer credit rate vs segment.

Never automatically imply abuse.

---

# 32. BUY CHECKS

## B1 SUPPLIER REBATE UNDER-CLAIM

Support explicit rebate schemas.

`rebate_type`:

FLAT  
RETROSPECTIVE_TIER  
INCREMENTAL_TIER  
GROWTH  
CLAIM_BACK

### Flat

`eligible_base × rate`

### Retrospective tier

Determine achieved tier from full-period eligible base.

Apply achieved tier rate to eligible base.

### Incremental tier

Apply each rate only to spend inside that tier.

### Growth

Require:

baseline definition  
qualification threshold  
award basis

Do not infer growth structure from prose without user confirmation.

### Claim-back

Match supported sale/transaction to eligible vendor claim rule.

For closed periods:

```text
gap
=
max(
    0,
    earned
    − claimed
    − received_pending_match
)
```

Require terms and eligible base tie-out.

Grade A after user confirms.

Class:

DETECTED_LEAKAGE.

If inside claim window:

CASH_ENTITLEMENT.

## B2 REBATE TIER NEAR-MISS

Open period only.

Flag if:

distance to next tier ≤ configured percentage

AND

sufficient time remains.

Display:

remaining spend required  
historical purchase run-rate  
incremental rebate value

Never add to leakage.

Class:

OPPORTUNITY.

## B3 MARGIN ILLUSION

Compare ERP transaction cost with reconstructed landed cost.

Show difference between:

front-end reported margin

and

pocket/landed economics.

Class:

INSIGHT.

---

# 33. MATERIALITY

Global default:

A$250 annualised.

Configurable.

Support:

absolute materiality

percentage-of-sales materiality

minimum transaction count

Materiality is visible on every report.

---

# 34. DATA HEALTH GATES

Checks must not run merely because code technically can.

## Minimum history

General:

12 complete months.

P3/P5:

15 months preferred.

If shorter data accepted:

label limited-history mode.

## Cost match

At least 90% T12M sales value mapped to landed/direct cost for cost-based metrics.

Otherwise:

partial assessment.

## Agreement match

P1/P2 require valid agreement dates and clear price basis.

## Duplicate handling

Duplicate rate after identification <0.5%.

Do not silently delete ambiguous duplicates.

Show them.

## Sign sanity

Credits/returns consistently identifiable.

## Currency sanity

Do not add currencies without conversion data.

## Sales tie-out

Display imported T12M sales.

Require user:

**I confirm this agrees to the source reporting total**

Store confirmation event.

If not confirmed:

reports state:

**Sales tie-out not confirmed**

## Cost tie-out

Where client supplies known inventory/COGS control total, support optional tie-out.

---

# 35. EVIDENCE LEDGER

Every material number must be drillable.

For each finding store:

finding ID  
check ID  
value class  
basis class  
grade  
source files  
source rows  
transactions  
agreement rows  
cost rows  
freight rows  
rebate rows  
calculation inputs  
calculation version  
configuration version  
run hash

The Evidence Drawer shows:

# Why this was flagged

Then actual numbers.

Then formula.

Then source records.

No hidden black-box score.

---

# 36. RUN HASH

Each scan gets deterministic:

`run_hash`

Construct using canonical ordered hashes of:

source-file SHA-256 hashes  
mapping profile  
method configuration  
engine version  
analysis period  
currency configuration

Do not include current timestamp.

The same inputs/config/version must produce same run hash.

---

# 37. FINDING ID

Use:

`sha256(check_id | grain_keys | period_end | engine_major_version)`

Prefix:

`MSF-`

Use first 24 hex characters.

Stable enough for recurring monitoring.

---

# 38. SYSTEM ARCHITECTURE

Core privacy architecture:

```text
CLIENT BROWSER
│
├── Next.js UI
│
├── File ingestion
│
├── Web Worker
│    └── DuckDB-Wasm
│         ├── canonical data
│         ├── deterministic engine
│         ├── checks
│         ├── allocation
│         ├── bankability
│         └── reports payload
│
├── OPFS local working database
│
├── encrypted .msproj
│
└── optional aggregate narrative request
         │
         ▼
SERVER
├── Auth/licensing
├── lead form
├── Stripe
├── aggregate narrative proxy
└── metadata only
```

Raw transaction rows must not be sent to the server in v1.

---

# 39. IMPORTANT IP REALITY

Do not claim that a downloaded “method pack” hides MarginShield's proprietary methodology.

A client-side application necessarily delivers executable logic to the browser.

A technically capable party may inspect it.

Therefore:

- licensing controls authorised use;
- copyrights protect code;
- contractual terms protect use;
- outcome calibration and mapping intelligence compound;
- brand and workflow create commercial value.

Do not rely on JavaScript obfuscation as a moat.

`/api/licence` may provide:

- licence state
- configuration version
- commercial entitlements
- calibrated coefficients

but this is not cryptographic protection of the methodology.

---

# 40. BROWSER ENGINE CONSTRAINTS

The browser engine must be designed conservatively.

DuckDB-Wasm has browser/Wasm memory limitations.

Therefore implement:

## Normal mode

For normal distributor exports.

## Large-file mode

Recommend CSV for very large sales-line datasets.

Warn for unusually large XLSX files.

Do not promise arbitrary file size.

Reference performance benchmark:

1.1m synthetic lines on defined reference hardware.

This is an engineering benchmark, not a universal customer guarantee.

Display processing estimate based on local device where possible.

---

# 41. ACCEPTED INPUT SECURITY

v1 accepts:

`.csv`

`.xlsx`

Reject:

`.xlsm`

`.xlsb`

`.xls`

executable archives

password-protected files unless safely supported later.

Never execute workbook macros.

Never evaluate external workbook links.

Do not fetch external references embedded in workbooks.

Treat all uploaded content as hostile input.

---

# 42. FILE SAFETY

Implement:

maximum file-size configuration

maximum sheet count

maximum column count

maximum row estimate

decompression protections where parser permits

formula-string handling

external-link detection

malformed ZIP/XLSX errors

UTF encoding validation

CSV delimiter detection

Never render raw HTML from cells.

Never use `dangerouslySetInnerHTML` for uploaded content.

---

# 43. CSV/EXCEL EXPORT SAFETY

Prevent spreadsheet formula injection.

When exporting user-controlled strings beginning with:

`=`

`+`

`-`

`@`

apply safe spreadsheet escaping for text fields.

Do not corrupt legitimate numeric negatives.

Use column schema to distinguish numbers from text.

---

# 44. WORKER NETWORK ISOLATION

DuckDB-Wasm assets are served from same origin.

Instantiate required worker/Wasm assets first.

Do not load remote extensions in the deterministic engine.

After initialisation, the analysis worker must have no general-purpose network functionality.

Test explicitly that business analysis code cannot call:

fetch  
XMLHttpRequest  
WebSocket

Do not break the engine's own initial same-origin bootstrap.

---

# 45. LOCAL PROJECT ENCRYPTION

`.msproj` is an optional encrypted project bundle.

Use:

AES-256-GCM.

Use a vetted password-based key derivation implementation.

Preferred:

Argon2id.

Minimum security target should follow current OWASP guidance at build time.

Envelope includes:

version  
KDF  
KDF parameters  
random salt  
random nonce  
ciphertext  
metadata version

Never reuse AES-GCM nonce for a key.

Passphrase is never uploaded.

No passphrase recovery.

Default project export includes:

mapping  
config  
findings  
outcomes

Raw normalised tables are opt-in.

Warn users if raw data is included.

---

# 46. THREAT MODEL

Create:

`docs/THREAT_MODEL.md`

Cover at least:

## Assets

raw transaction data  
supplier pricing  
customer pricing  
agreements  
rebates  
finding reports  
project files  
credentials  
licence data

## Threats

XSS  
malicious spreadsheet content  
dependency compromise  
data exfiltration  
server logging  
LLM leakage  
cross-tenant access  
stolen project files  
formula injection  
credential theft  
session theft  
malicious browser extension  
supply-chain attack

## Trust boundaries

browser  
Web Worker  
server API  
Supabase  
Stripe  
Anthropic  
report files

## Mitigations

and residual risk.

Do not use “cyber safe” as an absolute claim.

Use:

**privacy-by-design**

**security controls**

**local-first processing**

---

# 47. AUDIT-READY, NOT AUDIT-PROOF

Never use:

“audit-proof”

“guaranteed accurate”

“assurance opinion”

unless legally appropriate and actually supported.

Use:

# Audit-ready evidence trail

Meaning:

- deterministic calculations
- evidence lineage
- method version
- configuration version
- review events
- run hash
- source references
- assumption history
- reports reproducible from same inputs

Board pack disclaimer:

> MarginShield is a commercial diagnostic based on client-supplied data, configured assumptions and the MarginShield methodology. It is not an audit, assurance engagement, valuation opinion or guarantee that identified opportunities will be realised.

---

# 48. SERVER SECURITY

Server handles no raw rows.

Implement:

Supabase RLS on every user-owned table.

Service-role secret server-only.

Rate limiting.

CSRF-appropriate protections.

Stripe webhook signature validation.

No request-body logging.

Structured allow-list logging.

Secrets in deployment environment only.

No secrets in repository.

No secrets in browser bundle except public keys designed for public use.

---

# 49. SECURITY HEADERS

App routes:

CSP.

COOP.

COEP where required for threaded Wasm.

HSTS in production.

X-Content-Type-Options.

Referrer-Policy.

Permissions-Policy.

frame-ancestors.

Restrict `connect-src`.

Marketing routes can differ where Google booking/embed functionality requires it.

Do not weaken `/scan` security to make `/book` work.

---

# 50. APP ANALYTICS

No third-party analytics on:

`/scan`

`/demo`

authenticated app routes.

Marketing may use privacy-friendly cookieless analytics.

Do not place third-party session replay on any route processing financial data.

---

# 51. PRIVACY PROOF

Create a premium drawer:

# Privacy Proof

Accurately describe it as:

> Application network activity initiated by MarginShield.

Show:

time  
method  
destination  
request category  
payload size

Never claim it represents every browser/network operation outside application control.

Also show:

Allowed destinations.

Raw-row uploads:

`0`

AI commentary:

On/Off.

Customer identifiers sent to AI:

`0`

Transaction rows sent to AI:

`0`

Add:

**Delete local scan data**

---

# 52. AI INTERPRETATION ARCHITECTURE

AI is optional.

The deterministic product must operate without an AI API key.

AI may:

- suggest header mappings using headers only
- extract structured agreement terms with user confirmation
- write CFO commentary
- summarise findings
- create draft internal actions
- draft customer conversation notes

AI may not authoritatively calculate numbers.

---

# 53. SAFER NARRATIVE DESIGN

Do not rely only on regex number-whitelisting.

Create an allowed-fact token system.

Payload contains facts:

```json
{
  "F001": {
    "label": "Detected leakage",
    "formatted": "A$796k"
  },
  "F002": {
    "label": "Modelled margin opportunity",
    "formatted": "A$1.04m"
  }
}
```

AI returns narrative with placeholders:

```text
"MarginShield detected {{F001}} of evidence-backed leakage and {{F002}} of modelled commercial opportunity."
```

The browser substitutes values.

System instruction:

AI must use allowed fact tokens rather than writing numeric facts directly.

Unknown fact token:

reject.

Fallback:

deterministic narrative.

This is stronger than trusting an LLM to reproduce numbers.

---

# 54. AI PAYLOAD

Only aggregates.

Tokenise:

customers → C-014  
reps → R-03

Replace SKU with product group unless specific identifier is truly required.

Never send:

invoice numbers  
real customer names  
raw descriptions  
raw transaction lines

First AI use:

display exact payload to user.

Require explicit consent.

Setting:

AI commentary OFF by default for real scans.

Demo may enable automatically because all data is synthetic.

---

# 55. ANTHROPIC CONFIGURATION

Environment:

`ANTHROPIC_API_KEY`

`ANTHROPIC_MODEL`

Default configuration may use:

`claude-sonnet-5`

but code must not depend on a permanent model name.

Model is deployment configuration.

Narrative API must remain replaceable.

Create provider interface.

---

# 56. OPEN-SOURCE DISCLOSURES

Maintain:

`docs/OPEN_SOURCE.md`

Generate dependency licence inventory.

SheetJS Community Edition attribution must be included where required.

Do not silently ship incompatible licences.

Phase 0 CI includes licence scan.

---

# 57. REPOSITORY

```text
marginshield/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (marketing)/
│       │   ├── (demo)/
│       │   ├── (auth)/
│       │   └── (app)/
│       ├── components/
│       ├── config/
│       ├── lib/
│       └── public/
│
├── packages/
│   ├── engine/
│   ├── ui/
│   ├── reports/
│   ├── synthetic/
│   ├── schemas/
│   └── api-client/
│
├── supabase/
│   └── migrations/
│
├── tests/
│   ├── golden/
│   ├── privacy/
│   ├── security/
│   ├── performance/
│   └── e2e/
│
├── docs/
│   ├── BLUEPRINT.md
│   ├── METHOD.md
│   ├── THREAT_MODEL.md
│   ├── DATA_DICTIONARY.md
│   ├── DECISIONS.md
│   ├── SECURITY.md
│   ├── OPEN_SOURCE.md
│   └── LAUNCH.md
│
├── .cursor/
│   └── rules/
│
├── .github/
│   └── workflows/
│
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── .env.example
└── README.md
```

---

# 58. STACK

## Monorepo

pnpm workspaces  
Turborepo

## Web

Next.js latest stable compatible release  
React  
TypeScript strict

## Design

Tailwind CSS v4  
shadcn/ui primitives  
CSS variables

## Charts

Apache ECharts where advanced visualisations require it.

Do not add Recharts as a second general chart library unless a specific technical reason is documented.

## Tables

TanStack Table  
TanStack Virtual

## Motion

Motion for React

## Browser engine

DuckDB-Wasm  
Comlink  
Apache Arrow

## Parsing

Papa Parse for CSV  
SheetJS CE for XLSX

## Validation

Zod

## Statistics

simple-statistics and deterministic SQL

## Reports

`@react-pdf/renderer`  
ExcelJS

## Auth/database

Supabase

## Billing

Stripe

## AI

Anthropic provider abstraction

## Testing

Vitest  
fast-check  
Playwright  
axe

## Security CI

CodeQL  
dependency audit  
secret scanning  
licence checks

---

# 59. CANONICAL DATA MODEL

Money:

`DECIMAL(18,4)`

Rates:

`DECIMAL(12,8)`

Never authoritative JS floating-point money calculations.

Tables include:

customers  
skus  
suppliers  
transactions  
supplier_costs  
customer_agreements  
supplier_rebates  
purchases  
freight  
commercial_policies  
findings  
finding_evidence  
actions  
outcomes

---

# 60. FINDINGS SCHEMA

Include:

finding_id  
run_hash  
check_id  
family  
value_class  
basis_class  
status  
customer_id  
sku  
product_group  
supplier_id  
invoice_no  
raw_gap  
allocated_value  
evidence_grade  
capture_low  
capture_base  
capture_high  
risk_band  
bankable_low  
bankable_base  
bankable_high  
cash_claimable  
root_cause  
facts_json  
method_version

---

# 61. GENERIC EVIDENCE TABLE

Do not link only transactions.

```text
finding_evidence

finding_id
evidence_kind
source_file
source_sheet
source_row
record_id
field
value_display
role
```

Kinds:

TRANSACTION  
AGREEMENT  
COST  
FREIGHT  
REBATE  
PURCHASE  
POLICY  
CALCULATION

---

# 62. INGESTION

Workflow:

FILES

↓

TYPE DETECTION

↓

HEADER PROFILING

↓

MAPPING

↓

SEMANTIC CONFIRMATION

↓

NORMALISATION

↓

DEDUPE

↓

DATA HEALTH

↓

TIE-OUT

↓

RUN

---

# 63. SMART MAPPING

Use deterministic synonyms first.

Example:

`Inv No`

`Invoice #`

`DocNum`

→ `invoice_no`

Fuzzy match second.

AI mapping suggestion:

headers only.

No values.

Show mapping confidence.

User confirms ambiguous semantics.

Especially require explicit confirmation for:

NET SALES  
GROSS SALES  
COST  
FREIGHT  
REBATE

because semantic mistakes would materially change economics.

---

# 64. DATA NORMALISATION

Support Australian data formats first.

Dates:

dd/mm/yyyy  
yyyy-mm-dd  
Excel serial date

Numbers:

1,234.00  
(1,234.00)  
1,234-  
$1,234.00

Preserve original source value separately.

Do not lose provenance during normalisation.

---

# 65. CURRENCY

Never combine currencies automatically.

Canonical Money:

amount  
currency

If reporting currency requested:

require FX source.

Retain:

original amount  
original currency  
FX rate  
rate date  
converted amount  
reporting currency

---

# 66. ENGINE ORDER

1. input validation
2. source hashing
3. normalisation
4. duplicate analysis
5. tie-out
6. economic waterfall
7. baseline aggregation
8. checks
9. overlap/tranche allocation
10. risk
11. bankability scenarios
12. recommendations
13. MII
14. reports payload
15. run hash confirmation

---

# 67. SYNTHETIC COMPANY

# Harbourline Trade Supply Pty Ltd

Always mark:

**Fictional demonstration company**

Profile:

Revenue approximately A$85m T12M.

6 branches.

420 customers.

5,800 SKUs.

60 suppliers.

28 sales representatives.

24 months.

Approximately 1.1m transaction lines.

Sectors:

HVAC  
electrical  
plumbing

No real brand names.

---

# 68. SYNTHETIC ECONOMIC GROUND TRUTH

Plant:

P1 A$286k  
P2 A$196k  
P3 A$411k  
P4 A$188k  
P5 A$151k  
P6 A$98k  
S1 A$221k  
S2 A$64k  
S3 A$57k  
B1 A$168k

Total addressable:

approximately A$1.84m.

Classification:

Detected/policy leakage:

P1 + S1 + S2 + S3 + B1

approximately:

A$796k.

Modelled opportunity:

P2 + P3 + P4 + P5 + P6

approximately:

A$1.044m.

Cash entitlement:

approximately A$124k.

Exact dashboard values come from engine.

Never hard-code these display figures.

---

# 69. SYNTHETIC VARIANTS

`clean`

No planted leakage.

Used false-positive testing.

`planted`

Ground truth.

`messy`

Same planted economics with:

header variations  
split sheets  
AU dates  
duplicates  
negative formatting  
mixed CSV/XLSX

`partial`

Missing freight/rebate/agreement data.

Used to test coverage and NOT ASSESSED states.

---

# 70. GROUND TRUTH TESTING

Synthetic generator writes:

`ground_truth.json`

For every planted issue:

check ID  
grain keys  
expected value  
value class  
source records

Golden test:

detector precision  
recall  
economic amount accuracy  
single-count accuracy

Never modify ground truth to make engine pass unless the synthetic generator is demonstrably wrong and decision is documented.

---

# 71. DESIGN SYSTEM

Name:

# Ledger

Concept:

industrial distributor

+

accountant's ledger

Avoid generic dark AI SaaS styling.

---

# 72. COLOUR

```text
--ledger       #EEF1EA
--folio        #FAFBF8
--ink          #16233B
--ink-2        #3C4A60
--ruling       #6F879F
--ruling-soft  #D5DEE7
--red-ink      #B42318
--bank         #1E6B47
--manila       #D8C69A
```

Family visual hues:

Buy  
Serve  
Sell

Use consistently.

Do not use rainbow charts.

Critical form/control boundaries must meet accessibility contrast.

Soft decorative rules do not substitute for accessible input boundaries.

---

# 73. TYPOGRAPHY

Primary:

Barlow Semi Condensed

Display:

Barlow Condensed

Self-host through Next font build pipeline.

No runtime Google Fonts request.

Fallback if numeric rendering inadequate:

IBM Plex Sans Condensed.

Use:

tabular numerals.

No all-caps UI labels.

No excessive eyebrow labels.

No sci-fi typography.

---

# 74. SIGNATURE VISUAL

# THE BLEED

A horizontal commercial economics flow.

Revenue enters as a thick ink band.

Commercial losses peel down in red.

Separate visually:

### Detected leakage

solid red.

### Modelled opportunity

hatched/dashed red treatment.

### Bankable base

green outline.

This distinction is crucial.

Do not visually imply modelled opportunity is already lost money.

---

# 75. OVERVIEW EQUATION

Primary strip:

```text
A$796k
Detected leakage

+

A$1.04m
Modelled opportunity

=

A$1.84m
Addressable margin
```

Then:

```text
A$780k
Expected bankable — base

A$520k–A$1.01m
Planning range

A$124k
Cash claimable now
```

Exact demo figures from engine.

---

# 76. MOTION

Only one major cinematic moment.

When scan completes:

- ledger rows move rapidly
- flags appear
- leakage traces form
- headline numbers count into place
- The Bleed settles

Approximately 2.4 seconds.

Then static.

No endless movement.

Reduced motion:

skip directly to result.

---

# 77. APP NAVIGATION

Scans  
Overview  
The Bleed  
Checks  
Leakage ledger  
Customers  
Products  
Recovery plan  
Reports  
Data health  
Assumptions  
Settings

Command palette:

⌘K / Ctrl+K

---

# 78. OVERVIEW

Show:

period

run hash

coverage

tie-out status

headlines

The Bleed

Top five actions

Leakage by family

New vs prior scan

High-value evidence-backed findings

No generic KPI clutter.

---

# 79. CHECK DETAIL

Must contain:

question being tested

method

required data

value class

basis class

calculation

headline amount

bankability range

customer ranking

SKU ranking

branch ranking

findings

limitations

---

# 80. EVIDENCE DRAWER

Perhaps the most important UI.

Show:

Finding.

Status.

Value.

Classification.

Evidence Grade.

Why flagged.

Formula with real values.

Example:

```text
Historical price      A$128.40
Current landed cost   A$112.70
Required restore      A$145.60
Current realised      A$130.10
Gap/unit              A$15.50
T12M quantity         3,085
Opportunity           A$47,818
```

Then:

source files.

source rows.

transaction lines.

agreement/cost evidence.

Add to recovery plan.

---

# 81. CUSTOMER 360

Show:

revenue

pocket contribution

margin trend

cost movement

price movement

risk indicator

product breadth

peer price position

active findings

modelled opportunities

detected leakage

implemented actions

outcome history

---

# 82. SCENARIO LAB

Controls:

new price

expected volume retention manual slider

freight charge

rebate assumption where appropriate

Show:

revenue

pocket contribution

margin %

static-volume upside

user-adjusted volume upside

break-even volume decline

Do not show “AI optimum price” in v1.

---

# 83. RECOVERY PLAN

Finding status:

Proposed

Reviewed

Approved

In progress

Implemented

Realized

Rejected

Allow:

owner  
due date  
action type  
chosen scenario  
notes  
evidence  
measured result

Monthly scan compares prior finding ID.

If finding disappears:

suggest:

**Potentially resolved**

Do not automatically mark realized.

Require confirmation.

---

# 84. ASSUMPTIONS

Every methodology assumption is visible.

Groups:

materiality  
capture factors  
risk weights  
floors  
freight policies  
small-order policies  
rebate rules  
annualisation basis  
scenario caps

Each change:

who  
when  
old  
new

Recalculate instantly.

Reports show assumption version.

---

# 85. WEBSITE

Customer-facing brand:

MarginShield.

Footer:

**MarginShield by Evidence Room**

Primary hero:

# Find the margin your business is losing, line by line.

Subhead:

**MarginShield analyses sales, cost, freight and price-agreement exports to identify evidence-backed leakage and commercial margin opportunities—then traces every finding to the underlying transaction.**

Privacy line:

**Your transaction files are processed on your computer, not uploaded to ours.**

Primary:

**Run the demo scan**

Secondary:

**Book a Margin Scan**

---

# 86. WEBSITE STORY

Section:

# One number isn't enough.

Explain:

Detected leakage.

Modelled opportunity.

Expected bankable.

Cash claimable.

This differentiation should become part of the product's credibility.

---

# 87. WEBSITE PROBLEM

Headline:

# Revenue can grow while commercial economics quietly deteriorate.

Example synthetic:

Supplier cost +14.1%

Realised customer price +1.8%

Pocket margin 24.6% → 12.2%

Then:

> Your ERP recorded every transaction. MarginShield shows the commercial relationship that changed.

---

# 88. WEBSITE METHOD

Show:

INGEST

↓

RECONSTRUCT ECONOMICS

↓

TEST

↓

CLASSIFY

↓

EVIDENCE

↓

MODEL ACTION

↓

TRACK OUTCOME

Use exact product terms.

---

# 89. WEBSITE PRIVACY

Page:

`/privacy-by-design`

Architecture illustration.

Explain exactly:

- file processing local
- row data local
- metadata server
- optional aggregate commentary
- tokenised identifiers
- local deletion

No absolute security claims.

---

# 90. WEBSITE METHOD PAGE

Explain:

Price waterfall.

Cost waterfall.

Detected vs modelled.

Evidence Grades.

Tranche allocation.

Bankability planning range.

Break-even volume.

Outcome calibration.

Include worked synthetic example.

This is key differentiation.

---

# 91. WEBSITE CHECKS

One section per check:

Question.

Data needed.

What constitutes finding.

Classification.

Example.

Potential action.

---

# 92. ABOUT

Primary:

MarginShield by Evidence Room.

Founder section may state approved professional credentials.

Do not mention current employer.

Do not imply employer endorsement.

Store bio in one configuration file.

---

# 93. REPORTS

## Board pack

10 pages maximum.

1 Cover  
2 Executive answer  
3 Detected vs modelled  
4 The Bleed  
5 Leakage Ledger  
6 Top findings  
7 Recovery plan  
8 Customer/commercial risk  
9 Method and assumptions  
10 Data health, tie-outs and disclaimer

Every page:

run hash  
period  
method version

---

# 94. EXECUTIVE REPORT LANGUAGE

Do not say:

“MarginShield found A$1.84m of guaranteed savings.”

Use:

> MarginShield identified A$796k of detected leakage and A$1.04m of modelled commercial opportunity in the supplied dataset. Under the base-case planning assumptions, A$X is classified as expected bankable value over the next 12 months.

---

# 95. EXCEL ACTION PACK

Sheets:

Executive

Detected leakage

Modelled opportunities

By sales representative

By customer

By product

Recovery plan

Assumptions

Evidence index

Protect against formula injection.

Use premium formatting.

---

# 96. AUTH

Supabase.

Magic link.

Google OAuth.

Organisation isolation.

Roles:

Owner  
Analyst  
Viewer

Future:

External reviewer

---

# 97. SERVER METADATA

Default server stores:

user

org

licence

engagement label

period

scan status

optional consented headline metrics

No raw transactions.

Headline consent default:

false.

---

# 98. LICENCE

`/api/licence`

Returns:

signed short-lived licence token

plan

feature entitlements

config/method version

No claim that this hides the client-side method.

---

# 99. STRIPE

Products configured from environment/IDs.

Do not create assumptions that live product IDs are available during development.

Support test mode fully.

---

# 100. AI NARRATIVE SCHEMA

Use structured object:

executive summary template

family narrative templates

check narrative templates

top actions

draft commercial discussion notes

Each narrative references allowed fact tokens.

Browser performs substitution.

Unknown fact reference rejects response.

---

# 101. NO-AI MODE

The entire application must work without Anthropic.

Deterministic templates include:

what was found

why it matters

potential action

limitations

AI adds polish only.

---

# 102. PRIVACY TEST

End-to-end test must intercept every application network request while running a full planted scan.

Assert request bodies do not contain any:

real synthetic customer name

SKU code

invoice number

transaction description

source row

unless destination is explicitly local/same browser execution and not a network request.

For AI commentary:

assert tokenised aggregate payload only.

---

# 103. UNIT TESTING

Each check has:

positive case

negative case

threshold edge

missing-data case

currency issue

duplicate issue where relevant

---

# 104. GOLDEN TEST

Planted Harbourline.

For each detector:

≥95% planted pair recall target.

Economic totals:

within ±3%.

Headline total:

within ±2%.

If a check logically cannot achieve this due design:

document and revise methodology rather than weakening test silently.

---

# 105. CLEAN DATA FALSE POSITIVES

Clean variant.

Contractual checks should be near zero.

Modelled opportunity may legitimately identify natural dispersion.

Therefore do not impose the same near-zero limit on P4/P5/P6 as P1/B1.

Instead establish detector-specific false-positive expectations.

This corrects the prior blanket false-positive test.

---

# 106. DETERMINISM

Same:

inputs

config

engine version

must produce identical:

findings

amounts

run hash

The narrative may differ if AI runs.

Deterministic financial result may not.

---

# 107. SECURITY CI

On main:

typecheck

lint

unit tests

golden tests

privacy tests

e2e

CodeQL

secret scan

dependency audit

licence audit

production build

No main deploy if critical checks fail.

---

# 108. ACCESSIBILITY

WCAG 2.2 AA target.

Keyboard complete.

Focus visible.

Colour not sole indicator.

Tables navigable.

Tooltips accessible.

Reduced motion.

390px public site.

Authenticated app can use responsive table transformations.

---

# 109. PERFORMANCE

Reference benchmark, not universal promise.

Harbourline 1.1m lines.

Target:

results under 45 seconds on defined reference Apple Silicon Mac + current Chrome.

Capture:

device

browser

engine version

dataset hash

benchmark.

Also test:

500k

1m

1.5m where memory permits.

Use chunked progress.

Do not crash without explanation.

---

# 110. CURSOR PHASE 0 — FOUNDATION

PROMPT TO RUN:

Read `docs/BLUEPRINT.md` completely.

Create the MarginShield monorepo exactly according to §57–§58.

Requirements:

- pnpm workspaces
- Turborepo
- apps/web
- packages/engine
- packages/ui
- packages/reports
- packages/synthetic
- packages/schemas
- packages/api-client
- TypeScript strict
- Next.js latest stable compatible release
- Tailwind v4
- Vitest
- Playwright
- axe
- fast-check
- ESLint
- Prettier
- CodeQL workflow
- secret scanning workflow
- dependency and licence auditing
- `.env.example`
- docs files
- cursor rules from §123 onward

Pin compatible dependency versions in the lockfile.

Do not include secrets.

Create root commands:

`pnpm dev`

`pnpm build`

`pnpm typecheck`

`pnpm lint`

`pnpm test`

`pnpm test:golden`

`pnpm test:privacy`

`pnpm e2e`

`pnpm synth`

Create `docs/OPEN_SOURCE.md`.

Done only when install, typecheck, lint and test pass.

Commit:

`phase-0: repository foundation`

---

# 111. CURSOR PHASE 1 — LEDGER DESIGN SYSTEM

PROMPT:

Implement the Ledger design system from §§71–74.

Create CSS design tokens.

Install only the UI dependencies required.

Restyle shadcn primitives rather than using default appearance.

Create:

Money

Percentage

BasisPoints

EvidenceGrade

ValueClassBadge

FindingStatus

LedgerTable

DoubleRuleTotal

RedInkBar

BankabilityRange

CoverageMeter

RiskIndicator

RunHash

AppShell

MarketingShell

Build `/styleguide`.

Use synthetic commercial values.

No hard-coded colours outside tokens.

Validate accessibility contrast.

Screenshots:

1440 desktop

390 mobile

Run axe.

Done when design feels custom to MarginShield and no component looks like untouched shadcn.

Commit:

`phase-1: ledger design system`

---

# 112. CURSOR PHASE 2 — SYNTHETIC HARBOURLINE

PROMPT:

Build the deterministic Harbourline Trade Supply generator from §§67–70.

Command:

`pnpm synth --seed 42 --variant planted`

Also:

clean

messy

partial

Generate every required source file.

Ground truth must contain the exact planted economic scenario.

Use seeded RNG.

Never use real brands or names.

Add tests confirming:

deterministic file hashes

T12M sales approximately A$85m

planted total approximately A$1.84m

classification total

clean variant absence of intentional planted cases

Commit:

`phase-2: harbourline synthetic dataset`

---

# 113. CURSOR PHASE 3 — LOCAL ENGINE AND SECURE INGESTION

PROMPT:

Implement browser-local data engine and ingestion according to §§38–66.

Requirements:

DuckDB-Wasm.

Same-origin Wasm assets.

Comlink worker.

OPFS.

CSV/XLSX parsing.

Input security rules.

Canonical DDL.

Money DECIMAL.

File hashing.

Synonym mapping.

Fuzzy matching.

Semantic confirmation.

Data normalisation.

Duplicate analysis.

Data-health gates.

Tie-out workflow.

Reject macro-enabled/unsupported workbook formats.

Never execute formulas/macros/external links.

Implement project input limits.

Implement worker network isolation only after required engine assets initialise.

Build scan UI:

Files

Mapping

Data health

Tie-out

Done when messy Harbourline maps correctly with minimal/no manual intervention and raw data has not left the browser.

Commit:

`phase-3: secure local ingestion engine`

---

# 114. CURSOR PHASE 4 — ECONOMIC WATERFALL

PROMPT:

Implement §§8–12.

Create deterministic DuckDB views:

landed cost

invoice economics

pocket economics

economic contribution

T12M pairs

customer aggregations

SKU aggregations

supplier aggregations

Preserve source lineage.

Calculate Economic Coverage.

Do not double-subtract components.

Add explicit tests for gross-vs-net semantics.

Create interactive waterfall explorer.

Done when every economic figure on the waterfall drills to source evidence.

Commit:

`phase-4: economic waterfall`

---

# 115. CURSOR PHASE 5 — SELL CHECKS

PROMPT:

Implement P1–P7 exactly according to §§30 and 18–19.

Each check:

SQL computation.

TypeScript configuration wrapper.

Finding creation.

Value class.

Basis class.

Evidence Grade.

Evidence rows.

facts JSON.

Unit tests.

Implement single-count tranche allocation.

Implement P1 billing risk.

Run planted synthetic tests.

Do not proceed until allocation property test proves:

sum allocation = maximum overlapping sell gap.

Commit:

`phase-5: sell leakage detectors`

---

# 116. CURSOR PHASE 6 — SERVE AND BUY

PROMPT:

Implement S1–S3 and B1–B3.

Be especially strict about:

policy-dependent classification

rebate tier types

claim windows

freight basis

restocking policies

Do not classify a hypothetical charge as detected leakage without a policy or contractual basis.

Implement Cash Claimable.

Run unit and golden tests.

Commit:

`phase-6: buy and serve detectors`

---

# 117. CURSOR PHASE 7 — BANKABILITY AND ACTION MODEL

PROMPT:

Implement §§20–29.

Low/base/high planning factors.

Evidence weights.

Commercial risk heuristic.

Price recommendation guardrails.

Static-volume upside.

Break-even volume analysis.

Margin Integrity Index.

Outcome data schema.

Do not implement fake elasticity.

Expose every assumption.

Build Assumptions panel with:

edit

reset

change log

immediate recalculation.

Commit:

`phase-7: bankability and action model`

---

# 118. CURSOR PHASE 8 — EXECUTIVE PRODUCT

PROMPT:

Build the CFO-quality authenticated/demo interface from §§75–84.

Must include:

Overview equation

Detected leakage

Modelled opportunity

Addressable margin

Bankability range

Cash Claimable

MII

Economic Coverage

The Bleed

Top actions

Leakage Ledger

Check Detail

Evidence Drawer

Customer 360

Product 360

Scenario Lab

Recovery Plan

Assumptions

Data Health

Settings

Command palette

Every value comes from engine.

No hard-coded demo figures.

Spend visual spectacle on The Bleed and scan-complete sequence.

Everything else precise.

Commit:

`phase-8: executive margin control product`

This is the first point at which CFO demonstrations may begin.

---

# 119. CURSOR PHASE 9 — AI INTERPRETATION

PROMPT:

Implement §§52–55 and §§100–101.

Create Anthropic provider interface.

Aggregate payload only.

Tokenised identifiers.

AI OFF by default for non-demo scans.

First-use payload preview.

Fact token narrative system.

No authoritative AI arithmetic.

Unknown fact tokens rejected.

Deterministic template fallback.

No request-body logging.

Build tests proving no raw identifiers leave application.

Commit:

`phase-9: controlled narrative layer`

---

# 120. CURSOR PHASE 10 — PRIVACY AND CYBER HARDENING

PROMPT:

Implement §§41–51.

Create:

Threat Model.

Security documentation.

Privacy Proof.

CSP.

COOP/COEP.

HSTS production config.

Permissions Policy.

Referrer Policy.

formula-injection protection.

malicious-file checks.

local-data wipe.

encrypted project format.

Argon2id-based key derivation using a vetted implementation.

AES-256-GCM.

Security tests.

Do not claim absolute security.

Commit:

`phase-10: privacy and security hardening`

---

# 121. CURSOR PHASE 11 — REPORTS

PROMPT:

Build §§93–95.

Board pack.

Action workbook.

Evidence Ledger CSV.

Encrypted MarginShield project file.

Use same calculations as dashboard.

No screenshots of numbers that could diverge.

PDF must carry:

period

run hash

method version

disclaimer

Generate sample report from Harbourline.

Commit:

`phase-11: board and action reports`

---

# 122. CURSOR PHASE 12 — MARKETING WEBSITE

PROMPT:

Build §§85–92.

Routes:

/

 /method

 /checks

 /privacy-by-design

 /pricing

 /sample-report

 /about

 /book

 /demo

 /legal/privacy

 /legal/terms

Public masthead:

MarginShield.

Subtle attribution:

by Evidence Room.

Never Adam Intelligence.

Use live Harbourline engine output.

Interactive hero.

No fake stats.

No fake logos.

No customer claims.

Mobile exceptional.

Marketing Lighthouse target ≥95 where realistic without compromising functionality/accessibility.

Commit:

`phase-12: public MarginShield website`

---

# 123. CURSOR PHASE 13 — AUTH AND PAYMENTS

PROMPT:

Implement §§96–99.

Supabase migrations.

RLS.

Auth.

Organisation creation.

Licensing.

Stripe test mode.

Commercial prices from configuration.

No raw data persistence.

Test cross-tenant isolation.

Commit:

`phase-13: commercial access layer`

---

# 124. CURSOR PHASE 14 — QA AND LAUNCH

PROMPT:

Run full acceptance suite.

Typecheck.

Lint.

Unit.

Property.

Golden.

Privacy.

Security.

E2E.

Accessibility.

Performance.

Visual.

Production build.

Dependency audit.

Licence audit.

Secret scan.

Fix every critical issue.

Review every route manually.

Review 1440, 1024, 768 and 390 layouts.

Search repository for:

Adam Intelligence

placeholder

TODO

lorem ipsum

hard-coded Harbourline headline figures outside fixture/ground-truth files

dangerouslySetInnerHTML

console.log containing data

unapproved external domains

Fix findings.

Create:

`docs/LAUNCH.md`

Commit:

`phase-14: launch hardening`

---

# 125. CURSOR RULE — PROJECT

`.cursor/rules/00-project.mdc`

```text
---
description: MarginShield project-wide rules
alwaysApply: true
---

docs/BLUEPRINT.md is authoritative.

Public brand is MarginShield.
Secondary brand attribution is "by Evidence Room".
Never use Adam Intelligence.

Never fabricate product functionality.

Never hard-code analytical dashboard values.

TypeScript strict.
No any unless a documented third-party boundary absolutely requires it and wrapper restores typing.

Australian English in user-facing copy.

Use Harbourline synthetic data only in development, tests, screenshots and demos.

At the end of every phase:
typecheck
lint
tests
visual check
documentation
commit
```

---

# 126. CURSOR RULE — FINANCIAL METHOD

`.cursor/rules/10-method.mdc`

```text
---
description: MarginShield analytical integrity rules
alwaysApply: true
---

Do not call modelled pricing gaps "detected leakage".

Every finding has:
value_class
basis_class
evidence_grade
status

All money arithmetic occurs deterministically using DECIMAL in DuckDB.

LLMs never authoritatively calculate financial values.

Every dollar displayed must be traceable.

Overlapping sell-side findings use tranche allocation.

No opportunity is counted more than once.

Never silently assume missing rebates, freight, duties, FX, agreements, floors or policies.

Missing evidence reduces coverage or causes NOT ASSESSED.

All assumptions are visible and versioned.
```

---

# 127. CURSOR RULE — PRIVACY

`.cursor/rules/20-privacy.mdc`

```text
---
description: Privacy and data handling
alwaysApply: true
---

Raw row-level client data never leaves the browser in v1.

Never log:
customer names
SKU codes
invoice numbers
transaction rows
uploaded file content

No analytics on app/demo scan routes.

AI payload is aggregate and tokenised.

The engine must work with AI disabled.

Uploaded content is untrusted input.

Never execute macros, formulas or external workbook links.

Never use dangerouslySetInnerHTML with uploaded content.
```

---

# 128. CURSOR RULE — ENGINE

`.cursor/rules/30-engine.mdc`

```text
---
description: Deterministic MarginShield engine rules
globs: packages/engine/**
alwaysApply: false
---

Use DuckDB DECIMAL for authoritative money calculations.

Engine is deterministic.

No randomness.
No current-time dependence.
No network during analytical execution.

Same input + config + engine version = same output and run hash.

Every finding writes generic evidence references.

Every check has unit fixtures.

Thresholds live in configuration.

Do not weaken golden tests to hide methodology failures.
```

---

# 129. CURSOR RULE — UI

`.cursor/rules/40-ui.mdc`

```text
---
description: MarginShield Ledger UI rules
globs: apps/web/**/*.tsx,packages/ui/**
alwaysApply: false
---

Use design tokens only.

No raw component hex colours.

Sentence case.

Tabular numerals.

Negatives use accounting parentheses.

Detected leakage and modelled opportunity must be visually distinguishable.

Do not use colour as the only indicator.

One major orchestrated motion moment per screen maximum.

Respect reduced motion.

Tables use ledger rules and double-rule totals.

Every action has loading, success, failure and disabled states.

No fake buttons.
```

---

# 130. CURSOR RULE — SECURITY

`.cursor/rules/50-security.mdc`

```text
---
description: MarginShield security requirements
alwaysApply: true
---

Never commit secrets.

Never weaken CSP or privacy controls merely to make a dependency work without documenting why.

Treat uploaded files as hostile.

Sanitise exported spreadsheet text against formula injection.

Use vetted cryptography libraries and standard algorithms only.

Never implement custom crypto.

No request-body logging on sensitive routes.

Supabase RLS is mandatory.

Security claims must describe implemented controls, not aspirations.
```

---

# 131. CURSOR RULE — TESTS

`.cursor/rules/60-tests.mdc`

```text
---
description: Test integrity
globs: **/*.test.ts,tests/**
alwaysApply: false
---

Never change expected outputs merely because implementation fails.

If method changes intentionally:
document the decision,
update METHOD.md,
then update ground truth with explicit rationale.

Use only synthetic or hand-built fixture data.

Privacy and golden tests are release blockers.
```

---

# 132. DEMO SCRIPT

Ten-minute CFO flow.

## Minute 0–1

Ask:

> When supplier costs move, how do you know every customer-specific price actually catches up?

## 1–3

Open Harbourline messy files.

Drop.

Show local file processing.

Map.

Show data health.

Confirm sales tie-out.

## 3–4

Run scan.

Let scan-complete animation finish.

Stop speaking briefly.

## 4–5

Explain:

Detected leakage.

Modelled opportunity.

Expected bankable range.

Cash claimable.

## 5–7

The Bleed.

Open P3.

Open one customer.

Evidence Drawer.

Show source rows.

## 7–8

Scenario Lab.

Show break-even volume decline.

## 8–9

Privacy Proof.

Explain local processing.

## 9–10

Offer:

> Give us the exports you already use. We will run the same process on your economics without an ERP implementation.

Close:

> Can you produce the sales and cost exports for one historical year?

---

# 133. LAUNCH REQUIREMENTS

Before real customer data:

Employment/IP position reviewed.

Business structure appropriate.

Business name/IP reviewed.

Customer engagement agreement.

Confidentiality/data handling agreement.

Privacy policy.

Terms.

Professional indemnity/cyber insurance position reviewed.

Secure production environment.

RLS verified.

Stripe live config.

AI provider data-processing terms reviewed.

Sample report published.

Synthetic-demo tests green.

Security checklist green.

Do not use employer:

data  
devices  
credentials  
source systems  
code  
confidential methods  
working time

---

# 134. MVP SUCCESS TEST

MarginShield is commercially interesting only if real distributor data produces findings that satisfy all three:

### MATERIAL

Financially worth caring about.

### SURPRISING

Not already obvious from existing BI/reports.

### ACTIONABLE

Management can do something practical about it.

Do not judge success by UI praise.

---

# 135. CUSTOMER DISCOVERY METRICS

Track:

scan accepted

files supplied

time to mapped data

data coverage

findings reviewed

findings verified

findings rejected

actions approved

actions implemented

actual margin realised

repeat scan purchased

customer referral

These matter more than page views.

---

# 136. PRODUCT MOAT STRATEGY

Day-one moat is limited.

Do not claim otherwise.

Build compounding assets:

### Mapping intelligence

Recognise messy distributor exports.

### Leakage rules

Improve detector quality.

### Outcome Memory

Know which actions actually worked.

### Capture calibration

Replace generic planning assumptions with observed outcomes.

### Commercial cohorts

Improve comparison quality.

### Agreement understanding

Extract/normalise commercial terms.

### Process embedding

Monthly monitoring and recovery-plan workflow.

### Evidence history

Customer-specific longitudinal commercial record.

The long-term defensibility is:

**better commercial diagnosis + accumulated outcome evidence + workflow embedding**

not:

“we use AI.”

---

# 137. LONG-TERM PRODUCT ROADMAP

Phase A:

Founder-led file scan.

Phase B:

Self-service browser scan.

Phase C:

Monthly Margin Monitor.

Phase D:

Outcome learning.

Phase E:

Automated recurring imports/connectors.

Phase F:

Commercial action governance.

Phase G:

Quote-time margin guardrails.

Phase H:

Advanced price-response modelling.

Phase I:

Enterprise APIs.

Do not build Phase G before customers prove Phase A–C.

---

# 138. WHAT MARGINSHIELD MUST NEVER BECOME

Do not drift into:

generic BI

generic FP&A

accounting close software

CRM

full CPQ

ERP

AI chatbot

autonomous pricing engine

procurement suite

The wedge is:

# commercial margin control.

---

# 139. FINAL PRODUCT EXPERIENCE

Customer begins with:

four messy exports.

MarginShield identifies:

what data can be trusted.

reconstructs actual economics.

separates:

detected leakage

from:

modelled opportunity.

Every finding has evidence.

Overlapping gaps are counted once.

The CFO sees:

where to look.

The Commercial Director sees:

who should act.

The sales representative sees:

which customer/SKU relationships matter.

The reviewer sees:

why the calculation exists.

Management selects actions.

MarginShield records outcomes.

Next month:

MarginShield shows whether margin actually improved.

The product loop is:

# DETECT → PROVE → PRIORITISE → ACT → MEASURE → LEARN

---

# 140. FINAL WEBSITE HERO

**MarginShield**

# Protect every point of margin.

**Find evidence-backed leakage and commercial margin opportunities across every customer and product—without replacing your ERP.**

**Run the demo scan**

**Book a Margin Scan**

Supporting line:

**Transaction files are processed locally on your computer. Every finding is traceable to the source.**

Footer:

**MarginShield by Evidence Room**

---

# 141. FINAL POSITIONING

Do not say:

“AI finds hidden profits.”

Say:

> MarginShield reconstructs distributor economics line by line and identifies where realised pricing, costs, agreements and commercial policy no longer line up.

Do not say:

“we guarantee margin recovery.”

Say:

> MarginShield distinguishes evidence-backed leakage from modelled opportunity and provides a transparent planning range for what may be bankable.

Do not say:

“proprietary pocket-price waterfall.”

Say:

> MarginShield combines established transaction-economics concepts with its Leakage Ledger methodology for classification, evidence, overlap control, bankability planning and outcome measurement.

---

# 142. ULTIMATE ACCEPTANCE TEST

The complete build is not ready until this works end-to-end:

1. User opens MarginShield.
2. Loads Harbourline messy files.
3. No raw data uploads.
4. Files are classified.
5. Fields are mapped.
6. Data is normalised.
7. Duplicates are identified.
8. Economic coverage appears.
9. User confirms tie-out.
10. Deterministic engine runs.
11. Price/cost waterfall computes.
12. P1–P7 run.
13. S1–S3 run.
14. B1–B3 run.
15. Overlap allocation runs.
16. Findings are classified correctly.
17. Detected leakage is separate from modelled opportunity.
18. Bankability low/base/high computes.
19. Cash entitlement computes.
20. MII computes.
21. Overview loads from engine.
22. The Bleed renders.
23. User drills to P3.
24. Opens a finding.
25. Sees actual formula.
26. Sees source rows.
27. Opens customer view.
28. Tests a new price.
29. Sees static-volume upside.
30. Sees break-even volume decline.
31. Adds action.
32. Changes an assumption.
33. Numbers recalculate.
34. Generates board PDF.
35. Generates action workbook.
36. Generates evidence ledger.
37. Saves encrypted project.
38. Reopens identical project.
39. Optional AI commentary uses aggregate fact tokens only.
40. Privacy test confirms no rows leave browser.
41. All tests pass.
42. Production build passes.
43. Marketing demo uses same engine.
44. Mobile website works.
45. No prohibited brand references remain.

Only then call the MVP complete.

---

# 143. FINAL COMMAND TO CURSOR

You now have the complete specification.

Begin with Phase 0.

Do not respond merely with a plan.

Create the repository and execute the implementation.

At the start of each new phase:

re-read the relevant sections of `docs/BLUEPRINT.md`.

At the end of each phase:

run all phase-relevant tests.

Fix all failures.

Inspect important screens.

Record design/technical departures in `docs/DECISIONS.md`.

Commit.

Continue sequentially.

Financial integrity outranks visual polish.

Privacy outranks convenience.

Evidence outranks AI prose.

Accuracy outranks impressive-looking opportunity totals.

But after those are satisfied, the visual experience must be exceptional.

The final MarginShield product should feel like an enterprise commercial-control platform a CFO could credibly buy—not a dashboard created by an AI coding tool.

Build MarginShield.
