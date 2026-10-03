# AGENT 03 — Matching

**Stack position:** After Validation PASS on the PO path. Hands clean recommendations to a human poster; hands breaks to Triage, Goods Receipt, and PO Quality. Blocked by open Agent 10 flags.  
**Default autonomy:** L1 Recommend (commission at L0).  
**Human owner (typical):** AP Match Lead  
**Payment authority:** None. Posting, if later earned at L3, is still not payment.  
**Northline instance:** `AP-MAT-004`; companies 1000/1100 in Wave 1; see completed charter in `AGENT_CHARTER_TEMPLATE.md`.

---

## 1. Position in the stack

Matching applies the organisation’s written 2-way, 3-way, and GR/IR rules to a validated PO invoice. It is the most tempting place to “just post it.” Resist. A match worksheet is an argument. A human (or a later earned L3 subclass) posts. Cash still waits for Agent 12 and two human authorisers.

---

## 2. Job description

The Matching Agent loads the validated extract, the PO, and the receipt or service-entry set. It applies the pinned tolerance table. It writes a line-level worksheet and a single recommendation code. It does not create receipts, change POs, override tolerances, or post. If Agent 10 has an open flag, the only recommendation allowed is hold.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On Validation PASS + PO path | Worksheet |
| Specialist accept/edit/reject | SSC hours | Human decision |
| Daily | 17:15 ET | Accept mix, break codes, $50k+ aging |
| Weekly | Friday | UOM / price / missing-GR mix for Agents 06 and 15 |

Northline: specialists work `NL.MATCH.US.PO`. Target: worksheet same day if PASS arrived by 14:00 ET.

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Validated extract + image | Agents 01/02 | Y |
| PO header/lines, remaining qty, price, tax group, vendor, account assignment | ERP | Y |
| Product receipts / service entries / timesheet accepts | ERP / WMS / project | Y for the chosen path |
| Tolerance table `AP-MAT-004` + hash | Controlled + ERP matching setup | Y |
| Agent 10 flag state | Agent 10 | Y (must read) |
| Contract reference (2-way services) | ERP / CLM | Y for 2-way path |
| Prior match worksheets (rework) | Orchestrator | If rework |

---

## 5. Tools / data required

| Tool | Privilege | ERP mapping (read) |
|---|---|---|
| PO | Read | D365 PurchTable/Line; SAP EKKO/EKPO; Oracle PO; NetSuite Purchase Order; Workday Purchase Order |
| GR / SES | Read | D365 product receipt / WMS; SAP EKBE/MIGO; Oracle Receipts; NetSuite Item Receipt; Workday Receipt |
| Pending invoice | Read | Do not write at L1 |
| Tolerance | Read, hash | Pin version on every worksheet |
| Orchestrator | Write worksheet + status | — |

Service account example: `svc-ap-match` **read-only**. Write on invoice post is a different account, different charter, L3-only, still not payment.

---

## 6. Responsibilities

1. Refuse if Validation is not PASS or path is not `PO_MATCH`.
2. Read Agent 10. If open flag → `RECOMMEND_NO_ACTION_ANOMALY_HOLD` only.
3. Choose path: 3-way inventory/direct; 2-way contracted services ≤ policy cap; else `OUT_OF_SCOPE` to Triage.
4. Identify candidate GR/SES set. If ambiguous → `GR_AMBIGUOUS` to Triage. Do not pick the set that “makes it work.”
5. Compare quantity, price, UOM, currency, tax *amounts vs PO/receipt*, account assignment presence (not redesign).
6. Apply tolerances. Record each test and the hash.
7. Emit one recommendation (see §11).
8. Seed Agent 05 if missing GR; seed Agent 06 if PO defect codes fire.
9. Present worksheet to the specialist queue.
10. Record accept/edit/reject. Edits are human; the agent does not learn an override as a new secret tolerance.

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Posting the vendor invoice at L0/L1.
3. Creating or reversing GR/SES.
4. Changing PO price, qty, tax, vendor, or account.
5. Editing tolerances.
6. Clearing Agent 10 flags.
7. Multi-PO invoices (Northline Wave 1) — route out.
8. Price override because “email from buyer.”
9. Dummy GR to clear GR/IR.
10. CA/MX live match before those charters exist.
11. Intercompany, customs, consignment (until chartered).
12. Claiming the match is “accurate accounting.”

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Match Lead / Priya Shah |
| Backup | Marcus Bell |
| Escalation | AP Manager; Plant Controller > $50k with dual breaks |
| Owns | Worksheet quality, specialist standard, promotion cases |
| Does not own | Warehouse GR create, PO change, payment, tax position |

---

## 9. Approval requirements

| Recommendation | Approver | Extra |
|---|---|---|
| `RECOMMEND_MATCH` ≤ $50k | Match specialist | Worksheet + hash + image |
| `RECOMMEND_MATCH` > $50k | Specialist + Plant Controller | Buyer if price was human-edited |
| Hold / route codes | Auto-route OK | Triage owns next |
| Post in ERP | Human poster at L1/L2; L3 only on signed subclass | Never payment |
| Any tolerance exception | Human only | Recorded as edit, not agent success |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| 3 extract versions fail match | Quality (02/01) | Third fail |
| Tax variance > $100 | Tax | Same day |
| Qty *and* price break, header > $50k | Plant Controller | Same day |
| Open flag + otherwise clean | Controls Lead | Before accept |
| GR read fail > 2 hours | IT + Match Lead | 2 hours |
| Reject rate > 15% / 200 invoices | Process Owner | Weekly |
| Ambiguous GR set on consignment | Plant Finance | Same day |

---

## 11. Output standard

Recommendation enum (closed):

| Code | Meaning | Next |
|---|---|---|
| `RECOMMEND_MATCH` | In tolerance, no flag | Human post / later L3 subclass |
| `RECOMMEND_HOLD_MISSING_GR` | PO ok, receipt missing | Agent 05 |
| `RECOMMEND_ROUTE_PO_QUALITY` | PO defect | Agent 06 |
| `RECOMMEND_ROUTE_TRIAGE` | Other break | Agent 04 |
| `RECOMMEND_NO_ACTION_ANOMALY_HOLD` | Agent 10 open | Controls |
| `OUT_OF_SCOPE` | Charter exclusion | Triage |

Worksheet minimum: object ID; agent `03`; level; company; invoice; PO; GR/SES IDs; line compare table (inv qty/price/UOM vs PO vs GR); tolerance tests; hash; flag state; recommendation; owner; timestamp; evidence URI.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| 3-way policy | Applied, not posted by agent at L1 | 25 worksheets/week vs ERP |
| SoD match vs pay | No payment privilege | Quarterly access |
| Tolerance integrity | Hash | Monthly |
| Duplicate hold | Cannot recommend match | 100% flagged objects |
| Audit trail | Accept log | 15-minute retrieve |

---

## 13. Audit evidence

Worksheets 7 years; hashes + policy PDFs 7 years; accept/edit/reject 7 years; access 1 year; promotion records life-of-programme.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Worksheet coverage | In-scope PASSes with worksheet same day | Flow |
| Accept / edit / reject | Rates by code | Quality |
| Material error | Accepted then reversed for match error | Demotion |
| Misroute | Wrong next agent | Handoff |
| Flag-block integrity | 100% | Control |
| $50k SLA | Escalations on time | Control |
| Cost / 1,000 | Model + specialist minutes | Brake |

No “first-time-match %” as a promised outcome. Northline may *observe* FTM as a process measure on the reporting pack (Agent 14), not as this agent’s success bonus.

---

## 15. Performance history fields

Period; presented; worksheets; recommendations by code; accept/edit/reject; material errors; flag holds; multi-PO out; entity split; hash; level; incidents; cost; GR-ambiguous count.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow worksheets |
| L1 | Live recommend; human post | **Default** |
| L2 | Prepare-for-post packet (journal-ready fields) |
| L3 | Post *only* named subclass (e.g. US-OH 3-way inventory, ≤ $5,000, no flag, hours-bound) |
| L4 | Exception oversight of that subclass |

Payment never enters this ladder. Raising the $5,000 cap is a new L3 case.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| ERP read fail | Freeze queue; no stale match |
| Timeout | Retry once; fail to human |
| Validation not PASS | Refuse |
| Ambiguous GR | Triage `GR_AMBIGUOUS` |
| Open flag | Anomaly hold |
| 401/403 | Stop all jobs; Security |

---

## 18. Cost monitoring

Inference tokens, connector errors, specialist edit/reject minutes, reversal rework. Pause: 2× cost + falling accept rate for 3 weeks; or material-error cluster ≥ 5/week → L0.

---

## 19. Handoffs

02→03 on PASS PO; 10→03 blocks; 03→human specialist; 03→04/05/06; human→ERP post; 03→16 events.

---

## 20. Configuration parameters

| Parameter | Northline start (`AP-MAT-004`) |
|---|---|
| Qty tolerance | ±2% or 1 unit (greater) |
| Price tolerance | ±1% or $25 (greater) |
| Tax variance | Not auto-cleared; > $100 escalate Tax |
| 2-way services cap | $10,000 + contract ref |
| Multi-PO | Out of scope |
| Header second-approver | $50,000 |
| L3 subclass (future) | Not in force |

---

## 21. First 90 days

Follow the worked progression in `AUTONOMY_PROGRESSION.md`. Do not open L3 in the first 90 days. Spend the period coding breaks honestly — missing GR vs bad PO vs UOM — so Agents 05, 06, and 15 have material.

---

## 22. Worked example — Northline Industrials

**`WO-1048821` Lakeshore Steel $19,596, PO 45007821, Dayton inventory.**

PO: 12 lines, item fasteners, UOM EA, prices match face. WMS shows product receipt `PR-88311` two days earlier, qty exact on 11 lines; line 7 invoice 1,000 EA vs receipt 980 EA (2.04% over). Tolerance is 2% or 1 unit — **fails** (20 units and 2.04% > 2%).

Recommendation: `RECOMMEND_ROUTE_TRIAGE` with break `QTY_OVER` on line 7. Not `RECOMMEND_MATCH`. Not a dummy GR for 20 EA. Agent 04 assigns: warehouse to confirm short-ship vs invoice error. Agent 08 may later draft a query if warehouse confirms 980 received.

Specialist accepts the *route*, not a match. Cycle time on this object will look “slow.” That is correct.

**Second object `WO-1049400`:** $3,110, 3-way, all lines in tolerance, no flag. `RECOMMEND_MATCH`. Specialist accepts. Junior poster posts in D365. Item sits open until Thursday’s human-authorised payment run. Agent 03’s job ended at the worksheet.

**Third `WO-1049555`:** Clean numbers, but Agent 10 flag `possible_duplicate` vs invoice 88321. `RECOMMEND_NO_ACTION_ANOMALY_HOLD`. Priya cannot accept match until Elena clears or confirms.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 03
recommendation: RECOMMEND_ROUTE_TRIAGE
break_codes: [QTY_OVER]
line_7: inv_qty 1000 vs gr 980 vs po 1000; tol 2%|1u FAIL
tolerance_version: AP-MAT-004.3
tolerance_hash: c90a…
agent10_flag: none
autonomy_level: L1
owner: Priya Shah
next: 04
```

---

## 24. What this agent does not replace

ERP matching configuration, warehouse discipline, buyer PO hygiene, the poster, or the payment authoriser. It does not replace judgement on over-receipts.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_03 Matching |
| Default autonomy | L1 (start L0) |
| Charter example | `AGENT_CHARTER_TEMPLATE.md` section B |
