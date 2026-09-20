#!/usr/bin/env python3
"""Generate Evidence Room Excel workbooks with working formulas."""

from __future__ import annotations

from pathlib import Path

from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.chart.label import DataLabelList

ROOT = Path(__file__).resolve().parents[1]

INK = "14171C"
FOREST = "1E5C45"
PAPER = "F3EFE6"
CREAM = "FAF7F0"
RULE = "B8A888"
RUST = "8C3A2F"
WHITE = "FFFCF7"
SLATE = "5C6370"

thin = Border(
    left=Side(style="thin", color="D4CBB8"),
    right=Side(style="thin", color="D4CBB8"),
    top=Side(style="thin", color="D4CBB8"),
    bottom=Side(style="thin", color="D4CBB8"),
)


def fill(hex_color: str) -> PatternFill:
    return PatternFill("solid", fgColor=hex_color)


def font(name="Calibri", size=11, bold=False, color=INK, italic=False) -> Font:
    return Font(name=name, size=size, bold=bold, color=color, italic=italic)


def style_header(ws, row: int, cols: int) -> None:
    for col in range(1, cols + 1):
        cell = ws.cell(row, col)
        cell.fill = fill(INK)
        cell.font = font(size=10, bold=True, color=WHITE)
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = thin
    ws.row_dimensions[row].height = 28


def style_title(ws, title: str, subtitle: str, cols: int = 8) -> None:
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=cols)
    ws["A1"] = title
    ws["A1"].font = font(size=18, bold=True)
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=cols)
    ws["A2"] = subtitle
    ws["A2"].font = font(size=10, italic=True, color=SLATE)
    ws.row_dimensions[1].height = 24


def autosize(ws, widths: dict[int, int]) -> None:
    for col, width in widths.items():
        ws.column_dimensions[get_column_letter(col)].width = width


def disclaimer(ws, row: int, cols: int, text: str) -> None:
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=cols)
    ws.cell(row, 1, text)
    ws.cell(row, 1).font = font(size=9, italic=True, color=SLATE)
    ws.cell(row, 1).alignment = Alignment(wrap_text=True)
    ws.row_dimensions[row].height = 36


def roi_workbook() -> Workbook:
    wb = Workbook()

    inputs = wb.active
    inputs.title = "Inputs"
    style_title(inputs, "Evidence Room · AP Agent Business Case", "Customer baseline only. Scenarios are model outputs, not promises. Version 1.0 · Sep 2026")
    headers = ["Parameter", "Unit", "Conservative", "Base", "Upside", "Notes"]
    for i, h in enumerate(headers, 1):
        inputs.cell(4, i, h)
    style_header(inputs, 4, 6)

    rows = [
        ("Monthly invoice volume", "invoices", 15000, 18000, 22000, "Northline illustrative default in Base"),
        ("AP FTE (payables processing)", "FTE", 14, 14, 12, "Shared-services headcount touching invoices"),
        ("Fully loaded cost per FTE", "USD / year", 85000, 95000, 105000, "Salary + burden; customer actuals"),
        ("Manual-touch rate", "% invoices", 0.72, 0.62, 0.48, "Share requiring a human touch today"),
        ("Exception rate", "% invoices", 0.24, 0.20, 0.14, "Ardent 2024 BIC reported 9%; do not import as your target"),
        ("Avg resolution minutes", "minutes", 28, 22, 16, "Clock time per exception, not elapsed days"),
        ("Known duplicate rate", "% invoices", 0.004, 0.003, 0.002, "Confirmed duplicates; not a fraud rate"),
        ("Avg invoice value (for sensitivity only)", "USD", 1800, 2200, 2600, "Used only if you model cash leakage"),
        ("Late-payment cost / month", "USD", 8000, 5000, 2000, "Fees + lost discount + supplier friction estimate"),
        ("Early-pay discount opportunity / month", "USD", 4000, 7000, 12000, "Uncaptured discounts — customer AP data"),
        ("Current processing cost / invoice", "USD", 12.5, 9.8, 7.4, "YOUR cost. Do not paste vendor-blog $15/$3"),
        ("AI / tool run-rate / month", "USD", 4500, 6500, 9000, "Models + orchestration + licences"),
        ("Implementation cost (one-off)", "USD", 45000, 75000, 120000, "Internal + external; year 1"),
        ("Expected touch reduction (of manual-touch)", "%", 0.12, 0.22, 0.35, "ILLUSTRATIVE range — replace with measured"),
        ("Expected exception reduction", "%", 0.08, 0.15, 0.25, "ILLUSTRATIVE — root-cause dependent"),
        ("Hours-to-cash conversion", "%", 0.25, 0.40, 0.60, "Share of released hours that become cash (attrition/redeploy)"),
        ("Discount capture improvement", "% of opportunity", 0.10, 0.25, 0.40, "Only if process actually changes payment timing"),
        ("Model years", "years", 3, 3, 3, "Horizon for ROI/payback"),
    ]
    for r, row in enumerate(rows, 5):
        for c, val in enumerate(row, 1):
            cell = inputs.cell(r, c, val)
            cell.border = thin
            cell.alignment = Alignment(wrap_text=True, vertical="center")
            if c in (3, 4, 5) and r >= 8 and r <= 10:
                cell.number_format = "0.0%"
            elif c in (3, 4, 5) and r in (18, 19, 20):
                cell.number_format = "0.0%"
            elif c in (3, 4, 5) and r == 11:
                cell.number_format = "0.00%"
            elif c in (3, 4, 5) and r in (7, 12, 13, 14, 15, 16):
                cell.number_format = "#,##0"
            elif c in (3, 4, 5) and r in (17,):
                cell.number_format = "0"
        inputs.row_dimensions[r].height = 32

    # percent formats for rates
    for r in (8, 9, 18, 19, 20):
        for c in (3, 4, 5):
            inputs.cell(r, c).number_format = "0.0%"
    inputs.cell(11, 3).number_format = "0.00%"
    inputs.cell(11, 4).number_format = "0.00%"
    inputs.cell(11, 5).number_format = "0.00%"

    disclaimer(
        inputs,
        24,
        6,
        "ILLUSTRATIVE model. Evidence Room does not promise savings, ROI, payback, or discount capture. "
        "Replace every yellow-adjacent input with the customer's measured baseline. Absolute $ cost-per-invoice figures circulating in vendor blogs ($10–$15 vs $2–$3) are not independent facts. "
        "Ardent Partners 2024 Best-in-Class reported 78% lower cost, 82% faster cycle, 59% lower exceptions vs peers, and a 9% BIC exception rate — context, not a forecast.",
    )
    autosize(inputs, {1: 42, 2: 18, 3: 16, 4: 14, 5: 14, 6: 52})

    model = wb.create_sheet("Model")
    style_title(model, "Calculated outcomes", "Formulas read Inputs! Conservative / Base / Upside. Hours are not cash until Hours-to-cash conversion.")
    model["A4"] = "Metric"
    model["B4"] = "Conservative"
    model["C4"] = "Base"
    model["D4"] = "Upside"
    style_header(model, 4, 4)

    metrics = [
        ("Annual invoices", "=Inputs!C5*12", "=Inputs!D5*12", "=Inputs!E5*12"),
        ("Annual labour cost", "=Inputs!C6*Inputs!C7", "=Inputs!D6*Inputs!D7", "=Inputs!E6*Inputs!E7"),
        ("Baseline processing cost / year", "=B5*Inputs!C15", "=C5*Inputs!D15", "=D5*Inputs!E15"),
        ("Manual-touch invoices / year", "=B5*Inputs!C8", "=C5*Inputs!D8", "=D5*Inputs!E8"),
        ("Exceptions / year", "=B5*Inputs!C9", "=C5*Inputs!D9", "=D5*Inputs!E9"),
        ("Exception hours / year", "=B9*Inputs!C10/60", "=C9*Inputs!D10/60", "=D9*Inputs!E10/60"),
        ("Gross hours released / year", "=B10*Inputs!C18 + (B8*0.08*Inputs!C18)", "=C10*Inputs!D18 + (C8*0.08*Inputs!D18)", "=D10*Inputs!E18 + (D8*0.08*Inputs!E18)"),
        ("Cash-converted labour / year", "=B11*(Inputs!C7/1800)*Inputs!C20", "=C11*(Inputs!D7/1800)*Inputs!D20", "=D11*(Inputs!E7/1800)*Inputs!E20"),
        ("Processing cost change / year", "=B7*Inputs!C18", "=C7*Inputs!D18", "=D7*Inputs!E18"),
        ("Exception cost change / year", "=B10*(Inputs!C7/1800)*Inputs!C19", "=C10*(Inputs!D7/1800)*Inputs!D19", "=D10*(Inputs!E7/1800)*Inputs!E19"),
        ("Late-cost reduction / year", "=Inputs!C13*12*Inputs!C18", "=Inputs!D13*12*Inputs!D18", "=Inputs!E13*12*Inputs!E18"),
        ("Discount capture / year", "=Inputs!C14*12*Inputs!C21", "=Inputs!D14*12*Inputs!D21", "=Inputs!E14*12*Inputs!E21"),
        ("AI + tool cost / year", "=Inputs!C16*12", "=Inputs!D16*12", "=Inputs!E16*12"),
        ("Gross annual benefit (pre-tool)", "=B12+B13+B14+B15+B16", "=C12+C13+C14+C15+C16", "=D12+D13+D14+D15+D16"),
        ("Net annual benefit", "=B18-B17", "=C18-C17", "=D18-D17"),
        ("Implementation cost", "=Inputs!C17", "=Inputs!D17", "=Inputs!E17"),
        ("Payback (months)", '=IF(B19<=0,"No payback in model",B20/(B19/12))', '=IF(C19<=0,"No payback in model",C20/(C19/12))', '=IF(D19<=0,"No payback in model",D20/(D19/12))'),
        ("3-year net (undiscounted)", "=B19*Inputs!C22-B20", "=C19*Inputs!D22-C20", "=D19*Inputs!E22-D20"),
        ("ROI (3-year, undiscounted)", '=IF(B20=0,"n/a",B22/B20)', '=IF(C20=0,"n/a",C22/C20)', '=IF(D20=0,"n/a",D22/D20)'),
    ]
    for r, (name, c, b, u) in enumerate(metrics, 5):
        model.cell(r, 1, name).border = thin
        model.cell(r, 2, c).border = thin
        model.cell(r, 3, b).border = thin
        model.cell(r, 4, u).border = thin
        for col in (2, 3, 4):
            cell = model.cell(r, col)
            if r == 21:
                cell.number_format = "0.0"
            elif r == 23:
                cell.number_format = "0.0%"
            elif r == 5:
                cell.number_format = "#,##0"
            else:
                cell.number_format = "#,##0"

    disclaimer(model, 26, 4, "If Net annual benefit is negative, say so. Do not force a payback story. Conservative is the steering case until measured results exist.")
    autosize(model, {1: 38, 2: 22, 3: 22, 4: 22})

    chart = BarChart()
    chart.type = "col"
    chart.title = "Net annual benefit by scenario (illustrative)"
    chart.y_axis.title = "USD"
    data = Reference(model, min_col=2, min_row=4, max_col=4, max_row=4)
    # Use a dedicated mini table for the chart
    model["A28"] = "Scenario"
    model["B28"] = "Net annual benefit"
    model["A29"] = "Conservative"
    model["B29"] = "=B19"
    model["A30"] = "Base"
    model["B30"] = "=C19"
    model["A31"] = "Upside"
    model["B31"] = "=D19"
    for r in range(28, 32):
        for c in range(1, 3):
            model.cell(r, c).border = thin
    model["B29"].number_format = "#,##0"
    model["B30"].number_format = "#,##0"
    model["B31"].number_format = "#,##0"
    data = Reference(model, min_col=2, min_row=28, max_col=2, max_row=31)
    cats = Reference(model, min_col=1, min_row=29, max_row=31)
    chart.add_data(data, titles_from_data=True)
    chart.set_categories(cats)
    chart.shape = 4
    chart.dLbls = DataLabelList()
    model.add_chart(chart, "F4")

    notes = wb.create_sheet("How to use")
    style_title(notes, "How to brief a CFO with this model", "Four families: do not present financials without operational and control evidence.")
    notes["A4"] = (
        "1. Replace Inputs with a measured month (volume, FTE, loaded cost, exception rate, minutes).\n"
        "2. Leave scenario spreads wide. False precision is a credibility failure.\n"
        "3. Hours released ≠ savings. Apply Hours-to-cash conversion or report capacity only.\n"
        "4. Put control breaches and rework next to any efficiency claim (see KPI workbook).\n"
        "5. Payment authorisation remains human. Do not model 'straight-through pay' as a default.\n"
        "6. Cite Ardent 2024 only as industry context, never as 'you will achieve'.\n"
        "7. If Base does not pay back, the honest answer is: do not scale spend; run one bounded agent."
    )
    notes["A4"].alignment = Alignment(wrap_text=True, vertical="top")
    notes.merge_cells("A4:F16")
    notes.row_dimensions[4].height = 140
    autosize(notes, {1: 20})
    return wb


def kpi_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Scorecard"
    style_title(ws, "Evidence Room · Agent KPI Scorecard", "Activity / Operational / Financial / Risk-control. No blended 'AI score'.")
    headers = [
        "ID", "Family", "Metric", "Definition / formula", "Baseline", "Period", "Delta",
        "Owner", "Evidence", "Red flag",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 10)

    kpis = [
        ("A1", "Activity", "Invoices handled", "Count of invoices the agent touched in population t", 18000, 18000, "AP Intake", "Work-object log", "Volume without quality"),
        ("A2", "Activity", "Exceptions handled", "Count of coded exceptions closed or aged in t", 3600, 3400, "Exception Lead", "Taxonomy codes", "Closed without resolution"),
        ("O1", "Operational", "Extraction accuracy", "Correct header+line fields / sampled invoices", 0.91, 0.93, "Quality Lead", "Golden set", "Accuracy on easy invoices only"),
        ("O2", "Operational", "Matching accuracy", "Correct match decision / sampled matchable invoices", 0.88, 0.90, "Matching Lead", "Dual review", "Tolerance invented by agent"),
        ("O3", "Operational", "False-positive rate", "Incorrect flags / all flags", 0.18, 0.14, "Controls Lead", "Sampled flags", "Gaming by flagging less"),
        ("O4", "Operational", "False-negative rate", "Missed true issues / all true issues in sample", 0.07, 0.06, "Controls Lead", "Lookback sample", "Worse than FPR hide"),
        ("O5", "Operational", "STP rate", "Posted with no human edit / invoices in population", 0.31, 0.36, "AP Manager", "ERP change log", "STP of junk postings"),
        ("O6", "Operational", "Human intervention rate", "1 − untouched postings", 0.69, 0.64, "AP Manager", "ERP", "Intervention ≠ control"),
        ("O7", "Operational", "Avg resolution minutes", "Sum(minutes)/exceptions resolved", 22, 19, "Exception Lead", "Timestamped work objects", "Clock stopped incorrectly"),
        ("O8", "Operational", "Time to posting (hrs)", "Median hours invoice receipt → post", 86, 74, "AP Manager", "Receipt+post stamps", "Parked-as-posted cheat"),
        ("O9", "Operational", "Repeat exception rate", "Reopened or same vendor+code within 30d / resolved", 0.16, 0.13, "Process Excellence", "Taxonomy", "Renaming codes"),
        ("O10", "Operational", "On-time supplier follow-up", "Chases sent within SLA / required chases", 0.62, 0.78, "Vendor comms", "A08 log", "Sent ≠ answered"),
        ("O11", "Operational", "Missing-receipt reduction", "Open GRNI > policy / baseline same ageing", 420, 360, "Receiving Lead", "GRNI report", "Write-offs as 'reduction'"),
        ("R1", "Risk-control", "Control breaches", "Count of SoD / approval / pay-release violations", 2, 0, "Internal Audit", "Exception log", "Unlogged overrides"),
        ("R2", "Risk-control", "Escalation rate", "Items escalated / items in scope", 0.09, 0.08, "AP Manager", "A16 queue", "Suppressed escalations"),
        ("R3", "Risk-control", "Audit exceptions", "IA/external findings on agent population", 1, 0, "IA", "IA tracker", "Scope games"),
        ("R4", "Risk-control", "Rework rate", "Reversal or recode / postings", 0.04, 0.035, "Quality Lead", "ERP reversals", "Silent recodes"),
        ("F1", "Financial", "Cost per invoice", "Attributed AP cost / invoices", 9.8, 9.4, "FP&A", "Cost model", "Using vendor-blog $"),
        ("F2", "Financial", "AI inference cost", "Model+tool $ in t", 6500, 6400, "Systems Owner", "Vendor invoice", "Hidden seats"),
        ("F3", "Financial", "Cost per correct outcome", "(Labour+AI $) / correct postings in sample", 11.2, 10.6, "FP&A", "Sample+cost", "Denominator without quality"),
        ("F4", "Financial", "Hours released", "Gross hours vs baseline (not cash)", 180, 240, "AP Manager", "Time study", "Calling hours 'savings'"),
        ("F5", "Financial", "Validated savings", "Cash or cost-base change signed by Finance", 0, 0, "Controller", "GL / budget", "Unsigned slides"),
    ]
    for r, row in enumerate(kpis, 5):
        ws.cell(r, 1, row[0])
        ws.cell(r, 2, row[1])
        ws.cell(r, 3, row[2])
        ws.cell(r, 4, row[3])
        ws.cell(r, 5, row[4])
        ws.cell(r, 6, row[5])
        ws.cell(r, 7, f"=IF(OR(E{r}=\"\",F{r}=\"\"),\"\",F{r}-E{r})")
        ws.cell(r, 8, row[6])
        ws.cell(r, 9, row[7])
        ws.cell(r, 10, row[8])
        for c in range(1, 11):
            ws.cell(r, c).border = thin
            ws.cell(r, c).alignment = Alignment(wrap_text=True, vertical="center")
        if isinstance(row[4], float) and row[4] < 2:
            ws.cell(r, 5).number_format = "0.0%"
            ws.cell(r, 6).number_format = "0.0%"
            ws.cell(r, 7).number_format = "0.0%"
        ws.row_dimensions[r].height = 32

    families = {"Activity": "D4CBB8", "Operational": "C9D9D0", "Risk-control": "E0CFC8", "Financial": "E8E2D2"}
    for r in range(5, 5 + len(kpis)):
        fam = ws.cell(r, 2).value
        ws.cell(r, 2).fill = fill(families.get(fam, PAPER))

    disclaimer(ws, 30, 10, "Validated savings starts at 0 until Finance signs a cost-base or cash change. Do not treat hours released as savings.")
    autosize(ws, {1: 8, 2: 14, 3: 28, 4: 52, 5: 12, 6: 12, 7: 12, 8: 18, 9: 18, 10: 28})
    return wb


def registry_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Agent Registry"
    style_title(ws, "Evidence Room · Agent Registry", "One row per deployed agent instance. Promotion requires evidence, not enthusiasm.")
    headers = [
        "Agent ID", "Name", "Instance / entity", "Human owner", "Backup", "Autonomy level",
        "Population", "ERP", "Go-live (shadow)", "Last review", "Promotion evidence link",
        "Open incidents", "KPI pack link", "Status",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 14)
    agents = [
        ("A01", "Invoice Intake", "NL10 / SAP", "AP Intake Lead", "AP Manager", 1, "Email+PDF inbound", "S/4HANA", "2026-10-06", "", "", 0, "", "Shadow"),
        ("A02", "Invoice Validation", "NL10 / SAP", "AP Quality Lead", "Controller", 1, "Parked invoices", "S/4HANA", "", "", "", 0, "", "Specified"),
        ("A03", "Matching", "NL10 / SAP", "Matching Lead", "AP Manager", 1, "PO invoices", "S/4HANA", "", "", "", 0, "", "Specified"),
        ("A04", "Exception Triage", "NL10+NL20", "Exception Lead", "AP Manager", 1, "Coded exceptions", "S/4HANA", "", "", "", 0, "", "Specified"),
        ("A05", "Goods Receipt", "Plants 1000-1400", "Receiving Lead", "Warehouse Mgr", 0, "GRNI > 5 days", "S/4HANA", "", "", "", 0, "", "Observe"),
        ("A06", "PO Quality", "Direct materials", "Procurement Ops", "CPO delegate", 0, "POs created t", "S/4HANA", "", "", "", 0, "", "Observe"),
        ("A07", "Approval", "Non-PO + over-tol", "AP Manager", "DOA admin", 0, "Workflow items", "S/4HANA", "", "", "", 0, "", "Observe"),
        ("A08", "Supplier Resolution", "Top 80 vendors", "Vendor Master", "AP Comms", 1, "Draft letters", "S/4 + MDM", "", "", "", 0, "", "Specified"),
        ("A09", "Internal Follow-Up", "SSC", "Exception Lead", "Team lead", 1, "Internal chases", "S/4", "", "", "", 0, "", "Specified"),
        ("A10", "Duplicate & Anomaly", "All entities", "Controls Lead", "IA", 1, "Invoices+proposals", "S/4+NS", "", "", "", 0, "", "Specified"),
        ("A11", "Vendor Statement Recon", "Top 25 statements", "Reconciliations", "AP Manager", 0, "Monthly statements", "S/4", "", "", "", 0, "", "Observe"),
        ("A12", "Payment Proposal Review", "Weekly USD run", "Payments Lead", "Asst Controller", 0, "F110 proposal", "S/4HANA", "", "", "", 0, "", "Observe"),
        ("A13", "AP Close", "Month-end", "Asst Controller", "Controller", 0, "Close checklist", "S/4+NS", "", "", "", 0, "", "Observe"),
        ("A14", "AP Reporting", "Weekly pack", "AP Manager", "FP&A", 1, "Operating pack", "S/4+NS", "", "", "", 0, "", "Specified"),
        ("A15", "Root Cause", "Quarterly", "Process Excellence", "AP Manager", 0, "Coded 90-day window", "Work objects", "", "", "", 0, "", "Observe"),
        ("A16", "Orchestrator", "SSC queue", "AP Manager", "Head of SSC", 1, "All work objects", "Queue tool", "", "", "", 0, "", "Specified"),
    ]
    dv = DataValidation(type="list", formula1='"0,1,2,3,4"', allow_blank=False)
    ws.add_data_validation(dv)
    status_dv = DataValidation(type="list", formula1='"Specified,Observe,Shadow,Pilot,Live,Paused,Retired"', allow_blank=False)
    ws.add_data_validation(status_dv)
    for r, row in enumerate(agents, 5):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = thin
        dv.add(ws.cell(r, 6))
        status_dv.add(ws.cell(r, 14))
    autosize(ws, {1: 12, 2: 28, 3: 20, 4: 20, 5: 18, 6: 14, 7: 22, 8: 12, 9: 16, 10: 14, 11: 22, 12: 14, 13: 16, 14: 12})
    disclaimer(ws, 23, 14, "A12 can_release_payment is always FALSE. A16 cannot promote itself or any other agent. Level 4 is never a default.")
    return wb


def exception_tracker() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Exception Tracker"
    style_title(ws, "Evidence Room · Exception Tracker", "Use taxonomy codes E01–E27. One row per exception instance.")
    headers = [
        "Exception ID", "Invoice / doc", "Vendor", "Entity", "Code", "Name", "Risk",
        "Agent", "Owner", "Opened", "SLA due", "Status", "Root cause", "Resolution",
        "Age days", "Escalated?",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 16)
    codes = [
        ("E01", "Missing PO", "Med", "A04/A08"),
        ("E05", "Price mismatch", "Med", "A03/A06"),
        ("E07", "Missing receipt", "Med", "A05/A09"),
        ("E09", "Duplicate invoice", "High", "A10"),
        ("E13", "Tax issue", "High", "A02"),
        ("E21", "Banking-change concern", "Critical", "A10/A12"),
        ("E24", "Payment hold", "High", "A12"),
    ]
    examples = [
        ("EX-10482", "510029331", "Helix Fasteners", "NL10", "E07", "Missing receipt", "Med", "A05", "J. Okonkwo", "2026-09-12", "2026-09-17", "Open", "GR not posted for PO 450021887", "", 8, "Yes"),
        ("EX-10491", "510029448", "Nordic Coatings", "NL10", "E05", "Price mismatch", "Med", "A03", "S. Patel", "2026-09-14", "2026-09-18", "In progress", "PO price stale vs contract", "", 6, "No"),
        ("EX-10502", "510029512", "Helix Fasteners", "NL20", "E09", "Duplicate invoice", "High", "A10", "Controls Lead", "2026-09-15", "2026-09-16", "Hold", "Same inv# suffix variant", "Parked; supplier asked", 5, "Yes"),
        ("EX-10510", "NPC-8831", "Pacific Pack", "NPC", "E01", "Missing PO", "Med", "A04", "M. Chen", "2026-09-16", "2026-09-20", "Open", "Non-PO claimed as emergency", "", 4, "No"),
        ("EX-10518", "510029601", "Atlas Electrics", "NL10", "E21", "Banking-change concern", "Critical", "A12", "Payments Lead", "2026-09-18", "2026-09-18", "Hold", "Bank ≠ last paid", "Master-data ticket", 2, "Yes"),
    ]
    for r, row in enumerate(examples, 5):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = thin
        ws.cell(r, 15, f'=IF(J{r}="","",TODAY()-J{r})')
        ws.cell(r, 15).number_format = "0"
    code_ws = wb.create_sheet("Taxonomy")
    style_title(code_ws, "E01–E27 reference", "See EXCEPTION_TAXONOMY.md for full definitions.")
    for i, h in enumerate(["Code", "Name", "Typical risk", "Primary agent"], 1):
        code_ws.cell(4, i, h)
    style_header(code_ws, 4, 4)
    full = [
        ("E01", "Missing PO", "Med", "A04"), ("E02", "Invalid PO", "Med", "A02"),
        ("E03", "PO closed", "Med", "A03"), ("E04", "PO exhausted", "Med", "A03"),
        ("E05", "Price mismatch", "Med", "A03"), ("E06", "Quantity mismatch", "Med", "A03"),
        ("E07", "Missing receipt", "Med", "A05"), ("E08", "Partial receipt", "Low", "A05"),
        ("E09", "Duplicate invoice", "High", "A10"), ("E10", "Potential duplicate", "High", "A10"),
        ("E11", "Wrong supplier", "High", "A02"), ("E12", "Incorrect legal entity", "High", "A02"),
        ("E13", "Tax issue", "High", "A02"), ("E14", "Approval missing", "High", "A07"),
        ("E15", "DOA issue", "High", "A07"), ("E16", "Coding missing", "Med", "A02"),
        ("E17", "Invalid cost centre", "Med", "A02"), ("E18", "Invoice quality", "Low", "A01"),
        ("E19", "OCR/extraction issue", "Med", "A01"), ("E20", "Master-data issue", "High", "A08"),
        ("E21", "Banking-change concern", "Critical", "A10"), ("E22", "Credit note required", "Med", "A08"),
        ("E23", "Statement discrepancy", "Med", "A11"), ("E24", "Payment hold", "High", "A12"),
        ("E25", "Disputed invoice", "Med", "A08"), ("E26", "Aged unresolved item", "High", "A04"),
        ("E27", "System/interface error", "High", "A16"),
    ]
    for r, row in enumerate(full, 5):
        for c, val in enumerate(row, 1):
            code_ws.cell(r, c, val).border = thin
    autosize(ws, {1: 12, 2: 14, 3: 20, 4: 10, 5: 8, 6: 22, 7: 10, 8: 8, 9: 16, 10: 12, 11: 12, 12: 12, 13: 32, 14: 22, 15: 10, 16: 12})
    autosize(code_ws, {1: 10, 2: 28, 3: 12, 4: 12})
    disclaimer(ws, 12, 16, "Northline rows are fictional worked examples. Replace with live work objects. E21/E09 always escalate.")
    return wb


def controls_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Control Matrix"
    style_title(ws, "Evidence Room · Agent Control Matrix", "Preventive and detective. Agents produce evidence; they are not the control.")
    headers = ["Control ID", "Agent", "Risk", "Control", "P/D", "Human owner", "Evidence", "Frequency", "Escalation trigger"]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 9)
    rows = [
        ("C-A01-01", "A01", "Junk capture posts to ledger", "Park only; no post permission at L0–L2", "P", "AP Intake Lead", "Role extract + sample", "Monthly", "Any post by A01"),
        ("C-A03-01", "A03", "Invented tolerance", "Written tolerance table; agent cannot author it", "P", "Matching Lead", "Tolerance version hash", "Change + quarterly", "Unsourced tolerance"),
        ("C-A10-01", "A10", "Treated as fraud verdict", "Screen labels only; no fraud conclusion", "P", "Controls Lead", "Output schema check", "Weekly", "Word 'fraud confirmed'"),
        ("C-A12-01", "A12", "Autonomous payment release", "can_release_payment = FALSE always", "P", "Payments Lead", "Role + job log", "Every run", "Any release attempt"),
        ("C-A12-02", "A12", "Stale challenge pack", "Pack invalidated if proposal hash changes", "D", "Payments Lead", "Hash compare", "Every run", "Hash mismatch"),
        ("C-A08-01", "A08", "Unapproved supplier send", "Send default human; bank/tax always human", "P", "Vendor Master", "Approval log", "Weekly", "Send without ticket"),
        ("C-A07-01", "A07", "Agent self-approves", "A07 cannot be approver of record", "P", "AP Manager", "Workflow actor report", "Monthly", "Agent as approver"),
        ("C-A16-01", "A16", "Self-promotion", "A16 cannot change autonomy levels", "P", "Head of SSC", "Registry change log", "Monthly", "Unapproved level change"),
        ("C-ALL-01", "All", "Prompt injection via invoice text", "Untrusted text treated as data; no tool from body", "P", "Systems Owner", "Parser tests", "Release", "Tool call from invoice"),
        ("C-ALL-02", "All", "Model swap unnoticed", "Model/version pinned; change = release", "P", "Systems Owner", "Model bill of materials", "Each change", "Untracked model ID"),
    ]
    for r, row in enumerate(rows, 5):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = thin
            ws.cell(r, c).alignment = Alignment(wrap_text=True, vertical="center")
        ws.row_dimensions[r].height = 36
    autosize(ws, {1: 12, 2: 10, 3: 28, 4: 46, 5: 8, 6: 18, 7: 22, 8: 16, 9: 24})
    disclaimer(ws, 17, 9, "Full matrix lives in Controls/AGENT_CONTROL_MATRIX.md (≥3 controls per agent). This workbook is the operating extract.")
    return wb


def roadmap_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Roadmap"
    style_title(ws, "Evidence Room · Implementation Roadmap", "Phases 0–10. Duration depends on systems, controls, data, and governance — not this grid.")
    headers = ["Phase", "Name", "Primary question", "Exit evidence", "Owner", "Start", "End", "Status", "% complete"]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 9)
    phases = [
        ("0", "Baseline & readiness", "What is true today?", "Diagnostic score + KPI baseline", "AP Manager"),
        ("1", "Process discovery", "How does work actually happen?", "Map + taxonomy extract", "Process Excellence"),
        ("2", "Agent specification", "What is the job?", "Signed charter", "Human owner"),
        ("3", "Data / tool access", "What may it read?", "Least-privilege grant", "Systems Owner"),
        ("4", "Prototype", "Can it produce the pack?", "Sample outputs on historic cases", "Human owner"),
        ("5", "Historical testing", "Does it hold on a frozen set?", "Accuracy / FPR / FNR pack", "Quality Lead"),
        ("6", "Shadow mode", "Would we have trusted it?", "Shadow vs human log", "AP Manager"),
        ("7", "Controlled execution", "Can it act in a box?", "Pilot population + incidents", "Human owner"),
        ("8", "Performance review", "Did outcomes and controls move?", "O + R families", "Steering"),
        ("9", "Responsibility progression", "Has it earned the next level?", "Registry change + evidence", "Head of SSC"),
        ("10", "Scale", "Which population expands?", "New charter annex", "AP Manager"),
    ]
    for r, row in enumerate(phases, 5):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = thin
        ws.cell(r, 8, "Not started")
        ws.cell(r, 9, 0)
        ws.cell(r, 9).number_format = "0%"
    ws["A17"] = "Illustrative single-agent path (one well-bounded agent): 4–6 weeks. Actual duration depends on ERP access, SoD, data quality, and change control. Not a commitment."
    ws.merge_cells("A17:I17")
    ws["A17"].font = font(size=9, italic=True, color=SLATE)
    autosize(ws, {1: 10, 2: 28, 3: 36, 4: 32, 5: 18, 6: 12, 7: 12, 8: 14, 9: 12})
    return wb


def benefits_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Benefits Tracker"
    style_title(ws, "Evidence Room · Benefits Realisation", "A benefit is not real until Finance signs the cost-base or cash change.")
    headers = ["Benefit ID", "Hypothesis", "Family", "Baseline", "Observed", "Cash?", "Signed by", "Date signed", "Status", "Notes"]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 10)
    rows = [
        ("B-01", "Reduce missing-GR open items >5 days", "Operational", "420", "", "No", "", "", "Open", "Capacity / ageing — not cash"),
        ("B-02", "Reduce repeat E05 price mismatches", "Operational", "16%", "", "No", "", "", "Open", "Needs PO quality work"),
        ("B-03", "Release exception hours", "Financial (capacity)", "180 hrs/mo", "", "No until conversion", "", "", "Open", "Apply hours-to-cash"),
        ("B-04", "Capture incremental early-pay discounts", "Financial", "$7k/mo opp.", "", "Yes if timed", "", "", "Open", "Do not assume"),
        ("B-05", "Zero unauthorised payment releases by agents", "Risk-control", "0", "0", "n/a", "Payments Lead", "", "Control", "Must stay true"),
    ]
    for r, row in enumerate(rows, 5):
        for c, val in enumerate(row, 1):
            ws.cell(r, c, val).border = thin
            ws.cell(r, c).alignment = Alignment(wrap_text=True)
    autosize(ws, {1: 12, 2: 42, 3: 20, 4: 16, 5: 12, 6: 20, 7: 16, 8: 12, 9: 12, 10: 24})
    disclaimer(ws, 12, 10, "Unsigned benefits stay at Status=Open. Steering packs must not total unsigned rows into 'savings'.")
    return wb


def diagnostic_workbook() -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = "Diagnostic"
    style_title(ws, "Evidence Room · AP AI Readiness Diagnostic", "36 questions. Score 0–3. Email-gate lead magnet. Not a certification.")
    headers = ["#", "Domain", "Question", "0 — Absent", "1 — Informal", "2 — Defined", "3 — Evidenced", "Score", "Notes"]
    for i, h in enumerate(headers, 1):
        ws.cell(4, i, h)
    style_header(ws, 4, 9)
    questions = [
        ("Process", "Is invoice intake channel mix measured (email, portal, EDI, paper)?"),
        ("Process", "Is there a written exception taxonomy used in production, not a slide?"),
        ("Process", "Are 2-way and 3-way match rules documented with tolerances by category?"),
        ("Process", "Is GRNI reviewed on a named cadence with an owner?"),
        ("Process", "Is non-PO spend gated by DOA rather than habit?"),
        ("Process", "Are supplier statements reconciled for a defined vendor set?"),
        ("Data", "Can you extract invoice header+line history for 12 months without a project?"),
        ("Data", "Is vendor master completeness (bank, tax, entity) measured?"),
        ("Data", "Are PO / GR / invoice keys reliable enough to join without heroics?"),
        ("Data", "Is there a golden set of labelled invoices for extraction tests?"),
        ("Data", "Are duplicates defined (exact vs near) in writing?"),
        ("Data", "Is payment-proposal history retained with a hash/audit trail?"),
        ("Controls", "Is payment release dual-controlled and impossible for a bot role?"),
        ("Controls", "Are agent (or RPA) identities distinct from named humans?"),
        ("Controls", "Is there an override log with reason codes?"),
        ("Controls", "Are model/vendor changes treated as releases?"),
        ("Controls", "Is prompt/input from invoices treated as untrusted data?"),
        ("Controls", "Can Internal Audit reconstruct who/what changed a posting?"),
        ("People", "Is there a single AP process owner with budget and SoD authority?"),
        ("People", "Do processors know which exceptions they own vs bounce?"),
        ("People", "Is receiving measured on GR timeliness?"),
        ("People", "Is procurement measured on PO quality (price/qty/vendor/coding)?"),
        ("People", "Has the team seen a shadow-mode test, not only a demo?"),
        ("People", "Is there a named human owner per proposed agent?"),
        ("Systems", "Is the ERP the book of record (no shadow spreadsheet ledger)?"),
        ("Systems", "Can a least-privilege read role be granted to a service account?"),
        ("Systems", "Is workflow (approvals) usable via API or export?"),
        ("Systems", "Are there already bots/RPA in AP, and is their inventory complete?"),
        ("Systems", "Is multi-ERP (if any) mapped to one taxonomy?"),
        ("Systems", "Is production change control applied to AP automation?"),
        ("Economics", "Do you know your own cost per invoice from a cost model, not a blog?"),
        ("Economics", "Is exception volume trended monthly?"),
        ("Economics", "Are late fees and missed discounts visible to AP leadership?"),
        ("Economics", "Is there a baseline week of timestamps (receipt, post, pay)?"),
        ("Economics", "Would a Finance Director sign a benefits line today? (if yes, attach evidence)"),
        ("Economics", "Is AI/tool spend already occurring without an operating measure?"),
    ]
    dv = DataValidation(type="list", formula1='"0,1,2,3"', allow_blank=True)
    ws.add_data_validation(dv)
    for r, (domain, q) in enumerate(questions, 5):
        ws.cell(r, 1, r - 4).border = thin
        ws.cell(r, 2, domain).border = thin
        ws.cell(r, 3, q).border = thin
        ws.cell(r, 4, "No evidence / not done").border = thin
        ws.cell(r, 5, "Heroics / one person knows").border = thin
        ws.cell(r, 6, "Written, unevenly used").border = thin
        ws.cell(r, 7, "Used, sampled, owned").border = thin
        ws.cell(r, 8).border = thin
        ws.cell(r, 9).border = thin
        dv.add(ws.cell(r, 8))
        ws.row_dimensions[r].height = 28
        ws.cell(r, 3).alignment = Alignment(wrap_text=True)
    ws["A42"] = "Domain scores"
    ws["A43"] = "Process"
    ws["B43"] = "=IF(COUNT(H5:H10)=0,\"\",AVERAGE(H5:H10))"
    ws["A44"] = "Data"
    ws["B44"] = "=IF(COUNT(H11:H16)=0,\"\",AVERAGE(H11:H16))"
    ws["A45"] = "Controls"
    ws["B45"] = "=IF(COUNT(H17:H22)=0,\"\",AVERAGE(H17:H22))"
    ws["A46"] = "People"
    ws["B46"] = "=IF(COUNT(H23:H28)=0,\"\",AVERAGE(H23:H28))"
    ws["A47"] = "Systems"
    ws["B47"] = "=IF(COUNT(H29:H34)=0,\"\",AVERAGE(H29:H34))"
    ws["A48"] = "Economics"
    ws["B48"] = "=IF(COUNT(H35:H40)=0,\"\",AVERAGE(H35:H40))"
    ws["A49"] = "Overall (0–100)"
    ws["B49"] = '=IF(COUNT(H5:H40)=0,"",AVERAGE(H5:H40)/3*100)'
    ws["B49"].number_format = "0.0"
    for r in range(43, 49):
        ws.cell(r, 2).number_format = "0.00"
    ws["A51"] = "Maturity: 0–24 Forming · 25–49 Defined · 50–74 Governed · 75–100 Evidenced. This is an Evidence Room framework, not a certified standard."
    ws.merge_cells("A51:I51")
    ws["A51"].font = font(size=9, italic=True, color=SLATE)
    autosize(ws, {1: 6, 2: 12, 3: 62, 4: 22, 5: 24, 6: 22, 7: 20, 8: 10, 9: 20})
    return wb


def write_all() -> list[Path]:
    out_dirs = {
        "roi": ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "ER_AP_ROI_CALCULATOR.xlsx",
        "kpi": ROOT / "03_AP_AGENT_OS_PRO" / "KPI_and_Measurement" / "ER_AP_KPI_SCORECARD.xlsx",
        "reg": ROOT / "03_AP_AGENT_OS_PRO" / "Templates" / "ER_AP_AGENT_REGISTRY.xlsx",
        "exc": ROOT / "03_AP_AGENT_OS_PRO" / "Templates" / "ER_AP_EXCEPTION_TRACKER.xlsx",
        "ctl": ROOT / "03_AP_AGENT_OS_PRO" / "Controls" / "ER_AP_CONTROL_MATRIX.xlsx",
        "road": ROOT / "03_AP_AGENT_OS_PRO" / "Templates" / "ER_AP_IMPLEMENTATION_ROADMAP.xlsx",
        "ben": ROOT / "04_AP_AGENT_OS_TEAM" / "Implementation" / "ER_AP_BENEFITS_TRACKER.xlsx",
        "diag": ROOT / "01_FREE_AP_AI_READINESS" / "ER_AP_READINESS_DIAGNOSTIC.xlsx",
        "case": ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "ER_AP_BUSINESS_CASE.xlsx",
    }
    mapping = {
        "roi": roi_workbook,
        "kpi": kpi_workbook,
        "reg": registry_workbook,
        "exc": exception_tracker,
        "ctl": controls_workbook,
        "road": roadmap_workbook,
        "ben": benefits_workbook,
        "diag": diagnostic_workbook,
        "case": roi_workbook,
    }
    paths = []
    for key, fn in mapping.items():
        path = out_dirs[key]
        path.parent.mkdir(parents=True, exist_ok=True)
        fn().save(path)
        paths.append(path)
    return paths


if __name__ == "__main__":
    for p in write_all():
        print(p)
