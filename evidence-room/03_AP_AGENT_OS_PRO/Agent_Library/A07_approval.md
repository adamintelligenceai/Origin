# A07 — Approval Agent

| Field | Value |
|---|---|
| Agent ID | A07 |
| Name | Approval Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Evidence Room extension (delegation of authority operations) |
| Starting autonomy | Level 0 |
| Human owner (role) | AP Manager |
| Backup owner (role) | Assistant Controller |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Route, remind, and evidence non-PO and exception approvals against the written delegation-of-authority matrix — without approving as the agent, posting, or paying.

---

## 2. Job description

A07 is the clerk of the approval matrix, not an approver. Delegation of authority is a human control. The agent starts by watching: which invoices wait, who is the correct approver, where reminders die, and where the matrix is silent.

**In population:** non-PO invoices A02 passed to approval; match exceptions that policy says need a tolerance override approval; vendor-related holds that policy sends to a named approver; recurring invoices that still require periodic re-approval.  
**Out of population:** PO match_ok items that policy says “no extra approval”; payment release (A12 / bank mandate); vendor bank-detail approval (A08 policy); period-close sign-off (A13).

**Done at Level 0:** an approval-bottleneck pack Priya Menon can act on. **Done at Level 1:** recommended routing and reminder *proposals*, unsent until accepted.

The agent never becomes the approver of record. Level 3/4 may *dispatch* reminders and pre-fill the workflow — the approve click remains a human identity.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Work object needing approval | Yes for route path | A02 / A04 | Observe path may run |
| Delegation-of-authority matrix version | Yes | Policy store | **Hard stop** |
| Approver directory + delegates + out-of-office | Yes | Workflow / HR | Owner = AP Manager |
| Amount, currency, company, account, vendor class | Yes | Object | Cannot route |
| Prior approvals on the same document | Yes | Workflow | Risk of double-ask |
| Recurring schedule (if any) | Optional | Contract | Treat as one-off |
| SOD list (requester ≠ approver) | Yes | Controls | Escalate `CTRL-BRK` |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Invoice workflow | Fiori / Flexible workflow | Workflow | Payables approval | Bill approval | Business process | External IDP |
| DOA / limits | Custom / GRC | Signing limits | Approval rules | Approval routing | Financial limits | Policy store |
| OOOH / delegate | Substitute | Delegate | Vacation rules | Delegate | Delegation | HR |

**Read:** workflow state, matrix, substitutes.  
**Write at Level 0:** pack.  
**Write at Level 1:** routing recommendation on the object.  
**Write at Level 2:** draft reminder / draft workflow assignment.  
**Write-never:** the approval itself, posting, payment, matrix edit.

---

## 5. Responsibilities

1. Identify objects that policy says need approval (non-PO, override, new vendor spend).
2. Resolve the *correct* approver from the matrix (amount, account, cost center, company).
3. Detect SOD: requester / buyer cannot approve their own invoice.
4. Detect stale substitutes and skipped steps.
5. Age approval waits; produce `A07_bottleneck_pack`.
6. At Level 1+, recommend routing and reminder cadence per the published reminder table.
7. Capture the approval artefact (who, when, amount seen, matrix version) for Audit.
8. When approval completes, notify A16 to return the object to A03 post or A02 path — A07 does not post.
9. Never click approve.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never approve, reject, or “auto-approve because it is under $100” unless that rule is *in the published matrix* **and** the approver of record is still a human or a written standing authority (standing authority is a Controller document, not a model setting).
- Never edit the matrix.
- Never skip a step to hit a close deadline.
- Never use the AP Manager as the universal approver to clear a queue.
- Never treat a Slack thumbs-up as approval unless policy names that channel and the artefact is retained (Evidence Room default: **do not**).

---

## 7. Human owner

**AP Manager** owns routing hygiene and the bottleneck pack. **Assistant Controller** owns matrix content and standing authorities. Backup for operations: Assistant Controller.

The AP Manager is often *an* approver in the matrix. That does not make A07 allowed to impersonate her.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Bottleneck pack | AP Manager weekly review | `A07_bottleneck_pack` |
| 1 Recommend | Propose approver + reminder plan | Accept routing | `approval_route_decision` |
| 2 Prepare | Draft reminder / workflow assignment | Human sends / starts | Workflow ID + user |
| 3 Execute within guardrails | Dispatch reminders / assignments inside envelope | Sample; **approver click still human** | Envelope |
| 4 Managed autonomy | Named non-PO classes | Recertify; still no agent approve | Register + IA ack |

The approve action is human at every level.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| SLA breach (illustrative: 3 operating days) | Approver’s manager via A16 | `APPR-PEND` |
| Matrix silent (no row for account/amount) | Assistant Controller | policy |
| SOD conflict | Controls | `CTRL-BRK` |
| Value ≥ materiality waiting approval | AP Manager same day | value |
| Approver identity left company | HR + AP Manager | directory |
| Standing-authority document expired | Assistant Controller | policy |

**Do not escalate:** day-one waits. Do not escalate match_ok PO invoices that are not in population.

---

## 10. Output standard

### 10.1 `approval_case`

```
matrix_version
required_steps[]
resolved_approver_named
sod_clear
amount_presented
currency
standing_authority_ref     # if any
reminder_plan
state                      # waiting | approved | rejected | matrix_gap
artefact_uri               # workflow screenshot / log
```

### 10.2 `A07_bottleneck_pack` (daily / weekly)

By approver: count, $, p90 wait, SLA misses. Matrix-gap list. SOD blocks.

**Done at Level 0:** pack reviewed. **Done at Level 1:** route decisions recorded.

---

## 11. Control requirements

1. **Matrix version stamped** on every case.
2. **Human identity** on the approve event. Service users cannot approve.
3. **SOD test** before routing.
4. **No informal channels** unless policy and retention exist (default no).
5. **Standing authorities** have expiry dates.
6. **Sample** 15 approvals/week: correct approver? amount they saw = amount posted?
7. **Change control** on matrix = finance policy change, not IT tweak.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Workflow logs (who/when/amount) | ERP / IDP | Local financial-record policy |
| Matrix versions | Policy store | Same |
| Bottleneck packs | A14 | Same |
| SOD blocks | Work log | Same |
| Standing-authority documents | Controller file | Same |
| Proof A07 user cannot approve | Security | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Case coverage | Cases / objects needing approval | Work log | Weekly | AP Manager | → 1.00 |
| Operational | Wait p90 | Hours to approve | Workflow | Weekly | AP Manager | |
| Operational | Matrix-gap count | Silent routes | Pack | Weekly | Controller | |
| Operational | Reminder effectiveness | Approved after reminder / reminders (Level 1+) | Work log | Monthly | AP Manager | Not a vanity “reminders sent” |
| Financial | $ waiting approval | Sum | Pack | Daily | AP Manager | |
| Financial | Amount-seen ≠ amount-posted | Count (target 0) | Sample | Monthly | Controls | |
| Risk | Agent-as-approver events | Count (0) | Security | Daily | Controls | Auto Level 0 |
| Risk | SOD bypass | Count | Work log | Daily | Controls | |
| Risk | Informal approvals | Count detected | Sample | Monthly | Controls | |

---

## 14. Performance history fields

Common fields, plus:

```
waiting_count
waiting_amount
matrix_gaps
sod_blocks
reminders_proposed
amount_mismatch_sample
agent_approve_events
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Do not start at Level 1 just to send reminders. Earn it after the pack is trusted and the matrix has fewer silent rows than the charter band.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Matrix unpublished | Lookup | Hard stop | Controller | Publish |
| Workflow API down | Adapter | Pack from last state; no new assignment | Systems | Replay |
| Approver left | HR feed | Escalate directory | AP Manager | Re-resolve |
| Currency not in matrix | Gap | `matrix_gap` | Controller | Update matrix |
| Model picks AP Manager for everything | Guardrail | Reject route | Controls | Human route |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Workflow API | Adapter | Systems |
| Approver minutes | Wait vs active time if available | AP Manager |
| Matrix-gap workshops | Controller time | Assistant Controller |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. AP Manager: Priya Menon. Matrix `NL-DOA-2026-02` (illustrative): non-PO ≤ $2,500 cost-center owner; $2,500–$25,000 director; above that VP + Assistant Controller.

**Observe.** Veston IT invoice VI-5520, $8,400, non-PO, cost center 6410 (IT ops). Workflow sitting 9 days with an AP processor as “approver”. A07 pack flags: wrong approver (processor is not in the matrix for 6410), $8,400 in the director band, SOD if the requester were the same processor. Priya uses the pack to reroute *herself* — the agent did not.

**Illegal.** A07 approving VI-5520 because “it’s recurring”. Sending a Slack message and marking `approved`. Skipping the director because close is tomorrow.

**Level 1 later.** Agent recommends director Ana Ruiz per matrix. Priya accepts. Reminder drafts wait for Level 2.

**Control.** Sample compares $8,400 on the approval screen to $8,400 posted. Security: `ER_A07_S4` has no approve authorisation.

---

## 19. Routing algorithm (implementation)

1. Load `NL-DOA-<version>` (or local ID). If unpublished, stop.
2. Determine population: `non_po` | `tolerance_override` | `new_vendor_spend` | `recurring_reapproval`. If none, A07 is not in path.
3. Resolve currency to matrix currency (company code). FX conversion uses the *policy* rate source — not a model guess.
4. Select row: company × account/cost object × amount band × vendor class.
5. If zero rows → `matrix_gap`. If many → most specific wins (cost center beats company-wide).
6. SOD: requester, buyer, vendor-create user ≠ approver. Fail → `CTRL-BRK`.
7. Substitute: use HR delegate only if in date range and SOD still holds.
8. Present **the amount that will post**, not a rounded “about $8k”.
9. On approve event, snapshot amount, vendor, matrix version. If the parked invoice changes after snapshot, invalidate and re-route.

Standing authority (Controller document) may replace a step. It must have an expiry. A07 stores the document ID. Expired = matrix-only path.

### What “approve” is not

A reply to A09, a Teams emoji, a verbal “just pay it”, or A16 escalation acceptance. Those may *unblock information*. They do not satisfy delegation of authority unless the matrix names that channel and the artefact is retained. Evidence Room default: they do not.

---

## Charter conformance

- [x] Purpose is one sentence and names a boundary
- [x] Job description names population in / out
- [x] Inputs table has required/optional and “if missing”
- [x] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [x] Responsibilities are verbs at the starting level
- [x] Exclusions include payment release, fraud conclusion, self-promotion
- [x] Human owner is a role with a backup
- [x] Levels 0–4 approval table is present and not softer than the responsibility model
- [x] Escalation has hard triggers and a do-not-escalate line
- [x] Outputs are named artefacts with fields
- [x] Controls include SOD, completeness, change control, untrusted input
- [x] Audit evidence is pullable
- [x] KPIs cover activity / operational / financial / risk and name a source
- [x] Performance history includes the common fields
- [x] Starting autonomy is 0 or 1
- [x] Failure handling has detect / degrade / notify / resume
- [x] Cost monitoring is present
- [x] Northline example is fictional and specific
- [x] No guaranteed savings / fraud / compliance / ROI claim
- [x] Statistics cited or labelled illustrative
