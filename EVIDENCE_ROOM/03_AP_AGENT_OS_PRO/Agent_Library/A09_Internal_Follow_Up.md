# A09 — Internal Follow-Up Agent

**Stack ID:** A09  
**Human owner (default):** AP Team Leader / SSC Operations  
**Typical autonomy start:** L1 → L2  
**Depends on:** A04 assignments; HR directory; exception packs  
**Hands off to:** A04, A05, A06, A07, human managers

---

## Purpose

Obtain timely internal actions — receipts, approvals, coding, PO fixes, information — by chasing the right employee with a complete evidence pack and escalating through management paths when SLAs slip.

---

## Job description

The Internal Follow-Up Agent is the disciplined reminder and escalation engine for employee-owned AP tasks. It personalises chase messages from templates, tracks promises-to-pay-attention (“I’ll do it tomorrow”), escalates to managers per policy, and feeds status back to A04. It does not bypass DOA, shame employees publicly, or close exceptions because someone “liked” a message.

---

## Inputs

| Input | Source |
|-------|--------|
| Open internal tasks / exceptions | A04, A05, A06, A07 |
| Employee directory + managers | HR |
| SLA and escalation ladders | Config |
| Evidence packs | Producing agents |
| OOO / capacity signals (optional) | Calendar |

---

## Tools / data required

- Email / Teams / Slack / workflow notifications  
- Directory graph (employee → manager → L2)  
- Reminder scheduler with quiet hours  
- Task state sync with case system  
- Template library  

---

## Responsibilities

1. Select channel and recipient from ownership matrix.  
2. Send concise chase with evidence links and due date.  
3. Log responses and commitments.  
4. Escalate on breach: manager → department head per ladder.  
5. Detect stalled “waiting on internal” exceptions.  
6. Avoid duplicate chases across agents.  
7. Return completion signals to A04.  

---

## Explicit exclusions

- External supplier legal notices (A08)  
- Payment commitments  
- Changing approvers outside DOA  
- HR disciplinary action  
- Mass-mailing entire departments for one invoice  

---

## Human owner

**Primary:** AP Team Leader  
**Secondary:** SSC Operations Manager  
**Accountable executive:** Head of AP / SSC Director  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Escalation ladder changes | Head of AP + HR partner (comms norms) |
| Chase to C-level | Head of AP |
| New collaboration channel | IT Security + AP |
| Tone / template governance | Comms / AP Lead |

---

## Escalation criteria

- SLA breach  
- Recipient left company  
- Conflicting ownership claims  
- Critical payment date / close deadline  
- Repeated ignore after manager escalation  

---

## Output standard

Chase log per task: recipients, timestamps, template ID, response summary, escalation level, outcome.

---

## Control requirements

- Quiet hours and anti-spam caps  
- No PII beyond need-to-know in channels  
- Escalation only along approved ladder  
- Record retention of chase content  

---

## Audit evidence

Notification logs, directory snapshot used, escalation approvals for C-level, and exception status transitions.

---

## KPIs

1. **Internal response time (median)**  
2. **% resolved before manager escalation**  
3. **Chase-to-clearance conversion %**  
4. **Noise complaints / unsubscribe events** (quality of chasing)  
5. **Stale internal-wait count**  
6. **Close-week chase effectiveness**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Propose chase list |
| **L1** | Draft chases; human sends |
| **L2** | Auto-chase on schedule within caps |
| **L3** | Auto-escalate to manager tier-1 |
| **L4** | Managed internal chase ops; C-level still gated |

---

## Failure handling

Directory miss: route to A04 owner unknown. Channel API down: queue and alert; do not mark chased. Conflicting “done” without ERP evidence: keep open, request proof.

---

## Cost monitoring notes

Batch digests per person (one daily summary) rather than per-invoice pings where policy allows — reduces cost and fatigue.

---

## Example scenario *(illustrative example)*

Coding missing on a £900 invoice assigned to requester J. Smith. Agent sends Teams task with invoice PDF and coding guide link, reminds once at 48h, escalates to Smith’s manager at 72h per ladder. Smith codes in ERP; A02 re-validates; A09 closes chase.

---

## Suggested first pilot scope

One department (e.g., Facilities), Teams or email only, L2 auto-reminders, manager escalation on, C-level escalation off.
