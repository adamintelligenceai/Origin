# AP Agent Operating Model (Starter)

## The Evidence Room Principle
AI agents earn responsibility through demonstrated performance — like employees gaining trust over time.

## Five-Level Responsibility Model
| Level | Name | Capability |
|-------|------|------------|
| 0 | Observe | Review only |
| 1 | Recommend | Suggest actions |
| 2 | Prepare | Draft actions for approval |
| 3 | Execute | Act within guardrails |
| 4 | Managed Autonomy | Independent with exception oversight |

## Top 10 AP Agents
### 1. Invoice Intake Agent
Review incoming invoices and determine whether information is complete, correctly extracted and suitable for downstream processing.

### 2. Invoice Validation Agent
Validate invoice header and line data against business rules before matching.

### 3. Matching Agent
Match invoice lines to POs, receipts, and contracts with tolerance analysis.

### 4. Exception Triage Agent
Classify every AP exception into defined taxonomy and recommend next action.

### 5. Goods Receipt Agent
Identify missing receipts, determine likely responsible employees, and prepare follow-ups.

### 6. PO Quality Agent
Identify poor PO creation practices driving downstream AP exceptions.

### 7. Approval Agent
Monitor approval workflows and identify stalled, misrouted, or blocked approvals.

### 8. Supplier Resolution Agent
Draft supplier communications for invoice discrepancies and resolution.

### 9. Internal Follow-Up Agent
Draft and manage internal follow-ups for missing GR, PO issues, approvals, and coding.

### 10. Duplicate & Anomaly Agent
Identify exact duplicates, near duplicates, and suspicious payment patterns.


## Human-vs-Agent Decision Framework
| Task Type | Recommended Approach |
|-----------|---------------------|
| Rule-based, high volume, low risk | Deterministic automation first |
| Pattern recognition, medium risk | AI agent at Level 1-2 |
| Judgment, high value, control-critical | Human with AI assist (Level 0-1) |
| Supplier communication | AI drafts, human approves (Level 2) |
| Payment authorisation | Always human |

## Implementation Checklist
- [ ] Complete AP AI Readiness Diagnostic
- [ ] Baseline current KPIs (cost/invoice, exception rate, STP)
- [ ] Map current AP process (use Process Mapping Template)
- [ ] Select first agent (recommend: Exception Triage or Invoice Validation)
- [ ] Write Agent Charter for first agent
- [ ] Define controls and KPIs
- [ ] Run historical test cases
- [ ] Enter shadow mode (2+ weeks)
- [ ] Controlled pilot
- [ ] Measure and decide on autonomy progression
