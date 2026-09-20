# Scorecard Guide — AP Agent OS

**Evidence Room — AP Agent OS Pro**  
**Document type:** Operating guide  
**Audience:** AP managers, Controllers, agent owners, Steering Committee  

---

## 1. Purpose

The scorecard translates the KPI Framework into a fixed, comparable view used for:

- Weekly agent performance reviews  
- Promotion / demotion decisions  
- Monthly control attestation support  
- Steering discussions without vanity clutter  

One scorecard design; multiple audiences see role-appropriate cuts of the same definitions.

---

## 2. Scorecard structure (four quadrants)

| Quadrant | Weight in promotion discussion | Contents |
|---|---|---|
| A — Quality | High | Classification, extraction, matching accuracy; FP/FN for key detectors |
| B — Flow | High | STP, exception rate, resolution, ageing, time to posting |
| C — Economics | Medium | Cost/invoice trend, inference cost, hours released (**validated** only), cost per correct outcome |
| D — Risk-control | **Gate** | Breaches, audit exceptions, escalations, override rate, evidence completeness |

**Rule:** If Quadrant D is Red, overall status cannot be Green — regardless of STP.

---

## 3. Status model

| Status | Meaning | Typical action |
|---|---|---|
| **Green** | Within target band; controls healthy | Continue; consider promotion evidence if sustained |
| **Amber** | Outside target but explained / remediating | Action plan; no promotion |
| **Red** | Breach of gate metric or severe degradation | Demotion review; kill-switch readiness |
| **Grey** | Insufficient data / baseline | Do not judge; finish measurement window |

Use **median and P90** for time metrics where outliers dominate means.

---

## 4. Standard agent scorecard (template)

**Agent:** _____________ **Period:** _____________ **Level (current/ceiling):** ___ / ___  
**Business Owner:** _____________ **Technical Owner:** _____________

### Quadrant A — Quality

| Metric | Baseline | Target | Actual | Status | Notes |
|---|---|---|---|---|---|
| Classification accuracy % | | | | | |
| Extraction accuracy % (critical fields) | | | | | |
| Matching accuracy % | | | | | |
| FP rate (primary detector) | | | | | |
| FN rate (primary detector) | | | | | |

### Quadrant B — Flow

| Metric | Baseline | Target | Actual | Status | Notes |
|---|---|---|---|---|---|
| STP % (in-scope) | | | | | |
| Exception rate % | | | | | |
| Exception resolution % | | | | | |
| Median resolution time | | | | | |
| Median time to posting | | | | | |
| Repeat exception % | | | | | |
| P90 ageing (exception $ or days) | | | | | |

### Quadrant C — Economics

| Metric | Baseline | Target | Actual | Status | Notes |
|---|---|---|---|---|---|
| Inference cost $ | | | | | |
| Cost per correct outcome | | | | | |
| Hours released (validated) | | | | | |
| Validated savings $ (run-rate) | | | | | |

### Quadrant D — Risk-control (gate)

| Metric | Target | Actual | Status | Notes |
|---|---|---|---|---|
| Control breaches (Crit/High) | 0 Crit | | | |
| Audit exceptions open | 0 material | | | |
| Escalations | band | | | |
| Override rate | band | | | |
| Evidence completeness % | 100% material | | | |
| Confirmed duplicate pays | 0 | | | |

### Decision block

| Question | Y/N / Notes |
|---|---|
| Sustained window met? | |
| Mix stable vs baseline? | |
| Open Critical risks? | |
| Promotion / hold / demote recommendation | |
| Controller challenge notes | |

---

## 5. Portfolio scorecard (all agents)

Maintain a one-page roll-up:

| Agent | Level | A | B | C | D (gate) | Overall | Promotion eligible? |
|---|---|---|---|---|---|---|---|
| 01 Intake | | | | | | | |
| 02 Validation | | | | | | | |
| … | | | | | | | |
| 16 Orchestrator | | | | | | | |

Orchestrator health includes collision events, unapproved ceiling change attempts, and kill-switch drill status.

---

## 6. External benchmark strip (context only)

Display as a footnote — not as “target = BIC overnight”:

| Context metric | Ardent 2025 peer | Ardent 2025 BIC |
|---|---|---|
| Cost / invoice | $9.84 | $2.65 |
| Exception rate | 18.4% | 11.1% |
| STP | 35.4% | 51% |
| Cycle time | 8.2 days | (BIC faster cohort — cite narrative carefully) |

Your scorecard targets remain **your** baselines and trajectories.

---

## 7. Cadence

| When | What |
|---|---|
| Daily | Amber/Red exceptions ageing; gate breaches |
| Weekly | Full agent scorecards; weekly report |
| Monthly | Portfolio + financial quadrant deep dive |
| Quarterly | Dictionary review; target recalibration |

---

## 8. Facilitation tips

- Start with Quadrant D.  
- Challenge STP gains accompanied by FN rises on duplicates.  
- Separate **mix shift** from **true improvement**.  
- Record decisions in the weekly report archive.  
- Label any non-measured projection as **illustrative**.

---

## 9. Related documents

- `KPI_FRAMEWORK.md`  
- `WEEKLY_AGENT_PERFORMANCE_REPORT.md`  
- `MANAGEMENT_DASHBOARD_SPEC.md`  
- `Agent_Library/RESPONSIBILITY_MODEL.md`
