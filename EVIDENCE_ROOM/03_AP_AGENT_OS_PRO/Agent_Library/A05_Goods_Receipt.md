# A05 — Goods Receipt Agent

**Stack ID:** A05  
**Human owner (default):** Warehouse / GR Clerk Lead (operations) with AP Matching Lead as process co-owner  
**Typical autonomy start:** L0 → L1  
**Depends on:** A03/A04 receipt exceptions; PO; receiving systems  
**Hands off to:** A03 Matching, A04 Exception Triage, A09 Internal Follow-Up

---

## Purpose

Close the receipt evidence gap for receipt-required invoices by locating, requesting, and reconciling goods receipt postings — without inventing receipts that did not occur.

---

## Job description

The Goods Receipt Agent works `missing_receipt` and `partial_receipt` exceptions. It identifies expected receivers, checks receiving systems for unposted or parked receipts, prepares evidence-backed chase packs, and confirms when GR quantity covers invoice quantity for re-match. It never posts a GR without an approved autonomy policy and never “receipts to clear AP” as a workaround.

---

## Inputs

| Input | Source |
|-------|--------|
| Exception packs (`missing_receipt`, `partial_receipt`) | A04 |
| PO lines, ordered qty, prior GRs | ERP |
| Invoice qty pending | A03 |
| Receiver / plant / buyer contacts | PO / HR directory |
| ASN / delivery notes if available | WMS / email |
| Receiving policy (who may post GR) | Config |

---

## Tools / data required

- ERP GR read (and optional controlled write)  
- WMS / receiving report access where separate  
- Collaboration tools for chase (email/Teams) via A09  
- Evidence pack templates  
- Calendar / SLA timers  

---

## Responsibilities

1. Confirm the invoice is truly receipt-required.  
2. Compute qty shortfall vs cumulative GR.  
3. Search for draft/parked receipts or delivery evidence.  
4. Identify accountable receiver and backup.  
5. Produce chase pack: PO, delivery refs, photos/DN links if any, qty needed.  
6. On GR availability, validate link to correct PO line and trigger re-match.  
7. Flag systematic non-receipt categories to A06/A15.  

---

## Explicit exclusions

- Fabricating GRNs to clear match  
- Changing PO quantities  
- Approving quality inspection failures  
- Payment holds release  
- Supplier-side logistics negotiation beyond information requests (A08)  

---

## Human owner

**Primary (execution):** Receiving Supervisor / GR Lead  
**Process co-owner:** AP Matching Lead  
**Accountable executive:** Operations lead for receiving + Head of AP (joint KPI)

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Agent-posted GR at L3+ | Written ops policy + dual control thresholds |
| Waive receipt requirement | Controller + Procurement |
| Close exception without GR (service reclass) | AP policy + requester |

---

## Escalation criteria

- No GR after SLA and invoice due date approaching  
- Delivery dispute / short shipment evidence  
- Receiver unknown or left organisation  
- Quantity suggests wrong PO  
- Quality hold on receipt  

---

## Output standard

Receipt reconciliation sheet: invoice qty, GR qty, shortfall, evidence found, chase history, recommended action (`re-match` / `partial book` / `escalate dispute`).

---

## Control requirements

- Segregation: agent/user posting GR ≠ payment releaser  
- No GR post without physical/system receiving evidence per policy  
- All waived-receipt cases logged as policy exceptions  

---

## Audit evidence

Chase trail, GR document IDs, timestamps, waiver approvals, and before/after match results.

---

## KPIs

1. **Receipt exception clearance time (median)**  
2. **% cleared within SLA**  
3. **False missing-receipt rate** (GR already existed)  
4. **Waiver rate %**  
5. **Repeat missing-receipt by plant/buyer**  
6. **Invoices blocked value due to GR**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Detect gaps; report only |
| **L1** | Draft chase packs; recommend receiver |
| **L2** | Auto-send chases via A09; watch for GR and notify AP |
| **L3** | Post GR within narrow guardrails when WMS confirms delivery event |
| **L4** | Managed GR alignment for approved plants; continuous sampling; never waive controls silently |

---

## Failure handling

WMS/ERP conflict: present both, do not post. Timeout on GR create: reconcile before retry (at-most-once). Receiver bounce: escalate to buyer then A04.

---

## Cost monitoring notes

Batch status polls; avoid per-minute polling. Prefer event webhooks from WMS when available.

---

## Example scenario *(illustrative example)*

Invoice for 100 units; GR shows 60. Agent codes partial receipt, chases warehouse with DN #4411, warehouse posts remaining 40 next day, agent confirms coverage and returns case to A03. It does not post 40 units itself at L1.

---

## Suggested first pilot scope

One warehouse/plant, goods categories only (no services), L1 chase-only, daily AP↔warehouse huddle, no agent GR posting.
