# Scorecard Definitions

**Product:** AP Agent OS — Evidence Room  
**Use with:** `KPI_FRAMEWORK.md`  
**Purpose:** Specify the scorecard objects — who sees which tiles, traffic-light rules, and how a window is closed.  
**Example:** Northline Industrials, NIL PO-goods

A scorecard is a **closed window** with locked formulas. It is not a live vanity wall.

---

## 1. Scorecard types

| ID | Name | Audience | Window | Families |
|---|---|---|---|---|
| SC-W | Weekly operations | AP manager, AP lead, implementation | Mon–Sun working days locally defined | Activity, Operational, Risk-control (weekly subset) |
| SC-M | Monthly management | Controller, process owner, treasurer (financial tiles) | Calendar month | All four |
| SC-P | Pilot | Dual A + test lead | Pilot charter dates | All four; floors from the charter |
| SC-T | Test / hold-out | Test lead, control owner | Named pack id | Operational accuracy + FPR/FNR + Critical-code |

Do not mix SC-T gold-label accuracy with SC-W production sampling in the same column without labelling the source.

---

## 2. Common header (every scorecard)

| Field | Rule |
|---|---|
| Organisation / entity / path | Exact scope string, e.g. `NL / NIL / PO-goods` |
| Window start / end | Inclusive dates; timezone named |
| Formula version | `KPI_FRAMEWORK.md` version + date locked |
| Agent versions | Model id + config hash at window start; note mid-window changes (they taint SC-P) |
| Exclusions | List or “none” |
| Completeness | `% of handled invoices with required logs` — if < 0.99, mark the card **incomplete** |
| Authors | Preparer, reviewer |
| Status | Draft / Closed / Void (formula change) |

---

## 3. Traffic lights

Lights are **thresholds**, not opinions. If a threshold is not set, the cell is numeric only.

| Light | Meaning |
|---|---|
| Green | Meets floor and no Critical breach |
| Amber | Between floor and a named watch level, or a non-Critical breach |
| Red | Below floor, or any Critical catalogue breach, or incomplete card used for a go/no-go |
| Grey | Unreported (definition not met, join impossible, or not attested) |
| Blue | Context-only activity count |

**Precedence:** Critical breach forces Red on the risk row and on the card’s **expansion recommendation**, even if operational tiles are Green.

Northline SC-P defaults:

| KPI | Green | Amber | Red |
|---|---|---|---|
| Acc_class | ≥ 0.98 | 0.96–<0.98 | < 0.96 |
| Acc_ext field | ≥ 0.95 | 0.92–<0.95 | < 0.92 |
| Acc_match | ≥ 0.93 | 0.90–<0.93 | < 0.90 |
| FNR EX-DUP / EX-ILE | ≤ 0.01 | 0.01–0.02 | > 0.02 |
| FNR EX-BNK | ≤ 0.02 | 0.02–0.04 | > 0.04 |
| Control breaches (Critical) | 0 | — | ≥ 1 |
| Log_ok | 1.00 | 0.99–<1.00 | < 0.99 |
| STP | Monitor only in v03 | — | — |
| Sav_val | Grey unless attested | — | — |

STP has no Green in propose-only. A high STP with a Critical miss is still a Red card.

---

## 4. SC-W — weekly operations layout

**Rows (fixed order)**

1. Completeness / log integrity  
2. N_received, N_inv_handled, N_exc_handled (blue)  
3. Coverage, STP, HIR  
4. Acc_class, Acc_ext, Acc_match — **state sample vs gold-label**  
5. FPR/FNR for Duplicate, Quality, Match, EX-BNK (small multiples, not blended)  
6. ART (median + P90) by top five codes  
7. TTP median  
8. OT_sup, OT_int  
9. Age_red_n, MR_red  
10. Dup_det; Dup_pay_prev (grey if unjoined)  
11. Rework  
12. N_breach, missed escalation on Critical codes  
13. Commentary (mix, outages, model change)

**Required commentary prompts**

- What volume mix changed (new supplier, month-end statements)?  
- Which code drove ART P90?  
- Any EX-BNK, EX-ILE, EX-DUP posted-risk events?  
- Any agent version change?

**Not on SC-W:** CPI, hours × rate, ROI, “health score”.

---

## 5. SC-M — monthly management layout

Adds to SC-W closed weeks:

| Tile | Rule |
|---|---|
| CPI, CPE, C_ai, CPCO | Grey if allocation not agreed |
| Hrs_est | Labelled estimated; show baseline source |
| Sav_val | Controller signature or grey |
| PO_comp | Path adherence |
| POT | Joint with treasury; exclusions listed |
| Rep | Repeat exception keys |
| N_aud_exc | Evidence sample |
| Expansion recommendation | Proceed / hold / stop — one word + reason |

The expansion recommendation is a **control-owner sentence**, not an average of lights.

---

## 6. SC-P — pilot card

Same tiles as SC-M, plus:

| Extra field | Rule |
|---|---|
| Charter id | Required |
| Kill-switch tests | Count and last result |
| Override rate and top reasons | Mandatory |
| In-scope identifiers | Supplier list / value band |
| Go / no-go | Dual A signatures |

If a mid-pilot model change occurs, void SC-P and start SC-P2, or report split windows. Do not stitch them.

---

## 7. SC-T — test / hold-out card

| Tile | Rule |
|---|---|
| Pack id, seal status | Required |
| Scorer ≠ tuner | Named |
| Acc_class / Acc_ext / Acc_match | Against the pack only |
| FPR/FNR per detector | Confusion matrices attached |
| Acc_crit | Separate row |
| Defects Critical / High / Med / Low | Counts; Critical must be 0 to pass |
| Pass / fail vs charter floors | Binary |

Do not include STP, hours, or cost on SC-T.

---

## 8. Agent-level slices

When slicing SC-W by agent, report only tiles the agent can influence.

| Agent | Primary tiles |
|---|---|
| 01 Invoice Intake | N_received vs channel, unfiled overnight, Acc_class, Acc_ext |
| 02 Invoice Validation | EX-IQ / EX-ILE / EX-TAX / EX-BNK coverage and FPR/FNR |
| 03 Matching | Acc_match, EX-PRM/QTM FNR |
| 04 Exception Triage | Code accuracy, EX-AGE hygiene, rework |
| 05 Goods Receipt | EX-MRX/PRX, posted-without-GR (0), OT_int on GR |
| 06 PO Quality | Defect class mix, FPR to buyers |
| 07 Approval | EX-APM ageing, missed EX-DOA |
| 08 Supplier Resolution | OT_sup, forbidden-claim incidents |
| 09 Internal Follow-up | OT_int, blank-owner, email-as-approval (0) |
| 10 Duplicate & Anomaly | FPR/FNR by rule, Dup_det, HINT-only flags (0) |
| 11 Vendor Statement | Created-from-statement (0), EX-STD ART |
| 12 Payment Proposal Review | Hold omissions, agent-id on release (0) |
| 13 AP Close | Checklist completeness, post-by-agent (0) |
| 14 AP Reporting | Grey-vs-zero defects, forbidden tiles (0) |
| 15 Root Cause | Accept/reject log, n-floor breaches |
| 16 Orchestrator | Blank owner, missing evidence URI, forbidden routes |

Do not rank the 16 agents on a single league table.

---

## 9. Closing a window

1. Completeness check.  
2. Pull measures with stored queries (query ids in the pack).  
3. AP lead comments operational rows.  
4. Control owner comments risk rows (SC-M / SC-P).  
5. Finance BP completes or greys financial rows (SC-M / SC-P).  
6. Status → Closed. After close, numbers are not edited; issue a correction note.

Northline stores closed cards as `SC-W-NIL-YYYY-Www` and `SC-M-NIL-YYYY-MM`.

---

## 10. Worked extract — SC-W-NIL-2026-W19 (illustrative)

| Tile | Value | Light | Note |
|---|---|---|---|
| Completeness | 1.00 | Green | Hash present |
| N_inv_handled | 186 | Blue | Helion volume up |
| STP | 0.41 | — | Propose-only |
| HIR | 0.52 | — | Coverage 0.93 |
| Acc_match (sample n=40) | 0.93 | Green | Two EX-PRX labelled EX-QTM |
| FNR EX-DUP (sample) | 0.00 | Green | |
| FNR EX-BNK (sample n=8 compare cases) | 0.00 | Green | Small n — do not generalise |
| ART P90 EX-MRX | 9.5 wd | Amber | Warehouse silence; R-32 |
| N_breach | 0 | Green | |
| Dup_pay_prev | — | Grey | Proposal history join not live |
| Sav_val | — | Grey | |

Expansion recommendation is not issued on SC-W. It appears on SC-M / SC-P only.
