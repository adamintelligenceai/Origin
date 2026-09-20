# Risk Register

| Risk ID | Description | Agent | Likelihood | Impact | Risk Level | Control | Owner | Status |
|---------|-------------|-------|------------|--------|------------|---------|-------|--------|
| R-001 | Incorrect automated matching leads to wrong payment | AGT-03 | Medium | High | High | Human approval for out-of-tolerance matches | AP Manager | Active |
| R-002 | Agent hallucination produces incorrect recommendation | All | Low | Medium | Medium | Confidence threshold + human review | Agent Owner | Active |
| R-003 | Prompt injection via invoice content | All | Low | High | Medium | Input sanitisation + output validation | IT Security | Active |
| R-004 | Unauthorized autonomy progression | AGT-16 | Low | High | Medium | Progression approval workflow | AP Manager | Active |
| R-005 | Duplicate payment due to agent failure | AGT-10/12 | Low | Critical | High | Mandatory pre-payment human review | AP Manager | Active |
