# Management Dashboard Spec — AP Agent OS Pro

**Evidence Room** · Pro · KPI Measurement  
**Purpose:** Specify a management view Controllers can trust — definitions first, charts second  
**Implementation:** Build in your BI tool / spreadsheet; this file is the contract

## Design principles

1. **Frozen definitions** before go-live  
2. **Control KPIs equal billing KPIs** in prominence  
3. **External benchmarks segregated** from “our performance”  
4. **No guaranteed savings tiles**  
5. Brand if designed: ink `#0B1F2A`, paper `#F7F4EE`, amber `#C47A2C`, teal `#1F5C5C`

## Audiences & views

| View | Audience | Cadence |
|---|---|---|
| Ops | AP lead | Weekly |
| Management | Controller / Transformation | Monthly |
| Steering | Charter Board | Monthly |
| Board strip | CFO | Quarterly (subset) |

## Metric dictionary

| ID | Metric | Definition | Formula / source | Good direction | Owner |
|---|---|---|---|---|---|
| M01 | Adoption % | In-scope volume on governed agent path | agent_touched / in_scope | ↑ | AP lead |
| M02 | Confirm rate | Confirmed recommends / recommends | | Context | AP lead |
| M03 | Exception rate (company) | Per **your** definition | | ↓ usually | AP lead |
| M04 | Sample QA pass % | Passes / sampled | | ↑ | AP lead |
| M05 | Evidence completeness % | Packs with all required fields | | ↑ | Controls |
| M06 | Incident count S1–S2 | Sev model | | ↓ | Controls |
| M07 | Stage mix | Count agents by stage | | Monitor | Programme |
| M08 | Demotion count | | | Context | Programme |
| M09 | Cycle time (optional) | Your definition | | ↓ | AP lead |
| M10 | Cost / invoice (optional) | Your definition | | ↓ | Finance |

**Optional context panel (separate visual region):** Ardent 2025 cost **$9.84**, exception **18.4%**, STP **35.4%** — labeled “Industry survey averages — not our KPIs.”

## Layout (management monthly)

```
[Header: programme, period, stage ceiling]
[Row 1: Adoption | Sample QA | Incidents S1-S2 | Evidence completeness]
[Row 2: Exception rate trend (ours) | Confirm/reject]
[Row 3: Agent stage mix | Top exception codes]
[Row 4: Decisions / demotions]
[Footer: claims disclaimer]
```

Amber for incidents/risks; teal for stable controls; never greenwash unlabeled “savings.”

## Data feeds

| Data | System of truth | Refresh |
|---|---|---|
| Volumes | ERP/AP platform extract | Weekly |
| Agent events | Evidence Room logs | Daily/Weekly |
| Samples | QA sheets | Weekly |
| Incidents | Incident log | Continuous |

## Alert thresholds (set locally)

| Metric | Warn | Breach | Action |
|---|---|---|---|
| Sample QA pass | < target | < hard floor | Demote consideration |
| S1 incidents | any | — | Kill-switch review |
| Evidence completeness | < 95% | < 90% | Freeze promotions |

## Non-functional

| Need | Spec |
|---|---|
| Access | Finance + Controls; least privilege |
| Export | PDF for steering pre-read |
| Audit | Metric definition change log |

## Acceptance test for the dashboard itself

- [ ] Every tile maps to dictionary ID  
- [ ] Industry benchmarks cannot be mistaken for ours  
- [ ] Disclaimer visible on export  
- [ ] Drill path to evidence packs for sample fails  

---

*Evidence Room — Agents that earn responsibility.*
