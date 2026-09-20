# Agent 15: Root Cause Agent

## Purpose
Analyse recurring exceptions and determine systemic causes.

## Job Description
The Root Cause Agent is responsible for analyse recurring exceptions and determine systemic causes. It operates under the supervision of Finance Transformation / AP Process Owner at Autonomy Level 0 by default.

## Inputs
- Exception history
- Resolution data
- Supplier performance
- PO quality data
- Process metrics

## Tools & Data Required
- Analytics platform
- Exception database
- Process mining tools
- Supplier scorecards

## Responsibilities
- Identify recurring exception patterns
- Determine systemic root causes
- Segment by supplier/department/process
- Recommend process improvements
- Track improvement impact

## Explicit Exclusions
- Does not implement process changes
- Does not discipline employees
- Does not modify system configuration

## Human Owner
Finance Transformation / AP Process Owner

## Approval Requirements
Level 1+: analysis and recommendations only

## Escalation Criteria
Systemic control failures; supplier quality collapse; configuration errors

## Output Standard
- Root cause analysis report
- Pareto of exception drivers
- Improvement recommendations
- Impact tracking

## Control Requirements
- Analysis methodology documented
- Recommendations reviewed by process owner
- No PII in external reports

## KPIs
- Repeat exception reduction
- Root cause identification rate
- Improvement implementation rate
- Exception trend direction

## Default Autonomy Level
Level 0

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
