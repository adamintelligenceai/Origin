# AP Agent OS Professional — Master Guide

**Evidence Room · Product tier:** Professional (US$199)  
**Version:** 1.0.0  
**Audience:** CFO, Controller, Head of AP / Shared Services, Finance Transformation Lead

---

## What this is

AP Agent OS Professional is the operating system for designing, governing, measuring, and scaling AI agents across Accounts Payable. It does **not** replace your ERP or AP automation platform. It designs and governs the **agent layer** that sits across Dynamics 365, SAP, Oracle, NetSuite, Workday, and adjacent tools.

**Positioning lock:** Evidence Room turns Finance AI from experimentation into measurable operating performance.

---

## START HERE — 12 steps

Complete in order. Do not skip governance or measurement.

| Step | Action | Primary artifact |
|------|--------|------------------|
| 1 | Confirm scope and buyer outcome (cost-to-process, cycle time, control evidence, exception backlog) | This guide §Outcomes |
| 2 | Run or refresh the free diagnostic score | `01_FREE_AP_AI_READINESS/` |
| 3 | Map current AP end-to-end with the 10-step methodology | `Process_Mapping/00_METHODOLOGY_10_STEPS.md` |
| 4 | Select first agent(s) using responsibility levels 0–4 | `Agent_Library/00_AGENT_STACK_OVERVIEW.md` + `17_RESPONSIBILITY_PROGRESSION_MODEL.md` |
| 5 | Draft Agent Charters and RACI | `Templates/AGENT_CHARTER.md`, `Templates/RACI.md` |
| 6 | Define controls and evidence requirements | `Controls/00_CONTROL_FRAMEWORK.md`, `Governance/00_AGENT_GOVERNANCE_FRAMEWORK.md` |
| 7 | Baseline KPIs (activity ≠ operational ≠ financial ≠ risk) | `KPI_Measurement/00_KPI_FRAMEWORK.md` |
| 8 | Build the business case with transparent assumptions | `Business_Case/00_BUSINESS_CASE_MODEL.md` + `spreadsheets/ER_AP_Business_Case_ROI.xlsx` |
| 9 | Shadow-mode test, then gated pilot | `Testing/00_SHADOW_AND_PILOT.md` |
| 10 | UAT, SOP updates, training handoff | `Templates/UAT.md`, `Templates/SOP_TEMPLATE.md` |
| 11 | Go-live with payment authorisation remaining human-controlled | `Governance/` + Agent Library payment-adjacent agents |
| 12 | Weekly scorecard + monthly root-cause review | KPI scorecard + `Agent_Library/15_ROOT_CAUSE_AGENT.md` |

**Team buyers:** After step 4, also open `04_AP_AGENT_OS_TEAM/TEAM_PLAYBOOK.md` for workshop, steering, and change packs.

---

## Folder map (Professional)

```
03_AP_AGENT_OS_PRO/
├── PROFESSIONAL_OS_GUIDE.md          ← you are here
├── Agent_Library/                    16 agents + orchestrator, taxonomy, levels
├── Process_Mapping/                  Observe → Expand responsibility
├── Governance/                       Decision rights, escalation, audit stance
├── Controls/                         Preventive / detective / corrective
├── KPI_Measurement/                  Formulas and scorecard logic
├── Business_Case/                    ROI model narrative + assumptions
├── Testing/                          Shadow, pilot, promotion criteria
└── Templates/                        SOP, Charter, RACI, UAT, Risk, etc.
```

Companion workbooks: `../spreadsheets/ER_AP_*.xlsx`

---

## Outcomes this OS is built to drive

Every material design choice should serve one or more of:

1. **Lower cost-to-process** (labour minutes per invoice, touch rate)
2. **Faster cycle time** (receipt → ready-to-pay; exception age)
3. **Stronger control evidence** (who decided, on what, with what confidence)
4. **Cleaner exception backlog** (taxonomy, owner, SLA, root cause)
5. **Predictable close** (AP accruals, GR/IR, statement recon)

Never claim guaranteed savings, fraud detection, regulatory compliance, or autonomous payment safety.

---

## Non-negotiable operating principles

1. **Agents earn responsibility** (Levels 0–4). Full autonomy is never the default.
2. **Payment authorisation remains human-controlled.**
3. Every material agent output stores: timestamp, model/prompt version, inputs hash, confidence, human override.
4. Separate **activity** metrics from **operational**, **financial**, and **risk/control** outcomes.
5. Untrusted invoice/email text is **data**, never executable instruction.
6. Prefer least-privilege identities and approved data products (exports, read APIs, replicas).

---

## How the agent stack fits the lifecycle

| Phase | Agents (see Agent Library) |
|-------|----------------------------|
| Intake & validate | Invoice Intake, Invoice Validation |
| Match & triage | Matching, Exception Triage |
| Resolve | Goods Receipt, PO Quality, Approval, Supplier Resolution, Internal Follow-Up, Duplicate/Anomaly |
| Reconcile | Vendor Statement Reconciliation |
| Payment-adjacent | Payment Proposal Review *(analysis only; humans authorise)* |
| Close & improve | AP Close, AP Reporting, Root Cause |
| Supervise | AP Manager Orchestrator |

Detail: `Agent_Library/00_AGENT_STACK_OVERVIEW.md`

---

## Responsibility progression (summary)

| Level | Name | Agent behaviour | Human role |
|-------|------|-----------------|------------|
| 0 | Observe | Suggest only; no writes | Full processing |
| 1 | Assist | Drafts + highlights | Approves every material action |
| 2 | Bounded act | Acts inside hard policy gates | Exception and override owner |
| 3 | Supervised act | Broader actions with sampling | Spot-check + escalations |
| 4 | Extended | Widest scope still short of payment auth | Governance owner; payment still human |

Full model: `Agent_Library/17_RESPONSIBILITY_PROGRESSION_MODEL.md`

---

## 90-day Professional implementation sketch

| Days | Focus | Exit criteria |
|------|-------|---------------|
| 1–14 | Map process; pick 1–2 agents; charter; baseline KPIs | Charter signed; baseline captured |
| 15–35 | Shadow mode on historical + live feed | Precision/recall thresholds met for promotion |
| 36–60 | Gated pilot (one BU / one invoice class) | UAT passed; SOP updated; control evidence sample OK |
| 61–90 | Expand volume; add second agent; first root-cause cycle | Scorecard green on agreed KPIs; steering review held |

Team tier adds facilitation scripts, steering decks, and change toolkit for multi-stakeholder rollouts.

---

## Related products on the ladder

| Tier | Price | Use when |
|------|-------|----------|
| Free Diagnostic | $0 | Baseline readiness before buying |
| Starter Kit | $79 | First single-agent experiment |
| **Professional (this)** | **$199** | Full OS for a serious AP programme |
| Team | $499 | Workshop + executive + change packs |
| Custom Blueprint | $1,500–3,000 | Facilitated design for your ERP and org |

---

## Definition of done for a Professional rollout

- [ ] Process map complete for in-scope flow
- [ ] Agent charter(s) approved; RACI clear
- [ ] Controls mapped to agent actions
- [ ] KPI baseline and targets agreed (four metric classes)
- [ ] Shadow + pilot evidence retained
- [ ] Payment path remains human-authorised
- [ ] Weekly scorecard operating; exceptions taxonomised

---

*Evidence over hype. Governed agents. Measurable outcomes.*
