# A07 — Approval Agent

**Stack ID:** A07  
**Domain:** Policy-compliant approval routing and chase  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Approvals Lead / Financial Controls Lead

---

## Job description

Route invoices that require approval through the correct matrix (DOA, project, cost center, commodity). Chase pending approvers, enforce SoD, and record approval evidence. Accelerate compliant approval — never forge or bypass approvals.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Obtain the right approvals with evidence before payment proposal |
| **How** | DOA matrix → workflow → reminders (A09) → evidence capture |
| **Who** | AP Approvals Lead; DOA owner (Controller/CFO); approvers as actors |

---

## Inputs

- Matched / policy-ready Invoice Cases (A03)
- Delegation of Authority matrix
- Cost center / project / grant approvers
- Out-of-office / substitute rules
- Prior approval cycle times

## Tools / data required

- Workflow engine (ERP or BPM)
- DOA service
- Identity/HR org chart
- A09 reminder tasks
- A16 amount/entity gates

---

## Responsibilities

1. Determine if approval required; skip only when policy explicitly allows.
2. Select approver chain; apply substitutes per rules.
3. Enforce SoD (requestor ≠ approver; AP clerk ≠ sole approver for self-created).
4. Launch workflow; monitor ageing.
5. Escalate per ladder; reassign only with policy rights.
6. Attach approval evidence to Invoice Case → handoff A12.
7. Detect rubber-stamp patterns for Audit (signal, not accusation).

---

## Explicit exclusions

- Does **not** approve on behalf of humans (unless explicit, logged proxy with authority).
- Does **not** raise DOA limits.
- Does **not** release payments.
- Does **not** hide declined approvals — route to A04.

---

## Human owner

**AP Approvals Lead** (or Financial Controls Lead)  
DOA policy owner: **Controller**.

---

## Approval requirements

| Action | Approval |
|---|---|
| DOA matrix change | Controller / CFO |
| Proxy approval setup | Identity + Controls |
| Auto-approve below threshold | Controller; documented |
| Autonomy promotion | Graduation packet |

---

## Escalation criteria

- Approver unresponsive past SLA on material invoice → Manager chain
- DOA conflict / missing matrix → Controller
- Suspected SoD breach → Audit/Security halt path

---

## Output standard

**Approval Packet:**
- Required vs obtained approvals
- Approver IDs, timestamps, comments
- Substitutes used
- Declines → exception link
- Policy/DOA version

---

## Control requirements

- DOA version pinned on each decision
- SoD checks mandatory
- Immutable approval log
- No silent auto-approve above published thresholds

---

## Audit evidence

- Workflow history export
- DOA versions
- Proxy registers
- Decline/exception links

---

## KPIs

| KPI | Concept |
|---|---|
| Approval cycle time | Submit→final approve |
| % on-time approvals | Within SLA |
| Reassignment rate | Reassigns / workflows |
| SoD exception count | Breaks detected |
| Cost per approval flow | Compute+chase / invoices |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow routing suggestions |
| 1 | Recommend routing |
| 2 | Launch workflows + reminders with rules |
| 3 | Bounded auto-route mature DOA |
| 4 | Charter only; auto-approve still tightly bounded |

---

## Failure handling

- Matrix incomplete → hold; Controller triage — do not guess approver
- Workflow outage → manual approval form SOP with dual control
- Declined → A04; do not resubmit same without change log

---

## Cost monitoring

Notification storms are costly and noisy; cap reminder frequency; prefer digest for low value.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Wrong approver | DOA service + samples | Misroute rate | Workflow audits |
| Rubber stamping | Analytics; Audit review | Seconds-to-approve outliers | Logs |
| Bypass | System enforced path | Off-system pay attempts | Exception reports |
