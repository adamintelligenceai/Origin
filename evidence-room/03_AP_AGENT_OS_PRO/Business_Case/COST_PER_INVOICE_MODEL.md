# Cost-per-invoice model

**Product:** Evidence Room — AP Agent OS · Professional  
**Use:** Compute *your* processing cost per invoice as a range, with a named method.  
**Not:** A benchmark service. Not a claim that you will move from $12.88 to $2.78.

---

## 1. Why a range

Cost per invoice is sensitive to what you put in the numerator. Teams that exclude plant liaisons, exception overtime, and capture licences publish a number that cannot be compared to teams that include them. Publish a **range** (narrow/central/inclusive) or do not publish a headline figure.

Round to two significant figures (e.g. $8.40–$11). False precision ($8.37) implies a measurement you did not perform.

---

## 2. Numerator — three envelopes

| Envelope | Include | Exclude |
|---|---|---|
| **Narrow** | In-scope AP specialist + lead loaded cost | Capture vendor, ERP AP module, plant time, treasury time |
| **Central** | Narrow + capture/IDR licence allocated to AP + exception overtime | ERP core licence, procurement, warehouse |
| **Inclusive** | Central + estimated plant liaison hours + payment-run specialist time | Bank fees, early-pay discounts (those are cash terms, not processing) |

State the envelope on the slide. Do not compare your Narrow to someone else’s Inclusive.

Late-payment *fees* you already book may be shown as a **separate** per-invoice line. Do not bury them in processing cost. Early-pay discounts captured are a **separate** line with the opposite sign — only if you have the booked amount.

---

## 3. Denominator

| Rule | Practice |
|---|---|
| In-scope only | Same definition as diagnostic F1 |
| Count invoices, not lines | Unless you truly process at line level and say so |
| Window | Trailing twelve months preferred |
| Do not count stubs | Intake failures that never became invoices stay out of the denominator (they may have a cost — put that in a capture-fail note) |

`Cost per invoice = Numerator / I1`

---

## 4. Build sequence

1. Lock I1 (volume) and I2–I3 (people).
2. Choose envelope.
3. Add allocated licences you can evidence (invoices, not “10% of Coupa”).
4. Sample exception minutes (I6) if you want a labour-minutes check: `D3 × hourly` should be *less than* people cost (people do other work). If exception labour exceeds people cost, your minutes or rate is wrong — fix the input; do not average.
5. Produce Narrow / Central / Inclusive.
6. Optionally compute **cost per *exception*** = exception labour / exception count — useful for triage design, not as a board headline.

---

## 5. After a layer exists

Add a second pair of numbers:

| Metric | Formula |
|---|---|
| Path processing cost / invoice | Same envelope as baseline, same window definition |
| Layer cost / 1,000 invoices | `(tools + model + sampled exception minutes attributable to the agents) / invoices × 1000` |

Report them **side by side**. Do not subtract them into “savings” unless Finance has validated the method in `KPI_FRAMEWORK.md`. Estimated hours released ≠ validated savings.

---

## 6. External figures (context only)

Ardent Partners *State of ePayables 2024*, as cited by Tipalti (**vendor-originated citation of independent research**): **$2.78** vs **$12.88** cost per invoice; **3.1** vs **17.4** days. If you show this pair, show both ends and the attribution. Do not drop your Inclusive $X next to $2.78 and call the gap a target.

Ardent *AP Metrics that Matter 2025*, as cited by Tipalti: exception **22% → 9%** in that research comparison. Same rule.

---

## 7. Northline illustration (fictional)

Volume 180,000. People cost ~$1.8m (21 FTE × $85k, round). Narrow ≈ $10/invoice. Central adds a fictional $120k capture allocation → ≈ $11. Inclusive adds fictional liaison time → ≈ $12. Layer cost at $40k tools → ≈ $0.22 per invoice or $220 per thousand. These are **made-up**. They teach envelopes. They are not Evidence Room results.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Cost-per-invoice model |
| Related | `BUSINESS_CASE_MODEL.md`, KPI framework |
| Status | Edition 1.0.0 |
