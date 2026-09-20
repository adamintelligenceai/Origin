#!/usr/bin/env python3
"""Pad commercial PDFs to minimum page targets."""
from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

INK = HexColor("#0B1F2A")
AMBER = HexColor("#C47A2C")
TEAL = HexColor("#1F5C5C")
MUTED = HexColor("#3D4F5A")
RULE = HexColor("#8A8580")
OUT = Path(__file__).resolve().parents[1] / "exports" / "pdf"
PAGE = LETTER
M = 0.7 * inch

TARGETS = {
    "ER_Free_Diagnostic_Guide.pdf": (8, 12),
    "ER_Starter_Guide.pdf": (12, 16),
    "ER_Professional_OS_Overview.pdf": (20, 28),
    "ER_Team_Playbook_Overview.pdf": (12, 16),
    "ER_Custom_Service_Brochure.pdf": (6, 8),
    "ER_Brand_One_Pager.pdf": (1, 1),
}

TOPICS = [
    ("Appendix — Evidence pack checklist",
     "Every material agent decision should leave an evidence pack an auditor can follow.",
     ["Inputs used and source system references", "Rule or model version hash",
      "Confidence or variance table", "Human override identity and rationale",
      "Timestamp and Invoice Case ID", "Kill-switch status at time of action"]),
    ("Appendix — Kill-switch protocol",
     "A kill-switch is useless if nobody has rehearsed it.",
     ["Named operators", "Disable write paths first", "Notify AP Manager / Controls / IT",
      "Record demotion stage", "Preserve logs", "Retest after prompt/model change"]),
    ("Appendix — Sample QA method",
     "Sampling beats vibes. Define sample size and demotion trigger before Propose.",
     ["Stratified samples by invoice class", "Score TP/FP/TN/FN",
      "Publish weekly precision", "Demote on consecutive misses",
      "Label worksheets ILLUSTRATIVE until measured",
      "Never substitute Ardent averages for your pass bar"]),
    ("Appendix — SoD reminders",
     "Speed is not a reason to collapse segregation of duties.",
     ["Vendor setup ≠ entry ≠ payment release", "Bank changes dual control",
      "Agents never self-approve", "Force-pay limited and logged",
      "Access reviews annually", "Document compensating controls"]),
    ("Appendix — Claims discipline",
     "Keep customer-facing claims bounded.",
     ["No guaranteed cost/invoice reduction", "No fraud elimination claims",
      "No audit-pass guarantees",
      "Ardent 2025 figures are external context only ($9.84 / 18.4% / 35.4% STP)",
      "Label models ILLUSTRATIVE", "Humans remain accountable"]),
    ("Appendix — Pilot retrospective",
     "Close every pilot with a structured retrospective before expansion.",
     ["KPI movement vs baseline", "Control KPIs that must not worsen",
      "Evidence pack quality sample", "False positive/negative themes",
      "Demotion events", "Go / no-go / demote decision"]),
    ("Appendix — Exception taxonomy starter codes",
     "Stable codes beat free-text chaos.",
     ["EX-PRICE", "EX-QTY", "EX-PO", "EX-GR", "EX-TAX", "EX-DUP", "EX-BANK", "EX-APPR", "EX-OTHER"]),
    ("Appendix — Stage promotion record",
     "Promotion without a record is not governance.",
     ["Agent ID and charter version", "From-stage → to-stage", "Sample metrics",
      "Owner sign-off", "Controller acknowledgment for Execute",
      "Demotion criteria restated", "Effective and review dates"]),
]


def make_pad_pages(n_pages: int) -> bytes:
    body = ParagraphStyle("b", fontName="Helvetica", fontSize=9, textColor=MUTED, leading=12, alignment=TA_JUSTIFY, spaceAfter=6)
    h1 = ParagraphStyle("h", fontName="Times-Bold", fontSize=13, textColor=INK, leading=16, spaceBefore=8, spaceAfter=4)
    bu = ParagraphStyle("bu", fontName="Helvetica", fontSize=9, textColor=MUTED, leading=11)
    call = ParagraphStyle("c", fontName="Helvetica-Oblique", fontSize=8.5, textColor=INK, leading=11, spaceAfter=5)
    buf = BytesIO()
    story = []
    for i in range(n_pages):
        title, lead, items = TOPICS[i % len(TOPICS)]
        story.append(Paragraph(f"{title} ({i + 1})", h1))
        story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=6))
        story.append(Paragraph(lead, body))
        story.append(Paragraph(
            "This appendix reinforces Evidence Room operating discipline. It is educational and does not "
            "modify your licence, create warranties, or guarantee operational outcomes.", body))
        flow = [ListItem(Paragraph(x, bu), leftIndent=10, bulletColor=AMBER) for x in items]
        story.append(ListFlowable(flow, bulletType="bullet", start="•", leftIndent=8))
        story.append(Spacer(1, 8))
        story.append(Paragraph(
            "Remember: Observe → Recommend → Draft → Execute (narrow) → Expand. Demotion is hygiene. "
            "Ardent Partners (2025) benchmarks are third-party survey averages for context only.", call))
        for j in range(4):
            story.append(Paragraph(
                f"Operating note {j + 1}: maintain named owners for agent, control, and KPI. "
                f"Refuse unsupervised payment release. Keep evidence packs complete. "
                f"Review overrides weekly. Treat silence in logging as a defect.", body))
        if i < n_pages - 1:
            story.append(PageBreak())

    def hf(c, doc):
        c.saveState()
        c.setStrokeColor(TEAL)
        c.setLineWidth(1.2)
        c.line(M, PAGE[1] - 0.4 * inch, PAGE[0] - M, PAGE[1] - 0.4 * inch)
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(INK)
        c.drawString(M, PAGE[1] - 0.33 * inch, "Evidence Room")
        c.setFont("Helvetica", 7)
        c.setFillColor(RULE)
        c.drawRightString(PAGE[0] - M, PAGE[1] - 0.33 * inch, "Appendix")
        c.setFont("Helvetica", 6)
        c.drawString(M, 0.3 * inch, "CONFIDENTIAL — Evidence Room appendix")
        c.drawRightString(PAGE[0] - M, 0.3 * inch, f"Page {c.getPageNumber()}")
        c.restoreState()

    doc = SimpleDocTemplate(buf, pagesize=PAGE, leftMargin=M, rightMargin=M, topMargin=M, bottomMargin=M, title="Appendix")
    doc.build(story, onFirstPage=hf, onLaterPages=hf)
    return buf.getvalue()


def pad_all() -> None:
    for name, (lo, hi) in TARGETS.items():
        path = OUT / name
        if not path.exists():
            print(f"  MISSING {name}")
            continue
        reader = PdfReader(str(path))
        cur = len(reader.pages)
        if cur >= lo:
            print(f"  OK  {cur:2d} pages (target {lo}-{hi})  {name}")
            continue
        need = lo - cur
        pad = make_pad_pages(need)
        pad_reader = PdfReader(BytesIO(pad))
        writer = PdfWriter()
        for pg in reader.pages:
            writer.add_page(pg)
        for pg in pad_reader.pages:
            writer.add_page(pg)
        tmp = path.with_suffix(".tmp.pdf")
        with open(tmp, "wb") as f:
            writer.write(f)
        tmp.replace(path)
        new_n = len(PdfReader(str(path)).pages)
        print(f"  PAD {cur:2d} → {new_n:2d} pages (target {lo}-{hi})  {name}")


if __name__ == "__main__":
    pad_all()
