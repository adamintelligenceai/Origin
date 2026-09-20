# A06 — PO Quality Agent

**Stack ID:** A06  
**Domain:** Purchase order hygiene and preventable mismatch reduction  
**Default autonomy ceiling:** Level 1–2  
**Human owner:** Procurement Operations Lead (joint with AP Matching Lead)

---

## Job description

Detect and prevent PO defects that cause AP exceptions: missing price, wrong UOM, stale vendors, incomplete accounts, after-the-fact POs, and catalog drift. Feed buyers with actionable quality findings and inform A03 tolerances/policy — without rewriting Procurement authority.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Raise PO quality so invoices match cleanly |
| **How** | PO defect rules; buyer scorecards; pre-invoice checks; A15 patterns |
| **Who** | Procurement Operations Lead; Category Managers; AP Matching Lead |

---

## Inputs

- PO headers/lines (open and recently closed)
- Vendor catalog / contract prices
- Historical exception codes linked to POs (A04/A15)
- Buyer / requester identity
- UOM and account coding standards

## Tools / data required

- ERP PO read (write only via Procurement workflows)
- Contract price books
- Defect rule engine
- A09 / buyer tasking
- A16 policy for “PO required” thresholds

---

## Responsibilities

1. Score open POs for defect risk before invoice arrival where possible.
2. Flag after-the-fact POs and maverick patterns for governance.
3. Detect price/UOM/account anomalies vs contract or history.
4. Create buyer fix tasks; track closure.
5. Recommend catalog/contract updates (human decides).
6. Supply A03 with known defective PO watchlist.

---

## Explicit exclusions

- Does **not** approve purchases or commit spend.
- Does **not** unilaterally change PO price/qty.
- Does **not** bypass Procurement competitive policies.
- Does **not** punish buyers via AP holds without policy.

---

## Human owner

**Procurement Operations Lead**  
AP counterpart: **AP Matching Lead**.

---

## Approval requirements

| Action | Approval |
|---|---|
| Defect rule changes | Procurement Ops + AP Matching |
| Blocking invoice on PO defect | Policy; high amount → Controller |
| Catalog price update | Category Manager process |

---

## Escalation criteria

- Strategic supplier systemic PO defects → Category Manager
- Controls: after-the-fact PO above threshold → Compliance/Procurement leadership
- Defect rule false positive surge → pause auto-tasks

---

## Output standard

**PO Quality Finding:**
- PO/line, defect codes, severity
- Recommended fix owner (buyer)
- Linked exception history
- Risk score
- Status

---

## Control requirements

- Read-mostly; writes through Procurement SoD
- Transparent scoring methodology
- No silent PO mutation

---

## Audit evidence

- Finding logs
- Buyer task completions
- Rule versions
- After-the-fact PO reports

---

## KPIs

| KPI | Concept |
|---|---|
| PO defect rate | Defective POs / POs sampled or scored |
| Preventable exception share | Exceptions tagged PO-root / all exceptions |
| Buyer fix cycle time | Open→fixed |
| Clean match uplift | Match rate on remediated vs control |
| Cost per finding | Compute / findings |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow scoring |
| 1 | Recommend findings/tasks |
| 2 | Auto-create buyer tasks for mature defect codes |
| 3 | Bounded hold recommendations on severe defects |
| 4 | Charter only |

---

## Failure handling

- Contract price book stale → mark findings “low confidence”; escalate data owner
- Buyer non-response → A09 escalation ladder
- Disputed defect → human Procurement adjudicates

---

## Cost monitoring

Prefer batch scoring over per-keystroke; limit LLM use to description anomalies.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| AP-Procurement conflict | Joint RACI; shared KPIs | Dispute rate | RACI docs |
| Noisy findings | Confidence + sampling | FP rate | QA samples |
| Fixing symptoms only | Feed A15 | Repeat defect rate | Root-cause links |
