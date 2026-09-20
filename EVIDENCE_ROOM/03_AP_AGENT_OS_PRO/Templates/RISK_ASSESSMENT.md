# Evidence Room — AP Agent OS Professional

## Template — Risk assessment (agent / slice)

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission  
**Use with:** `../Controls/02_RISK_REGISTER.md`, `../Controls/01_CONTROL_MATRIX.md`, `../Governance/00_GOVERNANCE_FRAMEWORK.md`  
**Examples:** ACME rows are **ILLUSTRATIVE**.  
**Version:** 1.0  

This OS does **not** certify legal, regulatory, accounting, or security compliance. Residual risk stays with the buyer.

---

## 1. What to do

Assess risks for **one agent × one slice** before Test, and again before Pilot. Link each accepted risk to a control ID and an evidence path.

**How.** Score likelihood and impact with **buyer** scales (do not import a consultancy 5×5 as if it were fact). Record inherent → control → residual.

**Who.** Control owner Accountable for the register quality; AP Manager Responsible for operational facts; Privacy / Legal / Treasury consulted where their class applies.

**Wrong.** “AI risk” as one row. Residual “low” because the vendor said so. Fraud-detection claimed as a mitigator.

**Control.** Every High/Critical residual needs Head of AP (and Controller if money/books). Unowned risk cannot go to Pilot.

**Measure.** Risks without control ID; overdue reviews; residuals accepted with no expiry.

**Evidence.** `[BUYER]/Evidence/Risk/[RA ID]/` and the live register.

---

## 2. Header

| Field | Value |
|---|---|
| RA ID | `RA-` |
| Agent / charter version | |
| Slice (entity, channel, type, cap) | |
| Autonomy in view | L0 / L1 / L2 / L3 / L4 |
| Assessor | |
| Control owner | |
| Date / next review | |
| Related register IDs | |

---

## 3. Buyer scales (write them down)

| Score | Likelihood meaning (buyer) | Impact meaning (buyer) |
|---|---|---|
| 1 | `[BUYER]` | `[BUYER]` |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

Critical override: money-direction, bank write, personal-data leak — may force Critical regardless of the product of scores.

---

## 4. Risk catalogue (complete / add)

| Risk ID | Description | Class | L | I | Inherent | Control IDs | Residual | Owner | Expiry / review | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| RK-PAY-01 | Wrong or duplicate payment | Money | | | | | | | | |
| RK-PAY-02 | Agent-influenced payment release | Money / SoD | | | | | | | | |
| RK-BNK-01 | Bank details changed from document text | Money / fraud-path (control — **not** a detection claim) | | | | | | | | |
| RK-GR-01 | Invented goods receipt | Books | | | | | | | | |
| RK-TAX-01 | Tax code invented or altered filing | Tax | | | | | | | | |
| RK-MDM-01 | Wrong vendor / entity posted | Books | | | | | | | | |
| RK-AUT-01 | Silent autonomy upgrade | Governance | | | | | | | | |
| RK-INJ-01 | Prompt injection → action | Security | | | | | | | | |
| RK-HAL-01 | Hallucinated ID/amount/date | Quality | | | | | | | | |
| RK-PRV-01 | PII/bank data in unsanctioned model | Privacy | | | | | | | | |
| RK-CNF-01 | Sealed/confidential vendor in shared agent | Legal | | | | | | | | |
| RK-SOD-01 | Service identity combines entry + release | SoD | | | | | | | | |
| RK-CHG-01 | Unrecorded prompt/model change | Change | | | | | | | | |
| RK-AVL-01 | Agent down; work only in agent UI | BCP | | | | | | | | |
| RK-CST-01 | Cost envelope blow-up / retry storm | Cost | | | | | | | | |
| RK-OPR-01 | Override becomes the process | Operating | | | | | | | | |
| RK-SCO-01 | Scope creep mid-pilot | Change | | | | | | | | |
| RK-CLM-01 | Unvalidated savings on Steer pack | Reporting | | | | | | | | |
| RK-[BUYER] | | | | | | | | | | |

**ACME ILLUSTRATIVE:** RK-BNK-01 inherent High; control = EX-PAY-001 forced + no bank write tool + U-IN-04 UAT; residual Medium pending technical enforcement — if platform cannot block write, autonomy stays L1.

---

## 5. Four human classes (confirm)

| Class | In this slice, can the agent touch it? | Forced human_required? | Evidence |
|---|---|---|---|
| Payment release | Y/N | Must be Y if Y | |
| Vendor bank-change | Y/N | Must be Y if Y | |
| Policy exception | Y/N | Must be Y if Y | |
| Legal dispute | Y/N | Must be Y if Y | |

---

## 6. What can go wrong at assessment level

| Failure | Control |
|---|---|
| Generic AI heatmap | Catalogue above is AP-specific; keep it |
| Residual accepted forever | Expiry column |
| Risk closed as “user training” | Incident standard |

---

## 7. Decision

| Question | Y/N |
|---|---|
| Any Critical residual? | |
| If yes, accepted by Controller / Head of AP with expiry? | |
| Technical enforcement gaps logged? | |
| Fit to go to Historical Test? | |
| Fit to go to Pilot? (re-assess) | |

Control owner: ________ Date: ________  
Head of AP: ________ Date: ________  

Proof before permission.

---

*End of RISK_ASSESSMENT.md*
