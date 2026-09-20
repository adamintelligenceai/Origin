# Agent Testing Scripts

## Test Case Structure
Each test case includes: ID, Description, Input Data, Expected Output, Actual Output, Pass/Fail, Notes

## Invoice Validation Agent — Sample Tests
| ID | Scenario | Expected |
|----|----------|----------|
| TV-001 | Valid invoice, all fields correct | PASS |
| TV-002 | Duplicate invoice number, same supplier | FAIL — duplicate |
| TV-003 | Missing tax field | WARNING — tax issue |
| TV-004 | Amount $0.00 | FAIL — invalid amount |
| TV-005 | Supplier not in master | FAIL — unknown supplier |

## Matching Agent — Sample Tests
| ID | Scenario | Expected |
|----|----------|----------|
| TM-001 | Exact PO/price/qty match | AUTO-MATCH |
| TM-002 | Price variance 2% (tolerance 5%) | AUTO-MATCH |
| TM-003 | Price variance 8% (tolerance 5%) | EXCEPTION — price mismatch |
| TM-004 | No goods receipt | EXCEPTION — missing receipt |
| TM-005 | Multi-line, mixed match results | PARTIAL MATCH per line |

*Expand with 50+ test cases per agent for production readiness.*
