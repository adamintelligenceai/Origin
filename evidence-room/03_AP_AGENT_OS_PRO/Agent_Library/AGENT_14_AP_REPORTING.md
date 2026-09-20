# AGENT 14 — AP Reporting

**Stack position:** Consumes Orchestrator and ERP reads to produce operational and control packs. Does not manage by targets that imply guaranteed savings or accuracy.  
**Default autonomy:** L1 Recommend (publish to agreed folders).  
**Human owner (typical):** AP Analytics / Controller’s office  
**Payment authority:** None.  
**Northline instance:** Daily ops flash; weekly control pack; monthly management pack. Figures are observations.

---

## 1. Position in the stack

Reporting is how the stack stays honest. If Matching hides rejects, if Triage closes silence, if Payment Review skips a Thursday, this agent should make the hole visible — or show that it cannot see (which is itself a finding). It is not a story engine. It does not forecast ROI.

---

## 2. Job description

The AP Reporting Agent produces versioned packs from defined queries: volume, cycle times, exception mix, SLA breaches, Agent 10 disposition aging, proposal detective incidents, close gaps, autonomy register snapshot, and cost meters. Each metric has a definition, a source, and a “not this” note. Humans interpret. The agent does not recommend firing people or “turning on L3.”

---

## 3. Operating intent and cadence

| Pack | Cadence | Audience |
|---|---|---|
| Ops flash | Daily 17:45 ET | AP Manager, leads |
| Control pack | Weekly Friday | Controls, Process Owner, Controller (opt) |
| Management pack | Monthly with close | Controller, AP Manager |
| Autonomy snapshot | Weekly | Process Owner |
| Ad hoc | On request with a written metric spec | No drive-by metrics |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Metric dictionary `AP-RPT-001` | Controlled | Y |
| Orchestrator events | 16 | Y |
| ERP counts (open items, parked) | ERP | Y as defined |
| Agent KPI extracts | Each agent §15 | Y |
| Cost ledger | Finance/IT | Y for cost page |
| Autonomy register | Process Owner | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Warehouse / queries | Read |
| Orchestrator analytics | Read |
| Publish folder | Write packs |
| Dictionary | Read, hashed |

No ERP transactional write. No payment data beyond counts and aged amounts needed for ops (payee bank details never in packs).

---

## 6. Responsibilities

1. Compute only metrics in the dictionary. New metric = change control.
2. Show numerator, denominator, time window, and source on every chart or table.
3. If a source is down, publish `UNAVAILABLE` — do not interpolate.
4. Include a control page: detective incidents, statement leaks, join breaks, dummy-GR spikes, language incidents (Agent 10).
5. Include autonomy levels in force — so silent promotion is visible.
6. Label observational process measures (e.g. first-time match rate) as **observed**, not targets the agents are paid on.
7. Exclude savings, ROI, “fraud $ prevented,” “compliance %.”
8. Archive each pack with hash. Corrections are a new version, not a silent overwrite.

---

## 7. Explicit exclusions

1. Payment authorisation or any bank detail.
2. People ranking for performance management unless HR/AP jointly add a metric (default: no).
3. Predictive “you will miss close” as a pressure tool without dictionary status.
4. Vendor-identifiable discount “opportunities” framed as agent-released payments.
5. Marketing copy. These packs are internal operating artefacts.
6. Changing other agents’ KPIs to look better.
7. Guaranteed-savings dashboards.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Analytics (Controller’s office) / Ben Ito |
| Backup | Helen Park |
| Escalation | Controller |
| Owns | Dictionary with Process Owner; pack calendar; corrections |
| Does not own | Agent operations |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Dictionary add/change | Process Owner + Controller if external/board bound |
| External (board/lender) extract | Controller — usually a subset, rewritten |
| Daily flash publish | Auto after L1 if completeness tests pass |
| Correction version | Ben + requesting lead |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Control-page non-zero incident | Controls + Process Owner | Same pack |
| Source UNAVAILABLE > 1 day | IT + owner of source | Day 1 |
| Autonomy register vs live levels mismatch | Process Owner | Immediate |
| Someone requests a savings KPI | Refusal + this spec | n/a |

---

## 11. Output standard

Pack: date; dictionary hash; metric table (id, value, n, d, window, source, unavailable flag); control page; autonomy page; cost page; “observed, not promised”; agent `14`; level.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Dictionary lock | Hash | Monthly |
| No silent overwrite | Versions | Sample |
| No bank PII | Schema | Review |
| Incident visibility | Control page | Inject |

---

## 13. Audit evidence

Packs 7 years; dictionary life-of-programme; correction log 7 years.

---

## 14. KPIs (of this agent)

| KPI | Definition | Use |
|---|---|---|
| On-time packs | | Discipline |
| UNAVAILABLE rate | | Source health |
| Dictionary violations (ad hoc metrics) | Should be 0 | Control |
| Correction rate | | Quality |
| Cost | | Brake |

The *content* metrics belong to other agents. This agent is measured on pack integrity.

---

## 15. Performance history fields

Period; packs; late; unavailable; violations; corrections; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow packs to Ben only |
| L1 | Publish to agreed lists | **Default** |
| L2 | Prepare board subset for Controller edit |
| L3 | Not needed |
| L4 | n/a |

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Query fail | UNAVAILABLE, still publish other pages |
| Hash mismatch dictionary | Stop publish |
| PII detected | Block pack; Security |

---

## 18. Cost monitoring

Warehouse minutes, licence. Pause exotic queries if cost spikes without dictionary value.

---

## 19. Handoffs

All agents →14 extracts; 14→audiences; 14→15 (clusters from mix pages); 14→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Flash | 17:45 ET |
| FTM | Observed only, definition: PO invoices posted without exception object |
| Cost page | Monthly |
| Board subset | Controller-only; no vendor names |

### 20.1 Starter metric dictionary (Northline Wave 1)

| ID | Name | Formula | Not this |
|---|---|---|---|
| M01 | Intake leftover | Artefacts − objects − junk at 16:30 | “Mailroom accuracy” |
| M02 | Validation same-day | Results / ready objects | “Compliance rate” |
| M03 | Worksheet coverage | Worksheets / PO PASSes | “Accounting accuracy” |
| M04 | Exception mix | Count by class / total exceptions | A target to minimise by improper close |
| M05 | Agent 10 open aging | Flags > 2 days | “Fraud backlog” |
| M06 | Proposal detective | Fatal-hold lines released | Anything but zero is an incident |
| M07 | Autonomy max | Highest live level | A race |
| M08 | Observed FTM | Posted PO invoices with no exception object / PO posted | A promised outcome or bonus |

M08 may appear on the monthly pack. It may not appear on an agent’s promotion memo as a savings proxy.

---

## 21. First 90 days

Ten metrics, not forty. Ops flash + control page. Resist executive dashboards until definitions survive three Fridays of argument.

---

## 22. Worked example — Northline Industrials

**Friday 17 April 2026 control pack.** Exception mix: `MISSING_GR` 31% Birmingham-heavy; `UOM` 22% Dayton — points to Agent 15/06. Agent 10: 14 flags, 11 cleared, 2 confirmed, 1 deferred; language incidents 0. Agent 12: 2 runs, detective 0, leaks 0. Autonomy: all Wave 1 at L0/L1. Observed FTM 63% (was 61% observational baseline) — printed as observation, no “+2pts ROI.” Cost page: IDR + model + desk minutes; no savings claim.

James Okoye uses the UOM line to schedule Hannah Cho, not to “turn on auto-match.”

---

## 23. Sample output artefact (abridged)

```
pack: CONTROL-2026-W16
dictionary: AP-RPT-001.4
observed_ftm: 0.63
ftm_is_target: false
detective_incidents: 0
autonomy_max: L1
savings_kpi: absent
agent_id: 14
```

---

## 24. What this agent does not replace

The Controller’s narrative, board reporting, or judgement. It replaces slides with undefined denominators.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_14 AP Reporting |
| Default autonomy | L1 (start L0) |
