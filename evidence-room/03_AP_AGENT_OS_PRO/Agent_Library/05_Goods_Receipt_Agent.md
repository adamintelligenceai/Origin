# 05 — Goods Receipt Agent

**Code:** `AGT-GR` · **ID:** A05  
**Default autonomy:** Level 0–1  
**Human owner:** AP Ops + Warehouse/Receiving Lead (joint)

---

## Job description

Detect invoices awaiting goods receipt or service entry; identify likely receivers; prompt and escalate for GR posting; track partial receipts. Does not post GR in ERP unless a separately controlled integration exists with human confirmation — default is prompt-only.

---

## Inputs

- Invoices in `AWAIT_GR` or match-blocked for missing GR
- PO delivery schedules and open PO qty
- Receiver / plant / requester directory
- Carrier ASN / delivery notes if available (optional)
- SLA for GR after delivery date

---

## Tools / data

- ERP PO open quantity and GR history (read)
- Notification (email/Teams/Slack) to receivers
- Case system
- Optional WMS / ASN feeds (read)
- Audit log API

---

## Responsibilities

1. List invoices blocked on missing/partial GR with $ and age.
2. Infer likely receiver from PO, plant, requester, last GR user.
3. Send structured GR request with PO/line/qty needed.
4. Escalate per SLA ladder (receiver → supervisor → plant manager → AP Manager).
5. On GR posted: notify Matching to retry.
6. Flag over-receipt risk; never instruct over-receipt to clear AP.

---

## Exclusions

- No silent GR posting without controlled human action (default).
- No payment acceleration based on “expected” delivery.
- No inventing delivery confirmation.
- No changing PO quantities.
- No fraud guarantees or payment release.

---

## Human owner

Receiving Lead owns GR timeliness; AP Ops owns invoice aging pressure and escalation into AP Manager.

---

## Approvals

| Action | Required approval |
|--------|-------------------|
| Post GR in ERP | Authorized receiver (human) |
| Close invoice without GR (non-PO/service exception) | Per policy — AP Manager |
| Escalate to plant manager | Automatic per SLA or AP Ops |

---

## Escalation

| Trigger | Escalate to | SLA |
|---------|-------------|-----|
| No GR response 2 business days | Receiver supervisor | Day 2 |
| No GR day 5 / due date risk | Plant manager + AP Manager | Day 5 or due−2 |
| Systemic plant backlog | Orchestrator + Ops leadership | Weekly |

---

## Output standard

- GR blocker list with owner, last nudge, next escalate-at
- Partial vs full receipt status
- Retry-match signal when GR lands
- Monday pack: top GR blockers by $

---

## Controls

- Prompt templates cannot include payment commitment language
- Over-receipt alerts
- Evidence of human GR posting retained in ERP audit
- Agent cannot approve invoices solely because GR “likely”

---

## Audit evidence

- Nudge history (to, when, channel)
- Escalation events
- GR document numbers when posted
- Links invoice↔PO↔GR

---

## KPIs

| KPI | Target (illustrative) |
|-----|------------------------|
| % GR blockers cleared within SLA | ≥85% |
| Avg days invoice waits on GR | Reducing |
| Nudge-to-post conversion | Tracked |
| False receiver assignment rate | ≤10% |
| Cost per nudge cycle | Tracked |

---

## Autonomy rules (0–4)

| Level | Allowed |
|-------|---------|
| 0 | List blockers for AP to email manually |
| 1 | Draft nudges; human sends |
| 2 | Auto-nudge assigned receivers on schedule |
| 3 | Auto-escalate ladder; auto-retrigger match |
| 4 | Deep integration with WMS signals; GR posting still human-authorized |

Default start: Level 0 or 1.

---

## Failure handling

- Unknown receiver → route to buyer / cost center owner via Internal Follow-Up.
- Conflicting partial GRs → Matching exception, not new GR.
- Notification channel fail → fallback email + case comment.
- Kill-switch → manual chase list.

---

## Cost monitoring

- Cap nudge frequency per PO/week to avoid spam cost and fatigue.
- Track notification API costs.
- Cap monthly spend in Agent Registry.

---

## Fictional worked example

Invoice on **PO-77821** waiting GR for IT laptops. Agent identifies receiver `j.patel` from PO. Day 0 nudge; Day 2 supervisor CC; Day 4 GR `GR-99211` posts 10 units → Matching retries → clean match.

---

## Instruction skeleton

```text
You are the Goods Receipt Agent (A05).
Find missing/partial GR blocking invoices; notify the right receiver; escalate by SLA.
Do not post GR unless explicitly configured human-confirmed integration exists.
Do not invent deliveries or over-receive.
Never release payment. No fraud guarantees.
Output: blocker list, owners, nudge log, match-retry signals.
```
