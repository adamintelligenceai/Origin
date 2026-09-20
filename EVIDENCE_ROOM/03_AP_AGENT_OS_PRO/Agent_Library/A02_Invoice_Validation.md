# A02 — Invoice Validation Agent

**Stack ID:** A02  
**Human owner (default):** AP Processor / Validation Lead  
**Typical autonomy start:** L0 → L1  
**Depends on:** A01 intake records, vendor master, tax config, chart of accounts / dimensions  
**Hands off to:** A03 Matching, A04 Exception Triage, A07 Approval (non-PO path), A10 Duplicate & Anomaly

---

## Purpose

Ensure every invoice candidate is complete, internally consistent, correctly identified to supplier and legal entity, and ready for matching or non-PO approval — before match logic or payment preparation consumes bad data.

---

## Job description

The Invoice Validation Agent checks structural and business completeness of the invoice: mandatory fields, arithmetic consistency, tax reasonableness, supplier identity confidence, legal entity, currency, and presence of PO reference when policy requires one. It produces a validation scorecard, parks incomplete items with taxonomy codes, and releases only validation-pass invoices to Matching or Approval.

It does not perform three-way match judgements beyond “PO present/absent,” does not chase suppliers (A08), and does not authorise payment.

---

## Inputs

| Input | Source |
|-------|--------|
| Intake record + extracted fields + original file | A01 |
| Vendor master (tax IDs, addresses, hold flags, payment block) | ERP |
| Legal entity register and tax registrations | Finance master |
| Validation policy (mandatory fields, PO-required rules, tolerance for arithmetic) | Config |
| Historical supplier invoice patterns | Analytics store (optional) |
| Prior exception codes on same supplier | A04 ledger |

---

## Tools / data required

- Validation rule engine (deterministic first; ML assist optional)  
- Tax code / VAT rate reference tables by entity/country  
- Vendor and entity master read APIs  
- Work-queue status updates  
- Attachment viewer for human review packs  
- Audit log writer  

---

## Responsibilities

1. Verify mandatory header/line fields per policy.  
2. Check arithmetic: lines + tax ≈ gross within tolerance.  
3. Confirm supplier match confidence; escalate weak identity.  
4. Confirm legal entity; flag incorrect entity candidates.  
5. Apply PO-required policy (missing PO → exception, not silent non-PO).  
6. Detect obvious tax anomalies (wrong rate band, missing tax ID where required).  
7. Check vendor payment blocks / hold flags — surface, do not override.  
8. Emit structured validation result and route pass/fail.  
9. Package human review packs for borderline cases.  

---

## Explicit exclusions

- Changing vendor bank details  
- Overriding payment holds without human policy  
- Final match accept/reject on price/qty (A03)  
- Declaring fraud or guaranteeing anomaly-free status  
- Creating POs or receipts  
- Payment proposal inclusion decisions beyond “validation failed → exclude”  

---

## Human owner

**Primary:** Senior AP Processor / Validation Lead  
**Secondary:** Tax Accountant (for tax-rule changes)  
**Accountable executive:** Head of AP  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Change mandatory-field policy | Head of AP + Controller |
| Tax-rate reference updates | Tax lead |
| Auto-pass below amount threshold at L2+ | Written policy |
| Treat missing PO as allowed non-PO for a vendor | Procurement + AP policy exception |

---

## Escalation criteria

- Supplier identity confidence below threshold and amount ≥ materiality  
- Tax calculation difference above tax materiality  
- Vendor on payment block / sanction screening flag (if integrated)  
- Legal entity mismatch suspected  
- Credit note without referenced invoice  
- Validation rule engine version conflict / config error  

---

## Output standard

Validation scorecard per invoice:

- Pass / Fail / Pass-with-warnings  
- Field-level results and confidence  
- Exception taxonomy codes  
- Recommended next agent  
- Evidence links (pages, vendor match rationale)  
- Rule-set version ID  

---

## Control requirements

- Deterministic rules version-controlled  
- Dual control to edit production validation rules  
- No auto-clear of payment blocks  
- Materiality thresholds documented  
- Full before/after on any human override  

---

## Audit evidence

Validation scorecard JSON, rule version, master-data snapshot IDs used, human overrides with reason codes, and samples retained for QA re-performance.

---

## KPIs

1. **First-pass validation rate %**  
2. **False fail rate %** (human overturns to Pass)  
3. **False pass rate %** (later found incomplete — critical control KPI)  
4. **Median validation cycle time**  
5. **Tax exception rate**  
6. **Supplier identity mismatch rate**  
7. **Cost per validated invoice**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Scorecard in shadow; no status change |
| **L1** | Recommend Pass/Fail; human confirms Fail→route |
| **L2** | Auto-fail clear incompletes; auto-pass high-confidence within amount guardrail |
| **L3** | Auto-route all within guardrails; humans handle escalations only |
| **L4** | Managed auto-validation for approved vendors/entities; continuous sampling QA mandatory |

---

## Failure handling

If master data unavailable: fail closed (do not Pass). If tax tables stale past refresh SLA: degrade to L1 and alert Tax. If model assist disagrees with deterministic rules: deterministic wins; log conflict.

---

## Cost monitoring notes

Prefer rules over LLM for arithmetic and mandatory fields. Use model assist only for messy supplier-name matching with capped token budget per invoice.

---

## Example scenario *(illustrative example)*

Invoice passes intake with supplier match 0.94, entity OK, PO present, but line sum + VAT is 2.5% above gross. Agent fails with `invoice_quality` + arithmetic detail, routes to A04, and prepares a review pack showing line table vs header gross. Human confirms supplier rounding practice; policy later adds vendor-specific tolerance — not silent auto-pass on day one.

---

## Suggested first pilot scope

One entity, PO invoices only, deterministic rules only (no LLM), L1, materiality €/£/$1,000 for auto suggestions, weekly false-pass sampling of 25 invoices.
