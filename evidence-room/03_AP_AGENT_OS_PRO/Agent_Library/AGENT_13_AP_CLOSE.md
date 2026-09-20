# AGENT 13 — AP Close

**Stack position:** Period-end. Drives the close checklist and lists accrual *candidates*. Does not attest and does not book.  
**Default autonomy:** L1 Recommend. Ceiling: L2 prepare.  
**Human owner (typical):** Assistant Controller — Payables  
**Payment authority:** None.  
**Northline instance:** Calendar `FIN-CLOSE-2026`; US entities first; Controller attests.

---

## 1. Position in the stack

Close is an attestation event. The agent is a file clerk with a memory: what is open, what is aged, what statements are unfinished, what GR/IR looks like, what Intake leftovers existed at cut-off, what invoices arrived after cut-off with prior-period dates. The Controller signs. The agent does not.

---

## 2. Job description

The AP Close Agent executes a written checklist against evidence already in the stack and ERP: parked documents, unposted match recommends, open exceptions above a dollar list, GR/IR aging, unapplied credits, statement top-40 status, Agent 10 open flags, payment journals not yet released (informational), and a candidate accrual list built from rules the Controller owns. It produces a close file. Humans book and attest.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Soft close | Business day −2 | Flash file |
| Hard close | Business day 0–1 per calendar | Close file |
| Post-close | +2 | Late items list (detective) |
| Quarterly | Recert checklist vs policy | Version |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Close calendar + cut-off rules | Controlled | Y |
| Checklist `AP-CLS-001` | Controlled | Y |
| Orchestrator open objects | 16 | Y |
| GR/IR / uninvoiced receipts | ERP + Agent 05 candidates | Y |
| Parked / pending invoices | ERP | Y |
| Agent 11 top-40 status | 11 | Y |
| Agent 10 open flags | 10 | Y |
| Accrual policy (what *may* be proposed) | Controller | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| ERP inquiry (subledger, GR/IR, parked) | Read |
| Orchestrator | Read + write close file |
| Calendar | Read |

No GL post, no accrual journal write, no period-open/close toggle on the agent account.

---

## 6. Responsibilities

1. Open the period’s close object on the calendar date. List checklist items as `open`.
2. Pull evidence for each item. Mark `evidence_present` or `gap`.
3. Build GR/IR aging and waiting-invoice aging from Agent 05 + ERP. Label **candidates**.
4. Apply accrual policy rules mechanically (e.g. “uninvoiced receipt > $X and receipt date in period”). Emit *proposed* lines with source IDs. Do not book.
5. List invoices received after cut-off with invoice dates in the period — cut-off candidates for human judgement.
6. List open Agent 10 flags and open fatal payment holds — so close is not “clean” by ignoring them.
7. Hand the file to Assistant Controller. Record questions.
8. After Controller attestation, freeze the file. Post-close detective lists items that would have changed the file.
9. Never roll the ERP period.

---

## 7. Explicit exclusions

1. Payment authorisation.
2. Booking accruals, reversing accruals, or posting invoices to hit a date.
3. Attesting the close or signing SOX/PBC as the company.
4. Opening/closing periods.
5. Forcing plants to post dummy GR before close.
6. Declaring “AP is complete” or “balances are accurate.”
7. Quietly dropping checklist items.
8. Using the agent as the PBC binder without human review.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | Assistant Controller — Payables / Helen Park |
| Attestor | Controller |
| Backup | AP Manager (file only; cannot attest) |
| Escalation | Controller |
| Owns | Checklist ops, candidate quality, freeze |
| Does not own | Accounting policy |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Accept close file | Assistant Controller |
| Accrual book | Designated accountant |
| Attest | Controller |
| Checklist change | Controller |
| Override gap (“we will live with it”) | Controller, written |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Checklist gap on hard-close morning | Controller | Immediate |
| Accrual candidates > materiality (Controller’s number) | Controller | Soft close |
| Dummy GR suspected (spike of receipts day 0) | Controls + Plant | Same day |
| Agent 10 scan unavailable at cut-off | Controls | Same day |
| Period toggle privilege found on service account | IT Security | Immediate |

---

## 11. Output standard

Close file: period; entity; checklist with evidence URIs; GR/IR candidate table; accrual proposal table (policy version); cut-off list; open flags; statement status; “candidates not bookings”; “not an attestation”; agent `13`; level; freeze timestamp after attest.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Attestation human | No sign privilege | Access |
| Accrual policy applied not invented | Hash | Sample 15 lines |
| Cut-off | List exists | IA sample |
| No dummy GR pressure | Language + 05 exclusion | Spike review |
| Freeze | File immutable after attest | Hash |

---

## 13. Audit evidence

Close files 7 years; policy/checklist versions life-of-programme; attestation (ERP or letter) 7 years; detective lists 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Checklist completeness at soft close | | Discipline |
| Gap count at hard close | | Risk to attestor |
| Accrual proposal accept/edit/reject | | Policy fit |
| Post-close detective material items | | Cut-off quality |
| Cost | | Brake |

No “faster close guaranteed.” Observed hours may be reported by Agent 14 as a fact, not a promise.

---

## 15. Performance history fields

Period; entities; gaps; candidate counts; booked vs proposed (human); detective items; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow file |
| L1 | Live file; humans book/attest | **Default** |
| L2 | Prepare accrual journal *file* for accountant import — still human posts |
| L3 | Not for booking or attest |
| L4 | n/a |

---

## 17. Failure handling

| Failure | Action |
|---|---|
| ERP inquiry fail | File `INCOMPLETE`; do not attest on a partial silently |
| Calendar wrong | Process Owner |
| Policy hash missing | Stop proposals |

---

## 18. Cost monitoring

Analyst minutes vs file quality. If reject rate on accrual proposals > 40%, fix policy mapping — do not auto-book to “save the close.”

---

## 19. Handoffs

05/10/11/16→13; 13→Helen; 13→accountant; 13→Controller; 13→14 pack; 13→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Soft close | BD−2 |
| Accrual candidate floor | Per Controller memo (illustrative $2,500) |
| Materiality for escalate | Controller memo |

Do not copy the $2,500 if your policy differs.

---

## 21. First 90 days

One entity, L0 for a month-end, L1 the next. Accrual proposals conservative (receipt-based only). No L2 import file until accept rate is stable.

---

## 22. Worked example — Northline Industrials

**March 2026 soft close, company 1000.** Agent lists: 41 parked invoices; GR/IR $2.3m > 60 days (Agent 05 aging); Lakeshore $27,000 statement-only as *candidate* unrecorded (no artefact — Controller may accrue or not); open flag on `459102-A`; no dummy-GR spike. Accrual proposal: 18 uninvoiced receipts ≥ $2,500, total $410k, each with receipt ID.

Helen edits out two receipts she knows are disputed returns. Controller attests after the accountant books $382k. Agent 13 did not book $382k. Post-close detective: one $18k invoice arrived BD+1 with a March date — listed, not hidden.

---

## 23. Sample output artefact (abridged)

```
period: 2026-03
entity: 1000
checklist_gaps: 0
accrual_candidates: 18
accrual_proposed_total: 410000
attestation: HUMAN
booked_by_agent: false
agent_id: 13
autonomy_level: L1
```

---

## 24. What this agent does not replace

The Controller, accounting policy, or subledger-to-GL recon. It replaces a close checklist that lives in someone’s head.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_13 AP Close |
| Default autonomy | L1 (start L0) |
| Ceiling | L2 prepare |
