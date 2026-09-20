# AGENT 07 — Approval

**Stack position:** Non-PO path after Validation PASS; also over-tolerance and policy exceptions that require DOA. Chases packets. Does not approve.  
**Default autonomy:** L1 Recommend.  
**Human owner (typical):** AP Approvals Coordinator  
**Payment authority:** None. Approval of an invoice is not payment authorisation.  
**Northline instance:** DOA table `FIN-DOA-2026.2`; cost centre owner to $5k; Plant Controller to $25k; VP Finance to $100k; CFO above.

---

## 1. Position in the stack

Approval is a **routing and completeness** job. The agent builds a packet a human approver can decide in one sitting: what it is, why it is non-PO or over-tolerance, who the DOA says must sign, what has already been received, and what is still missing. The agent never clicks Approve. Substitute approvers come only from the DOA table. Orchestrator does not “find someone senior.”

---

## 2. Job description

The Approval Agent determines the required approver(s) from the written DOA, assembles the packet (image, extract, GL/cost centre suggestion *as already on the request or PO exception*, prior related invoices, policy citations), routes to the named approver or deputy, records the decision, and chases through Agent 09 if silent. It does not invent cost centres, does not approve on someone’s behalf, and does not treat a Slack “ok” as an approval unless that channel is in the controlled procedure (Northline: it is not).

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On path `NON_PO_APPROVAL` or match over-tolerance requiring DOA | Packet + route |
| Reminder | Per SLA table | Agent 09 handoff |
| Digest | Daily to each approver with >0 open | List |
| Monthly | DOA stale-user review with HR | Exceptions |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Validated non-PO object or over-tolerance worksheet | 02 / 03 / 04 | Y |
| DOA table (amount, account, plant, commodity) | Controlled + ERP workflow | Y |
| Cost centre / project owner | ERP | Y if coded |
| Deputy / out-of-office | DOA / HR, not calendar scraping alone | Y for routing |
| Invoice image + extract | 01 | Y |
| Related spend (same vendor+CC, 90 days) | ERP | N — context |
| Policy: when non-PO is allowed | Procurement / Finance | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| DOA table | Read, version-hashed |
| ERP workflow read | Read (do not approve) |
| Directory + deputies | Read |
| Orchestrator | Write route state |
| Evidence store | Read attachments |

ERP mapping: D365 workflow; SAP release strategy / Fiori; Oracle Approval Management; NetSuite approval routing; Workday approval chains. The agent **mirrors** the official engine. It does not become a second unofficial approver.

---

## 6. Responsibilities

1. Confirm the object is in an approval class. PO in-tolerance match does not come here.
2. Compute required steps from DOA (amount *and* account *and* plant). Document the path.
3. If cost centre missing on a non-PO, `QUERY_CODING` to the requester — do not guess GL.
4. If requester is also the only approver and policy forbids self-approval, route to the next step in DOA.
5. Build packet. Include “why non-PO” if a PO should have existed (flag for Agent 06, still needs approval).
6. Route to named human. If OOO and deputy listed, route deputy. If no deputy, wait and escalate to Approvals Coordinator — do not climb the org chart.
7. Accept only decisions from the official workflow or the written alternate (Northline: D365 workflow). Record reject reasons.
8. On approve, hand to posting clerk (human) or parked-document path — not to payment.
9. On reject, hand to requester / Agent 08 as directed; do not shop for another approver.

---

## 7. Explicit exclusions

1. Payment authorisation or release (a different two humans on the payment run).
2. Clicking Approve or using a service account in the approval step.
3. Self-approval workarounds.
4. Inventing deputies or “acting” approvers.
5. Accepting informal channels (chat, verbal, SMS) unless the procedure lists them — Northline does not.
6. Changing DOA limits.
7. Coding the invoice to make it fall under a friendlier approver.
8. Treating invoice approval as vendor-master or bank-change approval.
9. Auto-approving recurring utilities unless a *separate* recurring-control procedure exists (Northline Wave 3, human-designed).

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Approvals Coordinator / Nina Alvarez |
| Backup | Exception Desk Lead |
| Escalation | AP Manager; Controller on DOA disputes |
| Owns | Packet standard, chase SLA, stale-approver list |
| Does not own | DOA policy (Controller / CFO), cash |

---

## 9. Approval requirements

This section is the point of the agent.

| Decision | Who | System |
|---|---|---|
| Invoice / exception approve or reject | DOA-named human or deputy | D365 workflow |
| Packet completeness at L1 | Coordinator sample | Orchestrator |
| Route start | Agent recommends; Coordinator confirms if QUERY | L1 |
| Recurring utility auto-route | Not in force | — |
| Post after approve | AP clerk | ERP |
| Pay after post | Agent 12 + two authorisers | Payment run |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| No deputy, approver OOO | Coordinator | Day 0 |
| No decision 3 business days | Approver’s manager *as information*, not as approver unless DOA says so | Day 3 |
| No decision 7 business days | Controller (process), still not a substitute approve | Day 7 |
| Self-approval attempt | Coordinator + Controls | Immediate |
| Informal “ok” only | Coordinator — reject as evidence | Immediate |
| DOA table vs ERP workflow mismatch | Controller + IT | Same day |

---

## 11. Output standard

Packet: object ID; amount; currency; vendor; why-approval-required; DOA path (steps, names, hashes); coding as supplied; related spend; image; “not payment”; agent `07`; level.

Route event: step, person, sent-at, due, decision, system transaction ID of the workflow.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| DOA | Applied, not edited | 25 packets/month vs table |
| No agent approve | Access: no approve privilege | Quarterly + transaction sample |
| No informal approve | Channel rule | Sample rejects |
| Self-approval | Block + escalate | Inject test |
| Invoice approve ≠ pay | Separate run | Payment SoD |

---

## 13. Audit evidence

Packets 7 years; workflow IDs 7 years; DOA versions life-of-programme; informal-attempt incidents 7 years; access 1 year.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Packet completeness | Approver asked zero clarifying questions (sample) | Quality |
| Time to route | PASS → correct inbox | Flow |
| Mis-route rate | Wrong person per DOA | Quality |
| Informal-attempt count | | Control culture |
| Aging >7 days | | Management |
| Cost | | Brake |

Do not KPI “approval rate” — that pressures approvers.

---

## 15. Performance history fields

Period; packets; DOA steps; mis-routes; informal attempts; self-approval blocks; aging; decisions approve/reject; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow routes |
| L1 | Recommend route + packet; Coordinator/workflow is SOR | **Default** |
| L2 | Auto-start official workflow for packets that pass completeness on a whitelist (e.g. utilities with standing coding) |
| L3 | Auto-chase via Agent 09 only |
| L4 | Exception oversight of chase |

Approve action: never an agent privilege.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| DOA hash missing | Stop routing |
| Workflow API down | Queue packets; do not collect chat approvals |
| Approver left company | HR + Controller; freeze objects on that person |
| Amount in MXN/CAD | Convert per DOA rule (Northline: company currency); document rate source |

---

## 18. Cost monitoring

Coordinator minutes, reminder volume, model. Pause L2 if mis-route > 5% — wrong people seeing invoices is a control issue.

---

## 19. Handoffs

02/03/04→07; 07→DOA human; 07→09; 07→06 (should-have-been-PO); 07→clerk post; 07→16; never 07→bank.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| DOA | $5k / $25k / $100k / CFO |
| Reminder | Day 3 inform manager; day 7 Controller |
| Official channel | D365 workflow only |
| Self-approval | Forbidden |

---

## 21. First 90 days

Reconcile DOA document to D365 workflow. Most “approval automation” failures are those two disagreeing. Stay L1 until mis-route < 2% on a 100-sample.

---

## 22. Worked example — Northline Industrials

**`WO-1049104` non-PO services $10,000, Dayton cost centre 5310, owner J. Hale.**

DOA: $10,000 > $5k, ≤ $25k → Plant Controller (Dayton) M. Singh, after cost-centre owner. Packet includes: last three invoices same vendor+CC ($4,200, $4,200, $4,200) — context, not a reason to auto-approve. Agent 06 flagged “should have been PO” — still needs approval; flag is visible.

J. Hale OOO, deputy in DOA is K. Adeyemi. Route: Adeyemi then Singh. A buyer IMs Nina “just approve it.” Nina records informal-attempt; no approval.

After both workflow approves, clerk parks/posts. Thursday payment run still needs two payment authorisers. Hale’s deputy did not authorise cash.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1049104
agent_id: 07
why: NON_PO
doa_path: [CC owner deputy K. Adeyemi, Plant Controller M. Singh]
doa_hash: FIN-DOA-2026.2
self_approval: blocked_n/a
channel: D365 workflow
not_payment: true
autonomy_level: L1
```

---

## 24. What this agent does not replace

DOA policy, workflow configuration, or the approver’s judgement. It replaces incomplete “please approve attached” emails.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_07 Approval |
| Default autonomy | L1 (start L0) |
