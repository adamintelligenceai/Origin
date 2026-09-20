# A03 — Matching Agent

**Stack ID:** A03  
**Human owner (default):** AP Matching Specialist / PO Invoice Lead  
**Typical autonomy start:** L0 → L1  
**Depends on:** A02-validated invoices, PO, goods receipt, match tolerances  
**Hands off to:** A04 Exception Triage, A05 Goods Receipt, A06 PO Quality, A07 Approval, A12 Payment Proposal Review

---

## Purpose

Apply purchase-order and goods-receipt matching rules consistently — two-way or three-way as policy dictates — and produce clear match results or precise exception codes, so AP does not invent “almost matched” postings without evidence.

---

## Job description

The Matching Agent compares invoice lines to PO lines and, where required, to goods receipts: quantity, price, currency, UoM, and remaining open quantities. It applies configured tolerances, records match quality, and either releases a clean match for approval/payment prep or emits taxonomy-aligned exceptions (price mismatch, quantity mismatch, missing receipt, PO exhausted, etc.).

It does not create receipts, amend POs, or authorise payment.

---

## Inputs

| Input | Source |
|-------|--------|
| Validated invoice header/lines | A02 |
| PO header/lines, status, remaining qty/amount | ERP |
| Goods receipts linked to PO lines | ERP |
| Match policy (2-way/3-way, tolerances by category) | Config |
| Historic match outcomes (optional) | Analytics |

---

## Tools / data required

- PO and GR read APIs (batch-friendly)  
- Line-matching engine with configurable tolerances  
- UoM conversion tables where used  
- Exception emitter to A04  
- Evidence pack builder (side-by-side lines)  

---

## Responsibilities

1. Determine match mode from policy (PO / non-PO; 2-way / 3-way).  
2. Resolve PO number and line associations (including partial multi-PO invoices).  
3. Compare price and quantity within tolerance.  
4. Verify receipt coverage for 3-way items.  
5. Detect PO closed / exhausted / invalid status.  
6. Produce match result: `Matched` · `Matched-with-tolerance` · `Unmatched` + codes.  
7. Suggest likely resolver agent (A05/A06/A08/A09).  
8. Never “force match” outside tolerance without human authority.  

---

## Explicit exclusions

- Posting GRN / ASN creation  
- PO price amendments  
- Supplier negotiation  
- Approval substitution  
- Payment release  
- Ignoring tolerance breaches because “vendor always does this” without policy  

---

## Human owner

**Primary:** AP Matching Lead  
**Secondary:** Procurement Operations (for PO-side disputes)  
**Accountable executive:** Head of AP  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Tolerance table changes | Head of AP + Procurement + Controller |
| Force-match above tolerance | DOA-aligned approver + documented reason |
| Disable 3-way for a category | Controller |
| L3 auto-match enablement | Responsibility model gate |

---

## Escalation criteria

- Variance above tolerance and above amount materiality  
- PO closed/exhausted with invoice still presented  
- Split lines with ambiguous allocation  
- Currency mismatch invoice vs PO  
- Service PO without clear acceptance evidence when policy requires it  
- Conflicting multiple open POs for same vendor/amount  

---

## Output standard

- Match mode used  
- Line-level comparison table  
- Tolerances applied and variances  
- GR references used  
- Exception codes  
- Confidence / match quality score  
- Recommended next step  
- Rule version  

---

## Control requirements

- Tolerances versioned and dual-controlled  
- Force-match requires named human + reason code  
- Service vs goods categories explicitly configured  
- Sampling of `Matched-with-tolerance` weekly  

---

## Audit evidence

Match packs, PO/GR snapshots at match time, tolerance version, force-match approvals, and re-performance samples.

---

## KPIs

1. **Straight-through match rate %**  
2. **Match cycle time (median)**  
3. **False unmatched rate %** (human finds should-match)  
4. **Force-match rate %** (should trend down)  
5. **Price vs quantity exception mix**  
6. **Receipt-related exception %**  
7. **Cost per matched invoice**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Shadow match scores only |
| **L1** | Recommend match/exception; human posts |
| **L2** | Auto-match within tight tolerances + amount cap; prepare exception packs |
| **L3** | Auto-match within full approved tolerance tables; auto-route exceptions |
| **L4** | Managed auto-match for approved categories; continuous QA sampling; still no payment authority |

---

## Failure handling

ERP PO read timeout: retry read with backoff; do not invent remaining quantities. Ambiguous line mapping: exception `invoice_quality` / matching ambiguity — fail closed. If GR appears mid-cycle, re-run match once automatically then stop.

---

## Cost monitoring notes

Batch PO/GR fetches by instrument/PO ID lists respecting API payload limits. Avoid per-line chatty calls. Cache PO snapshots for short TTL with invalidation on PO change events if available.

---

## Example scenario *(illustrative example)*

Goods invoice references PO-8891 line 2: PO price 10.00, invoice 10.15 (1.5%), qty equal, GR complete. Tolerance for category is 2% / max £50. Agent marks `Matched-with-tolerance`, records variance, and routes to approval if required — no exception storm. If invoice price were 11.00 (10%), agent emits `price_mismatch` to A04 and suggests A06/A08.

---

## Suggested first pilot scope

One purchasing category with stable POs (e.g., office supplies or a single plant), 3-way match, L1 only, no force-match automation, weekly review of all tolerance matches.
