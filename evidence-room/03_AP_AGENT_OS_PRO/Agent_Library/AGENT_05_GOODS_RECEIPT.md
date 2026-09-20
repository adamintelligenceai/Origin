# AGENT 05 — Goods Receipt

**Stack position:** Downstream of Matching breaks `MISSING_GR`, `GR_AMBIGUOUS` (facts only), and `QTY` classes that need warehouse confirmation. Upstream of Internal Follow-up if the receiver is silent.  
**Default autonomy:** L1 Recommend (commission at L0).  
**Human owner (typical):** Plant / Warehouse Finance Liaison (per site), with AP Exception Desk as process owner of the packets.  
**Payment authority:** None.  
**Northline instance:** Dayton WMS receipts; Birmingham finance-posted GR; Hamilton and Monterrey L0.

---

## 1. Position in the stack

Many AP “exceptions” are warehouse facts that never reached Finance. This agent assembles a **receiver packet**: PO, invoice lines waiting, what ERP/WMS already shows, what is missing, and a single question. It does not create a goods receipt to clear GR/IR. Creating a receipt is a warehouse or plant-finance human action under their procedure.

---

## 2. Job description

The Goods Receipt Agent detects invoices (or match breaks) waiting on a receipt or quantity confirmation, builds a packet for the named receiver or liaison, and records the response. It monitors aging of unmatched receipts and of invoices waiting for receipts. It does not post GR, reverse GR, or tell the warehouse to “just receive it so we can pay.”

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On Triage next=05 | Packet |
| Plant digest | 08:00 local, SSC days | List of open packets by receiver |
| Aging | Daily 16:00 ET | GR/IR and waiting-invoice ages (signal, not accrual) |
| Response capture | Continuous | Coded warehouse reply |

Accrual booking is Agent 13 + Controller. This agent supplies a cleaner list; it does not book.

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Triage record + match worksheet | Agents 03/04 | Y |
| PO remaining qty, delivery schedule, plant/warehouse | ERP | Y |
| Existing receipts / inbound deliveries / ASN | ERP / WMS | Y |
| Receiver / buyer names on PO | ERP | Y |
| Plant calendar / shutdowns | Plant ops | N |
| Prior packets on same PO | Orchestrator | N |
| Invoice image (line qty) | Evidence store | Y |

---

## 5. Tools / data required

| Tool | Privilege | ERP / WMS |
|---|---|---|
| PO + inbound | Read | D365 Purch / WHS; SAP INB/EKBE; Oracle Receiving; NetSuite IR; Workday Receipt |
| WMS inventory moves | Read | May explain “it’s on the dock” |
| Orchestrator | Write packets | — |
| Internal directory | Read | Liaison + supervisor |
| Plant digest channel | Write digest (L1 recommend; send at L2 if chartered) | Teams/email |

No GR post privilege on the agent account. Ever. A human uses a personal or warehouse account.

---

## 6. Responsibilities

1. Confirm class is receipt-related. If the break is price-only, refuse and return to Triage.
2. Reconstruct facts: ordered, previously received, invoiced, open.
3. Ask one primary question: `NOT_RECEIVED` confirm? `QTY_DISPUTE` count? `GR_AMBIGUOUS` which receipt? `DOCK_NOT_POSTED` is it physical?
4. Name the receiver from PO / WMS task, not from memory.
5. Produce packet + plant digest line.
6. Capture response codes: `WILL_POST_GR`, `NOT_OURS`, `SHORT`, `OVER`, `DAMAGED`, `WRONG_ITEM`, `ALREADY_POSTED` (point to ID), `NEED_BUYER`.
7. If `WILL_POST_GR`, wait for ERP evidence; do not take a verbal as a receipt.
8. If silent past SLA, hand to Agent 09 with the same packet (no new narrative).
9. Feed aged unmatched GR and aged waiting invoices to Agent 13 as *candidates*, labelled as such.

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Creating, reversing, or dummy-posting GR/SES.
3. Instructing staff to receive goods they have not received.
4. Changing PO quantity.
5. Booking GR/IR accruals.
6. Supplier communication (Agent 08) unless Triage redirects.
7. Clearing quantity breaks by applying a hidden tolerance.
8. WMS configuration changes.
9. Speaking for “the plant” without a named human.

---

## 8. Human owner

| Site | Northline liaison (illustrative) | Escalation |
|---|---|---|
| Dayton (1000) | Plant Finance Liaison R. Patel | Warehouse Manager → Plant Controller |
| Birmingham (1100) | Plant Finance Liaison A. Cole | Same |
| Hamilton / Monterrey | Not live | — |
| Process owner of agent | Exception Desk Lead (Tomasz) | AP Manager |

Liaisons own fact quality. The Desk owns packet standard. Split is deliberate.

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Packet content at L1 | Liaison or receiver accepts facts / answers |
| Sending plant digest | L1: digest is a recommend in Orchestrator; L2: auto-send to named lists |
| GR post | Warehouse / appointed clerk only |
| Treat verbal as done | Never — wait for ERP |
| Close missing-GR exception | Match Lead after ERP GR + rematch |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| No response 2 business days | Supervisor + Agent 09 | On day 2 |
| No response 5 business days | Plant Controller | On day 5 |
| `WILL_POST_GR` but no ERP GR in 2 days | Liaison | Day 2 after promise |
| Physical on dock > 3 days, no post | Warehouse Manager | Day 3 |
| Repeated `NOT_OURS` on same vendor | Buyer + Agent 06 | Weekly |
| Safety / damaged goods | Plant quality — human path | Immediate |

---

## 11. Output standard

Packet minimum: object ID; PO; plant; warehouse; receiver name; ordered/received/invoiced table; invoice image link; question enum; requested action; SLA; liaison; agent `05`; level; evidence URI.

Response record: code; responder identity; timestamp; ERP document ID if claimed; “verbal only” flag (always insufficient).

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No dummy GR | Agent cannot post | Access review + sample new GRs vs packets |
| Evidence before rematch | ERP GR ID required | Join 03 rematch |
| Named receiver | Matrix | Sample 20 packets |
| GR/IR listing ≠ booking | Labelled candidates | Close review |

---

## 13. Audit evidence

Packets + responses 7 years; plant digests 1 year; access 1 year; candidate lists supplied to Close 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Packet completeness | Required fields present | Quality |
| Time to first coded response | | Flow |
| Verbal-only rate | Should trend down | Control |
| Promise-break (`WILL_POST` without GR) | | Plant discipline |
| Mis-question rate | Recode by liaison | Agent quality |
| Cost / 1,000 packets | | Brake |

Do not KPI “GR created by agent” — that would be a control failure.

---

## 15. Performance history fields

Period; packets; classes; response codes; verbal-only; promise-breaks; Agent 09 handoffs; plants; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow packets |
| L1 | Packets in Orchestrator; humans send/answer | **Default** |
| L2 | Auto-send digest to named internal lists |
| L3 | Auto-send individual packet to named receiver whitelist |
| L4 | Exception oversight of whitelist send |

No L3 GR post. Dummy GR is a dismissal offence for a human; it is impossible for a correctly privileged agent.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| WMS/ERP read fail | No packet from stale stock; mark `DATA_UNAVAILABLE` |
| Receiver not on PO | Assign liaison; do not guess |
| Duplicate packets | One packet per object; digest can summarise |
| Plant shutdown | SLA pause per calendar; do not escalate as neglect |

---

## 18. Cost monitoring

Model cost, liaison minutes, chase minutes (09). Pause if mis-question > 20% for 2 weeks.

---

## 19. Handoffs

04→05; 05→receiver/liaison; 05→09; 05→13 candidates; 05→03 rematch seed when ERP GR exists; 05→08 if warehouse confirms invoice error; 05→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| First chase | 2 business days |
| Plant Controller escalate | 5 business days |
| Promise window | 2 days |
| Live plants | Dayton, Birmingham |

---

## 21. First 90 days

Map who actually receives at each plant — PO “receiver” fields are often wrong. Fix the matrix before L2 auto-send. Measure verbal-only; that is the behaviour to change, not “automation.”

---

## 22. Worked example — Northline Industrials

**`WO-1048821` qty 1,000 invoiced vs 980 received, Dayton WMS.**

Packet to L. Grant (Warehouse Supervisor) and R. Patel (liaison): line 7 item `FS-440`, PO 45007821, receipt `PR-88311` 980 EA, invoice 1,000 EA, question `QTY_DISPUTE`. Asks: recount, confirm short-ship, or confirm overbill. Does not ask “can you receive 20 more.”

L. Grant responds `SHORT` — two boxes damaged, claim with carrier. Agent 08 later drafts a debit-note query to Lakeshore. Agent 03 will rematch at 980 if a credit or a reduced invoice arrives. Nobody posts 20 EA.

**Parallel missing GR `WO-1050022` Birmingham $6,400.** Digest 08:00 CT to A. Cole. Response `DOCK_NOT_POSTED`. Human clerk posts GR that afternoon. Agent 05 records ERP ID. Object returns to Agent 03.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 05
plant: Dayton
question: QTY_DISPUTE
ordered: 1000
received: 980
invoiced: 1000
receiver: L. Grant
liaison: R. Patel
ask: recount or confirm short / overbill
forbidden_ask: post 20 EA
autonomy_level: L1
```

---

## 24. What this agent does not replace

WMS, receiving SOP, cycle count, or plant leadership. It replaces the AP email that says “please receive this PO” with a fact packet.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_05 Goods Receipt |
| Default autonomy | L1 (start L0) |
