# A04 — Exception Triage Agent

**Stack ID:** A04  
**Domain:** Classify, prioritize, route, and SLA-manage AP exceptions  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Exception Manager

---

## Job description

Own the exception queue. Classify every break using the Exception Taxonomy, prioritize by financial and operational risk, assign the correct resolver (A08 supplier, A09 internal, Procurement, Tax, human specialist), track SLA, and close with evidence. Convert chaos into a managed work system.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Turn unstructured breaks into owned, timed, coded cases |
| **How** | Taxonomy coding → risk score → routing → SLA clock → closure verification |
| **Who** | AP Exception Manager; resolvers per taxonomy; Audit for coding quality |

---

## Inputs

- Exception Cases from A02, A03, A05, A10, A11, A12
- Exception Taxonomy (`Process_Mapping/01_EXCEPTION_TAXONOMY.md`)
- Vendor risk tier, invoice amount, age, dispute history
- Org routing matrix (who owns which code)
- Prior root-cause tags (A15)

## Tools / data required

- Exception workbench / case system
- Taxonomy service
- SLA engine
- Notification / task APIs for A08/A09
- A16 priority policy

---

## Responsibilities

1. Accept inbound exceptions; reject incomplete payloads back to source agent.
2. Assign primary + secondary taxonomy codes (≥1 required).
3. Score priority: amount × age × vendor criticality × control risk.
4. Route to resolver with clear ask and evidence pack.
5. Enforce SLA; escalate on breach.
6. Verify resolution evidence before closing; reopen if weak.
7. Feed patterns to A15 (Root Cause) and A14 (Reporting).

---

## Explicit exclusions

- Does **not** permanently waive match breaks without policy approver.
- Does **not** authorize payment to “clear the queue.”
- Does **not** change PO/vendor master as a shortcut.
- Does **not** close exceptions without evidence.
- Does **not** relabel fraud — A10 signals stay investigative.

---

## Human owner

**AP Exception Manager**  
Backup: AP Manager. Owns taxonomy adherence and queue health.

---

## Approval requirements

| Action | Approval |
|---|---|
| Close high-amount exception | Amount-band approver |
| Taxonomy code add/change | Owner + Controller + Audit advise |
| SLA change | AP Manager |
| Bulk close / mass waive | Controller; generally prohibited |

---

## Escalation criteria

- SLA breach on critical vendor / high amount → AP Manager same day
- Control-sensitive codes (duplicate pay risk, bank change) → Controller + Security as coded
- Queue backlog > capacity band → temporary surge staffing plan
- Coding accuracy fail in sample → halt auto-route; retrain

---

## Output standard

**Exception Case Record:**
- IDs linked (invoice, PO, GR)
- Taxonomy codes + definitions snapshot
- Priority, owner, SLA due
- Evidence pack checklist
- Status history
- Closure reason + evidence URIs
- Links to A08/A09 tasks

---

## Control requirements

- Mandatory taxonomy on every open exception
- No orphan exceptions (always named owner)
- Closure evidence required for material codes
- SoD on waive vs pay

---

## Audit evidence

- Full case timeline
- Coding sample reviews
- SLA breach log
- Waive/override approvals

---

## KPIs

| KPI | Concept |
|---|---|
| Exception rate | Exceptions / invoices |
| % coded correctly (sample) | Correct primary code / sample |
| SLA attainment | On-time closes / due |
| Ageing (>$ band) | Count/value >30/60/90 |
| Reopen rate | Reopened / closed |
| Cost per exception | Touch cost / cases |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow classify/prioritize |
| 1 | Recommend code & route |
| 2 | Auto-route low-risk codes with confirm rules |
| 3 | Bounded auto-triage for mature codes |
| 4 | Charter only |

---

## Failure handling

- Unknown taxonomy → hold in “unclassified” with human within SLA (short)
- Resolver unreachable → escalate ladder; do not drop
- Conflicting codes → primary = highest control risk

---

## Cost monitoring

Track case compute, notification volume, human touch time estimates. Prioritize automation on high-volume low-risk codes first.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Misroute delays payment/credit | Routing matrix; samples | Misroute rate | Case audits |
| Queue gaming (wrong codes) | Sample coding QA | Coding accuracy | QA sheets |
| Silent closes | Evidence mandatory | Reopen rate | Closure packs |
