# A04 — Exception Triage Agent

**Stack ID:** A04  
**Human owner (default):** AP Exception Desk Lead / Team Leader  
**Typical autonomy start:** L1  
**Depends on:** Exception events from A01–A03, A10–A12; taxonomy; ownership matrix  
**Hands off to:** A05–A11, A09, human queues; returns cleared items to A02/A03/A07

---

## Purpose

Turn unstructured AP friction into a governed exception ledger: correctly coded, owned, aged, prioritised, and routed — so the organisation works the right problems in the right order with evidence.

---

## Job description

The Exception Triage Agent is the control tower for non-straight-through work. It classifies exceptions using the standard taxonomy, assigns responsible parties, starts SLA clocks, prioritises by value/age/risk, routes to specialised agents or human queues, and tracks resolution states through to clearance or escalation.

It does not itself amend POs, pay invoices, or close disputes on behalf of Legal.

---

## Inputs

| Input | Source |
|-------|--------|
| Exception signals + context packs | A01, A02, A03, A07, A10, A11, A12 |
| Exception taxonomy | `Controls/01_EXCEPTION_TAXONOMY.md` |
| Ownership / RACI matrix | Config |
| SLA policy by taxonomy code and amount band | Config |
| Supplier / requester directories | ERP / HR |
| Open exception ledger | Case system |

---

## Tools / data required

- Case / ticket system or ERP workflow  
- Taxonomy classifier (rules + optional model assist)  
- Priority scoring config  
- Notification / assignment integrations  
- Aging and breach dashboards (feeds A14)  
- Knowledge base of prior resolutions (read)  

---

## Responsibilities

1. Accept exception events with required context.  
2. Assign primary taxonomy code (+ secondary if needed).  
3. Determine responsible party and backup.  
4. Set priority and SLA due-at.  
5. Route to specialised agent or human queue.  
6. Prevent duplicate tickets for the same invoice+code.  
7. Track status: `New` · `Assigned` · `In progress` · `Waiting external` · `Waiting internal` · `Resolved` · `Escalated` · `Cancelled`.  
8. Re-open rules when invoices recirculate.  
9. Feed root-cause aggregation (A15).  

---

## Explicit exclusions

- Changing taxonomy definitions without governance  
- Auto-resolving high-risk codes (banking-change, disputed, DOA) without human  
- Payment authorisation  
- Writing off balances  
- Closing legal disputes  

---

## Human owner

**Primary:** AP Exception Desk Lead  
**Secondary:** Process Owner — Invoice to Pay  
**Accountable executive:** Head of AP / SSC Director  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Taxonomy add/change | Controllership + Head of AP |
| SLA changes | Head of AP |
| Bulk close / cancel exceptions | Dual control |
| Reassign ownership model | Process Owner |

---

## Escalation criteria

- SLA breach or forecast breach within 24h on material items  
- Amount ≥ executive materiality  
- Same invoice cycling > N times  
- Cross-entity or cross-system conflict  
- Suspected control failure (duplicate pay risk, wrong entity)  
- No owner available in directory  

---

## Output standard

Exception record with: taxonomy code, priority, owner, SLA, linked invoice/PO/GR IDs, evidence pack URI, route target, status history, and resolution code on close.

---

## Control requirements

- No silent drops  
- Dual control for bulk closure  
- Segregation between triage admin and payment release  
- Mandatory reason on cancel  
- Weekly aged unresolved review with Head of AP  

---

## Audit evidence

Full status history, assignment changes, SLA clocks, resolution evidence links, and sampling of classification accuracy.

---

## KPIs

1. **Classification accuracy %** (QA sample)  
2. **Median time to assign**  
3. **% resolved within SLA**  
4. **Aged >30/60/90 day counts**  
5. **Reopen rate %**  
6. **Touches per exception**  
7. **Exception backlog value**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Propose codes in shadow |
| **L1** | Create tickets with recommended owner; human confirms high-risk codes |
| **L2** | Auto-assign low/medium risk codes per matrix; draft chase tasks for A08/A09 |
| **L3** | Auto-route most codes; auto-escalate on SLA; humans for high-risk only |
| **L4** | Managed triage operations with continuous QA; policy changes still human |

---

## Failure handling

Unknown taxonomy shape → code `system_interface_error` + human. Classifier confidence low → present top-3 codes, do not auto-assign. Downstream agent failure → keep ticket open, flag `Waiting` with reason, do not mark Resolved.

---

## Cost monitoring notes

Cap re-classification model calls; rules-first. Alert when backlog growth implies need for capacity, not more model spend.

---

## Example scenario *(illustrative example)*

A03 emits `missing_receipt` on a £18,400 goods invoice. A04 codes it, assigns GR clerk from PO receiver field, sets 3-day SLA, priority High (value), routes chase pack to A05/A09, and starts aging. On day 2 GR posts; A05 confirms; A04 resolves with evidence and returns invoice to A03 for re-match.

---

## Suggested first pilot scope

Top 8 taxonomy codes only, one shared-services queue, L1, daily stand-up on aged >7 days, no bulk auto-close.
