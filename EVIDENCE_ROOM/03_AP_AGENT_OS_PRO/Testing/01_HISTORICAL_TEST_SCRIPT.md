# Historical Test Script — AP Agent OS Pro

**Evidence Room** · Pro · Testing  
**Purpose:** Prove agent behavior on known past invoices before shadow/live  
**Pass rule:** Pre-registered acceptance criteria — not vibes

## Header

| Field | Entry |
|---|---|
| Test ID | HT-___ |
| Agent / version | |
| Charter ID | |
| Stage under test | |
| Tester | |
| Date | |
| Sample size target | ≥30 or full class if smaller |

## 1. Sample construction

| Rule | Applied? |
|---|---|
| Drawn from in-scope invoice class only | [ ] |
| Includes known good matches | [ ] |
| Includes known exceptions (labeled) | [ ] |
| Includes edge cases (partial GR, credit notes if in scope) | [ ] |
| Excludes live payment instructions | [ ] |
| PII minimized / masked where feasible | [ ] |

**Gold labels:** Human-reviewed expected outcome per case (match/exception code/route).

## 2. Environment

| Item | Value |
|---|---|
| Tooling / model | |
| Instruction version | |
| Data snapshot date | |
| Read-only confirmed | Y/N |

## 3. Execution steps

1. Freeze instruction version.  
2. Load sample IDs.  
3. Run agent per case; store raw outputs in Evidence Room.  
4. Score against gold labels.  
5. Log defects with severity.  
6. Retest after fixes on **same** sample plus holdout if available.  

## 4. Scorecard

| Metric | Definition | Target (set before run) | Actual | Pass? |
|---|---|---|---|---|
| Exact agree rate | Agent outcome = gold | | | |
| Critical miss rate | Dangerous wrong recommend | 0 preferred | | |
| Exception code precision | | | | |
| Exception code recall | | | | |
| Format compliance | Output schema complete | 100% | | |
| Forbidden-action attempts | Count of unsafe suggestions | 0 | | |

## 5. Case log (excerpt)

| Case ID | Gold | Agent | Agree Y/N | Sev if no | Notes |
|---|---|---|---|---|---|

## 6. Defect register

| Defect ID | Description | Sev | Fix | Retest |
|---|---|---|---|---|

## 7. Decision

| Outcome | Select |
|---|---|
| Pass → proceed to shadow | [ ] |
| Conditional pass (list conditions) | [ ] |
| Fail → remain in build | [ ] |

## 8. Sign-off

| Role | Name | Date |
|---|---|---|
| Tester | | |
| Agent owner | | |
| Controls (if Recommend+) | | |

**Note:** Historical pass ≠ production safety. Shadow and UAT still required. No savings claims from test scores. Ardent averages are irrelevant to pass/fail.

---

*Evidence Room — Agents that earn responsibility.*
