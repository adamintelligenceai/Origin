---
title: Testing, Shadow Mode and Pilot
tier: Professional
code: ER-AP-TST-00
---

# Historical testing

1. Draw 50–100 cases from the last 90 days for the first agent. Stratify: easy, typical, nasty, high-value, high-risk codes.
2. Create a gold outcome (human dual-review on 20% if you can).
3. Freeze model, prompt, taxonomy versions.
4. Run. Score with the KPI dictionary.
5. Read every false negative on high-risk codes.
6. Do not proceed to shadow if you cannot explain the misses.

**Pass guideline (first agent, Level 1):** classification or recommendation accept rate agreed in advance (example 85% on the typical band), and **no unexplained high-risk false negative**. These numbers are local gates, not industry laws.

# UAT

UAT is not a demo. Scripts in the Excel/Doc templates cover: happy path, known exception, hostile invoice text, missing data, model timeout, override, fallback.

Sign-off: agent owner, Controls, tool owner. Head of AP if any Level 2+ send/write.

# Shadow mode

- Agent writes to a parallel queue only.
- Humans ignore it for processing; a reviewer compares daily.
- No supplier email, no ticket in the real workflow unless labelled test.
- Minimum two weeks or 200 live items, whichever is later for high-volume teams.
- Exit: written compare, updated charter, go/no-go.

# Controlled execution / pilot

Limit entity, category, value, named users, calendar. Rollback: disable send/write in one step. Communications: tell the affected buyers/receivers what will look different.

# Promotion

Use the governance evidence pack. Expiry 90 days.

# Implementation phases (OS view)

| Phase | Name | Typical artefact |
|---|---|---|
| 0 | Baseline and readiness | Diagnostic, KPI baseline |
| 1 | Process discovery | Observation + map |
| 2 | Agent specification | Charter |
| 3 | Data / tool access | Access list, SoD |
| 4 | Prototype | Sandbox outputs |
| 5 | Historical testing | Scored pack |
| 6 | Shadow | Shadow log |
| 7 | Controlled execution | Pilot charter |
| 8 | Performance review | Weekly report |
| 9 | Responsibility progression | Autonomy record |
| 10 | Scale | Next agent or next entity |

4–6 weeks is an **illustrative** path for one well-bounded Level 1 agent with data already extractable. It is not a commitment.
