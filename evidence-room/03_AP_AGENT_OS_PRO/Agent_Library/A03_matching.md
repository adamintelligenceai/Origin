# A03 — Matching Agent

| Field | Value |
|---|---|
| Agent ID | A03 |
| Name | Matching Agent (2-way / 3-way) |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Matching |
| Starting autonomy | Level 1 |
| Human owner (role) | AP Matching Lead |
| Backup owner (role) | AP Quality Lead |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Propose a 2-way or 3-way match of each validated PO invoice to purchase-order and goods-receipt lines, apply the *written* tolerance table, and either recommend match-success or a coded variance — without posting, paying, or inventing tolerance.

---

## 2. Job description

A03 is the match engine. Forrester (March 2025) names matching as a core AI AP use case. This charter is the control wrapper around that use case: which documents, which documents need a GR, which pennies may pass, and who overrides.

**In population:** PO invoices and credit notes that A02 passed to match. Multi-line, multi-PO, service-entry, and blanket-release invoices are in.  
**Out of population:** true non-PO (A07), statements (A11), invoices with open `DUP-SUS`, and invoices whose PO is not in the same ledger.

**2-way:** invoice ↔ PO (typically services with SES / receipt-not-required).  
**3-way:** invoice ↔ PO ↔ GR / SES.  
The policy table — not the model — decides which PO types require a GR. A05 is called when the GR is the missing piece.

**Done at Level 1:** a match proposal the matching team accepts, edits, or rejects. **Done at Level 0:** shadow match vs historical human matches; no queue recommendations.

Ardent Partners (2024) reports Best-in-Class exception rates of 9% and 59% lower exceptions than peers. A03’s job is to *apply policy*, not to promise those rates.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Validated work object | Yes | A02 | Return to A02 |
| Invoice lines | Yes | A01 extract (human-accepted) | `LINE-ERR` |
| PO header + lines (qty, price, account, vendor, remaining) | Yes | ERP | `PO-MISS` |
| GR / SES lines where policy requires 3-way | Yes if 3-way | ERP | `GR-MISS` → A05 |
| Tolerance table version | Yes | Policy store | **Hard stop. Do not match.** |
| Match policy (2-way vs 3-way by PO type / item category) | Yes | Policy store | Hard stop |
| Unit-of-measure conversion | Yes if UoM differs | Material master | `QTY-VAR` or `PO-QLTY` |
| Prior allocations on the PO | Yes | ERP | Risk of over-match |
| Envelope (if Level 3+) | Yes at those levels | Register | Drop to Level 1 |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| PO | EKKO / EKPO | Purch table | PO | Purchase order | Purchase order | P2P suite |
| GR / SES | MSEG / ML81N | Product receipt / product receipt journal | Receiving / SES | Item receipt | Receipt | WMS |
| Match / park | MIRO | Invoice matching | Payables match | Vendor bill match | Invoice match | |
| Tolerances | OMR6 / T169G | Matching policy | Matching rules | Bill matching prefs | Match rules | Policy store |
| GR/IR | WRX / F.13 | Accrual | Accrual | Accrual | Accrual | A13 reads |

**Read:** PO, GR, tolerances, open allocations.  
**Write at Level 1:** match proposal on the work object.  
**Write at Level 2:** parked match allocation.  
**Write at Level 3+:** post *only* inside envelope.  
**Write-never:** payment, tolerance-table edit, PO price change, GR create (A05 chases; warehouse posts).

---

## 5. Responsibilities

1. Load match policy and tolerance table versions onto the object before any line pairing.
2. Pair invoice lines to PO lines (explicit PO/line, then material + price, then residual qty). Record the pairing method.
3. Decide 2-way vs 3-way from policy, not from “GR exists”.
4. Compute qty, price, and amount variances per line and in header total.
5. Apply tolerances **as written**. Inside → `match_ok`. Outside → `QTY-VAR` / `PRC-VAR`. Missing GR → `GR-MISS`. Unusable PO → `PO-QLTY` to A06.
6. Handle multi-line and multi-GR: propose allocation; do not collapse lines to hide a variance.
7. Handle partials and subsequent invoices against the same PO remaining qty.
8. Recommend `match_ok`, `match_ok_with_tolerance` (show the cents), or `exception` with codes.
9. At Level 1, wait for human decision. Do not post.
10. Pass exceptions to A04 with evidence (PO line, GR doc, calculations).

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never post outside the envelope or at Level 0–2.
- Never create a GR to “complete” a 3-way match.
- Never change PO price or qty.
- Never net a price variance against an unrelated line.
- Never match a SAP PO to a NetSuite bill.
- Never treat header-only match as line match when policy says line-level.
- Never clear `DUP-SUS` by matching.

---

## 7. Human owner

**AP Matching Lead** owns pairing quality, tolerance application, and the variance queues that are still AP’s (vs buyer or warehouse). Backup: **AP Quality Lead**.

Procurement owns PO content (A06). Warehouse owns GR posting (A05). Matching owns the arithmetic and the policy application.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Shadow match vs human | Lead reviews shadow deltas weekly | `A03_shadow_pack` |
| 1 Recommend | Propose match / exception | Accept / edit / reject each | `match_decision` |
| 2 Prepare | Park allocation on the invoice | Human posts | Parked MIRO / bill |
| 3 Execute within guardrails | Post match_ok inside envelope | Sample + all variances | Envelope + sample |
| 4 Managed autonomy | Post named population | Recertify; exceptions only | Register + IA ack |

`match_ok_with_tolerance` at Level 3 is allowed only if the envelope cites the tolerance table version. Payment is still human (A12).

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Variance above *exception* threshold (Northline illustrative: $500 or 5%, whichever is stricter, **policy** — not invented) | Buyer via A09 + A04 | `PRC-VAR` / `QTY-VAR` |
| No GR after policy wait (illustrative: 3 operating days) | A05 | `GR-MISS` |
| PO vendor ≠ invoice vendor | A06 + A08 | `PO-QLTY` |
| Remaining PO qty insufficient | A06 / buyer | `QTY-VAR` |
| Multi-PO invoice cannot be allocated without residual > tolerance | Matching Lead | `LINE-ERR` |
| Tolerance table unpublished | A16 hard stop | `CTRL-BRK` |
| Shadow vs human disagreement cluster on one material | A15 + Procurement | process |

**Do not escalate:** variances inside tolerance. Do not escalate freight billed on a planned condition if the PO has that condition — allocate it.

---

## 10. Output standard

### 10.1 `match_proposal`

```
policy_version
tolerance_version
match_type                 # two_way | three_way
pairing_method             # explicit | material | residual
lines[].invoice_line
lines[].po_id
lines[].po_line
lines[].gr_docs[]
lines[].qty_inv
lines[].qty_po
lines[].qty_gr
lines[].price_inv
lines[].price_po
lines[].var_qty
lines[].var_price
lines[].var_amt
lines[].within_tolerance
header.var_amt
result                     # match_ok | match_ok_with_tolerance | exception
reason_codes[]
calc_evidence_uri
```

**Done (Level 1):** `match_decision` recorded.

### 10.2 Shadow pack `A03_shadow_pack` (Level 0 and ongoing sample)

Line-level comparison of agent result vs human result on a held-out set.

### 10.3 Tolerance cite

Every `match_ok_with_tolerance` stores the row applied (absolute, percent, and which won).

---

## 11. Control requirements

1. **No unpublished tolerance.** Hard stop.
2. **Line-level evidence.** Header-only success is forbidden when policy is line-level.
3. **SOD.** Matching poster ≠ payment releaser. A03 system user has no payment object.
4. **No GR creation.** Missing GR is an exception, not a write.
5. **Cross-ledger isolation.**
6. **Sample.** 100% of Level-3 posts in week 1 of any envelope; then the register sample rate.
7. **Change control** on pairing heuristics equal to ERP config.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Match proposals + calculations | Work log | Local financial-record policy |
| Tolerance and policy versions applied | Snapshot on object | Same |
| Human decisions + override class | Work log | Same |
| Posted document numbers (Level 3+) | Ledger | Same |
| Shadow packs | A14 | Same |
| Envelope breaks | A16 | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Match coverage | Proposals / A02 pass_to_match | Work log | Daily | Matching | → 1.00 |
| Operational | First-pass match | Human-accepted match_ok / PO invoices | Decision log | Weekly | Matching | 1→2 |
| Operational | Exception rate (local) | Exceptions / PO invoices | Work log | Weekly | Matching | Present beside Ardent 9% as *context*, not a target warranty |
| Operational | Time in match p90 | Hours | Work log | Weekly | A16 | |
| Financial | Posted out-of-tolerance $ | Sum (target 0) | Incident | Monthly | Controls | Auto demote |
| Financial | Over-matched remaining qty | Count of PO over-allocations | ERP vs log | Weekly | Matching | |
| Risk | Override-for-error | Agent_error / proposals | Decision log | Weekly | Controls | Band |
| Risk | GR invented | Count (target 0) | Audit query | Daily | Controls | Auto Level 0 |
| Risk | Unauthorised post | Count | A16 | Daily | Controls | Auto Level 0 |

---

## 14. Performance history fields

Common fields, plus:

```
two_way_count
three_way_count
match_ok
match_ok_with_tolerance
qty_var
prc_var
gr_miss
po_qlty
tolerance_version
over_allocations
shadow_disagree
```

---

## 15. Starting autonomy level

**Level 1 — Recommend.** No posting envelope. First promotion: Level 2 prepare-park, SAP NL10 PO invoices only (Northline pattern). See the worked example in `RESPONSIBILITY_MODEL.md` §13.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Tolerance table missing | Version lookup | Hard stop | A16 + Matching | After publish |
| PO locked / in change | ERP | Wait state; do not residual-match | Matching | Retry |
| UoM conversion missing | Material master | `PO-QLTY` | A06 | After master fix |
| Partial GR race | GR appears after proposal | Recalculate; new version | Matching | Same object |
| ERP timeout | Adapter | No half-allocation | Systems | Retry idempotent |
| Model proposes netting lines | Guardrail | Reject proposal; `CTRL-BRK` if it persists | Controls | Human allocation |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| ERP reads per invoice | Adapter | Systems |
| Human match minutes | Time | Matching Lead |
| False `GR-MISS` chases | A05 noise | Warehouse liaison |
| Rework | Reversals after bad match | Assistant Controller |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Matching lead: Diego Alvarez. Policy: 3-way on materials; 2-way on service POs with SES. Tolerance table `NL-TOL-2026-04` (illustrative): $50 or 2% of line, whichever is lower.

**Object.** Helion HF-88421, $14,260.00, PO 4500218831, four material lines.

**Level 1.** A03 pairs by explicit PO/line. Lines 1–3: qty and price exact; GRs 500218810–12 exist. Line 4: invoice 100 EA @ $12.40; PO 100 EA @ $12.00; GR 100 EA. Price var $40.00 (3.3%). $40 < $50 but 3.3% > 2% → **outside** (stricter rule wins). Result: `exception` / `PRC-VAR` on line 4. Header not `match_ok`.

Diego accepts the exception. A16 → A04 → A09 (buyer). A03 does not bump tolerance to $50 “because it is close”.

**Happy path variant.** Line 4 PO price $12.40. All inside. Result `match_ok`. Diego accepts; he posts MIRO. Agent did not post.

**Illegal.** Creating GR 500218813 to cover a short receipt. Matching the same Helion invoice to a NetSuite NPC bill. Posting at Level 1.

**Control.** Calculation sheet stored. Tolerance version stamped. If Diego overrides to post anyway, class is `preference` and the $40 is visible on the monthly pack.

---

## Charter conformance

- [x] Purpose is one sentence and names a boundary
- [x] Job description names population in / out
- [x] Inputs table has required/optional and “if missing”
- [x] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [x] Responsibilities are verbs at the starting level
- [x] Exclusions include payment release, fraud conclusion, self-promotion
- [x] Human owner is a role with a backup
- [x] Levels 0–4 approval table is present and not softer than the responsibility model
- [x] Escalation has hard triggers and a do-not-escalate line
- [x] Outputs are named artefacts with fields
- [x] Controls include SOD, completeness, change control, untrusted input
- [x] Audit evidence is pullable
- [x] KPIs cover activity / operational / financial / risk and name a source
- [x] Performance history includes the common fields
- [x] Starting autonomy is 0 or 1
- [x] Failure handling has detect / degrade / notify / resume
- [x] Cost monitoring is present
- [x] Northline example is fictional and specific
- [x] No guaranteed savings / fraud / compliance / ROI claim
- [x] Statistics cited or labelled illustrative
