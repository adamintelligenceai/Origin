# Layer risk assessment

**Product:** Evidence Room — AP Agent OS · Professional  
**Use:** Assess risks of *standing an agent layer*, not residual fraud risk of the company.  
**Not:** A fraud risk assessment, a SOX opinion, or an ISO/NIST certification.

Companion register: `Governance/RISK_REGISTER.md`. This template is the sit-down assessment that feeds the register.

Scoring: **Likelihood 1–4** × **Impact 1–4** on process/control outcomes. Do not convert the score into a “risk appetite for AI savings.”

---

## 1. Header

| Field | Entry |
|---|---|
| Organisation / path | |
| Date | |
| Facilitator | |
| Attendees (must include Controls) | |
| Toolkit edition | 1.0.0 |

---

## 2. Inherent situations (score each)

| ID | Situation | L | I | Score | Existing hold | Treatment | Owner |
|---|---|---|---|---|---|---|---|
| R1 | Informal copilot posts or is treated as posted | | | | | Off / L0 / charter | |
| R2 | Packet incomplete but travels | | | | | Orchestrator block | |
| R3 | Dummy GR to force match | | | | | SOP + language | |
| R4 | Agent output used as fraud finding | | | | | Language + Agent 10 L0 | |
| R5 | Payment annotated *and* released by same path without two humans | | | | | Do not open 12; C1 test | |
| R6 | Vendor bank change from an agent pack without dual control | | | | | Pack only; dual human | |
| R7 | DOA climb by Orchestrator | | | | | Exclusion | |
| R8 | Shared login / unlogged service account | | | | | IAM gate | |
| R9 | Prompt change alters behaviour silently | | | | | Change control | |
| R10 | Silent scope (new entity, new doc type) | | | | | Coverage report | |
| R11 | Staffing gap “solved” by autonomy | | | | | Queue waits | |
| R12 | Savings target drives gate-skipping | | | | | Refuse target | |
| R13 | Model wrong on tax *position* | | | | | Flag fields only | |
| R14 | Statement treated as invoice | | | | | Agent 11 closed until specified | |
| R15 | Evidence URI not reopenable at day 30 | | | | | Instrument phase | |
| R16 | Owner vacant, agent keeps running | | | | | Pause | |
| R17 | Vendor demo auto-release left on | | | | | Refusal minute | |
| R18 | Brand / legal confusion (wrong “Evidence Room”) | | | | | Lockup; legal drafts | |

Add local rows. Do not add “undetected fraud” as an agent-layer KPI.

---

## 3. Vetoes

Any of R5, R6, R8 at score ≥ 8 with no treatment dated this month → **do not start L1**.

---

## 4. Treatment plan

| ID | Action | Due | Done |
|---|---|---|---|
| | | | |

---

## 5. Northline illustration (fictional)

R1 scored 12 (matching copilot informal). Treatment: list and L0. R5 scored 4 (payment hold strong). R12 scored 8 (sponsor asked for a savings range). Treatment: Board/CFO summary without a number. These scores are not yours.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Risk assessment template |
| Related | Governance risk register |
| Status | Edition 1.0.0 |
