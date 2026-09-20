# AGENT 12 — Payment Proposal Review

**Stack position:** Each proposed payment run. Annotates. Never authorises, releases, or transmits payment.  
**Default autonomy:** L1 Recommend. Hard ceiling: L2 prepare/annotate.  
**Human owner (typical):** AP Payments Lead, with Treasury accountable for run integrity.  
**Payment authority:** None — and not earnable.  
**Northline instance:** Tuesday and Thursday runs; dual human approval; Positive Pay; companies 1000/1100 live notes, CA/MX human-only review.

---

## 1. Position in the stack

This is the most dangerous agent to misunderstand. ERP already built a proposal. Humans already feel late. Vendors already shout. The agent’s job is to **put holds and questions on the page** so two human authorisers can see them. The agent’s job is never to make the run “go.”

If a vendor, integrator, or internal sponsor says “auto-release under $5k,” refuse. $5k is a human DOA number at Northline, not an agent payment limit.

---

## 2. Job description

The Payment Proposal Review Agent reads the proposal (or payment batch in draft), joins each line to work-object state, Agent 10 flags, vendor master change recency, invoice approval/match state, early-pay discount maths *as information*, stop-pay lists, and statement-only IDs (which must not appear). It emits an annotation pack: `OK_FOR_HUMAN_REVIEW`, `HOLD_ANOMALY`, `HOLD_BANK_CHANGE`, `HOLD_OPEN_EXCEPTION`, `HOLD_NOT_APPROVED`, `HOLD_STOP_PAY`, `QUERY_DISCOUNT`, `LEAK_STATEMENT_ONLY`. Humans deselect and then two humans authorise.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Pre-run | Tue/Thu 06:30 ET | Annotation pack |
| Intra-run | If proposal rebuilt | Re-annotate (full, not delta-only) |
| Post-run | After release | Compare released set vs annotations (detective) |
| Ad hoc | Emergency pay request | Same checklist; no shortcut |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Draft proposal / batch | ERP / treasury | Y |
| Work objects for each invoice | Orchestrator | Y |
| Agent 10 flag + scan-available bit | Agent 10 | Y |
| Vendor bank-change log (90 days) | ERP / Vendor Master | Y |
| Stop-pay / sanctioned / audit hold lists | Controls / Legal / Treasury | Y |
| Match/approval state | Agents 03/07 | Y |
| Discount terms vs dates | ERP | N — informational |
| Agent 11 leak check | Statement-only IDs | Y |
| Prior annotations this run | Orchestrator | If rebuild |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Payment proposal read | Read **only** |
| Vendor master change | Read |
| Orchestrator | Write annotations |
| Hold lists | Read |

The service account must not have payment release, bank-file download-to-transmit, or Positive Pay approve. If a role template “Payments” includes those, **do not use it**. Build a review-only role.

ERP: D365 payment journal draft; SAP F110 proposal; Oracle payment process request; NetSuite payment batch; Workday settlement run. Review-only.

---

## 6. Responsibilities

1. Freeze a copy of the proposal IDs and amounts (hash) so annotations attach to a version.
2. For each line, evaluate the hold tests in published order (see §20). First fatal hold wins; still record all fires.
3. If Agent 10 `SCAN_UNAVAILABLE`, mark the **run** `SCAN_DEGRADED` — authorisers must decide delay vs extra sample. The agent does not decide.
4. `LEAK_STATEMENT_ONLY` is a control incident, not a quiet deselect by the agent.
5. Discount `QUERY` is maths only (“discount expires today; invoice has open qty break”). No “pay now to save.”
6. Produce the pack before 07:30 ET on run days (Northline). If late, Payments Lead delays the run — the agent does not skip tests.
7. After human deselects, re-hash. After two authorisers release, detective-compare: any line that had a fatal hold but released → incident.
8. Emergency single payments get the same tests. Urgency is not a class.

---

## 7. Explicit exclusions

1. Authorising payment.
2. Releasing a journal, batch, or bank file.
3. Transmitting to bank or Positive Pay exception decide.
4. Deselecting lines in the ERP (humans deselect).
5. Adding lines (statement, dunning, “relationship”).
6. Changing vendor bank to make a payment succeed.
7. Promising suppliers they are on the run.
8. Using discount, relationship, or “CFO said” as a release criterion.
9. Auto-release under any dollar cap.
10. Clearing Agent 10 flags.
11. Declaring the run “safe.”

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Payments Lead / Grace Okonkwo |
| Treasury counterpart | Treasury Manager (second authoriser) |
| Backup | AP Manager (still needs a second human) |
| Escalation | Controller + Treasurer |
| Owns | Annotation standard, run clock, detective compare |
| Does not own | Bank contract, investment of cash, DOA for invoices |

Two authorisers cannot be the agent owner plus the agent.

---

## 9. Approval requirements

| Action | Who |
|---|---|
| Accept annotations | Payments Lead |
| Deselect lines | Payments Lead (or procedure) |
| Authorise / release | Payments Lead **and** Treasury (Northline) |
| Transmit | Treasury / bank platform — human |
| Delay run due to `SCAN_DEGRADED` | Payments + Treasury |
| Release a line against a fatal annotation | **Forbidden** without Controls + Controller written override — still human, still not the agent |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Pack not ready 07:30 | Payments Lead — delay | Clock |
| `SCAN_DEGRADED` | Controls + Treasury | Before run |
| `LEAK_STATEMENT_ONLY` | Process Owner + Controls | Immediate |
| Fatal hold released (detective) | Controller + Treasurer + Security | Immediate |
| Bank-change line on proposal | Vendor Master + Controls | Before run |
| Service account gained release privilege | IT Security — stop agent | Immediate |

---

## 11. Output standard

Pack: run ID; proposal hash; company; line annotations (invoice, vendor, amount, codes, fatal Y/N); run-level `SCAN_DEGRADED`; “not an authorisation”; agent `12`; level; owner.

Detective report: released IDs vs fatal holds; empty is expected.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Dual human release | Agent has no release | Access + each run |
| Anomaly join | Fatal on open flag | 100% |
| Bank-change hold | 90-day window | Inject |
| No statement-only | Leak test | Each run |
| Detective compare | After release | Each run |
| SoD | Reviewer ≠ sole authoriser | Roles |

---

## 13. Audit evidence

Packs 7 years; proposal hashes 7 years; authoriser IDs (from ERP) 7 years; detective reports 7 years; privilege reviews 1 year; incidents 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Pack on-time | | Run discipline |
| Annotation accept / override | Overrides coded | Quality |
| Detective incidents | Must be 0 | Control |
| Statement leaks | Must be 0 | Control |
| `SCAN_DEGRADED` runs | | Dependency |
| Cost | | Brake |

Forbidden: “payments automated,” “safe pay,” “discount captured $,” ROI.

---

## 15. Performance history fields

Period; runs; lines; annotations by code; overrides; detective incidents; degraded scans; leaks; level; privilege incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow annotations |
| L1 | Live pack; humans deselect and authorise | **Default** |
| L2 | Prepare deselect list in a side file for humans to apply |
| L3 | **Does not exist for release** |
| L4 | **Does not exist for release** |

There is no promotion case that ends in agent-authorised payment.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Cannot read proposal | No pack; **no run** on hope |
| Orchestrator down | No pack; delay run |
| Agent 10 scan down | `SCAN_DEGRADED` |
| Privilege creep | Stop |
| Rebuild mid-morning | Full re-annotate; old pack void |

---

## 18. Cost monitoring

Compute is small; **incident cost is large**. The brake is: any detective incident → L0 and full recert. Do not “save time” by skipping the pack on a heavy Thursday.

---

## 19. Handoffs

ERP proposal→12; 10/03/07/11/Vendor Master→12 joins; 12→Payments Lead + Treasury; 12→detective; 12→16; never 12→bank.

---

## 20. Configuration parameters (hold tests)

Order (Northline start):

1. `HOLD_STOP_PAY`  
2. `HOLD_ANOMALY` (open flag)  
3. `HOLD_BANK_CHANGE` (90 days, unless Controls has a written clearance ID)  
4. `HOLD_NOT_APPROVED` / not matched when required  
5. `HOLD_OPEN_EXCEPTION` (qty/price/GR still open — policy: do not pay contested qty)  
6. `LEAK_STATEMENT_ONLY`  
7. `QUERY_DISCOUNT` (info)  
8. Else `OK_FOR_HUMAN_REVIEW`

---

## 21. First 90 days

L0 for four run days minimum. Then L1. Dual approval unchanged. No “pilot auto-release.” Tabletop a detective incident.

---

## 22. Worked example — Northline Industrials

**Thursday 16 April 2026, 06:31 ET.** Proposal 612 lines, $4.1m, companies 1000/1100.

- Two lines, Agent 10 open flags → `HOLD_ANOMALY` (includes `459102-A`).  
- One vendor, bank change yesterday → `HOLD_BANK_CHANGE`.  
- Invoice 459102 $19,596, open `QTY_OVER` → `HOLD_OPEN_EXCEPTION`.  
- Discount query on a clean $2,200 invoice (info).  
- Scan complete. No statement-only IDs.  
- Pack ready 07:12.

Grace deselects the four fatal holds. Treasury second-approves the remainder. Bank file human-transmitted. Detective: empty. Agent 12 did not release $4.1m. It annotated $4.1m.

**Vendor demo the same week:** “we would have released everything under $5k including the bank-change vendor.” Refusal logged.

---

## 23. Sample output artefact (abridged)

```
run_id: PAY-2026-04-16-THU
proposal_hash: 7aa1…
lines: 612
fatal_holds: 4
scan: complete
authorisation: HUMAN_ONLY
agent_id: 12
autonomy_level: L1
not_a_release: true
```

---

## 24. What this agent does not replace

Treasury, bank platforms, Positive Pay, dual approval, or cash forecasting. It replaces a proposal that nobody annotated.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_12 Payment Proposal Review |
| Default autonomy | L1 (start L0) |
| Ceiling | L2 annotate; never release |
