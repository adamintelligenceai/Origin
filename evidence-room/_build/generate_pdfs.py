#!/usr/bin/env python3
"""Generate Evidence Room PDF product guides from key markdown via reportlab."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "_pdf"
PDF.mkdir(parents=True, exist_ok=True)

INK = HexColor("#0B1F33")
TEAL = HexColor("#1F6F78")
PAPER = HexColor("#F7F4EF")
AMBER = HexColor("#C47E2B")
MUTED = HexColor("#5C6B7A")


def styles():
    base = getSampleStyleSheet()
    styles = {
        "cover_brand": ParagraphStyle(
            "cover_brand",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=12,
            textColor=TEAL,
            spaceAfter=12,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=28,
            textColor=INK,
            leading=34,
            spaceAfter=16,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=12,
            textColor=MUTED,
            leading=16,
            spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            textColor=INK,
            spaceBefore=16,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            textColor=TEAL,
            spaceBefore=12,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=INK,
            leading=14,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=INK,
            leading=13,
            leftIndent=12,
            spaceAfter=3,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "callout": ParagraphStyle(
            "callout",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=9,
            textColor=MUTED,
            leading=12,
            spaceBefore=6,
            spaceAfter=10,
            borderPadding=6,
        ),
    }
    return styles


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, A4[0], A4[1], fill=0, stroke=0)
    canvas.setStrokeColor(TEAL)
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8 * mm, "Evidence Room — AP Agent OS · Confidential commercial product")
    canvas.drawRightString(A4[0] - 18 * mm, 8 * mm, f"Page {doc.page}")
    canvas.restoreState()


def cover_page(story, S, title, subtitle, tier):
    story.append(Spacer(1, 30 * mm))
    story.append(Paragraph("EVIDENCE ROOM", S["cover_brand"]))
    story.append(Paragraph(title, S["cover_title"]))
    story.append(Paragraph(subtitle, S["cover_sub"]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(tier, S["cover_sub"]))
    story.append(Paragraph("Version 1.0.0 · 2026-03-20", S["cover_sub"]))
    story.append(Paragraph("AI that earns responsibility.", S["callout"]))
    story.append(PageBreak())


def add_bullets(story, S, items):
    for item in items:
        story.append(Paragraph(f"• {item}", S["bullet"]))


def build_pdf(path, title, subtitle, tier, sections):
    S = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        title=title,
        author="Evidence Room",
    )
    story = []
    cover_page(story, S, title, subtitle, tier)
    for section in sections:
        kind = section[0]
        if kind == "h1":
            story.append(Paragraph(section[1], S["h1"]))
        elif kind == "h2":
            story.append(Paragraph(section[1], S["h2"]))
        elif kind == "p":
            story.append(Paragraph(section[1], S["body"]))
        elif kind == "bullets":
            add_bullets(story, S, section[1])
        elif kind == "callout":
            story.append(Paragraph(section[1], S["callout"]))
        elif kind == "page":
            story.append(PageBreak())
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return path


def free_diagnostic_pdf():
    sections = [
        ("h1", "Purpose"),
        ("p", "The AP AI Readiness Diagnostic helps Finance and AP leaders score their readiness to design governed AI agents across Accounts Payable. It is a lead magnet with executive utility — complete enough to start a Monday conversation after a Friday download."),
        ("h1", "How to use"),
        ("bullets", [
            "Score each of the 35 questions from 1 (absent/ad hoc) to 5 (continuously improved with evidence).",
            "Average scores by dimension: Process, Data, Controls, Technology, Skills, Governance.",
            "Map scores to maturity bands 1–5 and mark an opportunity heatmap.",
            "Select one bounded first-agent candidate — not a programme of sixteen.",
            "Capture baseline KPIs before any pilot.",
        ]),
        ("h1", "Maturity bands"),
        ("bullets", [
            "1 Initial — tribal knowledge; AI experiments unmanaged.",
            "2 Emerging — some documentation; inconsistent ownership.",
            "3 Structured — SOPs and RACI exist; measurement partial.",
            "4 Managed — KPIs, controls, and change control operate.",
            "5 Optimising — evidence-gated responsibility progression.",
        ]),
        ("h1", "Industry context (not targets)"),
        ("p", "Ardent Partners State of ePayables 2025 (Bottomline distribution): average cost per invoice $9.84; Best-in-Class $2.65; exception rate 18.4%; straight-through processing 35.4%; AI adoption 44% with more than 75% expected within 12 months. Use as external climate only."),
        ("h1", "Ten-agent opportunity overview"),
        ("bullets", [
            "Invoice Intake, Validation, Matching, Exception Triage",
            "Goods Receipt, Approval, Supplier Resolution",
            "Duplicate & Anomaly indicators, Payment Proposal Review",
            "AP Manager / Orchestrator",
        ]),
        ("callout", "Full question bank and Excel scorecard ship with the free package. Upgrade paths: Starter $79 · Professional $199 · Team $499."),
        ("h1", "Disclaimer"),
        ("p", "This diagnostic does not guarantee savings, ROI, fraud detection, regulatory compliance, accounting accuracy, or autonomous payment safety. Human accountability remains mandatory."),
    ]
    return build_pdf(
        PDF / "01_AP_AI_Readiness_Diagnostic.pdf",
        "AP AI Readiness Diagnostic",
        "Score readiness. Find the first bounded agent. Demand evidence before autonomy.",
        "Tier 0 — Free lead magnet",
        sections,
    )


def starter_pdf():
    sections = [
        ("h1", "What you bought"),
        ("p", "The AP Agent Starter Kit is a practical operating-model pack for designing one governed AP agent on the stack you already own. It is intentionally denser than a prompt pack: charters, taxonomy, controls checklist, KPIs, and an implementation path."),
        ("h1", "Monday start plan"),
        ("bullets", [
            "Hour 1: read Operating Model Overview and Responsibility Model summary.",
            "Hour 2–3: run readiness diagnostic; pick one exception-heavy use case.",
            "Day 2: complete Process Discovery for that slice.",
            "Day 3: write Agent Charter at Level 0 or 1.",
            "Day 4: map controls and KPIs.",
            "Day 5: define shadow-mode test set.",
        ]),
        ("h1", "Included artefacts"),
        ("bullets", [
            "AP Agent Operating Model overview",
            "Top 10 agent blueprints",
            "Exception taxonomy (starter view)",
            "Human-vs-agent decision framework",
            "Process-mapping template",
            "Agent job description & instruction templates",
            "KPI scorecard",
            "Governance checklist",
            "Transformation roadmap & implementation checklist",
        ]),
        ("h1", "Non-negotiables"),
        ("bullets", [
            "Agents earn responsibility — never default to full autonomy.",
            "Payment authorisation remains human.",
            "Duplicate/anomaly indicators are not a fraud-detection guarantee.",
            "Every live agent needs a named human owner.",
        ]),
        ("callout", "Price: US$79. Designed to feel worth significantly more in saved research and workshop time."),
        ("h1", "Upgrade"),
        ("p", "Professional ($199) adds the full 16-agent architecture, control matrix, ROI model, testing/shadow/pilot methodology, and executive packs. Team ($499) adds workshop, training, and change-management facilitation assets."),
    ]
    return build_pdf(
        PDF / "02_AP_Agent_Starter_Guide.pdf",
        "AP Agent Starter Kit",
        "Design one supervised agent end-to-end — Friday purchase, Monday redesign.",
        "Tier 1 — US$79",
        sections,
    )


def professional_pdf():
    sections = [
        ("h1", "Product definition"),
        ("p", "Evidence Room AP Agent OS — Professional is the complete operating system documentation set for building, governing, and measuring an AP agent workforce. It does not replace Tipalti, Coupa, Basware, Stampli, Medius, HighRadius, SAP, Oracle, Microsoft, or other AP/ERP platforms. It designs the agent layer across them."),
        ("h1", "Architecture"),
        ("bullets", [
            "16 detailed agent charters with exclusions, KPIs, and failure handling",
            "5-level earned responsibility model (Observe → Managed autonomy)",
            "10-step Observe-to-Expand methodology",
            "Full exception taxonomy with decision trees",
            "Governance framework and Agent Control Matrix",
            "KPI framework separating activity, operational, financial, and risk outcomes",
            "Business case / ROI calculator and agent economics",
            "Testing, UAT, shadow-mode, and pilot methodology",
            "Editable Excel, Word, and PowerPoint companions",
        ]),
        ("h1", "Commercial test"),
        ("p", "Would a Finance Director responsible for 15,000 invoices per month willingly pay US$199 because this saves days of research and supplies a credible implementation frame? The suite is built to that standard."),
        ("h1", "Evidence standard"),
        ("p", "Market claims are ledgered in 09_RESEARCH/RESEARCH_LEDGER.md. Customer-facing numbers prefer Ardent Partners 2024/2025 independent benchmarks and clearly separate illustrative examples from Evidence Room frameworks."),
        ("callout", "Price: US$199 · Licence: Professional (one named user for professional work) — see legal pack."),
    ]
    return build_pdf(
        PDF / "03_AP_Agent_OS_Professional.pdf",
        "AP Agent OS — Professional",
        "The operating system for AP agents: architecture, controls, KPIs, economics.",
        "Tier 2 — US$199",
        sections,
    )


def team_pdf():
    sections = [
        ("h1", "Who this is for"),
        ("p", "Transformation leaders, Shared Services heads, and AP leadership teams running a real workshop or multi-week initiative. The Team Edition must be facilitation-ready tomorrow."),
        ("h1", "What is included"),
        ("bullets", [
            "Everything in Professional",
            "Internal team licence positioning",
            "Workshop deck + facilitation pack",
            "Stakeholder interview guide & process-owner questionnaires",
            "Exercises and maturity assessment",
            "CFO transformation deck, steering pack, business case deck",
            "Implementation & benefits trackers",
            "Change-management toolkit and executive communications",
        ]),
        ("h1", "Workshop spine"),
        ("bullets", [
            "Process truth → Human vs agent → First charter → Controls & KPIs → Commitments",
            "No production actions without charter and controls",
            "Steering date booked before leaving the room",
        ]),
        ("callout", "Price: US$499 · Suitable for enterprise transformation sessions."),
    ]
    return build_pdf(
        PDF / "04_AP_Agent_OS_Team_Playbook.pdf",
        "AP Agent OS — Team Edition",
        "Facilitation-ready operating system for enterprise AP AI initiatives.",
        "Tier 3 — US$499",
        sections,
    )


def custom_pdf():
    sections = [
        ("h1", "Productised service"),
        ("p", "The AP Transformation Blueprint is a repeatable, AI-assisted service. The customer completes a structured intake. Evidence Room returns a current-state assessment, maturity score, opportunity map, recommended agent architecture, operating model, KPI baseline, controls frame, business case, roadmap, 90-day plan, and executive presentation."),
        ("h1", "Price band"),
        ("p", "US$1,500–$3,000 initially, scoped by entity complexity and invoice volume. Not open-ended consulting by the hour — a defined deliverable pack."),
        ("h1", "Fulfilment principles"),
        ("bullets", [
            "Intake questionnaire required before work starts",
            "No confidential employer data from Evidence Room authors enters client packs",
            "Human expert review of AI-assisted drafts before delivery",
            "Clear exclusions: we do not operate your payments or ERP",
        ]),
        ("callout", "Application / checkout via Lemon Squeezy with manual fulfilment workflow."),
    ]
    return build_pdf(
        PDF / "05_AP_Transformation_Blueprint_Brochure.pdf",
        "AP Transformation Blueprint",
        "Productised assessment and 90-day agent workforce plan.",
        "Tier 4 — US$1,500–$3,000",
        sections,
    )


def main():
    paths = [
        free_diagnostic_pdf(),
        starter_pdf(),
        professional_pdf(),
        team_pdf(),
        custom_pdf(),
    ]
    for p in paths:
        print(f"Wrote {p}")


if __name__ == "__main__":
    main()
