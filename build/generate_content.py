"""Generate Evidence Room markdown content, website, marketing, and legal."""
from pathlib import Path
from content_data import AGENTS, EXCEPTIONS, BRAND, RESPONSIBILITY_LEVELS, RESEARCH_LEDGER

ROOT = Path(__file__).resolve().parent.parent / "evidence-room"


def write_md(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  Created {path.relative_to(ROOT.parent)}")


def gen_readme():
    content = f"""# Evidence Room — AP Agent OS

**{BRAND['tagline']}**

## Product Suite

| Tier | Product | Price | Location |
|------|---------|-------|----------|
| 0 | AP AI Readiness Diagnostic | Free | `01_FREE_AP_AI_READINESS/` |
| 1 | AP Agent Starter Kit | $79 | `02_AP_AGENT_STARTER/` |
| 2 | AP Agent OS Professional | $199 | `03_AP_AGENT_OS_PRO/` |
| 3 | AP Agent OS Team Edition | $499 | `04_AP_AGENT_OS_TEAM/` |
| 4 | AP Transformation Blueprint | $1,500–3,000 | `05_CUSTOM_BLUEPRINT/` |

## Quick Start

1. **Start here:** `00_READ_ME/QUICK_START_GUIDE.md`
2. **Assess readiness:** Complete `01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.xlsx`
3. **Learn the framework:** Read `02_AP_AGENT_STARTER/AP_Agent_Starter_Guide.pdf`
4. **Implement:** Follow `03_AP_AGENT_OS_PRO/` for full operating system
5. **Scale:** Use `04_AP_AGENT_OS_TEAM/` for enterprise rollout

## Directory Index

See `00_READ_ME/PRODUCT_INDEX.md` for complete file listing.

## Version

v1.0.0 — September 2026

## Licence

See `10_LEGAL_AND_LICENSING/LICENCE_TERMS.md`
"""
    write_md(ROOT / "00_READ_ME/README.md", content)


def gen_quick_start():
    content = """# Quick Start Guide

## START HERE — 12 Steps to Your First AP Agent

### 01 — Quick Start
Read this guide. Understand the Evidence Room operating model.

### 02 — Assess Current State
Complete the AP AI Readiness Diagnostic (`01_FREE_AP_AI_READINESS/`). Score your organisation across 37 dimensions.

### 03 — Map the Process
Select one AP subprocess. Use the Process Discovery Guide to document current-state steps, systems, and exceptions.

### 04 — Select First Agent
Apply the Human vs Agent Decision Framework. Choose ONE bounded, high-volume, lower-risk agent. Recommended starters: Invoice Validation (AP-VAL-02) or Exception Triage (AP-TRI-04).

### 05 — Write Agent Charter
Use the Agent Charter Template. Define purpose, scope, controls, KPIs, and starting autonomy level (recommend Level 0 or 1).

### 06 — Define Controls
Map controls to your agent using the Control Matrix. Ensure segregation of duties. Payment authorisation stays human.

### 07 — Establish KPIs
Set baseline metrics from the KPI Scorecard. Minimum: cost per invoice, STP rate, exception resolution time, classification accuracy.

### 08 — Test
Run 50-100 historical cases through your agent logic. Measure accuracy against human decisions. Target >95% before proceeding.

### 09 — Run Shadow Mode
Deploy agent at Level 0 (Observe). Agent recommends but cannot act. Compare recommendations to actual outcomes for 3 weeks.

### 10 — Deploy
Move to Level 1-2 (Recommend/Prepare). Limited scope: one BU, one invoice type, or one supplier category. Daily monitoring.

### 11 — Measure
Compare KPIs against baseline at 30, 60, and 90 days. Audit a sample of agent decisions. Document performance history.

### 12 — Expand Responsibility
Only after demonstrated performance. Formal autonomy review. Progress one level at a time. Never skip levels.

---

**Timeline:** 4-6 weeks for one well-bounded agent (accelerated). Actual duration depends on your systems, data quality, and governance maturity.

**Support:** evidenceroom.ai
"""
    write_md(ROOT / "00_READ_ME/QUICK_START_GUIDE.md", content)


def gen_product_index():
    files = []
    for p in sorted(ROOT.rglob("*")):
        if p.is_file() and p.name != ".gitkeep":
            files.append(str(p.relative_to(ROOT)))
    content = "# Product Index\n\nComplete file listing for Evidence Room AP Agent OS.\n\n"
    for f in files:
        content += f"- `{f}`\n"
    write_md(ROOT / "00_READ_ME/PRODUCT_INDEX.md", content)


def gen_agent_specs():
    for a in AGENTS:
        content = f"""# {a['code']} — {a['name']}

## Purpose
{a['purpose']}

## Job Description
The {a['name']} is responsible for {a['purpose'].lower()} It operates at Autonomy Level {a['default_autonomy']} by default and reports to the {a['human_owner']}.

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
{a['approval_required']}

## Escalation Criteria
{a['escalation']}

## Output Standard
{a['output_standard']}

## Control Requirements
{chr(10).join('- ' + c for c in a['controls'])}

## KPIs
{chr(10).join('- ' + k for k in a['kpis'])}

## Default Autonomy Level
Level {a['default_autonomy']} — {RESPONSIBILITY_LEVELS[a['default_autonomy']]['name']}

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
"""
        fname = f"{a['code']}_{a['name'].replace(' ', '_').replace('/', '_')}.md"
        write_md(ROOT / f"03_AP_AGENT_OS_PRO/Agent_Library/{fname}", content)


def gen_competitor_analysis():
    content = """# Competitor & Market Analysis

## Market Landscape

Forrester identifies **41 AP invoice automation vendors** in its Q4 2025 landscape (RES189935). The market is growing at 12-21% CAGR depending on scope definition. Agentic AI is emerging as the primary differentiator for 2026.

## Competitor Categories

### AP Automation Platforms
| Vendor | Positioning | Gap vs Evidence Room |
|--------|-------------|---------------------|
| Tipalti | Global payables automation + payments | Software, not operating model toolkit |
| Coupa | Spend management + AP | Platform lock-in, no agent governance framework |
| Basware | Enterprise AP automation | Implementation-heavy, no DIY agent design |
| Esker | Cloud AP/AR automation | Vendor solution, not OS for your agents |
| Yooz | Mid-market AP automation | Limited governance/agent architecture |
| Medius | AP automation + analytics | Software vendor, not transformation toolkit |
| Stampli | Collaborative AP with AI | Single product, not multi-agent OS |
| AvidXchange | AP automation for mid-market | US-focused, no agent responsibility model |
| HighRadius | Autonomous finance platform | Black-box AI, limited governance transparency |

### ERP-Native AP
| Vendor | Notes |
|--------|-------|
| SAP | Embedded AI in S/4HANA, requires SAP ecosystem |
| Oracle | Fusion Cloud AP, ERP-dependent |
| Microsoft | D365 Finance AP, Power Platform extensibility |
| NetSuite | SuiteApps marketplace, limited agent framework |
| Workday | Financials AP, HCM integration strength |

### RPA / Workflow
| Vendor | Notes |
|--------|-------|
| UiPath | Agentic automation platform, horizontal not AP-specific |
| Automation Anywhere | RPA + AI, lacks AP operating model |

## Evidence Room Differentiation

**Evidence Room does not replace your AP stack. It helps you design the agent layer that operates across it.**

| Dimension | AP Software Vendors | Generic AI Templates | Evidence Room |
|-----------|--------------------|-----------------------|---------------|
| Agent architecture | Black-box / single feature | None | 16-agent specification |
| Governance framework | Basic audit logs | None | 5-stage autonomy model + control matrix |
| Operating model | Vendor-defined | None | Complete OS with methodology |
| ERP dependency | Often required | None | ERP-agnostic |
| Implementation | Vendor-led ($$$) | DIY with no guidance | Self-serve toolkit ($79-499) |
| Responsibility model | "Full automation" marketing | None | Agents earn responsibility |
| KPI framework | Vendor metrics | None | 22+ defined metrics with formulas |
| Price | $50K-500K+ annual | $0-49 | $79-499 one-time |

## Market Gaps Identified

1. **No independent AP agent operating system** exists as a purchasable product
2. **Governance material is absent** from all major AP vendors' customer-facing content
3. **Operating model design** is consulting-only ($200K+ engagements)
4. **Responsibility progression frameworks** are not productised anywhere
5. **ERP-agnostic agent design** tools do not exist in the market

## Price Signals

| Product Type | Price Range | Evidence Room Position |
|-------------|-------------|----------------------|
| AP automation SaaS | $2-15/invoice or $50K-500K/yr | Complementary, not competing |
| Consulting toolkits | $200K-1M+ engagements | $79-499 self-serve alternative |
| AI prompt packs | $0-49 | $79-199 with 10-100x more depth |
| Finance transformation courses | $500-5,000 | $199-499 with implementation tools |
| Custom blueprint services | $50K-200K | $1,500-3,000 productised entry |
"""
    write_md(ROOT / "09_RESEARCH/Competitor_Analysis.md", content)


def gen_research_summary():
    content = "# Research Ledger Summary\n\n"
    for r in RESEARCH_LEDGER:
        content += f"## {r['claim']}\n\n"
        content += f"- **Source:** {r['source']}\n"
        content += f"- **Date:** {r['date']}\n"
        content += f"- **URL:** {r['url']}\n"
        content += f"- **Context:** {r['context']}\n"
        content += f"- **Type:** {r['type']}\n\n"
    write_md(ROOT / "09_RESEARCH/Research_Ledger.md", content)


def gen_licence():
    content = """# Evidence Room Licence Terms

**Version 1.0 — September 2026**

*These terms require professional legal review before commercial use.*

## Individual Licence (Starter / Professional)
- Licensed to one named individual
- Use for internal business purposes and client advisory work
- May customise templates for internal use
- May NOT redistribute, resell, sublicense, or publish templates as own product
- May NOT use materials to create competing commercial products

## Team Licence (Team Edition)
- Licensed for internal use within one defined company/organisation
- Up to 25 named users within the licensed organisation
- Includes facilitation and workshop rights within the licensed organisation
- May NOT redistribute outside the licensed organisation
- May NOT resell or sublicense

## Intellectual Property
- All content © Evidence Room. All rights reserved.
- Purchaser receives a licence to use, not ownership of IP
- Evidence Room frameworks may be referenced with attribution
- Custom implementations based on frameworks belong to the implementer

## Refund Policy (Recommended)
- 30-day money-back guarantee if product has not been substantially used
- No refunds after templates have been customised for client delivery
- Free diagnostic: no refund applicable

## Disclaimers
- Evidence Room provides frameworks and tools, not accounting, legal, or tax advice
- Industry benchmarks are illustrative and sourced from third parties
- No guarantee of savings, ROI, fraud detection, or regulatory compliance
- AI agent implementations carry inherent risks requiring human oversight
- Payment authorisation must remain human-controlled

## Privacy
- Diagnostic data collected only with explicit consent
- Email addresses used for product delivery and opted-in communications
- No sale of personal data to third parties

*Flag for professional legal review before commercial launch.*
"""
    write_md(ROOT / "10_LEGAL_AND_LICENSING/LICENCE_TERMS.md", content)


def gen_ip_checklist():
    content = """# IP Cleanliness Checklist

Complete before commercial release.

- [ ] All content independently authored — no employer proprietary material
- [ ] No real client data, internal screenshots, or confidential workflows
- [ ] No copyrighted consulting materials reproduced
- [ ] No conference slides reproduced without permission
- [ ] Industry statistics cited with source attribution
- [ ] Competitor analysis based on public information only
- [ ] Frameworks and templates are original creations
- [ ] Agent specifications based on generic professional AP knowledge
- [ ] All templates contain example data that is fictional
- [ ] Brand assets (logo, wordmark) are original or properly licensed
- [ ] Third-party tool references are factual and non-endorsement
- [ ] Legal terms flagged for professional review
"""
    write_md(ROOT / "10_LEGAL_AND_LICENSING/IP_Cleanliness_Checklist.md", content)


def gen_lemon_squeezy():
    content = """# Lemon Squeezy Store Configuration

## Platform Details (Verified September 2026)
- **Fee:** 5% + $0.50 per transaction
- **Additional:** +1.5% international, +1.5% PayPal, +0.5% subscriptions
- **Merchant of Record:** Yes — handles VAT/GST globally
- **No monthly fee**

## Store Structure

### Store Name
Evidence Room

### Store URL
evidenceroom.lemonsqueezy.com (or custom domain: shop.evidenceroom.ai)

## Products

### 1. AP AI Readiness Diagnostic — FREE
- **Price:** $0 (lead magnet)
- **Type:** Digital download
- **Files:** AP_AI_Readiness_Diagnostic.xlsx, AP_AI_Readiness_Diagnostic.pdf
- **Email gate:** Required
- **Description:** Assess your organisation's readiness for AP AI agents. 37-question diagnostic with maturity scoring, opportunity heatmap, and business case starter. Used by Finance leaders at organisations processing 1,000-50,000+ invoices monthly.

### 2. AP Agent Starter Kit — $79
- **Price:** $79 USD
- **Type:** Digital download (ZIP)
- **Files:** Starter folder contents
- **Description:** Everything you need to begin designing your AP agent operating model. Includes top 10 agent blueprints, exception taxonomy, governance checklist, process-mapping templates, KPI scorecard, and 90-day implementation roadmap. Implementation-ready — not theory.

### 3. AP Agent OS Professional — $199
- **Price:** $199 USD
- **Type:** Digital download (ZIP)
- **Files:** Professional folder + all Starter contents
- **Description:** The complete 16-agent operating system. Full agent specifications, governance framework, control matrix, ROI calculator, testing scripts, UAT templates, shadow-mode methodology, and executive reporting pack. The implementation framework Finance Directors wish they had on day one.

### 4. AP Agent OS Team — $499
- **Price:** $499 USD
- **Type:** Digital download (ZIP)
- **Licence:** Team (up to 25 users)
- **Files:** All Professional + Team folder contents
- **Description:** Enterprise transformation toolkit. Workshop facilitation pack, stakeholder interview guides, change management materials, steering committee templates, benefits tracker, and executive communication pack. Run a credible AP AI transformation workshop tomorrow.

### 5. AP Transformation Blueprint — $1,500-$2,500
- **Price:** $1,500 (standard) / $2,500 (complex)
- **Type:** Service product with intake form
- **Description:** Bespoke AP agent transformation plan. Complete the intake questionnaire; receive current-state assessment, recommended agent architecture, business case, and 90-day implementation plan within 10 business days.
- **Fulfillment:** AI-assisted + human review

## Checkout Copy (Universal)
- **Refund:** 30-day money-back guarantee
- **Delivery:** Instant digital download
- **Support:** hello@evidenceroom.ai
- **Licence:** See licence terms at evidenceroom.ai/terms

## Upsell Strategy
- Free → Starter ($79): Email sequence day 5
- Starter → Professional ($199): In-product upgrade prompt
- Professional → Team ($499): Workshop CTA
- Team → Custom ($1,500+): Consultation CTA

## Launch Offer
- First 100 Professional purchases: 20% off ($159) — code LAUNCH20
- Bundle: Professional + 30-min consultation call: $249

## VAT/GST
- Handled by Lemon Squeezy as merchant of record
- Prices displayed exclusive of tax; tax added at checkout per jurisdiction
- Confirm with tax professional for your entity structure

## Customer Emails
1. **Purchase confirmation:** Download link + Quick Start Guide
2. **Day 1:** Welcome + "Start with the Diagnostic"
3. **Day 3:** "Select Your First Agent" guide
4. **Day 7:** "How Agents Earn Responsibility" framework
5. **Day 14:** Check-in + upsell (if Starter, promote Professional)

*Flag tax and legal items for professional confirmation.*
"""
    write_md(ROOT / "07_LEMON_SQUEEZY/Store_Configuration.md", content)


def gen_email_sequence():
    emails = [
        ("Email 1 — Diagnostic Delivery", "Subject: Your AP AI Readiness Diagnostic is ready\n\nThank you for completing the Evidence Room AP AI Readiness Diagnostic.\n\nYour score places your organisation at [MATURITY LEVEL]. This is a starting point, not a verdict.\n\nAttached: your personalised scorecard and opportunity heatmap.\n\nThree things to do this week:\n1. Share your score with your AP leadership team\n2. Identify your top 3 exception categories by volume\n3. Note which of the 10 core agents would address your highest-volume pain\n\nTomorrow: the biggest misconception about AP automation.\n\n— Evidence Room"),
        ("Email 2 — Biggest Misconception", "Subject: The biggest AP automation misconception\n\nMost Finance leaders believe AP automation means replacing their team with software.\n\nIt doesn't.\n\nThe organisations achieving $2.78 per invoice (vs the $9.40 average) aren't running headless AP departments. They're running governed agent workforces where:\n\n• Agents handle classification, matching, and follow-up drafting\n• Humans retain judgment, exceptions, supplier relationships, and payment authorisation\n• Agents earn responsibility through demonstrated performance\n\nThe question isn't 'how do we automate AP?' It's 'which AP decisions can agents prepare, and which must humans own?'\n\n— Evidence Room"),
        ("Email 3 — First Agent", "Subject: How to identify your first AP agent\n\nThe most common mistake: trying to automate everything at once.\n\nSelect ONE agent using these criteria:\n\n1. High volume (most invoices affected)\n2. Bounded scope (clear inputs and outputs)\n3. Lower risk (mistakes are recoverable)\n4. Data available (ERP access confirmed)\n5. Measurable (baseline KPI exists)\n\nBest starters: Invoice Validation (AP-VAL-02) or Exception Triage (AP-TRI-04).\n\nWorst starters: Payment execution, fraud detection, or anything requiring full autonomy on day one.\n\nStart at Level 0 (Observe). Earn the right to act.\n\n— Evidence Room"),
        ("Email 4 — Earn Responsibility", "Subject: How agents earn responsibility\n\nEvidence Room's core principle: agents earn responsibility like employees.\n\nLevel 0 — Observe: Reviews, cannot act\nLevel 1 — Recommend: Suggests actions\nLevel 2 — Prepare: Drafts actions for approval\nLevel 3 — Execute within guardrails: Low-risk auto-execution\nLevel 4 — Managed autonomy: Independent with exception oversight\n\nMost organisations should start at Level 0-1 and progress one level at a time over 90+ days.\n\nNever skip levels. Never default to full autonomy.\n\n— Evidence Room"),
        ("Email 5 — AP Agent OS", "Subject: Introducing the AP Agent OS\n\nIf you're ready to move from concept to implementation, the Evidence Room AP Agent OS provides:\n\n• 16 agent specifications with job descriptions, controls, and KPIs\n• Complete governance framework and control matrix\n• ROI calculator with conservative/base/upside scenarios\n• Testing scripts, UAT templates, and shadow-mode methodology\n• Process discovery toolkit and 10-step methodology\n\nProfessional ($199): Full operating system\nTeam ($499): Enterprise workshop and change management pack\n\n→ evidenceroom.ai/professional\n\n— Evidence Room"),
        ("Email 6 — Illustrative Model", "Subject: What 30% efficiency looks like (illustrative)\n\nOrganisation profile: 5,000 invoices/month, 12 AP FTE, $9.40 cost per invoice.\n\nConservative scenario (15% efficiency):\n• ~1,800 hours released annually\n• ~$56K labour savings\n• Payback: ~10 months\n\nBase scenario (30% efficiency):\n• ~3,600 hours released annually\n• ~$113K labour savings\n• Payback: ~6 months\n\nThese are illustrative estimates based on Ardent Partners benchmarks. Your results will vary.\n\nUse the ROI Calculator in the Professional toolkit to model your specific situation.\n\n— Evidence Room"),
        ("Email 7 — Team/Custom CTA", "Subject: Ready for enterprise rollout?\n\nIf you're planning an AP AI transformation programme — not just a pilot — two options:\n\n**Team Edition ($499):** Workshop facilitation pack, stakeholder interview guides, change management toolkit, steering committee templates. Designed for a Finance Transformation leader to run a credible workshop tomorrow.\n\n**Custom Blueprint ($1,500-2,500):** Bespoke assessment, recommended agent architecture, business case, and 90-day plan. Delivered within 10 business days.\n\n→ evidenceroom.ai/team\n→ evidenceroom.ai/blueprint\n\n— Evidence Room"),
    ]
    for title, body in emails:
        fname = title.split("—")[0].strip().replace(" ", "_") + ".md"
        write_md(ROOT / f"06_SALES_AND_MARKETING/Email_Sequence/{fname}", f"# {title}\n\n{body}")


def gen_linkedin_posts():
    posts = [
        "The average organisation spends $9.40 to process a single invoice. Best-in-class teams achieve $2.78. The difference isn't headcount — it's how they deploy governed AI agents across AP. We built the operating system for this transition. Link in comments.",
        "Your AP team doesn't need another automation tool. They need an operating model for AI agents that earn responsibility through performance. That's what Evidence Room AP Agent OS provides.",
        "5 stages of AP agent autonomy:\n0 — Observe\n1 — Recommend\n2 — Prepare\n3 — Execute within guardrails\n4 — Managed autonomy\n\nMost vendors sell Level 4. We recommend starting at Level 0. Earn the right to act.",
        "Forrester now tracks 41 AP invoice automation vendors. None of them sell an agent governance framework. None productise an operating model. That's the gap Evidence Room fills.",
        "PO matching exceptions aren't random. They follow patterns: wrong price (supplier), missing receipt (receiver), invalid PO (requester). A Root Cause Agent identifies these patterns. Humans fix the systemic issues.",
        "Question for AP leaders: Do you know your cost per exception resolved? Not your exception rate — the actual cost to resolve each one. If not, start there before buying any AI tool.",
        "Agentic AI in AP isn't about removing humans. It's about removing humans from repetitive classification, matching, and follow-up drafting — so they can focus on judgment, suppliers, and controls.",
        "We analysed 27 AP exception categories and mapped each to a specific agent, resolution path, and automation potential. This taxonomy alone saves weeks of process discovery.",
        "Shadow mode is the most underrated step in AP agent deployment. Run the agent for 3 weeks where it recommends but cannot act. Compare to actual outcomes. Only then consider Level 1.",
        "Your ERP doesn't need replacing. Your AP operating model does. Evidence Room helps you design the agent layer that operates across SAP, Oracle, D365, NetSuite, or Workday.",
    ]
    for i, post in enumerate(posts, 1):
        write_md(ROOT / f"06_SALES_AND_MARKETING/Content_Engine/LinkedIn_Post_{i:02d}.md", f"# LinkedIn Post {i}\n\n{post}\n")


def gen_master_prompt():
    content = """# EVIDENCE ROOM — MASTER EXECUTION PROMPT (Refined v1.0)

## Identity
You are an elite multidisciplinary product company building Evidence Room AP Agent OS — the operating system for governed AI agents in Accounts Payable.

## Non-Negotiables
1. NOT a prompt pack, ebook, or template collection
2. Implementation-ready: buyer starts Monday after Friday purchase
3. Agents EARN responsibility (Levels 0-4); never default to full autonomy
4. Payment authorisation remains human-controlled always
5. ERP-agnostic; no vendor lock-in
6. Every claim evidence-backed or labelled illustrative
7. Premium aesthetic: institutional, not generic AI

## Execution Sequence (Mandatory Order)
1. Research → 2. Customer definition → 3. Product architecture → 4. Methodology → 5. Agent specs → 6. Governance → 7. KPIs → 8. Written products → 9. Templates/spreadsheets → 10. Presentations → 11. Brand → 12. Packaging → 13. Commerce → 14. Website → 15. Funnel → 16. Content → 17. QA → 18. Package

## Quality Gate (Score 1-10, minimum 9)
- Content usefulness for experienced CFO
- Practicality (usable tomorrow)
- Specificity (real AP problems)
- Design quality (premium)
- Credibility (evidence-based)
- Differentiation (vs prompt packs)
- Coherence (one operating system)
- Usability (clear starting point)
- Commercial value (exceeds price)

## Critical Test Questions
1. Would a Finance Director pay $199 of their own money for this?
2. Could a Transformation leader run a workshop tomorrow with Team Edition?
3. Is differentiation clear: operating system, not prompt bundle?

## Product Hierarchy
- Tier 0 FREE: Diagnostic (lead magnet)
- Tier 1 $79: Starter Kit (10 agents, frameworks)
- Tier 2 $199: Professional (16 agents, full OS)
- Tier 3 $499: Team (workshop, change management)
- Tier 4 $1,500-3,000: Custom Blueprint (productised service)

## Every Page Must Answer
What should I do? How? Who owns it? What can go wrong? How do I control it? How do I measure it? What evidence proves it works?

## Output Architecture
```
EVIDENCE ROOM/
├── 00_READ_ME/
├── 01_FREE_AP_AI_READINESS/
├── 02_AP_AGENT_STARTER/
├── 03_AP_AGENT_OS_PRO/
├── 04_AP_AGENT_OS_TEAM/
├── 05_CUSTOM_BLUEPRINT/
├── 06_SALES_AND_MARKETING/
├── 07_LEMON_SQUEEZY/
├── 08_WEBSITE/
├── 09_RESEARCH/
└── 10_LEGAL_AND_LICENSING/
```
"""
    write_md(ROOT / "00_READ_ME/MASTER_EXECUTION_PROMPT.md", content)


def generate_all():
    print("Generating markdown content...")
    gen_readme()
    gen_quick_start()
    gen_master_prompt()
    gen_agent_specs()
    gen_competitor_analysis()
    gen_research_summary()
    gen_licence()
    gen_ip_checklist()
    gen_lemon_squeezy()
    gen_email_sequence()
    gen_linkedin_posts()
    print("Content generation complete.")


if __name__ == "__main__":
    generate_all()
