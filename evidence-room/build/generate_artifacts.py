#!/usr/bin/env python3
"""Generate Evidence Room commercial artifacts: remaining website pages,
Excel workbooks, Word templates, PowerPoint decks, and print PDFs."""

from __future__ import annotations

import subprocess
from pathlib import Path

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from pptx import Presentation

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "08_WEBSITE"
XLS = ROOT / "03_AP_AGENT_OS_PRO" / "Spreadsheets"
DOC = ROOT / "03_AP_AGENT_OS_PRO" / "Word_Templates"
PPT = ROOT / "04_AP_AGENT_OS_TEAM" / "Decks"
PDF = ROOT / "11_GENERATED_PDF"
BRAND = ROOT / "06_SALES_AND_MARKETING" / "Brand_Assets"

INK = "12160F"
PAPER = "F3EEE4"
GILT = "B0893E"
WHITE = "FAF8F3"
SLATE = "5A6154"
YELLOW = "F6E7B2"
BLUE = "D7E4F0"
ORANGE = "F3D2B5"

AGENTS = [
    ("01", "Invoice Intake", "L1", "AP Operations Lead", "Capture and classify inbound invoices"),
    ("02", "Invoice Validation", "L1", "AP Quality Lead", "Completeness and posting-readiness"),
    ("03", "Matching", "L1", "AP Match Lead", "2-way / 3-way / GR-IR match"),
    ("04", "Exception Triage", "L1", "Exception Desk Lead", "Classify, assign, clock"),
    ("05", "Goods Receipt", "L1", "Plant Finance Liaison", "Missing or aged receipts"),
    ("06", "PO Quality", "L0", "Procurement Operations Lead", "PO defects that become AP exceptions"),
    ("07", "Approval", "L1", "AP Approvals Coordinator", "Route per DOA; chase packets"),
    ("08", "Supplier Resolution", "L1", "AP Supplier Desk", "Draft supplier queries"),
    ("09", "Internal Follow-up", "L1", "Exception Desk Lead", "Internal owner fact packs"),
    ("10", "Duplicate & Anomaly", "L0", "AP Controls Lead", "Flags only — not a fraud verdict"),
    ("11", "Vendor Statement", "L1", "AP Reconciliations Lead", "Statement to subledger"),
    ("12", "Payment Proposal Review", "L1", "Treasury / AP Payments Lead", "Annotate; never release"),
    ("13", "AP Close", "L1", "Assistant Controller — Payables", "Checklist and accrual candidates"),
    ("14", "AP Reporting", "L1", "AP Analytics", "Defined-source packs"),
    ("15", "Root Cause", "L0", "Finance Transformation Lead", "Cluster exceptions"),
    ("16", "Orchestrator", "L1", "AP Process Owner", "Sequence, SLA, evidence"),
]

EXCEPTIONS = [
    ("EX-MPO", "Missing PO", "Medium"),
    ("EX-IPO", "Invalid PO", "Medium"),
    ("EX-POC", "PO closed", "Medium"),
    ("EX-POE", "PO exhausted", "Medium"),
    ("EX-PRC", "Price mismatch", "Medium"),
    ("EX-QTY", "Quantity mismatch", "Medium"),
    ("EX-MGR", "Missing receipt", "Medium"),
    ("EX-PGR", "Partial receipt", "Low"),
    ("EX-DUP", "Duplicate invoice", "High"),
    ("EX-PDUP", "Potential duplicate", "High"),
    ("EX-VND", "Wrong supplier", "High"),
    ("EX-ENT", "Incorrect legal entity", "High"),
    ("EX-TAX", "Tax issue", "High"),
    ("EX-APP", "Approval missing", "Medium"),
    ("EX-DOA", "DOA issue", "High"),
    ("EX-COD", "Coding missing", "Medium"),
    ("EX-CC", "Invalid cost centre", "Medium"),
    ("EX-QLT", "Invoice quality", "Low"),
    ("EX-OCR", "OCR / extraction issue", "Medium"),
    ("EX-MDM", "Master-data issue", "High"),
    ("EX-BNK", "Banking-change concern", "Critical"),
    ("EX-CRN", "Credit note required", "Medium"),
    ("EX-STM", "Statement discrepancy", "Medium"),
    ("EX-HLD", "Payment hold", "High"),
    ("EX-DSP", "Disputed invoice", "High"),
    ("EX-AGE", "Aged unresolved item", "Medium"),
    ("EX-SYS", "System / interface error", "High"),
]


def fill(hex_color: str) -> PatternFill:
    return PatternFill("solid", fgColor=hex_color)


def thin() -> Border:
    s = Side(style="thin", color="D6CFC0")
    return Border(left=s, right=s, top=s, bottom=s)


def style_header(ws, row: int, cols: int) -> None:
    for c in range(1, cols + 1):
        cell = ws.cell(row, c)
        cell.fill = fill(INK)
        cell.font = Font(color="F3EEE4", bold=True, name="Calibri", size=11)
        cell.alignment = Alignment(wrap_text=True, vertical="center")


def autosize(ws, widths: dict[int, int]) -> None:
    for col, width in widths.items():
        ws.column_dimensions[get_column_letter(col)].width = width


def banner(ws, text: str, cols: int = 8) -> None:
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=cols)
    cell = ws.cell(1, 1, text)
    cell.fill = fill(GILT)
    cell.font = Font(bold=True, name="Calibri", size=11, color=INK)
    cell.alignment = Alignment(wrap_text=True, vertical="center")
    ws.row_dimensions[1].height = 36


# ---------------------------------------------------------------------------
# Excel
# ---------------------------------------------------------------------------

def write_roi() -> None:
    XLS.mkdir(parents=True, exist_ok=True)
    wb = Workbook()

    cover = wb.active
    cover.title = "COVER"
    banner(cover, "Outputs are arithmetic on your inputs. They are not a forecast and not a promise of savings, payback, or ROI. Duplicate-suspect lines do not create savings. Leave unknown inputs blank; do not replace them with industry averages.", 6)
    cover["A3"] = "EVIDENCE ROOM — AP AGENT OS"
    cover["A4"] = "Business-case workbook · Professional"
    cover["A6"] = "Organisation"
    cover["B6"] = "Northline Industrials (replace)"
    cover["A7"] = "Owner"
    cover["B7"] = ""
    cover["A8"] = "Date"
    cover["B8"] = "2026-09-20"
    cover["A9"] = "Envelope"
    cover["B9"] = "Narrow / Central / Inclusive — state which you are using"
    cover["A11"] = "Do not copy Ardent or McKinsey figures into INPUTS. RESEARCH is locked text only."
    autosize(cover, {1: 28, 2: 70})

    inp = wb.create_sheet("INPUTS")
    banner(inp, "Yellow = required for baseline. Blue = optional. Orange = efficiency cases (I13). Blank means unknown — do not fill with industry averages.")
    headers = ["ID", "Name", "Named range", "Value", "Unit", "Notes"]
    for i, h in enumerate(headers, 1):
        inp.cell(3, i, h)
    style_header(inp, 3, 6)
    rows = [
        ("I1", "Annual invoice volume", "vol_invoices", 180000, "invoices", "Northline illustration: 15,000 / month"),
        ("I2", "AP FTE on path", "fte_path", 14, "FTE", "Path labour only"),
        ("I3", "Fully loaded cost / FTE", "loaded_cost_fte", 85000, "USD / year", ""),
        ("I4", "Hours per FTE", "hours_per_fte", 1800, "hours", "Must stay visible"),
        ("I5", "Manual-touch share", "manual_touch_pct", 0.55, "0-1", ""),
        ("I6", "Minutes per manual touch", "minutes_per_touch", 8, "minutes", "Required for T"),
        ("I7", "Exception rate", "exception_rate", 0.22, "0-1", "Your rate, not a benchmark target"),
        ("I8", "Minutes per exception", "minutes_per_exception", 25, "minutes", ""),
        ("I9", "Mechanical share of exceptions", "mechanical_share_of_exc", 0.0, "0-1", "Default 0 until justified"),
        ("I10", "Duplicate-suspect rate", "dup_suspect_rate", 0.01, "0-1", "DISPLAY ONLY — not used in savings"),
        ("I11a", "Late-pay cost (known)", "late_pay_cost", None, "USD / year", "Blank = 0 credit"),
        ("I11b", "Early-pay captured (known)", "early_pay_captured", None, "USD / year", "Blank = 0 credit"),
        ("I12a", "Tool / model run cost", "tool_cost", 40000, "USD / year", ""),
        ("I12b", "Implementation cost", "impl_cost", 75000, "USD", ""),
        ("I13c", "Efficiency Conservative", "eff_c", 0.08, "0-1", "Hours released share"),
        ("I13b", "Efficiency Base", "eff_b", 0.15, "0-1", ""),
        ("I13u", "Efficiency Upside", "eff_u", 0.25, "0-1", ""),
        ("I14", "Amortisation years", "amort_years", 3, "years", "For ROI display only"),
    ]
    colors = {
        "I1": YELLOW, "I2": YELLOW, "I3": YELLOW, "I4": YELLOW, "I5": YELLOW,
        "I6": YELLOW, "I7": YELLOW, "I8": YELLOW, "I12a": YELLOW, "I12b": YELLOW,
        "I9": BLUE, "I10": BLUE, "I11a": BLUE, "I11b": BLUE, "I14": BLUE,
        "I13c": ORANGE, "I13b": ORANGE, "I13u": ORANGE,
    }
    for r, row in enumerate(rows, 4):
        for c, val in enumerate(row, 1):
            cell = inp.cell(r, c, val if val is not None else "")
            cell.border = thin()
            cell.alignment = Alignment(wrap_text=True)
            if c == 4:
                cell.fill = fill(colors[row[0]])
                if row[0] in {"I5", "I7", "I9", "I10", "I13c", "I13b", "I13u"}:
                    cell.number_format = "0%"
                elif row[0] in {"I3", "I11a", "I11b", "I12a", "I12b"}:
                    cell.number_format = '"$"#,##0'
        inp.cell(r, 3).value = row[2]
    inp["D4"].value = 180000
    # named-range convenience labels in column G
    inp["A24"] = "Use CASES sheet. Do not paste vendor $2.78 / $12.88 into D5."
    autosize(inp, {1: 10, 2: 34, 3: 24, 4: 16, 5: 16, 6: 42})

    der = wb.create_sheet("DERIVED")
    banner(der, "Derived. If INPUTS!D4 is 0 or blank, CPI is NA. If exception labour > people cost, flag INPUT_INCONSISTENT.")
    der["A3"] = "Metric"
    der["B3"] = "Formula result"
    style_header(der, 3, 2)
    metrics = [
        ("Hourly rate", "=IF(INPUTS!D7=0,NA(),INPUTS!D6/INPUTS!D7)"),
        ("D1 People cost", "=INPUTS!D5*INPUTS!D6"),
        ("D2 Exceptions", "=INPUTS!D4*INPUTS!D10"),
        ("D3 Exception hours", "=B6*INPUTS!D11/60"),
        ("D4 Exception labour", "=B7*B4"),
        ("T minutes", "=INPUTS!D4*INPUTS!D8*INPUTS!D9"),
        ("T hours", "=B9/60"),
        ("D5 CPI (Narrow: people/volume)", '=IF(OR(INPUTS!D4="",INPUTS!D4=0),NA(),B5/INPUTS!D4)'),
        ("D6 Run cost", "=INPUTS!D16"),
        ("D7 Year-1 cash out", "=INPUTS!D16+INPUTS!D17"),
        ("Consistency", '=IF(B8>B5,"INPUT_INCONSISTENT","OK")'),
        ("Dup-suspect count (display only)", "=INPUTS!D4*INPUTS!D13"),
        ("Dup-suspect savings (forced)", 0),
    ]
    for i, (name, formula) in enumerate(metrics, 4):
        der.cell(i, 1, name)
        der.cell(i, 2, formula)
        der.cell(i, 1).border = thin()
        der.cell(i, 2).border = thin()
        if i in {5, 8, 12, 13}:
            der.cell(i, 2).number_format = '"$"#,##0'
        if i == 11:
            der.cell(i, 2).number_format = '"$"#,##0.00'
    der["A19"] = "Hours released are not validated financial savings until Finance attests a method."
    autosize(der, {1: 40, 2: 22})

    cases = wb.create_sheet("CASES")
    banner(cases, "Conservative / Base / Upside. Duplicate-suspect savings remain 0 in every case.")
    cases["A3"] = "Line"
    cases["B3"] = "Conservative"
    cases["C3"] = "Base"
    cases["D3"] = "Upside"
    style_header(cases, 3, 4)
    cases["A4"] = "Efficiency applied"
    cases["B4"] = "=INPUTS!D18"
    cases["C4"] = "=INPUTS!D19"
    cases["D4"] = "=INPUTS!D20"
    for col in "BCD":
        cases[f"{col}4"].number_format = "0%"
    cases["A5"] = "Hours released (estimated)"
    cases["B5"] = "=DERIVED!B10*B4"
    cases["C5"] = "=DERIVED!B10*C4"
    cases["D5"] = "=DERIVED!B10*D4"
    cases["A6"] = "Labour capacity value (estimated)"
    cases["B6"] = "=B5*DERIVED!B4"
    cases["C6"] = "=C5*DERIVED!B4"
    cases["D6"] = "=D5*DERIVED!B4"
    cases["A7"] = "Late-pay / discount change (only if you entered it)"
    cases["B7"] = "=IF(INPUTS!D14=\"\",0,0)"
    cases["C7"] = "=IF(INPUTS!D15=\"\",0,0)"
    cases["D7"] = 0
    cases["A8"] = "Duplicate-suspect savings"
    cases["B8"] = 0
    cases["C8"] = 0
    cases["D8"] = 0
    cases["A9"] = "Run + impl (year 1)"
    cases["B9"] = "=DERIVED!B13"
    cases["C9"] = "=DERIVED!B13"
    cases["D9"] = "=DERIVED!B13"
    cases["A10"] = "Net year-1 (estimated capacity minus cash out)"
    cases["B10"] = "=B6+B7+B8-B9"
    cases["C10"] = "=C6+C7+C8-C9"
    cases["D10"] = "=D6+D7+D8-D9"
    cases["A11"] = "Simple payback years (if net>0 after impl amortised)"
    cases["B11"] = '=IF((B6-DERIVED!B12)<=0,"n/a",INPUTS!D21)'
    cases["C11"] = '=IF((C6-DERIVED!B12)<=0,"n/a",INPUTS!D21)'
    cases["D11"] = '=IF((D6-DERIVED!B12)<=0,"n/a",INPUTS!D21)'
    for r in range(6, 11):
        for col in "BCD":
            cases[f"{col}{r}"].number_format = '"$"#,##0'
    for r in range(4, 12):
        for c in range(1, 5):
            cases.cell(r, c).border = thin()
    autosize(cases, {1: 56, 2: 18, 3: 18, 4: 18})

    sens = wb.create_sheet("SENSITIVITY")
    banner(sens, "One-way shocks on Base efficiency. Not a forecast.")
    sens["A3"] = "Shock"
    sens["B3"] = "Base hours released"
    style_header(sens, 3, 2)
    shocks = [
        ("Volume -20%", "=CASES!C5*0.8"),
        ("Volume +20%", "=CASES!C5*1.2"),
        ("Efficiency = Conservative", "=CASES!B5"),
        ("Efficiency = Upside", "=CASES!D5"),
        ("Touch minutes +25%", "=CASES!C5*1.25"),
    ]
    for i, (n, f) in enumerate(shocks, 4):
        sens.cell(i, 1, n)
        sens.cell(i, 2, f)
    autosize(sens, {1: 36, 2: 22})

    cpi = wb.create_sheet("CPI")
    banner(cpi, "Cost per invoice — Narrow envelope uses people cost / volume. Do not subtract vendor Best-in-Class $2.78.")
    cpi["A3"] = "Narrow CPI"
    cpi["B3"] = "=DERIVED!B11"
    cpi["B3"].number_format = '"$"#,##0.00'
    cpi["A4"] = "Exception labour / invoice"
    cpi["B4"] = '=IF(INPUTS!D4=0,NA(),DERIVED!B8/INPUTS!D4)'
    cpi["B4"].number_format = '"$"#,##0.00'
    autosize(cpi, {1: 36, 2: 16})

    res = wb.create_sheet("RESEARCH")
    banner(res, "Locked citations. Do not write formulas that consume these numbers as targets.")
    res["A3"] = "Claim"
    res["B3"] = "Value"
    res["C3"] = "Independence"
    res["D3"] = "Source"
    style_header(res, 3, 4)
    cites = [
        ("Best-in-Class vs All Others cost / invoice (Ardent 2024 via Tipalti)", "$2.78 vs $12.88", "vendor-citing-independent", "Ardent State of ePayables 2024; hop: tipalti.com AI invoice processing"),
        ("Best-in-Class vs All Others cycle time (Ardent 2024 via Tipalti)", "3.1 vs 17.4 days", "vendor-citing-independent", "Same hop. Class split, not your before/after."),
        ("Exception rates cited as 22% and 9% (Ardent 2025 via Tipalti)", "22% / 9%", "vendor-citing-independent", "AP Metrics that Matter 2025 hop. Not a measured automation delta for you."),
        ("CFOs using gen AI for >5 use cases (McKinsey Nov 2025)", "44% of 102 (from 7%)", "independent", "How finance teams are putting AI to work today"),
        ("Regular AI use ≥1 function (McKinsey State of AI 2025)", "88% (from 78%)", "independent", "Survey 25 Jun–29 Jul 2025, n=1,993"),
        ("Not yet scaling AI across the enterprise", "nearly two-thirds", "independent", "Same"),
        ("At least experimenting with AI agents", "62%", "independent", "Same"),
        ("Scaling an agentic system somewhere", "23%", "independent", "Same"),
        ("Any EBIT impact attributed to AI", "39%", "independent", "Same"),
    ]
    for i, row in enumerate(cites, 4):
        for c, v in enumerate(row, 1):
            res.cell(i, c, v).alignment = Alignment(wrap_text=True)
    autosize(res, {1: 70, 2: 28, 3: 28, 4: 60})

    audit = wb.create_sheet("AUDIT")
    banner(audit, "Who attested each material input.")
    audit["A3"] = "Input"
    audit["B3"] = "Source system / file"
    audit["C3"] = "Date"
    audit["D3"] = "Attested by"
    style_header(audit, 3, 4)
    for i, name in enumerate(["Volume", "FTE", "Loaded cost", "Exception rate", "Tool cost"], 4):
        audit.cell(i, 1, name)
    autosize(audit, {1: 20, 2: 36, 3: 16, 4: 24})

    wb.save(XLS / "ER_AP_Business_Case_ROI.xlsx")


def write_scorecard() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "SCORECARD"
    banner(ws, "Do not average Activity + Operational + Financial + Risk-control into one agent score. Hours released ≠ validated savings.")
    headers = ["Family", "Metric", "Formula (plain)", "Window value", "Owner", "Source"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 6)
    rows = [
        ("Activity", "Invoices handled", "count terminal in-scope", "", "AP Manager", "ERP"),
        ("Activity", "Exceptions handled", "count closed invoice×code", "", "AP Lead", "Exception register"),
        ("Operational", "Classification accuracy", "correct / labelled", "", "Quality Lead", "Gold-label"),
        ("Operational", "Extraction accuracy", "field-correct / sampled fields", "", "Quality Lead", "Sample sheet"),
        ("Operational", "Matching accuracy", "correct match proposals / labelled", "", "Match Lead", "Gold-label"),
        ("Operational", "False-positive rate", "FP / (FP+TN)", "", "Controls Lead", "Labelled set"),
        ("Operational", "False-negative rate", "FN / (FN+TP)", "", "Controls Lead", "Labelled set"),
        ("Operational", "STP proposal rate", "accepted no-edit / in-scope", "", "AP Manager", "Orchestrator"),
        ("Operational", "Human intervention rate", "edited or rejected / proposals", "", "AP Manager", "Orchestrator"),
        ("Operational", "Repeat exception rate", "reopened codes / closed", "", "Exception Desk", "Register"),
        ("Financial", "Cost per invoice (Narrow)", "people cost / volume", "", "Controller", "This workbook"),
        ("Financial", "AI inference / tool cost", "invoices from vendor bill", "", "Transformation", "Invoice"),
        ("Financial", "Estimated hours released", "T_hours × efficiency", "", "AP Manager", "CASES"),
        ("Financial", "Validated financial savings", "attested method only; else blank", "", "Finance", "Attestation"),
        ("Risk-control", "Control breaches", "count of SoD / hold / bank-change breaches", "", "Controls Lead", "Log"),
        ("Risk-control", "Escalation rate", "escalated / exceptions", "", "AP Lead", "Register"),
        ("Risk-control", "Audit exceptions on the path", "count in window", "", "Internal Audit", "IA file"),
        ("Risk-control", "Rework rate", "rework / handled", "", "Quality Lead", "Register"),
    ]
    for r, row in enumerate(rows, 4):
        for c, v in enumerate(row, 1):
            ws.cell(r, c, v).border = thin()
            ws.cell(r, c).alignment = Alignment(wrap_text=True)
    autosize(ws, {1: 16, 2: 32, 3: 40, 4: 16, 5: 20, 6: 18})

    weekly = wb.create_sheet("WEEKLY")
    banner(weekly, "Weekly agent-performance report. Grey is not zero — leave blank if unmeasured.")
    weekly["A3"] = "Agent"
    weekly["B3"] = "Autonomy"
    weekly["C3"] = "Proposals"
    weekly["D3"] = "Accepted no-edit"
    weekly["E3"] = "Rejected"
    weekly["F3"] = "Cost (USD)"
    weekly["G3"] = "Promote / hold / demote"
    weekly["H3"] = "Evidence note"
    style_header(weekly, 3, 8)
    for i, a in enumerate(AGENTS, 4):
        weekly.cell(i, 1, f"{a[0]} {a[1]}")
        weekly.cell(i, 2, a[2])
        weekly.cell(i, 7, "hold")
    autosize(weekly, {1: 32, 2: 12, 3: 14, 4: 18, 5: 12, 6: 14, 7: 22, 8: 40})
    wb.save(XLS / "ER_AP_KPI_Scorecard.xlsx")


def write_registry() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "AGENT_REGISTRY"
    banner(ws, "One named human owner per agent. Payment-related ceiling is L2. Agent 10 is never a fraud verdict.")
    headers = ["ID", "Agent", "Default autonomy", "Ceiling", "Human owner", "Purpose", "Status", "Last recertification"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 8)
    for r, a in enumerate(AGENTS, 4):
        ceiling = "L2" if a[0] in {"10", "12"} else "L4 (evidence-gated)"
        if a[0] == "12":
            ceiling = "L2 — annotate only"
        if a[0] == "10":
            ceiling = "L2 — flag only"
        vals = [a[0], a[1], a[2], ceiling, a[3], a[4], "Not commissioned", ""]
        for c, v in enumerate(vals, 1):
            ws.cell(r, c, v).border = thin()
    dv = DataValidation(type="list", formula1='"Not commissioned,L0,L1,L2,L3,L4,Retired"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add("C4:C19")
    autosize(ws, {1: 8, 2: 28, 3: 18, 4: 22, 5: 32, 6: 42, 7: 20, 8: 22})
    wb.save(XLS / "ER_AP_Agent_Registry.xlsx")


def write_exception_tracker() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "TAXONOMY"
    banner(ws, "Closed list. Do not invent synonyms. Potential duplicate ≠ duplicate.")
    for i, h in enumerate(["Code", "Name", "Risk", "Open count", "Owner", "Agent"], 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 6)
    for r, e in enumerate(EXCEPTIONS, 4):
        for c, v in enumerate(e, 1):
            ws.cell(r, c, v).border = thin()
    ws2 = wb.create_sheet("OPEN_ITEMS")
    banner(ws2, "Ageing starts on the day the code is set, not invoice date, unless SOP says otherwise.")
    for i, h in enumerate(["Invoice ID", "Supplier", "Code", "Owner", "Code date", "Age (days)", "Status", "Next action"], 1):
        ws2.cell(3, i, h)
    style_header(ws2, 3, 8)
    ws2["A4"] = "NIL-48211"
    ws2["B4"] = "Helios Fasteners (fictional)"
    ws2["C4"] = "EX-MGR"
    ws2["D4"] = "Plant Cleveland"
    ws2["E4"] = "2026-09-12"
    ws2["F4"] = '=IF(E4="","",TODAY()-E4)'
    ws2["G4"] = "Parked"
    ws2["H4"] = "GR chase pack"
    autosize(ws, {1: 12, 2: 28, 3: 12, 4: 14, 5: 22, 6: 16})
    autosize(ws2, {1: 14, 2: 28, 3: 12, 4: 18, 5: 14, 6: 12, 7: 12, 8: 20})
    wb.save(XLS / "ER_AP_Exception_Tracker.xlsx")


def write_controls() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "CONTROL_MATRIX"
    banner(ws, "Preventive / detective. Human owner required. Payment release is not an agent control — it is a human control.")
    headers = ["Agent", "Risk", "Control", "Type", "Human owner", "Evidence", "Frequency", "Escalation trigger"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 8)
    rows = [
        ("01 Intake", "Wrong extract treated as fact", "Sampled field accuracy before reliance", "Detective", "AP Quality Lead", "Sample sheet", "Weekly", "Accuracy below locked floor"),
        ("03 Matching", "Invented GR", "Match table + no silent GR create", "Preventive", "AP Match Lead", "Match worksheet", "Every proposal", "GR created by agent"),
        ("10 Anomaly", "Flag treated as fraud verdict", "Label: possible pattern — human review", "Preventive", "AP Controls Lead", "Flag log", "Every flag", "Language says 'fraud'"),
        ("12 Payment review", "Agent release", "Hard block on transmit / approve", "Preventive", "Treasury / Payments Lead", "System SoD report", "Every run", "Any agent write on payment"),
        ("08 Supplier", "Draft sent as commitment", "Human send only", "Preventive", "Supplier Desk", "Send log", "Every mail", "Outbound without approval"),
        ("13 Close", "Agent attestation", "Controller signs; agent lists candidates", "Preventive", "Assistant Controller", "Close pack", "Period", "Unsigned close"),
        ("All", "Prompt injection via invoice text", "Untrusted text is data not instruction", "Preventive", "Process Owner", "Prompt/version register", "Release", "Model follows invoice instruction"),
        ("All", "Model change unnoticed", "Version pin + recertification", "Detective", "Transformation Lead", "Change ticket", "Each change", "Unlogged model swap"),
    ]
    for r, row in enumerate(rows, 4):
        for c, v in enumerate(row, 1):
            ws.cell(r, c, v).border = thin()
            ws.cell(r, c).alignment = Alignment(wrap_text=True)
    autosize(ws, {1: 20, 2: 32, 3: 40, 4: 12, 5: 26, 6: 20, 7: 14, 8: 28})
    wb.save(XLS / "ER_AP_Controls_Matrix.xlsx")


def write_roadmap() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "ROADMAP"
    banner(ws, "Illustrative. Actual duration depends on systems, controls, integrations, process complexity, data quality, and governance.")
    headers = ["Phase", "Name", "Intent", "Exit criterion", "Typical elapsed (one bounded agent)", "Status"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 6)
    phases = [
        ("0", "Baseline and readiness", "Sit diagnostic; lock path", "Scores + veto notes exist", "Week 0", "Not started"),
        ("1", "Process discovery", "Walkthrough + transcript", "Map and taxonomy signed", "Week 1", "Not started"),
        ("2", "Agent specification", "Charter Wave 1", "Owner, exclusions, packet defined", "Week 1–2", "Not started"),
        ("3", "Data / tool access", "Read paths only first", "Least-privilege access attested", "Week 2", "Not started"),
        ("4", "Prototype", "Historical cases", "Scripted cases pass or fail visibly", "Week 2–3", "Not started"),
        ("5", "Historical testing", "Sealed hold-out", "Accuracy floors recorded", "Week 3–4", "Not started"),
        ("6", "Shadow mode", "No action permissions", "Shadow report vs human", "Week 4–5", "Not started"),
        ("7", "Controlled execution", "L2 packets, limited scope", "Kill-switch unused or justified", "Week 5–6", "Not started"),
        ("8", "Performance review", "Scorecard", "Promote / hold / demote decision", "Week 6", "Not started"),
        ("9", "Responsibility progression", "Evidence-gated", "Pack complete", "After evidence", "Not started"),
        ("10", "Scale", "Next category / entity", "Same gates, not a skip", "After recert", "Not started"),
    ]
    for r, row in enumerate(phases, 4):
        for c, v in enumerate(row, 1):
            ws.cell(r, c, v).border = thin()
            ws.cell(r, c).alignment = Alignment(wrap_text=True)
    ws["A17"] = "4–6 weeks is an illustration for one well-bounded agent (e.g. Matching on PO-goods). It is not a commitment."
    autosize(ws, {1: 10, 2: 28, 3: 28, 4: 36, 5: 34, 6: 14})
    wb.save(XLS / "ER_AP_Implementation_Roadmap.xlsx")


def write_benefits() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "BENEFITS"
    banner(ws, "Observed benefits only. No row may say 'validated savings' without an attestation reference.")
    headers = ["ID", "Hypothesis", "Measure", "Baseline", "Observed", "Attested? (Y/N)", "Attestation ref", "Notes"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 8)
    ws["A4"] = "B-01"
    ws["B4"] = "Matching proposals reduce edit time"
    ws["C4"] = "Human intervention rate"
    ws["G4"] = ""
    ws["A5"] = "B-02"
    ws["B5"] = "Aged EX-MGR declines"
    ws["C5"] = "Open EX-MGR > 10 days"
    autosize(ws, {1: 8, 2: 40, 3: 28, 4: 14, 5: 14, 6: 16, 7: 18, 8: 28})
    wb.save(XLS / "ER_AP_Benefits_Tracker.xlsx")


def write_maturity() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "DIAGNOSTIC"
    banner(ws, "Score 0–4. Use the lowest fully true score. Do not average the six dimensions into one corporate grade until vetoes are applied.")
    headers = ["ID", "Question", "Dimension", "Score 0-4", "Evidence note", "Veto?"]
    for i, h in enumerate(headers, 1):
        ws.cell(3, i, h)
    style_header(ws, 3, 6)
    questions = [
        ("A1", "Coded exceptions", "Process"),
        ("A2", "Named invoice-to-pay path", "Process"),
        ("A3", "Owner on the clock", "Process"),
        ("A4", "Written match policy", "Process"),
        ("A5", "Payment run as separate steps", "Process"),
        ("A6", "Close checklist", "Process"),
        ("B1", "Invoice source completeness", "Data"),
        ("B2", "Extract quality sampled", "Data"),
        ("B3", "PO / GR / invoice join", "Data"),
        ("B4", "Supplier identity resolvable", "Data"),
        ("B5", "DOA table machine-readable", "Data"),
        ("B6", "Packet reconstructable", "Data"),
        ("C1", "SoD on payment", "Controls"),
        ("C2", "Bank-change control", "Controls"),
        ("C3", "Tolerance change control", "Controls"),
        ("C4", "Override log", "Controls"),
        ("C5", "Retention of evidence", "Controls"),
        ("C6", "Periodic access recert", "Controls"),
        ("T1", "ERP remains system of record", "Technology"),
        ("T2", "Capture / OCR in place", "Technology"),
        ("T3", "Workflow tool in place", "Technology"),
        ("T4", "RPA / iPaaS (0 if absent)", "Technology"),
        ("T5", "Model / tool inventory", "Technology"),
        ("T6", "Least-privilege access path", "Technology"),
        ("P1", "Named process owner", "Talent"),
        ("P2", "Exception desk exists", "Talent"),
        ("P3", "Controls counterpart", "Talent"),
        ("P4", "Transformation counterpart", "Talent"),
        ("P5", "Timeboxed capacity for Wave 1", "Talent"),
        ("P6", "Training habit", "Talent"),
        ("E1", "Volume known", "Economics"),
        ("E2", "Path FTE known", "Economics"),
        ("E3", "Loaded cost known", "Economics"),
        ("E4", "Exception rate measured", "Economics"),
        ("E5", "Tool cost known", "Economics"),
        ("E6", "Early-pay programme (0 if absent)", "Economics"),
    ]
    dv = DataValidation(type="list", formula1='"0,1,2,3,4"', allow_blank=True)
    ws.add_data_validation(dv)
    for r, q in enumerate(questions, 4):
        ws.cell(r, 1, q[0])
        ws.cell(r, 2, q[1])
        ws.cell(r, 3, q[2])
        ws.cell(r, 6, "If A5 is 0–1, cannot place above L2")
        for c in range(1, 7):
            ws.cell(r, c).border = thin()
        dv.add(ws.cell(r, 4))
    ws["A42"] = "Process average"
    ws["B42"] = "=IF(COUNT(D4:D9)=0,\"\",AVERAGE(D4:D9))"
    ws["A43"] = "Data average"
    ws["B43"] = "=IF(COUNT(D10:D15)=0,\"\",AVERAGE(D10:D15))"
    ws["A44"] = "Controls average"
    ws["B44"] = "=IF(COUNT(D16:D21)=0,\"\",AVERAGE(D16:D21))"
    ws["A45"] = "Technology average"
    ws["B45"] = "=IF(COUNT(D22:D27)=0,\"\",AVERAGE(D22:D27))"
    ws["A46"] = "Talent average"
    ws["B46"] = "=IF(COUNT(D28:D33)=0,\"\",AVERAGE(D28:D33))"
    ws["A47"] = "Economics average"
    ws["B47"] = "=IF(COUNT(D34:D39)=0,\"\",AVERAGE(D34:D39))"
    ws["A49"] = "Do not report a single composite grade in a board pack. Report six averages + vetoes."
    autosize(ws, {1: 8, 2: 36, 3: 14, 4: 12, 5: 28, 6: 40})
    wb.save(XLS / "ER_AP_Maturity_Diagnostic.xlsx")


# ---------------------------------------------------------------------------
# Word
# ---------------------------------------------------------------------------

def _doc() -> Document:
    d = Document()
    section = d.sections[0]
    section.top_margin = Inches(0.9)
    section.bottom_margin = Inches(0.9)
    try:
        d.styles["Normal"].font.name = "Calibri"
    except KeyError:
        pass
    return d


def _h(d: Document, text: str) -> None:
    p = d.add_paragraph()
    r = p.add_run(text)
    r.bold = True
    r.font.size = Pt(22)
    r.font.color.rgb = RGBColor(0x12, 0x16, 0x0F)


def write_word() -> None:
    DOC.mkdir(parents=True, exist_ok=True)

    sop = _doc()
    _h(sop, "SOP template — Evidence Room — AP Agent OS")
    sop.add_paragraph("Lockup: EVIDENCE ROOM — AP AGENT OS  ·  Digital toolkit, not software.")
    sop.add_paragraph("This SOP does not authorise payment, vendor-bank change, or close attestation.")
    for label in [
        "1. Object and path (PO-goods / 2-way / non-PO / recurring / intercompany)",
        "2. Purpose — what should I do?",
        "3. Named roles (Accountable / Responsible / Consulted / Informed)",
        "4. Trigger and inputs",
        "5. Steps (human vs agent vs deterministic)",
        "6. Packet that must exist before the next state",
        "7. Exceptions and codes",
        "8. Escalation",
        "9. Controls and SoD",
        "10. Records and retention",
        "11. What can go wrong",
        "12. How we measure it",
    ]:
        sop.add_heading(label, level=2)
        sop.add_paragraph("[Write the working instruction. If this section answers none of: what / how / who / what can go wrong / control / measure / evidence — delete it.]")
    sop.add_heading("Worked example (fictional) — Northline PO-goods matching", level=2)
    sop.add_paragraph("Path: PO-goods, Dynamics 365. Agent 03 proposes a match worksheet. Human Match Lead accepts or rejects. Agent does not create a goods receipt. Payment is a later, human procedure.")
    sop.save(DOC / "ER_SOP_Template.docx")

    ch = _doc()
    _h(ch, "Agent charter")
    for label in [
        "Agent name and ID", "Job description", "Inputs", "Tools / data", "Responsibilities",
        "Explicit exclusions", "Human owner", "Approval requirements", "Escalation",
        "Output standard / packet", "Controls", "Audit evidence", "KPIs",
        "Autonomy (default L0/L1)", "Failure handling", "Cost monitoring",
    ]:
        ch.add_heading(label, level=2)
        ch.add_paragraph("")
    ch.add_paragraph("Payment authorisation is never in scope. Duplicate & Anomaly never issues a fraud verdict.")
    ch.save(DOC / "ER_Agent_Charter.docx")

    for name, title, body in [
        ("ER_Process_Discovery.docx", "Process discovery workbook", "Record walkthroughs, systems, decisions, rules, inputs, outputs, exceptions, controls, dependencies. ERP-agnostic."),
        ("ER_RACI.docx", "RACI — AP agent layer", "One Accountable human per agent. Orchestrator is not Accountable for payment."),
        ("ER_Governance_Standard.docx", "Governance standard (working draft)", "Human accountability, SoD, least privilege, output validation, version control, incident response. Not a certificate. NIST AI RMF and ISO/IEC 42001 are frameworks to consider."),
        ("ER_UAT.docx", "UAT pack", "Scripted cases, expected packet, pass/fail, kill-switch. Shadow is not UAT."),
        ("ER_Risk_Assessment.docx", "Layer risk assessment", "Prompt injection, hallucination, SoD collision, model drift, unofficial permission. Residual risk is a human judgement."),
        ("ER_Meeting_Guide.docx", "Meeting guide", "Walkthrough, challenge, sign-off. Challenger asks 'show me the artefact.'"),
        ("ER_Implementation_Plan.docx", "Implementation plan", "Phases 0–10. 4–6 weeks is an illustration for one bounded agent, not a commitment."),
    ]:
        d = _doc()
        _h(d, title)
        d.add_paragraph(body)
        d.add_paragraph("Brand idea: Proof before permission.")
        d.save(DOC / name)


# ---------------------------------------------------------------------------
# PowerPoint
# ---------------------------------------------------------------------------

def _slide(prs, title: str, bullets: list[str]) -> None:
    layout = prs.slide_layouts[1]
    slide = prs.slides.add_slide(layout)
    slide.shapes.title.text = title
    tf = slide.placeholders[1].text_frame
    tf.clear()
    for i, b in enumerate(bullets):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = b
        p.level = 0


def _title_slide(prs, kicker: str, title: str, sub: str) -> None:
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    slide.shapes.title.text = title
    slide.placeholders[1].text = f"{kicker}\n{sub}"


def write_pptx() -> None:
    PPT.mkdir(parents=True, exist_ok=True)

    cfo = Presentation()
    _title_slide(cfo, "EVIDENCE ROOM — AP AGENT OS", "Proof before permission.", "CFO / Controller briefing · working draft · not a forecast")
    _slide(cfo, "What you are being asked", [
        "Put AI on accounts payable without unofficial permission.",
        "Keep ERP as the accounting system of record.",
        "Keep named humans as the cash system of record.",
        "Do not buy another platform to start.",
    ])
    _slide(cfo, "What this is", [
        "A Finance Agent Operating System — method and toolkit.",
        "Sixteen named agents, a packet standard, a permission ladder.",
        "Not an ERP. Not a payment product. Not a prompt pack.",
        "Not a guarantee of savings, fraud detection, or compliance.",
    ])
    _slide(cfo, "The payment sentence", [
        "Agents may observe, recommend, or prepare.",
        "They do not approve, release, or transmit payment.",
        "Vendor bank changes stay human.",
        "Period-close attestation stays human.",
    ])
    _slide(cfo, "Public record (independent)", [
        "McKinsey State of AI 2025 (n=1,993): 88% use AI in ≥1 function.",
        "Nearly two-thirds have not begun scaling across the enterprise.",
        "62% at least experiment with agents; 23% scale an agent somewhere.",
        "High performers redesign workflows. That is the work.",
    ])
    _slide(cfo, "Ask", [
        "Sit the free diagnostic (36 questions).",
        "Charter Wave 1 with owners and exclusions.",
        "Licence Professional ($199) or Team ($499) if the room agrees.",
        "Counsel reviews licence, privacy, and trademark collision notes before public launch.",
    ])
    cfo.save(PPT / "ER_CFO_AP_Transformation.pptx")

    ws = Presentation()
    _title_slide(ws, "TEAM EDITION", "AP Agent OS workshop", "One day. One path. No unofficial permission.")
    _slide(ws, "Morning", [
        "09:00 Diagnostic challenge — show the artefact.",
        "10:15 Map the path (PO-goods first).",
        "11:15 Exception codes — closed list.",
        "12:00 Payment sentence on the wall.",
    ])
    _slide(ws, "Afternoon", [
        "13:00 Charter two agents (Matching + Triage).",
        "14:15 Controls and SoD.",
        "15:15 Shadow and UAT design.",
        "16:00 Steering decision: commission / wait / refuse the frame.",
    ])
    ws.save(PPT / "ER_Workshop_Deck.pptx")

    st = Presentation()
    _title_slide(st, "STEERING", "Agent layer — decision pack", "Promote / hold / demote. Not a celebration slide.")
    _slide(st, "Required pack", [
        "Scorecard with locked formulas.",
        "Exception ageing by code.",
        "Autonomy register.",
        "Incidents and overrides.",
        "Cost of inference vs correct outcomes.",
        "A written recommend / hold / demote.",
    ])
    st.save(PPT / "ER_Steering_Committee.pptx")

    bc = Presentation()
    _title_slide(bc, "BUSINESS CASE", "Arithmetic on your inputs", "Not a forecast. Duplicate-suspect savings = 0.")
    _slide(bc, "How to use the workbook", [
        "Enter volume, FTE, loaded cost, touch and exception times.",
        "Leave unknowns blank.",
        "Read Conservative / Base / Upside as envelopes.",
        "Do not paste vendor $2.78 as a target.",
        "Validated savings require a Finance attestation method.",
    ])
    bc.save(PPT / "ER_Business_Case_Deck.pptx")


# ---------------------------------------------------------------------------
# Website inner pages + PDFs
# ---------------------------------------------------------------------------

NAV = """
  <header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="index.html"><span class="mark"></span>EVIDENCE ROOM — AP AGENT OS</a>
    <nav class="nav">
      <a href="index.html">Home</a>
      <a href="ap-agent-os.html">AP Agent OS</a>
      <a href="method.html">Method</a>
      <a href="diagnostic.html">Diagnostic</a>
      <a href="professional.html">Professional</a>
      <a href="team.html">Team</a>
      <a href="about.html">About</a>
    </nav>
    <div class="header-cta"><a class="btn" href="diagnostic.html">Assess readiness</a></div>
  </div></header>
"""

FOOT = """
  <footer class="site-footer"><div class="wrap footer-grid">
    <div><p class="brand"><span class="mark"></span>EVIDENCE ROOM — AP AGENT OS</p>
    <p>Design the layer. Keep the stack.</p>
    <p>Not Evidence Room LLC (forensic animation). Not an ERP. Not a payment institution.</p></div>
    <div class="footer-links">
      <a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>
      <a href="disclaimer.html">Disclaimer</a><a href="custom-blueprint.html">Custom Blueprint</a>
      <a href="resources.html">Resources</a><a href="starter.html">Starter · $79</a>
    </div>
    <div><p>hello@evidenceroom.ai</p><p>evidenceroom.ai</p>
    <p>Working drafts. Counsel must confirm legal pages before publish.</p></div>
  </div></footer>
"""


def page(title: str, desc: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{title}</title>
<meta name="description" content="{desc}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="styles.css"/>
<link rel="icon" href="favicon.svg" type="image/svg+xml"/>
</head><body>
{NAV}
<main>{body}</main>
{FOOT}
</body></html>
"""


def write_site_pages() -> None:
    SITE.mkdir(parents=True, exist_ok=True)
    pages = {
        "ap-agent-os.html": (
            "AP Agent OS | Sixteen agents. One payment boundary.",
            "A licensed sixteen-agent architecture, evidence standard, and permission ladder for Accounts Payable.",
            """
            <section class="page-hero wrap">
              <p class="eyebrow">Product</p>
              <h1>The operating system for the AP agent layer</h1>
              <p class="lede">Specify, charter, govern, and scale AI agents across invoice-to-pay without pretending the ERP was built for that job. File-based toolkit. Not a hosted bot.</p>
            </section>
            <section class="wrap prose">
              <p>Sixteen named roles. Five autonomy levels. One payment boundary. ERP remains the system of record for accounting. Named humans remain the system of record for cash.</p>
              <h2>In the library</h2>
              <p>Stack overview, sixteen working specifications, charter template, human-vs-agent framework, autonomy progression with demotion, exception atlas, KPI language that refuses ROI theatre, testing and shadow method, business-case workbook.</p>
              <p class="note">Default autonomy is L0 or L1. No agent is commissioned at L3 or L4. Payment-related work has a hard ceiling: recommend and prepare only.</p>
              <p><a class="btn" href="professional.html">Professional · $199</a></p>
            </section>
            """,
        ),
        "method.html": (
            "Method | Proof before permission",
            "Observe, structure, agentise, shadow, measure, then expand responsibility.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Method</p>
            <h1>Proof before permission.</h1>
            <p class="lede">Ten steps. Responsibility is earned. Duration depends on systems, controls, data, and governance.</p></section>
            <section class="wrap"><div class="table-wrap"><table>
            <tr><th>Step</th><th>Name</th><th>Exit</th></tr>
            <tr><td>1</td><td>Observe</td><td>Walkthrough recorded</td></tr>
            <tr><td>2</td><td>Transcribe</td><td>Transcript exists</td></tr>
            <tr><td>3</td><td>Extract</td><td>Steps, rules, exceptions listed</td></tr>
            <tr><td>4</td><td>Structure</td><td>Map, tree, RACI, SOP</td></tr>
            <tr><td>5</td><td>Agentise</td><td>Human / recommend / prepare / execute / deterministic</td></tr>
            <tr><td>6</td><td>Test</td><td>Historical cases scored</td></tr>
            <tr><td>7</td><td>Shadow</td><td>No action permissions</td></tr>
            <tr><td>8</td><td>Controlled pilot</td><td>Limited scope + kill-switch</td></tr>
            <tr><td>9</td><td>Measure</td><td>Vs locked baseline</td></tr>
            <tr><td>10</td><td>Expand responsibility</td><td>Evidence pack only</td></tr>
            </table></div>
            <p class="quiet" style="margin-top:24px">A 4–6 week illustration for one well-bounded agent is not a commitment.</p>
            </section>
            """,
        ),
        "professional.html": (
            "Professional · $199 | AP Agent OS",
            "Full operating system for one named practitioner.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Tier 2</p>
            <h1>Professional · $199</h1>
            <p class="lede">The default paid SKU. One named practitioner. Full sixteen-agent OS, governance, KPI, testing, and business-case model.</p>
            <a class="btn" href="diagnostic.html">Assess first</a>
            </section>
            <section class="wrap prose">
            <p>Would a Finance Director responsible for 15,000 invoices a month pay $199 of their own money to avoid days of unstructured research and leave with a framework they can defend? That is the commercial test.</p>
            <p>Starter ($79) is a working subset. Team ($499) adds the workshop. Custom Blueprint ($1,500–$3,000) is a productised assessment, not software.</p>
            </section>
            """,
        ),
        "team.html": (
            "Team · $499 | Workshop edition",
            "Everything in Professional plus a facilitation pack for a real transformation room.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Tier 3</p>
            <h1>Team · $499</h1>
            <p class="lede">Internal team licence and a one-day workshop a transformation lead can run tomorrow.</p></section>
            <section class="wrap prose">
            <p>Agenda, interview guides, exercises, steering templates, change toolkit, benefits tracker. Suitable for a shared-services AP AI session. Not a promise that the session will fund itself.</p>
            </section>
            """,
        ),
        "starter.html": (
            "Starter · $79 | AP Agent Starter Kit",
            "Operating model, top ten blueprints, taxonomy starter, checklists.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Tier 1</p>
            <h1>Starter · $79</h1>
            <p class="lede">A working subset: operating model, ten agent blueprints, exception starter list, KPI scorecard, governance checklist, implementation ticks.</p></section>
            """,
        ),
        "custom-blueprint.html": (
            "Custom Blueprint | $1,500–$3,000",
            "Productised assessment. Structured intake. Repeatable fulfilment.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Tier 4</p>
            <h1>Custom Blueprint</h1>
            <p class="lede">You provide structured information. Evidence Room returns a current-state assessment, opportunity map, recommended architecture, controls framing, and a 90-day plan. Application required.</p></section>
            <section class="wrap prose">
            <p>Repeatable and AI-assisted on our side. Production invoices do not enter our tools. Not a software implementation. Not a guarantee of savings.</p>
            </section>
            """,
        ),
        "about.html": (
            "About | Evidence Room",
            "Who we are and who we are not.",
            """
            <section class="page-hero wrap"><p class="eyebrow">About</p>
            <h1>A room for evidence, not a theatre for demos.</h1>
            <p class="lede">Evidence Room publishes operating systems for Finance agents. AP is the first domain.</p></section>
            <section class="wrap prose">
            <p>We are not Evidence Room LLC, the forensic-animation studio at evidence-room.net. Distinctive lockup: EVIDENCE ROOM — AP AGENT OS. Domain: evidenceroom.ai. Trademark clearance is a professional item before public launch.</p>
            <p>We do not run your ERP. We do not take payment authority. We do not certify compliance.</p>
            </section>
            """,
        ),
        "resources.html": (
            "Resources | Evidence Room",
            "Articles, charts, and diagnostic posts — no hype PDFs.",
            """
            <section class="page-hero wrap"><p class="eyebrow">Resources</p>
            <h1>Useful first. Commercial second.</h1>
            <p class="lede">About 80% insight, 20% conversion. See the 90-day calendar in the suite.</p></section>
            """,
        ),
        "privacy.html": (
            "Privacy | Draft",
            "Draft privacy notice. Not legal advice.",
            """
            <section class="page-hero wrap"><h1>Privacy (draft)</h1>
            <div class="prose"><p>This notice is a working draft for counsel. The free diagnostic does not require invoice upload. Email captured for delivery is used to send the diagnostic and the stated sequence. We do not sell lists. Lemon Squeezy acts as merchant of record for paid checkouts — their processing terms also apply. Confirm with qualified counsel before publish.</p></div></section>
            """,
        ),
        "terms.html": (
            "Terms | Draft",
            "Draft terms of sale and site use.",
            """
            <section class="page-hero wrap"><h1>Terms (draft)</h1>
            <div class="prose"><p>Digital toolkit licence: Individual / Professional / Team as stated at checkout. No resale, redistribution, sublicensing, or publishing the files as your own product. Not a transfer of copyright. Not legal advice. Counsel must finalise before publish.</p></div></section>
            """,
        ),
        "disclaimer.html": (
            "Disclaimer | Draft",
            "Limitation of claims.",
            """
            <section class="page-hero wrap"><h1>Disclaimer (draft)</h1>
            <div class="prose">
            <p>Evidence Room does not guarantee savings, ROI, fraud detection, regulatory compliance, accounting accuracy, or autonomous payment safety. Business-case outputs are arithmetic on your inputs. Agents do not authorise payment. This is not professional accounting, legal, or tax advice.</p>
            </div></section>
            """,
        ),
    }
    for name, (title, desc, body) in pages.items():
        (SITE / name).write_text(page(title, desc, body), encoding="utf-8")


def write_diagnostic_page() -> None:
    questions = [
        ("A1", "Process", "Coded exceptions from a closed list?"),
        ("A2", "Process", "Written path for PO 3-way, 2-way, non-PO, recurring, intercompany?"),
        ("A3", "Process", "Every open exception has a named owner and ageing start?"),
        ("A4", "Process", "Match policy a new specialist can apply without a neighbour?"),
        ("A5", "Process", "Payment build / review / authorise / transmit are separate named steps?"),
        ("A6", "Process", "Close checklist with accrual candidates and attestation?"),
        ("B1", "Data", "Last month’s invoice sources measured (PDF, XML, portal, paper)?"),
        ("B2", "Data", "Extract accuracy sampled against a gold label?"),
        ("B3", "Data", "PO, GR, and invoice can be joined without heroics?"),
        ("B4", "Data", "Supplier identity resolvable to one account?"),
        ("B5", "Data", "DOA table is machine-readable?"),
        ("B6", "Data", "A packet can be reconstructed 90 days later?"),
        ("C1", "Controls", "Two humans on payment release?"),
        ("C2", "Controls", "Vendor bank-change control exists?"),
        ("C3", "Controls", "Tolerance changes are change-controlled?"),
        ("C4", "Controls", "Overrides are logged?"),
        ("C5", "Controls", "Evidence retention is defined?"),
        ("C6", "Controls", "Access is periodically recertified?"),
        ("T1", "Technology", "ERP remains system of record for accounting?"),
        ("T2", "Technology", "Capture / OCR exists?"),
        ("T3", "Technology", "Workflow tool exists?"),
        ("T4", "Technology", "RPA / iPaaS exists? (0 if absent)"),
        ("T5", "Technology", "Model / tool inventory exists?"),
        ("T6", "Technology", "Least-privilege path for any agent tooling?"),
        ("P1", "Talent", "Named process owner?"),
        ("P2", "Talent", "Exception desk exists?"),
        ("P3", "Talent", "Controls counterpart exists?"),
        ("P4", "Talent", "Transformation counterpart exists?"),
        ("P5", "Talent", "Timeboxed capacity for Wave 1?"),
        ("P6", "Talent", "Training habit exists?"),
        ("E1", "Economics", "Volume known from a system, not a guess?"),
        ("E2", "Economics", "Path FTE known?"),
        ("E3", "Economics", "Loaded cost known?"),
        ("E4", "Economics", "Exception rate measured?"),
        ("E5", "Economics", "Tool cost known?"),
        ("E6", "Economics", "Early-pay programme? (0 if absent)"),
    ]
    blocks = []
    for qid, dim, text in questions:
        radios = "".join(
            f'<label><input type="radio" name="{qid}" value="{i}" />{i}</label>'
            for i in range(5)
        )
        blocks.append(
            f'<div class="diag-q" data-dim="{dim}"><h4>{qid} · {dim}</h4><p>{text}</p>'
            f'<div class="scores">{radios}</div></div>'
        )
    html = page(
        "AP Agent Readiness Diagnostic | Free",
        "36 questions. Six dimensions. No invoice upload.",
        f"""
        <section class="page-hero wrap">
          <p class="eyebrow">Tier 0 · Free</p>
          <h1>Assess your AP agent readiness</h1>
          <p class="lede">Thirty-six questions. Score 0–4 with the lowest fully true number. Do not upload invoices. A5 at 0 or 1 vetoes placement above maturity L2.</p>
        </section>
        <section class="wrap">
          <form id="diag">{''.join(blocks)}
            <p><button class="btn" type="button" id="scoreBtn">Score locally</button></p>
          </form>
          <div class="results" id="results"></div>
          <p class="quiet">Scores never leave this browser in this static demo. Production capture would be email-only, no invoice files.</p>
        </section>
        <script>
        const dims = {{Process:['A1','A2','A3','A4','A5','A6'], Data:['B1','B2','B3','B4','B5','B6'], Controls:['C1','C2','C3','C4','C5','C6'], Technology:['T1','T2','T3','T4','T5','T6'], Talent:['P1','P2','P3','P4','P5','P6'], Economics:['E1','E2','E3','E4','E5','E6']}};
        document.getElementById('scoreBtn').onclick = () => {{
          const avg = {{}}, miss = [];
          let html = '<h2>Dimension averages</h2><p class="quiet">Not a certificate. Not a composite grade.</p>';
          let a5 = null;
          for (const [dim, ids] of Object.entries(dims)) {{
            const vals = ids.map(id => {{
              const el = document.querySelector('input[name="'+id+'"]:checked');
              if (!el) {{ miss.push(id); return null; }}
              if (id==='A5') a5 = Number(el.value);
              return Number(el.value);
            }}).filter(v => v!==null);
            const a = vals.length ? vals.reduce((x,y)=>x+y,0)/vals.length : null;
            avg[dim] = a;
            const pct = a===null ? 0 : (a/4)*100;
            html += '<p><strong>'+dim+'</strong> '+(a===null?'unscored':a.toFixed(2))+'</p><div class="bar"><span style="width:'+pct+'%"></span></div>';
          }}
          if (a5 !== null && a5 <= 1) html += '<p class="note">Veto: A5 is 0 or 1. Do not place maturity above L2 until the payment procedure is written.</p>';
          if (miss.length) html += '<p class="quiet">Unscored: '+miss.join(', ')+'</p>';
          html += '<p>Next: read Method, then charter Wave 1. Do not paste vendor cost-per-invoice figures as targets.</p>';
          const box = document.getElementById('results');
          box.style.display = 'block';
          box.innerHTML = html;
        }};
        </script>
        """,
    )
    (SITE / "diagnostic.html").write_text(html, encoding="utf-8")


def write_pdf_html() -> Path:
    PDF.mkdir(parents=True, exist_ok=True)
    html = """<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  body { font-family: "IBM Plex Sans", Helvetica, Arial, sans-serif; color: #12160F; background: #F3EEE4; }
  h1 { font-family: Georgia, serif; font-size: 32px; margin: 0 0 8px; }
  h2 { font-family: Georgia, serif; font-size: 18px; margin: 22px 0 8px; }
  .k { letter-spacing: .16em; font-size: 11px; text-transform: uppercase; color: #8C6B2C; }
  .rule { border-top: 1px solid #B0893E; margin: 12px 0 20px; }
  p { font-size: 12px; line-height: 1.5; }
  li { font-size: 12px; margin: 4px 0; }
  .box { border: 1px solid #D6CFC0; padding: 12px; background: #FAF8F3; }
</style></head><body>
<p class="k">Evidence Room — AP Agent OS · v1.0.0 · 20 September 2026</p>
<h1>Proof before permission.</h1>
<div class="rule"></div>
<p>The operating system for building, governing, and scaling AI agents across Accounts Payable. A licensed digital method and toolkit. It does not replace the AP stack. Payment authorisation remains human.</p>
<h2>What a purchaser receives</h2>
<ul>
<li>Free diagnostic — 36 questions, six dimensions, veto rules.</li>
<li>Starter — $79 — operating model and ten blueprints.</li>
<li>Professional — $199 — sixteen-agent OS, governance, KPI, testing, business case.</li>
<li>Team — $499 — workshop and enterprise facilitation.</li>
<li>Custom Blueprint — $1,500–$3,000 — productised assessment.</li>
</ul>
<h2>What this is not</h2>
<p>Not a ChatGPT prompt pack. Not an ERP. Not a payment institution. Not a fraud-detection guarantee. Not a compliance certificate. Not a promise of savings or ROI.</p>
<h2>Permission ladder</h2>
<p>L0 Observe · L1 Recommend · L2 Prepare · L3 Execute within guardrails · L4 Managed autonomy. Default L0/L1. Responsibility is earned.</p>
<div class="box"><p><strong>Hard hold.</strong> ERP is the system of record for accounting. Named humans are the system of record for cash. Vendor bank changes and close attestation stay human.</p></div>
<h2>Evidence</h2>
<p>Customer-facing statistics are limited to the research ledger. McKinsey State of AI 2025 (n=1,993): 88% regular AI use; nearly two-thirds not scaling; 62% experimenting with agents; 23% scaling an agentic system somewhere. Ardent cost-per-invoice figures appear only as vendor-citing-independent citations and are not used as targets.</p>
<p class="k">evidenceroom.ai · Design the layer. Keep the stack.</p>
</body></html>
"""
    src = PDF / "ER_Product_Overview.html"
    src.write_text(html, encoding="utf-8")
    return src


def html_to_pdf(src: Path, dest: Path) -> None:
    chrome = Path("/usr/local/bin/google-chrome")
    cmd = [
        str(chrome),
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={dest}",
        src.resolve().as_uri(),
    ]
    subprocess.run(cmd, check=True, capture_output=True, timeout=60)


def write_brand_svg() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    (BRAND / "wordmark.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" width="720" height="120" viewBox="0 0 720 120">
<rect width="720" height="120" fill="#F3EEE4"/>
<rect x="24" y="36" width="36" height="36" fill="none" stroke="#B0893E" stroke-width="2"/>
<rect x="32" y="44" width="20" height="20" fill="none" stroke="#12160F" stroke-width="1.2"/>
<text x="76" y="52" font-family="Georgia, serif" font-size="18" letter-spacing="4" fill="#12160F">EVIDENCE ROOM</text>
<text x="76" y="76" font-family="Arial, sans-serif" font-size="11" letter-spacing="3" fill="#8C6B2C">AP AGENT OS  ·  PROOF BEFORE PERMISSION</text>
</svg>""",
        encoding="utf-8",
    )
    (BRAND / "DESIGN_TOKENS.md").write_text(
        """# Design tokens — Evidence Room

- Ink `#12160F`
- Paper `#F3EEE4`
- Gilt `#B0893E`
- Slate `#5A6154`
- Rule `#D6CFC0`
- Forest `#2F4F3A`
- Brick `#8A3B32`
- Display: Fraunces
- UI: IBM Plex Sans
- Mono: IBM Plex Mono

No robots, neon brains, circuit boards, or purple gradients.
Institutional investment-research tone. Cover system: ivory field, gilt rule, framed mark, small-caps lockup.
""",
        encoding="utf-8",
    )


def main() -> None:
    write_roi()
    write_scorecard()
    write_registry()
    write_exception_tracker()
    write_controls()
    write_roadmap()
    write_benefits()
    write_maturity()
    write_word()
    write_pptx()
    write_site_pages()
    write_diagnostic_page()
    write_brand_svg()
    src = write_pdf_html()
    dest = PDF / "ER_Product_Overview.pdf"
    try:
        html_to_pdf(src, dest)
    except Exception as exc:  # noqa: BLE001
        print("PDF via Chrome failed:", exc)
        try:
            subprocess.run(
                ["python3", "-m", "weasyprint", str(src), str(dest)],
                check=True,
                timeout=60,
            )
        except Exception as exc2:  # noqa: BLE001
            print("PDF via WeasyPrint failed:", exc2)
    # extra PDFs from key site pages
    for page_name, pdf_name in [
        ("index.html", "ER_Landing_Page.pdf"),
        ("diagnostic.html", "ER_Diagnostic_Page.pdf"),
    ]:
        try:
            html_to_pdf(SITE / page_name, PDF / pdf_name)
        except Exception as exc:  # noqa: BLE001
            print("page pdf failed", page_name, exc)
    print("Artifacts written.")


if __name__ == "__main__":
    main()
