#!/usr/bin/env python3
"""Evidence Room AP Agent OS — Complete Product Generator."""

import csv
import json
import os
import shutil
import textwrap
from datetime import datetime
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt, RGBColor
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from pptx import Presentation
from pptx.util import Inches as PptxInches, Pt as PptxPt
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from brand import BRAND

ROOT = Path(__file__).resolve().parent.parent
BUILD = Path(__file__).resolve().parent
DATA = BUILD / "data"
VERSION = "1.0.0"
DATE = datetime.now().strftime("%B %Y")

# ── Helpers ──────────────────────────────────────────────────────────────────

def ensure_dir(p: Path) -> Path:
    p.mkdir(parents=True, exist_ok=True)
    return p

def load_json(name: str):
    with open(DATA / name, encoding="utf-8") as f:
        return json.load(f)

def write_text(path: Path, content: str):
    ensure_dir(path.parent)
    path.write_text(content, encoding="utf-8")

def brand_color(name: str) -> str:
    return BRAND["colors"].get(name, "#0B1220")

def hex_to_rgb(h: str) -> RGBColor:
    h = h.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))

def style_header_cell(cell, text, bg=brand_color("accent")):
    cell.value = text
    cell.font = Font(bold=True, color="FFFFFF", size=11, name="Calibri")
    cell.fill = PatternFill("solid", fgColor=bg.lstrip("#"))
    cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

def style_data_cell(cell, wrap=True):
    cell.alignment = Alignment(vertical="top", wrap_text=wrap)
    cell.font = Font(size=10, name="Calibri")

def auto_width(ws, min_w=12, max_w=50):
    for col in ws.columns:
        letter = get_column_letter(col[0].column)
        lengths = [len(str(c.value or "")) for c in col]
        ws.column_dimensions[letter].width = min(max(max(lengths) + 2, min_w), max_w)

THIN = Side(style="thin", color="CCCCCC")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

def apply_table_border(ws, rows, cols):
    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            ws.cell(r, c).border = BORDER

# ── PDF Generation ───────────────────────────────────────────────────────────

def pdf_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="ER_Title", parent=styles["Title"],
        fontName="Helvetica-Bold", fontSize=28, leading=34,
        textColor=colors.HexColor(brand_color("ink")), spaceAfter=20,
    ))
    styles.add(ParagraphStyle(
        name="ER_Subtitle", parent=styles["Normal"],
        fontName="Helvetica", fontSize=14, leading=18,
        textColor=colors.HexColor(brand_color("graphite")), spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name="ER_H1", parent=styles["Heading1"],
        fontName="Helvetica-Bold", fontSize=18, leading=22,
        textColor=colors.HexColor(brand_color("accent")), spaceBefore=18, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="ER_H2", parent=styles["Heading2"],
        fontName="Helvetica-Bold", fontSize=14, leading=18,
        textColor=colors.HexColor(brand_color("slate")), spaceBefore=14, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="ER_Body", parent=styles["Normal"],
        fontName="Helvetica", fontSize=10.5, leading=15,
        textColor=colors.HexColor(brand_color("ink")), alignment=TA_JUSTIFY, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="ER_Bullet", parent=styles["Normal"],
        fontName="Helvetica", fontSize=10.5, leading=15,
        textColor=colors.HexColor(brand_color("ink")), leftIndent=20, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="ER_CoverBrand", parent=styles["Normal"],
        fontName="Helvetica-Bold", fontSize=11, leading=14,
        textColor=colors.HexColor(brand_color("signal")), spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="ER_Footer", parent=styles["Normal"],
        fontName="Helvetica", fontSize=8, leading=10,
        textColor=colors.HexColor(brand_color("stone")),
    ))
    return styles

def add_cover_page(story, styles, title: str, subtitle: str, tier: str = ""):
    story.append(Spacer(1, 2.5 * inch))
    story.append(Paragraph("EVIDENCE ROOM", styles["ER_CoverBrand"]))
    story.append(Paragraph(title, styles["ER_Title"]))
    story.append(Paragraph(subtitle, styles["ER_Subtitle"]))
    if tier:
        story.append(Spacer(1, 0.3 * inch))
        story.append(Paragraph(tier, styles["ER_H2"]))
    story.append(Spacer(1, 1 * inch))
    story.append(Paragraph(f"Version {VERSION} · {DATE}", styles["ER_Footer"]))
    story.append(Paragraph("evidenceroom.ai", styles["ER_Footer"]))
    story.append(PageBreak())

def build_pdf(path: Path, title: str, subtitle: str, sections: list, tier: str = ""):
    ensure_dir(path.parent)
    doc = SimpleDocTemplate(str(path), pagesize=A4,
                            leftMargin=0.9*inch, rightMargin=0.9*inch,
                            topMargin=0.8*inch, bottomMargin=0.8*inch)
    styles = pdf_styles()
    story = []
    add_cover_page(story, styles, title, subtitle, tier)
    for sec in sections:
        if sec.get("page_break"):
            story.append(PageBreak())
        if sec.get("h1"):
            story.append(Paragraph(sec["h1"], styles["ER_H1"]))
        if sec.get("h2"):
            story.append(Paragraph(sec["h2"], styles["ER_H2"]))
        for para in sec.get("body", []):
            story.append(Paragraph(para, styles["ER_Body"]))
        for bullet in sec.get("bullets", []):
            story.append(Paragraph(f"• {bullet}", styles["ER_Bullet"]))
        if sec.get("table"):
            t = sec["table"]
            data = [t["headers"]] + t["rows"]
            tbl = Table(data, repeatRows=1)
            tbl.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(brand_color("accent"))),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor(brand_color("cloud"))),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor(brand_color("paper"))]),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]))
            story.append(tbl)
            story.append(Spacer(1, 12))
    doc.build(story)

# ── Word Generation ──────────────────────────────────────────────────────────

def build_docx(path: Path, title: str, sections: list):
    ensure_dir(path.parent)
    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("EVIDENCE ROOM")
    run.bold = True
    run.font.size = Pt(11)
    run.font.color.rgb = hex_to_rgb(brand_color("signal"))
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(title)
    run.bold = True
    run.font.size = Pt(22)
    run.font.color.rgb = hex_to_rgb(brand_color("ink"))
    doc.add_paragraph()
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

# ── Excel Generation ─────────────────────────────────────────────────────────

def build_kpi_scorecard(path: Path):
    wb = Workbook()
    ws = wb.active
    ws.title = "KPI Definitions"
    headers = ["Category", "KPI", "Definition", "Formula", "Data Source", "Frequency", "Target Direction", "Owner"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    kpis = [
        ("Activity", "Invoices Processed", "Total invoices processed in period", "COUNT(invoices)", "AP system", "Daily", "Track volume", "AP Manager"),
        ("Activity", "Exceptions Handled", "Exceptions resolved in period", "COUNT(resolved_exceptions)", "Workflow", "Daily", "Increase", "AP Team Lead"),
        ("Activity", "Agent Tasks Completed", "Tasks completed by agent workforce", "COUNT(agent_outputs)", "Orchestrator", "Daily", "Increase", "AP Manager"),
        ("Operational", "Straight-Through Processing Rate", "% invoices processed without manual touch", "STP_invoices / total_invoices × 100", "AP system", "Weekly", "Increase", "AP Manager"),
        ("Operational", "Exception Rate", "% invoices entering exception", "exceptions / total_invoices × 100", "Workflow", "Weekly", "Decrease", "AP Manager"),
        ("Operational", "Average Resolution Time", "Mean time to resolve exception", "SUM(resolution_hours) / COUNT(exceptions)", "Workflow", "Weekly", "Decrease", "AP Team Lead"),
        ("Operational", "Time to Invoice Posting", "Receipt to posting cycle time", "AVG(posting_date - receipt_date)", "AP system", "Weekly", "Decrease", "AP Manager"),
        ("Operational", "Human Intervention Rate", "% transactions requiring human action", "human_touches / total_transactions × 100", "Agent logs", "Weekly", "Decrease", "AP Manager"),
        ("Operational", "Classification Accuracy", "% exceptions correctly classified", "correct_classifications / total × 100", "QA sample", "Monthly", "Increase", "AP Manager"),
        ("Operational", "Matching Accuracy", "% auto-matches confirmed correct", "correct_matches / auto_matches × 100", "QA sample", "Monthly", "Increase", "AP Team Lead"),
        ("Operational", "Repeat Exception Rate", "% exceptions recurring within 90 days", "repeat_exceptions / total × 100", "Exception DB", "Monthly", "Decrease", "Process Owner"),
        ("Financial", "Cost Per Invoice", "All-inclusive processing cost", "(AP_costs) / invoice_count", "Finance + AP", "Monthly", "Decrease", "CFO"),
        ("Financial", "Cost Per Exception Resolved", "Cost to resolve one exception", "exception_costs / resolved_count", "Finance + AP", "Monthly", "Decrease", "AP Manager"),
        ("Financial", "AI Inference Cost", "Total AI/API costs for agents", "SUM(agent_api_costs)", "Agent platform", "Monthly", "Optimise", "AP Manager"),
        ("Financial", "Cost Per Correct Outcome", "Total cost / validated correct outcomes", "(human + AI + tech) / correct_outcomes", "Finance", "Monthly", "Decrease", "CFO"),
        ("Financial", "Estimated Hours Released", "Human hours redirected from automation", "baseline_hours - current_hours", "Time study", "Quarterly", "Increase", "CFO"),
        ("Risk/Control", "Control Breaches", "Instances of control failure", "COUNT(breaches)", "Control log", "Monthly", "Decrease", "Internal Controls"),
        ("Risk/Control", "Duplicate Payments Prevented", "Duplicates caught before payment", "COUNT(prevented)", "Payment review", "Monthly", "Track", "AP Manager"),
        ("Risk/Control", "Audit Exceptions", "Audit findings related to AP agents", "COUNT(findings)", "Audit", "Annual", "Decrease", "Internal Audit"),
        ("Risk/Control", "Escalation Rate", "% items escalated to management", "escalations / total_items × 100", "Workflow", "Monthly", "Monitor", "AP Manager"),
        ("Risk/Control", "False Positive Rate", "% agent flags incorrectly raised", "false_positives / total_flags × 100", "QA sample", "Monthly", "Decrease", "AP Manager"),
    ]
    for r, row in enumerate(kpis, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(kpis) + 1, len(headers))
    auto_width(ws)

    ws2 = wb.create_sheet("Scorecard")
    sc_headers = ["KPI", "Baseline", "Current", "Target", "Variance", "Status", "Period"]
    for i, h in enumerate(sc_headers, 1):
        style_header_cell(ws2.cell(1, i), h)
    for r, kpi in enumerate(kpis[:15], 2):
        style_data_cell(ws2.cell(r, 1))
        ws2.cell(r, 1).value = kpi[1]
        for c in range(2, 8):
            style_data_cell(ws2.cell(r, c))
    apply_table_border(ws2, 16, len(sc_headers))
    auto_width(ws2)
    wb.save(str(path))

def build_roi_calculator(path: Path):
    wb = Workbook()
    ws = wb.active
    ws.title = "ROI Model"
    inputs = [
        ("Monthly Invoice Volume", 5000, "invoices/month"),
        ("AP Headcount (FTE)", 8, "people"),
        ("Fully Loaded Labour Cost", 75000, "USD/year per FTE"),
        ("Manual Touch Rate", 0.68, "% of invoices"),
        ("Exception Rate", 0.14, "% of invoices"),
        ("Avg Exception Resolution (minutes)", 25, "minutes"),
        ("Duplicate Invoice Rate", 0.008, "% of invoices"),
        ("Cost Per Invoice (current)", 9.40, "USD (Ardent benchmark)"),
        ("AI/Tool Monthly Cost", 2500, "USD/month"),
        ("Implementation Cost (one-time)", 50000, "USD"),
        ("Expected Efficiency Gain (Base)", 0.25, "% reduction in manual work"),
        ("Expected STP Improvement (Base)", 0.15, "percentage points"),
    ]
    ws["A1"] = "EVIDENCE ROOM — AP Agent ROI Calculator"
    ws["A1"].font = Font(bold=True, size=14, color=brand_color("accent").lstrip("#"))
    ws.merge_cells("A1:D1")
    style_header_cell(ws["A3"], "Input")
    style_header_cell(ws["B3"], "Value")
    style_header_cell(ws["C3"], "Unit")
    style_header_cell(ws["D3"], "Notes")
    for r, (label, val, unit) in enumerate(inputs, 4):
        ws.cell(r, 1).value = label
        ws.cell(r, 2).value = val
        ws.cell(r, 3).value = unit
        for c in range(1, 5):
            style_data_cell(ws.cell(r, c))
    notes = {
        4: "Adjust to your organisation",
        7: "Ardent Partners 2025 benchmark: 14%",
        10: "Ardent Partners 2025: $9.40 average",
        12: "Conservative: 15-20%; Base: 25-35%; Upside: 40-50%",
    }
    for r, note in notes.items():
        ws.cell(r, 4).value = note

    start = len(inputs) + 6
    ws.cell(start, 1).value = "OUTPUTS"
    ws.cell(start, 1).font = Font(bold=True, size=12)
    outputs = [
        ("Annual Invoice Volume", "=B4*12"),
        ("Annual AP Labour Cost", "=B5*B6"),
        ("Annual Manual Touches", "=B17*B7"),
        ("Annual Exceptions", "=B17*B8"),
        ("Exception Hours/Year", "=B19*B9/60"),
        ("Baseline Processing Cost", "=B17*B10"),
        ("Conservative Savings (15%)", "=B21*0.15"),
        ("Base Savings (25%)", "=B21*0.25"),
        ("Upside Savings (35%)", "=B21*0.35"),
        ("Annual AI Cost", "=B11*12"),
        ("Net Base Savings (Year 1)", "=B24-B26-B12"),
        ("Payback Period (months)", "=B12/(B24/12)"),
        ("3-Year Base ROI", "=(B24*3-B12-B26*3)/(B12+B26*3)"),
    ]
    style_header_cell(ws.cell(start + 1, 1), "Metric")
    style_header_cell(ws.cell(start + 1, 2), "Value")
    style_header_cell(ws.cell(start + 1, 3), "Formula/Notes")
    for i, (label, formula) in enumerate(outputs):
        r = start + 2 + i
        ws.cell(r, 1).value = label
        ws.cell(r, 2).value = formula
        for c in range(1, 4):
            style_data_cell(ws.cell(r, c))

    ws3 = wb.create_sheet("Scenarios")
    style_header_cell(ws3["A1"], "Scenario")
    style_header_cell(ws3["B1"], "Efficiency Gain")
    style_header_cell(ws3["C1"], "Annual Savings")
    style_header_cell(ws3["D1"], "Payback (months)")
    scenarios = [("Conservative", 0.15), ("Base", 0.25), ("Upside", 0.35)]
    for r, (name, gain) in enumerate(scenarios, 2):
        ws3.cell(r, 1).value = name
        ws3.cell(r, 2).value = gain
        ws3.cell(r, 3).value = f"='ROI Model'!B21*{gain}"
        ws3.cell(r, 4).value = f"='ROI Model'!B12/(C{r}/12)"
    auto_width(ws)
    auto_width(ws3)
    wb.save(str(path))

def build_agent_registry(path: Path, agents: list):
    wb = Workbook()
    ws = wb.active
    ws.title = "Agent Registry"
    headers = ["ID", "Agent Name", "Purpose", "Human Owner", "Autonomy Level", "Status", "Go-Live Date", "KPIs"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    for r, a in enumerate(agents, 2):
        row = [a["id"], a["name"], a["purpose"], a["human_owner"],
               f"Level {a['autonomy_default']}", "Planned", "", ", ".join(a["kpis"][:3])]
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(agents) + 1, len(headers))
    auto_width(ws)
    wb.save(str(path))

def build_exception_tracker(path: Path, exceptions: list):
    wb = Workbook()
    ws = wb.active
    ws.title = "Exception Taxonomy"
    headers = ["Code", "Category", "Definition", "Root Cause", "Resolution", "Responsible", "Agent", "Automation", "Risk"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    for r, e in enumerate(exceptions, 2):
        row = [e["code"], e["category"], e["definition"], e["root_cause"],
               e["resolution"], e["responsible"], e["agent"], e["automation"], e["risk"]]
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(exceptions) + 1, len(headers))
    auto_width(ws)

    ws2 = wb.create_sheet("Exception Tracker")
    track_headers = ["Date", "Invoice Ref", "Exception Code", "Category", "Amount", "Owner", "Status", "Age (days)", "Resolution"]
    for i, h in enumerate(track_headers, 1):
        style_header_cell(ws2.cell(1, i), h)
    examples = [
        ("2026-01-15", "INV-2026-004521", "EXC-007", "Missing Receipt", 12500, "J. Smith", "Open", 12, ""),
        ("2026-01-18", "INV-2026-004589", "EXC-005", "Price Mismatch", 3200, "A. Chen", "In Progress", 9, "PO amendment requested"),
        ("2026-01-20", "INV-2026-004612", "EXC-009", "Duplicate Invoice", 8750, "AP Team", "Resolved", 0, "Rejected — prior payment confirmed"),
    ]
    for r, row in enumerate(examples, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws2.cell(r, c))
            ws2.cell(r, c).value = val
    apply_table_border(ws2, len(examples) + 1, len(track_headers))
    auto_width(ws2)
    wb.save(str(path))

def build_controls_matrix(path: Path, agents: list):
    wb = Workbook()
    ws = wb.active
    ws.title = "Control Matrix"
    headers = ["Agent", "Risk", "Control", "Type", "Human Owner", "Evidence", "Frequency", "Escalation Trigger"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    controls = [
        ("Invoice Intake", "Incorrect routing", "Dual validation of entity assignment", "Preventive", "AP Ops Manager", "Intake log", "Per transaction", "Wrong entity >$10k"),
        ("Invoice Validation", "Duplicate payment", "Duplicate detection before matching", "Detective", "AP Team Lead", "Duplicate report", "Per transaction", "Any duplicate flag"),
        ("Matching", "Overpayment", "Tolerance rules approved by Finance", "Preventive", "Controller", "Tolerance config v1.x", "Quarterly review", "Variance >tolerance"),
        ("Exception Triage", "Misclassification", "Monthly QA sample of 5%", "Detective", "AP Manager", "QA results", "Monthly", "Accuracy <95%"),
        ("Goods Receipt", "Premature posting", "No auto-receipt creation", "Preventive", "AP Ops Manager", "Agent config", "Continuous", "Any auto-receipt attempt"),
        ("Approval", "Unauthorized approval", "Agent cannot self-approve", "Preventive", "AP Manager", "Segregation config", "Continuous", "Any approval attempt"),
        ("Supplier Resolution", "Unauthorized commitment", "All outbound comms require approval", "Preventive", "AP Team Lead", "Approval log", "Per communication", "Unapproved send"),
        ("Duplicate & Anomaly", "False accusation", "Human review mandatory for blocks", "Detective", "Internal Controls", "Review log", "Per flag", "Payment block"),
        ("Payment Proposal Review", "Unauthorized payment", "Payment auth segregated from review", "Preventive", "Treasury", "Auth workflow", "Per payment run", "Missing approval"),
        ("AP Close", "Incomplete close", "Close checklist sign-off required", "Preventive", "Controller", "Sign-off record", "Monthly", "Material open items"),
        ("Orchestrator", "Autonomy creep", "Autonomy changes require approval", "Preventive", "AP Manager", "Change log", "Per change", "Unauthorized level increase"),
    ]
    for r, row in enumerate(controls, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(controls) + 1, len(headers))
    auto_width(ws)
    wb.save(str(path))

def build_maturity_diagnostic(path: Path):
    wb = Workbook()
    ws = wb.active
    ws.title = "Diagnostic Questions"
    headers = ["#", "Domain", "Question", "Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Your Score", "Notes"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    questions = [
        (1, "Process", "How standardised is your AP invoice processing workflow across business units?", "Ad hoc", "Partially standard", "Mostly standard", "Fully standard", "Optimised", "", ""),
        (2, "Process", "What percentage of invoices are processed straight-through without manual intervention?", "<10%", "10-25%", "25-40%", "40-60%", ">60%", "", ""),
        (3, "Process", "How well-documented are your AP exception handling procedures?", "Not documented", "Informal", "Partially documented", "Documented", "Continuously improved", "", ""),
        (4, "Data", "How complete and accurate is your supplier master data?", "Poor", "Below average", "Average", "Good", "Excellent", "", ""),
        (5, "Data", "What percentage of invoices arrive electronically?", "<20%", "20-40%", "40-60%", "60-80%", ">80%", "", ""),
        (6, "Technology", "How integrated is your AP process with ERP and procurement systems?", "Manual/spreadsheets", "Basic integration", "Moderate integration", "Well integrated", "Fully automated", "", ""),
        (7, "Technology", "Do you currently use OCR or intelligent document processing for invoices?", "No", "Pilot", "Partial deployment", "Most invoices", "All channels", "", ""),
        (8, "Technology", "Do you have workflow automation for AP exceptions?", "No", "Basic routing", "Structured workflows", "Advanced workflows", "AI-assisted routing", "", ""),
        (9, "Governance", "Is there a defined AI/automation governance framework in Finance?", "None", "Informal", "Draft", "Approved", "Certified annually", "", ""),
        (10, "Governance", "Are AP controls mapped to automation and AI decisions?", "No", "Partially", "Most controls", "Fully mapped", "Continuously tested", "", ""),
        (11, "People", "Does your AP team have capacity for transformation alongside daily operations?", "No capacity", "Minimal", "Some capacity", "Dedicated resource", "Transformation team", "", ""),
        (12, "People", "Is there executive sponsorship for AP AI transformation?", "None", "Informal interest", "Approved initiative", "Funded programme", "Strategic priority", "", ""),
        (13, "Metrics", "Do you track cost-per-invoice and exception rate consistently?", "No", "Occasionally", "Monthly", "Weekly", "Real-time dashboard", "", ""),
        (14, "Metrics", "Can you baseline agent/AI performance against human benchmarks?", "No data", "Limited", "Some baselines", "Comprehensive", "Continuous benchmarking", "", ""),
        (15, "Agents", "Have you identified specific AP tasks suitable for AI agents?", "Not considered", "Brainstormed", "Prioritised list", "Pilot defined", "Agents in production", "", ""),
        (16, "Agents", "Do you have a framework for AI agents earning increased responsibility?", "None", "Conceptual", "Draft framework", "Implemented", "Mature with metrics", "", ""),
        (17, "Risk", "How do you manage supplier bank detail change verification?", "Manual/ad hoc", "Email verification", "Structured process", "Multi-channel verification", "Automated + human", "", ""),
        (18, "Risk", "Is there segregation of duties between invoice processing and payment authorisation?", "Weak", "Partial", "Adequate", "Strong", "Certified/tested", "", ""),
        (19, "Change", "Is there a change management plan for AP AI adoption?", "None", "Informal", "Draft plan", "Active plan", "Embedded in operations", "", ""),
        (20, "Change", "How would you rate stakeholder readiness for AI agents in AP?", "Resistant", "Skeptical", "Cautious", "Supportive", "Championing", "", ""),
    ]
    for r, q in enumerate(questions, 2):
        for c, val in enumerate(q, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(questions) + 1, len(headers))
    auto_width(ws)

    ws2 = wb.create_sheet("Maturity Model")
    style_header_cell(ws2["A1"], "Score Range")
    style_header_cell(ws2["B1"], "Maturity Level")
    style_header_cell(ws2["C1"], "Description")
    levels = [
        ("20-40", "Level 1 — Aware", "AP AI is understood conceptually but no structured initiative"),
        ("41-60", "Level 2 — Exploring", "Pilots or POCs underway; governance emerging"),
        ("61-80", "Level 3 — Implementing", "Agents deployed with controls; measuring performance"),
        ("81-100", "Level 4 — Optimising", "Agent workforce operating with earned autonomy; continuous improvement"),
    ]
    for r, row in enumerate(levels, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws2.cell(r, c))
            ws2.cell(r, c).value = val
    wb.save(str(path))

def build_implementation_roadmap(path: Path):
    wb = Workbook()
    ws = wb.active
    ws.title = "Roadmap"
    headers = ["Phase", "Name", "Duration", "Activities", "Deliverables", "Owner", "Status"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    phases = [
        ("0", "Baseline & Readiness", "1-2 weeks", "Run diagnostic, baseline KPIs, secure sponsorship", "Readiness score, KPI baseline, charter", "AP Manager", ""),
        ("1", "Process Discovery", "2-3 weeks", "Walkthroughs, transcription, extraction", "Process maps, exception taxonomy, RACI", "Process Owner", ""),
        ("2", "Agent Specification", "1-2 weeks", "Define first agent charter, controls, KPIs", "Agent spec, control matrix, test plan", "AP Manager", ""),
        ("3", "Data & Tool Access", "2-4 weeks", "API access, data quality, security review", "Access granted, data validated", "IT / Finance Systems", ""),
        ("4", "Prototype", "2-3 weeks", "Build agent logic, integrate tools", "Working prototype", "AI Lead", ""),
        ("5", "Historical Testing", "1-2 weeks", "Run against historical invoices", "Test results, accuracy report", "AP Team Lead", ""),
        ("6", "Shadow Mode", "2-4 weeks", "Agent runs without action permissions", "Shadow performance data", "AP Manager", ""),
        ("7", "Controlled Execution", "4-6 weeks", "Limited users/transactions/categories", "Pilot results", "AP Manager", ""),
        ("8", "Performance Review", "1 week", "Compare against baseline, QA sample", "Performance report", "AP Manager", ""),
        ("9", "Responsibility Progression", "Ongoing", "Evaluate autonomy level increase", "Autonomy decision record", "AP Manager + Controls", ""),
        ("10", "Scale", "Ongoing", "Expand agents, categories, volume", "Scaled operating model", "Head of Shared Services", ""),
    ]
    for r, row in enumerate(phases, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(phases) + 1, len(headers))
    auto_width(ws)
    wb.save(str(path))

def build_benefits_tracker(path: Path):
    wb = Workbook()
    ws = wb.active
    ws.title = "Benefits Tracker"
    headers = ["Benefit", "Baseline", "Target", "Current", "Validated?", "Evidence", "Owner", "Review Date"]
    for i, h in enumerate(headers, 1):
        style_header_cell(ws.cell(1, i), h)
    benefits = [
        ("Cost per invoice", "$9.40", "$7.00", "", "No", "Ardent benchmark baseline", "CFO", ""),
        ("Exception rate", "14%", "10%", "", "No", "Ardent benchmark baseline", "AP Manager", ""),
        ("STP rate", "33%", "45%", "", "No", "Ardent benchmark baseline", "AP Manager", ""),
        ("Avg resolution time", "25 min", "15 min", "", "No", "Internal baseline TBD", "AP Team Lead", ""),
        ("Human hours released/month", "0", "120", "", "No", "Time study required", "CFO", ""),
        ("Duplicate payments prevented", "0", "Track", "", "No", "Payment review log", "AP Manager", ""),
    ]
    for r, row in enumerate(benefits, 2):
        for c, val in enumerate(row, 1):
            style_data_cell(ws.cell(r, c))
            ws.cell(r, c).value = val
    apply_table_border(ws, len(benefits) + 1, len(headers))
    auto_width(ws)
    wb.save(str(path))

def build_business_case_model(path: Path):
    shutil.copy(str(path.parent / "ROI_Calculator.xlsx") if (path.parent / "ROI_Calculator.xlsx").exists() else str(path), str(path))
    # Will be generated after ROI calculator in main()

# ── PowerPoint ───────────────────────────────────────────────────────────────

def build_pptx(path: Path, title: str, slides: list):
    ensure_dir(path.parent)
    prs = Presentation()
    prs.slide_width = PptxInches(13.333)
    prs.slide_height = PptxInches(7.5)

    # Title slide
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    txBox = slide.shapes.add_textbox(PptxInches(1), PptxInches(2.5), PptxInches(11), PptxInches(1))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = "EVIDENCE ROOM"
    p.font.size = PptxPt(14)
    p.font.bold = True
    p2 = tf.add_paragraph()
    p2.text = title
    p2.font.size = PptxPt(32)
    p2.font.bold = True

    for s in slides:
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        txBox = slide.shapes.add_textbox(PptxInches(0.8), PptxInches(0.5), PptxInches(11.5), PptxInches(6.5))
        tf = txBox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = s.get("title", "")
        p.font.size = PptxPt(24)
        p.font.bold = True
        for bullet in s.get("bullets", []):
            bp = tf.add_paragraph()
            bp.text = f"• {bullet}"
            bp.font.size = PptxPt(16)
            bp.space_before = PptxPt(8)
        if s.get("body"):
            bp = tf.add_paragraph()
            bp.text = s["body"]
            bp.font.size = PptxPt(14)
    prs.save(str(path))

# ── Content Generators ───────────────────────────────────────────────────────

def generate_readme():
    return f"""# EVIDENCE ROOM — AP Agent OS

**Version {VERSION} · {DATE}**

## What This Is

Evidence Room AP Agent OS is the operating system for building, governing, and scaling AI agents across Accounts Payable. It is an implementation-ready toolkit — not a prompt pack, not an ebook, not consulting jargon.

## Directory Structure

```
EVIDENCE_ROOM/
├── 00_READ_ME/              ← Start here
├── 01_FREE_AP_AI_READINESS/ ← Free diagnostic (lead magnet)
├── 02_AP_AGENT_STARTER/     ← Starter Kit ($79)
├── 03_AP_AGENT_OS_PRO/      ← Professional ($199)
├── 04_AP_AGENT_OS_TEAM/     ← Team Edition ($499)
├── 05_CUSTOM_BLUEPRINT/     ← Custom service ($1,500–3,000)
├── 06_SALES_AND_MARKETING/  ← Launch content & funnel
├── 07_LEMON_SQUEEZY/        ← Commerce setup
├── 08_WEBSITE/              ← Website copy & HTML
├── 09_RESEARCH/             ← Evidence ledger & competitor review
└── 10_LEGAL_AND_LICENSING/  ← Terms, disclaimers, IP checklist
```

## Quick Start

1. Read `00_READ_ME/Quick_Start_Guide.pdf`
2. Complete the AP AI Readiness Diagnostic (`01_FREE_AP_AI_READINESS/`)
3. Follow the tier-appropriate implementation path
4. Select your first agent using the Agent Selection Framework
5. Write your first Agent Charter using the template provided

## Product Tiers

| Tier | Product | Price | Best For |
|------|---------|-------|----------|
| 0 | AP AI Readiness Diagnostic | Free | Initial assessment |
| 1 | AP Agent Starter Kit | $79 | Individual AP leaders |
| 2 | AP Agent OS Professional | $199 | Implementation teams |
| 3 | AP Agent OS Team Edition | $499 | Enterprise transformation |
| 4 | AP Transformation Blueprint | $1,500–3,000 | Guided custom assessment |

## Support

Visit [evidenceroom.ai](https://evidenceroom.ai) for product information and updates.

---

© {datetime.now().year} Evidence Room. All rights reserved.
"""

def generate_master_prompt_refined():
    return textwrap.dedent("""\
# EVIDENCE ROOM — AP AGENT OS
## Master Product-Build & Commercialisation Prompt (Refined)

> **Execution directive:** This prompt is the authoritative specification for building Evidence Room AP Agent OS from zero to commercial launch. Every stage must produce tangible artifacts — not recommendations. Quality gate: nothing ships below 9/10 on the Product Quality Standard (Section 29).

---

### 0. MISSION STATEMENT

Build **Evidence Room — AP Agent OS**: the operating system for building, governing, and scaling AI agents across Accounts Payable.

**Positioning:** Evidence over hype. AI that earns responsibility. Governed agents. Measurable outcomes.

**Anti-patterns (explicit exclusions):** Generic prompt packs · AI ebooks · Superficial templates · Theoretical reports · Consulting jargon · Screenshot collections · Autonomous payment systems · Accounting systems · ERP replacements.

**Success test:** A Finance Director processing 15,000 invoices/month would pay $199 of their own money because this saves days of research and provides a credible implementation framework.

---

### 1. COMMERCIAL OBJECTIVE

| # | Objective | Constraint |
|---|-----------|------------|
| 1 | Immediate digital-product revenue | Launch with 4 paid tiers + 1 free |
| 2 | No bespoke software at launch | Templates, frameworks, spreadsheets, PDFs |
| 3 | Near-zero marginal delivery cost | Digital download + automated fulfilment |
| 4 | Progressive value ladder | Free → $79 → $199 → $499 → $1,500+ |
| 5 | Lead generation for services | Custom Blueprint as productised service |
| 6 | Demand validation before SaaS | Digital products prove market first |
| 7 | Finance AI brand authority | Evidence-based, governance-first positioning |
| 8 | Horizontal expansion path | Architecture supports future verticals (not built now) |

---

### 2. TARGET CUSTOMER

**Primary buyer:** CFO · Finance Director · Controller · Head of Shared Services · Head of AP · Finance Transformation Director · Finance Systems leader

**Organisation profile:** 200–10,000+ employees · Complex AP · Hundreds to tens of thousands of invoices/month · Multi-BU · ERP environment · Meaningful exception volumes · Shared services · Control/audit requirements

**ERP agnostic:** Must work across Dynamics 365, SAP, Oracle, NetSuite, Workday, and others.

---

### 3. CORE AP PROBLEMS (MUST ADDRESS)

Invoice ingestion · OCR errors · Line extraction · Multi-line invoices · PO matching · Non-PO invoices · 2-way/3-way matching · Price/quantity variance · Partial receipts · Missing GRs · Incorrect POs/vendors · Duplicates · Tax inconsistencies · Approval delays · DOA issues · Missing coding · Invoice ageing · Blocked invoices · Supplier/internal follow-up · Statement reconciliation · Payment proposal review · Fraud indicators · Exception prioritisation · Month-end completeness · GRNI · Accruals · Reporting · Root cause · Master data · Process leakage · Manual touch rates · Cycle time · Workload allocation · Control evidence · Audit trail

---

### 4. AP AGENT STACK (16 AGENTS)

Each agent requires: Job description · Inputs · Tools · Responsibilities · Exclusions · Human owner · Approval requirements · Escalation · Output standard · Controls · Audit evidence · KPIs · Performance history · Autonomy level · Failure handling · Cost monitoring

| # | Agent | Primary Function |
|---|-------|-----------------|
| 1 | Invoice Intake | Completeness and extraction quality |
| 2 | Invoice Validation | Field validation and duplicate detection |
| 3 | Matching | PO/receipt matching with tolerance |
| 4 | Exception Triage | Classification and routing |
| 5 | Goods Receipt | Missing receipt identification |
| 6 | PO Quality | Upstream PO discipline |
| 7 | Approval | Stalled approval monitoring |
| 8 | Supplier Resolution | Supplier communication drafts |
| 9 | Internal Follow-Up | Internal action requests |
| 10 | Duplicate & Anomaly | Pattern detection (not fraud guarantee) |
| 11 | Vendor Statement Reconciliation | Statement matching |
| 12 | Payment Proposal Review | Pre-payment analytical review |
| 13 | AP Close | Month-end support |
| 14 | AP Reporting | Operational reporting |
| 15 | Root Cause | Systemic exception analysis |
| 16 | AP Manager / Orchestrator | Supervisory layer |

---

### 5. RESPONSIBILITY MODEL (NON-NEGOTIABLE)

| Level | Name | Capability |
|-------|------|------------|
| 0 | Observe | Review only — no action |
| 1 | Recommend | Produce recommendations |
| 2 | Prepare | Prepare actions — human approval required |
| 3 | Execute within guardrails | Pre-approved low-risk execution |
| 4 | Managed autonomy | Independent within boundaries — exception oversight |

**Principle:** Responsibility is earned through demonstrated performance. Full autonomy is never the default.

---

### 6. KPI FRAMEWORK

**Categories:** Activity metrics · Operational outcomes · Financial outcomes · Risk/control outcomes

**Required metrics:** Classification accuracy · Extraction accuracy · Matching accuracy · False positive/negative rates · Exception resolution rate · STP rate · Human intervention rate · Resolution time · Time to posting · Repeat exception rate · Duplicates detected · Cost per invoice · Cost per exception · AI inference cost · Hours released · Control breaches · Escalation rate · Audit exceptions · Rework rate

Each KPI must have: Definition · Formula · Data source · Frequency · Target direction · Owner

---

### 7. GOVERNANCE FRAMEWORK

Must cover: Human accountability · Segregation of duties · Least privilege · Approval boundaries · RBAC · Data privacy · Prompt injection risk · Hallucination risk · Output validation · Audit logs · Version control · Model changes · Testing · Release management · Incident response · Override procedures · Fallback · Business continuity · Evidence retention · Periodic certification · Vendor/model risk

**Deliverable:** Agent Control Matrix (Agent · Risk · Control · Type · Owner · Evidence · Frequency · Escalation)

---

### 8. PROCESS-MAPPING METHODOLOGY (10 STEPS)

1. Observe → 2. Transcribe → 3. Extract → 4. Structure → 5. Agentise → 6. Test → 7. Shadow → 8. Controlled Pilot → 9. Measure → 10. Expand Responsibility

Each step requires a reusable template.

---

### 9. EXCEPTION TAXONOMY

Minimum 27 categories. Each requires: Definition · Root cause · Required data · Resolution · Responsible party · Escalation · Assigned agent · Automation potential · Risk level

---

### 10. PRODUCT SUITE

| Tier | Product | Price | Core Deliverables |
|------|---------|-------|-------------------|
| 0 | AP AI Readiness Diagnostic | Free | 20+ questions, maturity model, heatmap, scorecard |
| 1 | AP Agent Starter Kit | $79 | Top 10 agents, taxonomy, templates, roadmap |
| 2 | AP Agent OS Professional | $199 | Full 16 agents, governance, ROI, testing |
| 3 | AP Agent OS Team Edition | $499 | Workshop, training, change management |
| 4 | AP Transformation Blueprint | $1,500–3,000 | Productised custom assessment |

---

### 11–35. [Remaining sections preserved from original prompt with equal rigor]

All sections 11–35 from the original prompt remain in force: file formats, design system, brand positioning, copy standards, evidence requirements, competitor research, implementation roadmap, business case, Lemon Squeezy commerce, website, landing page, content engine, lead funnel, marketplace expansion, licensing, IP safeguards, trust positioning, customer experience, quality standard, deliverable architecture, execution order, final outputs, product principle, commercial test, and long-term vision.

---

### EXECUTION ORDER (MANDATORY SEQUENCE)

1. Market & competitor research → 2. Customer/problem definition → 3. Product architecture → 4. Methodology → 5. Agent architecture → 6. Governance → 7. KPI/economics → 8. Written products → 9. Templates/spreadsheets → 10. Presentations → 11. Branding → 12. Packaging → 13. Lemon Squeezy → 14. Website → 15. Funnel → 16. Content → 17. QA → 18. Final package

**No stage may be left as a recommendation. Every stage produces artifacts.**

---

*Evidence Room · AP Agent OS · Master Prompt v{VERSION} · {DATE}*
""").format(VERSION=VERSION, DATE=DATE)

# ── Main Build ───────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("EVIDENCE ROOM — AP Agent OS Product Generator")
    print(f"Version {VERSION} · {DATE}")
    print("=" * 60)

    agents = load_json("agents.json")
    exceptions = load_json("exceptions.json")
    research = load_json("research_ledger.json")

    dirs = [
        "00_READ_ME", "01_FREE_AP_AI_READINESS", "02_AP_AGENT_STARTER",
        "03_AP_AGENT_OS_PRO/Agent_Library", "03_AP_AGENT_OS_PRO/Process_Mapping",
        "03_AP_AGENT_OS_PRO/Governance", "03_AP_AGENT_OS_PRO/Controls",
        "03_AP_AGENT_OS_PRO/KPI_and_Measurement", "03_AP_AGENT_OS_PRO/Testing",
        "03_AP_AGENT_OS_PRO/Business_Case", "03_AP_AGENT_OS_PRO/Templates",
        "04_AP_AGENT_OS_TEAM/Workshop", "04_AP_AGENT_OS_TEAM/Training",
        "04_AP_AGENT_OS_TEAM/Executive", "04_AP_AGENT_OS_TEAM/Implementation",
        "04_AP_AGENT_OS_TEAM/Change_Management",
        "05_CUSTOM_BLUEPRINT", "06_SALES_AND_MARKETING",
        "07_LEMON_SQUEEZY", "08_WEBSITE", "09_RESEARCH", "10_LEGAL_AND_LICENSING",
        "06_SALES_AND_MARKETING/email_sequence",
        "06_SALES_AND_MARKETING/linkedin_posts",
        "06_SALES_AND_MARKETING/articles",
    ]
    for d in dirs:
        ensure_dir(ROOT / d)

    # ── 00 README ──
    write_text(ROOT / "00_READ_ME/README.md", generate_readme())
    write_text(ROOT / "00_READ_ME/Product_Index.md", generate_product_index(agents, exceptions))
    write_text(ROOT / "build/MASTER_PROMPT_REFINED.md", generate_master_prompt_refined())

    print("[1/18] Research & competitor analysis...")
    generate_research(research)
    generate_competitor_analysis()

    print("[2/18] Core frameworks...")
    generate_governance_framework()
    generate_methodology()
    generate_agent_library(agents)

    print("[3/18] Free tier...")
    generate_free_tier()

    print("[4/18] Starter tier...")
    generate_starter_tier(agents, exceptions)

    print("[5/18] Professional tier...")
    generate_professional_tier(agents, exceptions)

    print("[6/18] Team tier...")
    generate_team_tier()

    print("[7/18] Custom Blueprint...")
    generate_custom_blueprint()

    print("[8/18] Spreadsheets...")
    build_kpi_scorecard(ROOT / "03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_Scorecard.xlsx")
    build_roi_calculator(ROOT / "03_AP_AGENT_OS_PRO/Business_Case/ROI_Calculator.xlsx")
    shutil.copy(str(ROOT / "03_AP_AGENT_OS_PRO/Business_Case/ROI_Calculator.xlsx"),
                str(ROOT / "03_AP_AGENT_OS_PRO/Business_Case/Business_Case_Model.xlsx"))
    build_agent_registry(ROOT / "03_AP_AGENT_OS_PRO/Agent_Library/Agent_Registry.xlsx", agents)
    build_exception_tracker(ROOT / "03_AP_AGENT_OS_PRO/Controls/Exception_Tracker.xlsx", exceptions)
    build_controls_matrix(ROOT / "03_AP_AGENT_OS_PRO/Controls/Controls_Matrix.xlsx", agents)
    build_maturity_diagnostic(ROOT / "01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.xlsx")
    build_implementation_roadmap(ROOT / "03_AP_AGENT_OS_PRO/Templates/Implementation_Roadmap.xlsx")
    build_benefits_tracker(ROOT / "04_AP_AGENT_OS_TEAM/Implementation/Benefits_Tracker.xlsx")

    print("[9/18] Word templates...")
    generate_word_templates(agents)

    print("[10/18] PDFs...")
    generate_pdfs(agents, exceptions)

    print("[11/18] PowerPoint decks...")
    generate_presentations(agents)

    print("[12/18] Brand & website...")
    generate_brand_system()
    generate_website()

    print("[13/18] Lemon Squeezy...")
    generate_lemon_squeezy()

    print("[14/18] Marketing & funnel...")
    generate_marketing()

    print("[15/18] Legal & licensing...")
    generate_legal()

    print("[16/18] Version history...")
    write_text(ROOT / "00_READ_ME/Version_History.md", f"""# Version History

## v{VERSION} ({DATE})
- Initial commercial release
- 16-agent AP Agent OS architecture
- 4 product tiers + free diagnostic + custom blueprint
- Complete governance, KPI, and control frameworks
- Brand system, website, Lemon Squeezy setup, marketing funnel
""")

    print("[17/18] Packaging manifest...")
    generate_manifest()

    print("[18/18] Complete!")
    print(f"\nDeliverables generated at: {ROOT}")
    count_files(ROOT)


def count_files(root: Path):
    total = sum(1 for _ in root.rglob("*") if _.is_file())
    print(f"Total files: {total}")


def generate_product_index(agents, exceptions):
    agent_list = "\n".join(f"- Agent {a['id']}: {a['name']}" for a in agents)
    exc_list = "\n".join(f"- {e['code']}: {e['category']}" for e in exceptions)
    return f"""# Evidence Room — Product Index

## Agent Library ({len(agents)} agents)
{agent_list}

## Exception Taxonomy ({len(exceptions)} categories)
{exc_list}

## File Guide by Tier

### Free (Tier 0)
- `01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.xlsx`
- `01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.pdf`

### Starter (Tier 1) — $79
- `02_AP_AGENT_STARTER/AP_Agent_Starter_Guide.pdf`
- Top 10 agent blueprints, taxonomy, templates

### Professional (Tier 2) — $199
- `03_AP_AGENT_OS_PRO/` — Full agent library, governance, controls, KPIs, ROI, testing
- All spreadsheets and templates

### Team (Tier 3) — $499
- `04_AP_AGENT_OS_TEAM/` — Workshop decks, training, change management, benefits tracker

### Custom (Tier 4) — $1,500–3,000
- `05_CUSTOM_BLUEPRINT/` — Intake questionnaire, fulfilment workflow, service brochure
"""


# Placeholder functions — implemented in content_modules.py
def generate_research(research):
    from content_modules import write_research
    write_research(ROOT, research)

def generate_competitor_analysis():
    from content_modules import write_competitor_analysis
    write_competitor_analysis(ROOT)

def generate_governance_framework():
    from content_modules import write_governance
    write_governance(ROOT)

def generate_methodology():
    from content_modules import write_methodology
    write_methodology(ROOT)

def generate_agent_library(agents):
    from content_modules import write_agent_library
    write_agent_library(ROOT, agents)

def generate_free_tier():
    from content_modules import write_free_tier
    write_free_tier(ROOT)

def generate_starter_tier(agents, exceptions):
    from content_modules import write_starter_tier
    write_starter_tier(ROOT, agents, exceptions)

def generate_professional_tier(agents, exceptions):
    from content_modules import write_professional_tier
    write_professional_tier(ROOT, agents, exceptions)

def generate_team_tier():
    from content_modules import write_team_tier
    write_team_tier(ROOT)

def generate_custom_blueprint():
    from content_modules import write_custom_blueprint
    write_custom_blueprint(ROOT)

def generate_word_templates(agents):
    from content_modules import write_word_templates
    write_word_templates(ROOT, agents)

def generate_pdfs(agents, exceptions):
    from content_modules import write_pdfs
    write_pdfs(ROOT, agents, exceptions, build_pdf, VERSION, DATE, BRAND)

def generate_presentations(agents):
    from content_modules import write_presentations
    write_presentations(ROOT, agents, build_pptx)

def generate_brand_system():
    from content_modules import write_brand
    write_brand(ROOT, BRAND)

def generate_website():
    from content_modules import write_website
    write_website(ROOT, BRAND)

def generate_lemon_squeezy():
    from content_modules import write_lemon_squeezy
    write_lemon_squeezy(ROOT, BRAND)

def generate_marketing():
    from content_modules import write_marketing
    write_marketing(ROOT, BRAND)

def generate_legal():
    from content_modules import write_legal
    write_legal(ROOT)

def generate_manifest():
    from content_modules import write_manifest
    write_manifest(ROOT)


if __name__ == "__main__":
    main()
