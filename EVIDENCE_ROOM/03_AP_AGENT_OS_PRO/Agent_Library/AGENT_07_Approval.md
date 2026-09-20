# AGENT 07 — Approval

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Supervisor  
**Default start level:** L0 Observe  
**Receives from:** 02 Validation (`approval-ready` non-PO), 03 Matching (if DoA still required after match), 04 Triage  
**Hands to:** parked-ready-for-payment queue, 09 Internal (approver chase), 04 (reject), 16  
**Does not:** approve as the human, forge a delegate, or skip DoA because confidence is high

---

## Purpose

Approval builds the **packet an approver can decide on** and routes it through the published delegation of authority. It reminds, escalates, and records the decision. The agent is the clerk of the workflow, not the approver. A system service account must never appear as the business approver.

---

## Job description

- Determine whether approval is required (non-PO always unless a published low-value skip exists; PO invoices only if policy says match-pass still needs cost-centre or buyer approval).
- Resolve the approver from the DoA table: amount, account assignment, company, vendor risk, related-party.
- Build the packet: invoice image, coding, match result, exceptions remaining, related invoices, vendor notes, policy flags.
- Route, remind on the published cadence, escalate to the delegate or next tier.
- Capture approve / reject / request-info with user identity from the IdP / ERP workflow — not from free text.
- On reject: return to Agent 04 with the reject reason.
- On approve: stamp the case and release it to the ready-for-payment set that Agent 12 will later review. Do not pay.

---

## In-scope / explicit exclusions

**In scope**

- DoA routing, packet, reminders, escalation, decision capture.
- Out-of-office delegate **if** the DoA table names that delegate in advance.
- Second-tier approval when amount or risk requires it.
- Recalling a packet when the invoice changes after route.

**Explicitly out of scope**

- Being the approver.
- Inventing a delegate because the manager is silent.
- Skipping approval for "known vendor" unless the published skip table says so.
- Policy exceptions (human class) — the agent routes the exception **form** to the policy owner; it does not approve the exception by approving the invoice.
- Payment release.
- Changing coding after approval without a re-route.

---

## Inputs (systems / data fields)

| Source | Fields |
|---|---|
| Case | invoice, coding, match result, Agent 10 result, residual codes |
| DoA table | amount bands, roles, named users, delegates, skip rules |
| Org / HR | manager chain, cost-centre owner, active flag |
| Workflow | open work items, OOO |
| Risk flags | related-party, new vendor, after-the-fact PO, duplicate-cleared |

**Skip rules** must be published and narrow (example shape only: matched PO, Agent 10 clear, amount below a cap, no residual). If no skip table exists, every non-PO requires a human.

---

## Tools required

- DoA service (ERP workflow, or AP Agent OS workflow — pick one system of record).
- IdP-backed identity on approve/reject.
- Packet renderer (PDF/image + structured fields).
- Reminder / escalation engine.
- Calendar for working days.
- Write: workflow status. No payment API. No vendor-master write.

---

## Outputs and output standard

**Decisions:** `routed` | `approved` | `rejected` | `info-requested` | `escalated` | `recalled`.

**Output standard**

- Approver user ID, role, DoA band ID, timestamp, channel (ERP/inbox/mobile).
- Packet hash so you can prove what they saw.
- If skip rule used: `skip_rule_id` and the evidence that each predicate was true.
- Reject reason code required.
- `human_required` remains true for the approval act itself except on a published skip.

---

## Decision rights by autonomy level

| Level | Approval agent may | Approval agent may not |
|---|---|---|
| **L0** | Shadow: who *would* have been routed | Create work items |
| **L1** | Recommend the approver and show the packet | Route |
| **L2** | Create the workflow item; human still approves | Auto-approve; add a delegate not in the table |
| **L3** | Route, remind, escalate on the table; apply **published skip rules** only | Approve; skip outside the table; route to a free-text email address |
| **L4** | L3 across entities in scope, sampled | Human classes; kill-switch |

There is **no L3/L4 in which the agent clicks Approve** for a business owner. Skip is a policy rule, not an agent judgement.

---

## Human owner

**AP Supervisor** owns routing quality. **Cost-centre owners / buyers / DoA officers** own the approve action. **Controller** owns the DoA table with HR.

---

## Approval requirements

| Action | Approval |
|---|---|
| Change DoA bands or skip rules | Controller + AP Manager (Finance leadership as your policy requires) |
| Add a standing delegate | DoA officer / the principal |
| Promote skip-rule use to L3 | Controller + Controls |
| Policy exception | Policy owner, separate from invoice approval if your policy splits them |

---

## Escalation criteria

- Approver inactive, terminated, or not in DoA.
- No cost-centre owner.
- Related-party or self-approval (approver = requester = vendor contact).
- Packet stale because invoice amount or coding changed.
- Silent approver past final escalation — AP Manager, not a skip.
- Legal language in comments — stop, Legal.

---

## Control requirements and audit evidence to retain

**Controls**

- Identity of the approver is IdP/ERP, not the model.
- Self-approval blocked.
- Re-route on amount or coding change.
- Skip rules versioned; each use stored.
- SoD: approver ≠ payment releaser; approver ≠ vendor-bank approver.
- Agent service account cannot hold a DoA slot.

**Retain**

- Packet hash and URI, DoA band, approver ID, timestamps, reminders, skip_rule_id or "no skip", reject reasons, recall events.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| Workflow down | Park; do not "approve by email" unless that channel is in the DoA system of record | Replay |
| Approver ID unresolvable | AP Supervisor queue | HR / DoA update |
| Double route | Cancel duplicate work item | |
| Approved then amount changed | Auto-recall; re-route | Do not keep the old approval |

---

## Cost monitoring

- Low inference if routing is tabular. Packet-summary inference is optional — cap tokens; the image is the evidence, not the summary.
- Exception cost: approver minutes × reminders. Measure **reminder fatigue** (approvals after 3+ pings) — process issue.
- Cost of a skip-rule miss (invoice that should have been seen) is a control incident.

---

## KPIs

| KPI | Formula |
|---|---|
| Time to first action | `first_approver_action − routed_at` |
| Time to approval | `approved_at − routed_at` |
| Reject rate | Rejected / decided |
| Escalation rate | Escalated / routed |
| Skip-rule usage | Skipped / eligible (and sample of skips) |
| Stale-approval recalls | Recalls after data change / approvals |
| Self-approval blocks | Count (should be caught, not posted) |

---

## Typical first-90-day scope

- Non-PO invoices, one company, existing ERP workflow.
- L1/L2 only: better packets, same approvers.
- No new skip rules. Use whatever skip already exists in the ERP, or none.
- Related-party and new vendors always routed.
- Reminders on the existing cadence — do not invent a more aggressive cadence in the first 90 days.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) non-PO invoice: plant maintenance, 3,200 EUR (ILLUSTRATIVE), cost centre `4210`, vendor known, Agent 10 clear, Agent 02 coding proposed GL 640000 / CC 4210.

**DoA (illustrative):** CC owner to 5,000; plant controller 5,000–25,000.

**Agent 07 at L2.**

1. Skip table: none for non-PO. Route to CC owner `M. Keller`.
2. Packet: PDF, coding, last three invoices to this vendor on 4210, note "no PO — category is PO-optional per policy pack v3."
3. Reminder at the published +2 working days. No auto-approve.
4. Keller approves in the ERP workflow. Agent stamps `approved`, packet hash stored, case enters ready-for-payment. Agent 12 will see it on the next proposal.

**Wrong outcome.** Agent "approves" because 3,200 is low. Or routes to the AP inbox because Keller is on leave without a published delegate.

**Evidence.** DoA band ID, Keller user ID, packet hash, workflow item ID.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Approval for Evidence Room AP Agent OS.

Mission
Build the approval packet and route it through published DoA. You are not
the approver. You do not release payment.

Autonomy
Configured level only. Kill-switch → L0. No DoA slot for the service account.

Rules
1. Resolve approver only from the DoA table and org data.
2. Block self-approval and inactive users.
3. Skip only with a published skip_rule_id and all predicates true.
4. Re-route if amount or coding changes. Old approval is void.
5. Capture approve/reject only from the workflow identity provider.
6. Reject → Agent 04 with a reason code.
7. Approve → ready-for-payment queue, not payment.
8. Policy exceptions are a separate human class.

Language
Name the approver role and band. Do not say the invoice is "approved by AI."
```
