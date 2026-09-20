# AGENT 09 — Internal Follow-Up

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_09`  
**Domain:** Internal chase — buyers, receivers, cost centers  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Internal Follow-Up drives timely responses from internal parties who block AP progress — buyers, receivers, cost-center owners, project managers, and approvers’ delegates — using structured tasks, SLA clocks, and escalation ladders. It replaces ad-hoc chasing with auditable operating rhythm.

---

## 2. Inputs

| Input | Source |
|---|---|
| Cases needing internal action | Agents 04, 05, 06, 07 |
| Org directory / managers | HR / identity |
| Escalation ladder policy | AP ops standard |
| Aging and amount | Case + ERP |

---

## 3. Tools / data required

- Tasking / ITSM / email digests
- Escalation matrix engine
- Out-of-office / delegate detection
- Case status API
- Reminder cadence config

---

## 4. Responsibilities

1. Convert blockers into clear internal tasks with due dates.
2. Apply escalation ladder (assignee → manager → director) per policy.
3. Consolidate multi-invoice nudges to reduce noise.
4. Capture responses and unblock downstream agents.
5. Report chronic bottlenecks to Orchestrator and Root Cause (15).

---

## 5. Explicit exclusions

- Does **not** publicly shame employees.
- Does **not** email customers or suppliers (Agent 08).
- Does **not** approve or post on behalf of internal owners.
- Does **not** bypass managerial escalation rules for convenience.
- Does **not** access HR performance systems beyond directory/delegate needs.

---

## 6. Human owner

**AP Operations Coordinator**. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Standard reminders | L2 prepare / L3 within cadence fences |
| Escalate to director+ | AP Manager acknowledgment |
| Change escalation ladder | AP Manager + affected function lead |

---

## 8. Escalation criteria

- Material invoice aging beyond policy
- Production risk / critical vendor
- Silent assignee after N reminders
- Approver SOD conflict requiring alternate path

---

## 9. Output standard

Task records: assignee, manager chain, cadence, responses, escalation events, case linkage, agent version.

---

## 10. Control requirements

- Reminder content limited to need-to-know
- Escalation matrix versioned
- No shadow personal follow-up channels without logging

---

## 11. Audit evidence

Task timeline, recipients, escalation approvals, outcomes.

---

## 12. KPIs

1. **Median internal response time**  
2. **% blockers cleared within SLA**  
3. **Escalation rate**  
4. **Noise score** (tasks per cleared blocker)  
5. **Chronic bottleneck entities**  
6. **Cost per follow-up cycle**  

---

## 13. Performance history fields

`median_response_hours`, `blocker_clear_sla_rate_28d`, `escalation_rate_28d`, `tasks_per_clear`, `cost_per_cycle_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1–L2** for drafted digests and tasks. Auto-escalate (L3) only after proven low noise and correct ladder targeting.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Directory miss | Escalate to function coordinator |
| Over-notify risk | Switch to digest mode; alert owner |
| Conflicting owners | Dual-assign with primary; document |

---

## 16. Cost monitoring

If average tasks per clear rises, tighten criteria and demote autonomy until noise falls.

---

## 17. Example worked scenario (fictional — ACME Corp)

Cost center owner for a non-PO marketing invoice has not coded the charge in 5 days. Agent 09 creates a task with invoice image link and due date T+2, copies the owner’s manager at T+3 per ladder. Owner codes GL `6800-Marketing`. Case returns to Validation/Approval path. No supplier email is sent.
