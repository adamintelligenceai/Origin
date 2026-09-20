---
title: AP Agent Workforce
subtitle: Sixteen roles. One orchestrator. No default autonomy.
tier: Professional
code: ER-AP-AG-00
---

# The stack

Treat this as an organisation chart, not a feature list.

```
                    [16 AP Manager / Orchestrator]
          ┌───────────────┬───────────────┬────────────────┐
     Intake & quality   Match & exceptions   People & money
     01 Intake          03 Matching          07 Approval
     02 Validation      04 Triage            08 Supplier resolution
     06 PO quality      05 Goods receipt     09 Internal follow-up
     10 Duplicate/anom  11 Statement rec     12 Payment proposal review
                        13 Close             14 Reporting
                        15 Root cause
```

# Responsibility model (central)

| Level | Name | Agent may | Agent may not | Typical time-in-level |
|---|---|---|---|---|
| 0 | Observe | Read, label internally, write to a sandbox | Notify anyone; change any record | 2–4 weeks |
| 1 | Recommend | Produce a recommendation object for a human queue | Execute the recommendation | Until accuracy gates are met |
| 2 | Prepare | Draft tickets, emails, journal packs, report packs | Send, post, approve, pay | Most production agents stay here |
| 3 | Execute within guardrails | Perform a pre-approved action list (e.g. create a *draft* park reason; assign a work item) | Anything not on the list; any payment; any bank change; any DOA override | Only after signed evidence pack |
| 4 | Managed autonomy | Operate inside a written boundary with exception-based review | Expand its own boundary | Rare. Never the launch state |

Promotion requires: sample size, accuracy vs human gold standard, false-negative review, control test, owner signature, expiry date.

# Shared charter fields (every agent)

Job description · Inputs · Tools/data · Responsibilities · Explicit exclusions · Human owner · Approval requirements · Escalation · Output standard · Controls · Audit evidence · KPIs · Performance history · Autonomy level · Failure handling · Cost monitoring

If a field is empty, the agent does not ship.

# Shared exclusions (every agent)

- Authorise, release or execute payment
- Create or amend vendor bank details
- Change DOA, tolerances, or tax configuration
- Delete audit logs
- Send legal admissions
- Train itself in production on live confidential data without an approved pattern

# How to pick the first three

1. **Triage** if you cannot see the work
2. **Goods Receipt** if GRNI and ageing dominate
3. **Validation** if extraction and required fields dominate

Do not start with 12, 16, or any Level 3 idea.
