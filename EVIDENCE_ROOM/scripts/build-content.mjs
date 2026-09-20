#!/usr/bin/env node
/**
 * Evidence Room — Full Content Generator
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function write(relPath, content) {
  const full = join(ROOT, relPath);
  ensureDir(dirname(full));
  writeFileSync(full, content, 'utf8');
}

// ─── README & QUICK START ───────────────────────────────────────────
write('00_READ_ME/README.md', `# Evidence Room — AP Agent OS

**The operating system for building, governing, and scaling AI agents across Accounts Payable.**

Version 1.0.0 | September 2025

---

## What Is This?

Evidence Room AP Agent OS is a premium, implementation-ready toolkit that enables Finance leaders to design, deploy, govern, and measure AI agents across the AP lifecycle. It is **not** a prompt pack, ebook, or generic template collection.

**Core principle:** Agents earn responsibility through demonstrated performance — not hype.

---

## Product Tiers

| Tier | Product | Price | Folder |
|------|---------|-------|--------|
| 0 | AP AI Readiness Diagnostic | Free | \`01_FREE_AP_AI_READINESS/\` |
| 1 | AP Agent Starter Kit | $79 | \`02_AP_AGENT_STARTER/\` |
| 2 | AP Agent OS Professional | $199 | \`03_AP_AGENT_OS_PRO/\` |
| 3 | AP Agent OS Team Edition | $499 | \`04_AP_AGENT_OS_TEAM/\` |
| 4 | AP Transformation Blueprint | $1,500–3,000 | \`05_CUSTOM_BLUEPRINT/\` |

---

## Start Here (Professional Purchasers)

1. **Quick Start** → \`00_READ_ME/QUICK_START_GUIDE.md\`
2. **Assess Current State** → \`01_FREE_AP_AI_READINESS/\`
3. **Map the Process** → \`03_AP_AGENT_OS_PRO/Process_Mapping/\`
4. **Select First Agent** → \`03_AP_AGENT_OS_PRO/Agent_Library/\`
5. **Write Agent Charter** → \`03_AP_AGENT_OS_PRO/Templates/AGENT_CHARTER_TEMPLATE.md\`
6. **Define Controls** → \`03_AP_AGENT_OS_PRO/Controls/\`
7. **Establish KPIs** → \`03_AP_AGENT_OS_PRO/KPI_and_Measurement/\`
8. **Test** → \`03_AP_AGENT_OS_PRO/Testing/\`
9. **Run Shadow Mode** → \`03_AP_AGENT_OS_PRO/Testing/SHADOW_MODE_METHODOLOGY.md\`
10. **Deploy** → \`03_AP_AGENT_OS_PRO/Templates/IMPLEMENTATION_ROADMAP.csv\`
11. **Measure** → \`03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_SCORECARD.csv\`
12. **Expand Responsibility** → \`03_AP_AGENT_OS_PRO/Governance/AUTONOMY_PROGRESSION_FRAMEWORK.md\`

---

## Folder Index

| Folder | Contents |
|--------|----------|
| \`00_READ_ME/\` | Navigation, quick start, version history, execution spec |
| \`01_FREE_AP_AI_READINESS/\` | Diagnostic, maturity model, scorecard |
| \`02_AP_AGENT_STARTER/\` | Starter kit ($79) |
| \`03_AP_AGENT_OS_PRO/\` | Full operating system ($199) |
| \`04_AP_AGENT_OS_TEAM/\` | Team/workshop edition ($499) |
| \`05_CUSTOM_BLUEPRINT/\` | Productised service spec |
| \`06_SALES_AND_MARKETING/\` | Content engine, funnel, emails |
| \`07_LEMON_SQUEEZY/\` | Store setup, product copy |
| \`08_WEBSITE/\` | Website IA, landing page, copy |
| \`09_RESEARCH/\` | Research ledger, competitor analysis |
| \`10_LEGAL_AND_LICENSING/\` | Licence terms, disclaimers, IP checklist |

---

## Evidence Standard

Benchmarks cite the Research Ledger (\`09_RESEARCH/RESEARCH_LEDGER.csv\`).  
Claims tagged: independent | vendor | illustrative | framework.

---

*Evidence Room — Evidence over hype. Agents earn responsibility.*
`);

write('00_READ_ME/QUICK_START_GUIDE.md', `# Quick Start Guide
## Evidence Room AP Agent OS — Professional Edition

**Time to first action: 30 minutes**

---

## Before You Begin

You will need:
- Access to your AP team's current process documentation (if any)
- Approximate invoice volumes and exception rates
- Identification of your ERP environment
- A named sponsor (AP Manager, Controller, or Transformation Lead)
- 2–4 hours this week for initial assessment

---

## Step 1: Assess Current State (30 min)

1. Open \`01_FREE_AP_AI_READINESS/DIAGNOSTIC_QUESTIONS.csv\`
2. Answer all 30 questions (score 1–5 per question)
3. Calculate your readiness score (see \`SCORING_GUIDE.md\`)
4. Review your maturity level in \`MATURITY_MODEL.csv\`
5. Share results with your sponsor

**Output:** Readiness score, maturity level, top 3 opportunity areas

---

## Step 2: Map Your AP Process (2–4 hours)

1. Follow the 10-step Evidence Room methodology in \`03_AP_AGENT_OS_PRO/Process_Mapping/METHODOLOGY.md\`
2. Use \`PROCESS_DISCOVERY_TEMPLATE.md\` to document your current state
3. Identify your top 5 exception categories from \`EXCEPTION_TAXONOMY.csv\`
4. Mark which steps are human, recommend, prepare, or execute candidates

**Output:** Process map, exception heatmap, agentisation candidates

---

## Step 3: Select Your First Agent (1 hour)

**Recommendation:** Start with one well-bounded agent. Most organisations begin with:

| If your biggest pain is... | Start with... |
|---------------------------|---------------|
| Manual data entry / OCR errors | Invoice Intake Agent (AGT-01) |
| Exception backlog | Exception Triage Agent (AGT-04) |
| Approval delays | Approval Agent (AGT-07) |
| Missing receipts | Goods Receipt Agent (AGT-05) |
| Duplicate invoices | Duplicate & Anomaly Agent (AGT-10) |

1. Read the agent specification in \`Agent_Library/\`
2. Complete \`AGENT_CHARTER_TEMPLATE.md\`
3. Register in \`AGENT_REGISTRY.csv\`

**Output:** Agent charter, registered agent at Level 0

---

## Step 4: Define Controls (1 hour)

1. Review \`AGENT_CONTROL_MATRIX.csv\`
2. Complete \`RISK_REGISTER_TEMPLATE.md\` for your first agent
3. Confirm human owner and approval gates
4. Document in your governance framework

**Output:** Control matrix row, risk register entry

---

## Step 5: Establish KPIs (30 min)

1. Open \`KPI_DEFINITIONS.csv\`
2. Select 5–8 KPIs relevant to your first agent
3. Record baseline values in \`KPI_SCORECARD.csv\`
4. Set 90-day targets (conservative)

**Output:** Baseline KPIs with targets

---

## Step 6–12: Test → Shadow → Deploy → Measure → Expand

Follow the implementation roadmap in \`IMPLEMENTATION_ROADMAP.csv\`.

**Typical timeline for one agent:** 4–6 weeks (illustrative — actual duration depends on systems, data quality, governance maturity, and integration complexity).

---

## Need Help?

- **Team Edition** includes workshop facilitation materials for running this with your full AP team
- **Custom Blueprint** provides a productised assessment and 90-day plan

---

*Evidence Room — Start Monday. Evidence by Friday.*
`);

write('00_READ_ME/VERSION_HISTORY.md', `# Version History

## v1.0.0 — September 2025
- Initial commercial release
- 16-agent AP architecture
- 27-category exception taxonomy
- 5-tier product suite (Free → Custom)
- Governance, control, and KPI frameworks
- ROI calculator and business case model
- Lemon Squeezy commerce specification
- Website and landing page
- 90-day content engine
- Research ledger with independent benchmarks

---

*Evidence Room AP Agent OS*
`);

write('00_READ_ME/PRODUCT_INDEX.md', `# Product Index — Complete File Listing

## Tier 0: Free Diagnostic
- \`01_FREE_AP_AI_READINESS/AP_AI_READINESS_DIAGNOSTIC.md\` — Full diagnostic guide
- \`01_FREE_AP_AI_READINESS/DIAGNOSTIC_QUESTIONS.csv\` — 30 assessment questions
- \`01_FREE_AP_AI_READINESS/MATURITY_MODEL.csv\` — 5-level maturity framework
- \`01_FREE_AP_AI_READINESS/SCORING_GUIDE.md\` — How to score and interpret
- \`01_FREE_AP_AI_READINESS/BASELINE_KPI_WORKSHEET.csv\` — Baseline capture
- \`01_FREE_AP_AI_READINESS/BUSINESS_CASE_STARTER.md\` — Initial business case template

## Tier 1: Starter Kit ($79)
- \`02_AP_AGENT_STARTER/STARTER_GUIDE.md\` — Complete starter guide
- \`02_AP_AGENT_STARTER/TOP_10_AGENT_BLUEPRINTS.md\` — Priority agent overview
- \`02_AP_AGENT_STARTER/HUMAN_VS_AGENT_FRAMEWORK.md\` — Decision framework
- \`02_AP_AGENT_STARTER/IMPLEMENTATION_CHECKLIST.md\` — Step-by-step checklist
- \`02_AP_AGENT_STARTER/TRANSFORMATION_ROADMAP.md\` — High-level roadmap

## Tier 2: Professional ($199)
- \`03_AP_AGENT_OS_PRO/Agent_Library/\` — 16 agent specifications + registry
- \`03_AP_AGENT_OS_PRO/Process_Mapping/\` — 10-step methodology + templates
- \`03_AP_AGENT_OS_PRO/Governance/\` — Framework, autonomy model, exception taxonomy
- \`03_AP_AGENT_OS_PRO/Controls/\` — Control matrix, risk register
- \`03_AP_AGENT_OS_PRO/KPI_and_Measurement/\` — Definitions, scorecard, dashboard spec
- \`03_AP_AGENT_OS_PRO/Testing/\` — UAT, shadow mode, pilot methodology
- \`03_AP_AGENT_OS_PRO/Business_Case/\` — ROI calculator, cost model, agent economics
- \`03_AP_AGENT_OS_PRO/Templates/\` — SOP, charter, RACI, implementation plan

## Tier 3: Team ($499)
- \`04_AP_AGENT_OS_TEAM/Workshop/\` — Facilitation pack, exercises, deck
- \`04_AP_AGENT_OS_TEAM/Training/\` — Training materials, change management
- \`04_AP_AGENT_OS_TEAM/Executive/\` — CFO deck, steering committee pack
- \`04_AP_AGENT_OS_TEAM/Implementation/\` — Playbook, trackers, interview guides

## Tier 4: Custom ($1,500–3,000)
- \`05_CUSTOM_BLUEPRINT/SERVICE_BROCHURE.md\`
- \`05_CUSTOM_BLUEPRINT/INTAKE_QUESTIONNAIRE.md\`
- \`05_CUSTOM_BLUEPRINT/FULFILMENT_WORKFLOW.md\`

## Supporting
- \`06_SALES_AND_MARKETING/\` — Content, funnel, emails
- \`07_LEMON_SQUEEZY/\` — Store setup
- \`08_WEBSITE/\` — Website and landing page
- \`09_RESEARCH/\` — Research and competitors
- \`10_LEGAL_AND_LICENSING/\` — Legal framework
`);
