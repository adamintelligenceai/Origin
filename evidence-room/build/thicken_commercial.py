#!/usr/bin/env python3
"""Typeset sellable Evidence Room books and thicken Word / PPTX / workbooks.

The working system remains Markdown. This script produces the files a
purchaser opens on Monday: multi-page PDFs, fillable Office templates,
and example-plus-blank workbooks.
"""

from __future__ import annotations

import html
import re
import shutil
from pathlib import Path

import markdown
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from pptx import Presentation
from pptx.dml.color import RGBColor as PptColor
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches as PInches, Pt as PPt
from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "11_GENERATED_PDF"
DOC = ROOT / "03_AP_AGENT_OS_PRO" / "Word_Templates"
PPT = ROOT / "04_AP_AGENT_OS_TEAM" / "Decks"
XLS = ROOT / "03_AP_AGENT_OS_PRO" / "Spreadsheets"
LS = ROOT / "07_LEMON_SQUEEZY"

INK = RGBColor(0x12, 0x16, 0x0F)
GILT = RGBColor(0xB0, 0x89, 0x3E)
SLATE = RGBColor(0x5A, 0x61, 0x54)

P_INK = PptColor(0x12, 0x16, 0x0F)
P_PAPER = PptColor(0xF3, 0xEE, 0xE4)
P_GILT = PptColor(0xB0, 0x89, 0x3E)
P_WHITE = PptColor(0xFA, 0xF8, 0xF3)
P_SLATE = PptColor(0x5A, 0x61, 0x54)
P_BRICK = PptColor(0x8A, 0x3B, 0x32)

AGENTS = [
    ("01", "Invoice Intake", "L1", "AP Operations Lead", "Capture, classify, extract, register inbound invoices"),
    ("02", "Invoice Validation", "L1", "AP Quality Lead", "Completeness, identity, tax fields, posting readiness"),
    ("03", "Matching", "L1", "AP Match Lead", "2-way / 3-way / GR-IR match and tolerance"),
    ("04", "Exception Triage", "L1", "Exception Desk Lead", "Classify, assign owner, next action, SLA"),
    ("05", "Goods Receipt", "L1", "Plant Finance Liaison", "Missing or aged receipts; receiver packets"),
    ("06", "PO Quality", "L0", "Procurement Operations Lead", "PO defects that become AP exceptions"),
    ("07", "Approval", "L1", "AP Approvals Coordinator", "Route per DOA; chase packets"),
    ("08", "Supplier Resolution", "L1", "AP Supplier Desk", "Draft supplier queries; humans send"),
    ("09", "Internal Follow-up", "L1", "Exception Desk Lead", "Internal owner fact packs"),
    ("10", "Duplicate & Anomaly", "L0", "AP Controls Lead", "Flags as hypotheses — not a fraud verdict"),
    ("11", "Vendor Statement", "L1", "AP Reconciliations Lead", "Statement to subledger"),
    ("12", "Payment Proposal Review", "L1", "Treasury / AP Payments Lead", "Annotate; never release"),
    ("13", "AP Close", "L1", "Assistant Controller — Payables", "Checklist and accrual candidates"),
    ("14", "AP Reporting", "L1", "AP Analytics", "Defined-source operational packs"),
    ("15", "Root Cause", "L0", "Finance Transformation Lead", "Cluster exceptions; propose fixes"),
    ("16", "Orchestrator", "L1", "AP Process Owner", "Work objects, SLA, evidence, sequence"),
]

BOOK_CSS = """
@page {
  size: A4;
  margin: 18mm 16mm 18mm 16mm;
  @top-left {
    content: "EVIDENCE ROOM — AP AGENT OS";
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 8pt;
    letter-spacing: 0.14em;
    color: #8C6B2C;
  }
  @top-right {
    content: string(sku);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 8pt;
    color: #5A6154;
  }
  @bottom-left {
    content: "Proof before permission.  ·  Working draft · not legal advice";
    font-size: 7.5pt;
    color: #5A6154;
  }
  @bottom-right {
    content: counter(page);
    font-size: 8pt;
    color: #5A6154;
  }
}
@page:first {
  margin: 0;
  @top-left { content: none; }
  @top-right { content: none; }
  @bottom-left { content: none; }
  @bottom-right { content: none; }
}
html, body {
  background: #F3EEE4;
  color: #12160F;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10.4pt;
  line-height: 1.48;
}
.cover {
  page-break-after: always;
  min-height: 297mm;
  padding: 36mm 22mm 28mm;
  background: #F3EEE4;
  box-sizing: border-box;
}
.cover .room {
  width: 28px; height: 28px;
  border: 1.6px solid #B0893E;
  position: relative;
  margin-bottom: 28px;
}
.cover .room:after {
  content: "";
  position: absolute;
  inset: 5px;
  border: 1px solid #12160F;
}
.cover .kicker {
  letter-spacing: 0.22em;
  font-size: 11pt;
  text-transform: uppercase;
  color: #8C6B2C;
  margin: 0 0 10px;
}
.cover h1 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34pt;
  font-weight: 500;
  line-height: 1.08;
  margin: 0 0 12px;
}
.cover .sub {
  font-size: 14pt;
  color: #2A2F24;
  margin: 0 0 22px;
}
.cover .rule { border-top: 1.5px solid #B0893E; width: 72px; margin: 0 0 22px; }
.cover .idea {
  font-family: Georgia, serif;
  font-size: 16pt;
  font-style: italic;
  margin: 0 0 28px;
}
.cover .blurb { max-width: 420px; color: #2A2F24; }
.cover .holds {
  margin-top: 40px;
  border: 1px solid #D6CFC0;
  background: #FAF8F3;
  padding: 14px 16px;
  max-width: 460px;
}
.cover .meta { position: absolute; bottom: 28mm; font-size: 9pt; color: #5A6154; }
.chapter h1, .md h1 {
  string-set: sku content();
  font-family: Georgia, serif;
  font-size: 20pt;
  font-weight: 500;
  margin: 0 0 10px;
  page-break-before: always;
}
.chapter:first-of-type h1, .md:first-of-type h1 { page-break-before: avoid; }
.md h2 {
  font-family: Georgia, serif;
  font-size: 13.5pt;
  font-weight: 500;
  margin: 20px 0 8px;
}
.md h3 { font-size: 11pt; letter-spacing: 0.02em; margin: 14px 0 6px; }
.md p { margin: 0 0 8px; }
.md ul, .md ol { margin: 0 0 10px 18px; padding: 0; }
.md li { margin: 0 0 3px; }
.md code, .md pre {
  font-family: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
  font-size: 8.6pt;
}
.md pre {
  background: #FAF8F3;
  border: 1px solid #D6CFC0;
  padding: 8px 10px;
  white-space: pre-wrap;
  page-break-inside: avoid;
}
.md table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0 14px;
  font-size: 8.6pt;
  page-break-inside: avoid;
}
.md th {
  background: #12160F;
  color: #F3EEE4;
  text-align: left;
  padding: 5px 6px;
  font-weight: 600;
}
.md td {
  border-bottom: 1px solid #D6CFC0;
  padding: 4px 6px;
  vertical-align: top;
}
.md blockquote {
  margin: 10px 0;
  padding: 8px 12px;
  border-left: 3px solid #B0893E;
  background: #FAF8F3;
}
.front {
  page-break-after: always;
}
.front h1 { page-break-before: avoid; font-family: Georgia, serif; font-size: 20pt; }
.note {
  border: 1px solid #D6CFC0;
  background: #FAF8F3;
  padding: 10px 12px;
  margin: 10px 0 16px;
}
"""


def _md(text: str) -> str:
    return markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "sane_lists", "nl2br"],
    )


def _read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists():
        raise FileNotFoundError(path)
    return path.read_text(encoding="utf-8")


def book_html(sku: str, title: str, subtitle: str, files: list[str], blurb: str) -> str:
    parts = [
        f"""
<section class="cover">
  <div class="room"></div>
  <p class="kicker">Evidence Room</p>
  <h1>{html.escape(title)}</h1>
  <p class="sub">{html.escape(subtitle)}</p>
  <div class="rule"></div>
  <p class="idea">Proof before permission.</p>
  <p class="blurb">{html.escape(blurb)}</p>
  <div class="holds">
    <p><strong>Hard hold.</strong> ERP remains the system of record for accounting.
    Named humans remain the system of record for cash. Vendor-bank change and
    close attestation stay human. Duplicate &amp; Anomaly flags are hypotheses,
    not fraud verdicts. This book is a method, not hosted software.</p>
  </div>
  <p class="meta">{html.escape(sku)} · Edition 1.1.0 · 20 September 2026 · evidenceroom.ai<br/>
  Working draft. Not legal, tax, accounting, or compliance advice. Not Evidence Room LLC (forensic animation).</p>
</section>
<section class="front">
  <h1>How to use this book</h1>
  <div class="note">
    <p>Buy Friday. Begin Monday. Do not charter from memory.</p>
    <ol>
      <li>Score the free diagnostic (36 questions). Honour vetoes.</li>
      <li>Map one path (usually PO-goods). Code exceptions from the closed list.</li>
      <li>Charter Wave 1 at L0 or L1: Intake, Validation, Matching, Triage, Duplicate &amp; Anomaly, Orchestrator.</li>
      <li>Write the payment sentence on the wall. Agent 12 annotates; humans release.</li>
      <li>Shadow before any write path. Promote only with an evidence pack.</li>
    </ol>
  </div>
  <p>Every page should answer at least one of: What should I do? How? Who owns it?
  What can go wrong? How do I control it? How do I measure it? What evidence proves it works?</p>
  <p>Northline Industrials is a <em>fictional</em> manufacturer used so tables can be concrete
  (~15,000 invoices/month, Dynamics 365, Cleveland SSC). Figures are illustrative, not a client result.</p>
  <p>Customer-facing statistics are limited to the research ledger. Do not paste vendor
  cost-per-invoice figures into a business case as targets.</p>
</section>
"""
    ]
    for rel in files:
        body = _read(rel)
        parts.append(f'<article class="md">{_md(body)}</article>')
    return (
        "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'/>"
        f"<title>{html.escape(title)}</title><style>{BOOK_CSS}</style></head>"
        f"<body>{''.join(parts)}</body></html>"
    )


def render_book(sku: str, title: str, subtitle: str, files: list[str], blurb: str, dests: list[Path]) -> Path:
    PDF.mkdir(parents=True, exist_ok=True)
    html_path = PDF / f"{dests[0].stem}.html"
    html_path.write_text(book_html(sku, title, subtitle, files, blurb), encoding="utf-8")
    pdf_path = dests[0]
    print(f"typeset {pdf_path.name} from {len(files)} files …", flush=True)
    HTML(filename=str(html_path)).write_pdf(str(pdf_path))
    for extra in dests[1:]:
        extra.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(pdf_path, extra)
    print(f"  wrote {pdf_path.stat().st_size:,} bytes", flush=True)
    return pdf_path


def typeset_pdfs() -> None:
    render_book(
        "ER-DIAG",
        "AP AI Readiness Diagnostic",
        "Free lead magnet · 36 questions · six dimensions",
        [
            "01_FREE_AP_AI_READINESS/README.md",
            "01_FREE_AP_AI_READINESS/DIAGNOSTIC_GUIDE.md",
            "01_FREE_AP_AI_READINESS/MATURITY_MODEL.md",
            "01_FREE_AP_AI_READINESS/10_AGENT_OPPORTUNITY_OVERVIEW.md",
            "01_FREE_AP_AI_READINESS/BUSINESS_CASE_STARTER.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "Score the organisation before anyone commissions an unofficial copilot. "
        "No invoice upload. A5 at 0 or 1 vetoes placement above maturity L2.",
        [PDF / "ER_Free_Diagnostic.pdf", ROOT / "01_FREE_AP_AI_READINESS" / "ER_Free_Diagnostic.pdf"],
    )
    render_book(
        "ER-START · $79",
        "AP Agent Starter Kit",
        "Operating model, ten blueprints, first-wave method",
        [
            "02_AP_AGENT_STARTER/README.md",
            "02_AP_AGENT_STARTER/STARTER_GUIDE.md",
            "02_AP_AGENT_STARTER/TOP_10_AGENT_BLUEPRINTS.md",
            "02_AP_AGENT_STARTER/IMPLEMENTATION_CHECKLIST.md",
            "02_AP_AGENT_STARTER/TRANSFORMATION_ROADMAP.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "A working subset a named practitioner can use to design Wave 1 and stand "
        "a two-week shadow. Default autonomy is L0 or L1. Payment stays human.",
        [PDF / "ER_Starter_Guide.pdf", ROOT / "02_AP_AGENT_STARTER" / "ER_Starter_Guide.pdf"],
    )
    render_book(
        "ER-PRO · $199",
        "AP Agent OS — Professional",
        "Sixteen agents. One payment boundary. The default paid SKU.",
        [
            "00_READ_ME/QUICK_START.md",
            "03_AP_AGENT_OS_PRO/Agent_Library/00_AGENT_STACK_OVERVIEW.md",
            "03_AP_AGENT_OS_PRO/Agent_Library/AUTONOMY_PROGRESSION.md",
            "03_AP_AGENT_OS_PRO/Agent_Library/HUMAN_VS_AGENT_DECISION_FRAMEWORK.md",
            "03_AP_AGENT_OS_PRO/Agent_Library/AGENT_CHARTER_TEMPLATE.md",
            *[f"03_AP_AGENT_OS_PRO/Agent_Library/AGENT_{n:02d}_{name}.md" for n, name in [
                (1, "INVOICE_INTAKE"), (2, "INVOICE_VALIDATION"), (3, "MATCHING"),
                (4, "EXCEPTION_TRIAGE"), (5, "GOODS_RECEIPT"), (6, "PO_QUALITY"),
                (7, "APPROVAL"), (8, "SUPPLIER_RESOLUTION"), (9, "INTERNAL_FOLLOW_UP"),
                (10, "DUPLICATE_AND_ANOMALY"), (11, "VENDOR_STATEMENT"),
                (12, "PAYMENT_PROPOSAL_REVIEW"), (13, "AP_CLOSE"), (14, "AP_REPORTING"),
                (15, "ROOT_CAUSE"), (16, "ORCHESTRATOR"),
            ]],
            "03_AP_AGENT_OS_PRO/Process_Mapping/00_METHODOLOGY.md",
            "03_AP_AGENT_OS_PRO/Process_Mapping/EXCEPTION_TAXONOMY.md",
            "03_AP_AGENT_OS_PRO/Governance/GOVERNANCE_FRAMEWORK.md",
            "03_AP_AGENT_OS_PRO/Governance/AGENT_CONTROL_MATRIX.md",
            "03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_FRAMEWORK.md",
            "03_AP_AGENT_OS_PRO/Testing/SHADOW_MODE_METHODOLOGY.md",
            "03_AP_AGENT_OS_PRO/Business_Case/BUSINESS_CASE_MODEL.md",
            "03_AP_AGENT_OS_PRO/Business_Case/IMPLEMENTATION_ROADMAP.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "The operating system for the AP agent layer. Specify, charter, govern, "
        "and measure sixteen named roles without replacing the stack you already run.",
        [PDF / "ER_Professional_OS.pdf", ROOT / "03_AP_AGENT_OS_PRO" / "ER_Professional_OS.pdf"],
    )
    render_book(
        "ER-TEAM · $499",
        "AP Agent OS — Team Playbook",
        "Workshop, facilitation, change, and steering for one working group",
        [
            "04_AP_AGENT_OS_TEAM/README.md",
            "04_AP_AGENT_OS_TEAM/IMPLEMENTATION_PLAYBOOK.md",
            "04_AP_AGENT_OS_TEAM/FACILITATION_PACK.md",
            "04_AP_AGENT_OS_TEAM/WORKSHOP_AGENDA.md",
            "04_AP_AGENT_OS_TEAM/WORKSHOP_EXERCISES.md",
            "04_AP_AGENT_OS_TEAM/STAKEHOLDER_INTERVIEW_GUIDE.md",
            "04_AP_AGENT_OS_TEAM/PROCESS_OWNER_QUESTIONNAIRES.md",
            "04_AP_AGENT_OS_TEAM/STEERING_COMMITTEE_TEMPLATES.md",
            "04_AP_AGENT_OS_TEAM/CHANGE_MANAGEMENT_TOOLKIT.md",
            "04_AP_AGENT_OS_TEAM/TRAINING_MATERIALS.md",
            "04_AP_AGENT_OS_TEAM/EXECUTIVE_COMMUNICATION_TEMPLATES.md",
            "04_AP_AGENT_OS_TEAM/ENTERPRISE_GOVERNANCE_PACK.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "A transformation lead can take this into a room tomorrow and run a "
        "credible AP AI session. Outcome: charters, holds, shadow plan. "
        "Non-outcome: a savings target or a platform shortlist.",
        [PDF / "ER_Team_Playbook.pdf", ROOT / "04_AP_AGENT_OS_TEAM" / "ER_Team_Playbook.pdf"],
    )
    render_book(
        "ER-BLUEPRINT · $1,500–$3,000",
        "AP Transformation Blueprint",
        "Productised assessment · structured intake · repeatable fulfilment",
        [
            "05_CUSTOM_BLUEPRINT/README.md",
            "05_CUSTOM_BLUEPRINT/SERVICE_BROCHURE.md",
            "05_CUSTOM_BLUEPRINT/INTAKE_QUESTIONNAIRE.md",
            "05_CUSTOM_BLUEPRINT/FULFILMENT_WORKFLOW.md",
            "05_CUSTOM_BLUEPRINT/DELIVERABLE_OUTLINE.md",
            "05_CUSTOM_BLUEPRINT/PRICING_AND_SCOPE.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "You provide structured information. Evidence Room returns a current-state "
        "assessment, opportunity map, recommended architecture, controls framing, "
        "and a 90-day plan. Application required. Production invoices do not enter our tools.",
        [PDF / "ER_Custom_Blueprint.pdf", ROOT / "05_CUSTOM_BLUEPRINT" / "ER_Custom_Blueprint.pdf"],
    )
    render_book(
        "SUITE",
        "Evidence Room — Product Overview",
        "The AP Agent operating-system toolkit",
        [
            "00_READ_ME/README.md",
            "00_READ_ME/QUICK_START.md",
            "00_READ_ME/SCALE_ROADMAP.md",
            "06_SALES_AND_MARKETING/PRODUCT_COPY.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
        ],
        "Design the layer. Keep the stack. AP is the first domain.",
        [PDF / "ER_Product_Overview.pdf", ROOT / "00_READ_ME" / "ER_Product_Overview.pdf"],
    )
    render_book(
        "LEGAL DRAFTS",
        "Licence, privacy, and disclaimer drafts",
        "For counsel. Not an enforceable instrument.",
        [
            "10_LEGAL_AND_LICENSING/LICENCE_TERMS.md",
            "10_LEGAL_AND_LICENSING/TERMS.md",
            "10_LEGAL_AND_LICENSING/PRIVACY.md",
            "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
            "10_LEGAL_AND_LICENSING/REFUND_POLICY.md",
            "10_LEGAL_AND_LICENSING/AI_USE_DISCLOSURE.md",
            "10_LEGAL_AND_LICENSING/IP_CLEANLINESS_CHECKLIST.md",
        ],
        "Working drafts only. Counsel must confirm before public launch or checkout.",
        [PDF / "ER_Legal_Drafts.pdf", ROOT / "10_LEGAL_AND_LICENSING" / "ER_Legal_Drafts.pdf"],
    )


# ---------------------------------------------------------------------------
# Word — convert markdown templates into usable documents
# ---------------------------------------------------------------------------

def _set_run_font(run, name: str = "Calibri", size: int = 11, bold: bool = False, color=None) -> None:
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold
    if color is not None:
        run.font.color.rgb = color


def _add_table(doc: Document, rows: list[list[str]]) -> None:
    if not rows:
        return
    cols = max(len(r) for r in rows)
    table = doc.add_table(rows=len(rows), cols=cols)
    table.style = "Table Grid"
    for i, row in enumerate(rows):
        for j in range(cols):
            cell = table.cell(i, j)
            cell.text = row[j] if j < len(row) else ""
            for p in cell.paragraphs:
                for run in p.runs:
                    _set_run_font(run, size=9, bold=(i == 0), color=INK if i else None)


def markdown_to_docx(md_text: str, dest: Path, title: str) -> None:
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.85)
    section.bottom_margin = Inches(0.85)
    section.left_margin = Inches(0.9)
    section.right_margin = Inches(0.9)
    header = section.header.paragraphs[0]
    hr = header.add_run("EVIDENCE ROOM — AP AGENT OS  ·  Proof before permission.")
    _set_run_font(hr, size=8, color=GILT)
    footer = section.footer.paragraphs[0]
    fr = footer.add_run("Working draft. Not legal advice. Payment authorisation stays human.")
    _set_run_font(fr, size=8, color=SLATE)

    p = doc.add_paragraph()
    r = p.add_run(title)
    _set_run_font(r, name="Georgia", size=22, color=INK)
    p = doc.add_paragraph()
    r = p.add_run("Blank fields are for the licensee. Northline examples are fictional.")
    _set_run_font(r, size=10, color=SLATE)

    lines = md_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("|") and i + 1 < len(lines) and re.match(r"^\|?\s*-+", lines[i + 1]):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                raw = lines[i].strip()
                if re.match(r"^\|?\s*-+", raw):
                    i += 1
                    continue
                cells = [c.strip() for c in raw.strip("|").split("|")]
                rows.append(cells)
                i += 1
            _add_table(doc, rows)
            continue
        if line.startswith("# "):
            h = doc.add_heading(line[2:].strip(), level=1)
            for run in h.runs:
                run.font.color.rgb = INK
        elif line.startswith("## "):
            h = doc.add_heading(line[3:].strip(), level=2)
            for run in h.runs:
                run.font.color.rgb = INK
        elif line.startswith("### "):
            doc.add_heading(line[4:].strip(), level=3)
        elif line.startswith("- ") or line.startswith("* "):
            doc.add_paragraph(line[2:].strip(), style="List Bullet")
        elif re.match(r"^\d+\.\s", line):
            doc.add_paragraph(re.sub(r"^\d+\.\s", "", line), style="List Number")
        elif line.strip() == "---":
            pass
        elif line.strip():
            para = doc.add_paragraph(line.strip())
            for run in para.runs:
                _set_run_font(run, size=11)
        i += 1

    note = doc.add_paragraph()
    r = note.add_run(
        "Hard hold: agents do not approve, release, or transmit payment. "
        "Vendor-bank change and close attestation stay human."
    )
    _set_run_font(r, size=10, bold=True, color=INK)
    dest.parent.mkdir(parents=True, exist_ok=True)
    doc.save(dest)


def write_word() -> None:
    mapping = [
        ("03_AP_AGENT_OS_PRO/Templates/SOP_TEMPLATE.md", "ER_SOP_Template.docx", "SOP template"),
        ("03_AP_AGENT_OS_PRO/Agent_Library/AGENT_CHARTER_TEMPLATE.md", "ER_Agent_Charter.docx", "Agent charter"),
        ("03_AP_AGENT_OS_PRO/Templates/PROCESS_DISCOVERY.md", "ER_Process_Discovery.docx", "Process discovery workbook"),
        ("03_AP_AGENT_OS_PRO/Process_Mapping/RACI_TEMPLATE.md", "ER_RACI.docx", "RACI — AP agent layer"),
        ("03_AP_AGENT_OS_PRO/Governance/GOVERNANCE_STANDARD.md", "ER_Governance_Standard.docx", "Governance standard (draft)"),
        ("03_AP_AGENT_OS_PRO/Templates/UAT.md", "ER_UAT.docx", "UAT pack"),
        ("03_AP_AGENT_OS_PRO/Templates/RISK_ASSESSMENT.md", "ER_Risk_Assessment.docx", "Layer risk assessment"),
        ("03_AP_AGENT_OS_PRO/Templates/MEETING_GUIDE.md", "ER_Meeting_Guide.docx", "Meeting guide"),
        ("03_AP_AGENT_OS_PRO/Templates/IMPLEMENTATION_PLAN.md", "ER_Implementation_Plan.docx", "Implementation plan"),
    ]
    DOC.mkdir(parents=True, exist_ok=True)
    for rel, name, title in mapping:
        markdown_to_docx(_read(rel), DOC / name, title)
        print(f"docx {name}", flush=True)


# ---------------------------------------------------------------------------
# PowerPoint
# ---------------------------------------------------------------------------

def _blank(prs: Presentation):
    return prs.slides.add_slide(prs.slide_layouts[6])


def _fill(shape, color: PptColor) -> None:
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()


def _box(slide, l, t, w, h, color: PptColor):
    sh = slide.shapes.add_shape(1, PInches(l), PInches(t), PInches(w), PInches(h))
    _fill(sh, color)
    return sh


def _text(slide, l, t, w, h, text: str, size=18, bold=False, color=P_INK, font="Calibri", align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(PInches(l), PInches(t), PInches(w), PInches(h))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = PPt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    return box


def _bullets(slide, l, t, w, h, items: list[str], size=16) -> None:
    box = slide.shapes.add_textbox(PInches(l), PInches(t), PInches(w), PInches(h))
    tf = box.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.level = 0
        p.space_after = PPt(8)
        run = p.add_run()
        run.text = "·  " + item
        run.font.size = PPt(size)
        run.font.color.rgb = P_INK
        run.font.name = "Calibri"


def _chrome(slide, kicker: str) -> None:
    _box(slide, 0, 0, 10, 7.5, P_PAPER)
    _box(slide, 0, 0, 0.08, 7.5, P_GILT)
    _text(slide, 0.4, 0.18, 9.2, 0.28, "EVIDENCE ROOM — AP AGENT OS   ·   " + kicker, 10, False, P_GILT)


def title_slide(prs, kicker: str, title: str, sub: str) -> None:
    s = _blank(prs)
    _box(s, 0, 0, 10, 7.5, P_PAPER)
    _box(s, 0.5, 0.7, 0.38, 0.38, P_PAPER)
    mark = s.shapes.add_shape(1, PInches(0.5), PInches(0.7), PInches(0.38), PInches(0.38))
    mark.fill.background()
    mark.line.color.rgb = P_GILT
    mark.line.width = Emu(12700)
    _text(s, 0.5, 1.4, 9, 0.35, kicker.upper(), 12, True, P_GILT)
    _text(s, 0.5, 1.9, 9, 2.2, title, 36, False, P_INK, "Georgia")
    _text(s, 0.5, 4.4, 8.5, 1.2, sub, 16, False, P_SLATE)
    _text(s, 0.5, 6.8, 9, 0.3, "Proof before permission.  ·  Working draft. Not a forecast.", 11, False, P_SLATE)


def body_slide(prs, kicker: str, title: str, bullets: list[str]) -> None:
    s = _blank(prs)
    _chrome(s, kicker)
    _text(s, 0.4, 0.55, 9.2, 0.8, title, 26, False, P_INK, "Georgia")
    _bullets(s, 0.4, 1.5, 9.1, 5.4, bullets, 16)


def two_col_slide(prs, kicker: str, title: str, left_h: str, left: list[str], right_h: str, right: list[str]) -> None:
    s = _blank(prs)
    _chrome(s, kicker)
    _text(s, 0.4, 0.55, 9.2, 0.6, title, 24, False, P_INK, "Georgia")
    _box(s, 0.4, 1.35, 4.4, 5.5, P_WHITE)
    _box(s, 5.2, 1.35, 4.4, 5.5, P_WHITE)
    _text(s, 0.55, 1.5, 4.1, 0.4, left_h, 14, True, P_GILT)
    _bullets(s, 0.55, 2.0, 4.1, 4.6, left, 14)
    _text(s, 5.35, 1.5, 4.1, 0.4, right_h, 14, True, P_GILT)
    _bullets(s, 5.35, 2.0, 4.1, 4.6, right, 14)


def write_pptx() -> None:
    PPT.mkdir(parents=True, exist_ok=True)

    cfo = Presentation()
    cfo.slide_width = PInches(10)
    cfo.slide_height = PInches(7.5)
    title_slide(cfo, "CFO / Controller briefing", "Proof before permission.",
                "How to put AI on accounts payable without unofficial permission, a second ERP, or a payment robot.")
    body_slide(cfo, "Ask", "What you are being asked", [
        "Put AI on invoice-to-pay without a workforce model.",
        "Keep ERP as the accounting system of record.",
        "Keep named humans as the cash system of record.",
        "Do not buy another platform to start the design work.",
        "Do not accept a savings guarantee as the success criterion.",
    ])
    two_col_slide(cfo, "Category", "What this is — and is not",
                  "This is",
                  ["A Finance Agent Operating System — method and toolkit.",
                   "Sixteen named agents, a packet standard, a permission ladder.",
                   "An evidence-gated promotion model (L0–L4).",
                   "ERP-agnostic: SAP, Oracle, D365, NetSuite, Workday."],
                  "This is not",
                  ["An ERP, OCR engine, or payment institution.",
                   "A ChatGPT prompt pack or AI ebook.",
                   "A fraud-detection guarantee or compliance certificate.",
                   "A promise of savings, payback, or touchless AP."])
    body_slide(cfo, "Hard hold", "The payment sentence", [
        "Agents may observe, recommend, or prepare.",
        "They do not approve, release, or transmit payment.",
        "Vendor bank-detail changes stay human.",
        "Period-close attestation stays human.",
        "Write this on the wall before any pilot.",
    ])
    body_slide(cfo, "Workforce", "Sixteen named roles, not “AP AI”", [
        "Wave 1: Intake, Validation, Matching, Triage, Duplicate & Anomaly, Orchestrator — L0/L1.",
        "Wave 2: Goods Receipt, Approval, Supplier Resolution, Internal Follow-up, Payment Proposal Review (annotate only).",
        "Wave 3: Statement, Close, Reporting, Root Cause, PO Quality.",
        "Wave 4: earned execute for a named clean-match class only — still never payment.",
        "Do not commission sixteen L3 agents.",
    ])
    two_col_slide(cfo, "Permission", "Agents earn responsibility",
                  "Default",
                  ["L0 Observe — shadow report only.",
                   "L1 Recommend — propose with a packet.",
                   "Remaining at L1 is a successful outcome."],
                  "Earned only",
                  ["L2 Prepare — ready-to-act packet; human executes.",
                   "L3 Execute inside a written limit table.",
                   "L4 Managed autonomy of that same bounded set.",
                   "Missing any gate item is a decline."])
    body_slide(cfo, "Public record", "Independent evidence we will cite (and only this)", [
        "McKinsey State of AI 2025 (n=1,993): 88% use AI in at least one function.",
        "Nearly two-thirds have not begun scaling across the enterprise.",
        "62% at least experiment with agents; 23% scale an agent somewhere.",
        "High performers redesign workflows. That is the work.",
        "Ardent cost-per-invoice figures are vendor-citing-independent. Do not paste them as targets.",
    ])
    body_slide(cfo, "Controls", "What Internal Audit should be able to sample", [
        "Charter, autonomy register, and limit table for every live helper.",
        "Packet: source, extract, match worksheet or coded fail, owner, SLA, flag outcome.",
        "Overrides logged. Promotions change-controlled. One-hour rollback named.",
        "Dual humans on payment release. Vendor-bank change control exists.",
        "Cost of inference vs correct outcomes — not tokens as a vanity metric.",
    ])
    body_slide(cfo, "Economics", "How we talk about money", [
        "The workbook does arithmetic on your inputs. It is not a forecast.",
        "Duplicate-suspect lines do not create savings.",
        "Leave unknowns blank. Do not replace them with industry averages.",
        "Validated savings require a Finance attestation method.",
        "Conservative / Base / Upside are envelopes, not commitments.",
    ])
    body_slide(cfo, "Monday", "What we will have done in two weeks if we start", [
        "Diagnostic scored. Vetoes honoured.",
        "One path mapped. Exception codes from the closed list.",
        "Six Wave 1 charters with named owners or VACANT.",
        "Shadow design: coverage, sample, language, rollback.",
        "Steering date. No unofficial copilots on payment.",
    ])
    body_slide(cfo, "Decision", "The ask", [
        "Sit the free diagnostic (36 questions).",
        "Charter Wave 1 with owners and exclusions.",
        "Licence Professional ($199) or Team ($499) if the room agrees.",
        "Counsel reviews licence, privacy, and the Evidence Room LLC collision note before public launch.",
        "Refuse the frame if the success criterion is a guaranteed ROI.",
    ])
    cfo.save(PPT / "ER_CFO_AP_Transformation.pptx")

    ws = Presentation()
    ws.slide_width = PInches(10)
    ws.slide_height = PInches(7.5)
    title_slide(ws, "Team edition · one day", "AP Agent OS workshop",
                "One path. Six draft charters. A written payment sentence. No unofficial permission.")
    body_slide(ws, "Contract", "What this day is", [
        "Design the agent layer. Keep the stack.",
        "Outcome: maturity sentence, hold status, Wave 1 charters, two-week shadow plan, steering date.",
        "Non-outcome: platform shortlist, savings target, fraud programme, L3 design.",
        "Banned claims stay banned in the room.",
        "Check: everyone can say “prepare is not execute.”",
    ])
    body_slide(ws, "Wall", "Two sentences on the wall before 09:00", [
        "ERP is the system of record for accounting.",
        "Named humans are the system of record for cash.",
        "Participants write their role on a card. No opening video.",
        "Treasury repeats the payment sentence before lunch.",
    ])
    body_slide(ws, "09:00", "Contract of the day (20 minutes)", [
        "What this is: operating system for an agent layer.",
        "What this is not: ERP project, payment product, prompt class.",
        "Payment sentence. Ask Treasury to repeat it.",
        "Banned claims: savings guarantee, fraud detection, compliance, accuracy, autonomous pay.",
    ])
    body_slide(ws, "09:20", "Exercise 1 — Diagnostic lightning", [
        "36 questions. Score as a room. Challenger is Controls.",
        "Output: six dimension averages, vetoes, band sentence on the wall.",
        "If C1 is disputed, do not average — reconstruct the last payment run after the break.",
        "A5 at 0 or 1 vetoes placement above maturity L2.",
    ])
    body_slide(ws, "10:35", "Exercise 2 — Ten exceptions + one payment run", [
        "Groups of three: Match + Controls + Transformation; Ops + Payments + Process Owner.",
        "Classify from the closed list. No free-text “other” as a culture.",
        "Output: class A–J table; list of demo temptations; at least one Class A refusal written.",
        "Dummy GR and invented PO are Class A refusals.",
    ])
    body_slide(ws, "12:45", "Holds review with Controller / Treasury", [
        "Walk C1 (dual humans on payment), C2 (vendor-bank), dummy GR, DOA climb.",
        "Write used / documented / absent.",
        "If C1 absent: afternoon charters are L0 only; Agent 12 card is marked CLOSED.",
        "Do not move holds to an email if the Controller only has 45 minutes.",
    ])
    body_slide(ws, "13:15", "Exercise 3 — Wave 1 charters", [
        "Stations for agents 01, 02, 03, 04, 10, 16.",
        "Owner, object types, packet, exclusions, starting level (L0 or L1).",
        "Exclusions read aloud. Payment is never in scope.",
        "VACANT is an acceptable owner. Inventing an owner is not.",
    ])
    body_slide(ws, "15:00", "Exercise 4 — Shadow design", [
        "Coverage, sample sizes, language sample, rollback, operator huddle date.",
        "Shadow is L0: no action permissions.",
        "Output: two-week calendar.",
        "If the packet cannot be reconstructed in 90 days, do not promote.",
    ])
    body_slide(ws, "15:40", "Exercise 5 — Steering and communications", [
        "Terms of reference skim. Monday note. Who tells operators. Who tells Audit.",
        "Output: steering date; comms owners.",
        "Close: read the wall. Parking lot assigned.",
        "Facilitator: “We did not set a savings target. That was on purpose.”",
    ])
    two_col_slide(ws, "Roles", "Who must be in the room",
                  "Required",
                  ["Process owner / AP manager",
                   "Controls or Internal Audit challenger",
                   "Match / exception desk",
                   "Transformation facilitator"],
                  "Join at holds",
                  ["Controller or CAO",
                   "Treasury / payments lead",
                   "ERP / systems owner (afternoon if needed)",
                   "Procurement if PO Quality is in Wave 1 — it is not"])
    body_slide(ws, "Homework", "48 hours after the room", [
        "Owners confirm they accept the job description.",
        "IAM starts the service-account request.",
        "Informal helpers listed on the autonomy register.",
        "Implementation tracker loaded.",
        "No live invoice pasting into chats or copilots.",
    ])
    body_slide(ws, "Virtual", "Same blocks if remote", [
        "Exercises 2 and 3 in breakouts of 25 minutes + 10-minute plenary.",
        "Send packs the night before.",
        "Prohibit live invoice pasting into chats.",
        "Treasury still repeats the payment sentence out loud.",
    ])
    ws.save(PPT / "ER_Workshop_Deck.pptx")

    st = Presentation()
    st.slide_width = PInches(10)
    st.slide_height = PInches(7.5)
    title_slide(st, "Steering committee", "Promote / hold / demote",
                "A decision pack, not a celebration slide. Missing artefacts are a decline.")
    body_slide(st, "Pack", "Required artefacts or we do not sit", [
        "Scorecard with locked formulas and a named window.",
        "Exception ageing by closed-list code and named owner.",
        "Autonomy register — every live helper, including informal copilots.",
        "Incidents, overrides, and rollback tests.",
        "Cost of inference versus correct outcomes.",
        "A written recommend / hold / demote for each agent in scope.",
    ])
    body_slide(st, "Ladder", "What we are allowed to decide today", [
        "Hold at current level.",
        "Demote (including to retired).",
        "Promote one step if every gate item exists.",
        "Refuse a new class of work.",
        "We are not allowed to set a savings target as a substitute for a packet.",
    ])
    two_col_slide(st, "Gates", "Promotion is change-controlled",
                  "Must exist",
                  ["Signed charter",
                   "Gate pack (gold-label + shadow)",
                   "Limit table",
                   "Detection path",
                   "One-hour rollback",
                   "Named sign-offs",
                   "Register entry"],
                  "Automatic decline",
                  ["Any item missing",
                   "Payment in the proposed rights",
                   "Vendor-bank write in the tools list",
                   "Dummy GR or invented PO in the sample",
                   "Unofficial copilot discovered on the path"])
    body_slide(st, "Payment", "Hard ceiling — not a steering topic", [
        "Agent 12 annotates payment proposals.",
        "Dual humans release.",
        "There is no L3 for payment.",
        "If C1 is absent, Agent 12 remains CLOSED.",
    ])
    body_slide(st, "Risk", "Questions the challenger asks", [
        "Show me the artefact — not the dashboard.",
        "Who is Accountable? An agent cannot hold A.",
        "What happens in one hour if we roll back?",
        "Which informal helpers are not on the register?",
        "Where did a model invent a receipt, a PO, or a bank account?",
    ])
    body_slide(st, "Minutes", "What we write down", [
        "Decision per agent: promote / hold / demote / retire.",
        "Evidence IDs reviewed.",
        "Dissent, if any.",
        "Next sample window.",
        "Communications owner for operators and Audit.",
    ])
    body_slide(st, "Close", "Language we will not use in the minutes", [
        "Guaranteed savings. Validated ROI. Touchless AP.",
        "Fraud detection. Audit-ready. Compliant.",
        "Autonomous payments. The agent paid.",
        "Industry-average cost per invoice as our target.",
    ])
    st.save(PPT / "ER_Steering_Committee.pptx")

    bc = Presentation()
    bc.slide_width = PInches(10)
    bc.slide_height = PInches(7.5)
    title_slide(bc, "Business case", "Arithmetic on your inputs",
                "Not a forecast. Duplicate-suspect savings equal zero. Leave unknowns blank.")
    body_slide(bc, "Use", "How to use the workbook", [
        "Enter volume, path FTE, loaded cost, hours, touch and exception times.",
        "Leave unknowns blank. Do not fill with industry averages.",
        "Read Conservative / Base / Upside as envelopes.",
        "Do not paste vendor $2.78 / $12.88 into INPUTS.",
        "Validated savings require a Finance attestation method.",
    ])
    body_slide(bc, "Inputs", "Yellow cells only for a baseline", [
        "I1 Annual invoice volume.",
        "I2 Path FTE. I3 Loaded cost. I4 Hours per FTE (must stay visible).",
        "I5 Manual-touch share. I6 Minutes per manual touch.",
        "I7 Exception rate. I8 Minutes per exception.",
        "I12 Tool / model cost and implementation cost.",
        "I13 Efficiency envelopes — hours released share, not money invented.",
    ])
    two_col_slide(bc, "Refusals", "What the model will not do",
                  "Forced to zero",
                  ["Duplicate-suspect savings",
                   "Blank late-pay or early-pay credits",
                   "Vendor benchmark as a target",
                   "A single composite “AI score”"],
                  "Human only",
                  ["Payment release",
                   "Attestation of savings",
                   "Choice of envelope to show a board",
                   "Whether to proceed at all"])
    body_slide(bc, "Families", "Do not average these into one number", [
        "Activity — volume context only.",
        "Operational — accuracy, ageing, intervention. May veto expansion.",
        "Financial — cost and validated money movement. Never overrides risk-control.",
        "Risk-control — breaches, reconstructability. May veto expansion.",
    ])
    body_slide(bc, "Northline", "Fictional illustration only", [
        "180,000 invoices / year. 14 path FTE. $85,000 loaded.",
        "Used so the sheets are not empty.",
        "Replace every input before any internal circulation that looks like a forecast.",
        "Label Northline fictional in the first mention of a figure.",
    ])
    body_slide(bc, "Research", "What we may say in a pack", [
        "McKinsey State of AI 2025 figures with sample and date.",
        "High performers redesign workflows — that is the method.",
        "Ardent via Tipalti is vendor-citing-independent. Not a before/after.",
        "If a number is not in the research ledger, do not put it on a slide.",
    ])
    body_slide(bc, "Decision", "What a board can usefully decide", [
        "Fund a Wave 1 design and shadow — not a platform.",
        "Name owners and a challenger.",
        "Accept that remaining at L1 is success.",
        "Refuse any frame that requires a guaranteed ROI to proceed.",
    ])
    bc.save(PPT / "ER_Business_Case_Deck.pptx")
    print("pptx written", flush=True)


# ---------------------------------------------------------------------------
# Workbook enrichment
# ---------------------------------------------------------------------------

def _fill_hex(hex_color: str) -> PatternFill:
    return PatternFill("solid", fgColor=hex_color)


def _thin() -> Border:
    s = Side(style="thin", color="D6CFC0")
    return Border(left=s, right=s, top=s, bottom=s)


def _header(ws, row: int, cols: int) -> None:
    for c in range(1, cols + 1):
        cell = ws.cell(row, c)
        cell.fill = _fill_hex("12160F")
        cell.font = Font(color="F3EEE4", bold=True, name="Calibri", size=11)
        cell.alignment = Alignment(wrap_text=True, vertical="center")


def enrich_registry() -> None:
    path = XLS / "ER_AP_Agent_Registry.xlsx"
    wb = load_workbook(path)
    if "EXAMPLE_NORTHLINE" in wb.sheetnames:
        return
    ex = wb.create_sheet("EXAMPLE_NORTHLINE")
    headers = ["ID", "Agent", "Default autonomy", "Level in force", "Human owner", "Wave", "Status", "Exclusions (hard)", "Last recert"]
    for i, h in enumerate(headers, 1):
        ex.cell(1, i, h)
    _header(ex, 1, len(headers))
    owners = {
        "01": "Elena Voss", "02": "Elena Voss", "03": "Elena Voss", "04": "Exception Desk (designate)",
        "05": "Plant liaison (designate)", "06": "James Okonkwo", "07": "Approvals coordinator (designate)",
        "08": "Supplier desk (designate)", "09": "Exception Desk (designate)", "10": "Priya Shah / Controls",
        "11": "Reconciliations (designate)", "12": "Hannah Reid", "13": "Priya Shah",
        "14": "AP Analytics (designate)", "15": "Transformation (designate)", "16": "Marcus Chen",
    }
    waves = {"01": 1, "02": 1, "03": 1, "04": 1, "10": 1, "16": 1, "05": 2, "07": 2, "08": 2, "09": 2, "12": 2,
             "11": 3, "13": 3, "14": 3, "15": 3, "06": 3}
    for r, a in enumerate(AGENTS, 2):
        ex.cell(r, 1, a[0])
        ex.cell(r, 2, a[1])
        ex.cell(r, 3, a[2])
        ex.cell(r, 4, a[2] if waves[a[0]] == 1 else "not commissioned")
        ex.cell(r, 5, owners[a[0]])
        ex.cell(r, 6, waves[a[0]])
        ex.cell(r, 7, "shadow" if waves[a[0]] == 1 else "parked")
        ex.cell(r, 8, "Payment / vendor-bank / close attestation" if a[0] != "12" else "Never release or transmit payment")
        ex.cell(r, 9, "")
        for c in range(1, 10):
            ex.cell(r, c).border = _thin()
            ex.cell(r, c).alignment = Alignment(wrap_text=True)
    for i, w in enumerate([8, 28, 16, 18, 28, 8, 14, 42, 14], 1):
        ex.column_dimensions[get_column_letter(i)].width = w
    blank = wb.create_sheet("BLANK_REGISTER")
    for i, h in enumerate(headers, 1):
        blank.cell(1, i, h)
    _header(blank, 1, len(headers))
    for r, a in enumerate(AGENTS, 2):
        blank.cell(r, 1, a[0])
        blank.cell(r, 2, a[1])
        blank.cell(r, 3, a[2])
        for c in range(1, 10):
            blank.cell(r, c).border = _thin()
    note = wb.create_sheet("INSTRUCTIONS")
    note["A1"] = "One row per live helper, including informal copilots. Agents cannot hold Accountable. Payment has no promotion path. Northline is fictional."
    wb.save(path)


def enrich_controls() -> None:
    path = XLS / "ER_AP_Controls_Matrix.xlsx"
    wb = load_workbook(path)
    if "MATRIX_FULL" in wb.sheetnames:
        wb.save(path)
        return
    ws = wb.create_sheet("MATRIX_FULL")
    headers = ["Agent", "Risk", "Control", "Preventive/Detective", "Human owner", "Evidence", "Frequency", "Escalation trigger"]
    for i, h in enumerate(headers, 1):
        ws.cell(1, i, h)
    _header(ws, 1, 8)
    rows = [
        ("01 Intake", "Silent drop", "Channel count vs stub log", "Preventive", "AP Operations", "Intake reconciliation", "Daily", "Count gap > 0"),
        ("01 Intake", "Extract invented", "Citation + confidence floors", "Preventive", "AP Operations", "Gold-label sample", "Weekly", "Ready field without citation"),
        ("03 Matching", "Qty > received", "3-way / GR tests", "Preventive", "Match Lead", "GR snapshot", "Weekly / 100% pilot", "Posted over-received"),
        ("03 Matching", "Invented GR or PO", "No write tools", "Preventive", "Systems", "Tool allow-list", "Each release", "Write attempt"),
        ("10 Dup/Anomaly", "Flag treated as fraud verdict", "Hypothesis language only", "Detective", "Controls", "Flag pack wording", "Weekly", "“Fraud” in output"),
        ("12 Payment review", "Agent releases payment", "No release tool; dual humans", "Preventive", "Treasury", "Payment log vs agent id", "Each run", "Agent id on release"),
        ("12 Payment review", "Bank change executed", "EX-BNK flag only", "Preventive", "Controller", "Bank-change ticket", "Continuous", "Master write by agent"),
        ("16 Orchestrator", "Work object without owner", "SLA clock requires named human", "Preventive", "Process owner", "Ageing by owner", "Daily", "Parked-without-owner"),
        ("Any", "Prompt injection", "Content/instruction split; no arbitrary fetch", "Preventive", "Test lead", "Injection pack", "Each release", "Injection success"),
        ("Any", "Unofficial copilot", "Autonomy register + discovery", "Detective", "Process owner", "Register vs observed", "Monthly", "Helper not on register"),
        ("Any", "Model change silent", "Version pin + recert", "Preventive", "Systems", "Change record", "Each change", "Untracked model id"),
        ("Any", "SoD collision", "Agent cannot hold A; payment dual-human", "Preventive", "Controller", "RACI sample", "Quarterly", "Agent listed as Accountable"),
    ]
    for r, row in enumerate(rows, 2):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = _thin()
            ws.cell(r, c).alignment = Alignment(wrap_text=True, vertical="top")
    for i, w in enumerate([18, 26, 32, 18, 16, 22, 16, 26], 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[1].height = 22
    wb.save(path)


def enrich_exceptions() -> None:
    path = XLS / "ER_AP_Exception_Tracker.xlsx"
    wb = load_workbook(path)
    if "EXAMPLE_OPEN" in wb.sheetnames:
        wb.save(path)
        return
    ex = wb.create_sheet("EXAMPLE_OPEN")
    headers = ["Work object", "Code", "Supplier", "Amount", "Owner", "Age (days)", "Agent", "Next action", "Autonomy", "Status"]
    for i, h in enumerate(headers, 1):
        ex.cell(1, i, h)
    _header(ex, 1, len(headers))
    samples = [
        ("WO-10412", "EX-MGR", "Northline Steel Co (fictional)", 18420, "Plant Cleveland", 11, "05", "Receiver packet", "L1", "open"),
        ("WO-10488", "EX-PRC", "Helix Fasteners (fictional)", 960, "Match desk", 3, "03", "Tolerance check", "L1", "open"),
        ("WO-10501", "EX-PDUP", "Helix Fasteners (fictional)", 960, "Controls", 1, "10", "Human clearance", "L0", "open"),
        ("WO-10302", "EX-APP", "Officepath (fictional)", 2400, "DOA owner", 8, "07", "Chase packet", "L1", "open"),
        ("WO-10211", "EX-BNK", "Delta Castings (fictional)", 44100, "Controller", 0, "02/12", "Hold — human only", "L1 annotate", "hold"),
    ]
    for r, row in enumerate(samples, 2):
        for c, val in enumerate(row, 1):
            ex.cell(r, c, val).border = _thin()
    for i, w in enumerate([14, 12, 32, 12, 18, 12, 10, 22, 14, 10], 1):
        ex.column_dimensions[get_column_letter(i)].width = w
    note = wb.create_sheet("RULES")
    note["A1"] = "Closed list only. Free-text “other” is a design smell. EX-BNK and payment holds are human. Northline names are fictional."
    wb.save(path)


def write_publisher_model() -> None:
    wb = Workbook()
    cover = wb.active
    cover.title = "COVER"
    cover["A1"] = "Evidence Room — publisher financial model (not a customer ROI)"
    cover["A2"] = "Illustrative. Not a forecast. Lemon Squeezy public card 20 Sep 2026: 5% + $0.50."
    cover["A3"] = "US card fee = 0.50 + 0.05 × list. Blended planning fee = 0.50 + 0.056 × list."
    prices = [("Starter", 79), ("Professional", 199), ("Team", 499), ("Blueprint mid", 2250)]
    us = wb.create_sheet("US_CARD")
    headers = ["SKU", "List", "Fee", "Net", "Keep %"]
    for i, h in enumerate(headers, 1):
        us.cell(1, i, h)
    _header(us, 1, 5)
    for r, (name, price) in enumerate(prices, 2):
        us.cell(r, 1, name)
        us.cell(r, 2, price)
        us.cell(r, 3, f"=0.5+0.05*B{r}")
        us.cell(r, 4, f"=B{r}-C{r}")
        us.cell(r, 5, f"=D{r}/B{r}")
        us.cell(r, 2).number_format = '"$"#,##0.00'
        us.cell(r, 3).number_format = '"$"#,##0.00'
        us.cell(r, 4).number_format = '"$"#,##0.00'
        us.cell(r, 5).number_format = "0.0%"
    mix = wb.create_sheet("SCENARIOS_90D")
    headers = ["Scenario", "Starter u", "Pro u", "Team u", "Blueprint u", "Gross", "Refund rate", "Net after refunds (blended)"]
    for i, h in enumerate(headers, 1):
        mix.cell(1, i, h)
    _header(mix, 1, 8)
    rows = [("Conservative", 20, 25, 4, 1, 0.08), ("Base", 40, 60, 10, 2, 0.05), ("Upside", 80, 120, 20, 4, 0.03)]
    for r, row in enumerate(rows, 2):
        mix.cell(r, 1, row[0])
        mix.cell(r, 2, row[1])
        mix.cell(r, 3, row[2])
        mix.cell(r, 4, row[3])
        mix.cell(r, 5, row[4])
        mix.cell(r, 6, f"=B{r}*79+C{r}*199+D{r}*499+E{r}*2250")
        mix.cell(r, 7, row[5])
        # units × (blended_net − refund_rate × list) summed
        mix.cell(r, 8, f"=B{r}*(74.08-G{r}*79)+C{r}*(187.36-G{r}*199)+D{r}*(470.56-G{r}*499)+E{r}*(2123.80-G{r}*2250)")
        mix.cell(r, 6).number_format = '"$"#,##0'
        mix.cell(r, 7).number_format = "0%"
        mix.cell(r, 8).number_format = '"$"#,##0'
    note = wb.create_sheet("NOTES")
    note["A1"] = "Affiliate off. Abandoned-cart extra off. Default US-bank payout 0%. Non-US payout 1% not in SCENARIOS. Counsel and design costs dominate early and are not in these nets. Not tax advice."
    LS.mkdir(parents=True, exist_ok=True)
    wb.save(LS / "ER_Publisher_Financial_Model.xlsx")


def write_start_here_html() -> None:
    dest = ROOT / "00_READ_ME" / "START_HERE.html"
    dest.write_text(
        """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/>
<title>START HERE — Evidence Room — AP Agent OS</title>
<style>
body{margin:0;background:#F3EEE4;color:#12160F;font-family:Helvetica,Arial,sans-serif;line-height:1.5}
.wrap{max-width:820px;margin:0 auto;padding:48px 24px 80px}
.k{letter-spacing:.18em;color:#8C6B2C;font-size:12px}
h1{font-family:Georgia,serif;font-weight:500;font-size:36px;margin:8px 0 12px}
.rule{width:72px;border-top:1.5px solid #B0893E;margin:16px 0 24px}
ol{padding-left:20px} li{margin:10px 0}
a{color:#12160F}
.box{border:1px solid #D6CFC0;background:#FAF8F3;padding:16px 18px;margin:24px 0}
</style></head>
<body><div class="wrap">
<p class="k">EVIDENCE ROOM — AP AGENT OS</p>
<h1>START HERE</h1>
<p>Proof before permission. Digital toolkit — not hosted software.</p>
<div class="rule"></div>
<ol>
<li><strong>Quick Start</strong> — <a href="QUICK_START.md">12 steps</a></li>
<li><strong>Assess current state</strong> — <a href="../01_FREE_AP_AI_READINESS/DIAGNOSTIC_GUIDE.md">36-question diagnostic</a> or <a href="../08_WEBSITE/diagnostic.html">browser scorer</a></li>
<li><strong>Map the process</strong> — <a href="../03_AP_AGENT_OS_PRO/Process_Mapping/00_METHODOLOGY.md">methodology</a></li>
<li><strong>Select first agent</strong> — Wave 1: 01, 02, 03, 04, 10, 16</li>
<li><strong>Write agent charter</strong> — <a href="../03_AP_AGENT_OS_PRO/Word_Templates/ER_Agent_Charter.docx">Word</a></li>
<li><strong>Define controls</strong> — <a href="../03_AP_AGENT_OS_PRO/Spreadsheets/ER_AP_Controls_Matrix.xlsx">matrix</a></li>
<li><strong>Establish KPIs</strong> — <a href="../03_AP_AGENT_OS_PRO/Spreadsheets/ER_AP_KPI_Scorecard.xlsx">scorecard</a></li>
<li><strong>Test</strong> — historical protocol in Professional</li>
<li><strong>Run shadow mode</strong> — no action permissions</li>
<li><strong>Deploy</strong> — only the chartered class, at the chartered level</li>
<li><strong>Measure</strong> — locked formulas, named window</li>
<li><strong>Expand responsibility</strong> — evidence pack or decline</li>
</ol>
<div class="box">
<p><strong>Hard hold.</strong> ERP is the system of record for accounting. Named humans are the system of record for cash.</p>
<p>Licence: Individual (Starter / Professional) · Team · drafts for counsel in <a href="../10_LEGAL_AND_LICENSING/LICENCE_TERMS.md">10_LEGAL</a>.</p>
</div>
</div></body></html>
""",
        encoding="utf-8",
    )


def main() -> None:
    write_word()
    write_pptx()
    enrich_registry()
    enrich_controls()
    enrich_exceptions()
    write_publisher_model()
    write_start_here_html()
    typeset_pdfs()
    print("Commercial pack thickened.")


if __name__ == "__main__":
    main()
