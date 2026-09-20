# A08 — Supplier Resolution Agent

**Stack ID:** A08  
**Human owner (default):** AP Supplier Query Lead / Vendor Master co-owner  
**Typical autonomy start:** L0 → L1 (human approval configurable)  
**Depends on:** A04 supplier-facing exceptions; vendor contacts; correspondence policy  
**Hands off to:** A04, A02/A03 (on corrected docs), Vendor Master team, A10

---

## Purpose

Resolve supplier-side invoice issues — wrong documents, missing credit notes, clarifications, resubmissions — through controlled correspondence, with **human approval gates configurable by risk and amount**.

---

## Job description

The Supplier Resolution Agent prepares and (when permitted) sends structured queries to suppliers, tracks responses, links revised invoices or credit notes back into intake, and closes supplier-query exceptions. Outbound communication and any master-data impact are subject to configurable human approval. Banking-change requests are never auto-accepted.

---

## Inputs

| Input | Source |
|-------|--------|
| Exceptions requiring supplier action | A04 (`wrong_supplier`, `credit_note_required`, `invoice_quality`, `statement_discrepancy`, etc.) |
| Vendor contact channels | Vendor master / portal |
| Correspondence templates | Config |
| Human approval matrix for outbound messages | Config (**required**) |
| Prior dispute / query history | Case system |

---

## Tools / data required

- Secure email / supplier portal API  
- Template engine with merge fields  
- Approval workflow for outbound sends  
- Attachment redaction (internal comments stripped)  
- Response inbox classifier (link to case)  
- Vendor master read; write only via separate controlled process  

---

## Responsibilities

1. Determine whether supplier contact is appropriate vs internal-only.  
2. Draft precise query with invoice refs, issue, requested action, due date.  
3. Route draft through configured human approval when required.  
4. Send via approved channel; log message-id.  
5. Capture and classify responses; attach to case.  
6. Trigger re-intake of corrected documents via A01.  
7. Escalate non-response per SLA.  
8. Flag any banking or remit-to change language to human Vendor Master — **never auto-apply**.  

---

## Explicit exclusions

- Autonomous acceptance of bank detail changes  
- Legal threat language or settlement negotiation beyond template policy  
- Sharing internal cost rates / margins  
- Payment promises (“we will pay Friday”) without payment team authority  
- Guaranteeing dispute outcomes  

---

## Human owner

**Primary:** AP Supplier Query Lead  
**Vendor master co-owner:** Master Data Steward  
**Accountable executive:** Head of AP  

---

## Approval requirements *(configurable — recommended defaults)*

| Outbound / action | Recommended gate |
|-------------------|------------------|
| Query on invoice < materiality, known contact, no bank topics | Auto-send at L2+ **or** team-lead sample approval |
| Query ≥ materiality | Human approve draft |
| First-time contact email not on vendor master | Human approve |
| Any banking / remit-to / payment method change | Human Vendor Master only; enhanced verification |
| Credit note request ≥ threshold | AP Lead approve |
| Dispute acknowledgement | AP Lead / Legal as policy |

Organisations must document their chosen gates; Evidence Room default is **human approval on for banking-related and high-value correspondence**.

---

## Escalation criteria

- No response after configured touches  
- Supplier contests liability  
- Suspected wrong trading entity  
- Banking change requested  
- Threat of supply stoppage on critical vendor  
- Response contains different invoice already paid  

---

## Output standard

Supplier case file: drafts, approvals, sent copy, responses, outcome code (`corrected_invoice`, `credit_to_follow`, `disputed`, `no_response`, `master_data_referral`), and links to new intake IDs.

---

## Control requirements

- Configurable approval enforced in system, not honour system  
- Allow-listed domains / portal only  
- Dual control for vendor bank changes (outside this agent’s write scope)  
- Correspondence retention  
- No personal mailboxes  

---

## Audit evidence

Full thread, approval artifacts, vendor contact source, and master-data referral tickets.

---

## KPIs

1. **Supplier query cycle time**  
2. **% resolved without second chase**  
3. **Human approval turnaround time**  
4. **Non-response rate**  
5. **Re-intake success rate after query**  
6. **Banking-change referrals (count)** — monitoring only  
7. **Template compliance %**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Draft internally; never send |
| **L1** | Draft + queue for human send approval (default start) |
| **L2** | Auto-send low-risk templates to master contacts within guardrails |
| **L3** | Broader auto-send per matrix; still human for banking/high-value |
| **L4** | Managed supplier-query ops; banking changes remain human-only forever |

---

## Failure handling

Bounce / invalid address: stop and escalate to Master Data. Ambiguous supplier reply: do not auto-close; human classify. Never merge banking details from email body into ERP.

---

## Cost monitoring notes

Prefer portal tickets over LLM-custom emails. Cap generative rewrites; use templates.

---

## Example scenario *(illustrative example)*

Price mismatch £2,200 on a known vendor. Agent drafts a factual query requesting either revised invoice or credit note referencing PO line evidence. AP Lead approves send (config: amount > £1,000). Supplier returns credit note; A01 intakes it; exception closes. Separately, a vendor email “our new bank account is…” is detached into a Vendor Master verification case — A08 does not update the master.

---

## Suggested first pilot scope

Top 30 vendors, template-only queries, **100% human approval on send**, no banking topics in templates, L1 only for two weeks.
