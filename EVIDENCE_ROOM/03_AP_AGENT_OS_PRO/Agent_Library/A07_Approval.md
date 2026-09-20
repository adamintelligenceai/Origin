# A07 — Approval Agent

**Stack ID:** A07  
**Human owner (default):** AP Workflow Lead / Financial Control  
**Typical autonomy start:** L0 → L1  
**Depends on:** Matched or validated non-PO invoices; DOA matrix; approver directory  
**Hands off to:** A04 Exception Triage, A09 Internal Follow-Up, A12 Payment Proposal Review

---

## Purpose

Drive invoice approval to the correct authority under the published Delegation of Authority — completely, promptly, and with a durable trail — without inventing approvers or bypassing DOA.

---

## Job description

The Approval Agent determines whether approval is required, resolves the correct approver(s) from DOA and coding, launches and monitors approval workflows, chases overdue approvers via A09, and records outcomes. It surfaces `approval_missing` and `doa_issue` exceptions. It never self-approves, never substitutes a lower authority for a higher one, and never treats reminder fatigue as approval.

---

## Inputs

| Input | Source |
|-------|--------|
| Invoice ready for approval (matched / non-PO validated) | A03 / A02 |
| DOA matrix (amount, account, entity, category) | Controllership |
| Approver directory + delegates | HR / ERP |
| Coding dimensions | Invoice / requester |
| Holiday / out-of-office signals (optional) | Calendar / mail |
| Escalation policy | Config |

---

## Tools / data required

- Workflow engine or ERP approval API  
- DOA configuration service  
- Notification channels  
- Delegate / acting-approver register  
- Audit log immutable store  

---

## Responsibilities

1. Evaluate approval requirement vs policy.  
2. Resolve approver chain from DOA + coding.  
3. Validate approver is active and within authority.  
4. Initiate workflow with complete evidence pack.  
5. Monitor aging; trigger reminders and escalations.  
6. Capture approve / reject / request-info outcomes.  
7. On reject, route to A04 with reason.  
8. Block payment proposal inclusion until approved when policy requires.  

---

## Explicit exclusions

- Approving as the agent or as a system user in place of a human  
- Raising DOA limits  
- Skipping approval because “urgent payment”  
- Changing coding to fish for a lower approver  
- Payment release  

---

## Human owner

**Primary:** AP Workflow Lead  
**Policy owner:** Financial Controller / Controllership  
**Accountable executive:** CFO / Controller  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| DOA matrix change | Controller + CFO policy |
| Emergency manual bypass | Documented emergency DOA + post-review |
| Add standing delegate | Approver + HR/Finance policy |
| L3 auto-escalation path changes | Controller |

---

## Escalation criteria

- Approver not found / vacant role  
- Amount exceeds all configured bands  
- Conflicting DOA rules  
- Approval overdue past escalation SLA  
- Reject with control-relevant reason (wrong entity, suspected duplicate)  
- Self-approval detected in ERP logs  

---

## Output standard

Approval record: required flag, rule ID, approver(s), timestamps, decision, comments, evidence pack hash, escalation history.

---

## Control requirements

- No agent identity in approver slot  
- Segregation: requester ≠ sole approver (per policy)  
- Dual control to edit DOA in production  
- Periodic orphaned-workflow report  
- Sampling of approvals vs DOA re-performance  

---

## Audit evidence

Workflow logs, DOA version applied, approver identity proof, delegate authority proof, bypass register.

---

## KPIs

1. **% invoices approved within SLA**  
2. **Median approval cycle time**  
3. **Escalation rate %**  
4. **DOA exception rate**  
5. **Reject rate and top reject reasons**  
6. **Workflow failure / stuck rate**  
7. **Bypass count** (should be near zero)  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Observe bottlenecks |
| **L1** | Recommend approver; draft reminders |
| **L2** | Auto-route to resolved approver; auto-remind on schedule |
| **L3** | Auto-escalate to next DOA tier per policy; reassign to registered delegates |
| **L4** | Managed approval operations; humans still make approve/reject decisions |

**Hard stop:** Agent never casts an approval vote.

---

## Failure handling

Workflow API timeout after initiate: reconcile open workflows before re-initiate (avoid duplicate approval requests). Vacant approver: escalate to Controller desk, do not pick “anyone in finance.”

---

## Cost monitoring notes

Batch reminders; suppress notification storms. Prefer structured workflow over LLM-written emails except for summary packs.

---

## Example scenario *(illustrative example)*

Non-PO marketing invoice £6,400 coded to CC-220. DOA requires Marketing Director. Agent routes with creative brief attachment from intake, reminds at day 3, escalates to VP per policy at day 5. Director approves. Agent never approves on their behalf when OOO unless a pre-registered delegate exists.

---

## Suggested first pilot scope

Non-PO invoices under a single entity, one DOA table version, L2 routing+reminders only, no emergency bypass feature enabled.
