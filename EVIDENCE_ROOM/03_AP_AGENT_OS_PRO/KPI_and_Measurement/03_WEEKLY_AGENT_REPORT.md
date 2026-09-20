# Evidence Room — AP Agent OS Professional

## KPI and Measurement — 03 Weekly Agent Report

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** KPI and Measurement  
**Standard:** Proof before permission  
**Audience:** AP Manager (author), Head of AP, Control owner, Finance Systems  
**Version:** 1.0  
**Cadence:** Weekly, issued before the first huddle after period close.  
**Examples:** ACME — **ILLUSTRATIVE**.

---

### Purpose

A working report for people who can **disable an identity on Monday**. It is not a marketing recap.

---

## 1. What to do

Every week, for each **production or shadow** agent, complete this template. Orchestrator gets a stack section. Issue even if “nothing happened” — silence is not evidence.

---

## 2. How — template

```
WEEKLY AGENT REPORT
Period:     [Mon–Sun or buyer week]
Issued:     [datetime]
Author:     [AP Manager]
Dictionary: [ver]
Baseline:   [ID]
Changes:    [Change IDs / none]
```

### Section 0 — Actions required this week (first page)

| Priority | Item | Owner | Due |
|---|---|---|---|
| Freeze / disable / incident | | | |
| Guardrail breach | | | |
| Hash / entitlement drift | | | |
| Other | | | |

If section 0 is empty, write `None — Control owner initials ____`.

### Section 1 — Identity and release hygiene

| Agent | Level | Hashes match? | Entitlements match charter? | C4/emergency? | Logger heartbeat |
|---|---|---|---|---|---|
| | | Y/N | Y/N | | OK/Fail |

Any **N** or Fail → Section 0.

### Section 2 — Incidents, overrides, breaches

| ID | Agent | Type (incident / OV-FCE / breach) | Sev | Status | Link |
|---|---|---|---|---|---|
| | | | | | |

Counts: OV-AGR / REJ / COR / FCE. Top REJ reason codes.

### Section 3 — Risk-control KPIs

| ID | Agent / condition | Result | n | Guardrail | Breach? |
|---|---|---|---|---|---|
| KPI-RSK-BRH | | | | | |
| KPI-ERR-FNR | EX-DUP / EX-PAY-001 / EX-TAX / … | | | | |
| KPI-RSK-RWK | | | | | |
| KPI-RSK-ESC | | | | | |
| KPI-RSK-DPP | only if measurable | | | | or `not measurable` |

### Section 4 — Operational (only IDs in scope for that agent)

Do not print STP on an agent that cannot post. Do not print extraction accuracy on the Orchestrator.

| ID | Result | n | Baseline | Note |
|---|---|---|---|---|

Include mix: invoices by type/channel if STP or TTP is shown.

### Section 5 — Financial (cost)

| ID | Result | Source |
|---|---|---|
| KPI-FIN-AIC | | Ledger |
| KPI-FIN-CCO | if QA ran | QA file |
| KPI-FIN-SAV | `unsigned — omitted` or signed amount + pack ID | |

Hours released: ESTIMATE only, or omit.

### Section 6 — Activity (last)

Invoices handled; exceptions handled; drafts sent/prepared. No commentary about “momentum.”

### Section 7 — Exception mix (taxonomy)

Top codes by open and by new. UNMAPPED count. EX-AGE-001. EX-PAY-001 count (always list, even zero).

### Section 8 — Narrative (bounded)

Max six bullets. Each bullet cites an ID or an incident ID. Forbidden words: revolutionary, transformative, guaranteed, world-class, fraud-proof.

Allowed structure:

- What broke or nearly broke  
- What the labels said  
- What we will disable, test, or ask a policy owner  
- What we will **not** promote  

### Section 9 — Next week

Test packs due; pilots in window; people on leave who are Accountable (deputy named).

---

## 3. Who

| Role | Duty |
|---|---|
| AP Manager | Issues the report; owns Section 0 until closed |
| Control owner | Initials Section 0 empty **or** accepts the listed actions |
| FinSys | Supplies hash/heartbeat/entitlement lines |
| Head of AP | Reads Section 0 same day when it is not empty |
| Reporting Agent | May draft sections 3–7; must not write Section 0 |

---

## 4. What can go wrong

- Report skipped during month-end (highest-risk week).  
- Section 0 buried after a volume chart.  
- “All green” with UNMAPPED exploding.  
- Vendor screenshot attached instead of dictionary IDs.

---

## 5. Control

- Issued to a dated folder.  
- Control owner initials weekly.  
- Missing week = Control owner notified (process defect).  
- Emergency changes in P must appear in Section 1.

---

## 6. Measure

On-time issue rate; weeks with Section 0 unsigned; hash lines omitted; reports without EX-PAY-001 line.

---

## 7. Evidence

`[BUYER]/Evidence/Measure/Weekly/<period>/` plus huddle attendance (optional).

---

## ACME — ILLUSTRATIVE excerpt

Section 0: Matching Agent hash match Y; Intake model pin Y. OV-FCE = 0. EX-PAY-001 new = 1 (held; Treasury ticket T-884). FNR sample for EX-DUP not due this week (scheduled monthly). Activity 1,140 invoices received — listed last, not discussed. Narrative: “Do not expand GR chase to Plant East (RR-AP-029 still open).”

---

## Related documents

- `02_SCORECARD_GUIDE.md`  
- `../Governance/03_INCIDENT_AND_OVERRIDE.md`  
- `../Controls/03_EXCEPTION_TAXONOMY.md`  

---

*End of 03_WEEKLY_AGENT_REPORT.md*
