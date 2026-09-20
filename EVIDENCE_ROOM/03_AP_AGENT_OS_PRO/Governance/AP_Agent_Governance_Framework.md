# AP Agent Governance Framework

## 1. Human Accountability
Every agent has a named human owner accountable for its outputs. The owner cannot delegate accountability to the agent.

## 2. Segregation of Duties
- Agents that process invoices cannot approve payments
- Agents that detect anomalies cannot block payments without human review
- Agents that draft communications cannot send without approval (default Level 1-2)

## 3. Least Privilege
Agents receive minimum data access required for their function. Access reviewed quarterly.

## 4. Approval Boundaries
| Autonomy Level | Approval Required |
|---------------|-------------------|
| 0 Observe | None (read-only) |
| 1 Recommend | Human reviews recommendations |
| 2 Prepare | Human approves before action |
| 3 Execute | Pre-approved rules; exceptions escalate |
| 4 Managed | Exception-based oversight; periodic review |

## 5. Data Privacy
- PII minimisation in agent prompts
- No supplier/employee data in external model training
- Data retention aligned with corporate policy
- Regional data residency requirements documented

## 6. AI-Specific Risks
| Risk | Control |
|------|---------|
| Prompt injection | Input sanitisation, output validation |
| Hallucination | Structured outputs, confidence thresholds, human review |
| Model drift | Performance monitoring, periodic revalidation |
| Vendor/model risk | Model change log, fallback procedures |

## 7. Audit & Evidence
- All agent decisions logged with timestamp, input, output, confidence
- Version control for prompts, rules, and configurations
- Evidence retention per corporate policy (minimum 7 years for financial records)
- Periodic certification of agent controls (quarterly minimum)

## 8. Incident Response
1. Detect (monitoring/alerting)
2. Contain (disable agent or reduce to Level 0)
3. Investigate (root cause within 48 hours)
4. Remediate (fix and test)
5. Report (management + audit if material)
6. Review (update controls)

## 9. Override Procedures
Any human may override an agent decision. Overrides logged with reason and reviewed weekly.

## 10. Business Continuity
If agent platform unavailable: revert to manual process within 4 hours. Documented fallback for each agent.
