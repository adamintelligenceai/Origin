# Evidence Room — AP Agent OS Professional

## KPI and Measurement — 00 Framework

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** KPI and Measurement  
**Standard:** Proof before permission  
**Audience:** Head of AP, Controller, AP Manager, Control owner, Finance Systems  
**Examples:** ACME — **ILLUSTRATIVE**. No industry benchmarks are implied.  
**Version:** 1.0  
**Classification:** Measurement standard. Does not promise savings, ROI, or control effectiveness.

---

### Purpose

Measure whether agents are **correct, supervised, cheaper per *correct* outcome, and safe** — not whether they are busy.

Four families are **reported separately**. They are never netted into a single “AI score.”

| Family | Question it answers | May justify promotion? |
|---|---|---|
| **Activity** | What volume did we touch? | **No** |
| **Operational** | Did cycle time, STP, ageing, follow-up clocks improve vs **this buyer’s** baseline? | Supporting only |
| **Financial** | What did inference cost, and what cash or hours were **validated**? | Only signed lines |
| **Risk-control** | Did we breach, escalate, rework, or miss high-risk items? | **Veto** — a fail here blocks promotion |

---

## 1. What to do

1. Freeze a baseline **before** Shadow/Pilot (`../Process_Mapping/00_METHODOLOGY.md` Step 9).  
2. Use definitions in `01_KPI_DICTIONARY.md` only.  
3. Build weekly agent reports and a management dashboard from those IDs.  
4. Set targets with the method in §5 — not from vendor slides.  
5. Record gaming risks and the counter-check for every target.

---

## 2. How — families

### 2.1 Activity (descriptive)

Counts of work. Useful for capacity and cost allocation. **Forbidden** as the headline of a steering pack.

Examples: invoices handled, exceptions handled, drafts produced, recommendations issued.

**What can go wrong.** STP gamed by touching more easy invoices; agents farm volume.

**Control.** Activity appears below outcomes on every pack. Promotion checklist ignores activity.

### 2.2 Operational outcomes

Changes in how AP **works**, vs baseline, same scope (entity, channel, type).

Examples: STP rate, exception resolution rate, human intervention rate, average resolution time, time to invoice posting, on-time follow-up, ageing reduction, payment-on-time, missing-receipt reduction, PO compliance improvement, matching/extraction/classification accuracy, FPR, FNR, repeat exception rate.

**What can go wrong.** Scope mix shift (more easy PO invoices) looks like improvement.

**Control.** Report mix (channel, type, code). Stratify. Small-n codes show **count**, not a percentage theatre.

### 2.3 Financial outcomes

Money and cost, in two drawers:

| Drawer | Contents | Sign-off |
|---|---|---|
| **Cost** | Cost per invoice, cost per exception resolved, AI inference cost, cost per **correct** outcome | AP Manager + FinSys (inference ledger) |
| **Validated benefit** | Validated financial savings; estimated human hours released (labelled estimate vs validated) | **Controller** for any cash/P&L line; hours remain labelled |

Unvalidated “opportunity” may live in a working appendix marked **NOT FOR STEERING**. It is not a KPI.

**What can go wrong.** Hours-released × fully-loaded rate published as savings without a headcount or overtime change.

**Control.** Dictionary fields `validated_by` and `validation_method`. Unsigned financial lines cannot appear on `04_MANAGEMENT_DASHBOARD.md`.

### 2.4 Risk-control outcomes

Examples: control breaches, escalation rate, audit exceptions, rework rate, override/force-path, hash mismatches, open Sev-1/2, duplicate payments prevented **where measurable**.

A green operational pack with a red risk-control pack is a **failed** period.

**What can go wrong.** Breaches renamed “user education.”

**Control.** Severity and dictionary IDs; incidents cross-ref.

---

## 3. Who

| Duty | Accountable | Responsible |
|---|---|---|
| Dictionary integrity | Controller | AP Reporting owner / AP Manager |
| Baseline freeze | Head of AP | Analyst |
| Weekly report | Head of AP | AP Manager |
| Financial lines | Controller | AP Manager compiles |
| Risk-control lines | Control owner | AP Manager compiles |
| Inference cost ledger | Finance Systems | FinSys |
| Promotion use of KPIs | Head of AP / CFO as autonomy policy | AP Manager proposes |

Agents may draft packs (Reporting Agent L2). They do not accept them.

---

## 4. What can go wrong (framework-level)

| Failure | Detection |
|---|---|
| Vendor dashboard replaces dictionary | Pack without dictionary IDs |
| Baseline never frozen | No baseline worksheet ID on the Measure pack |
| Mix shift ignored | No mix table |
| Vanity headline (“1,200 invoices AI-processed”) | Reviewer rejects pack |
| Target copied from another company | No target-method note |
| Gaming (see dictionary per KPI) | Counter-check blank |

---

## 5. Target-setting method

Do **not** set a target because a blog cited a percentage.

For each dictionary KPI the buyer chooses to target:

1. **Baseline window** — last complete quarter or `[BUYER]` periods, same scope.  
2. **Minimum n** — below n, no target; report count only.  
3. **Direction** — maximise / minimise / guardrail (e.g. FNR has a ceiling).  
4. **Guardrails** — a cycle-time target must name the FNR/breach guardrail that cannot worsen.  
5. **Method note** — `baseline + judgement` or `capacity model` or `policy clock`. Not `industry`.  
6. **Owner** who can be asked why it moved.  
7. **Gaming test** — how we would cheat this target, and the counter-metric.  
8. **Review** — targets expire; they are not eternal.

**ILLUSTRATIVE ACME method (not a target):** ACME sets missing-GR chase on-time as “≥ baseline + improvement the AP Manager will own,” with a guardrail that EX-DUP FNR cannot rise. They do **not** set “STP = 80%.”

---

## 6. Control

- Pack lint: every figure has a dictionary ID, n, scope, period, source.  
- Financial drawer locked without Controller.  
- Risk-control block mandatory on weekly and management views.  
- Measure pack for promotion cites the same IDs (`01_AUTONOMY_POLICY.md`).  
- Changes to formulas are C2 (`../Governance/02_RELEASE_AND_CHANGE.md`).

---

## 7. Measure (of the measurement system)

| Check | Definition |
|---|---|
| ID coverage | Figures on issued packs with a dictionary ID / all figures |
| Small-n abuse | Percentages published below minimum n |
| Unsigned money | Count (must be zero on issued packs) |
| Baseline drift | KPIs whose baseline was edited after freeze without a change ID |

---

## 8. Evidence

- Baseline worksheet (frozen)  
- Dictionary version  
- Weekly / management packs  
- Inference cost ledger  
- Validation sign-offs  
- Stored under `[BUYER]/Evidence/Measure/`

---

## Related documents

- `01_KPI_DICTIONARY.md`  
- `02_SCORECARD_GUIDE.md`  
- `03_WEEKLY_AGENT_REPORT.md`  
- `04_MANAGEMENT_DASHBOARD.md`  
- `../Process_Mapping/00_METHODOLOGY.md` Step 9  
- `../Governance/01_AUTONOMY_POLICY.md`  

---

*End of 00_KPI_FRAMEWORK.md*
