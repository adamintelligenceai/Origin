---
title: Agent Charter
tier: Professional
code: ER-AP-TPL-CHARTER
---

# Agent Charter — example (Goods Receipt Agent)

| Field | Example entry |
|---|---|
| Agent name / ID | Goods Receipt Agent / ER-AP-05 |
| Version / date | 1.0 / 2026-09-20 |
| Autonomy level | 1 — Recommend |
| Human owner | A. Rahman, AP GRNI Lead |
| Sponsor | Head of AP |
| Purpose | Identify missing receipts, propose likely receivers, draft chases |
| In scope | PO invoices parked for missing GR; entities A and B; value < $50k |
| Out of scope / exclusions | Auto-GR; service confirmations without a named owner; entities C; any posting |
| Inputs | Open PO lines, GR, invoice park reason, buyer, receiver, location |
| Tools | ERP read role `AP_AGENT_READ`; draft mailbox (no send) |
| Output standard | Ranked receiver (max 3), draft email, source IDs, confidence |
| Approval | Owner reviews daily queue; no send |
| Escalation | Value > $25k and age > 14 days → Procurement Ops |
| Controls | CTL-05-NO-POST; cadence cap 1/3/7; no C-level |
| Audit evidence | Daily export of recommendations + model version |
| KPIs | Incorrect-receiver < 15% of sample; on-time draft rate; missing GR ageing |
| Failure handling | Disable agent; revert to weekly GRNI spreadsheet |
| Cost monitoring | Inference cost weekly; stop if cost per correct draft > $1.50 |
| Promotion gate | 200 live shadow items; FN review; Controls sign-off |
| Kill switch | Owner or Payments Manager, same day |
| Signatures | Owner / Controls / Tool owner |

# Agent Charter — blank

Copy the table. Leave no cell empty. If unknown, write “unknown — do not deploy”.
