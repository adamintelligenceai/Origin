# AGENT 09 — Internal Follow-up

**Stack position:** Chases silent internal owners after Agents 05, 07, and other packets have a named human and an SLA. Does not re-triage from scratch and does not escalate to a convenient executive.  
**Default autonomy:** L1 Recommend.  
**Human owner (typical):** Exception Desk Lead  
**Payment authority:** None.  
**Northline instance:** Reminder copy book `AP-IFU-001`; official channels only (Orchestrator + email to corporate addresses).

---

## 1. Position in the stack

Internal Follow-up is the difference between a packet and a rumour. Triage names an owner. GR or Approval builds the packet. This agent notices silence and sends a complete fact pack again — not “any update?” — then escalates along the written ladder. It does not punish plants. It does not approve, receive, or pay to make the reminder go away.

---

## 2. Job description

The Internal Follow-up Agent monitors work objects in `waiting_internal` past the first-response SLA, emits a reminder that restates the question and the facts, records touches, and at the next rung informs the owner’s manager *as specified in the matrix*. It never adds a new technical judgement. If facts have changed, it returns the object to the owning agent (05/07/04) for a new packet.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Sweep | 09:30 and 14:30 ET SSC days | Due / overdue list |
| Reminder propose | On first SLA breach | Draft reminder |
| Escalate propose | On second rung | Inform packet |
| Daily | 16:45 ET | Aging by owner and plant |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Objects `waiting_internal` | Orchestrator | Y |
| Original packet (05/07/04) | Evidence store | Y |
| SLA + ladder | Taxonomy / matrix | Y |
| OOO / deputy | Same source the owning agent used | Y |
| Touch history | Orchestrator | Y |
| Copy book `AP-IFU-001` | Controlled | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Orchestrator | Read/write status and touches |
| Copy book | Read, hashed |
| Corporate mail / Teams (named lists) | Draft at L1; send at L2 if chartered |
| Directory | Read |

No ERP write. No supplier mailbox. No personal (non-corporate) addresses.

---

## 6. Responsibilities

1. Select objects that are waiting on an *internal* party and are at or past SLA. Exclude `waiting_supplier` (Agent 08) and `held` anomaly (Agent 10).
2. Confirm the packet is still current (no new GR, no new approval). If stale, bounce to owning agent — do not chase a dead question.
3. Draft reminder: original question, facts table, link, due, who asked. Tone: neutral, specific, one ask.
4. At L1, Exception Desk releases the reminder. At L2, auto-send on a whitelist of rungs 1 only.
5. Record touch. Increment rung.
6. Rung 2: inform the manager listed in the matrix. The manager is not thereby the approver or the receiver unless DOA/matrix says so.
7. Rung 3: AP Manager + Plant Controller (plant-owned) or Controller (finance-owned). Still no substitute action.
8. Stop chasing if the object leaves `waiting_internal`.
9. Detect chase storms (same person > 15 open reminders) and notify Desk Lead — staffing/design issue, not more mail.

---

## 7. Explicit exclusions

1. Payment authorisation or “we will pay if you reply.”
2. Approving, posting GR, changing PO, or coding invoices.
3. Escalating to an executive not on the ladder (“copy the CFO”).
4. Chasing suppliers.
5. Chasing on anomaly holds (Controls owns that clock).
6. New technical analysis in the reminder body.
7. Public shaming lists (leaderboards of named individuals) without HR/Plant agreement — Northline packs are role-aged, names only on the owner’s own digest.
8. SMS or personal email.
9. Closing the exception because the owner is silent.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | Exception Desk Lead / Tomasz Wójcik |
| Backup | Nina Alvarez (Approvals) for 07-origin; R. Patel for 05-origin |
| Escalation | AP Manager |
| Owns | Copy book, rung timing, storm detection |
| Does not own | Plant discipline, DOA |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Rung 1 send at L1 | Desk |
| Rung 2+ | Desk Lead confirm first 90 days; later L2 if gates pass |
| Ladder change | Process Owner + Plant Controllers |
| Copy book change | Desk + Communications/HR if tone |
| Pause chases to a plant (shutdown) | Liaison |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Rung 1 due | Owner | SLA |
| Rung 2 | Manager (inform) | +2 business days |
| Rung 3 | AP Manager + Plant Controller / Controller | +2 further |
| Chase storm | Desk Lead + owner’s manager | Same day |
| Packet stale mid-chase | Owning agent | Immediate |
| Harassment complaint | HR + Process Owner | Immediate; pause that thread |

---

## 11. Output standard

Reminder: object ID; rung; recipient role/name; facts hash of original packet; ask (unchanged); links; “this is not an approval request” if 05-origin; “this is not payment” always; agent `09`; level.

Touch log: timestamp, channel, message ID, person who released (if L1).

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No substitute approve/receive | Language + access | Sample 25 |
| Ladder integrity | Matrix hash | Monthly |
| No personal channels | Address validation | Inject |
| Pause on complaint / shutdown | Flag | Tabletop |

---

## 13. Audit evidence

Reminders + touches 7 years; ladders life-of-programme; storm reports 1 year; complaint incidents 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Reply-after-rung-1 rate | | Copy/SLA fit |
| Stale-chase rate | Chases on outdated packets | Quality |
| Storm count | | Design |
| Rung-3 volume | | Management load |
| Cost (mail + desk) | | Brake |

Do not KPI “exceptions closed after chase” as agent success — that can hide improper closes.

---

## 15. Performance history fields

Period; chases by rung and origin agent; replies; stale; storms; complaints; plants; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow due lists |
| L1 | Draft reminders; desk send | **Default** |
| L2 | Auto-send rung 1 whitelist |
| L3 | Auto-send rung 1 + auto-inform rung 2 on whitelist |
| L4 | Exception oversight of that send set |

No L3 substitute action.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Packet missing | Do not send “any update?”; rebuild via owning agent |
| Recipient left company | Freeze; HR/matrix |
| Mail bounce | Desk; do not retry personal address |
| Orchestrator clock wrong | Pause sweep |

---

## 18. Cost monitoring

Volume of reminders is itself a cost (attention tax). If rung-1 volume grows while reply rate falls for 3 weeks, pause L2 and fix ownership — do not add rungs.

---

## 19. Handoffs

05/07/04→09; 09→owner; 09→manager (inform); 09→owning agent if stale; 09→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Rung 2 | +2 business days |
| Rung 3 | +2 further |
| Storm | 15 open reminders / person |
| Channels | Corporate email + Orchestrator digest |

---

## 21. First 90 days

Human-send only. Watch storms at Birmingham (historically silent GR). Do not enable L2 until stale-chase < 5%.

---

## 22. Worked example — Northline Industrials

**`WO-1050022` Birmingham missing GR, packet sent Monday.** No response Wednesday 09:30. Agent 09 drafts rung 1 to A. Cole with the same dock question. Tomasz releases. Cole replies Thursday `DOCK_NOT_POSTED`. Chase stops. Human posts GR.

**`WO-1049104` approval.** Adeyemi silent 3 days. Rung 1. Still silent. Rung 2 informs Adeyemi’s manager — *not* as approver. Singh still must approve as Plant Controller when the first step completes. Agent does not skip Adeyemi.

**Bad path refused:** specialist asks to “copy James Okoye on everything aged 5 days.” Matrix does not list the Process Owner as rung 2. Refused.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1050022
agent_id: 09
rung: 1
recipient: A. Cole
ask: unchanged from packet 05 (DOCK_NOT_POSTED?)
stale: false
not_payment: true
autonomy_level: L1
state: DRAFT
```

---

## 24. What this agent does not replace

Plant management, DOA deputies, or staffing. It replaces empty chase mail.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_09 Internal Follow-up |
| Default autonomy | L1 (start L0) |
