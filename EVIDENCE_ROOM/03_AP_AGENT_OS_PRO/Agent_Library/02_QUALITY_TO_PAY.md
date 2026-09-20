---
title: Agents 06–12 — PO Quality through Payment Proposal Review
tier: Professional
code: ER-AP-AG-02
---

# Agent 06 — PO Quality Agent

**Purpose.** Identify poor PO creation: wrong price, insufficient quantity, expired PO, incorrect coding, incomplete PO, incorrect vendor, inappropriate blanket use.

**Inputs.** PO headers/lines, invoice variance history, contract catalogue if any, buyer ID, blanket PO usage, expiry, remaining value.

**Responsibilities.** Pattern reports by buyer and category; recommended training or form-change; flag POs that will predictably fail match.

**Exclusions.** Cannot create, change or close POs. Cannot block buying without a human policy.

**Owner.** Procurement Operations (primary), AP (customer).  
**Autonomy.** Level 1.  
**KPIs.** Repeat price-mismatch rate by buyer; % POs failing completeness checklist; accepted recommendations.

# Agent 07 — Approval Agent

**Purpose.** Monitor approvals: stalled items, absent approvers, delegation issues, hierarchy problems, approaching payment deadlines.

**Inputs.** Workflow status, approver calendar/OOO if available, DOA table, invoice due date, proxy/delegate table, reminder history.

**Responsibilities.** Stall detection; suggest delegate per policy; warn on DOA gaps; never approve.

**Exclusions.** Cannot approve, skip, or forge a delegate. Cannot reveal salary bands in DOA if confidential — show “insufficient authority” only.

**Owner.** AP Workflow Lead. Controls is a consulting owner.  
**Autonomy.** Level 1–2 (draft reminders).  
**KPIs.** Ageing in approval; % items unblocked after reminder; incorrect-delegate suggestions; late-payment contribution from approval delay.

# Agent 08 — Supplier Resolution Agent

**Purpose.** Draft supplier communication: missing PO, duplicate, incorrect invoice, missing information, credit note required, statement differences.

**Inputs.** Exception object, supplier contact on file, prior tickets, language preference, tone guide, what AP may legally say.

**Responsibilities.** Draft only. Include invoice IDs, dates, amounts, requested action, and a human signatory block.

**Exclusions.** Cannot send unless Level 3 mail-merge is approved. Cannot admit breach, promise payment dates the ERP cannot meet, or discuss other suppliers.

**Owner.** Supplier Query Lead.  
**Human send** is the default.  
**KPIs.** Edit distance before send; supplier reply-without-clarification rate; on-time follow-up; tone incidents (must be 0).

# Agent 09 — Internal Follow-Up Agent

**Purpose.** Draft and manage internal follow-ups: missing GR, incorrect PO, approvals, coding, requester clarification, business-owner action.

**Inputs.** Exception object, employee directory, manager chain, prior chases, SLA table.

**Responsibilities.** Cadence engine (day 0 / 3 / 7 / escalate-to-role); cluster messages; write in the house tone.

**Exclusions.** Cannot escalate to C-level unprompted. Cannot name-and-shame on group lists. Cannot access HR performance files.

**Owner.** AP Operations Manager.  
**KPIs.** On-time internal follow-up; resolution after first chase; escalation rate; employee opt-out/complaints.

# Agent 10 — Duplicate & Anomaly Agent

**Purpose.** Identify exact duplicates, near duplicates, repeated amounts, suspicious invoice-number variation, supplier anomalies, unusual payment characteristics.

**Inputs.** Open and paid invoices (windowed), vendor IDs, bank change flags *if available*, amount, currency, date, tax, PO.

**Responsibilities.** Score candidates; explain features; never claim fraud.

**Exclusions.** **Not a fraud-detection guarantee.** Cannot block payment unless a pre-registered deterministic rule in the payment system fires. Cannot accuse a supplier.

**Owner.** AP Controls Lead.  
**Autonomy.** Level 1.  
**KPIs.** Precision of duplicate queue (reviewer confirm rate); recall on a seeded gold set; false-positive burden; *where measurable* duplicate payments avoided after human action — labelled as such.

# Agent 11 — Vendor Statement Reconciliation Agent

**Purpose.** Reconcile supplier statements to AP and identify missing items and timing differences.

**Inputs.** Statement lines, AP open and paid items, remit-to, currency, period.

**Responsibilities.** Match, propose timing vs true miss, list invoices on statement not in AP and vice versa.

**Exclusions.** Cannot book balances or issue debit notes. Credits require human policy.

**Owner.** AP Statements Lead.  
**KPIs.** Match rate; residual ageing; time per statement; incorrect “missing” flags.

# Agent 12 — Payment Proposal Review Agent

**Purpose.** Pre-payment analytical review: duplicates, unusual changes, high-value items, missing approvals, hold status, unexpected bank/master-data changes where data exists, other exception indicators.

**Inputs.** Payment proposal, holds, approval flags, vendor change log, prior payment pattern, high-value threshold.

**Responsibilities.** Produce a review pack. Rank items for the human releaser.

**Exclusions.** **Cannot authorise or release payment.** Cannot add vendors to a proposal. Cannot change bank files.

**Owner.** Payments Manager. Second reviewer: Controls or Treasury as per SoD.  
**Autonomy.** Level 1 only until a written exception. Level 2 = prepare annotated proposal. Never Level 4.

**KPIs.** Reviewer-found issues missed by agent (false negative — critical); noise rate; time saved in review; control breaches after release (must be investigated, not used as a vanity “caught by AI” metric).
