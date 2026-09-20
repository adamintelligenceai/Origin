# Management Dashboard Spec

**Product:** AP Agent OS — Evidence Room  
**Audience:** Controller, AP manager, treasurer (limited tiles), implementation lead  
**Purpose:** Specify a management view that can be built in any BI tool. ERP-agnostic.  
**Not:** A real-time trading floor, a vendor demo wall, or a single health score.

Northline’s first dashboard is monthly-plus-exception, with a weekly strip. It does not auto-recommend expansion.

---

## 1. Design rules

1. **Four bands** on one page: Risk-control, Operational, Activity, Financial — in that order. Risk at the top so a green STP cannot hide a breach.  
2. **Grey is a first-class state.** Unreported ≠ zero.  
3. **Every tile** shows: value, window, sample/source, light, definition id.  
4. **Click-through** goes to a case list (invoice ids, codes), not to a model explanation essay.  
5. **Language filter:** reject tiles whose titles contain fraud, guaranteed, ROI, autonomous pay, compliant, or accurate-books.  
6. **No blended accuracy** across classification, extraction, and match.  
7. **Row-level security:** EX-BNK detail restricted to AP lead, steward, controller.  
8. **Refresh:** weekly tiles T+1 working day; monthly tiles after finance close extras; breaches near-real-time if the log allows, else daily.

---

## 2. Page map

| Page | Users | Content |
|---|---|---|
| P0 Overview | Dual A, AP lead | Four bands, expansion status (manual), open Critical actions |
| P1 Queue & ageing | AP manager, AP lead | Codes, owners, SLA |
| P2 Quality | Test lead, AP manager | Accuracies, confusion, samples |
| P3 Duplicate & holds | AP lead, treasurer (holds only) | Pairs, X4, hold omissions |
| P4 Cost | Finance BP, controller | CPI, C_ai, Hrs_est, Sav_val |
| P5 Audit evidence | Controller | Pack completeness, version hashes |
| P6 Agent ops (restricted) | Implementer, systems | Versions, EX-SYS, latency — not a management vanity page |

P6 is not shown in the executive pack.

---

## 3. P0 Overview tiles

### Band A — Risk-control

| Tile id | Title | KPI | Viz | Light | Drill |
|---|---|---|---|---|---|
| A1 | Critical control breaches (window) | N_breach | Integer + 13-week sparkline | Red if ≥1 | Breach register |
| A2 | Critical-code accuracy | Acc_crit | % + n | Per SC | Sample list |
| A3 | Missed Critical escalations | 1−Esc on Critical | Integer | Red if ≥1 | Cases |
| A4 | Forbidden-action attempts | Count of blocked tool calls | Integer | Red if write landed; Amber if blocked >0 in prod | Log |
| A5 | Evidence pack fail (last monthly sample) | N_aud_exc | Integer | Amber ≥1 | Pack ids |

### Band B — Operational

| Tile id | Title | KPI | Viz | Notes |
|---|---|---|---|---|
| B1 | Classification accuracy | Acc_class | % + n + source tag | Source tag required |
| B2 | Extraction accuracy (field / doc) | Acc_ext | Dual % | |
| B3 | Matching accuracy | Acc_match | % + n | |
| B4 | FNR strip | FNR per detector | Small multiples | Never one bar “FNR” |
| B5 | STP / HIR / Coverage | STP, HIR, Cov | Three numbers | Caption: propose-only |
| B6 | Time to post (median, P90) | TTP | Days | |
| B7 | Exception ART (median, P90) | ART | Hours or days | |
| B8 | On-time chase | OT_sup, OT_int | Dual % | |
| B9 | Ageing > trigger (n, value) | Age counts | Combo | |
| B10 | Missing receipt open (n, value) | EX-MRX | Combo | |
| B11 | Rework rate | Rework | % | |
| B12 | PO path adherence | PO_comp | % | Not “compliance certified” |

### Band C — Activity

| Tile id | Title | KPI | Viz |
|---|---|---|---|
| C1 | Received / handled / parked_owned | Counts | Stacked week bars |
| C2 | Exceptions closed | N_exc_handled | Week bars by code (top 8 + other) |
| C3 | Confirmed duplicates | Dup_det | Week bars |

### Band D — Financial

| Tile id | Title | KPI | Viz | Gate |
|---|---|---|---|---|
| D1 | Cost per invoice | CPI | Currency | Grey if no allocation |
| D2 | Cost per exception | CPE | Currency | Same |
| D3 | AI inference cost | C_ai | Currency + per invoice | |
| D4 | Cost per correct outcome | CPCO | Currency | Needs adjudication sample |
| D5 | Estimated hours released | Hrs_est | Hours | Caption “estimated”; baseline cited |
| D6 | Validated financial savings | Sav_val | Currency | Controller attestation; else grey |
| D7 | Duplicate payments prevented | Dup_pay_prev | Count + amount if attested | Grey if unjoined |

D5 and D6 shall not sit in the same visual cluster in a way that implies they add.

---

## 4. Filters (global)

- Entity (default NIL)  
- Path (default PO-goods)  
- Window (week / month / pilot charter)  
- Supplier (optional; hides EX-BNK bank values)  
- Agent version (for quality pages)

Default entity must be explicit. “All entities” is a conscious click, not the landing state.

---

## 5. P1 Queue & ageing

| Object | Spec |
|---|---|
| Table | Invoice id, supplier, entity, code, related codes, set date, age wd, owner, last chase, value |
| Charts | Open n and value by code; age histogram; owner load |
| Rules | EX-AGE rows highlighted; Critical codes pinned at top |
| Actions | Export ids for the stand-up — not emailing the full image pack |

---

## 6. P2 Quality

| Object | Spec |
|---|---|
| Confusion matrices | One per detector; raw TP/FP/TN/FN |
| Field heatmap | Extraction required fields, error rate |
| Unsupported output | Count of validation fails by type |
| Sample browser | Label, proposal, agree/disagree — ids only |

If n < 30, print “small n” on the tile. Do not show 100% on n=4 without the n.

---

## 7. P3 Duplicate & holds

| Object | Spec |
|---|---|
| Pair table | Id-a, id-b, type EX-DUP/PDUP, status, X4 by, payment-list flag |
| Hold table | Invoice, hold type, setter, EX-BNK/DIS/HLD, listed-in-last-pack? |
| Omission alert | Hold-worthy not listed (should be empty) |

Treasurer role sees hold table and omission alert, not EX-BNK face images.

---

## 8. P4 Cost

| Object | Spec |
|---|---|
| Inputs panel | C_people, C_vendor, C_ai, allocation note — editable only by finance BP |
| Tiles | D1–D7 |
| Narrative box | Mandatory if D6 is not grey: method paragraph |

If someone enters `Hrs_est × rate` into D6, the tile must refuse the save (validation rule).

---

## 9. P5 Audit evidence

| Object | Spec |
|---|---|
| Sample list | 25 ids, pack complete Y/N, missing objects |
| Version board | Production model id, prompt hash, SOP version, tree versions, last change |
| Kill-switch | Last drill date, last live use |

---

## 10. Data contracts

Minimum feeds (logical, not physical):

| Feed | Grain | Key fields |
|---|---|---|
| Invoice fact | Invoice | id, entity, path, stub_ts, post_ts, terminal, value, supplier |
| Exception fact | Invoice × code | set_ts, close_ts, owner, related_codes |
| Proposal fact | Proposal | agent, version, hash, validation, accept/edit/reject |
| Label fact | Invoice × task | gold or adjudicated leaf |
| Detector fact | Invoice × detector | TP/FP/TN/FN assignment |
| Payment-list fact | Invoice × run | listed flag, approved-for-pay flag |
| Cost fact | Month | allocations |
| Breach fact | Event | catalogue type, ids |
| Pack fact | Invoice × sample | completeness |

Joins on invoice id + entity. Do not join on supplier name.

Latency: proposal and breach feeds should not lag more than one working day; cost feed monthly.

---

## 11. Alerting (narrow)

Alerts are not tiles. Allowed product alerts:

| Alert | Condition | To |
|---|---|---|
| Critical breach | A1 increment | Control owner, process owner |
| Hold omission | P3 omission > 0 | AP lead, treasurer |
| Hash mismatch | Production hash ≠ release register | Systems, control owner |
| Intake gap | Channel count − stubs > 0 overnight | AP lead |

Do not alert on STP movements or token spend.

---

## 12. Acceptance tests for the dashboard

The dashboard is not accepted if any of these are true:

- A tile titled with a forbidden word  
- D6 populated from hours  
- Blended accuracy tile on P0  
- EX-BNK full account visible to a processor role  
- Default view is all entities  
- A single “agent score” gauge  
- Live “savings clock”

Northline acceptance: P0–P5 built in the incumbent BI tool; P6 in the operations console. Sign-off by Shah (risk and language) and Chen (queue utility).

---

## 13. Wire copy (approved examples)

Use these titles verbatim if helpful:

- “Critical control breaches”  
- “Matching accuracy (labelled sample)”  
- “Estimated human hours released (baseline W10 time study)”  
- “Validated financial savings (attested)”  
- “Duplicate payments prevented (joined to payment list)”  
- “Open missing-receipt value”

Do not use: “AI savings engine”, “fraud shield”, “autonomous AP”, “compliance score”.
