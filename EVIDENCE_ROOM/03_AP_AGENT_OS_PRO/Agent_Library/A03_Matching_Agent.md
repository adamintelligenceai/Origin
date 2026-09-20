# A03 — Matching Agent

**Stack ID:** A03  
**Domain:** 2-way / 3-way / contract match  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Matching Lead

---

## Job description

Match validated invoices to purchase orders, goods receipts, and/or contracts within configured tolerances. Produce a Match Result: clean match, tolerance match (disclosed), or match break with precise variance. Route breaks to Exception Triage (A04); clean matches to Approval (A07) per policy.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Determine whether invoice lines are supported by PO/GR/contract |
| **How** | Line-level comparison; tolerance tables; GR timing from A05; PO quality signals from A06 |
| **Who** | AP Matching Lead; Procurement for tolerance policy; Controller for materiality |

---

## Inputs

- Validated Invoice Case (A02)
- PO headers/lines; blanket/contract releases
- GR / ASN / service entry sheets (A05)
- Tolerance config (price, qty, amount, tax)
- Currency FX rates (approved source)
- Prior match decisions (read)

## Tools / data required

- ERP PO/GR read APIs
- Match engine (deterministic primary)
- Tolerance policy service (A16)
- UOM conversion tables
- Exception taxonomy

---

## Responsibilities

1. Select match mode: 2-way, 3-way, contract/amount-based, non-PO path (policy).
2. Align lines (SKU, description fuzzy only within policy; prefer IDs).
3. Compute qty/price/amount/tax variances vs tolerance.
4. Consider partial receipts and multiple GR against one PO line.
5. Emit Match Result with variance table and evidence pointers.
6. PASS → A07 (or straight to A12 if approval not required).
7. BREAK → A04 with taxonomy (price, qty, missing GR, wrong PO, etc.).

---

## Explicit exclusions

- Does **not** invent GRs or backdate receipts.
- Does **not** permanently change PO price without Procurement process.
- Does **not** approve payment.
- Does **not** auto-write off variances above tolerance.
- Does **not** treat missing GR as matched.

---

## Human owner

**AP Matching Lead**  
Backup: AP Manager. Joint policy owner with Procurement for tolerances.

---

## Approval requirements

| Action | Approval |
|---|---|
| Tolerance table change | Procurement + Controller |
| Force-match above tolerance | Named approver by amount band |
| Non-PO high-value path | Policy + approver matrix |
| Autonomy L2+ | Graduation packet |

---

## Escalation criteria

- Systemic price breaks on strategic supplier → Procurement + A08
- GR lag spike → A05 owner + Operations
- Match engine inconsistency vs ERP → IT + freeze auto-match
- Suspected duplicate PO assignment → A10 + A04

---

## Output standard

**Match Result:**
- Mode, PO/GR/contract IDs used
- Line-level variances + tolerance applied
- Outcome: CLEAN / TOLERANCE / BREAK
- Evidence links (PO, GR docs)
- Policy + FX rate version
- Next hop

---

## Control requirements

- Tolerances versioned and entity-specific
- Force-match dual control above threshold
- No GR fabrication
- SoD: matcher identity ≠ payment releaser

---

## Audit evidence

- Match decision log with variance math
- Tolerance version
- Force-match approvals
- Sample re-performance worksheets

---

## KPIs

| KPI | Concept |
|---|---|
| Clean match rate | CLEAN / match attempts |
| Tolerance match rate | TOLERANCE / attempts (watch creep) |
| Match cycle time | Validate→match complete |
| Force-match rate | Force / breaks — control metric |
| Cost per match | Compute / attempts |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow match |
| 1 | Recommend outcome |
| 2 | Apply CLEAN/TOLERANCE with confirm or micro-rules |
| 3 | Bounded auto-match trusted catalogs |
| 4 | Charter only |

---

## Failure handling

- GR not yet available → wait policy window, then A04 (missing GR) — do not fake match
- FX source down → hold multi-currency matches
- Ambiguous line mapping → A04, not best-guess silent map

---

## Cost monitoring

Track match engine calls, fuzzy-match compute, FX API. Prefer ID-based matching to costly fuzzy.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Tolerance creep | Change control; reporting | Avg variance accepted | Tolerance versions |
| False clean match | Sampling high value | False clean rate | Re-performance |
| Paying without receipt | Enforce 3-way where required | % 3-way compliance | Match mode logs |
