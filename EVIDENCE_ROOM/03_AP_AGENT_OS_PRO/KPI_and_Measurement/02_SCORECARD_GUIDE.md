# Evidence Room — AP Agent OS Professional

## KPI and Measurement — 02 Scorecard Guide

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** KPI and Measurement  
**Standard:** Proof before permission  
**Audience:** AP Manager, Head of AP, Control owner, Controller  
**Version:** 1.0  
**Examples:** ACME layouts — **ILLUSTRATIVE**.

---

### Purpose

Tell a person how to **build and read** an agent scorecard so promotion decisions use the dictionary, not a colour-blind traffic-light slide.

This is not a scorecard full of invented targets.

---

## 1. What to do

Produce one scorecard **per agent** plus one **stack** roll-up. Each card has four bands (Activity / Operational / Financial / Risk-control). Risk-control is on page one. Activity is last.

Do not produce a single composite index.

---

## 2. How

### 2.1 Card header (mandatory)

```
Agent:            [name / charter ID]
Level / scope:    [L0–L4 + allow-list summary]
Period:           [ ]
Dictionary ver:   [ ]
Baseline ID:      [ ]
n_min:            [ ]
Accountable:      [ ]
Supervisor:       [ ]
Change IDs in P:  [ ]
Open incidents:   [ ]
```

### 2.2 Band order

1. **Risk-control** — KPI-RSK-*, KPI-ERR-FNR (high-risk conditions), KPI-RSK-DPP if measurable  
2. **Operational accuracy** — KPI-ACC-*, KPI-ERR-FPR  
3. **Operational flow** — STP, intervention, times, follow-up, ageing, PO/GR  
4. **Financial** — costs; savings only if signed  
5. **Activity** — invoices/exceptions handled  

### 2.3 Row standard

| Column | Rule |
|---|---|
| ID | Dictionary ID |
| Result | Number or `n<n_min — count=…` |
| n | Denominator |
| Baseline | Frozen |
| Target | Buyer target or `guardrail` or `none` |
| Vs baseline | Absolute, not a traffic-light only |
| Mix note | If mix shifted |
| Owner | Named |
| Evidence pointer | File ID |

Colours, if used: **only** for guardrail breach (risk-control or FNR ceiling). Do not colour activity.

### 2.4 How to read (decision rules)

| Observation | Do |
|---|---|
| Any hard-control breach or Sev-1/2 open | No promotion; consider freeze |
| High-risk FNR above ceiling | Demote or remove that code |
| STP up, rework up | Treat as failed operational period |
| Inference cost down, accuracy down | Not a saving |
| Hours released estimate only | Keep off management headline |
| Activity up, everything else flat | Capacity note, not a success |
| n below n_min | Do not discuss “rates” in steering |

### 2.5 Stack roll-up

Sum activity. **Do not average** accuracy across agents with different jobs. Show a table of agents with: level, high-risk FNR status, breaches, whether Measure pack is current.

### 2.6 Cadence

| Card | When | Audience |
|---|---|---|
| Agent weekly | Weekly | AP Manager huddle — see `03_WEEKLY_AGENT_REPORT.md` |
| Agent monthly | Monthly | Head of AP, Control owner |
| Stack / management | Monthly / steering | `04_MANAGEMENT_DASHBOARD.md` |
| Promotion pack | On request | Autonomy board — full Measure pack, not this one-pager alone |

---

## 3. Who

AP Manager compiles. Control owner accepts the risk-control band. Controller accepts the financial band or the band stays “cost only.” Head of AP accepts the card as a true extract.

Reporting Agent may **draft** (L2). Human accept required.

---

## 4. What can go wrong

| Failure | Fix |
|---|---|
| One green/red “AI health” tile | Delete it |
| Targets with no method | Blank the target; show baseline |
| Agent compared to another company | Remove |
| Scope silently group-wide | Header scope must match the numbers |
| Scorecard used as the only promotion file | Refuse; demand Measure pack |

---

## 5. Control

- Lint: IDs, n, baseline, dictionary version.  
- Unsigned savings stripped by the Controller before issue.  
- Archive every issued card (evidence retention).

---

## 6. Measure

Issued cards failing lint; promotions citing a card without a Measure pack; financial lines unsigned.

---

## 7. Evidence

`[BUYER]/Evidence/Measure/Scorecards/<agent>/<period>/`

---

## ACME — ILLUSTRATIVE one-agent skeleton

**Matching Agent — L1 — Entity A — PO goods — P = week 12**

Risk-control: breaches 0; FNR EX-MAT/EX-GR on labelled n=40 = `[count only if n_min not met]`; GR-create by agent 0.  
Operational: matching accuracy on same file; FPR. STP **not** claimed for this agent (it does not post).  
Financial: inference cost from ledger; CCO using the QA file. Savings: none signed.  
Activity: PO invoices scored.

No composite. No “industry STP” tile.

---

## Related documents

- `00_KPI_FRAMEWORK.md`  
- `01_KPI_DICTIONARY.md`  
- `03_WEEKLY_AGENT_REPORT.md`  
- `04_MANAGEMENT_DASHBOARD.md`  
- `../Governance/01_AUTONOMY_POLICY.md`  

---

*End of 02_SCORECARD_GUIDE.md*
