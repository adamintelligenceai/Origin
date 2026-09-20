# Human vs Agent Decision Framework

## Decision Matrix

| Criterion | Human | Agent (Recommend) | Agent (Prepare) | Agent (Execute) |
|-----------|-------|-------------------|-----------------|-----------------|
| Financial risk if wrong | High | — | — | — |
| Requires judgment | Yes | — | — | — |
| Repetitive analysis | — | ✓ | ✓ | ✓ |
| Pattern recognition | — | ✓ | ✓ | ✓ |
| Communication drafting | — | ✓ | ✓ | — |
| Approval authority | ✓ | — | — | — |
| Payment execution | ✓ | — | — | — |
| Master data changes | ✓ | — | — | — |
| Regulatory interpretation | ✓ | — | — | — |
| Supplier relationship | ✓ | — | — | — |

## Rules
1. If financial risk is high → Human decides, agent may recommend
2. If task is repetitive and measurable → Agent candidate
3. If task requires relationship/judgment → Human, agent may prepare
4. If accuracy is provable >95% for 8+ weeks → Consider Level 3
5. Payment and approval → Always human

## Application
For each AP process step, mark: Human | Agent Recommend | Agent Prepare | Agent Execute | Deterministic Automation
