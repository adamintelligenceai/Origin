"""Content generation modules for Evidence Room AP Agent OS."""

import json
import textwrap
from datetime import datetime
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt, RGBColor


def _w(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def write_research(root: Path, research: list):
    lines = ["# Evidence Room — Research Ledger\n", f"*Last updated: {datetime.now().strftime('%Y-%m-%d')}*\n"]
    lines.append("| Claim | Source | Date | Type | URL |")
    lines.append("|-------|--------|------|------|-----|")
    for r in research:
        claim = r["claim"][:80] + "..." if len(r["claim"]) > 80 else r["claim"]
        lines.append(f"| {claim} | {r['source']} | {r['date']} | {r['type']} | {r['url']} |")
    lines.append("\n## Detailed Entries\n")
    for i, r in enumerate(research, 1):
        lines.append(f"### {i}. {r['claim']}\n")
        lines.append(f"- **Source:** {r['source']}")
        lines.append(f"- **Date:** {r['date']}")
        lines.append(f"- **Context:** {r['context']}")
        lines.append(f"- **Type:** {r['type']}")
        lines.append(f"- **URL:** {r['url']}\n")
    _w(root / "09_RESEARCH/Research_Ledger.md", "\n".join(lines))
    _w(root / "09_RESEARCH/Evidence_Standards.md", """# Evidence Standards

## Classification
- **Independent evidence:** Gartner, Ardent Partners, APQC, academic research
- **Vendor claims:** Platform providers — use with attribution, not as sole proof
- **Illustrative examples:** Clearly labelled; not presented as benchmarks
- **Evidence Room frameworks:** Original methodology — distinguished from third-party data

## Usage Rules
1. Never invent statistics
2. Cite selectively in customer-facing materials
3. Maintain this ledger for all quantitative claims
4. Separate benchmarks from projections in business case models
""")


def write_competitor_analysis(root: Path):
    _w(root / "09_RESEARCH/Competitor_Analysis.md", """# Competitor & Market Analysis

## Market Landscape

### AP Automation Platforms (Gartner MQ, March 2025 — 14 vendors)
Coupa, Basware, Medius, AvidXchange, Esker, Airbase, GEP, Ivalua, JAGGAER, Pagero, Quadient, Serrala, SoftCo, Zycus

**What they do:** Invoice capture, workflow, matching, payment facilitation, supplier management
**What they don't do:** Provide an operating system for designing, governing, and scaling a cross-platform AI agent workforce

### Finance AI / Agent Platforms
UiPath, Automation Anywhere, Microsoft Copilot, SAP Joule — horizontal automation with finance modules

**Gap:** Strong on task automation; weak on agent responsibility progression, AP-specific governance, and earned-autonomy frameworks

### Consulting Toolkits & Template Marketplaces
Generic AI prompt packs, transformation slide decks, AP checklists on marketplaces

**Gap:** No integrated agent architecture, no control matrix, no KPI framework tied to agent performance

## Evidence Room Differentiation

| Dimension | AP Automation Vendors | Prompt Packs | Evidence Room |
|-----------|----------------------|--------------|---------------|
| Scope | Replace/improve AP stack | Generic AI prompts | Agent layer across existing stack |
| Governance | Product controls | None | Full agent governance framework |
| Responsibility model | Binary on/off automation | N/A | 5-level earned autonomy |
| Implementation | Software deployment | Copy-paste | 10-step methodology with templates |
| Evidence base | Vendor benchmarks | None | Research ledger with citations |
| Target buyer | IT + AP systems | Individuals | CFO, Transformation, AP leadership |

## Market Gaps Evidence Room Fills
1. **Operating model material** — How to structure an AP agent workforce (missing from all competitors)
2. **Governance-first positioning** — Controls, segregation, audit evidence for AI agents
3. **Earned responsibility framework** — No competitor offers a maturity-based autonomy model
4. **ERP-agnostic agent design** — Works across SAP, Oracle, D365, NetSuite without replacing them
5. **Implementation-ready toolkits** — Not software, not theory — actionable frameworks

## Price Signals
- AP automation platforms: $50K–$500K+ annual enterprise contracts
- Finance transformation consulting: $200–$400/hour
- Digital product templates: $29–$199 on marketplaces
- Evidence Room positioning: $79–$499 digital products + $1,500–$3,000 productised service

## Customer Pain Points (Validated)
- 25% of finance orgs uncertain how to move from AI planning to piloting (Gartner 2025)
- 91% report low/moderate initial AI impact (Gartner 2025)
- Average exception rate 14%, STP only 32.6% (Ardent Partners 2024)
- AP automation is #2 finance AI use case at 37% — demand exists, implementation guidance doesn't
""")


def write_governance(root: Path):
    _w(root / "03_AP_AGENT_OS_PRO/Governance/AP_Agent_Governance_Framework.md", """# AP Agent Governance Framework

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
""")


def write_methodology(root: Path):
    _w(root / "03_AP_AGENT_OS_PRO/Process_Mapping/Evidence_Room_Methodology.md", """# Evidence Room Process-to-Agent Methodology

## Overview
A repeatable 10-step methodology for converting existing AP processes into governed AI-agent workflows.

## Step 1 — Observe
Record real process walkthroughs with AP staff. Capture screen recordings where permitted.
**Template:** `Process_Discovery_Template.docx`
**Output:** Raw observation notes, screen recordings

## Step 2 — Transcribe
Generate transcripts of process discussions and walkthroughs.
**Tool:** Meeting transcription (Teams, Otter, etc.)
**Output:** Timestamped transcript

## Step 3 — Extract
Identify: steps, systems, decisions, business rules, inputs, outputs, exceptions, controls, dependencies
**Template:** `Process_Extraction_Worksheet.docx`
**Output:** Structured extraction document

## Step 4 — Structure
Convert into: process map, decision tree, exception taxonomy, control map, RACI, SOP
**Templates:** `Process_Map_Template.docx`, `RACI_Template.docx`, `SOP_Template.docx`
**Output:** Process documentation package

## Step 5 — Agentise
Determine: what remains human, what AI recommends, prepares, executes; where deterministic automation is preferable
**Framework:** Human-vs-Agent Decision Framework (Starter Kit)
**Output:** Agent assignment map with autonomy levels

## Step 6 — Test
Run historical cases against agent logic. Measure accuracy against human baseline.
**Template:** `UAT_Template.docx`, `Testing_Scripts.md`
**Output:** Test results with accuracy metrics

## Step 7 — Shadow
Agent operates without action permissions. Compare outputs to actual outcomes.
**Template:** `Shadow_Mode_Methodology.md`
**Output:** Shadow performance report (minimum 2 weeks)

## Step 8 — Controlled Pilot
Limited users / transactions / categories. Human approval for all actions.
**Template:** `Pilot_Methodology.md`
**Output:** Pilot results with KPI comparison

## Step 9 — Measure
Compare against baseline. QA sample minimum 5% of outputs.
**Template:** `KPI_Scorecard.xlsx`
**Output:** Performance report with go/no-go recommendation

## Step 10 — Expand Responsibility
Only after evidence demonstrates adequate performance. Autonomy increase requires signed approval.
**Template:** `Agent_Charter.docx` (autonomy section)
**Output:** Autonomy progression decision record
""")


def write_agent_library(root: Path, agents: list):
    for a in agents:
        content = f"""# Agent {a['id']}: {a['name']}

## Purpose
{a['purpose']}

## Job Description
The {a['name']} is responsible for {a['purpose'].lower().rstrip('.')}. It operates under the supervision of {a['human_owner']} at Autonomy Level {a['autonomy_default']} by default.

## Inputs
{chr(10).join('- ' + i for i in a['inputs'])}

## Tools & Data Required
{chr(10).join('- ' + t for t in a['tools'])}

## Responsibilities
{chr(10).join('- ' + r for r in a['responsibilities'])}

## Explicit Exclusions
{chr(10).join('- ' + e for e in a['exclusions'])}

## Human Owner
{a['human_owner']}

## Approval Requirements
{a['approval_requirements']}

## Escalation Criteria
{a['escalation']}

## Output Standard
{chr(10).join('- ' + o for o in a['outputs'])}

## Control Requirements
{chr(10).join('- ' + c for c in a['controls'])}

## KPIs
{chr(10).join('- ' + k for k in a['kpis'])}

## Default Autonomy Level
Level {a['autonomy_default']}

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
"""
        fname = f"Agent_{a['id']:02d}_{a['name'].replace(' ', '_').replace('/', '_')}.md"
        _w(root / f"03_AP_AGENT_OS_PRO/Agent_Library/{fname}", content)


def write_free_tier(root: Path):
    _w(root / "01_FREE_AP_AI_READINESS/Readme.md", """# AP AI Readiness Diagnostic (Free)

Complete the diagnostic spreadsheet to assess your organisation's readiness for AP AI agents.

## What's Included
- 20 diagnostic questions across 6 domains
- Maturity model (4 levels)
- Scoring worksheet
- Opportunity heatmap guidance
- Baseline KPI worksheet
- Business case starter

## How to Use
1. Open `AP_AI_Readiness_Diagnostic.xlsx`
2. Score each question 1-5
3. Review your maturity level
4. Identify your top 3 agent opportunities
""")


def write_starter_tier(root: Path, agents: list, exceptions: list):
    top10 = agents[:10]
    agent_summary = "\n".join(f"### {a['id']}. {a['name']}\n{a['purpose']}\n" for a in top10)
    _w(root / "02_AP_AGENT_STARTER/AP_Agent_Operating_Model.md", f"""# AP Agent Operating Model (Starter)

## The Evidence Room Principle
AI agents earn responsibility through demonstrated performance — like employees gaining trust over time.

## Five-Level Responsibility Model
| Level | Name | Capability |
|-------|------|------------|
| 0 | Observe | Review only |
| 1 | Recommend | Suggest actions |
| 2 | Prepare | Draft actions for approval |
| 3 | Execute | Act within guardrails |
| 4 | Managed Autonomy | Independent with exception oversight |

## Top 10 AP Agents
{agent_summary}

## Human-vs-Agent Decision Framework
| Task Type | Recommended Approach |
|-----------|---------------------|
| Rule-based, high volume, low risk | Deterministic automation first |
| Pattern recognition, medium risk | AI agent at Level 1-2 |
| Judgment, high value, control-critical | Human with AI assist (Level 0-1) |
| Supplier communication | AI drafts, human approves (Level 2) |
| Payment authorisation | Always human |

## Implementation Checklist
- [ ] Complete AP AI Readiness Diagnostic
- [ ] Baseline current KPIs (cost/invoice, exception rate, STP)
- [ ] Map current AP process (use Process Mapping Template)
- [ ] Select first agent (recommend: Exception Triage or Invoice Validation)
- [ ] Write Agent Charter for first agent
- [ ] Define controls and KPIs
- [ ] Run historical test cases
- [ ] Enter shadow mode (2+ weeks)
- [ ] Controlled pilot
- [ ] Measure and decide on autonomy progression
""")
    exc_table = "\n".join(f"| {e['code']} | {e['category']} | {e['risk']} | {e['agent']} |" for e in exceptions[:15])
    _w(root / "02_AP_AGENT_STARTER/AP_Exception_Taxonomy_Summary.md", f"""# AP Exception Taxonomy (Starter Summary)

| Code | Category | Risk | Primary Agent |
|------|----------|------|---------------|
{exc_table}

*Full taxonomy with 27 categories in Professional tier.*
""")


def write_professional_tier(root: Path, agents: list, exceptions: list):
    _w(root / "03_AP_AGENT_OS_PRO/Testing/Shadow_Mode_Methodology.md", """# Shadow Mode Methodology

## Purpose
Allow agents to process real transactions without taking any action, building evidence for autonomy progression.

## Duration: Minimum 2 weeks, recommended 4 weeks

## Setup
1. Agent configured with Level 0 (Observe) permissions
2. All outputs logged but not acted upon
3. Human processes transactions normally in parallel
4. Daily comparison of agent output vs human decision

## Metrics to Track
- Agreement rate (agent vs human)
- False positive rate
- False negative rate
- Processing time comparison
- Edge cases identified

## Exit Criteria
- Agreement rate ≥ 95% for target transaction types
- Zero critical false negatives
- Human owner sign-off
- Control review complete
""")
    _w(root / "03_AP_AGENT_OS_PRO/Testing/Pilot_Methodology.md", """# Controlled Pilot Methodology

## Scope Definition
- **Users:** Named pilot team (3-5 AP staff)
- **Volume:** 10-20% of daily invoice volume
- **Categories:** 1-2 exception types or 1 supplier category
- **Duration:** 4-6 weeks

## Governance
- Agent at Level 2 (Prepare) — all actions require approval
- Daily standup for first week
- Weekly performance review
- Escalation path documented

## Success Criteria
- KPI improvement vs baseline (any 2 of: resolution time, exception rate, cost/invoice)
- No control breaches
- User satisfaction ≥ 4/5
- Human owner recommends progression to Level 3
""")
    _w(root / "03_AP_AGENT_OS_PRO/Testing/Testing_Scripts.md", """# Agent Testing Scripts

## Test Case Structure
Each test case includes: ID, Description, Input Data, Expected Output, Actual Output, Pass/Fail, Notes

## Invoice Validation Agent — Sample Tests
| ID | Scenario | Expected |
|----|----------|----------|
| TV-001 | Valid invoice, all fields correct | PASS |
| TV-002 | Duplicate invoice number, same supplier | FAIL — duplicate |
| TV-003 | Missing tax field | WARNING — tax issue |
| TV-004 | Amount $0.00 | FAIL — invalid amount |
| TV-005 | Supplier not in master | FAIL — unknown supplier |

## Matching Agent — Sample Tests
| ID | Scenario | Expected |
|----|----------|----------|
| TM-001 | Exact PO/price/qty match | AUTO-MATCH |
| TM-002 | Price variance 2% (tolerance 5%) | AUTO-MATCH |
| TM-003 | Price variance 8% (tolerance 5%) | EXCEPTION — price mismatch |
| TM-004 | No goods receipt | EXCEPTION — missing receipt |
| TM-005 | Multi-line, mixed match results | PARTIAL MATCH per line |

*Expand with 50+ test cases per agent for production readiness.*
""")


def write_team_tier(root: Path):
    _w(root / "04_AP_AGENT_OS_TEAM/Workshop/Workshop_Agenda.md", """# AP Agent OS Workshop — Facilitator Guide

## Duration: Half day (4 hours)

### Module 1: The AP Agent Opportunity (45 min)
- Current state benchmarks (Ardent Partners data)
- What agentic AP actually means
- Evidence Room responsibility model
- Exercise: Map your top 5 AP pain points

### Module 2: Agent Architecture (60 min)
- 16-agent overview
- Select your first 3 agents
- Exercise: Human-vs-Agent decision for each process step

### Module 3: Governance & Controls (45 min)
- Control framework walkthrough
- Segregation of duties for agents
- Exercise: Complete control matrix for first agent

### Module 4: Implementation Planning (60 min)
- 10-step methodology
- 90-day roadmap exercise
- Business case development
- Exercise: Draft first Agent Charter

### Module 5: Next Steps (30 min)
- Commitments and owners
- KPI baseline assignment
- Steering committee formation
""")
    _w(root / "04_AP_AGENT_OS_TEAM/Change_Management/AP_Change_Management_Toolkit.md", """# AP Team Change Management Toolkit

## Stakeholder Map
| Stakeholder | Interest | Concern | Engagement |
|-------------|----------|---------|------------|
| CFO | ROI, controls | AI risk | Executive sponsor |
| AP Manager | Efficiency | Team impact | Champion |
| AP Staff | Job security | Learning curve | Early involvement |
| IT | Integration | Security | Technical partner |
| Internal Audit | Controls | Compliance | Governance reviewer |
| Procurement | PO quality | Blame | Process partner |

## Communication Plan
- **Week 1:** Executive briefing (why agents, not why AI)
- **Week 2:** AP team introduction (what changes, what doesn't)
- **Week 3:** Pilot announcement (volunteers, scope, timeline)
- **Ongoing:** Monthly progress updates with metrics

## Resistance Management
| Objection | Response |
|-----------|----------|
| "AI will replace us" | Agents handle repetitive analysis; humans handle judgment, relationships, controls |
| "We tried automation before" | Agents earn responsibility — start small, prove value, expand |
| "Our processes are too complex" | Start with highest-volume, lowest-risk exception type |
| "IT won't support this" | Evidence Room is methodology-first; works with existing tools |
""")


def write_custom_blueprint(root: Path):
    _w(root / "05_CUSTOM_BLUEPRINT/Intake_Questionnaire.md", """# AP Transformation Blueprint — Client Intake Questionnaire

## Section A: Organisation
1. Company name and industry
2. Number of employees
3. Number of business units / legal entities
4. ERP system(s) in use
5. AP team size and structure (centralised vs decentralised)

## Section B: AP Operations
6. Monthly invoice volume
7. Percentage PO-based vs non-PO
8. Percentage electronic vs paper invoices
9. Current exception rate (if known)
10. Current cost per invoice (if known)
11. Average invoice processing time
12. Top 5 exception types by volume

## Section C: Technology
13. Current AP automation tools
14. OCR/IDP in use?
15. Workflow automation platform?
16. AI tools currently used in Finance?
17. Integration maturity (1-5)

## Section D: Governance & Controls
18. Existing AI governance framework?
19. Segregation of duties for AP?
20. Recent audit findings related to AP?
21. Data privacy requirements

## Section E: Transformation Goals
22. Primary objectives (cost, speed, controls, capacity)
23. Timeline expectations
24. Budget range
25. Executive sponsor name and role
26. Biggest concern about AP AI agents

## Fulfilment Workflow
1. Client completes questionnaire (online form or document)
2. Evidence Room reviews (1 business day)
3. AI-assisted analysis of responses
4. Human review and customisation (2-3 business days)
5. Deliver: assessment, maturity score, agent architecture, roadmap, business case, executive presentation
6. 30-minute delivery call included
""")


def write_word_templates(root: Path, agents: list):
    templates = {
        "SOP_Template.docx": [
            {"h1": "Standard Operating Procedure", "body": ["[Process Name]", "[Version]", "[Effective Date]", "[Owner]"]},
            {"h2": "Purpose", "placeholder": "Describe the purpose of this procedure"},
            {"h2": "Scope", "placeholder": "Define what is and isn't covered"},
            {"h2": "Procedure Steps", "placeholder": "Number each step with decision points"},
            {"h2": "Exception Handling", "placeholder": "Reference exception taxonomy codes"},
            {"h2": "Controls", "placeholder": "List preventive and detective controls"},
            {"h2": "Related Documents", "placeholder": "Link to RACI, process map, agent charter"},
        ],
        "Agent_Charter.docx": [
            {"h1": "Agent Charter", "body": ["Agent Name: _______________", "Version: _______________", "Date: _______________"]},
            {"h2": "Purpose & Scope", "placeholder": "What this agent does and doesn't do"},
            {"h2": "Human Owner", "placeholder": "Named accountable person"},
            {"h2": "Autonomy Level", "placeholder": "Current level (0-4) with justification"},
            {"h2": "Inputs & Tools", "placeholder": "Data sources and systems required"},
            {"h2": "KPIs & Targets", "placeholder": "Metrics and target values"},
            {"h2": "Controls", "placeholder": "Reference control matrix entries"},
            {"h2": "Escalation", "placeholder": "When and how to escalate"},
            {"h2": "Approval", "body": ["Signed: _______________ Date: _______________"]},
        ],
        "Process_Discovery_Template.docx": [
            {"h1": "Process Discovery Worksheet"},
            {"h2": "Process Name", "placeholder": "e.g., Invoice Exception Resolution"},
            {"h2": "Participants", "placeholder": "Names and roles of interviewees"},
            {"h2": "Systems Used", "placeholder": "ERP, workflow, email, etc."},
            {"h2": "Step-by-Step Walkthrough", "placeholder": "Number each step observed"},
            {"h2": "Decision Points", "placeholder": "Where does someone make a judgment call?"},
            {"h2": "Exceptions Observed", "placeholder": "What goes wrong and how often?"},
            {"h2": "Controls Observed", "placeholder": "What checks exist today?"},
            {"h2": "Pain Points", "placeholder": "What frustrates the team?"},
            {"h2": "Agentisation Opportunities", "placeholder": "What could an agent do here?"},
        ],
        "RACI_Template.docx": [
            {"h1": "RACI Matrix"},
            {"h2": "Instructions", "body": ["R = Responsible, A = Accountable, C = Consulted, I = Informed"]},
            {"h2": "Matrix", "placeholder": "Activity | AP Staff | AP Manager | Requester | IT | Agent"},
        ],
        "Governance_Standard.docx": [
            {"h1": "AP Agent Governance Standard"},
            {"h2": "Policy Statement", "body": ["All AI agents operating in Accounts Payable must comply with this standard."]},
            {"h2": "Requirements", "bullets": [
                "Every agent has a named human owner",
                "Autonomy level documented and approved",
                "Controls mapped and tested quarterly",
                "All decisions logged with audit trail",
                "Override procedures documented",
                "Incident response plan in place",
            ]},
            {"h2": "Review Cycle", "body": ["This standard reviewed annually or upon material change."]},
        ],
        "UAT_Template.docx": [
            {"h1": "User Acceptance Testing Plan"},
            {"h2": "Agent Under Test", "placeholder": "Agent name and version"},
            {"h2": "Test Scope", "placeholder": "Transaction types and volume"},
            {"h2": "Test Cases", "placeholder": "Reference testing scripts document"},
            {"h2": "Pass Criteria", "body": ["Accuracy ≥ 95%", "Zero critical failures", "All controls validated"]},
            {"h2": "Sign-Off", "body": ["Tester: _______________", "Owner: _______________", "Date: _______________"]},
        ],
        "Risk_Assessment.docx": [
            {"h1": "Agent Risk Assessment"},
            {"h2": "Agent", "placeholder": "Agent name"},
            {"h2": "Risk Register", "placeholder": "Risk | Likelihood | Impact | Mitigation | Residual Risk"},
            {"h2": "Data Privacy Impact", "placeholder": "PII handled, retention, access controls"},
            {"h2": "Approval", "body": ["Assessed by: _______________", "Reviewed by: _______________"]},
        ],
        "Meeting_Guide.docx": [
            {"h1": "Stakeholder Interview Guide"},
            {"h2": "Opening", "body": ["Thank them for their time. Explain the purpose: understanding current AP processes to identify agent opportunities."]},
            {"h2": "Questions", "bullets": [
                "Walk me through what happens when an invoice arrives",
                "What are the most common problems you encounter?",
                "How long does it typically take to resolve an exception?",
                "What systems do you use and where are the gaps?",
                "If you could automate one thing, what would it be?",
                "What concerns do you have about AI in AP?",
            ]},
            {"h2": "Closing", "body": ["Confirm next steps. Request process documentation if available."]},
        ],
        "Implementation_Plan.docx": [
            {"h1": "90-Day AP Agent Implementation Plan"},
            {"h2": "Phase 1: Foundation (Days 1-30)", "bullets": ["Diagnostic", "Process mapping", "First agent charter", "Control definition", "KPI baseline"]},
            {"h2": "Phase 2: Build & Test (Days 31-60)", "bullets": ["Agent prototype", "Historical testing", "Shadow mode", "UAT"]},
            {"h2": "Phase 3: Deploy & Measure (Days 61-90)", "bullets": ["Controlled pilot", "Performance review", "Autonomy decision", "Scale plan"]},
        ],
    }
    for fname, sections in templates.items():
        folder = "03_AP_AGENT_OS_PRO/Templates" if fname != "Implementation_Plan.docx" else "04_AP_AGENT_OS_TEAM/Implementation"
        _build_docx(root / folder / fname, sections)


def _build_docx(path: Path, sections: list):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = Document()
    for sec in sections:
        if sec.get("h1"):
            doc.add_heading(sec["h1"], level=1)
        if sec.get("h2"):
            doc.add_heading(sec["h2"], level=2)
        for para in sec.get("body", []):
            doc.add_paragraph(para)
        for bullet in sec.get("bullets", []):
            doc.add_paragraph(bullet, style="List Bullet")
        if sec.get("placeholder"):
            doc.add_paragraph(f"[{sec['placeholder']}]")
            doc.add_paragraph("_" * 60)
    doc.save(str(path))


def write_pdfs(root: Path, agents: list, exceptions: list, build_pdf, version, date, brand):
    # Free Diagnostic PDF
    build_pdf(
        root / "01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.pdf",
        "AP AI Readiness Diagnostic",
        "Assess your organisation's readiness for AI agents in Accounts Payable",
        [
            {"h1": "Introduction", "body": [
                "This diagnostic helps Finance leaders assess organisational readiness for deploying AI agents across Accounts Payable. Complete the companion spreadsheet for scoring.",
                "Based on research from Gartner (59% of finance functions use AI; AP automation is the #2 use case at 37%) and Ardent Partners (average cost per invoice: $9.40; exception rate: 14%).",
            ]},
            {"h1": "Six Assessment Domains", "bullets": [
                "Process maturity and standardisation",
                "Data quality and electronic invoicing",
                "Technology integration and automation",
                "Governance and controls",
                "People and change readiness",
                "Agent-specific readiness",
            ]},
            {"h1": "Maturity Levels", "table": {"headers": ["Score", "Level", "Description"], "rows": [
                ["20-40", "Level 1 — Aware", "Conceptual understanding, no structured initiative"],
                ["41-60", "Level 2 — Exploring", "Pilots underway, governance emerging"],
                ["61-80", "Level 3 — Implementing", "Agents deployed with controls"],
                ["81-100", "Level 4 — Optimising", "Earned autonomy, continuous improvement"],
            ]}},
            {"h1": "Next Steps", "bullets": [
                "Complete the diagnostic spreadsheet",
                "Identify your top 3 agent opportunities",
                "Explore the AP Agent Starter Kit for implementation frameworks",
            ]},
        ],
        tier="Free · Tier 0",
    )

    # Starter Guide PDF
    build_pdf(
        root / "02_AP_AGENT_STARTER/AP_Agent_Starter_Guide.pdf",
        "AP Agent Starter Kit",
        "Your first step toward a governed AP agent workforce",
        [
            {"h1": "What You Get", "bullets": [
                "AP Agent Operating Model overview",
                "Top 10 AP agent blueprints",
                "AP exception taxonomy (15 categories)",
                "Human-vs-agent decision framework",
                "Process mapping template",
                "Agent job description template",
                "KPI scorecard",
                "Governance checklist",
                "Transformation roadmap",
                "Implementation checklist",
            ]},
            {"h1": "The Evidence Room Principle", "body": [
                "AI agents earn responsibility through demonstrated performance. Start at Level 0 (Observe), prove accuracy in shadow mode, and only then progress to higher autonomy levels.",
            ]},
            {"h1": "Recommended First Agent", "body": [
                "Most organisations should start with either the Exception Triage Agent (classifies and routes exceptions) or the Invoice Validation Agent (validates fields and detects duplicates). Both have clear inputs, measurable outputs, and low risk at Level 1-2.",
            ]},
        ],
        tier="Starter · $79",
    )

    # Professional OS PDF
    agent_rows = [[str(a["id"]), a["name"], f"Level {a['autonomy_default']}", a["human_owner"]] for a in agents]
    build_pdf(
        root / "03_AP_AGENT_OS_PRO/Evidence_Room_AP_Agent_OS_Professional.pdf",
        "AP Agent OS",
        "Professional Edition — Complete operating system for AP AI agents",
        [
            {"h1": "Complete 16-Agent Architecture", "body": [
                "This edition includes detailed specifications for all 16 agents in the AP Agent Stack, from Invoice Intake through to the AP Manager Orchestrator.",
            ], "table": {"headers": ["#", "Agent", "Default Level", "Owner"], "rows": agent_rows[:8]}},
            {"page_break": True, "table": {"headers": ["#", "Agent", "Default Level", "Owner"], "rows": agent_rows[8:]}},
            {"h1": "Governance Framework", "body": [
                "Every agent operates under the AP Agent Governance Framework covering human accountability, segregation of duties, least privilege, audit logging, and incident response.",
            ]},
            {"h1": "KPI Framework", "body": [
                "21 KPIs across four categories: Activity, Operational, Financial, and Risk/Control. Each with definition, formula, data source, and target direction.",
            ]},
            {"h1": "Implementation Path", "bullets": [
                "Phase 0: Baseline and readiness (1-2 weeks)",
                "Phase 1-2: Process discovery and agent specification (3-5 weeks)",
                "Phase 3-5: Data access, prototype, historical testing (5-9 weeks)",
                "Phase 6-7: Shadow mode and controlled pilot (6-10 weeks)",
                "Phase 8-10: Performance review, autonomy progression, scale",
                "Accelerated: 4-6 weeks for one well-bounded agent (depends on systems, data quality, governance)",
            ]},
        ],
        tier="Professional · $199",
    )

    # Team Playbook PDF
    build_pdf(
        root / "04_AP_AGENT_OS_TEAM/AP_Agent_OS_Team_Playbook.pdf",
        "AP Agent OS Team Edition",
        "Enterprise transformation toolkit for AP AI agent deployment",
        [
            {"h1": "Team Edition Contents", "bullets": [
                "Half-day workshop facilitator guide",
                "Stakeholder interview guide",
                "Process owner questionnaires",
                "Enterprise governance pack",
                "Steering committee templates",
                "Implementation tracker",
                "Benefits realisation tracker",
                "Training materials",
                "Change management toolkit",
                "Executive communication templates",
            ]},
            {"h1": "Workshop Overview", "body": [
                "The included half-day workshop takes your team from AP pain points to a 90-day implementation plan with named owners and KPI baselines.",
            ]},
        ],
        tier="Team · $499",
    )

    # Custom Blueprint PDF
    build_pdf(
        root / "05_CUSTOM_BLUEPRINT/AP_Transformation_Blueprint_Brochure.pdf",
        "AP Transformation Blueprint",
        "Productised assessment and roadmap service",
        [
            {"h1": "What You Receive", "bullets": [
                "Current-state AP assessment",
                "AP AI maturity score",
                "Opportunity map with prioritised use cases",
                "Recommended agent architecture",
                "Operating model design",
                "KPI baseline framework",
                "Controls framework",
                "Business case with scenarios",
                "90-day implementation plan",
                "Executive presentation (30-min delivery call included)",
            ]},
            {"h1": "How It Works", "body": [
                "Complete our structured intake questionnaire. Within 5 business days, receive a customised transformation blueprint built using the Evidence Room methodology and AI-assisted analysis, reviewed by our team.",
            ]},
        ],
        tier="Custom · $1,500–$3,000",
    )

    # Quick Start PDF
    build_pdf(
        root / "00_READ_ME/Quick_Start_Guide.pdf",
        "Quick Start Guide",
        "Your 12-step path to deploying your first AP agent",
        [
            {"h1": "Start Here", "bullets": [
                "01 — Quick Start (this guide)",
                "02 — Assess Current State (Free Diagnostic)",
                "03 — Map the Process (Process Discovery Template)",
                "04 — Select First Agent (Human-vs-Agent Framework)",
                "05 — Write Agent Charter (Agent Charter Template)",
                "06 — Define Controls (Control Matrix)",
                "07 — Establish KPIs (KPI Scorecard)",
                "08 — Test (Testing Scripts + UAT Template)",
                "09 — Run Shadow Mode (Shadow Mode Methodology)",
                "10 — Deploy (Pilot Methodology)",
                "11 — Measure (KPI Scorecard comparison)",
                "12 — Expand Responsibility (Autonomy progression)",
            ]},
        ],
    )


def write_presentations(root: Path, agents: list, build_pptx):
    cfo_slides = [
        {"title": "The AP Challenge", "bullets": ["$9.40 average cost per invoice", "14% exception rate", "Only 32.6% straight-through processing", "37% of finance AI adoption is AP automation"]},
        {"title": "What Agentic AP Means", "body": "A governed workforce of AI agents operating across your existing AP stack — not replacing it."},
        {"title": "The Evidence Room Approach", "bullets": ["Agents earn responsibility", "5-level autonomy model", "Governance-first design", "Measurable outcomes"]},
        {"title": "16-Agent Architecture", "bullets": [f"{a['id']}. {a['name']}" for a in agents[:8]]},
        {"title": "16-Agent Architecture (cont.)", "bullets": [f"{a['id']}. {a['name']}" for a in agents[8:]]},
        {"title": "Implementation Roadmap", "bullets": ["4-6 weeks for first agent (accelerated)", "10-phase methodology", "Shadow mode before execution", "Evidence-based autonomy progression"]},
        {"title": "Business Case", "bullets": ["Conservative: 15% efficiency gain", "Base: 25% efficiency gain", "Upside: 35% efficiency gain", "ROI calculator included"]},
        {"title": "Next Steps", "bullets": ["Complete AP AI Readiness Diagnostic", "Select first agent", "Write Agent Charter", "Begin shadow mode"]},
    ]
    build_pptx(root / "04_AP_AGENT_OS_TEAM/Executive/CFO_AP_Transformation_Deck.pptx", "CFO AP Transformation Deck", cfo_slides)
    build_pptx(root / "04_AP_AGENT_OS_TEAM/Workshop/AP_Workshop_Deck.pptx", "AP Agent OS Workshop", cfo_slides[:6])
    build_pptx(root / "04_AP_AGENT_OS_TEAM/Executive/Steering_Committee_Pack.pptx", "Steering Committee Pack", [
        {"title": "Programme Status", "bullets": ["Agents deployed: ___", "Current autonomy levels", "KPI performance vs baseline", "Risks and issues"]},
        {"title": "Decisions Required", "bullets": ["Autonomy progression approval", "Budget for next phase", "Scope expansion", "Resource allocation"]},
    ])
    build_pptx(root / "04_AP_AGENT_OS_TEAM/Executive/Business_Case_Deck.pptx", "Business Case", cfo_slides[6:])


def write_brand(root: Path, brand: dict):
    _w(root / "06_SALES_AND_MARKETING/Brand_System.md", f"""# Evidence Room Brand System

## Brand Idea
Evidence Room turns Finance AI from experimentation into measurable operating performance.

## Positioning Statement
The operating system for building, governing, and scaling AI agents across Accounts Payable.

## Voice
Intelligent · Concise · Credible · Executive · Specific · Non-hype

## Colour Palette
| Name | Hex | Usage |
|------|-----|-------|
| Ink | {brand['colors']['ink']} | Primary text |
| Accent | {brand['colors']['accent']} | Headers, CTAs |
| Signal | {brand['colors']['signal']} | Brand accent, highlights |
| Paper | {brand['colors']['paper']} | Backgrounds |
| Stone | {brand['colors']['stone']} | Secondary text |

## Typography
- **Display:** {brand['fonts']['display']}
- **Body:** {brand['fonts']['body']}
- **Mono:** {brand['fonts']['mono']}

## Design Principles
- Institutional, not startup-generic
- Restrained visual sophistication
- Finance-native aesthetic
- No robots, neon brains, or purple gradients
- Think: Bloomberg meets McKinsey meets premium financial software

## Logo Direction
Wordmark: EVIDENCE ROOM in clean serif capitals. "EVIDENCE" in ink, "ROOM" in accent teal. Subtle horizontal rule beneath. No icon required at launch — wordmark is primary.

## Product Family Architecture
- Evidence Room (parent brand)
  - AP Agent OS (vertical 1)
  - [Future: AR Agent OS, Close Agent OS, etc.]
""")


def write_website(root: Path, brand: dict):
    css = f"""
:root {{
  --ink: {brand['colors']['ink']};
  --accent: {brand['colors']['accent']};
  --signal: {brand['colors']['signal']};
  --paper: {brand['colors']['paper']};
  --stone: {brand['colors']['stone']};
  --cloud: {brand['colors']['cloud']};
}}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: {brand['fonts']['body']}; color: var(--ink); background: var(--paper); line-height: 1.6; }}
.container {{ max-width: 1100px; margin: 0 auto; padding: 0 24px; }}
nav {{ background: var(--ink); padding: 16px 0; }}
nav .container {{ display: flex; justify-content: space-between; align-items: center; }}
.logo {{ font-family: {brand['fonts']['display']}; font-size: 1.1rem; letter-spacing: 0.15em; color: white; text-decoration: none; }}
.logo span {{ color: var(--signal); }}
nav a {{ color: var(--cloud); text-decoration: none; margin-left: 24px; font-size: 0.9rem; }}
nav a:hover {{ color: white; }}
.hero {{ padding: 80px 0; background: var(--ink); color: white; }}
.hero h1 {{ font-family: {brand['fonts']['display']}; font-size: 2.8rem; font-weight: 400; margin-bottom: 16px; max-width: 700px; }}
.hero p {{ font-size: 1.15rem; color: var(--cloud); max-width: 600px; margin-bottom: 32px; }}
.btn {{ display: inline-block; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.95rem; margin-right: 12px; }}
.btn-primary {{ background: var(--signal); color: var(--ink); }}
.btn-secondary {{ background: transparent; color: white; border: 1px solid var(--stone); }}
section {{ padding: 64px 0; }}
section h2 {{ font-family: {brand['fonts']['display']}; font-size: 1.8rem; margin-bottom: 24px; }}
.grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }}
.card {{ background: white; border: 1px solid var(--cloud); border-radius: 6px; padding: 28px; }}
.card h3 {{ font-size: 1.1rem; margin-bottom: 8px; }}
.card .price {{ font-size: 1.5rem; font-weight: 700; color: var(--accent); margin: 12px 0; }}
.stat {{ text-align: center; padding: 24px; }}
.stat .num {{ font-size: 2.5rem; font-weight: 700; color: var(--accent); }}
.stat .label {{ color: var(--stone); font-size: 0.9rem; }}
footer {{ background: var(--ink); color: var(--stone); padding: 40px 0; font-size: 0.85rem; }}
footer a {{ color: var(--cloud); text-decoration: none; }}
"""
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evidence Room — AP Agent OS</title>
<style>{css}</style>
</head>
<body>
<nav><div class="container">
  <a href="/" class="logo">EVIDENCE <span>ROOM</span></a>
  <div><a href="#method">Method</a><a href="#products">Products</a><a href="#agents">Agents</a><a href="#faq">FAQ</a></div>
</div></nav>

<section class="hero"><div class="container">
  <h1>The operating system for governed AI agents in Accounts Payable</h1>
  <p>Evidence Room gives Finance leaders the frameworks, agent architectures, governance controls, and implementation toolkits to deploy AI agents that earn responsibility — not hype.</p>
  <a href="#diagnostic" class="btn btn-primary">Assess Your AP Agent Readiness</a>
  <a href="#products" class="btn btn-secondary">Explore the AP Agent OS</a>
</div></section>

<section><div class="container">
  <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
    <div class="stat"><div class="num">$9.40</div><div class="label">Avg cost per invoice (Ardent Partners 2025)</div></div>
    <div class="stat"><div class="num">14%</div><div class="label">Average exception rate</div></div>
    <div class="stat"><div class="num">37%</div><div class="label">Finance AI adoption in AP (Gartner 2025)</div></div>
  </div>
</div></section>

<section id="method"><div class="container">
  <h2>Evidence over hype</h2>
  <p style="max-width:700px;margin-bottom:32px;">AP automation vendors sell software. Prompt packs sell templates. Evidence Room gives you the operating system to design, govern, and scale AI agents across your existing AP stack.</p>
  <div class="grid">
    <div class="card"><h3>Agents Earn Responsibility</h3><p>5-level autonomy model. Start at Observe. Prove performance. Expand only with evidence.</p></div>
    <div class="card"><h3>Governance First</h3><p>Control matrix, segregation of duties, audit evidence, incident response — built in, not bolted on.</p></div>
    <div class="card"><h3>Implementation Ready</h3><p>Buy on Friday. Begin redesigning your AP operating model on Monday. Templates, spreadsheets, and playbooks included.</p></div>
  </div>
</div></section>

<section id="agents"><div class="container">
  <h2>16-Agent AP Architecture</h2>
  <p style="margin-bottom:24px;">From invoice intake to orchestration — a complete agent workforce specification.</p>
  <div class="grid">
    <div class="card"><h3>Intake & Validation</h3><p>Invoice Intake, Validation, Matching</p></div>
    <div class="card"><h3>Exception Management</h3><p>Triage, Goods Receipt, PO Quality, Approval</p></div>
    <div class="card"><h3>Resolution</h3><p>Supplier Resolution, Internal Follow-Up, Duplicate & Anomaly</p></div>
    <div class="card"><h3>Control & Close</h3><p>Statement Recon, Payment Review, AP Close, Reporting</p></div>
    <div class="card"><h3>Intelligence</h3><p>Root Cause Analysis, AP Manager Orchestrator</p></div>
  </div>
</div></section>

<section id="products"><div class="container">
  <h2>Product Tiers</h2>
  <div class="grid">
    <div class="card" id="diagnostic"><h3>AP AI Readiness Diagnostic</h3><div class="price">Free</div><p>20-question assessment, maturity model, opportunity heatmap, baseline KPI worksheet.</p></div>
    <div class="card"><h3>AP Agent Starter Kit</h3><div class="price">$79</div><p>Top 10 agents, taxonomy, templates, operating model, implementation checklist.</p></div>
    <div class="card"><h3>AP Agent OS Professional</h3><div class="price">$199</div><p>Full 16-agent architecture, governance, controls, ROI calculator, testing methodology.</p></div>
    <div class="card"><h3>AP Agent OS Team Edition</h3><div class="price">$499</div><p>Workshop deck, training, change management, benefits tracker, executive packs.</p></div>
    <div class="card"><h3>AP Transformation Blueprint</h3><div class="price">$1,500+</div><p>Custom assessment, agent architecture, business case, 90-day plan, executive presentation.</p></div>
  </div>
</div></section>

<section id="faq"><div class="container">
  <h2>Frequently Asked Questions</h2>
  <div class="card" style="margin-bottom:16px;"><h3>Is this AP automation software?</h3><p>No. Evidence Room is an operating system toolkit — frameworks, templates, and methodologies for designing and governing AI agents that work across your existing AP stack.</p></div>
  <div class="card" style="margin-bottom:16px;"><h3>Will agents replace my AP team?</h3><p>No. Agents handle repeatable analytical and administrative work under governance. Humans retain judgment, relationships, controls, and approvals.</p></div>
  <div class="card" style="margin-bottom:16px;"><h3>What ERP systems does this work with?</h3><p>All major ERPs — SAP, Oracle, Dynamics 365, NetSuite, Workday. The methodology is ERP-agnostic.</p></div>
  <div class="card"><h3>Do you guarantee ROI?</h3><p>No. We provide evidence-based frameworks and conservative/base/upside scenarios. Your results depend on your starting point, implementation quality, and organisational readiness.</p></div>
</div></section>

<footer><div class="container" style="display:flex;justify-content:space-between;">
  <div>© 2026 Evidence Room · evidenceroom.ai</div>
  <div><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/disclaimer">Disclaimer</a></div>
</div></footer>
</body></html>"""
    _w(root / "08_WEBSITE/index.html", html)
    _w(root / "08_WEBSITE/Website_Copy.md", "# Website Copy\n\nFull website copy is embedded in index.html. See also landing page in 06_SALES_AND_MARKETING/Landing_Page.md")


def write_lemon_squeezy(root: Path, brand: dict):
    _w(root / "07_LEMON_SQUEEZY/Store_Setup.md", """# Lemon Squeezy Store Setup

## Platform
- **Provider:** Lemon Squeezy (Merchant of Record)
- **Fees:** 5% + $0.50 per transaction (+ potential international/PayPal/subscription surcharges)
- **Tax:** MoR handles VAT/GST collection and remittance
- **Note:** Confirm current fees at docs.lemonsqueezy.com before launch

## Product Catalogue

### 1. AP AI Readiness Diagnostic — Free
- **Type:** Lead magnet (email gate)
- **Fulfilment:** Automated download link
- **File:** AP_AI_Readiness_Diagnostic.zip

### 2. AP Agent Starter Kit — $79
- **Description:** Top 10 agent blueprints, exception taxonomy, templates, operating model, and implementation checklist. Everything you need to begin designing your AP agent workforce.
- **Fulfilment:** Instant download
- **Upsell:** Professional ($199) at checkout

### 3. AP Agent OS Professional — $199
- **Description:** Complete 16-agent architecture, governance framework, control matrix, KPI definitions, ROI calculator, testing scripts, and implementation roadmap.
- **Fulfilment:** Instant download
- **Upsell:** Team Edition ($499)

### 4. AP Agent OS Team Edition — $499
- **Description:** Everything in Professional plus workshop deck, training materials, change management toolkit, benefits tracker, and executive packs. Licence: internal use within one organisation.
- **Fulfilment:** Instant download
- **Licence:** Team (up to 25 users within one company)

### 5. AP Transformation Blueprint — $1,500–$3,000
- **Type:** Productised service
- **Fulfilment:** Intake form → 5 business day delivery
- **Description:** Custom assessment, agent architecture, business case, and 90-day implementation plan.

## Launch Offer
- **Code:** EVIDENCE20 — 20% off Professional and Team for first 30 days
- **Bundle:** Professional + Team upgrade path at $399 (save $99)

## Customer Emails
1. **Purchase confirmation** — Download link + Quick Start Guide
2. **Day 1** — "Start with the diagnostic" (if Starter buyer)
3. **Day 3** — "Select your first agent" framework
4. **Day 7** — Upgrade to Professional/Team CTA

## Refund Policy (Recommended)
30-day refund for digital products if not yet downloaded. Require professional legal review before publishing.
""")


def write_marketing(root: Path, brand: dict):
    # Email sequence
    emails = [
        ("01_Diagnostic_Delivery.md", "Your AP AI Readiness Results", "Thank you for completing the diagnostic. Your results are attached. The three domains scoring lowest represent your highest-impact agent opportunities."),
        ("02_AP_Automation_Misconception.md", "The biggest AP automation misconception", "Most organisations think AP AI means replacing their AP team or buying another automation platform. It doesn't. The highest-value opportunity is deploying governed AI agents across your existing stack."),
        ("03_First_AP_Agent.md", "How to identify your first AP agent", "Start with the highest-volume, lowest-risk exception type. For most organisations, that's Exception Triage or Invoice Validation. Both have clear inputs, measurable outputs, and start safely at Autonomy Level 1."),
        ("04_Agents_Earn_Responsibility.md", "How agents earn responsibility", "Level 0: Observe. Level 1: Recommend. Level 2: Prepare. Level 3: Execute within guardrails. Level 4: Managed autonomy. No agent starts above Level 1. Responsibility is earned through demonstrated performance in shadow mode."),
        ("05_AP_Agent_OS_Introduction.md", "Introducing the AP Agent OS", "The Evidence Room AP Agent OS includes 16 agent specifications, governance frameworks, control matrices, KPI definitions, ROI calculators, and implementation playbooks. Professional: $199. Team: $499."),
        ("06_Case_Example.md", "Illustrative model: 5,000 invoices/month", "An organisation processing 5,000 invoices/month at $9.40 each spends $564K annually on processing. A 25% efficiency improvement (base case) releases $141K in capacity. Payback on a $50K implementation: under 5 months. Your numbers will differ."),
        ("07_Team_Custom_CTA.md", "Ready for enterprise transformation?", "The Team Edition ($499) includes workshop materials, change management, and executive packs. For a custom assessment and 90-day roadmap, explore the AP Transformation Blueprint."),
    ]
    for fname, subject, body in emails:
        _w(root / f"06_SALES_AND_MARKETING/email_sequence/{fname}", f"# {subject}\n\n{body}\n")

    # LinkedIn posts (30)
    posts = [
        "The average AP organisation spends $9.40 to process a single invoice (Ardent Partners 2025). Best-in-Class: $2.78. The gap isn't technology — it's operating model.",
        "37% of finance functions using AI have deployed it in AP (Gartner 2025). But 91% report low or moderate initial impact. The problem isn't AI. It's implementation.",
        "Your AP team doesn't need another automation platform. They need an operating system for AI agents that work across the stack they already have.",
        "AI agents should earn responsibility like employees: Start at Observe. Prove accuracy. Expand autonomy only with evidence. Never default to full autonomy.",
        "14% exception rate. 32.6% straight-through processing. 9.15 days to process an invoice. These are averages — meaning most organisations are below them.",
        "The #1 mistake in AP AI: treating it as a technology project. It's an operating model redesign with technology enablement.",
        "5 questions every CFO should ask before deploying AP AI agents: Who owns them? What can they NOT do? How do you measure them? What controls exist? How do they earn more responsibility?",
        "Exception Triage is the most underrated first AP agent. Classify, prioritise, route — before you automate anything else.",
        "Governance isn't the enemy of AP AI speed. It's what makes speed sustainable.",
        "Duplicate detection isn't fraud detection. Position it correctly or you'll lose stakeholder trust on day one.",
        "Your AP agents need job descriptions, KPIs, performance reviews, and escalation paths — just like your human team.",
        "Shadow mode before execution. Always. No exceptions. Prove the agent's judgment before giving it any authority.",
        "The best AP AI ROI doesn't come from headcount reduction. It comes from capacity release — redirecting humans to judgment, suppliers, and improvement.",
        "PO quality is an upstream problem that creates downstream AP exceptions. The PO Quality Agent catches this before it becomes your team's problem.",
        "25% of finance organisations are stuck between AI planning and piloting (Gartner 2025). They need implementation frameworks, not more vendor demos.",
        "Cost per invoice is the metric that matters. Track it before and after every agent deployment.",
        "Segregation of duties for AI agents: the agent that processes invoices must never approve payments. Non-negotiable.",
        "Month-end AP close with agents: identify unresolved items, suggest accruals, verify completeness. Human posts. Agent prepares.",
        "3-way matching is where most AP automation breaks. Price variance + partial receipts + missing GRs = your agent's first real test.",
        "Supplier statement reconciliation: tedious, error-prone, perfect for an agent at Level 1-2. Draft the reconciliation, human approves.",
        "The AP Manager Orchestrator isn't just another agent. It's the supervisory layer that makes the other 15 agents work as a workforce.",
        "Illustrative model: 5,000 invoices/month, 25% efficiency gain = $141K annual capacity release. Conservative. Evidence-based. Not a guarantee.",
        "Finance AI adoption is steady at 59% (Gartner 2025). AP automation is use case #2. The market is ready. The implementation guidance isn't.",
        "What Evidence Room is: an operating system for AP agents. What it isn't: software, a prompt pack, or an ERP replacement.",
        "Your first AP agent should have: clear inputs, measurable outputs, low risk, and a human owner who can say no.",
        "Control matrix for AP agents: Agent | Risk | Control | Type | Owner | Evidence | Frequency | Escalation. Build this before you build the agent.",
        "Payment authorisation must always remain human-controlled. Any product that suggests otherwise is selling risk, not value.",
        "The 10-step Evidence Room methodology: Observe → Transcribe → Extract → Structure → Agentise → Test → Shadow → Pilot → Measure → Expand.",
        "AP AI readiness isn't about technology maturity. It's about process standardisation, data quality, governance, and change readiness.",
        "Evidence Room AP Agent OS: 16 agents, governance framework, KPI scorecard, ROI calculator, implementation playbook. $199 Professional. Link in comments.",
    ]
    for i, post in enumerate(posts, 1):
        _w(root / f"06_SALES_AND_MARKETING/linkedin_posts/post_{i:02d}.md", f"{post}\n\n#EvidenceRoom #APAutomation #FinanceAI #AccountsPayable")

    _w(root / "06_SALES_AND_MARKETING/Landing_Page.md", "# Landing Page\n\nSee 08_WEBSITE/index.html for the full conversion-focused landing page.")
    _w(root / "06_SALES_AND_MARKETING/90_Day_Content_Plan.md", """# 90-Day Organic Content Plan

## Pillars
1. AP Operations (30%) 2. Finance AI (25%) 3. Agent Governance (20%) 4. Transformation Economics (15%) 5. Controls & Metrics (10%)

## Deliverables Created
- 30 LinkedIn posts (linkedin_posts/)
- 7-email nurture sequence (email_sequence/)
- 5 long-form article outlines (articles/)
- 10 carousel concepts (documented in content plan)
- 10 executive charts (use research ledger data)

## Cadence
- LinkedIn: 3x/week
- Newsletter: 1x/week (repurpose LinkedIn)
- Long-form: 1x/month
- 80% insight / 20% commercial
""")


def write_legal(root: Path):
    _w(root / "10_LEGAL_AND_LICENSING/Licence_Terms.md", """# Evidence Room Licence Terms (Draft)

**Requires professional legal review before publication.**

## Individual Licence ($79 Starter / $199 Professional)
- One named user
- Personal or internal business use
- No redistribution, resale, or sublicensing
- No publishing templates as purchaser's own commercial product

## Team Licence ($499)
- Internal use within one defined organisation
- Up to 25 named users
- Workshop facilitation permitted within licensed organisation
- No external consulting use without separate agreement

## Restrictions (All Tiers)
- No resale or redistribution of materials
- No sublicensing
- No training competing commercial products directly from materials
- Source files may be modified for internal use only

## Disclaimer
Evidence Room materials are for informational and educational purposes. They do not constitute legal, tax, accounting, or financial advice. No guarantee of savings, ROI, fraud detection, regulatory compliance, or accounting accuracy is made or implied.

## IP Cleanliness
All materials independently authored. No confidential employer information, proprietary workflows, or copyrighted third-party content included.
""")
    _w(root / "10_LEGAL_AND_LICENSING/IP_Cleanliness_Checklist.md", """# IP Cleanliness Checklist

- [x] All content independently authored
- [x] No confidential employer information
- [x] No proprietary client workflows or data
- [x] No internal screenshots
- [x] No reproduced consulting materials
- [x] Statistics sourced from public research (see Research Ledger)
- [x] Competitor analysis based on public information only
- [x] Templates are original frameworks, not copies
- [x] Brand assets independently created
- [ ] Final legal review completed (pending)
""")


def write_manifest(root: Path):
    files = sorted(str(p.relative_to(root)) for p in root.rglob("*") if p.is_file() and "build/" not in str(p))
    _w(root / "00_READ_ME/Manifest.txt", "EVIDENCE ROOM AP AGENT OS — FILE MANIFEST\n" + "=" * 50 + "\n" + "\n".join(files))

