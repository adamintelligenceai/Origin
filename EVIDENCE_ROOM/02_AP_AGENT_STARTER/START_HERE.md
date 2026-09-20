---
title: AP Agent Starter Kit
subtitle: The $79 kit that should feel like a $500 briefing
product: AP Agent OS
tier: Starter
code: ER-AP-ST-00
version: 1.0
---

# Start here

This kit is enough to redesign **one** AP agent slice without buying the full OS.

Use it in this order:

1. Operating model (this folder)
2. Human vs agent decision
3. Top 10 agent blueprints
4. Exception taxonomy (starter)
5. Process map template
6. Agent job description + instruction templates
7. KPI scorecard (lite)
8. Governance checklist
9. 90-day roadmap and implementation checklist

If you need all 16 agents, control matrix, ROI model, UAT, shadow methodology and executive packs, upgrade to Professional.

# Operating model in one page

AP work has four layers:

| Layer | Human default | Agent default |
|---|---|---|
| Policy and DOA | Own | Never set |
| Payment authorisation | Own | Review only, never release |
| Exception judgment | Own | Recommend / prepare |
| Repeatable analysis, drafting, routing, monitoring | Review | Observe → recommend → prepare |

Agents are **roles**, not features. Each role has a charter, owner, exclusions, KPIs, and an autonomy level that starts at 0 or 1.

# Human vs agent decision

Score a task 0–2 on each: frequency, rules clarity, data completeness, reversal cost, regulatory sensitivity, supplier impact.

- **Deterministic automation** if the rule is stable and the data is structured (classic match within tolerance).
- **Agent recommend** if language, judgment, or incomplete data is involved.
- **Human only** if the action posts, pays, changes bank details, or grants access.

> RISK: Do not use an LLM to decide a three-way match when the ERP already can. Agents should not re-implement match engines.

# Ninety-day starter roadmap

| Days | Outcome |
|---|---|
| 1–15 | Diagnostic, baseline KPIs, one process map |
| 16–30 | First charter, controls, historical test pack |
| 31–60 | Shadow mode, weekly scorecard |
| 61–90 | Controlled recommend-mode pilot or a clear stop |

Actual duration depends on systems, data quality, integrations and governance. The 4–6 week “one agent” story is only for a well-bounded, data-ready use case.
