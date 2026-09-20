---
title: Top 10 AP Agent Blueprints
subtitle: Starter-tier workforce. Full sixteen live in Professional.
tier: Starter
code: ER-AP-ST-10
---

# How to read a blueprint

Each blueprint states purpose, first autonomy, exclusions, and the Monday action. Professional adds full I/O, tools, KPIs and failure handling.

# 1. Invoice Intake Agent

**Purpose:** Decide whether an incoming invoice is complete and fit for downstream validation.  
**Level:** 0–1  
**Exclusions:** Cannot create vendors, cannot file tax invoices as legally received unless policy says a human does.  
**Monday:** Sample 50 inbound emails/PDFs. List missing fields.

# 2. Invoice Validation Agent

**Purpose:** Check supplier, number, dates, PO, entity, currency, tax, lines, required fields, obvious duplicates.  
**Level:** 1  
**Exclusions:** Cannot change vendor master.  
**Monday:** Write the required-field list per invoice type.

# 3. Matching Agent

**Purpose:** Explain match outcomes and variances; do not replace the ERP match engine.  
**Level:** 1  
**Exclusions:** Cannot change tolerances.  
**Monday:** Export last month's price/qty/receipt fails.

# 4. Exception Triage Agent

**Purpose:** Classify every exception into the taxonomy and recommend the next owner and action.  
**Level:** 1–2 (prepare tickets)  
**Exclusions:** Cannot close disputes.  
**Monday:** Code 100 open items with the taxonomy.

# 5. Goods Receipt Agent

**Purpose:** Find missing GRs, name the likely receiver, draft the chase.  
**Level:** 1–2  
**Exclusions:** Cannot auto-receive goods.  
**Monday:** Age open PO lines waiting GR.

# 6. Approval Agent

**Purpose:** Find stalled approvals, absent approvers, DOA breaks, items near payment terms.  
**Level:** 1  
**Exclusions:** Cannot approve.  
**Monday:** List invoices >5 days in approval.

# 7. Supplier Resolution Agent

**Purpose:** Draft supplier communications. Human sends.  
**Level:** 2  
**Exclusions:** Unreviewed outbound. No legal admission of liability.  
**Monday:** Collect the five most common supplier email types.

# 8. Internal Follow-Up Agent

**Purpose:** Draft internal chases for GR, coding, approvers, requesters.  
**Level:** 2  
**Exclusions:** Cannot escalate to the CFO unprompted.  
**Monday:** Define chase cadence and tone.

# 9. Duplicate & Anomaly Agent

**Purpose:** Surface exact and near duplicates and unusual patterns for human review.  
**Level:** 1  
**Exclusions:** Not a fraud-detection guarantee. Cannot block payment unless a pre-approved rule fires in the ERP.  
**Monday:** Define near-duplicate features (amount, date window, number fuzz, vendor).

# 10. AP Reporting Agent

**Purpose:** Assemble daily/weekly packs from agreed queries.  
**Level:** 2  
**Exclusions:** Cannot invent numbers. Every figure needs a query ID.  
**Monday:** Lock the weekly pack contents.

# First-agent recommendation

If you can only staff one: **Exception Triage** or **Goods Receipt**. Both are frequent, visible, and reversible. Leave payment proposal review for Professional, Level 1, after the basics work.
