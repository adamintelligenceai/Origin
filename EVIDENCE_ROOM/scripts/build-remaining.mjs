#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
function ensureDir(p) { if (!existsSync(p)) mkdirSync(p, { recursive: true }); }
function write(rel, content) {
  const full = join(ROOT, rel);
  ensureDir(dirname(full));
  writeFileSync(full, content, 'utf8');
}

// Free Diagnostic
write('01_FREE_AP_AI_READINESS/AP_AI_READINESS_DIAGNOSTIC.md', `# AP AI Readiness Diagnostic
## Evidence Room — Free Assessment

**30 questions | 5 maturity levels | Instant scorecard**

---

## Instructions

1. Answer all 30 questions in \`DIAGNOSTIC_QUESTIONS.csv\`
2. Score each answer 1–5 (left column = 1, right column = 5)
3. Sum your scores (max 150)
4. Determine your maturity level using the scoring guide below
5. Complete the baseline KPI worksheet
6. Review the 10-agent opportunity overview

---

## Scoring Guide

| Score Range | Maturity Level | Readiness |
|-------------|---------------|-----------|
| 30–60 | Level 1 — Manual | Not ready. Stabilise process and measurement first. |
| 61–85 | Level 2 — Digitising | Early readiness. Begin with Observe-level agents. |
| 86–110 | Level 3 — Automating | Good readiness. Deploy Recommend/Prepare agents. |
| 111–130 | Level 4 — Optimising | Strong readiness. Execute within guardrails. |
| 131–150 | Level 5 — Autonomous (Governed) | Advanced. Managed autonomy for selected agents. |

---

## 10-Agent Opportunity Overview

Based on your diagnostic responses, prioritise agents in this order:

| Priority | Agent | Best For |
|----------|-------|----------|
| 1 | Exception Triage (AGT-04) | High exception volume, no taxonomy |
| 2 | Duplicate & Anomaly (AGT-10) | Duplicate payment concerns |
| 3 | Approval (AGT-07) | Approval bottlenecks |
| 4 | Invoice Intake (AGT-01) | OCR/extraction issues |
| 5 | Matching (AGT-03) | PO matching failures |
| 6 | Goods Receipt (AGT-05) | Missing receipt volume |
| 7 | Supplier Resolution (AGT-08) | High supplier inquiry time |
| 8 | AP Reporting (AGT-14) | Limited visibility/reporting |
| 9 | Root Cause (AGT-15) | Recurring exceptions |
| 10 | Orchestrator (AGT-16) | Multiple agents deployed |

---

## Business Case Starter

Use these industry benchmarks as inputs (source: Ardent Partners, 2024):

- Average cost per invoice: **$9.40**
- Best-in-Class cost per invoice: **$2.78**
- Average processing time: **9.15 days**
- Exception rate: **14.0%**
- Straight-through processing: **32.6%**

Complete \`BASELINE_KPI_WORKSHEET.csv\` with your actuals for comparison.

---

*Evidence Room — Evidence over hype.*
`);

write('01_FREE_AP_AI_READINESS/SCORING_GUIDE.md', `# Diagnostic Scoring Guide

## Per-Question Scoring
Each question offers 5 response options scored 1–5 (left = lowest maturity, right = highest).

## Category Weights
All categories weighted equally. Categories: Process, Technology, Data, Governance, People, Controls, Volume, Complexity, Opportunity, Economics, Readiness.

## Interpretation
See AP_AI_READINESS_DIAGNOSTIC.md for maturity level mapping.

## Opportunity Heatmap
After scoring, identify your 3 lowest-scoring categories. These represent your highest-impact improvement areas and should inform your first agent selection.
`);

write('01_FREE_AP_AI_READINESS/BASELINE_KPI_WORKSHEET.csv', `metric,your_baseline,industry_average,industry_best_in_class,source,your_target_90_day
Cost per invoice,,9.40,2.78,Ardent Partners 2024,
Processing time (days),,9.15,,Ardent Partners 2024,
Exception rate (%),,14.0,,Ardent Partners 2024,
Straight-through processing rate (%),,32.6,,Ardent Partners 2024,
PO compliance rate (%),,61.0,,Ardent Partners 2024,
Supplier inquiry time (% of staff time),,21.8,,Ardent Partners 2024,
Monthly invoice volume,,,,Your data,
AP processing headcount (FTE),,,,Your data,
Manual touch rate (%),,67.4,,Derived from STP,
Average exception resolution time (minutes),,45,Illustrative,Your estimate,
`);

write('01_FREE_AP_AI_READINESS/BUSINESS_CASE_STARTER.md', `# Business Case Starter

## Inputs (use your actuals or industry benchmarks)
- Monthly invoice volume: ___
- Cost per invoice: $9.40 (industry avg) or your actual: ___
- Manual touch rate: ___%
- Exception rate: ___%
- AP headcount: ___ FTE
- Fully loaded cost per FTE: $___

## Conservative Scenario
Assume 50% of projected efficiency gains materialise.

## Outputs to Calculate
- Annual processing cost (volume × cost per invoice)
- Potential capacity released (hours)
- Estimated annual savings range
- Payback period

**Use the full ROI Calculator in Professional Edition for detailed modelling.**

*Do not present savings as guaranteed. Model Conservative / Base / Upside.*
`);

// Starter Kit
write('02_AP_AGENT_STARTER/STARTER_GUIDE.md', `# AP Agent Starter Kit
## Evidence Room — Tier 1 ($79)

---

## What's Included

1. AP Agent Operating Model overview
2. Top 10 AP agent blueprints
3. AP exception taxonomy (summary)
4. AI readiness diagnostic (full)
5. Human-vs-agent decision framework
6. Process-mapping template
7. Agent job description template
8. Agent instruction template
9. KPI scorecard
10. Governance checklist
11. AP transformation roadmap
12. Implementation checklist

---

## AP Agent Operating Model Overview

Evidence Room treats AI agents as members of a governed workforce:

**Principle:** Agents earn responsibility through demonstrated performance.

**Structure:**
- 16 specialised agents + 1 orchestrator
- 5-level autonomy model (Observe → Managed)
- Human owner per agent
- Control matrix per agent
- KPI tracking per agent

**What agents do:** Analyse, classify, recommend, prepare, draft, report.
**What agents don't do:** Approve payments, modify master data autonomously, guarantee fraud detection.

---

## Getting Started

1. Complete the free diagnostic
2. Review the top 10 agent blueprints
3. Select your first agent using the human-vs-agent framework
4. Complete the agent job description template
5. Follow the implementation checklist

---

*Upgrade to Professional ($199) for all 16 agents, full governance, ROI calculator, and deployment methodology.*
`);

write('02_AP_AGENT_STARTER/TOP_10_AGENT_BLUEPRINTS.md', `# Top 10 AP Agent Blueprints

## Priority Agents for Initial Deployment

### 1. Exception Triage Agent (AGT-04)
**Why first:** Classifies exceptions without acting. Low risk, high visibility.
**Autonomy start:** Level 0 (Observe) → Level 1 (Recommend)

### 2. Duplicate & Anomaly Agent (AGT-10)
**Why:** Direct financial risk reduction. Measurable accuracy.
**Autonomy start:** Level 0 → Level 1

### 3. Approval Agent (AGT-07)
**Why:** Addresses the most common bottleneck. Read-only monitoring.
**Autonomy start:** Level 0 → Level 1

### 4. Invoice Intake Agent (AGT-01)
**Why:** First touchpoint. Improves downstream quality.
**Autonomy start:** Level 0 → Level 2

### 5. Matching Agent (AGT-03)
**Why:** Core AP process. High volume impact.
**Autonomy start:** Level 0 → Level 2

### 6. Goods Receipt Agent (AGT-05)
**Why:** Missing receipts are the #1 exception category.
**Autonomy start:** Level 0 → Level 2

### 7. Supplier Resolution Agent (AGT-08)
**Why:** Reduces 21.8% of staff time on supplier inquiries.
**Autonomy start:** Level 0 → Level 2 (draft only)

### 8. Internal Follow-Up Agent (AGT-09)
**Why:** Automates internal chasing. Low risk.
**Autonomy start:** Level 0 → Level 2

### 9. AP Reporting Agent (AGT-14)
**Why:** Immediate visibility. No transaction risk.
**Autonomy start:** Level 0 → Level 3

### 10. Root Cause Agent (AGT-15)
**Why:** Breaks the cycle of recurring exceptions.
**Autonomy start:** Level 0 → Level 1

*Full specifications for all 16 agents available in Professional Edition.*
`);

write('02_AP_AGENT_STARTER/HUMAN_VS_AGENT_FRAMEWORK.md', `# Human vs Agent Decision Framework

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
`);

write('02_AP_AGENT_STARTER/IMPLEMENTATION_CHECKLIST.md', `# Implementation Checklist

## Phase 0: Readiness
- [ ] Complete AP AI Readiness Diagnostic
- [ ] Secure executive sponsor
- [ ] Identify AP process owner
- [ ] Establish KPI baseline
- [ ] Confirm ERP/integration access

## Phase 1: First Agent
- [ ] Select first agent (use Human vs Agent Framework)
- [ ] Complete agent job description
- [ ] Assign human owner
- [ ] Define controls (minimum 3 per agent)
- [ ] Set KPI targets
- [ ] Register in agent registry

## Phase 2: Testing
- [ ] Gather 3+ months historical data
- [ ] Run historical test cases
- [ ] Document accuracy results
- [ ] Enter shadow mode (2-4 weeks)
- [ ] Compare agent vs human decisions

## Phase 3: Deployment
- [ ] Controlled pilot (limited scope)
- [ ] Monitor KPIs weekly
- [ ] Review controls monthly
- [ ] Performance review at 90 days
- [ ] Decision: progress, hold, or revert autonomy level

## Phase 4: Scale
- [ ] Select second agent
- [ ] Repeat phases 1-3
- [ ] Deploy orchestrator when 3+ agents active
- [ ] Quarterly benefits review
`);

write('02_AP_AGENT_STARTER/TRANSFORMATION_ROADMAP.md', `# AP Transformation Roadmap (Starter)

## Month 1: Foundation
- Diagnostic and baseline
- Process mapping (current state)
- First agent selection and charter

## Month 2: First Agent
- Historical testing
- Shadow mode
- Controlled pilot

## Month 3: Measure & Expand
- Performance review
- Responsibility progression decision
- Second agent selection

## Month 4-6: Scale
- Deploy agents 2-3
- Governance maturation
- Benefits tracking

## Month 7-12: Optimise
- Orchestrator deployment
- Full KPI dashboard
- Continuous improvement cycle

*Illustrative timeline. Actual duration depends on systems, data, governance, and complexity.*
`);

// Governance
write('03_AP_AGENT_OS_PRO/Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md', `# AP Agent Governance Framework

## 1. Human Accountability
Every agent has a named human owner accountable for performance, controls, and escalation.

## 2. Segregation of Duties
- Agent prepares → Human approves
- Agent recommends → Human decides
- Agent never approves its own exceptions
- Agent never executes payments

## 3. Least Privilege
Agents access only data required for their function. Read-only by default.

## 4. Approval Boundaries
Defined per autonomy level. Level 3+ requires documented approval for scope expansion.

## 5. Role-Based Access
Agent permissions mapped to RBAC. Regular access reviews.

## 6. Data Privacy
PII handling procedures. Data minimisation. Retention policies.

## 7. Prompt Injection Risk
Input sanitisation. Output validation against business rules. Red-team testing.

## 8. Hallucination Risk
Confidence scoring. Mandatory human review below threshold. Grounding in ERP data.

## 9. Output Validation
All agent outputs validated against business rules before action.

## 10. Audit Logs
Complete log of agent inputs, outputs, decisions, and human overrides.

## 11. Version Control
Agent instructions, rules, and configurations versioned and change-controlled.

## 12. Model Changes
Model updates require testing, approval, and rollback plan.

## 13. Workflow Changes
Process changes trigger agent re-testing before production.

## 14. Testing
Historical testing mandatory before shadow mode. Shadow mandatory before pilot.

## 15. Release Management
Agent deployments follow: test → shadow → pilot → production progression.

## 16. Incident Response
Agent suspension procedure. Root cause analysis. Control remediation.

## 17. Override Procedures
Humans can override any agent decision. Overrides logged and reviewed.

## 18. Fallback Procedures
Manual process available when agent is suspended or unavailable.

## 19. Business Continuity
AP operations continue if agents are offline. No single-agent dependency.

## 20. Evidence Retention
Agent decision evidence retained per audit requirements.

## 21. Access Termination
Agent access revoked when employee leaves or role changes.

## 22. Periodic Certification
Quarterly agent performance and control certification by human owner.

## 23. Vendor/Model Risk
Third-party AI model risk assessed. Fallback models identified.
`);

write('03_AP_AGENT_OS_PRO/Governance/AUTONOMY_PROGRESSION_FRAMEWORK.md', `# Autonomy Progression Framework

## Levels

| Level | Name | Capability | Entry Requirement |
|-------|------|-----------|-------------------|
| 0 | Observe | Review and log only | Agent deployed |
| 1 | Recommend | Produce recommendations | >85% accuracy in Observe for 4+ weeks |
| 2 | Prepare | Draft actions for approval | >90% recommendation acceptance for 4+ weeks |
| 3 | Execute within guardrails | Pre-approved low-risk actions | >95% accuracy, zero breaches for 8+ weeks |
| 4 | Managed autonomy | Independent with exception oversight | Executive approval, 12+ weeks at Level 3 |

## Progression Process
1. Human owner submits progression request with evidence package
2. Review KPI performance against thresholds
3. Review control effectiveness (zero breaches required)
4. Review divergence analysis from shadow/pilot period
5. Approve, defer, or deny progression
6. Update agent registry with new level and effective date

## Regression Triggers
- KPI below threshold for 2 consecutive periods → revert one level
- Control breach → immediate suspension, revert to Level 0
- Ambiguous outcome on financial transaction → revert to Level 1

## Documentation Required
- Performance scorecard (4-12 weeks)
- Control audit results
- Human owner sign-off
- Executive approval (Level 4 only)
`);

write('03_AP_AGENT_OS_PRO/Process_Mapping/METHODOLOGY.md', `# Evidence Room Process Mapping Methodology

## 10-Step Method

### STEP 1 — Observe
Record real process walkthroughs with AP staff. Shadow team members. Capture actual behaviour, not documented process.

### STEP 2 — Transcribe
Generate transcripts of process discussions. Use recording with consent.

### STEP 3 — Extract
Identify: steps, systems, decisions, business rules, inputs, outputs, exceptions, controls, dependencies.

### STEP 4 — Structure
Convert into: process map, decision tree, exception taxonomy, control map, RACI, SOP.

### STEP 5 — Agentise
Determine: what remains human, what AI recommends, what AI prepares, what AI executes, where deterministic automation is preferable.

### STEP 6 — Test
Run historical cases against agent logic. Measure accuracy.

### STEP 7 — Shadow
Agent operates without action permissions. Compare to human decisions.

### STEP 8 — Controlled Pilot
Limited users / transactions / categories. Level 2 maximum.

### STEP 9 — Measure
Compare against baseline KPIs. Document results.

### STEP 10 — Expand Responsibility
Only after evidence demonstrates adequate performance. Follow autonomy progression framework.
`);

write('03_AP_AGENT_OS_PRO/Process_Mapping/PROCESS_DISCOVERY_TEMPLATE.md', `# Process Discovery Template

## Process: _______________
## Date: _______________
## Facilitator: _______________
## Participants: _______________

### Current State Description
(Describe the process as it actually operates today)

### Systems Involved
| System | Function | Integration |
|--------|----------|-------------|
| | | |

### Process Steps
| Step | Actor | Action | System | Time | Exception Rate |
|------|-------|--------|--------|------|----------------|
| 1 | | | | | |

### Decision Points
| Decision | Criteria | Current Owner | Exception Frequency |
|----------|----------|---------------|---------------------|
| | | | |

### Exception Categories (from taxonomy)
| Code | Frequency | Avg Resolution Time | Current Handler |
|------|-----------|--------------------|-----------------|
| | | | |

### Controls
| Control | Type | Evidence | Frequency |
|---------|------|----------|-----------|
| | | | |

### Agentisation Assessment
| Step | Current | Proposed | Autonomy Level | Rationale |
|------|---------|----------|----------------|-----------|
| | Human | | | |
`);

write('03_AP_AGENT_OS_PRO/Testing/SHADOW_MODE_METHODOLOGY.md', `# Shadow Mode Methodology

## Purpose
Run agent alongside human process without granting action permissions. Compare outputs.

## Duration
Minimum 2 weeks. Recommended 4 weeks for high-volume agents.

## Setup
1. Agent configured at Level 0 (Observe) with output logging
2. Parallel human process continues unchanged
3. Comparison framework established

## Daily Activities
- Agent processes all items in scope
- Human processes all items independently
- Divergence log maintained

## Comparison Metrics
| Metric | Target |
|--------|--------|
| Agreement rate | >85% to progress to Level 1 |
| Material divergence rate | <5% |
| False positive rate | <5% |
| Coverage | 100% of items in scope |

## Divergence Investigation
Every material divergence investigated:
- Agent correct, human incorrect → document learning
- Human correct, agent incorrect → improve agent, do not progress
- Ambiguous → escalate to human owner

## Exit Criteria
- Agreement rate meets threshold for 2+ consecutive weeks
- All material divergences investigated and resolved
- Human owner sign-off
- Control review complete
`);

write('03_AP_AGENT_OS_PRO/Testing/UAT_TEMPLATE.md', `# User Acceptance Testing Template

## Agent: _______________
## Version: _______________
## Tester: _______________
## Date: _______________

### Test Cases
| ID | Scenario | Input | Expected Output | Actual Output | Pass/Fail | Notes |
|----|----------|-------|-----------------|---------------|-----------|-------|
| 1 | | | | | | |

### Summary
- Total tests: ___
- Passed: ___
- Failed: ___
- Pass rate: ___%

### Sign-off
- [ ] All critical tests passed
- [ ] Failed tests documented with remediation plan
- [ ] Human owner approval to proceed

**Approved by:** _______________ **Date:** _______________
`);

write('03_AP_AGENT_OS_PRO/Templates/AGENT_CHARTER_TEMPLATE.md', `# Agent Charter

## Agent Name: _______________
## Agent ID: _______________
## Version: 1.0
## Effective Date: _______________

### Purpose
(One paragraph describing what this agent does and why)

### Scope
**In scope:** (processes, transaction types, entities)
**Out of scope:** (explicit exclusions)

### Human Owner
Name: _______________
Role: _______________
Backup: _______________

### Autonomy Level
Current: Level ___ — ___
Target (90 days): Level ___ — ___

### Inputs
| Input | Source | Frequency |
|-------|--------|-----------|
| | | |

### Outputs
| Output | Consumer | Format |
|--------|----------|--------|
| | | |

### KPIs
| KPI | Baseline | Target | Frequency |
|-----|----------|--------|-----------|
| | | | |

### Controls
| Control | Type | Evidence |
|---------|------|----------|
| | | |

### Escalation
| Trigger | Action | Escalate To |
|---------|--------|-------------|
| | | |

### Approval
- [ ] Human owner sign-off
- [ ] AP Manager approval
- [ ] IT/Security review (if applicable)
`);

write('03_AP_AGENT_OS_PRO/Templates/SOP_TEMPLATE.md', `# Standard Operating Procedure

## SOP: _______________
## Process: _______________
## Version: 1.0
## Owner: _______________

### Purpose
### Scope
### Responsibilities (RACI)
| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| | | | | |

### Procedure
| Step | Action | System | Agent/Human | Control |
|------|--------|--------|-------------|---------|
| 1 | | | | |

### Exception Handling
| Exception | Action | Escalation |
|-----------|--------|------------|
| | | |

### Related Documents
- Agent Charter: ___
- Control Matrix: ___
- KPI Scorecard: ___
`);

write('03_AP_AGENT_OS_PRO/Templates/RACI_TEMPLATE.md', `# RACI Matrix — AP Agent Operating Model

| Activity | AP Manager | Agent Owner | AP Team | IT | Procurement | Controller |
|----------|-----------|-------------|---------|-----|-------------|------------|
| Agent deployment | A | R | C | C | I | I |
| Agent performance review | A | R | C | I | I | I |
| Autonomy progression | A | R | I | C | I | C |
| Control incident response | A | R | C | R | I | C |
| KPI reporting | A | R | C | I | I | I |
| Exception resolution | I | C | R | I | C | I |
| Payment authorisation | C | I | C | I | I | A |
| Month-end close | C | C | R | I | I | A |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*
`);

write('03_AP_AGENT_OS_PRO/Controls/RISK_REGISTER_TEMPLATE.md', `# Risk Register

| Risk ID | Description | Agent | Likelihood | Impact | Risk Level | Control | Owner | Status |
|---------|-------------|-------|------------|--------|------------|---------|-------|--------|
| R-001 | Incorrect automated matching leads to wrong payment | AGT-03 | Medium | High | High | Human approval for out-of-tolerance matches | AP Manager | Active |
| R-002 | Agent hallucination produces incorrect recommendation | All | Low | Medium | Medium | Confidence threshold + human review | Agent Owner | Active |
| R-003 | Prompt injection via invoice content | All | Low | High | Medium | Input sanitisation + output validation | IT Security | Active |
| R-004 | Unauthorized autonomy progression | AGT-16 | Low | High | Medium | Progression approval workflow | AP Manager | Active |
| R-005 | Duplicate payment due to agent failure | AGT-10/12 | Low | Critical | High | Mandatory pre-payment human review | AP Manager | Active |
`);

write('03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_SCORECARD.csv', `kpi_id,category,metric,baseline,target,current,status,review_date,owner
OP-001,Operational,STP rate (%),,50,,Not started,,AP Manager
OP-004,Operational,Time to posting (days),,5,,Not started,,AP Manager
OP-002,Operational,Exception resolution rate (%),,85,,Not started,,AP Manager
FIN-001,Financial,Cost per invoice ($),,7.00,,Not started,,AP Manager
RISK-001,Risk,Control breaches,,0,,Not started,,AP Manager
`);

write('03_AP_AGENT_OS_PRO/Business_Case/AGENT_ECONOMICS_MODEL.csv', `cost_component,monthly_cost,notes
LLM API costs (per agent),200,Estimate based on volume
Automation platform licence,500,If applicable
Human oversight (hours × rate),2000,FTE fraction for agent management
Training and change management,0,One-time in implementation
Total monthly agent cost,2700,
Cost per invoice (5000/mo),0.54,=total/volume
Cost per exception (700/mo at 14%),3.86,=total/exceptions
Human cost per invoice (benchmark),9.40,Ardent Partners 2024
Human cost per exception (est),45,Minutes × rate
`);

// Team Edition
write('04_AP_AGENT_OS_TEAM/Workshop/WORKSHOP_FACILITATION_GUIDE.md', `# AP Agent OS Workshop — Facilitation Guide

## Duration: 4 hours
## Audience: AP team, AP manager, process owners, IT liaison
## Materials: Workshop deck, exercise worksheets, process discovery templates

### Agenda
| Time | Session | Activity |
|------|---------|----------|
| 0:00-0:30 | Opening | Context, objectives, diagnostic results review |
| 0:30-1:15 | Current State | Process mapping exercise (breakout) |
| 1:15-1:30 | Break | |
| 1:30-2:15 | Agent Architecture | 16-agent overview, select first 3 candidates |
| 2:15-3:00 | Governance | Control matrix exercise, autonomy model |
| 3:00-3:45 | Implementation | Roadmap planning, KPI baseline, first agent charter |
| 3:45-4:00 | Close | Next steps, owners, timeline |

### Exercise 1: Process Mapping
Teams map one AP subprocess using PROCESS_DISCOVERY_TEMPLATE.

### Exercise 2: Agent Selection
Using Human vs Agent Framework, mark each process step.

### Exercise 3: Control Design
Complete 3 control rows for selected first agent.

### Exercise 4: 90-Day Plan
Populate implementation roadmap with dates and owners.
`);

write('04_AP_AGENT_OS_TEAM/Workshop/WORKSHOP_DECK.md', `# AP Agent OS Workshop Deck

## Slide 1: Title
Evidence Room AP Agent OS Workshop
[Organisation Name] | [Date]

## Slide 2: Objectives
- Understand the AP agent operating model
- Map current AP process and identify agent candidates
- Design governance and controls for first agent
- Create 90-day implementation plan

## Slide 3: The AP Challenge
- $9.40 average cost per invoice (Ardent Partners, 2024)
- 14% exception rate
- 32.6% straight-through processing
- 9.15 days average processing time

## Slide 4: What Is an AP Agent?
An AI agent with a job description, human owner, controls, KPIs, and earned autonomy.

## Slide 5: 16-Agent Architecture
[Grid of 16 agents — see website]

## Slide 6: Responsibility Model
Levels 0-4 with progression criteria

## Slide 7: Exception Taxonomy
27 categories with resolution paths

## Slide 8: Governance Framework
23 control areas

## Slide 9: Human vs Agent
Decision framework matrix

## Slide 10: First Agent Selection
Criteria and recommendations

## Slide 11: Implementation Roadmap
10-phase deployment framework

## Slide 12: KPI Framework
Activity → Operational → Financial → Risk

## Slide 13: Exercise Instructions
Breakout group assignments

## Slide 14: 90-Day Plan Template
Timeline with milestones

## Slide 15: Next Steps
Owners, dates, follow-up cadence
`);

write('04_AP_AGENT_OS_TEAM/Executive/CFO_TRANSFORMATION_DECK.md', `# CFO AP Transformation Deck

## Slide 1: Executive Summary
AP Agent Operating System — governed AI across Accounts Payable

## Slide 2: Why Now
Industry benchmarks + AI maturity + competitive pressure

## Slide 3: Current State
[Your baseline KPIs vs industry]

## Slide 4: Target Operating Model
Agent workforce with human accountability

## Slide 5: Agent Architecture
16 agents, phased deployment

## Slide 6: Governance & Controls
Framework summary, SoD, audit readiness

## Slide 7: Business Case
Conservative / Base / Upside scenarios

## Slide 8: Implementation Roadmap
Phased approach, 4-6 weeks per agent

## Slide 9: Investment Required
Tool costs, implementation effort, change management

## Slide 10: Expected Outcomes
KPI targets, benefits timeline

## Slide 11: Risk & Mitigation
Key risks with controls

## Slide 12: Decision Required
Sponsor commitment, first agent approval, resource allocation
`);

write('04_AP_AGENT_OS_TEAM/Implementation/IMPLEMENTATION_PLAYBOOK.md', `# Implementation Playbook — Team Edition

## Pre-Implementation (Week 0)
- [ ] Executive sponsor confirmed
- [ ] AP process owner assigned
- [ ] Diagnostic completed
- [ ] Baseline KPIs recorded
- [ ] Workshop conducted
- [ ] First agent selected and chartered

## Phase 1: Foundation (Weeks 1-2)
- [ ] Process discovery completed
- [ ] Exception taxonomy customised
- [ ] Control matrix populated
- [ ] Integration/access confirmed

## Phase 2: Build & Test (Weeks 3-4)
- [ ] Agent configured
- [ ] Historical testing complete
- [ ] UAT passed
- [ ] Shadow mode initiated

## Phase 3: Pilot (Weeks 5-8)
- [ ] Controlled pilot running
- [ ] Weekly KPI review
- [ ] Divergence log maintained
- [ ] Control incidents tracked

## Phase 4: Review (Week 9)
- [ ] Performance review
- [ ] Go/no-go for autonomy progression
- [ ] Benefits assessment
- [ ] Second agent selection

## Ongoing
- [ ] Monthly KPI review
- [ ] Quarterly control certification
- [ ] Benefits tracker updated
- [ ] Steering committee cadence
`);

write('04_AP_AGENT_OS_TEAM/Training/CHANGE_MANAGEMENT_TOOLKIT.md', `# AP Team Change Management Toolkit

## Communication Plan
| Audience | Message | Channel | Timing |
|----------|---------|---------|--------|
| AP team | Agents assist, not replace | Team meeting | Week 0 |
| Approvers | Approval authority unchanged | Email | Week 0 |
| IT | Integration requirements | Workshop | Week 1 |
| Executive | Business case and progress | Steering committee | Monthly |

## Key Messages
1. Agents earn responsibility — they don't get full autonomy on day one
2. Your judgment is more valuable, not less
3. Agents handle repetitive analysis; you handle exceptions and relationships
4. Every agent has a human owner accountable for its performance

## Resistance Mitigation
| Concern | Response |
|---------|----------|
| "AI will replace my job" | Agents handle repetitive work; team focuses on judgment and improvement |
| "I don't trust AI with invoices" | Agents start in Observe mode; humans approve all actions |
| "More technology to learn" | Agents work within existing workflows; minimal new tools |
| "What if it makes a mistake?" | Controls, shadow mode, and instant override capability |

## Training Plan
- Week 0: Operating model overview (1 hour)
- Week 2: First agent walkthrough (30 min)
- Week 4: Shadow mode review (30 min)
- Week 8: Pilot feedback session (1 hour)
`);

// Custom Blueprint
write('05_CUSTOM_BLUEPRINT/SERVICE_BROCHURE.md', `# AP Transformation Blueprint
## Productised Service — $1,500–3,000

### What You Receive
1. Current-state assessment
2. AP AI maturity score
3. Opportunity map
4. Recommended agent architecture
5. Prioritised use cases
6. Operating model design
7. KPI baseline framework
8. Controls framework
9. Business case (3 scenarios)
10. Transformation roadmap
11. 90-day implementation plan
12. Executive presentation (PPT)

### Timeline
5–10 business days after intake completion

### How It Works
1. Purchase via Lemon Squeezy
2. Complete structured intake questionnaire
3. Evidence Room analyses your inputs (AI-assisted, human-reviewed)
4. Receive deliverable package
5. Optional: 30-minute review call

### Enterprise Tier ($3,000)
- Multi-entity assessment
- Stakeholder interview synthesis
- Custom exception taxonomy
- Detailed integration assessment
`);

write('05_CUSTOM_BLUEPRINT/INTAKE_QUESTIONNAIRE.md', `# AP Transformation Blueprint — Intake Questionnaire

## Organisation
1. Company name
2. Industry
3. Number of employees
4. Number of legal entities
5. Countries of operation

## AP Operations
6. Monthly invoice volume
7. Number of AP FTE
8. ERP system(s)
9. AP automation tool(s) in use
10. Current cost per invoice (if known)
11. Current exception rate (if known)
12. Current STP rate (if known)
13. Top 5 exception categories
14. Average processing time

## Technology
15. API/integration capability (1-5)
16. Historical data availability
17. Current AI/automation usage
18. Data quality assessment (1-5)

## Governance
19. AI governance framework exists? (Y/N)
20. Internal audit requirements
21. Regulatory environment
22. Segregation of duties maturity (1-5)

## Objectives
23. Primary transformation objective
24. Timeline expectations
25. Budget range
26. Executive sponsor
27. Biggest concern about AI in AP

## Deliverables
28. Preferred deliverable format
29. Stakeholder presentation required? (Y/N)
30. Additional context
`);

write('05_CUSTOM_BLUEPRINT/FULFILMENT_WORKFLOW.md', `# Fulfilment Workflow

## Step 1: Order Received
- Lemon Squeezy webhook triggers fulfilment
- Customer receives intake questionnaire link

## Step 2: Intake Review (Day 1)
- AI-assisted analysis of questionnaire responses
- Maturity scoring
- Initial opportunity identification

## Step 3: Deliverable Generation (Days 2-5)
- Current-state assessment
- Agent architecture recommendation
- Business case modelling
- Roadmap and implementation plan
- Executive presentation

## Step 4: Quality Review (Day 5-6)
- Human review of all deliverables
- Evidence check against research ledger
- Consistency validation

## Step 5: Delivery (Day 7-10)
- Package delivered via secure download
- Review call scheduled (optional)
- Feedback survey sent

## AI-Assisted Components
- Intake analysis and scoring
- Benchmark comparison
- Draft business case calculations
- Initial agent architecture mapping

## Human-Required Components
- Quality review
- Recommendation validation
- Executive presentation refinement
- Customer review call
`);

// Legal
write('10_LEGAL_AND_LICENSING/LICENCE_TERMS.md', `# Evidence Room — Licence Terms (Draft)

**IMPORTANT: These terms require review by qualified legal counsel before commercial use.**

## Individual Licence (Starter / Professional)
- Licensed to one named individual
- Use for internal business purposes
- May not redistribute, resell, or sublicense
- May not publish templates as purchaser's own product
- May not use to create competing commercial products

## Team Licence (Team Edition)
- Licensed for internal use within one defined organisation
- Up to 25 named users within the purchasing organisation
- Same restrictions as Individual Licence
- Organisation must be specified at purchase

## Custom Blueprint
- Client owns deliverables created specifically for them
- Evidence Room retains framework and methodology IP

## General
- Digital product — no refunds after download (recommend 30-day satisfaction guarantee — confirm with counsel)
- Evidence Room retains all intellectual property in frameworks, methodologies, and templates
- Purchaser may adapt templates for internal use only
- No warranty of specific business outcomes
- Limitation of liability to purchase price

*Draft v1.0.0 — Requires professional legal review.*
`);

write('10_LEGAL_AND_LICENSING/DISCLAIMER.md', `# Product Disclaimer

Evidence Room AP Agent OS is an educational and implementation toolkit. It does not constitute:

- Accounting, tax, or legal advice
- A guarantee of cost savings, efficiency improvements, or ROI
- Fraud detection or prevention software
- A payment system or ERP replacement
- Regulatory compliance certification

All benchmarks cited are from independent research (primarily Ardent Partners) and are provided for illustrative comparison. Your results will vary based on your systems, data quality, process complexity, and organisational factors.

AI agents described in this product require proper governance, testing, and human oversight before deployment. Payment authorisation must always remain human-controlled.

Consult qualified professionals for legal, tax, accounting, and regulatory matters.
`);

write('10_LEGAL_AND_LICENSING/IP_CLEANLINESS_CHECKLIST.md', `# IP Cleanliness Checklist

## Pre-Release Verification

- [ ] All content independently authored
- [ ] No confidential employer information included
- [ ] No proprietary client data or process maps
- [ ] No copyrighted consulting materials reproduced
- [ ] No conference slides reproduced without permission
- [ ] No real internal company screenshots
- [ ] No employer-specific workflows
- [ ] Generic professional experience only informs conceptual understanding
- [ ] All statistics sourced and documented in Research Ledger
- [ ] Vendor claims clearly marked as vendor-originated
- [ ] Illustrative examples clearly marked
- [ ] Evidence Room frameworks marked as framework
- [ ] Competitor analysis based on public information only
- [ ] No proprietary material cloned from any vendor
- [ ] Trademark search conducted for "Evidence Room"
- [ ] Licence terms reviewed by legal counsel

**Certified by:** _______________ **Date:** _______________
`);

// Brand
write('06_SALES_AND_MARKETING/BRAND_SYSTEM.md', `# Evidence Room Brand System

## Brand Idea
**Evidence over experimentation.** Finance AI that earns responsibility through measurable operating performance.

## Wordmark
**Evidence Room** — Georgia serif for "Evidence", clean sans for "Room" (or unified Georgia)
Accent: gold (#C4A35A) on navy (#0B1426)

## Typography
- Display: Georgia, Times New Roman (institutional)
- Body: Inter, SF Pro, system sans-serif
- Data: SF Mono, Fira Code (monospace for metrics)

## Colour System
| Token | Hex | Usage |
|-------|-----|-------|
| Navy | #0B1426 | Primary background, text |
| Navy Light | #152238 | Cards, surfaces |
| Slate | #3D4F6F | Secondary text |
| Gold | #C4A35A | Accent, CTAs, data highlights |
| White | #FAFBFC | Backgrounds |
| Green | #1A7A4C | Positive metrics |
| Red | #B83232 | Risk indicators |

## Design Principles
- Institutional, not startup
- Data-forward, not decorative
- Restrained sophistication
- No robots, neon brains, circuit boards, or purple gradients
- Think: Bloomberg meets McKinsey meets Stripe

## Iconography
- Minimal line icons
- Data/chart motifs
- Evidence/document motifs
- No AI clichés

## Voice
Intelligent. Concise. Credible. Executive. Specific. Non-hype.
`);

// Revenue model
write('06_SALES_AND_MARKETING/REVENUE_SCENARIOS.csv', `scenario,monthly_starter_sales,monthly_pro_sales,monthly_team_sales,monthly_blueprint_sales,monthly_revenue,annual_revenue,notes
Conservative,5,10,2,1,3585,43020,Launch phase months 1-3
Base,15,30,5,2,10835,130020,Months 4-6 growth
Upside,30,60,10,5,22070,264840,Months 7-12 with content engine
Year 2 Base,40,80,15,8,29820,357840,Established brand + affiliates
`);

// Scale roadmap
write('06_SALES_AND_MARKETING/SCALE_ROADMAP.md', `# Evidence Room Scale Roadmap

## Phase 1: Digital Product (Current)
AP Agent OS — validate demand, generate revenue, build brand

## Phase 2: Services (Months 3-6)
Custom Blueprint → implementation consulting → retainer advisory

## Phase 3: Community (Months 6-12)
User community, case studies, certification programme

## Phase 4: Platform (Year 2)
Evidence Room SaaS — agent registry, KPI dashboard, governance portal

## Phase 5: Horizontal Expansion (Year 2-3)
AR Agent OS → Close Agent OS → Treasury → Reconciliations → Controls → FP&A

## Revenue Progression
Digital products ($79-499) → Services ($1.5-50K) → Subscription ($200-2000/mo) → Platform (enterprise)
`);

console.log('Remaining content files generated.');
