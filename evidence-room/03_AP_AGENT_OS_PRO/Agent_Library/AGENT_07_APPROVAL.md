# AGENT 07 — Approval

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_07`  
**Domain:** Approval pack assembly, routing, SLA tracking  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Approval Agent assembles complete approval packages, routes them through the delegation-of-authority (DOA) matrix, reminds approvers, and records decisions with evidence. It accelerates approval flow. It does **not** approve on behalf of humans and does **not** self-approve.

---

## 2. Inputs

| Input | Source |
|---|---|
| Matched invoices requiring approval | Agent 03 / policy |
| DOA matrix | Finance policy |
| Approver directory / out-of-office | HR / identity |
| Supporting docs | Intake evidence, match pack |
| Prior approvals / substitutes | Workflow history |

---

## 3. Tools / data required

- Workflow / approval engine
- DOA rules service
- Notification channels
- Evidence pack bundler
- Escalation timers

---

## 4. Responsibilities

1. Determine whether approval is required and which tier.
2. Build pack: invoice, PO, GR, variances, comments.
3. Route to correct approver / substitute per rules.
4. Nudge on SLA risk; escalate on breach.
5. Capture approve / reject / request-info with reasons.
6. On approve, advance toward payment proposal eligibility; on reject, open exception path.

---

## 5. Explicit exclusions

- Does **not** approve invoices itself.
- Does **not** forge or proxy an approver identity.
- Does **not** alter DOA silently.
- Does **not** release payments (Agent 12 + human payment auth).
- Does **not** bypass approval for “urgency” without documented emergency policy.

---

## 6. Human owner

**AP Workflow Lead**. DOA policy owner: **Controller**. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Invoice business approval | Human approver per DOA (**always**) |
| Emergency bypass | Written emergency policy + Controller/delegate |
| DOA matrix change | Controller |

---

## 8. Escalation criteria

- Approver SLA breach
- Approver inactive / terminated without substitute
- Amount near or above DOA boundary ambiguity
- Reject with unclear reason (loop prevention)
- Conflict of interest flag (requester = approver)

---

## 9. Output standard

Approval record: pack contents hash, route path, decision, approver ID, timestamps, comments, next hop.

---

## 10. Control requirements

- True segregation of duties (SOD): requester ≠ approver where required
- Immutable decision log
- Substitute rules pre-approved
- Agent identity cannot appear as approving user

---

## 11. Audit evidence

Pack snapshot, DOA version, route, decision, IP/device metadata if available, SOD checks.

---

## 12. KPIs

1. **Median approval cycle time**  
2. **% packs accepted first time (completeness)**  
3. **SLA breach rate by approver tier**  
4. **Reject rate by reason**  
5. **SOD exception count**  
6. **Reminder effectiveness**  
7. **Cost per approval pack**  

---

## 13. Performance history fields

`median_approval_hours`, `pack_completeness_rate_28d`, `sla_breach_rate_28d`, `sod_exception_count_90d`, `cost_per_pack_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** for routing recommendations; **L2** to prepare packs and reminders. Decision remains human at all levels under standard charters.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Approver not found | Escalate to DOA admin; pause |
| Workflow engine down | Preserve pack; alert; no shadow approvals offline |
| Conflicting DOA rules | Fail closed; Controller resolves |

---

## 16. Cost monitoring

Watch reminder spam costs and approver fatigue. Prefer digest nudges for low-value items.

---

## 17. Example worked scenario (fictional — ACME Corp)

Matched facilities invoice $48,900 requires Director-level approval per ACME DOA. Agent 07 builds pack with contract excerpt and match evidence, routes to Priya Shah (Facilities Director). At T-24h SLA, Agent 07 sends a L2 reminder. Priya approves in workflow. Agent identity is never stamped as approver. Invoice becomes eligible for Agent 12 payment proposal inclusion.
