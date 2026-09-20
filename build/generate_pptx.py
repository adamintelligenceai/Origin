"""Generate Evidence Room PowerPoint presentations."""
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from content_data import AGENTS, RESPONSIBILITY_LEVELS, BRAND

ROOT = Path(__file__).resolve().parent.parent / "evidence-room"
ACCENT = RGBColor(15, 76, 92)
INK = RGBColor(11, 18, 32)


def add_title_slide(prs, title, subtitle=""):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = INK
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(2.5), Inches(8.4), Inches(1.5))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(36)
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.font.bold = True
    if subtitle:
        txBox2 = slide.shapes.add_textbox(Inches(0.8), Inches(4.2), Inches(8.4), Inches(1))
        tf2 = txBox2.text_frame
        p2 = tf2.paragraphs[0]
        p2.text = subtitle
        p2.font.size = Pt(18)
        p2.font.color.rgb = RGBColor(200, 200, 200)


def add_content_slide(prs, title, bullets):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    txBox = slide.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(8.8), Inches(0.8))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(28)
    p.font.color.rgb = ACCENT
    p.font.bold = True
    txBox2 = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(8.4), Inches(5.5))
    tf2 = txBox2.text_frame
    tf2.word_wrap = True
    for i, bullet in enumerate(bullets):
        para = tf2.paragraphs[0] if i == 0 else tf2.add_paragraph()
        para.text = bullet
        para.font.size = Pt(16)
        para.font.color.rgb = INK
        para.space_after = Pt(8)
        para.level = 0


def save_prs(prs, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    prs.save(path)
    print(f"  Created {path.relative_to(ROOT.parent)}")


def gen_cfo_deck():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)
    add_title_slide(prs, "Evidence Room", "AP Agent Operating System — CFO Briefing")
    add_content_slide(prs, "The AP Challenge", [
        "Average cost to process one invoice: $9.40 (Ardent Partners, 2024)",
        "Best-in-class organisations achieve $2.78 per invoice — 79% lower",
        "Only 32.6% of invoices process straight-through without manual touch",
        "Exception rates average 14-18% across organisations",
        "Invoice processing takes 8-9 days on average",
        "AP teams spend 22% of time on supplier inquiries",
    ])
    add_content_slide(prs, "What Agentic AP Means", [
        "Not replacing your AP team — redesigning how they work",
        "AI agents handle repeatable analytical and administrative tasks",
        "Humans retain judgment, exceptions, supplier relationships, and controls",
        "Agents earn responsibility through demonstrated performance",
        "Governed autonomy — not autonomous payments",
        "Operates across your existing ERP and AP stack",
    ])
    add_content_slide(prs, "16-Agent Architecture", [f"{a['code']} {a['name']}" for a in AGENTS[:8]])
    add_content_slide(prs, "Agents 9-16", [f"{a['code']} {a['name']}" for a in AGENTS[8:]])
    add_content_slide(prs, "Agents Earn Responsibility", [f"Level {l['level']} — {l['name']}: {l['description']}" for l in RESPONSIBILITY_LEVELS])
    add_content_slide(prs, "Business Case (Illustrative)", [
        "Conservative scenario: 15% efficiency improvement",
        "Base scenario: 30% efficiency improvement",
        "Upside scenario: 45% efficiency improvement",
        "Payback typically 6-12 months for first agent",
        "Duplicate prevention alone can save $10K-$50K annually",
        "See ROI Calculator for organisation-specific modelling",
        "DISCLAIMER: Illustrative only — not a guarantee of savings",
    ])
    add_content_slide(prs, "Implementation Approach", [
        "Phase 0-1: Baseline and process discovery (5 weeks)",
        "Phase 2-4: Agent specification and prototype (7 weeks)",
        "Phase 5-7: Testing and shadow mode (7 weeks)",
        "Phase 8-10: Controlled execution and scale (ongoing)",
        "Accelerated: 4-6 weeks for one well-bounded agent",
        "Start with highest-volume, lowest-risk use case",
    ])
    add_content_slide(prs, "Evidence Room Product Suite", [
        "Free: AP AI Readiness Diagnostic",
        "Starter ($79): Core frameworks and top 10 agent blueprints",
        "Professional ($199): Full 16-agent OS with governance and ROI tools",
        "Team ($499): Enterprise workshop and change management pack",
        "Custom ($1,500-3,000): Bespoke transformation blueprint",
    ])
    add_content_slide(prs, "Recommended Next Steps", [
        "1. Complete the AP AI Readiness Diagnostic (free)",
        "2. Review readiness score with AP leadership team",
        "3. Select first bounded agent use case",
        "4. Establish baseline KPIs from current operations",
        "5. Begin 90-day implementation programme",
        "Contact: evidenceroom.ai",
    ])
    save_prs(prs, ROOT / "04_AP_AGENT_OS_TEAM/Executive/CFO_AP_Transformation_Deck.pptx")


def gen_workshop_deck():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)
    add_title_slide(prs, "AP Agent OS Workshop", "2-Day Facilitation Programme")
    add_content_slide(prs, "Day 1 — Discover", [
        "09:00 — Welcome and objectives",
        "09:30 — Current-state AP assessment",
        "10:30 — AP AI Readiness Diagnostic results review",
        "11:30 — Exception taxonomy and baseline analysis",
        "13:00 — Process walkthrough exercise",
        "14:30 — Agent architecture overview",
        "15:30 — First agent selection workshop",
        "16:30 — Day 1 wrap-up and actions",
    ])
    add_content_slide(prs, "Day 2 — Design", [
        "09:00 — Agent charter writing exercise",
        "10:30 — Governance and controls design",
        "11:30 — KPI framework establishment",
        "13:00 — Human vs agent decision mapping",
        "14:30 — 90-day implementation planning",
        "15:30 — Business case development",
        "16:30 — Executive readout preparation",
    ])
    add_content_slide(prs, "Workshop Exercise 1: Process Mapping", [
        "Select one AP subprocess (e.g., PO matching)",
        "Map current-state steps on wall template",
        "Identify: systems, decisions, exceptions, controls",
        "Mark each step: Human / Agent Recommend / Agent Prepare / Agent Execute",
        "Identify top 3 automation opportunities",
        "Document in Process Discovery template",
    ])
    add_content_slide(prs, "Workshop Exercise 2: Agent Selection", [
        "Score candidate agents on: volume, complexity, risk, data availability",
        "Apply Human vs Agent Decision Framework",
        "Select ONE agent for 90-day pilot",
        "Draft agent charter using template",
        "Define success criteria and KPIs",
        "Identify controls and approval gates",
    ])
    add_content_slide(prs, "Workshop Exercise 3: Governance Design", [
        "Assign human owners for each agent",
        "Define autonomy starting level (recommend Level 0-1)",
        "Map controls to agent risks",
        "Define escalation triggers",
        "Establish audit evidence requirements",
        "Create certification schedule",
    ])
    save_prs(prs, ROOT / "04_AP_AGENT_OS_TEAM/Workshop/AP_Workshop_Deck.pptx")


def gen_steering_committee():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)
    add_title_slide(prs, "Steering Committee Pack", "AP Agent Transformation Programme")
    add_content_slide(prs, "Programme Status", [
        "Current Phase: [Phase X — Name]",
        "Active Agent: [Agent Name] at Autonomy Level [X]",
        "Overall Readiness Score: [X%]",
        "Implementation Progress: [X%] complete",
        "Next Milestone: [Date — Milestone]",
    ])
    add_content_slide(prs, "KPI Dashboard", [
        "Cost per invoice: [Baseline] → [Current] (Target: [X])",
        "STP rate: [Baseline]% → [Current]% (Target: [X]%)",
        "Exception resolution time: [Baseline] → [Current] days",
        "Agent classification accuracy: [X]%",
        "Human intervention rate: [X]%",
        "Duplicate invoices detected: [X] this period",
    ])
    add_content_slide(prs, "Risks & Issues", [
        "[Risk/Issue 1] — Status: [Open/Mitigated] — Owner: [Name]",
        "[Risk/Issue 2] — Status: [Open/Mitigated] — Owner: [Name]",
        "[Risk/Issue 3] — Status: [Open/Mitigated] — Owner: [Name]",
        "Escalations this period: [X]",
        "Control breaches: [X]",
    ])
    add_content_slide(prs, "Decisions Required", [
        "1. Autonomy progression for [Agent Name]: Level [X] → Level [Y]?",
        "2. Approval to proceed to Phase [X]",
        "3. Budget approval for [next phase/tool]",
        "4. Resource allocation: [FTE requirements]",
    ])
    save_prs(prs, ROOT / "04_AP_AGENT_OS_TEAM/Executive/Steering_Committee_Pack.pptx")


def gen_business_case_deck():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)
    add_title_slide(prs, "AP Agent Business Case", "Evidence-Based Transformation Proposal")
    add_content_slide(prs, "Current State", [
        "Monthly invoice volume: [X]",
        "AP headcount: [X] FTE",
        "Cost per invoice: $[X] (benchmark: $9.40 average)",
        "STP rate: [X]% (benchmark: 32.6% average)",
        "Exception rate: [X]% (benchmark: 14-18%)",
        "Processing time: [X] days (benchmark: 8-9 days)",
    ])
    add_content_slide(prs, "Proposed Future State", [
        "16-agent architecture deployed in phases",
        "First agent: [Name] at Level [X] autonomy",
        "Target STP rate: [X]% within 12 months",
        "Target cost per invoice: $[X]",
        "Governed autonomy with human oversight",
        "Measurable KPI framework from day one",
    ])
    add_content_slide(prs, "Investment", [
        "Evidence Room AP Agent OS: $[199-499]",
        "Implementation (internal + external): $[X]",
        "AI/tool subscriptions (annual): $[X]",
        "Integration development: $[X]",
        "Training and change management: $[X]",
        "Total Year 1 investment: $[X]",
    ])
    add_content_slide(prs, "Expected Benefits (Illustrative)", [
        "Conservative (15%): $[X] annual benefit",
        "Base (30%): $[X] annual benefit",
        "Upside (45%): $[X] annual benefit",
        "Payback period: [X] months (base scenario)",
        "3-year ROI: [X]% (base scenario)",
        "DISCLAIMER: Estimates only — validate with your data",
    ])
    save_prs(prs, ROOT / "04_AP_AGENT_OS_TEAM/Executive/Business_Case_Deck.pptx")


def generate_all():
    print("Generating PowerPoint presentations...")
    gen_cfo_deck()
    gen_workshop_deck()
    gen_steering_committee()
    gen_business_case_deck()
    print("PowerPoint generation complete.")


if __name__ == "__main__":
    generate_all()
