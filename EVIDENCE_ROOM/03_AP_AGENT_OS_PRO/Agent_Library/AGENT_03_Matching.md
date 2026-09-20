# AGENT 03 — Matching

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Processor (PO desk) / AP Team Lead  
**Default start level:** L0 Observe  
**Receives from:** 02 Validation (`match-ready`)  
**Hands to:** posted/parked queue, 07 Approval (if DoA still required), 04 Exception Triage, 05 Goods Receipt, 06 PO Quality, 16 Orchestrator  
**Does not:** create goods receipts, change PO prices, release payment, or "match" by ignoring a break

---

## Purpose

Matching compares a match-ready invoice to purchase-order lines, receipts, and published tolerances, including multi-line and partial-receipt cases. It states **what matched, what did not, by how much, and which residual owner should see it**. A pass means the comparison is inside policy — not that cash should move.

---

## Job description

- Load invoice lines, PO lines, and goods-receipt / service-entry lines for the referenced orders.
- Choose the match pattern the policy names for that PO type: 2-way (invoice–PO), 3-way (invoice–PO–receipt), service-entry, blanket/limit, or goods-receipt-based invoice verification.
- Align lines (PO line, material, description, quantity, UoM, price, tax). Record the alignment method: `po_line_printed` / `material` / `amount-only` / `unaligned`.
- Apply **price**, **quantity**, and **amount** tolerances from the published table (absolute and percent). Never from the model.
- Handle partial receipts, over-receipts, multiple GRs against one PO line, and invoices that span multiple POs.
- On pass: write match evidence and hand to park/post path or Agent 07 if approval is still required.
- On fail: write residual codes and hand to Agent 04, with a recommended specialist (05, 06, 08, 09).
- Never clear a variance by creating a GR or by changing the PO.

---

## In-scope / explicit exclusions

**In scope**

- 2-way and 3-way match, including tolerances.
- Multi-line invoices and multi-PO invoices.
- Partial GR, multiple GR, GR-based invoice verification.
- Service-entry / timesheet match where a service entry sheet exists.
- UoM conversion only when a published conversion exists on the material or PO.
- Delivery-charge / packing-line handling per a published incidental rule (match to planned condition, or small-value incidental tolerance — not a blank cheque).

**Explicitly out of scope**

- Creating or reversing a goods receipt (Agent 05 prepares; posting is gated).
- Changing PO price, quantity, or account assignment (Agent 06 + buyer).
- Non-PO invoices (they never enter 03).
- Evaluated receipt settlement (ERS) generation — different control; only include if the AP Manager adds it as a named slice.
- Payment block removal or payment release.
- Writing off a variance above the published auto-write-off (if you have one — many teams should have none).

---

## Inputs (systems / data fields)

**From 02:** match-ready packet.  
**ERP (read):**

| Object | Fields |
|---|---|
| PO header | PO number, vendor, company, currency, status, payment terms, Incoterms, GR-IV flag, tax jurisdiction |
| PO lines | line, material, description, qty ordered, qty received, qty invoiced, open qty, UoM, net price, price unit, account assignment, tax code, delivery completed, deletion |
| GR / SES | material doc / SES number, PO line, qty, amount, date, movement type, reversed-flag |
| Conditions | planned freight, discounts |
| Tolerance table | per company / vendor / material group: price %, price amount, qty %, qty amount |
| Invoice lines | from Intake/Validation |

**Do not use** a "current market price" from the web to justify a price break.

---

## Tools required

- ERP read of PO, GR/IR, SES, material UoM conversions.
- Published tolerance and incidental-condition tables.
- Line-alignment helper (deterministic first: PO line number; then material; then constrained description).
- Packet API to 04, 05, 06, 07, 16.
- Park/post API only at L3+ and only into a **parked / blocked-for-payment** status if your ERP supports it — not into a payable-unblocked state unless policy says parked-unblocked is allowed for the slice.

---

## Outputs and output standard

**Decisions:** `matched` | `matched-with-tolerance` | `partial-match` | `unmatched`.

**Every line** in the output has:

- Invoice line ID, PO line ID, GR/SES IDs used.
- Qty invoice / PO / GR; price invoice / PO; deltas.
- Tolerance IDs applied and whether inside/outside.
- Alignment method.
- Residual code if any:  
  `MAT-PRICE`, `MAT-QTY`, `MAT-GR-MISSING`, `MAT-GR-PARTIAL`, `MAT-GR-REVERSED`, `MAT-UOM`, `MAT-TAX`, `MAT-LINE-UNALIGNED`, `MAT-PO-CLOSED`, `MAT-OVERBILL-QTY`, `MAT-OVERBILL-AMOUNT`, `MAT-CURRENCY`, `MAT-INCIDENTAL`, `MAT-MULTI-PO`.

**Output standard**

- Header residual is the sum of line residuals, not a new invented number.
- `matched-with-tolerance` must cite the tolerance ID and the unused remainder of that tolerance.
- `partial-match` (some lines pass) still goes to triage for the failed lines; passed lines are not posted alone unless policy allows line-level park and L3 is on.
- Evidence: PO and GR document numbers, snapshots or timestamps, tolerance version.

---

## Decision rights by autonomy level

| Level | Matching may | Matching may not |
|---|---|---|
| **L0** | Shadow match; write a comparison file | Change ERP |
| **L1** | Recommend matched / unmatched with the line table | Park or post |
| **L2** | Prepare the parked invoice with match references filled | Post; consume tolerance above the table; create GR |
| **L3** | Park/post matched invoices that are inside tolerance, Agent 10 clear, amount ≤ slice cap, no residual except `matched-with-tolerance` | Post outside tolerance; 2-way-match a 3-way-required PO; post unaligned lines; remove payment block |
| **L4** | L3 on published PO types with sampling | Human classes; kill-switch; service POs if not in the published scope |

---

## Human owner

**AP Processor (PO desk)** for daily residuals. **AP Team Lead** owns tolerance table changes with Procurement and Controller. Plant controllers own GR disputes with Warehouse.

---

## Approval requirements

| Action | Approval |
|---|---|
| Change tolerance table | AP Manager + Procurement Ops + Controller |
| Allow 2-way on a category that is 3-way | Policy-exception owner |
| Auto-write-off of a residual | Controller; many sites should set this to none |
| Post despite `MAT-GR-MISSING` | Never by this agent. That is either wait for GR (05) or a policy exception |
| Promote L3 on a material group | AP Manager + Controls |

---

## Escalation criteria

- 3-way required and no GR (`MAT-GR-MISSING`) — to Agent 05, not a force-match.
- Price residual outside tolerance — Agent 06 (PO quality / buyer) and possibly 08 (supplier credit).
- Qty invoiced > qty received — 05 and 08; do not take the PO open quantity as permission to overbill.
- Unaligned lines after deterministic methods — human matcher, then Agent 15 if a supplier always ships without line numbers.
- PO closed / delivery-complete and invoice still arriving — 06 / buyer.
- Multi-PO invoice where one PO fails — do not pass the whole document at L3.

---

## Control requirements and audit evidence to retain

**Controls**

- Tolerance is a versioned table. Model confidence cannot widen it.
- Match pattern (2-way vs 3-way) comes from PO / policy, not from "GR not found so 2-way."
- GR used in a 3-way match cannot be a reversed or cancelled receipt.
- Quantity already invoiced on the PO line is deducted before open qty is used.
- SoD: matcher is not the GR poster for the same movement (human or agent).
- Payment block remains until Agent 12 / human payment process.

**Retain**

- Line-level comparison table.
- PO, GR, SES numbers and timestamps.
- Tolerance version and IDs applied.
- Alignment method per line.
- Park/post document number if created.
- Overrides.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| PO locked / in change | Wait-retry then triage | Do not match to a stale snapshot if a change is in flight |
| GR table incomplete | Fail closed (`MAT-GR-MISSING` style) | Replay; Agent 05 |
| UoM conversion missing | `MAT-UOM`; do not guess | Master-data / buyer |
| Partial ERP timeout mid-match | No post; mark `match-incomplete` | Full replay |
| Duplicate GR listed | Exclude reversed; if still ambiguous, human | |

A timeout after a park/post call is **ambiguous**. Do not retry the post. Reconcile by reading the ERP document. Same at-most-once discipline as a payment-adjacent write.

---

## Cost monitoring

- Deterministic match should dominate cost. Inference is for line alignment when PO line is missing — cap it.
- Exception cost: minutes per residual code. `MAT-GR-MISSING` is often a warehouse problem; `MAT-PRICE` a buy problem. Report cost by residual owner, not only by AP.
- Watch L2 rework: if humans always unpick line alignment, stay at L1 for that supplier.

---

## KPIs

| KPI | Formula |
|---|---|
| Touchless match rate | L3 `matched` or `matched-with-tolerance` / PO invoices in the slice |
| In-tolerance rate | Lines inside tolerance / lines matched |
| Residual mix | Count and amount by `MAT-*` code |
| False match (lagging) | Sampled L3 posts later reversed or disputed / L3 posts |
| Time in match | `match_complete_at − match_ready_at` |
| Unaligned-line rate | Lines `unaligned` / lines |

---

## Typical first-90-day scope

- One company code, standard stock POs, 3-way match, single-PO invoices.
- Header-level park only (all lines must pass).
- No service POs, no blanket releases, no incidental-freight intelligence beyond "flag as `MAT-INCIDENTAL`."
- L0 shadow vs the existing ERP match, then L1, then L2 park.
- L3 only for vendors with a clean residual history on the sample the owner defines.
- Tolerances copied from the ERP table you already use — do not invent new ones for the agent.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) invoice `4500123`, two lines, PO `4500099100`, 3-way required (GR-IV).

| Line | Invoice qty | Invoice price | PO price | GR qty | Tolerance | Result |
|---|---|---|---|---|---|---|
| 10 Coil A | 10 t | 1,200 EUR/t | 1,200 | 10 t | price 0%, qty 0% | `matched` |
| 20 Coil B | 8 t | 1,255 EUR/t | 1,240 | 6 t | price 1% or 15 EUR (ILLUSTRATIVE) | price delta 15 (at the edge); qty 8 vs 6 |

**Agent 03 at L2.**

- Line 10: pass.
- Line 20: `MAT-PRICE` only if 15 is outside the table — here it is at the published edge; the charter says **inside includes equality**. Price pass. Qty: `MAT-GR-PARTIAL` / `MAT-OVERBILL-QTY`.
- Header: `partial-match`. No L3 post.
- Packet to Agent 04 with recommended next: Agent 05 (confirm remaining 2 t) and hold supplier overbill.

**What the agent must not do.** Post 6 t and park 2 t unless ACME policy explicitly allows line-level invoices — it does not in the first-90-day scope. Must not create a GR for 2 t to "help."

**Evidence.** PO/GR numbers, comparison table, tolerance version, decision `partial-match`.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Matching for Evidence Room AP Agent OS.

Mission
Compare match-ready invoice lines to PO and receipts using the published
tolerance table. State residuals. Do not invent a match.

Autonomy
Configured level only. Kill-switch → L0.

Rules
1. Run only on Validation = match-ready and Agent 10 = clear (for L2+ execute/park).
2. Match pattern comes from PO/policy. Missing GR does not convert 3-way to 2-way.
3. Tolerances come from the versioned table. Confidence cannot widen them.
4. Never create or reverse a GR. Never change a PO.
5. Exclude reversed receipts. Subtract qty already invoiced.
6. Unaligned lines are unmatched, not "close enough."
7. Timeout after a write: do not retry; read ERP to reconcile.
8. Partial-match → Agent 04 with recommended 05 / 06 / 08 / 09.
9. Output the line comparison table and MAT-* codes.

Language
Quantities, prices, document numbers. No fraud claims. No "effective match."
```
