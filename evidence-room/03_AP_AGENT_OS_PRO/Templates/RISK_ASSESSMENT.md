# Risk Assessment — AP Agent

**Assessment ID:** RISK-AGT-___  
**Agent / programme:** ________  
**Date:** ________  
**Author:** ________  
**Reviewer:** ________

---

## 1. Context

Scope, level sought, data classes processed (invoices, vendor masters, bank details — note if **out of scope**).

## 2. Risk register

| ID | Risk | Cause | Impact | L (1–5) | I (1–5) | Score | Controls | Residual | Owner |
|----|------|-------|--------|---------|---------|-------|----------|----------|-------|
| R1 | Incorrect match posts liability | Model/policy error | Financial misstatement / overpay | | | | CTL-02, shadow | | |
| R2 | Missed duplicate | Low recall | Duplicate payment | | | | CTL-03 | | |
| R3 | Prompt injection via invoice/email | Untrusted text | Policy bypass attempt | | | | content-as-data design | | |
| R4 | Unauthorised payment action | IAM misconfig | Funds leakage | | | | CTL-01 | Target residual: Very Low | |
| R5 | Bank detail fraud assist | Agent suggests bad change | Payment diversion | | | | Out of scope + CTL-07 | | |
| R6 | Evidence gap | Logging failure | Audit inability | | | | CTL-05 | | |
| R7 | Model drift | Unapproved version | Silent quality drop | | | | Change control | | |
| R8 | Over-automation / deskilling | Level too high too fast | Control weakness | | | | Progression model | | |
| R9 | Privacy / residency breach | Wrong endpoint | Regulatory exposure | | | | Approved endpoints | | |
| R10 | Supplier friction | Bad auto-emails | Relationship damage | | | | Human gate on send | | |

Score = Likelihood × Impact. Define scale in appendix.

## 3. Risk appetite statement

Example: *We accept Medium residual risk on low-value coding assist; we accept only Low/Very Low residual risk on payment-adjacent and payee-master processes.*

## 4. Decision

- [ ] Proceed to shadow  
- [ ] Proceed to pilot with conditions: ________  
- [ ] Do not proceed  

## 5. Approvals

| Role | Name | Date |
|------|------|------|
| Accountable | | |
| Risk / Control | | |
