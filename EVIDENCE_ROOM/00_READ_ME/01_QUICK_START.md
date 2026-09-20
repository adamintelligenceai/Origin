---
title: Quick Start
subtitle: Twelve moves from purchase to first governed agent
product: AP Agent OS
tier: Professional / Team
code: ER-AP-001
version: 1.0
date: September 2026
---

# 01 — Quick Start

Read this once. Then execute the numbered files in `03_AP_AGENT_OS_PRO`.

# 02 — Assess current state

Complete the AP AI Readiness Diagnostic. Record invoice volume, exception rate, STP rate, cycle time, AP FTE, and the top five exception codes. Do not skip the baseline. Without it you cannot prove the agent later.

> MEASURE: Use the KPI scorecard tab `Baseline`. Enter actuals, not targets.

# 03 — Map the process

Run one observed walkthrough with the people who actually process the work. Transcribe. Extract steps, systems, decisions, rules, exceptions, controls. Produce a one-page process map and a decision tree.

> OWN: Process owner + AP Manager jointly sign the current-state map.

# 04 — Select the first agent

Choose the first agent using four filters: volume, pain, data availability, control risk. Prefer agents that **recommend or prepare** over agents that **execute**. Do not start with payment proposal review at Level 3.

Typical first agents: Exception Triage, Goods Receipt follow-up, Invoice Validation, Duplicate & Anomaly (recommend-only).

# 05 — Write the Agent Charter

Use the charter template. Fill every field: purpose, inputs, tools, exclusions, human owner, approval, escalation, output standard, controls, KPIs, autonomy level, failure handling, cost monitoring.

If a field is blank, the agent is not ready.

# 06 — Define controls

Complete three rows in the Control Matrix for that agent before any prompt is written. Minimum: output validation, human accountability, audit log.

> RISK: Prompt injection, hallucinated vendor facts, and silent workflow changes are default risks. Treat them as present until tested.

# 07 — Establish KPIs

Pick four metrics: one activity, one operational, one financial (even if estimated), one risk/control. Define formula, data source, owner, review cadence.

# 08 — Test

Run historical cases. Score accuracy, false positives, false negatives, and rework. Do not proceed if you cannot explain errors.

# 09 — Run shadow mode

The agent sees live work and produces recommendations. Humans do the work as today. Compare. No action permissions.

# 10 — Deploy

Controlled pilot: one entity, one invoice category, named reviewers, written rollback. Time-box it (two to four weeks).

# 11 — Measure

Compare to baseline. Write the weekly agent-performance report. Decide: hold, fix, expand, or retire.

# 12 — Expand responsibility

Only after evidence. Use the five-level model. A promotion requires a signed performance pack, not a vendor demo.

> DO: Never make Level 4 the default. Most AP agents should live at Level 1–2 for the first two quarters.
