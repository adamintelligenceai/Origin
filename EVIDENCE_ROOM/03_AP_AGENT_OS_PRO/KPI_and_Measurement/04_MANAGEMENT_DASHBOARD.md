# Evidence Room — AP Agent OS Professional

## KPI and Measurement — 04 Management Dashboard

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** KPI and Measurement  
**Standard:** Proof before permission  
**Audience:** CFO / Finance Director, Controller, Head of AP, Control owner, Internal Audit (read)  
**Version:** 1.0  
**Cadence:** Monthly, or at each steering / autonomy decision.  
**Examples:** ACME — **ILLUSTRATIVE**.

---

### Purpose

Give executives a **small, honest** view: are AP agents still supervised, still correct on the risks that matter, and costing what we think — without a vanity mosaic.

If a tile cannot cite a dictionary ID, it does not ship.

---

## 1. What to do

Publish one page (or two). Anything else is an appendix. The weekly report remains the operational system; this dashboard must not replace it.

---

## 2. How — layout

### Page 1 — Control and permission

**A. Permission state (table, not gauges)**

| Agent | Level | Scope (short) | Last Measure pack | Open Sev-1/2 | Hash OK | Promotion eligible? |
|---|---|---|---|---|---|---|
| 16 rows | | | date / none | | Y/N | Y only if policy gates met |

Promotion eligible is **computed** from `01_AUTONOMY_POLICY.md`, not a vibe.

**B. Risk-control strip**

| ID | Name | Result | n | Guardrail |
|---|---|---|---|---|
| KPI-RSK-BRH | Control breaches | | | |
| KPI-ERR-FNR | High-risk FNR (DUP / bank / tax — one line each) | | | |
| KPI-RSK-AUD | Audit exceptions open | | | |
| KPI-RSK-RWK | Rework rate | | | |
| KPI-RSK-DPP | Dup payments prevented | | | or `not measurable` |

**C. Decisions asked of this meeting**

Maximum three. Examples: freeze X; do not promote Y; fund a Test pack for Z. No “note the progress.”

### Page 2 — Outcomes (still not a composite)

**D. Operational (scope-stated)**

Choose only the outcomes this organisation is actively managing. Typical set:

| ID | Result vs baseline | Mix warning |
|---|---|---|
| KPI-OPS-STP | | |
| KPI-OPS-TTP | median / p90 | |
| KPI-OPS-AGE | | |
| KPI-OPS-GRR | | |
| KPI-OPS-POC | | |
| KPI-OPS-POT | | |
| KPI-ACC-MAT / EXT / CLS | as relevant | |

If mix shifted, print the mix table **above** the rates.

**E. Financial**

| ID | Result | Signed? |
|---|---|---|
| KPI-FIN-AIC | | n/a (ledger) |
| KPI-FIN-CPI | if cost model current | Controller on model |
| KPI-FIN-CCO | | |
| KPI-FIN-HHR | ESTIMATE or omit | — |
| KPI-FIN-SAV | | **Must be Yes or omit** |

**F. Activity (footnote)**

Invoices handled, exceptions handled — one line. Caption: *Activity. Not a success measure.*

### Appendices (not presented unless asked)

- Exception mix (taxonomy)  
- Override profile  
- Inference cost by agent  
- Vendor / model pins  
- Full scorecards  

---

## 3. Who

| Role | Duty |
|---|---|
| Head of AP | Accountable for the operating story |
| Controller | Accountable for Page 2 financial drawer; can strike tiles |
| Control owner | Accountable for Page 1 risk strip |
| AP Manager | Compiles from weekly reports |
| CFO / FD | Decides L4 / payment-adjacent items only; not every tile |
| Internal Audit | May attend; does not edit tiles in the meeting |
| Reporting Agent | Draft only |

---

## 4. What can go wrong

| Failure | Why it is forbidden |
|---|---|
| Heatmap of 40 KPIs | Hides the veto metrics |
| “ROI since go-live” curve | Usually unvalidated hours × a rate |
| Vendor benchmark tile | Not in the dictionary; often marketing |
| Fraud prevented tile | This OS does not claim fraud detection |
| Traffic-light average of all agents | Hides one dangerous L3 |
| Dashboard live-pulled from a model with no extract ID | Hallucination risk (Reporting Agent) |

---

## 5. Control

- Controller and Control owner sign the issued PDF/pack.  
- Tiles without IDs removed by lint.  
- SAV tile absent unless `validated_by` populated.  
- Same figures as the monthly scorecards (reconcile).  
- Dashboard is not a production control system; disable decisions still follow incident runbooks, not a red tile.

---

## 6. Measure

Steering packs issued with unsigned SAV; agents marked promotion-eligible against policy; reconciling breaks vs weekly; meetings with >3 “decisions” that are actually notes.

---

## 7. Evidence

`[BUYER]/Evidence/Measure/Dashboard/<period>/` — pack, extract IDs, signatures, decision log.

Decision log:

| Decision | Agent | Increment? | Change ID to raise | Date |
|---|---|---|---|---|
| | | one only / none | | |

---

## ACME — ILLUSTRATIVE Page 1 excerpt

Sixteen rows. Fifteen at L0–L2. Goods Receipt Agent L2 Plant North only. Payment Proposal Review Agent L1, promotion eligible = **N** (exclusions forbid proposal edit; no request). One EX-PAY-001 in the month, held, no payment. SAV tile omitted. Activity footnote: invoices received `[buyer number]`. Decision asked: “Do not add Plant East to GR chase (register RR-AP-029).”

---

## What this dashboard is not

- A compliance certificate.  
- A promise of ROI.  
- A substitute for the Evidence Room packs that actually permit autonomy.

Proof before permission.

---

## Related documents

- `00_KPI_FRAMEWORK.md`  
- `01_KPI_DICTIONARY.md`  
- `02_SCORECARD_GUIDE.md`  
- `03_WEEKLY_AGENT_REPORT.md`  
- `../Governance/00_GOVERNANCE_FRAMEWORK.md`  
- `../Governance/01_AUTONOMY_POLICY.md`  

---

*End of 04_MANAGEMENT_DASHBOARD.md*
