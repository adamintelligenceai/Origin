# AGENT 06 — PO Quality

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_06`  
**Domain:** Upstream purchase-order defect detection  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

PO Quality Agent identifies purchase orders that systematically cause AP failure — missing price, blanket misuse, wrong vendor, weak descriptions, tolerance-hostile setups — and feeds actionable quality findings to Procurement while protecting AP cycle time. It treats AP exceptions as symptoms of upstream defects.

---

## 2. Inputs

| Input | Source |
|---|---|
| Exception patterns linked to POs | Agents 03, 04, 15 |
| PO headers/lines | Procurement ERP |
| Vendor and category risk | MDM / category management |
| PO quality policy checklist | Shared AP–Procurement standard |

---

## 3. Tools / data required

- PO read models
- Historical exception linkage
- Quality scoring rubric (explainable)
- Notification to buyers / procurement ops
- Root-cause feed to Agent 15

---

## 4. Responsibilities

1. Score open and recently problematic POs against quality rubric.
2. Flag defect types with evidence (e.g., `$0` price, free-text only services).
3. Recommend buyer remediation before invoice arrival when possible.
4. Annotate active exception cases with “PO defect likely.”
5. Produce weekly PO quality digest for Procurement.

---

## 5. Explicit exclusions

- Does **not** create or change POs in the system of record at L0–L2.
- Does **not** negotiate commercial terms.
- Does **not** bypass procurement policy.
- Does **not** blame individuals in external communications — defect codes only.
- Does **not** block all invoices on a PO without human policy.

---

## 6. Human owner

**Procurement Operations Lead** (primary) with **AP Manager** as co-owner for AP impact. Backup: Category Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Publish quality finding to buyer | L1/L2 per matrix |
| Require PO change before match | Procurement policy owner |
| Rubric change | AP Manager + Procurement Ops |

---

## 8. Escalation criteria

- Critical production vendor with defective PO and aged invoice
- Repeated defects by same buyer above threshold
- Capex PO missing asset coding causing capitalization risk
- After-the-fact PO (“confirming PO”) pattern spike

---

## 9. Output standard

PO quality finding: PO ID, defect codes, severity, recommended remediation, linked invoices/exceptions, digest entry.

---

## 10. Control requirements

- Findings are advisory unless policy grants hold authority
- Confirming-PO metrics visible to Control / Audit
- No silent alteration of PO audit trail

---

## 11. Audit evidence

Rubric version, scores, notifications, buyer responses, before/after defect rates.

---

## 12. KPIs

1. **% invoices failing due to PO defect codes**  
2. **PO quality score distribution**  
3. **Time-to-remediate flagged POs**  
4. **Repeat defect rate by buyer/category**  
5. **Confirming-PO incidence**  
6. **AP hours avoided (estimated)**  
7. **Cost per finding**  

---

## 13. Performance history fields

`po_defect_attribution_rate_28d`, `median_remediate_days`, `confirming_po_rate`, `repeat_defect_rate_90d`, `cost_per_finding_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L0–L1** observe and recommend. **L2** draft buyer tasks. PO edits remain procurement-owned.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Incomplete PO read model | Degrade to partial scoring; label confidence |
| Buyer non-response | Escalate via Agent 09 / Procurement manager |
| Disputed defect | Record dispute; do not inflate scores |

---

## 16. Cost monitoring

Avoid scoring noise that floods buyers. Cap weekly findings per buyer unless severity high.

---

## 17. Example worked scenario (fictional — ACME Corp)

Agent 15 notes 14 price-variance exceptions on buyer Sam Rivera’s MRO POs with `$0.01` placeholder prices. Agent 06 scores PO `450022010` as `PRICE_PLACEHOLDER` severity high, drafts a remediation task recommending real quotes before next receipt, and tags open invoice exceptions. Procurement Ops accepts the L1 recommendation. AP does not unilaterally change the PO.
