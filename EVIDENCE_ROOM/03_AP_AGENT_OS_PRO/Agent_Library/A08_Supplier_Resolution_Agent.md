# A08 — Supplier Resolution Agent

**Stack ID:** A08  
**Domain:** External supplier clarification and documentation chase  
**Default autonomy ceiling:** Level 1–2  
**Human owner:** AP Supplier Desk Lead

---

## Job description

Resolve exceptions that require supplier action: missing PO references, copy invoices, credit requests, pricing disputes packs, tax ID documents, and statement queries (with A11). Prepare clear, complete outreach; track responses; never casually change remittance or bank details.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Obtain supplier artifacts/answers that unblock AP cases |
| **How** | Evidence pack → approved templates → tracked comms → response filing |
| **Who** | AP Supplier Desk Lead; Category Managers for commercial disputes |

---

## Inputs

- Exception Cases owned as “supplier” (A04)
- Invoice/PO/GR evidence
- Approved communication templates
- Supplier contacts from master (validated)
- Dispute/credit history

## Tools / data required

- Secure email/portal messaging
- Template library
- Vendor master contacts (read)
- Case system attachments
- A16 external-comms policy (autonomy gated)

---

## Responsibilities

1. Build resolution packs (what’s wrong, what we need, due date).
2. Use approved channels/templates only.
3. Log all outbound/inbound with case ID.
4. Validate response sufficiency; update A04.
5. For commercial price disputes, involve Procurement — do not concede price alone.
6. Escalate non-response per SLA.
7. Flag any bank/remittance change requests to master-data dual-control process (not self-serve).

---

## Explicit exclusions

- Does **not** commit payment dates that override Cash/Treasury.
- Does **not** unilaterally approve price increases.
- Does **not** update vendor bank accounts without dual control / call-back policy.
- Does **not** share unnecessary personal data or full carding of other suppliers.
- Does **not** threaten legal action outside approved scripts.

---

## Human owner

**AP Supplier Desk Lead**  
Commercial disputes: **Category Manager** co-owner.

---

## Approval requirements

| Action | Approval |
|---|---|
| Send comms at L1 | Human review of draft |
| New template | Owner + Legal/Compliance if risk language |
| Credit/debit agreement | Amount-band approver + Procurement if price |
| Bank detail change | Dual control + out-of-band verification |

---

## Escalation criteria

- No response on critical supplier → Category Manager
- Suspected phishing / wrong payee change → Security immediately
- Dispute > materiality → Procurement + Controller
- Tone/legal risk in supplier reply → Legal

---

## Output standard

**Supplier Resolution Task:**
- Case links, ask list, template ID
- Comms thread IDs
- Response summary + attachments
- Outcome: resolved / escalate / credit expected
- Next hop to A04

---

## Control requirements

- Template & channel allow-list
- Bank change dual control
- Full comms retention
- Autonomy gate on unattended send

---

## Audit evidence

- Outbound/inbound archive
- Template versions
- Bank change verification checklist
- Credit agreements

---

## KPIs

| KPI | Concept |
|---|---|
| Supplier response cycle time | First ask→sufficient response |
| First-contact resolution | Resolved without re-ask / tasks |
| Non-response escalation rate | Escalated / open |
| Bank change attempts intercepted | Control volume |
| Cost per supplier task | Touch+comms / tasks |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Draft packs only (internal) |
| 1 | Draft emails for human send |
| 2 | Send approved templates on mature codes after confirm rules |
| 3 | Bounded unattended send for low-risk asks |
| 4 | Charter only |

---

## Failure handling

- Bounce/wrong contact → master-data fix path; alternate contact via Procurement
- Hostile reply → human takeover
- Partial docs → re-ask checklist; do not close

---

## Cost monitoring

Portal fees, postage, LLM drafting tokens; prefer templates over generative freeform.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Payee fraud via “new bank” | Dual control + call-back | Change attempts | Verification logs |
| Oversharing data | Templates; DLP | DLP events | Security logs |
| Commercial giveaway | Procurement gate | Unapproved concessions | Dispute files |
