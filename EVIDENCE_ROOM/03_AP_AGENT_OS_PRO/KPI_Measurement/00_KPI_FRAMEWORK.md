# KPI Framework — AP Agent OS

**Purpose:** Measure what matters for AP agent performance: activity (throughput), operational excellence, financial outcomes, and risk/control health.  
**Rule:** No vanity metrics. If a metric does not change a decision, drop it.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | A certified metric dictionary for agents and leadership |
| **How** | Formulas below; A14 publishes; baselines before autonomy raises |
| **Who** | AP Analytics Lead (dictionary); Controller (financial/risk metrics); AP Manager (ops) |

---

## Design principles

1. **Separate layers:** Activity ≠ Operational ≠ Financial ≠ Risk-control.  
2. **Rates over raw volumes** for quality; volumes OK as context only.  
3. **Denominators explicit** (per invoice, per case, per $ processed).  
4. **Ranges OK** when data incomplete — no false precision.  
5. **Benchmarks are external context**, not client KPIs (see Business Case).  
6. **Tie to autonomy:** graduation uses quality/risk metrics, not “messages sent.”

---

## A. Activity metrics (context & capacity)

| KPI | Formula | Decision use | Vanity watch |
|---|---|---|---|
| Invoices ingested | Count of Invoice Cases created in period | Staffing/channel capacity | Don’t celebrate alone |
| Pages/docs processed | Count docs by channel | IDR capacity planning | Not success |
| Agent actions executed | Count allowed actions by agent | Load | Not quality |
| Exceptions opened | Count Exception Cases | Workload | Pair with rate |
| Statements reconciled | Count Statement Cases completed | Coverage planning | Pair with unmatched $ |

**Activity rate (useful):**  
`Exceptions opened ÷ Invoices ingested`

---

## B. Operational metrics (speed & flow)

| KPI | Formula | Notes |
|---|---|---|
| Invoice cycle time | `Timestamp(payment proposal ready or paid per policy) − Timestamp(ingested)` | Define endpoint consistently; state which |
| Time in status | Sum/average duration by status (intake, validate, match, exception, approval) | Finds bottlenecks |
| First-pass yield (FPY) | `Invoices with zero exceptions ÷ Invoices ingested` | Core health |
| Clean match rate | `CLEAN matches ÷ Match attempts` | Watch tolerance inflation separately |
| Tolerance match rate | `TOLERANCE matches ÷ Match attempts` | Control companion |
| Exception SLA attainment | `Exceptions closed on/before SLA ÷ Exceptions due` | By taxonomy optional |
| Approval cycle time | `Final approve − workflow start` | |
| GR lag | `GR posted − invoice ingested` (or vs delivery date if better SoR) | For 3-way population |
| Straight-through processing (STP) | `Invoices reaching proposal without human touch ÷ ingested` | Define “touch”; exclude pure L0 shadow |
| Reopen rate | `Exceptions reopened ÷ Exceptions closed` | Quality of closure |

Use medians + p90; averages alone hide tails.

---

## C. Financial metrics (outcomes)

| KPI | Formula | Notes |
|---|---|---|
| Cost per invoice (CPI) | `(AP labor cost allocated + agent/tool cost + outsource) ÷ invoices processed` | Define allocation; show as range if needed |
| Cost per exception | `Exception-handling cost ÷ exceptions closed` | |
| Discount capture rate | `$ discounts taken ÷ $ discounts economically available` | Define “available” (terms + cash) |
| Duplicate payment $ (confirmed) | Sum of confirmed duplicate payments in period | Investigate recoveries separately |
| Recoveries | $ recovered from duplicates/credits | Don’t net into CPI silently — show apart |
| Late payment fees / lost early pay | Fees paid + estimated missed discount $ | Estimate band OK |
| AP ageing (AP $) | Open AP by 0–30/31–60/61–90/90+ | Tie to disputes vs process |
| Accrual true-up variance | `|Accrual − actualize| ÷ Accrual` for sampled vendors | Close quality |

**Do not** claim industry CPI as your own. External reference appears only in Business Case with citation.

---

## D. Risk & control metrics (non-negotiable)

| KPI | Formula | Target posture |
|---|---|---|
| Hold escape rate | `Payments released with active hard hold ÷ Payments released` | ~0 |
| False PASS rate (validation) | `Incorrect PASS ÷ sampled PASS` | Minimize; gate autonomy |
| False clean match rate | `Incorrect CLEAN ÷ sampled CLEAN` | Minimize |
| Exact duplicate precision @ hold | `Confirmed dups ÷ holds at threshold` (sample) | Balance with recall |
| Duplicate recall (test set) | `Caught ÷ known/injected dups` | Periodic test |
| SoD breaks | Count of SoD exceptions | Investigate each |
| Unauthorized pay-path success | Count agent-originated releases | **Must be 0** |
| Autonomy policy violations | Denied actions that were attempted improperly | Monitor attempts |
| Coding accuracy | `Correct primary taxonomy ÷ sampled exceptions` | ≥ agreed |
| Override rate | `Manual overrides ÷ decisions` | Explain spikes |
| Kill-switch drill pass | Pass/fail | Quarterly |
| Vendor bank change control defects | Defects ÷ change requests | ~0 defects |

---

## E. Agent economics (cost monitoring)

| KPI | Formula |
|---|---|
| Cost per case by agent | `Direct agent compute + allocated platform ÷ cases handled` |
| Budget variance | `Actual agent spend ÷ Budget` |
| Throttle events | Count of budget/circuit-breaker triggers |

Alert 125%; throttle 150% (default governance).

---

## Metric ownership & certification

| Layer | Owner | Certification |
|---|---|---|
| Activity | AP Manager | Operational |
| Operational | AP Manager | Operational |
| Financial | Controller | Certified vs subledger where claimed |
| Risk-control | Controls Lead / Audit | Certified |
| Agent cost | Platform + AP Manager | Monthly |

A14 labels each pack: **Certified** vs **Provisional**.

---

## Autonomy gates (use these, not vanity)

Promotion evidence should include, as applicable:
- FPY or decision accuracy
- False PASS / false clean
- Hold escape (~0)
- Cost per case within budget
- Coding accuracy (A04)
- Sampling coverage completed

---

## Anti-vanity list (do not use as success)

- Raw OCR page counts  
- Number of LLM prompts  
- Emails sent by A08/A09 without response quality  
- “AI touches” without outcome  
- Green dashboard % without definition stability  

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Definition drift | Versioned dictionary | Change count | Dictionary git/doc versions |
| Gaming STP | Strict “touch” definition | Audit STP sample | Samples |
| False precision | Allow ranges | % metrics with quality flags | Packs |

---

## Related

- A14 Reporting Agent  
- Business Case model inputs  
- Autonomy Progression thresholds  
