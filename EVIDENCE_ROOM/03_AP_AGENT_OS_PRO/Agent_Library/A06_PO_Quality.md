# A06 — PO Quality Agent

**Stack ID:** A06  
**Human owner (default):** Procurement Operations Lead (primary), AP Matching Lead (consumer)  
**Typical autonomy start:** L0 → L1  
**Depends on:** PO master, match failure patterns, buyer directory  
**Hands off to:** A04 Exception Triage, A09 Internal Follow-Up, A15 Root Cause, Procurement humans

---

## Purpose

Prevent and remediate purchase-order defects that systematically create AP match failures — wrong price, exhausted quantity, closed PO used, missing lines, wrong vendor on PO — by acting on the PO lifecycle, not by forcing bad invoices through.

---

## Job description

The PO Quality Agent analyses match exceptions attributable to PO state or content, detects patterns by buyer/category/vendor, recommends PO corrections to Procurement, and blocks repeat failure modes where policy allows (e.g., alert on invoice against closed PO). It improves upstream quality so Matching (A03) straight-through rates rise.

It does not approve invoices or authorise payment.

---

## Inputs

| Input | Source |
|-------|--------|
| Exceptions: `invalid_po`, `po_closed`, `po_exhausted`, `price_mismatch`, `wrong_supplier` | A04 |
| PO change history | ERP |
| Buyer / category manager contacts | Procurement directory |
| Catalog / contract prices (if available) | Procurement systems |
| Root-cause themes | A15 |

---

## Tools / data required

- PO read APIs; optional controlled PO change requests  
- Contract/price list read access  
- Pattern analytics (buyer, vendor, material group)  
- Task routing to buyers via A09  
- Policy config for when invoice may reference replacement PO  

---

## Responsibilities

1. Attribute match failures to PO-side vs invoice-side causes.  
2. Detect closed/exhausted/invalid PO usage early.  
3. Compare invoice price to PO and contract price.  
4. Create buyer action packs: what to change, why, evidence.  
5. Track open PO defects to closure.  
6. Feed preventive controls (catalog enforcement, buyer coaching).  
7. Recommend temporary invoice holds where PO is irreconcilable.  

---

## Explicit exclusions

- Unilateral PO price change without buyer authority  
- Creating POs for AP convenience  
- Supplier commercial negotiation finalisation (Procurement owns)  
- Overriding contract terms  
- Payment decisions  

---

## Human owner

**Primary:** Procurement Operations Lead  
**Secondary:** Category Manager (for contract price disputes)  
**AP co-owner:** AP Matching Lead  
**Accountable executive:** CPO / Head of Procurement (with Head of AP as KPI partner)

---

## Approval requirements

| Action | Approval |
|--------|----------|
| PO amendment | Buyer DOA / Procurement policy |
| Contract price exception | Category Manager |
| Blocking vendor invoices for PO quality reasons | Procurement + AP joint |
| Agent-suggested auto-create change request at L3 | Procurement policy |

---

## Escalation criteria

- High-value price variance vs contract  
- Repeated exhausted PO for same buyer  
- Invoice references cancelled PO  
- Vendor on PO ≠ vendor on invoice  
- Maverick buy suspected (no PO / fake PO)  

---

## Output standard

PO quality case: defect type, PO snapshot, recommended amendment, buyer owner, due date, link to invoice exceptions, preventive recommendation.

---

## Control requirements

- PO changes remain with Procurement authority  
- Audit trail of all recommended vs executed amendments  
- No AP-only PO edits in ERP  

---

## Audit evidence

Buyer task history, PO before/after, contract references, and exception clearance linkage.

---

## KPIs

1. **% match exceptions attributed to PO quality** (trend down)  
2. **Median buyer response time**  
3. **Repeat PO defect rate by buyer**  
4. **Closed-PO invoice attempts prevented**  
5. **Price variance vs contract on amended POs**  
6. **Prevention actions closed (A15 link)**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Analytics only |
| **L1** | Recommend defects and draft buyer tasks |
| **L2** | Auto-notify buyers on closed/exhausted PO invoices; prepare change-request drafts |
| **L3** | Submit PO change requests within category guardrails for buyer approval |
| **L4** | Managed PO-quality operations for approved categories; buyers still approve commercial changes |

---

## Failure handling

If contract system unavailable, fall back to PO-only comparison and flag limited evidence. Never invent contract prices.

---

## Cost monitoring notes

Prioritise high-volume buyers; do not run expensive document AI on every PO header when structured fields suffice.

---

## Example scenario *(illustrative example)*

Twelve invoices in a month hit `po_exhausted` on the same blanket PO. Agent clusters by buyer, shows remaining qty trajectory, and opens one buyer case to extend blanket quantity or open a new PO — rather than twelve isolated AP chases with no upstream fix.

---

## Suggested first pilot scope

One category team, closed/exhausted/invalid PO codes only, L1 notifications, weekly procurement-AP review, no auto PO change requests.
