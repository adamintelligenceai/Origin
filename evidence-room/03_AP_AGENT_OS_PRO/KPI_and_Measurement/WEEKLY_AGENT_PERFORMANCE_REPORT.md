# Weekly Agent Performance Report

**Product:** AP Agent OS — Evidence Room  
**Scorecard:** SC-W  
**Cadence:** Issued by 12:00 local on the second working day after the week  
**Owner:** AP manager (Marcus Chen at Northline) with AP lead commentary  
**Distribution:** Process owner, AP lead, implementation lead, control owner (risk page). Not a supplier-facing document.

This report is a standing template. Copy it each week. Do not delete sections; mark “none” or “grey”.

---

## 0. Cover

| Field | Entry |
|---|---|
| Report id | SC-W-`<entity>`-`<ISO week>` |
| Organisation / entity / path | |
| Window | from ____ to ____ (tz: ____) |
| Formula version | KPI_FRAMEWORK ____ |
| Production agent versions / hashes | |
| Mid-window change? | No / Yes — describe |
| Completeness (Log_ok) | |
| Preparer / reviewer | |
| Status | Draft / Closed |

---

## 1. What moved this week (half page, no adjectives)

Write six lines maximum:

1. Volume vs last week (N_received, N_inv_handled)  
2. Mix (top suppliers, share of credits/statements if they leaked onto the path)  
3. Outages or EX-SYS  
4. Agent or SOP version  
5. One operational fact (e.g. EX-MRX P90)  
6. One risk fact (breaches, Critical flags)

Forbidden: “the AI is performing well”; “ROI on track”; “no fraud this week”.

---

## 2. Activity

| Measure | This week | Prior week | Notes |
|---|---|---|---|
| N_received | | | |
| N_inv_handled | | | Split posted / X4 / returned / parked_owned |
| N_exc_handled | | | |
| N_prop | | | |
| Coverage | | | |

Backlog: stubs older than 2 working days without a code: ____

---

## 3. Operational quality

State the sample: `gold-label n= __` / `shadow pair n= __` / `production sample n= __`.

| Measure | Value | Light | Sample n | Notes |
|---|---|---|---|---|
| Acc_class | | | | |
| Acc_ext (field) | | | | |
| Acc_ext (document) | | | | |
| Acc_match | | | | |
| Acc_crit | | | | |

### Detector table (do not blend)

| Detector | TP | FP | TN | FN | FPR | FNR |
|---|---|---|---|---|---|---|
| EX-DUP exact | | | | | | |
| EX-PDUP | | | | | | |
| Quality EX-IQ | | | | | | |
| Match fail (any match EX) | | | | | | |
| EX-BNK flag (where compare ran) | | | | | | |
| EX-ILE | | | | | | |

Compare coverage for EX-BNK (invoices with remittance details vs compared): ____

---

## 4. Flow and ageing

| Measure | Value | Prior | Notes |
|---|---|---|---|
| STP | | | Propose-only: do not call touchless |
| HIR | | | |
| TTP median / P90 | | | |
| ART median / P90 (all EX) | | | |
| OT_sup | | | |
| OT_int | | | |
| Age_red_n / Age_red_v | | | |
| MR_red | | | |
| Rework | | | |
| PO_comp | | | If computed weekly |

### Top codes by open value

| Code | Open n | Open value | P90 age (wd) | Owner of oldest |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

### Repeat keys (supplier + code, ≥2 in 12 weeks) — new this week

|

---

## 5. Duplicate and payment-input

| Measure | Value | Notes |
|---|---|---|
| Dup_det (confirmed) | | EX-DUP / EX-PDUP split |
| X4 closes | | |
| Cleared EX-PDUP (false pair) | | |
| Dup_pay_prev | | Grey if unjoined |
| Hold candidates listed | | |
| Hold omissions found | | Must be 0 commentary if >0 |

---

## 6. Risk-control page (control owner initials)

| Measure | Value | Light |
|---|---|---|
| N_breach (catalogue) | | |
| Breach ids | | |
| Missed Critical escalations | | |
| Agent-id on post / approve / pay / master | | Must be 0 |
| Forbidden-claim sends | | |
| Incomplete evidence packs in any ad-hoc request | | |
| Injection or privacy events | | |

Incident tickets opened: ____  
Kill-switch used?: No / Yes

Control-owner comment (required if any Amber/Red):

|

---

## 7. Agent notes (only what changed or failed)

One short paragraph max per agent that had a defect, floor miss, or version change. Silent agents: write “none”.

| Agent | Note |
|---|---|
| 01 Invoice Intake | |
| 02 Invoice Validation | |
| 03 Matching | |
| 04 Exception Triage | |
| 05 Goods Receipt | |
| 06 PO Quality | |
| 07 Approval | |
| 08 Supplier Resolution | |
| 09 Internal Follow-up | |
| 10 Duplicate & Anomaly | |
| 11 Vendor Statement | |
| 12 Payment Proposal Review | |
| 13 AP Close | |
| 14 AP Reporting | |
| 15 Root Cause | |
| 16 Orchestrator | |

---

## 8. Actions

| Action | Owner | Due | Opened week |
|---|---|---|---|
| | | | |

Carry forward without deletion until closed.

---

## 9. Northline example — SC-W-NIL-2026-W19 (abridged filled)

**What moved:** Handled 186 (was 161) on Helion month-end deliveries. No EX-SYS. Config hash unchanged (`a18e…c3`). EX-MRX P90 9.5 working days (warehouse). Critical breaches 0. Dup_pay_prev grey.

| Measure | Value |
|---|---|
| Completeness | 1.00 |
| Coverage | 0.93 |
| STP | 0.41 |
| Acc_match sample n=40 | 0.93 |
| FNR EX-DUP | 0.00 |
| EX-MRX open | 22 / 184k entity currency |
| Rework | 0.03 (5 invoices recoded after EX-ICC) |
| N_breach | 0 |

**Agent notes:** 03 Matching — two EX-PRX labelled EX-QTM; tree wording tightened in draft, not released. 09 Internal Follow-up / 05 GR — OT_int 0.71, below watch; R-32 remains open. 08 Supplier Resolution — none.

**Actions:** Warehouse meeting on GRN SLA (Chen, 2026-05-20); PDUP group-id with master data (Voss, 2026-05-30).

---

## 10. Filing

Store under `/evidence/scorecards/weekly/`. Attach query ids and the sample invoice list (identifiers only). Do not attach full images to the weekly mail.
