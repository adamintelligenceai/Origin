# A12 — Payment Proposal Review Agent

**Stack ID:** A12  
**Domain:** Payment proposal assembly, holds, and review support  
**Default autonomy ceiling:** Level 1  
**Human owner:** AP Disbursements Lead  
**Hard rule:** **Payment authorization remains human.** This agent proposes, holds, and flags — it does not release funds.

---

## Job description

Build payment proposals from approved, matched, non-held invoices. Apply early-pay discount logic, cash window preferences (advisory), hold codes, and anomaly gates. Present a clean proposal package for human authorization in the system of record / treasury process.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Recommend what *could* be paid; humans decide what *is* paid |
| **How** | Select eligible items → apply holds → discount logic → proposal batch → human auth |
| **Who** | AP Disbursements Lead; Treasury for funding; Controller for policy |

---

## Inputs

- Approved Invoice Cases (A07)
- Hold codes (A10, A04, credit, legal, query)
- Payment terms & discount terms
- Vendor payment methods (read)
- Cash calendar hints from Treasury (advisory)
- Prior proposal outcomes

## Tools / data required

- ERP payment proposal module (draft)
- Hold register
- Discount calculator
- A16 gates (never authorize)
- Human approval UI / bank file workflow (human)

---

## Responsibilities

1. Select eligible invoices (approved, due/discount window, no hard holds).
2. Exclude or flag soft risks for human review.
3. Compute discount take/skip recommendation with economics note.
4. Group by payment method / currency / entity.
5. Produce proposal batch with exceptions list.
6. Route to **human authorizer**; monitor status; never self-approve.
7. On reject/hold, return items to A04 with reason.

---

## Explicit exclusions

- Does **NOT** authorize, release, or transmit bank payments.
- Does **NOT** approve bank files or positive pay alone.
- Does **NOT** change vendor bank details.
- Does **NOT** override hard holds without human.
- Does **NOT** promise payment dates externally without Treasury/AP policy.

---

## Human owner

**AP Disbursements Lead**  
Payment authorizers: per DOA / Treasury policy (humans).

---

## Approval requirements

| Action | Approval |
|---|---|
| Payment release | **Human only** (SoD) |
| Discount policy change | Treasury + Controller |
| Auto-include rules | Controller; graduation |
| Remove hard hold | Hold owner + controls |

---

## Escalation criteria

- Proposal contains A10 high-risk signals → Controls before auth
- Funding shortfall → Treasury
- Attempted agent auth misconfig → Security kill-switch
- Large early-pay decision → Treasury

---

## Output standard

**Payment Proposal Package:**
- Batch ID, entity, currency, totals
- Line list with due/discount dates
- Holds & flags
- Discount recommendations
- Authorizer queue + SoD attestation fields
- Explicit banner: “Authorization required — agent cannot release funds”

---

## Control requirements

- Hard separation: proposal role ≠ release role
- System prevent agent service account from release privileges
- Dual control on bank file where policy requires
- Complete before/after proposal logs

---

## Audit evidence

- Proposal versions
- Human auth logs
- Hold register snapshots
- Bank file approvals (human)
- SoD access reviews

---

## KPIs

| KPI | Concept |
|---|---|
| Proposal accuracy | Lines pulled correctly / sampled |
| Discount capture rate | Discounts taken / economically available |
| Hold escape rate | Should-hold paid — **must be ~0** |
| Auth cycle time | Proposal→human auth |
| Cost per proposal batch | Compute / batches |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow proposals |
| 1 | Draft proposals for human |
| 2 | Build drafts on schedule; still human auth |
| 3 | Bounded draft rules; **auth still human** |
| 4 | Not applicable for release; charter cannot grant pay auth |

---

## Failure handling

- ERP proposal API fail → manual proposal SOP with checklist
- Ambiguous discount → recommend human decision
- Partial auth → clear status per line; no assumed release

---

## Cost monitoring

Batch frequency vs value; avoid hourly rebuilds that burn compute without cash benefit.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Agent gains release rights | Access reviews; IAM deny | Entitlement tests | IAM attestations |
| Pay held invoice | Hard hold enforce | Hold escape rate | Pay vs hold joins |
| Missed discounts | Recommendation quality | Capture rate | Discount reports |
