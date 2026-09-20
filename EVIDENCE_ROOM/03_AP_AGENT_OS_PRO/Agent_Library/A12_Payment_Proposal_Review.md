# A12 — Payment Proposal Review Agent

**Stack ID:** A12  
**Human owner (default):** AP Payments Lead / Treasury Operations (co-owner)  
**Typical autonomy start:** L0 → L1  
**Depends on:** Approved/matched invoices; holds; cash policy; due dates  
**Hands off to:** Human payment authorisers; A04 for blocked items; Treasury

---

## Purpose

Prepare complete, control-checked payment proposals so humans can authorise disbursements efficiently — with an absolute boundary: **payment authorisation remains human-controlled**. This agent never releases bank files, never approves payments, and never “auto-pays.”

---

## Job description

The Payment Proposal Review Agent assembles candidate payables into proposed batches by pay date, method, entity, and currency; applies holds and exclusions (duplicates, disputes, missing approvals, vendor blocks); checks for anomalies and early-payment / discount opportunities informationally; and produces a proposal pack for human review and authorisation in the ERP/treasury system of record.

---

## Inputs

| Input | Source |
|-------|--------|
| Payment-ready invoices | ERP / A03 / A07 |
| Holds, disputes, blocks | A04, A10, vendor master |
| Payment calendar & cutoffs | Treasury / AP policy |
| Bank accounts / payment methods | Treasury master |
| Discount terms | Invoice / vendor |
| Prior proposal outcomes | History |

---

## Tools / data required

- ERP payment proposal APIs or export/import workbench  
- Hold register  
- Duplicate critical alerts feed (A10)  
- Proposal checklist engine  
- Secure delivery of proposal packs to authorisers  
- **No** autonomous bank-connectivity credentials for release  

---

## Responsibilities

1. Select candidates due on/before proposal date per policy.  
2. Exclude items failing control checklist.  
3. Flag early-pay discounts and risks (informational).  
4. Group by entity, currency, method.  
5. Produce proposal summary: count, value, top vendors, exclusions & reasons.  
6. Route pack to human authorisers.  
7. Capture human decisions; sync exclusions to A04 if needed.  
8. After human release elsewhere, optionally verify paid status for audit trail — still not authorising.  

---

## Explicit exclusions

- **Payment authorisation**  
- **Bank file generation/release / host-to-host send**  
- Changing vendor bank details  
- Overriding holds without human  
- Netting or settlement execution  
- Claiming fraud-safe payment  

---

## Human owner

**Primary:** AP Payments Lead  
**Authorisation owners:** Per DOA / Treasury policy (often dual authorisers)  
**Accountable executive:** Treasurer / Controller (policy-dependent)  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Proposal parameter changes | Payments Lead + Treasury |
| Exclusion override to include held item | Documented DOA |
| **Authorise / release payment** | **Human authorisers only** |
| Enable any L3 “prepare in ERP” automation | Responsibility gate + Treasury |

---

## Escalation criteria

- Proposal value variance vs forecast  
- Critical duplicate alert on included item  
- Vendor bank change pending verification  
- Insufficient approval evidence  
- Cutoff breach risk  
- System inability to apply hold  

---

## Output standard

Proposal pack: batch ID, entity, pay date, method, line list, exclusions, control checklist results (pass/fail), discount opportunities, authoriser queue, and statement: *Prepared for human authorisation — not authorised by agent.*

---

## Control requirements

- Hard system control: agent role cannot release payments  
- Dual human authorisation as per policy  
- Positive pay / bank controls remain Treasury-owned  
- Complete exclusion reason codes  
- Post-run reconciliation of proposed vs paid  

---

## Audit evidence

Proposal versions, checklist, authoriser IDs and timestamps (from ERP), exclusion logs, hold snapshots, and confirmation that agent identity is absent from release logs.

---

## KPIs

1. **% proposals accepted without amendment**  
2. **Exclusion precision** (excluded items that should have been excluded)  
3. **Missed hold incidents** (critical — target zero)  
4. **Proposal prep cycle time**  
5. **Discount capture opportunities surfaced %** (informational)  
6. **Post-run proposed-vs-paid breaks**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Observe proposal quality retrospectively |
| **L1** | Draft proposal packs offline; humans recreate/import |
| **L2** | Prepare draft proposal in ERP workbench; **cannot release** |
| **L3** | Auto-refresh drafts on schedule; still **human authorise/release** |
| **L4** | Managed proposal preparation factory — **authorisation remains human forever** |

There is **no** autonomy level at which the agent authorises payment.

---

## Failure handling

Ambiguous ERP write when saving draft proposal: reconcile draft IDs before recreate; never duplicate lines into a released batch. If hold register unavailable: **fail closed** — do not produce a “clean” proposal.

---

## Cost monitoring notes

Reuse ERP proposal engine; agent adds control checks rather than re-implementing payments. Limit LLM use to executive summaries of large batches.

---

## Example scenario *(illustrative example)*

Weekly run: agent drafts €2.4m proposal across 180 invoices, excludes 6 items (2 potential duplicates from A10, 3 missing approvals, 1 vendor block), and sends pack to two human authorisers. They remove one more invoice and release in the banking workflow. The agent’s job ends at preparation and exclusion quality — not release.

---

## Suggested first pilot scope

One entity, one payment method (e.g., SEPA/ACH), L1 offline packs parallel to existing proposal process, measure missed-hold incidents = 0 before any L2 draft-in-ERP.
