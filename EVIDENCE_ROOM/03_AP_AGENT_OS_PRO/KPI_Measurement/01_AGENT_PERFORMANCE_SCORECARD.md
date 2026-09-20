# Agent Performance Scorecard

**Product:** Evidence Room — AP Agent OS · Professional  
**Document ID:** ER-AP-KPI-001  
**Version:** 1.0  
**Audience:** AP Manager, Process Owner, Controller, Agent Owners  
**Purpose:** Define a balanced measurement system for AP agents — activity, operational outcomes, financial outcomes, and risk-control outcomes — with formulas, definitions, and validation status.

---

## 1. Design rules

1. **No vanity metrics as success criteria.** “Invoices touched by AI” or “prompts run” may appear as activity context only — never as proof of value or control.  
2. **Separate four outcome families.** Do not blend activity counts into financial savings slides without lineage.  
3. **Prefer rates and quality over raw volume** when judging agent readiness for autonomy.  
4. **Label every number:** **Validated** (recomputable from systems of record with documented logic) vs **Estimated** (model assumption, survey, or incomplete lineage).  
5. **Tie metrics to agent version** and period so comparisons are fair.  
6. **Payment on-time and cash metrics** remain multi-factor (Treasury policy, funding, supplier terms) — credit agents only for the AP-controllable contribution you can evidence.

---

## 2. Scorecard structure

| Section | Question answered |
|---------|-------------------|
| A — Activity | What did the agent touch and at what load? |
| B — Operational outcomes | Did work get faster, cleaner, straighter — with quality? |
| C — Financial outcomes | What cost and capacity effects are we willing to claim — and how sure are we? |
| D — Risk-control outcomes | Did controls hold? What breached? |

Each live agent gets a monthly pack with these four sections plus autonomy recommendation.

---

## 3. Section A — Activity metrics

*Context only. Insufficient for go-live or ROI claims.*

| Metric | Definition | Formula | Validated / Estimated |
|--------|------------|---------|----------------------|
| **Volume ingested** | Documents/events offered to agent in period | Count of intake IDs in scope | Validated if from intake ledger |
| **Volume completed by agent path** | Items that reached a terminal agent-supported state | Count terminal IDs with agent participation flag | Validated |
| **Abstain / escalate count** | Items agent refused or sent to human by design | Count where outcome ∈ {abstain, escalate} | Validated |
| **Human intervention count** | Items requiring human action beyond viewing | Count with intervention flag = true | Validated if workflow-coded |
| **Inference calls / tokens** | Model usage for cost monitoring | Sum of provider usage records | Validated from billing/API |
| **Queue backlog** | Open agent-related queue at period end | Open items snapshot | Validated |

**Anti-vanity note:** Rising “volume completed by agent path” with rising FN or control breaches is failure, not success.

---

## 4. Section B — Operational outcome metrics

### 4.1 Quality of cognition / extraction / match

| Metric | Definition | Formula | Validated / Estimated |
|--------|------------|---------|----------------------|
| **Classification accuracy** | Share of items where agent document/exception class = gold label | \( \frac{\text{correct classifications}}{\text{classified items in sample}} \) | **Validated** on sampled/gold set; population estimate if sample-based (disclose CI if used) |
| **Extraction accuracy** | Share of critical fields extracted exactly (vendor ID, invoice #, dates, amounts, PO, tax) | \( \frac{\text{critical fields correct}}{\text{critical fields evaluated}} \) (field-micro) **or** document-exact if all critical fields correct | **Validated** on sample; define critical field list in charter |
| **Matching accuracy** | Share of match decisions that agree with gold (match / mismatch / insufficient) | \( \frac{\text{correct match decisions}}{\text{decisions in sample}} \) | **Validated** on sample |
| **False positive rate (FP)** | Agent asserts “OK/match/not duplicate” (or clears) when gold says otherwise | \( \frac{\text{FP}}{\text{FP}+\text{TN}} \) **or** operational: \( \frac{\text{FP}}{\text{agent clear/OK decisions}} \) — **pick one definition and freeze it** | **Validated** on sample; state definition used |
| **False negative rate (FN)** | Agent asserts “exception/duplicate/hold” when gold says clear — **or** for duplicate agent: misses a true duplicate | For detection agents: \( \frac{\text{FN}}{\text{FN}+\text{TP}} \); document per agent | **Validated** on sample / known duplicate library |
| **Precision / Recall** (optional companion) | Standard IR definitions for detect-style agents | Precision \( \frac{TP}{TP+FP} \); Recall \( \frac{TP}{TP+FN} \) | **Validated** on labelled set |

**Gold label sources:** Expert AP review, historical posted-correct outcomes (careful with bias), or dual independent review on sample.

### 4.2 Flow and effort

| Metric | Definition | Formula | Validated / Estimated |
|--------|------------|---------|----------------------|
| **STP rate (straight-through)** | Share of in-scope items posted/closed without human exception handling | \( \frac{\text{STP items}}{\text{items in scope}} \) | **Validated** if workflow states encode human touches |
| **Human intervention rate** | Complement focused on interventions | \( \frac{\text{items with intervention}}{\text{items in scope}} \) | **Validated** |
| **Exception resolution rate** | Share of exceptions closed in period (or within SLA) | \( \frac{\text{exceptions closed in SLA}}{\text{exceptions due in period}} \) | **Validated** |
| **Median / P90 resolution time** | Time from exception open → terminal close | Median / P90 of durations | **Validated** from timestamps |
| **Time to posting** | Invoice receipt (or intake) → posted | Median / P90 | **Validated** if intake & post timestamps reliable |
| **Follow-up on-time rate** | Chases sent within SLA | \( \frac{\text{on-time follow-ups}}{\text{follow-ups due}} \) | **Validated** |
| **Repeat exception rate** | Exceptions reopening on same invoice/vendor defect class | \( \frac{\text{reopened exceptions}}{\text{closed exceptions}} \) | **Validated** if reopen coded |
| **Duplicates detected (true)** | Confirmed duplicates found by agent and verified | Count TP duplicates | **Validated** after human confirm |
| **Ageing reduction** | Change in aged open items (e.g. >30/60/90 days) vs baseline period | \( \text{Aged}_{t} - \text{Aged}_{baseline} \) (absolute and %) | **Validated** for counts; **attribution to agent = Estimated** unless controlled comparison |
| **Missing-receipt reduction** | Change in GR-missing exception stock vs baseline | Same pattern as ageing | Counts **Validated**; attribution **Estimated** without counterfactual |
| **PO compliance rate** | Share of invoices with valid PO per policy | \( \frac{\text{PO-compliant invoices}}{\text{invoices in scope}} \) | **Validated**; agent contribution **Estimated** if Procurement behaviour drives it |
| **Payment-on-time rate** | Payments meeting terms / discount policy | \( \frac{\text{on-time payments}}{\text{payments due}} \) | **Validated** as Treasury/AP metric; agent contribution **Estimated** |

---

## 5. Section C — Financial outcome metrics

All financial figures used externally or in business cases must state **Validated** vs **Estimated**. Illustrative planning ranges in the Business Case Model are not results.

| Metric | Definition | Formula | Validated / Estimated |
|--------|------------|---------|----------------------|
| **Cost per invoice** | Fully or partially loaded AP ops cost / invoice | \( \frac{\text{AP operating cost allocated}}{\text{invoices processed}} \) | **Estimated** unless activity-based costing is mature; document cost basis |
| **Cost per exception** | Cost allocated to exception handling / exceptions | \( \frac{\text{exception handling cost}}{\text{exceptions handled}} \) | Usually **Estimated** |
| **AI inference cost** | Model + OCR + orchestration variable cost | Sum of invoices from providers + allocated platform | **Validated** for vendor invoices; allocation **Estimated** |
| **Cost per correct outcome** | Variable AI + incremental review cost per TP/correct decision | \( \frac{\text{AI cost}+\text{incremental review cost}}{\text{correct outcomes}} \) | Hybrid: costs partly validated; denominator sample-based |
| **Hours released** | Hours no longer spent on tasks agent now performs | \( \sum (\text{baseline hours}-\text{current hours}) \) for scoped tasks | **Estimated** unless time-study / system effort capture exists; never equate 1:1 to FTE cash without management action |
| **Validated savings** | Cash or budget savings with finance evidence (reduced temps, avoided fees, recovered duplicates, etc.) | Sum of savings lines with evidence links | **Validated** only with evidence; otherwise label **Estimated** |
| **Avoided duplicate payments (value)** | Value of true duplicates stopped pre-pay | Sum of TP duplicate amounts blocked | **Validated** when block evidence exists; **do not** annualise aggressively without history |
| **Discount capture change** | Change in early-pay discounts taken | \( \Delta \) discount $ vs baseline | **Validated** as total; agent attribution **Estimated** |

**Rules for claiming savings**

- No double-counting across agents.  
- Do not report “hours released × fully loaded rate” as cash savings without a validated savings line.  
- Separate **capacity released** (can do more with same headcount) from **cost removed** (budget actually reduced).

---

## 6. Section D — Risk-control outcome metrics

| Metric | Definition | Formula | Validated / Estimated |
|--------|------------|---------|----------------------|
| **Control breach count** | Hard control violations (SoD, duplicate hard-block bypass, payment tool misuse, etc.) | Count by severity | **Validated** from incident/control logs |
| **Control breach rate** | Breaches per 1,000 invoices or per period | \( \frac{\text{breaches}}{\text{volume}} \times 1000 \) | **Validated** |
| **Escalation volume / rate** | Policy escalations triggered | Count; \( \frac{\text{escalations}}{\text{volume}} \) | **Validated** |
| **Escalation SLA breach rate** | Escalations not handled in SLA | \( \frac{\text{late escalations}}{\text{escalations}} \) | **Validated** |
| **Audit exceptions** | Internal/external audit exceptions related to agent process | Count / severity | **Validated** from audit trackers |
| **Rework rate** | Corrections after agent-influenced posting/proposal | \( \frac{\text{rework items}}{\text{agent-influenced items}} \) | **Validated** if rework reason codes exist |
| **Override rate** | Human overrides of agent recommendation | \( \frac{\text{overrides}}{\text{recommendations}} \) | **Validated**; high rate is diagnostic, not automatically bad |
| **Hard-control override count** | Dual-approved overrides of hard blocks | Count | **Validated**; spike = escalate |
| **Logging completeness failures** | Samples that cannot be reconstructed | Count in log QA sample | **Validated** |
| **Autonomy incidents** | Actions outside charter autonomy | Count | **Validated** |

**Autonomy rule:** Sustained breach of agreed risk-control gates → autonomy freeze or downgrade regardless of STP gains.

---

## 7. Metric dictionary — critical field & error conventions

| Term | Standard meaning in this pack |
|------|-------------------------------|
| **Critical fields** | Vendor identity, invoice number, invoice date, currency, gross/net/tax amounts, PO number (if PO process), entity, bank fields (never auto-written) |
| **TP / FP / FN / TN** | Defined per agent decision type in charter appendix — do not mix match-clear FP with duplicate-detect FP without relabelling |
| **Intervention** | Human edit, approve, reject, or manual post required for progression |
| **STP** | No intervention as defined above; viewing a dashboard does not break STP |
| **Gold set** | Versioned labelled sample; size disclosed monthly |

---

## 8. Suggested gates (illustrative — set locally)

Gates below are **starting templates**, not universal standards. Controllers set binding numbers.

| Agent type | Example shadow/pilot gates |
|------------|----------------------------|
| Extraction / Validation | Extraction accuracy ≥ agreed % on critical fields; fabricated-ID defects = 0 on sample |
| Matching | FP and FN within agreed bands; no material overpay from FP in pilot |
| Duplicate detection | Recall on known-duplicate library ≥ agreed %; hard-block single-person override = 0 |
| Follow-up | On-time rate ≥ agreed %; zero emails to non-master contacts |
| Payment proposal review | Checklist completion 100%; payment-release entitlements on agent = 0 |

---

## 9. Monthly scorecard pack — minimum contents

1. Agent name, version hash, autonomy level, entity scope  
2. Section A–D tables with Validated/Estimated labels  
3. Trend vs prior 3 periods  
4. Top defect / disagreement codes  
5. Incidents and breaches  
6. Cost: inference + allocated platform  
7. Decisions: maintain / remediate / downgrade / promotion request  
8. Owner sign-off  

**Template:** `Templates/T23_Monthly_Scorecard_Pack.md`

---

## 10. Mapping metrics to the 16 agents (primary)

| Agent | Primary metrics (non-exhaustive) |
|-------|----------------------------------|
| 1 Intake | Volume, duplicate intake, reject rate, injection blocks |
| 2 Validation | Extraction/classification accuracy, abstain, fabricated-ID defects |
| 3 Matching | Match accuracy, FP/FN, time to posting, STP |
| 4 Exception Triage | Resolution time, SLA, repeat exceptions, orphan rate |
| 5 Goods Receipt | Missing-receipt stock, wrong GRN defects, cut-off exceptions |
| 6 PO Quality | PO defect codes, PO compliance (with Procurement) |
| 7 Approval | Approval SLA, matrix breaches, packet privacy incidents |
| 8 Supplier Resolution | On-time replies, wrong-contact incidents, template compliance |
| 9 Internal Follow-Up | Follow-up on-time, escalation SLA, chase completeness |
| 10 Duplicate & Anomaly | TP duplicates, FP/FN, hard overrides, drift |
| 11 Statement Rec. | Open-item ageing, clear-without-ID defects, abstain |
| 12 Payment Proposal Review | Checklist completion, bank mismatch flags, (human) payment-on-time context |
| 13 AP Close | Close task completion, accrual substantiation exceptions, version freeze breaks |
| 14 AP Reporting | Tie-out failures, distribution incidents, metric dictionary breaches |
| 15 Root Cause | Actions with evidence, backlog ageing, repeat issue reduction |
| 16 Orchestrator | Cross-queue SLA, conflict open writes, autonomy self-elevation attempts = 0 |

---

## 11. Related documents

- `Business_Case/01_AP_AGENT_BUSINESS_CASE_MODEL.md` — uses these definitions; requires Validated vs Estimated discipline  
- `Testing/01_SHADOW_PILOT_UAT.md` — measurement during shadow/pilot  
- `Governance/02_AGENT_CONTROL_MATRIX.md` — escalation triggers consume these metrics  
- `09_RESEARCH/` — any external benchmark cited in targets must appear in the Research Ledger  

---

## Document control

| Version | Change |
|---------|--------|
| 1.0 | Initial scorecard & metric dictionary |

**Disclaimer:** Meeting illustrative gates does not guarantee savings, audit outcomes, or future model performance. Metrics without lineage must not be presented as validated results.
