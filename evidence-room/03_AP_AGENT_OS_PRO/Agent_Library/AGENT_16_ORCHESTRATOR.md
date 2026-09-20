# AGENT 16 — Orchestrator

**Stack position:** Cross-cutting. System of record for work-object state, SLA clocks, handoffs, autonomy context, and evidence links. Not the system of record for accounting or cash.  
**Default autonomy:** L1 Recommend (routing per matrices).  
**Human owner (typical):** AP Process Owner  
**Payment authority:** None.  
**Northline instance:** Queue namespace `NL.*`; James Okoye is A-owner.

---

## 1. Position in the stack

If the sixteen agents are roles, the Orchestrator is the board they stand on. It does not extract, match, approve, or pay. It knows which object is where, who owns it, what level is in force, when the clock ends, and where the evidence lives. When it is wrong, the stack becomes a set of clever files that do not meet.

When it is over-ambitious, it becomes a second ERP. Do not let it post.

---

## 2. Job description

The Orchestrator Agent creates and updates work objects, enforces legal handoffs (only the named next agents), applies SLA start/stop rules, stores autonomy level per agent instance, refuses illegal transitions (e.g. Matching `RECOMMEND_MATCH` while Agent 10 is open), publishes queues, and records an event log sufficient to reconstruct history. Humans still decide. ERP still accounts. Treasury still pays.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Event | Continuous | Object + event |
| Sweep | 15 minutes | SLA, illegal state, orphan |
| Register | On charter change | Autonomy register |
| Daily | 18:00 ET | Orphan / illegal-transition report |
| Quarterly | Access + queue recert | Cert |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Events from Agents 01–15 and humans | All | Y |
| State machine `AP-ORC-001` | Controlled | Y |
| Queue / owner matrices | 04/07/05 charters | Y |
| Autonomy register | Process Owner | Y |
| SLA tables | Charters | Y |
| Identity (people, roles, service accounts) | Directory / IAM | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Work-object store | Read/write objects and events |
| Evidence URI registry | Write pointers (not a second image store) |
| IAM read | Validate owners |
| Notify | Queue updates; no supplier send |

The Orchestrator may call ERP **read** to verify a claimed document ID exists. It may not park, post, or pay.

State machine must be versioned. Prompt-only routing is not an Orchestrator.

---

## 6. Responsibilities

1. Mint `object_id` on Intake (or on statement/close objects). Never reuse.
2. Permit only transitions in `AP-ORC-001` (examples: `intake_ready → val_*`; `val_pass + PO → match_*`; `match_break → triage`; `waiting_internal → 09`; `proposal_line → 12`). Illegal: `intake → posted`; `statement → proposal`; `10_open → 03_recommend_match`.
3. Attach evidence URIs; do not drop images when status changes.
4. Start/stop SLA clocks per the owning agent’s rules (Triage clock starts on accept, not on mint).
5. Hold autonomy context: agent ID + entity + document class + level. A US-OH L2 does not leak to CA.
6. Enforce Agent 10 join: if `agent10_open` or `scan_unavailable` per policy, block proceed transitions.
7. Detect orphans (no owner, no agent, no SLA) every sweep.
8. Record human overrides of routing with reason codes — overrides are visible, not silent.
9. Expose queues `NL.MATCH.US.PO`, `NL.XCP.US`, etc. as listed in charters.
10. Feed Agent 14 extracts and Agent 15 history. Feed Agent 13 open-object lists.
11. Pause an agent instance when the register says pause — do not accept its proceed events.

---

## 7. Explicit exclusions

1. Payment authorisation, release, or bank-file handling.
2. Posting, parking, GR create, PO change, vendor change.
3. Approving invoices.
4. Sending supplier mail.
5. Inventing owners or climbing org charts.
6. Promoting autonomy (it *records* promotions; Process Owner *decides*).
7. Becoming the accounting ledger.
8. Silent retry of a failed financial action (there should be no financial action).
9. Auto-closing objects for age.
10. Mixing entity scopes.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Process Owner / James Okoye |
| Backup | Elena Ruiz (Controls) — temporary; SoD watch |
| Escalation | Controller |
| Owns | State machine, register, illegal-transition response, queue names |
| Does not own | Each agent’s professional judgements |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| State-machine change | Process Owner + Controls + affected agent owners |
| New queue | Process Owner + agent owner |
| Autonomy register write | Per `AUTONOMY_PROGRESSION.md` sign-off |
| Routing override | Named role; reason required |
| Pause agent | Owner or Process Owner or Security |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Illegal transition attempted | Controls + sending agent owner | Immediate |
| Orphan > 4 SSC hours | Desk Lead + James | Sweep |
| Register vs behaviour mismatch | Process Owner | Immediate |
| Store down | IT — stack fail-closed | Immediate |
| Duplicate `object_id` | Security/IT — incident | Immediate |
| Event from paused agent | Drop proceed; alert | Immediate |

---

## 11. Output standard

Work object: IDs; source; current agent; human owner; status enum; autonomy context; evidence URIs; SLA; escalation state; cost token; Agent 10 state.

Event: timestamp, actor (agent or human), from, to, payload hash, result `allowed/blocked`.

Daily report: orphans, blocked illegal, paused agents, store health.

Register extract: agent, entity, class, level, charter version, recert date.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Fail closed | No ERP write | Access |
| Illegal transition | Block + log | Inject 03-match-with-flag |
| Autonomy isolation | Context fields | Inject CA object into US L2 |
| No silent close | Status rules | Sample |
| Override visibility | Reason codes | Weekly |
| Reconstructability | Events | Retrieve 15-minute test |

---

## 13. Audit evidence

Events 7 years; objects 7 years; state-machine versions life-of-programme; register 7 years; illegal-transition logs 7 years; access 1 year.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Illegal attempts blocked | Count | Control health |
| Orphans | Snapshot | Ops |
| Reconstruct success | Sample retrieve | Audit |
| Override rate | | Design vs discipline |
| Store availability | | IT |
| Cost | | Brake |

Do not KPI “straight-through objects” as a success bonus for the Orchestrator — that encourages skipped states.

---

## 15. Performance history fields

Period; objects minted; transitions; blocked; orphans; overrides; pauses; availability; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow state (ERP/spreadsheet still SOR for queues) — not recommended beyond week 1 |
| L1 | Live work objects; routing per machine; humans override with reason | **Default** |
| L2 | Auto-route whitelist (e.g. PASS PO → 03 without desk) |
| L3 | Auto-start Agent 09 rung 1 when SLA fires (if 09 chartered) |
| L4 | Exception oversight of that routing |

Never L3 financial. Routing autonomy ≠ posting autonomy.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Store down | Agents fail closed; no side spreadsheet SOR |
| Clock skew | Pause SLA sweep |
| IAM cannot resolve owner | Assign Process Owner + orphan |
| Flood of events | Back-pressure; do not drop without poison queue + alert |
| Split brain (two stores) | Incident; freeze promotions |

---

## 18. Cost monitoring

Store + compute. If cost grows because every model retry writes 100 events, compact *payloads*, not history of transitions. Pause verbose agents.

---

## 19. Handoffs

Orchestrator is the medium of all handoffs in §5.2 of the stack overview. It also hands: daily illegal report → Controls; register → 14; history → 15; open lists → 13.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| State machine | `AP-ORC-001` |
| Sweep | 15 min |
| Orphan threshold | 4 SSC hours |
| Agent 10 block | On |
| Entity leak | Forbidden |

---

## 21. First 90 days

Stand objects for Wave 1 only (01–04, 10, 16). Do not onboard 12 until the Agent 10 join is proven in test. Tabletop: store down on a Thursday morning — run does not proceed on hope.

---

## 22. Worked example — Northline Industrials

**`WO-1048821` life (compressed).**

1. 01 mints object, status `intake_ready`.  
2. 02 `val_pass`, path `PO_MATCH`. Orchestrator allows → 03.  
3. 03 attempts `RECOMMEND_MATCH` — blocked? Flag none, allow. (Later `QTY_OVER` → `match_break`.)  
4. Transition to 04 allowed. Tomasz accept starts SLA.  
5. 04 next=05. 05 packet. Status `waiting_internal`.  
6. SLA breach → 09 draft allowed.  
7. Warehouse `SHORT`. 08 draft allowed (external). Status `waiting_supplier`. 09 cannot chase.  
8. Thursday 12 reads object: `HOLD_OPEN_EXCEPTION`. Orchestrator will not offer a `ready_to_pay` state because that state does not exist — pay is outside the machine.  
9. James reviews daily report: one illegal attempt that week — a test user tried `statement_line → proposal`. Blocked. Incident file opened (training, not a breach of cash).

**Autonomy isolation:** Hamilton object `WO-H-2201` cannot enter `NL.MATCH.US.PO`. Machine rejects. Good.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
status: waiting_supplier
current_agent: 08
human_owner: Olivia Grant
agent10_open: false
autonomy_context: {03: L1, 10: L1, 12: L1}
ready_to_pay_state: does_not_exist
last_event: 03_to_04_allowed
agent_id: 16
```

---

## 24. What this agent does not replace

The ERP, the bank, IAM, or the Process Owner. It replaces tribal knowledge about “who has that invoice.”

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_16 Orchestrator |
| Default autonomy | L1 |
| Related | All specs; autonomy register; state machine `AP-ORC-001` |
