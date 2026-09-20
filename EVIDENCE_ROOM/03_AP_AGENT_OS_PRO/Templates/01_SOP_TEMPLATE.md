# SOP Template — AP Agent OS Pro

**Evidence Room** · Pro · Templates  
**Use:** Document human + agent steps for one process slice  
**Includes:** Worked example + blank form

---

## Part A — Worked example (Invoice Validation — PO domestic)

| Field | Example entry |
|---|---|
| SOP ID | SOP-AP-VAL-001 |
| Title | Validate domestic PO invoices before match |
| Owner | AP Team Lead — [Name] |
| Effective date | 2026-04-01 |
| Review date | 2026-07-01 |
| Systems | ERP AP module; AP automation; Evidence Room folder |
| Related agents | A02 Invoice Validation Agent |
| Stage ceiling | Recommend |
| Hard gates | No payment release; no vendor bank change |

### 1. Purpose

Ensure inbound domestic PO invoices meet structural and master-data checks before matching, with agent assistance at Recommend stage and human confirmation.

### 2. Scope

**In:** Domestic PO invoices for company codes ____ under $____.  
**Out:** Non-PO, utilities, intercompany, import/customs- Brokers.

### 3. Definitions

| Term | Meaning here |
|---|---|
| Structural check | Required fields present and typed correctly |
| Master-data check | Vendor, PO, company code consistency |
| Exception | Invoice failing a check with taxonomy code |

### 4. Roles

| Role | Responsibility |
|---|---|
| A02 Agent | Flag failed checks; propose hold/reason codes |
| Processor | Confirm/reject; enrich missing data |
| AP Lead | Sample QA; demotion triggers |
| Kill-switch owner | Disable agent path |

### 5. Procedure

| Step | Actor | Action | Evidence |
|---|---|---|---|
| 1 | System | Invoice case created | Case ID |
| 2 | A02 | Run validation checklist v[x] | Agent output log |
| 3 | A02 | If fail → propose EX code + hold | Recommendation record |
| 4 | Processor | Confirm or reject within SLA | Decision + timestamp |
| 5 | Processor | If reject, document reason | Reason code |
| 6 | AP Lead | Weekly sample ≥ n cases | Sample sheet |

### 6. Exception handling

| Code | Meaning | Default owner |
|---|---|---|
| EX-VAL-01 | Missing PO reference | Processor |
| EX-VAL-02 | Vendor mismatch | Vendor master steward |
| EX-VAL-03 | Duplicate invoice # signal | Processor + A10 consult |

### 7. Controls

- SoD: validator confirm ≠ payment release  
- Agent cannot post force-pass without human  
- Kill-switch tested quarterly  

### 8. KPIs

| KPI | Definition |
|---|---|
| Validation first-pass % | Passes structural+master checks without EX |
| Agent agree rate | Human confirms agent recommendation |
| Sample QA pass | Lead review pass rate |

### 9. References

Charter A02 · RACI · Risk assessment · Disclaimer

### 10. Change history

| Ver | Date | Change | Author |
|---|---|---|---|
| 0.9 | | Example drafted | Evidence Room |
| 1.0 | | | |

---

## Part B — Blank SOP template

| Field | Entry |
|---|---|
| SOP ID | |
| Title | |
| Owner | |
| Effective / Review dates | |
| Systems | |
| Related agents | |
| Stage ceiling | |
| Hard gates | |

### 1. Purpose

### 2. Scope (In / Out)

### 3. Definitions

| Term | Meaning |
|---|---|

### 4. Roles

| Role | Responsibility |
|---|---|

### 5. Procedure

| Step | Actor | Action | Evidence |
|---|---|---|---|

### 6. Exception handling

| Code | Meaning | Owner |
|---|---|---|

### 7. Controls

### 8. KPIs

### 9. References

### 10. Change history

| Ver | Date | Change | Author |
|---|---|---|---|

---

**Disclaimer:** SOP templates are operational aids, not legal/audit advice. No guaranteed savings, fraud detection, or ROI. Ardent benchmarks (e.g., 2025 cost **$9.84**, exception **18.4%**, STP **35.4%**) are industry context only.

*Evidence Room — Agents that earn responsibility.*
