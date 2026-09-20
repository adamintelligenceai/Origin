# A09 — Internal Follow-Up Agent

**Stack ID:** A09  
**Domain:** Internal SLA chase across AP stakeholders  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Operations Lead (Follow-Ups)

---

## Job description

Drive internal resolution of exceptions and blockers: missing GR posting, cost center coding, approver response, buyer PO fixes, tax clarifications. Create precise tasks, remind on cadence, escalate ladders, and record accountability — without spamming the organization.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Convert internal blockers into completed tasks with evidence |
| **How** | Tasking → cadence → escalate → verify close |
| **Who** | AP Operations Lead; task owners in Ops/Procurement/Finance/Tax |

---

## Inputs

- Internal-owned exceptions (A04)
- GR gaps (A05), PO defects (A06), approval ageing (A07)
- Org chart & escalation ladders
- SLA calendars (business days)

## Tools / data required

- Task / ticket system (Jira, ServiceNow, ERP inbox, etc.)
- Calendar/OOO signals
- Notification service with rate limits
- A16 cadence policy

---

## Responsibilities

1. Create tasks with clear ask, due date, evidence needed, case link.
2. Choose channel (ERP workflow, ticket, email) per policy.
3. Remind on defined cadence; suppress when OOO with substitute.
4. Escalate to manager ladder on breach.
5. Verify evidence before marking done; notify A04.
6. Aggregate chronic non-responders for leadership scorecards (A14/A15).

---

## Explicit exclusions

- Does **not** approve or post on behalf of task owners.
- Does **not** flood users (rate limits mandatory).
- Does **not** publicly shame individuals in broad emails.
- Does **not** close AP exceptions without verification.

---

## Human owner

**AP Operations Lead — Follow-Ups**  
Backup: AP Exception Manager.

---

## Approval requirements

| Action | Approval |
|---|---|
| Escalation ladder change | AP Manager + function heads |
| Cadence tightening | Owner (noise impact assessed) |
| Broad distribution lists | Comms/AP Manager |

---

## Escalation criteria

- Material invoice stalled on internal owner → function VP path per ladder
- Systemic ignore pattern → leadership review
- Wrong person repeatedly tasked → org data fix

---

## Output standard

**Internal Task Record:**
- Owner, backup, due, ask, evidence checklist
- Reminder/escalation history
- Completion evidence URIs
- Link back to Exception/Invoice Case

---

## Control requirements

- Rate-limited notifications
- Named owner always
- Evidence on close
- Privacy: minimal necessary info in notifications

---

## Audit evidence

- Task timelines
- Escalation notices
- Completion attachments
- Cadence policy versions

---

## KPIs

| KPI | Concept |
|---|---|
| On-time task completion | On-time / due |
| Touches per resolution | Reminders+escalations / closed task |
| Noise index | Notifications / employee / week (cap) |
| Contribution to exception ageing | Days waiting internal |
| Cost per task | System+human / tasks |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Suggest tasks |
| 1 | Draft tasks for human release |
| 2 | Auto-create/remind on mature templates |
| 3 | Bounded escalations auto |
| 4 | Charter only |

---

## Failure handling

- Ticket system down → fallback email SOP with logging spreadsheet/case notes
- OOO without backup → escalate one level immediately
- Disputed ownership → A04 re-triage

---

## Cost monitoring

Notification API costs and attention cost; optimize digests for low-value items.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Alert fatigue | Rate limits; digests | Noise index | Notif logs |
| False completion | Evidence gate | Reopen rate | Case files |
| Mis-owned tasks | Org validation | Reassign rate | Task audits |
