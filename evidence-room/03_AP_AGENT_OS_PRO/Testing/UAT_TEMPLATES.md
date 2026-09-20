# UAT Templates — AP Agents

**Evidence Room — AP Agent OS Pro**  
**Document type:** UAT templates (markdown → Word/Excel later)  
**Accountable:** Business Owner · **Consulted:** Controller, Tech Owner, Prompt Steward  

---

## Template A — UAT plan cover

| Field | Value |
|---|---|
| Agent name / ID | |
| Version under test | |
| Environment | |
| Responsibility level tested | |
| Scope (doc types, entities, $ fence) | |
| Out of scope | |
| UAT start / end | |
| Business Owner | |
| UAT lead | |
| Entry criteria met? (Y/N) | |
| Linked charter / taxonomy version | |

### Entry criteria checklist

- [ ] Charter approved  
- [ ] Logging verified on sample run  
- [ ] Kill-switch tested in non-prod  
- [ ] Critical unit/integration tests green  
- [ ] Test data ready (including adversarial fixtures)  
- [ ] Fallback SOP drafted  

---

## Template B — Scenario register

| Scenario ID | Title | Taxonomy / control | Tester | Result (P/F/B) | Defect ID | Evidence link |
|---|---|---|---|---|---|---|
| UAT-001 | | | | | | |
| UAT-002 | | | | | | |

Import scripts from `TESTING_SCRIPTS.md` as scenario IDs.

**Result codes:** P Pass · F Fail · B Blocked  

---

## Template C — Scenario execution sheet

**Scenario ID:** _____________ **Date:** _____________ **Tester:** _____________

| Step # | Action | Expected | Actual | OK? |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**run_id(s):**  
**Defects raised:**  
**Notes:**  

---

## Template D — Defect log

| Defect ID | Sev | Summary | Steps | Expected | Actual | Owner | Status | Fix version |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

Exit rule: **0 Critical / 0 High** open (or waived in writing by Controller with compensating control).

---

## Template E — Business acceptance questionnaire

| # | Question | Y/N | Comment |
|---|---|---|---|
| 1 | Does the agent stay within charter scope? | | |
| 2 | Are stop conditions correct and observable? | | |
| 3 | Is evidence sufficient for audit sample? | | |
| 4 | Are exception codes/routes correct? | | |
| 5 | Is human workload acceptable at this level? | | |
| 6 | Are known FPs/FNs within agreed bands? | | |
| 7 | Is fallback workable? | | |
| 8 | Ready for shadow / pilot / production (circle)? | | |

**Business Owner signature / date:**  
**Controller acknowledgment (if money-adjacent):**  

---

## Template F — UAT exit report

### Summary

| Metric | Value |
|---|---|
| Scenarios planned / executed | |
| Pass rate | |
| Open Critical / High | |
| Decision | Go shadow / Go pilot / Rework / Stop |

### Residual risks

| Risk | Mitigation | Owner |
|---|---|---|
| | | |

### Approvals

| Role | Name | Date | Decision |
|---|---|---|---|
| Business Owner | | | |
| Technical Owner | | | |
| Controller (as required) | | | |

---

## Template G — Traceability matrix

| Requirement / control row | Scenario IDs | Status |
|---|---|---|
| Charter Q1 scope | | |
| SoD payment gate | | |
| Taxonomy code X | | |
| Injection control | | |
| Logging completeness | | |

---

## Related documents

- `TESTING_SCRIPTS.md`  
- `SHADOW_MODE_METHODOLOGY.md`  
- `Templates/AGENT_CHARTER_TEMPLATE.md`
