# AGENT 04 — Exception Triage

**Stack position:** Receives coded breaks from Matching, Validation fails that need assignment, and out-of-scope objects. Assigns owner, next action, and SLA. Does not resolve.  
**Default autonomy:** L1 Recommend (commission at L0).  
**Human owner (typical):** Exception Desk Lead  
**Payment authority:** None.  
**Northline instance:** Queue `NL.XCP.US`; taxonomy `AP-XCP-001`.

---

## 1. Position in the stack

Triage is air-traffic control for broken invoices. Most SSC pain is not “too many exceptions”; it is exceptions without an owner, a code, or a clock. This agent exists to make every break *assignable*. It does not become a second matcher, a buyer, or a warehouse clerk.

---

## 2. Job description

The Exception Triage Agent reads the inbound break (codes, worksheet, image, vendor, amount, age) and emits a triage record: exception class, human owner role, recommended next agent or human action, SLA due, and escalation ladder. A human Exception Desk specialist accepts, recodes, or reassigns. The agent does not close exceptions by “accepting the variance.”

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On break handoff | Triage record |
| Desk accept | SSC hours | Owner live |
| Sweep | 10:00 and 15:00 ET | Unowned / breached |
| Weekly | Friday | Mix by class / plant / vendor for Agent 15 |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Break payload | Agents 02, 03, 07, 11, 12 (holds) | Y |
| Taxonomy `AP-XCP-001` | Controlled | Y |
| Owner matrix (role by class, plant, $) | Controlled | Y |
| SLA table | Controlled | Y |
| Work object history | Orchestrator | Y |
| Open related exceptions (same PO/vendor) | Orchestrator | N |
| DOA / plant calendar | HR / finance | For assignment only |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Orchestrator read/write | Status, owner, SLA |
| Taxonomy + owner matrix | Read, version-hashed |
| ERP inquiry (open PO, GR, vendor block) | Read — to *confirm facts*, not to fix |
| Mail / ticket (internal) | Draft at L2 only |
| People directory | Read deputies in the matrix only |

No ERP write. No supplier send.

---

## 6. Responsibilities

1. Accept only objects with a coded break or `OUT_OF_SCOPE`. If codes are blank, `QUERY_UNCODED` to the sending agent’s owner — do not invent a class.
2. Map codes → class (examples: `MISSING_GR`, `QTY_OVER`, `PRICE`, `UOM`, `PO_DEFECT`, `TAX_FIELD`, `MULTI_PO`, `GR_AMBIGUOUS`, `ANOMALY_HOLD`, `NON_PO_UNROUTED`, `STATEMENT_UNMATCHED`).
3. Apply owner matrix. If matrix is silent, assign Exception Desk Lead — never “Finance.”
4. Set next action: Agent 05/06/07/08/09, Controls (10), human specialist, Tax, Vendor Master.
5. Set SLA from table (Northline examples: missing GR 5 business days to first receiver response; price break 3 days to buyer; anomaly hold 2 days to Controls).
6. Detect clusters (same PO, same vendor + class ≥ 5 open) and tag `CLUSTER` for Agent 15.
7. Emit triage record; wait for desk accept at L1.
8. Start SLA clock only after accept (or at L2 if chartered for auto-assign on a whitelist of classes).
9. Re-triage when new facts arrive (GR posted, PO changed by human). Do not leave stale owners.

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Resolving the break (no qty write-off, no price accept, no GR create).
3. Overriding match tolerances.
4. Clearing Agent 10 flags (can route to Controls; cannot clear).
5. Contacting suppliers (Agent 08) or internals (Agent 09) except as a *handoff*.
6. Assigning a person not in the matrix because they “usually help.”
7. Closing an exception for inactivity.
8. Changing the taxonomy ad hoc in a prompt.
9. Promising a supplier a resolution time.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | Exception Desk Lead / Tomasz Wójcik |
| Backup | Priya Shah (Match Lead) — backup only, SoD watch |
| Escalation | AP Manager |
| Owns | Taxonomy with Process Owner; owner matrix; SLA table; desk quality |
| Does not own | Plant warehouses, buying, cash |

At 15,000 invoices/month and a 28% observational exception rate, the desk is a real team, not a side duty. Staffing is a management decision. The agent does not compensate for an empty desk by auto-closing.

---

## 9. Approval requirements

| Action | Human | Notes |
|---|---|---|
| Class + owner at L1 | Desk accept | Recode allowed |
| Auto-assign (L2 whitelist) | Charter list only (e.g. `MISSING_GR` → plant liaison) | Sample 10% |
| SLA extension | Desk Lead | Reason coded |
| Close exception | Resolver + confirm in ERP/facts | Agent never closes alone |
| Matrix change | Process Owner + Controller if $ owners change | Change control |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Unaccepted triage > 4 SSC hours | Desk Lead | Same day |
| SLA breach | Owner’s manager + Desk Lead | On breach |
| Second breach | AP Manager + Plant Controller if plant-owned | +2 days |
| Cluster ≥ 10 same vendor/class | Agent 15 + Procurement Ops | Weekly or ad hoc |
| Anomaly hold > 2 days | Controls Lead | Calendar |
| Matrix miss (no owner) | Process Owner | Immediate |

---

## 11. Output standard

Triage record minimum:

| Field | Rule |
|---|---|
| `object_id` | Same |
| `agent_id` | `04` |
| `class` | Taxonomy |
| `owner_role` / `owner_name` | Named |
| `next_action` | Enum |
| `next_agent` | `05`/`06`/`07`/`08`/`09`/`10`/human |
| `sla_due` | Timestamp |
| `cluster_id` | If any |
| `taxonomy_hash` | Mandatory |
| `matrix_hash` | Mandatory |
| `human_state` | `pending_accept` / `accepted` / `recoded` |
| `autonomy_level` | Recorded |

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No ownerless exceptions | Matrix + sweep | Daily unowned = 0 |
| SoD | Desk does not release payments | Role review |
| Taxonomy stability | Hash | Monthly |
| No silent close | Close only with evidence | Sample 20 closes |
| Anomaly path | Class `ANOMALY_HOLD` always to Controls | 100% |

---

## 13. Audit evidence

Triage records 7 years; accept/recode 7 years; SLA extensions 7 years; taxonomy/matrix versions life-of-programme; sweep reports 1 year.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Time to accepted owner | Handoff → accept | Flow |
| Recode rate | Human class ≠ agent class | Taxonomy quality |
| Unowned count | Snapshot | Control |
| SLA breach % | By class | Management |
| Ping-pong | Reassigns > 2 | Matrix quality |
| Cluster tags | Count | Agent 15 |
| Cost / 1,000 exceptions | Desk + model | Brake |

Do not KPI “exceptions eliminated” as an agent success — that encourages improper closes.

---

## 15. Performance history fields

Period; inbound by sending agent; classes; recodes; unowned hours; breaches; extensions; ping-pong; clusters; closes (human); level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow assignment |
| L1 | Recommend; desk accepts | **Default** |
| L2 | Auto-assign whitelist classes; still no resolve |
| L3 | Auto-assign + start Agent 09 reminder on whitelist (internal only) |
| L4 | Exception oversight of that whitelist |

Never L3 resolve, write-off, or supplier commit.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Blank codes | Return to sender agent |
| Matrix miss | Assign Desk Lead + escalate |
| Orchestrator write fail | Freeze; do not assign in side spreadsheets as SOR |
| Owner on leave, no deputy | Desk Lead holds; do not invent |
| Duplicate triage records | Merge; keep audit |

---

## 18. Cost monitoring

Desk accept minutes, ping-pong minutes, model cost. Pause if recode > 25% for 2 weeks or ping-pong > 15% — the matrix is wrong; demote to L0 and fix the matrix.

---

## 19. Handoffs

03/02/07/11/12 → 04; 04 → 05/06/07/08/09/10/human; 04 → 15 cluster; 04 → 16 events; resolvers → 04 re-triage or human close.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Accept SLA (desk) | 4 SSC hours |
| Missing GR owner | Plant finance liaison |
| Price owner | Buyer on PO |
| UOM owner | Buyer + Master Data |
| Anomaly owner | Controls Lead |
| Cluster threshold | 5 open same vendor+class |

---

## 21. First 90 days

Spend L0 aligning taxonomy with how specialists *actually* talk. A taxonomy nobody uses will be recoded to death. Do not auto-assign until recode < 15% for two weeks.

---

## 22. Worked example — Northline Industrials

**`WO-1048821` `QTY_OVER` line 7, $19,596, Dayton.**

Triage: class `QTY_OVER`; owner role Warehouse Supervisor Dayton (from matrix, not “someone in shipping”); next Agent 05 for receipt confirmation *and* Agent 09 if no response in 2 days; SLA first response 5 business days; not a cluster yet (2 open Lakeshore qty issues — below 5).

Tomasz accepts. He does not change the qty. He does not ask Matching to “use 2.1% just this once.”

**Friday sweep:** 14 `MISSING_GR` Birmingham > SLA. Escalate to Birmingham Plant Controller. Agent 09 packets go out. Agent 15 tagged because Birmingham missing GR is 19% of US-AL exceptions this month.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 04
class: QTY_OVER
owner_role: Warehouse Supervisor Dayton
owner_name: (from matrix — L. Grant)
next_action: CONFIRM_RECEIPT_QTY
next_agent: 05
sla_due: 2026-04-14T21:00:00Z
taxonomy_hash: e2bb…
human_state: accepted
autonomy_level: L1
```

---

## 24. What this agent does not replace

The Exception Desk, plant ownership, or root-cause work. A well-triaged exception is still an exception.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_04 Exception Triage |
| Default autonomy | L1 (start L0) |
