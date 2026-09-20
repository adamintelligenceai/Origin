# Control Framework — AP Agents

**Evidence Room · AP Agent OS Professional**  
**Companion workbook:** `spreadsheets/ER_AP_Controls_Matrix.xlsx`

---

## 1. Control objectives

| ID | Objective |
|----|-----------|
| CO-1 | Only valid, authorised liabilities are recognised |
| CO-2 | Duplicates and anomalies are detected before payment proposal |
| CO-3 | Exceptions are complete, owned, and aged visibly |
| CO-4 | Agent actions are attributable and reversible/disableable |
| CO-5 | Payment authorisation remains exclusively human |
| CO-6 | Master-data changes affecting payees follow dual control |

Agents support these objectives; they do not replace management’s control ownership.

---

## 2. Control types

| Type | Definition | Agent examples |
|------|------------|----------------|
| **Preventive** | Stops bad state before posting | Validation gates; tolerance blocks; Level caps |
| **Detective** | Finds issues after occurrence | Duplicate scan; anomaly scores; statement breaks |
| **Corrective** | Restores desired state | Guided exception playbooks; re-match suggestions |
| **Directive** | Policy articulation | Charter rules; SoD matrices; approval matrices |

---

## 3. Control matrix (core)

| Control ID | Objective | Type | Activity | Frequency | Evidence | Owner |
|------------|-----------|------|----------|-----------|----------|-------|
| CTL-01 | CO-5 | Preventive | Payment auth blocked from agent roles | Continuous | IAM review | IT Sec + Controller |
| CTL-02 | CO-1 | Preventive | Match tolerances enforced before “ready” | Per invoice | Match log | AP Mgr |
| CTL-03 | CO-2 | Detective | Duplicate window scan | Per invoice + daily batch | Hit list | AP Mgr |
| CTL-04 | CO-3 | Detective | Exception ageing > SLA report | Daily | Dashboard | AP Mgr |
| CTL-05 | CO-4 | Detective | Sample agent outputs vs human truth | Weekly | Sample workbook | Control |
| CTL-06 | CO-4 | Preventive | Kill switch tested | Quarterly | Test log | IT + AP |
| CTL-07 | CO-6 | Preventive | Bank detail change dual control | Per change | Ticket + ERP audit | Master data |
| CTL-08 | CO-1 | Directive | Agent charter approved before write access | Per agent | Signed charter | Controller |
| CTL-09 | CO-4 | Detective | Override theme analysis | Monthly | Root-cause pack | AP + Process Exc. |
| CTL-10 | CO-2 | Detective | Vendor statement break review | Monthly | Recon pack | AP |

Extend in the Excel matrix for local SOX / audit mappings — without asserting that this product is a SOX solution.

---

## 4. Mapping controls to agents

| Agent | Primary controls |
|-------|------------------|
| Invoice Intake | CTL-04 (intake completeness), content-as-data handling |
| Validation | CTL-02 precursor (field completeness / vendor status) |
| Matching | CTL-02 |
| Exception Triage | CTL-04 |
| Duplicate / Anomaly | CTL-03 |
| Payment Proposal Review | CTL-01, CTL-03 (review only) |
| Vendor Statement Rec | CTL-10 |
| Orchestrator | CTL-05, CTL-09 |

---

## 5. Sampling guidance

| Level | Suggested detective sampling |
|-------|------------------------------|
| 0–1 | 100% material outputs reviewed by human (assist mode) |
| 2 | Statistical or risk-based sample; 100% above $ threshold |
| 3–4 | Documented sampling plan; continuous monitoring metrics |

Document sample size rationale; avoid fake precision.

---

## 6. Deficiency handling

| Rating | Definition | Response |
|--------|------------|----------|
| Minor | Isolated, no payment impact | Log; fix within 30 days |
| Significant | Pattern or control design gap | Level freeze; remediation plan |
| Material | Actual or near-miss payment / fraud exposure | Kill switch; steering notice; formal RCA |

---

## 7. Related artifacts

- `Governance/00_AGENT_GOVERNANCE_FRAMEWORK.md`
- `Templates/RISK_ASSESSMENT.md`
- `KPI_Measurement/00_KPI_FRAMEWORK.md` (risk metric class)
