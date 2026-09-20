#!/usr/bin/env python3
"""Generate Evidence Room Excel deliverables."""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.chart import BarChart, Reference

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "spreadsheets"
OUT.mkdir(parents=True, exist_ok=True)
FREE_OUT = ROOT / "01_FREE_AP_AI_READINESS" / "spreadsheets"
FREE_OUT.mkdir(parents=True, exist_ok=True)
TEAM_OUT = ROOT / "04_AP_AGENT_OS_TEAM" / "Implementation" / "spreadsheets"
TEAM_OUT.mkdir(parents=True, exist_ok=True)

INK = "0B1F33"
PAPER = "F7F4EF"
TEAL = "1F6F78"
AMBER = "C47E2B"
CRITICAL = "9B2C2C"
WHITE = "FFFFFF"

thin = Border(
    left=Side(style="thin", color="D0CBC3"),
    right=Side(style="thin", color="D0CBC3"),
    top=Side(style="thin", color="D0CBC3"),
    bottom=Side(style="thin", color="D0CBC3"),
)


def style_header(ws, row, cols):
    fill = PatternFill("solid", fgColor=INK)
    font = Font(name="Calibri", bold=True, color=WHITE, size=11)
    for c in range(1, cols + 1):
        cell = ws.cell(row=row, column=c)
        cell.fill = fill
        cell.font = font
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = thin


def autosize(ws, max_width=42):
    for col in ws.columns:
        letter = get_column_letter(col[0].column)
        width = min(max((len(str(c.value or "")) for c in col), default=10) + 2, max_width)
        ws.column_dimensions[letter].width = max(width, 12)


def add_title(ws, title, subtitle=None):
    ws["A1"] = title
    ws["A1"].font = Font(name="Calibri", bold=True, size=16, color=INK)
    if subtitle:
        ws["A2"] = subtitle
        ws["A2"].font = Font(name="Calibri", size=10, color=TEAL, italic=True)


def build_roi_calculator():
    wb = Workbook()
    ws = wb.active
    ws.title = "ROI Calculator"
    add_title(
        ws,
        "Evidence Room — AP Agent Business Case Calculator",
        "Illustrative model. Not a guarantee of savings. External benchmarks: Ardent Partners 2025.",
    )

    headers = ["Input", "Value", "Unit", "Notes"]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, 4)

    inputs = [
        ("Monthly invoice volume", 15000, "invoices", "Organisation-specific"),
        ("AP FTE headcount", 12, "FTE", "AP processing + exceptions"),
        ("Fully loaded cost per FTE (annual)", 85000, "USD", "Salary + benefits + overhead"),
        ("Manual-touch percentage", 0.55, "%", "Share requiring human touch"),
        ("Exception rate", 0.184, "%", "Default = Ardent 2025 average 18.4%"),
        ("Avg exception resolution minutes", 18, "minutes", "Organisation-specific"),
        ("Duplicate invoice rate", 0.008, "%", "Detected duplicates / invoices"),
        ("Late-payment cost per month", 4500, "USD", "Fees, lost discounts, cash drag"),
        ("Early-payment discount opportunity / mo", 3200, "USD", "Recoverable if cycle improves"),
        ("Current processing cost / invoice", 9.84, "USD", "Default = Ardent 2025 average"),
        ("AI / tooling cost per month", 2500, "USD", "LLM + orchestration + monitoring"),
        ("Implementation cost (one-time)", 45000, "USD", "Internal + external"),
        ("Conservative efficiency gain", 0.12, "%", "Hours released / touch reduction"),
        ("Base efficiency gain", 0.22, "%", "Illustrative mid case"),
        ("Upside efficiency gain", 0.35, "%", "Requires strong data + controls"),
        ("External avg cost benchmark", 9.84, "USD", "Ardent Partners 2025"),
        ("External BIC cost benchmark", 2.65, "USD", "Ardent Partners 2025 Best-in-Class"),
    ]
    for i, row in enumerate(inputs, 5):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.border = thin
            if j == 2 and isinstance(v, float) and v < 1:
                cell.number_format = "0.0%"
            elif j == 2 and isinstance(v, (int, float)) and v >= 1:
                cell.number_format = "#,##0.00"

    ws["A24"] = "Scenario Outputs"
    ws["A24"].font = Font(bold=True, size=13, color=INK)
    out_headers = [
        "Metric",
        "Conservative",
        "Base",
        "Upside",
        "Formula / definition",
    ]
    for i, h in enumerate(out_headers, 1):
        ws.cell(row=25, column=i, value=h)
    style_header(ws, 25, 5)

    # Named input cells for clarity in formulas
    # B5 volume, B6 FTE, B7 cost, B8 manual, B9 exception, B10 minutes,
    # B11 dup, B12 late, B13 early, B14 cpi, B15 ai, B16 impl,
    # B17 cons, B18 base, B19 up

    metrics = [
        (
            "Baseline annual AP labour cost",
            "=B6*B7",
            "=B6*B7",
            "=B6*B7",
            "FTE × fully loaded cost",
        ),
        (
            "Baseline annual processing cost (volume × CPI)",
            "=B5*12*B14",
            "=B5*12*B14",
            "=B5*12*B14",
            "Monthly volume × 12 × cost/invoice",
        ),
        (
            "Estimated annual hours released",
            "=B5*12*B8*B9*(B10/60)*B17",
            "=B5*12*B8*B9*(B10/60)*B18",
            "=B5*12*B8*B9*(B10/60)*B19",
            "Volume × manual% × exception% × hours × efficiency",
        ),
        (
            "Labour capacity value released",
            "=B26*B17",
            "=B26*B18",
            "=B26*B19",
            "Baseline labour × efficiency (capacity, not cash)",
        ),
        (
            "Exception-cost reduction (illustrative)",
            "=(B5*12*B9*(B10/60)*(B7/1800))*B17",
            "=(B5*12*B9*(B10/60)*(B7/1800))*B18",
            "=(B5*12*B9*(B10/60)*(B7/1800))*B19",
            "Exception hours × hourly rate × efficiency",
        ),
        (
            "Late-payment + discount opportunity",
            "=(B12+B13)*12*B17",
            "=(B12+B13)*12*B18",
            "=(B12+B13)*12*B19",
            "Cash-related opportunity × efficiency",
        ),
        (
            "Gross annual benefit (illustrative)",
            "=B29+B30+B31",
            "=B29+B30+B31",
            "=B29+B30+B31",
            "Capacity + exception + cash opportunity",
        ),
        (
            "Annual AI / tool cost",
            "=B15*12",
            "=B15*12",
            "=B15*12",
            "Monthly AI cost × 12",
        ),
        (
            "Net annual benefit (before payback of impl)",
            "=B32-B33",
            "=B32-B33",
            "=B32-B33",
            "Gross − AI cost",
        ),
        (
            "Simple payback (months)",
            "=IF(B34<=0,\"N/A\",B16/(B34/12))",
            "=IF(C34<=0,\"N/A\",B16/(C34/12))",
            "=IF(D34<=0,\"N/A\",B16/(D34/12))",
            "Implementation / (net monthly benefit)",
        ),
        (
            "Year-1 ROI (illustrative)",
            "=IF((B16+B33)=0,\"N/A\",(B34-B16)/(B16+B33))",
            "=IF((B16+C33)=0,\"N/A\",(C34-B16)/(B16+C33))",
            "=IF((B16+D33)=0,\"N/A\",(D34-B16)/(B16+D33))",
            "(Net Y1 − impl) / (impl + AI Y1)",
        ),
        (
            "Gap to BIC cost benchmark (per invoice)",
            "=B14-B17",
            "=B14-B17",
            "=B14-B17",
            "Your CPI − Ardent BIC $2.65 (context only)",
        ),
    ]

    # Fix metric row references - recalculate properly
    # After writing headers at 25, data starts at 26
    for i, (name, c, b, u, note) in enumerate(metrics, 26):
        ws.cell(row=i, column=1, value=name).border = thin
        for col, val in enumerate([c, b, u], 2):
            cell = ws.cell(row=i, column=col, value=val)
            cell.border = thin
            if "ROI" in name or "payback" in name.lower():
                pass
            else:
                cell.number_format = "#,##0.00"
        ws.cell(row=i, column=5, value=note).border = thin

    # Correct cross-row formulas that referenced wrong rows
    # B26 labour, B27 processing, B28 hours, B29 capacity, B30 exception, B31 cash,
    # B32 gross, B33 ai, B34 net, B35 payback, B36 ROI, B37 gap

    ws["B29"] = "=B26*B17"
    ws["C29"] = "=B26*B18"
    ws["D29"] = "=B26*B19"
    ws["B32"] = "=B29+B30+B31"
    ws["C32"] = "=C29+C30+C31"
    ws["D32"] = "=D29+D30+D31"
    ws["B33"] = "=B15*12"
    ws["C33"] = "=B15*12"
    ws["D33"] = "=B15*12"
    ws["B34"] = "=B32-B33"
    ws["C34"] = "=C32-C33"
    ws["D34"] = "=D32-D33"
    ws["B37"] = "=B14-B17"
    ws["C37"] = "=B14-B17"
    ws["D37"] = "=B14-B17"
    # BIC is in B17 of inputs which is efficiency - wrong. Use B21 for BIC
    ws["B37"] = "=B14-B21"
    ws["C37"] = "=B14-B21"
    ws["D37"] = "=B14-B21"

    for col in ["B", "C", "D"]:
        ws[f"{col}36"].number_format = "0.0%"
        ws[f"{col}28"].number_format = "#,##0.0"

    ws["A40"] = "DISCLAIMER"
    ws["A40"].font = Font(bold=True, color=CRITICAL)
    ws["A41"] = (
        "Illustrative planning model only. Does not guarantee savings, ROI, fraud prevention, "
        "regulatory compliance, accounting accuracy, or autonomous payment safety. Validate all "
        "inputs with your finance leaders. External benchmarks are industry research context, not targets."
    )
    ws.merge_cells("A41:E43")
    ws["A41"].alignment = Alignment(wrap_text=True)

    sens = wb.create_sheet("Sensitivity")
    add_title(sens, "Sensitivity — efficiency vs AI cost", "Illustrative heat map inputs")
    sens["A4"] = "Efficiency \\ Monthly AI $"
    for i, ai in enumerate([1000, 2500, 5000, 10000], 2):
        sens.cell(row=4, column=i, value=ai)
    style_header(sens, 4, 5)
    for r, eff in enumerate([0.10, 0.15, 0.22, 0.30, 0.35], 5):
        sens.cell(row=r, column=1, value=eff).number_format = "0%"
        for c, ai in enumerate([1000, 2500, 5000, 10000], 2):
            # Placeholder formula referencing main sheet volume assumptions
            sens.cell(
                row=r,
                column=c,
                value=f"=('ROI Calculator'!B6*'ROI Calculator'!B7*{eff})-({ai}*12)",
            ).number_format = "#,##0"

    notes = wb.create_sheet("Assumptions & Sources")
    add_title(notes, "Assumptions & Sources")
    rows = [
        ("Ardent Partners 2025 avg cost/invoice", "$9.84", "Independent research (Bottomline distribution)"),
        ("Ardent Partners 2025 BIC cost/invoice", "$2.65", "Independent research"),
        ("Ardent Partners 2025 exception rate", "18.4%", "Independent research"),
        ("Ardent Partners 2025 STP", "35.4%", "Independent research"),
        ("Organisation inputs", "Editable", "Replace defaults with your actuals"),
        ("Efficiency gains", "Illustrative ranges", "Not promises — calibrate in shadow/pilot"),
    ]
    notes["A4"] = "Item"
    notes["B4"] = "Value"
    notes["C4"] = "Classification"
    style_header(notes, 4, 3)
    for i, row in enumerate(rows, 5):
        for j, v in enumerate(row, 1):
            notes.cell(row=i, column=j, value=v).border = thin

    for sheet in wb.worksheets:
        autosize(sheet)
    path = OUT / "ER_AP_ROI_Calculator.xlsx"
    wb.save(path)
    return path


def build_kpi_scorecard():
    wb = Workbook()
    ws = wb.active
    ws.title = "Agent KPI Scorecard"
    add_title(ws, "Evidence Room — Agent KPI Scorecard", "Separate activity, operational, financial, and risk outcomes")

    headers = [
        "Metric ID",
        "Metric",
        "Category",
        "Definition / Formula",
        "Target",
        "Actual",
        "Period",
        "Agent",
        "Owner",
        "Evidence source",
        "Status",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))

    metrics = [
        ("A01", "Invoices handled", "Activity", "Count of invoices processed by agent", "", "", "Weekly", "Intake", "", "System log", ""),
        ("A02", "Exceptions handled", "Activity", "Count of exceptions triaged", "", "", "Weekly", "Triage", "", "Exception tracker", ""),
        ("O01", "Classification accuracy", "Operational", "Correct classifications / total classified", "≥95%", "", "Monthly", "Triage", "", "Sample audit", ""),
        ("O02", "Extraction accuracy", "Operational", "Correct fields / total fields sampled", "≥98%", "", "Monthly", "Intake", "", "Sample audit", ""),
        ("O03", "Matching accuracy", "Operational", "Correct match decisions / total match decisions", "≥97%", "", "Monthly", "Matching", "", "Sample audit", ""),
        ("O04", "False-positive rate", "Operational", "Incorrect flags / total flags", "≤5%", "", "Monthly", "Duplicate", "", "Review sample", ""),
        ("O05", "False-negative rate", "Operational", "Missed issues / known issues in sample", "≤2%", "", "Monthly", "Duplicate", "", "Review sample", ""),
        ("O06", "Exception resolution rate", "Operational", "Resolved exceptions / total exceptions", "", "", "Weekly", "Triage", "", "Tracker", ""),
        ("O07", "Straight-through processing rate", "Operational", "STP invoices / total invoices", "", "", "Weekly", "Orchestrator", "", "ERP/workflow", ""),
        ("O08", "Human intervention rate", "Operational", "Items requiring human action / total", "", "", "Weekly", "Orchestrator", "", "Workflow", ""),
        ("O09", "Avg resolution time (hrs)", "Operational", "Sum resolution hours / resolved items", "", "", "Weekly", "Triage", "", "Tracker", ""),
        ("O10", "Time to invoice posting (days)", "Operational", "Avg receipt-to-post calendar days", "", "", "Monthly", "Orchestrator", "", "ERP", ""),
        ("O11", "Repeat exception rate", "Operational", "Recurring same-root exceptions / total", "", "", "Monthly", "Root Cause", "", "Analytics", ""),
        ("O12", "On-time supplier follow-up", "Operational", "On-time supplier actions / due actions", "≥95%", "", "Weekly", "Supplier", "", "Comms log", ""),
        ("O13", "On-time internal follow-up", "Operational", "On-time internal actions / due actions", "≥95%", "", "Weekly", "Internal FU", "", "Comms log", ""),
        ("O14", "Ageing reduction (days)", "Operational", "Change in avg aged open items vs baseline", "", "", "Monthly", "Close", "", "Ageing report", ""),
        ("O15", "Payment-on-time rate", "Operational", "On-time payments / scheduled payments", "", "", "Monthly", "Payment Review", "", "Treasury/AP", ""),
        ("O16", "Missing-receipt reduction", "Operational", "% change in open GR gaps vs baseline", "", "", "Monthly", "Goods Receipt", "", "GRNI report", ""),
        ("O17", "PO compliance improvement", "Operational", "Change in PO-quality defect rate", "", "", "Monthly", "PO Quality", "", "PO audit", ""),
        ("F01", "Cost per invoice", "Financial", "Fully loaded AP cost / invoices", "", "", "Monthly", "Orchestrator", "", "Finance model", ""),
        ("F02", "Cost per exception resolved", "Financial", "Exception labour+AI / exceptions resolved", "", "", "Monthly", "Triage", "", "Finance model", ""),
        ("F03", "AI inference cost", "Financial", "LLM/tool spend in period", "", "", "Monthly", "Orchestrator", "", "Vendor invoice", ""),
        ("F04", "Cost per correct outcome", "Financial", "(Labour+AI) / validated correct outcomes", "", "", "Monthly", "Orchestrator", "", "Model", ""),
        ("F05", "Estimated human hours released", "Financial", "Baseline touch hours − actual touch hours", "", "", "Monthly", "Orchestrator", "", "Time study", ""),
        ("F06", "Validated financial savings", "Financial", "Savings with evidence pack approved by Finance", "", "", "Quarterly", "Orchestrator", "", "Benefits tracker", ""),
        ("R01", "Control breaches", "Risk/Control", "Count of control policy breaches", "0", "", "Monthly", "All", "", "Control log", ""),
        ("R02", "Escalation rate", "Risk/Control", "Escalations / agent decisions", "", "", "Weekly", "Orchestrator", "", "Escalation log", ""),
        ("R03", "Audit exceptions", "Risk/Control", "Audit findings related to agent scope", "0", "", "Quarterly", "Governance", "", "Audit tracker", ""),
        ("R04", "Rework rate", "Risk/Control", "Reworked outputs / total outputs", "≤3%", "", "Monthly", "All", "", "QA sample", ""),
    ]
    for i, row in enumerate(metrics, 5):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.border = thin
            cell.alignment = Alignment(wrap_text=True, vertical="top")

    blank = wb.create_sheet("Blank Scorecard")
    add_title(blank, "Blank reusable scorecard")
    for i, h in enumerate(headers, 1):
        blank.cell(row=4, column=i, value=h)
    style_header(blank, 4, len(headers))
    for r in range(5, 35):
        for c in range(1, len(headers) + 1):
            blank.cell(row=r, column=c).border = thin

    defs = wb.create_sheet("Category Definitions")
    add_title(defs, "Metric category definitions")
    defs["A4"] = "Category"
    defs["B4"] = "Purpose"
    style_header(defs, 4, 2)
    cats = [
        ("Activity", "Volume of work performed — useful for capacity, not proof of value alone"),
        ("Operational", "Quality, speed, and process outcomes that change AP performance"),
        ("Financial", "Cost, capacity value, and validated savings — avoid claiming unverified savings"),
        ("Risk/Control", "Control integrity, auditability, and rework — non-negotiable for promotion"),
    ]
    for i, row in enumerate(cats, 5):
        for j, v in enumerate(row, 1):
            defs.cell(row=i, column=j, value=v).border = thin

    for sheet in wb.worksheets:
        autosize(sheet)
    path = OUT / "ER_AP_KPI_Scorecard.xlsx"
    wb.save(path)
    return path


def build_agent_registry():
    wb = Workbook()
    ws = wb.active
    ws.title = "Agent Registry"
    add_title(ws, "Evidence Room — AP Agent Registry", "Living register of agent workforce")

    headers = [
        "Agent ID",
        "Agent name",
        "Purpose",
        "Human owner",
        "Autonomy level (0-4)",
        "Status",
        "Systems / data",
        "Approval required",
        "Exclusions",
        "KPIs (primary)",
        "Control evidence location",
        "Last review date",
        "Promotion evidence",
        "Cost MTD (USD)",
        "Notes",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))

    agents = [
        ("AP-01", "Invoice Intake Agent", "Completeness & extraction readiness", "", 0, "Design", "Inbox/OCR/IDP", "Yes for release", "No posting", "Extraction accuracy", "", "", "", "", ""),
        ("AP-02", "Invoice Validation Agent", "Field & master-data validation", "", 0, "Design", "Vendor master/ERP", "Yes", "No master-data edits", "Validation accuracy", "", "", "", "", ""),
        ("AP-03", "Matching Agent", "PO/price/qty/receipt match", "", 0, "Design", "PO/GR/Invoice", "Yes", "No tolerance override above policy", "Matching accuracy", "", "", "", "", ""),
        ("AP-04", "Exception Triage Agent", "Classify & route exceptions", "", 0, "Design", "Exception queue", "Yes for new classes", "No payment", "Classification accuracy", "", "", "", "", ""),
        ("AP-05", "Goods Receipt Agent", "Missing/partial GR identification", "", 0, "Design", "GRNI/PO", "Yes for external send", "No GR posting without policy", "Missing-receipt reduction", "", "", "", "", ""),
        ("AP-06", "PO Quality Agent", "PO creation defect detection", "", 0, "Design", "PO system", "Yes", "No PO amendment without owner", "PO compliance", "", "", "", "", ""),
        ("AP-07", "Approval Agent", "Stalled approvals & DOA issues", "", 0, "Design", "Workflow", "Yes", "No self-approval", "Ageing / cycle", "", "", "", "", ""),
        ("AP-08", "Supplier Resolution Agent", "Draft supplier communications", "", 1, "Design", "Email/portal", "Human send approval default", "No contractual commitments", "On-time supplier FU", "", "", "", "", ""),
        ("AP-09", "Internal Follow-Up Agent", "Internal action drafts", "", 1, "Design", "Email/Teams", "Configurable", "No policy exceptions", "On-time internal FU", "", "", "", "", ""),
        ("AP-10", "Duplicate & Anomaly Agent", "Duplicate/anomaly indicators", "", 0, "Design", "Invoice history", "Yes", "Not a fraud guarantee", "FP/FN rates", "", "", "", "", ""),
        ("AP-11", "Vendor Statement Reconciliation Agent", "Statement vs AP recon", "", 0, "Design", "Statements/AP", "Yes", "No auto-write-offs", "Recon completeness", "", "", "", "", ""),
        ("AP-12", "Payment Proposal Review Agent", "Pre-payment analytical review", "", 0, "Design", "Payment run", "Always human payment auth", "Never authorises payment", "Payment-on-time / holds", "", "", "", "", ""),
        ("AP-13", "AP Close Agent", "Month-end completeness support", "", 0, "Design", "Open items/GRNI", "Yes", "No journal posting without owner", "Close checklist completion", "", "", "", "", ""),
        ("AP-14", "AP Reporting Agent", "Operating reports", "", 1, "Design", "Warehouse/ERP", "Yes for external", "No unaudited board numbers", "Report timeliness", "", "", "", "", ""),
        ("AP-15", "Root Cause Agent", "Systemic exception analysis", "", 0, "Design", "Exception history", "Yes for actions", "No org redesign alone", "Repeat exception rate", "", "", "", "", ""),
        ("AP-16", "AP Manager / Orchestrator", "Workforce supervision", "", 0, "Design", "All agent telemetry", "Yes", "No silent autonomy expansion", "STP / intervention / cost", "", "", "", "", ""),
    ]
    for i, row in enumerate(agents, 5):
        for j, v in enumerate(row, 1):
            ws.cell(row=i, column=j, value=v).border = thin

    hist = wb.create_sheet("Performance History")
    add_title(hist, "Performance history (append weekly)")
    h2 = ["Week starting", "Agent ID", "Autonomy", "Volume", "Accuracy", "FP rate", "Intervention rate", "Cost", "Incidents", "Decision"]
    for i, h in enumerate(h2, 1):
        hist.cell(row=4, column=i, value=h)
    style_header(hist, 4, len(h2))
    for r in range(5, 25):
        for c in range(1, len(h2) + 1):
            hist.cell(row=r, column=c).border = thin

    for sheet in wb.worksheets:
        autosize(sheet)
    path = OUT / "ER_AP_Agent_Registry.xlsx"
    wb.save(path)
    return path


def build_exception_tracker():
    wb = Workbook()
    ws = wb.active
    ws.title = "Exception Tracker"
    add_title(ws, "Evidence Room — AP Exception Tracker")
    headers = [
        "Exception ID",
        "Date opened",
        "Invoice #",
        "Supplier",
        "Amount",
        "Currency",
        "Taxonomy code",
        "Taxonomy name",
        "Risk level",
        "Owner",
        "Agent involved",
        "Status",
        "Root cause",
        "Resolution",
        "Date closed",
        "Age (days)",
        "Escalated?",
        "Evidence link",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))

    examples = [
        ("EX-1001", "2026-03-02", "INV-88421", "Northwind Supplies", 12450.00, "USD", "PRICE_MISMATCH", "Price mismatch", "Medium", "A. Chen", "AP-03/AP-04", "Open", "PO price outdated", "", "", 18, "No", ""),
        ("EX-1002", "2026-03-05", "INV-88490", "Contoso Logistics", 890.40, "USD", "MISSING_RECEIPT", "Missing receipt", "Medium", "J. Patel", "AP-05", "In progress", "GR not posted", "Follow-up sent", "", 15, "No", ""),
        ("EX-1003", "2026-03-08", "INV-88502", "Fabrikam Corp", 2200.00, "USD", "DUPLICATE_INVOICE", "Duplicate invoice", "High", "A. Chen", "AP-10", "Closed", "Resubmission", "Rejected duplicate", "2026-03-09", 1, "No", ""),
    ]
    for i, row in enumerate(examples, 5):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.border = thin
            if j == 5:
                cell.number_format = "#,##0.00"

    tax = wb.create_sheet("Taxonomy Codes")
    add_title(tax, "Exception taxonomy quick reference")
    codes = [
        ("MISSING_PO", "Missing PO", "High"),
        ("INVALID_PO", "Invalid PO", "High"),
        ("PO_CLOSED", "PO closed", "Medium"),
        ("PO_EXHAUSTED", "PO exhausted", "Medium"),
        ("PRICE_MISMATCH", "Price mismatch", "Medium"),
        ("QTY_MISMATCH", "Quantity mismatch", "Medium"),
        ("MISSING_RECEIPT", "Missing receipt", "Medium"),
        ("PARTIAL_RECEIPT", "Partial receipt", "Low"),
        ("DUPLICATE_INVOICE", "Duplicate invoice", "High"),
        ("POTENTIAL_DUPLICATE", "Potential duplicate", "High"),
        ("WRONG_SUPPLIER", "Wrong supplier", "High"),
        ("WRONG_LEGAL_ENTITY", "Incorrect legal entity", "High"),
        ("TAX_ISSUE", "Tax issue", "High"),
        ("APPROVAL_MISSING", "Approval missing", "High"),
        ("DOA_ISSUE", "DOA issue", "High"),
        ("CODING_MISSING", "Coding missing", "Medium"),
        ("INVALID_COST_CENTRE", "Invalid cost centre", "Medium"),
        ("INVOICE_QUALITY", "Invoice quality", "Low"),
        ("OCR_EXTRACTION", "OCR/extraction issue", "Medium"),
        ("MASTER_DATA", "Master-data issue", "High"),
        ("BANKING_CHANGE", "Banking-change concern", "Critical"),
        ("CREDIT_NOTE_REQUIRED", "Credit note required", "Medium"),
        ("STATEMENT_DISCREPANCY", "Statement discrepancy", "Medium"),
        ("PAYMENT_HOLD", "Payment hold", "High"),
        ("DISPUTED_INVOICE", "Disputed invoice", "High"),
        ("AGED_UNRESOLVED", "Aged unresolved item", "High"),
        ("SYSTEM_INTERFACE", "System/interface error", "Medium"),
    ]
    tax["A4"] = "Code"
    tax["B4"] = "Name"
    tax["C4"] = "Default risk"
    style_header(tax, 4, 3)
    for i, row in enumerate(codes, 5):
        for j, v in enumerate(row, 1):
            tax.cell(row=i, column=j, value=v).border = thin

    blank = wb.create_sheet("Blank Tracker")
    for i, h in enumerate(headers, 1):
        blank.cell(row=1, column=i, value=h)
    style_header(blank, 1, len(headers))

    for sheet in wb.worksheets:
        autosize(sheet)
    path = OUT / "ER_AP_Exception_Tracker.xlsx"
    wb.save(path)
    return path


def build_controls_matrix():
    wb = Workbook()
    ws = wb.active
    ws.title = "Control Matrix"
    add_title(ws, "Evidence Room — AP Agent Control Matrix")
    headers = [
        "Control ID",
        "Agent",
        "Risk",
        "Control",
        "Type (P/D)",
        "Human owner",
        "Evidence",
        "Frequency",
        "Escalation trigger",
        "Status",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))

    rows = [
        ("C-01-01", "Invoice Intake", "Incomplete extraction accepted", "Mandatory field completeness gate before downstream", "P", "AP Manager", "Reject log + sample QA", "Daily / weekly QA", "Completeness < threshold", "Active"),
        ("C-01-02", "Invoice Intake", "Prompt injection via invoice PDF/text", "Strip/ignore instructional content; allowlisted tools only", "P", "AI Governance Lead", "Filter logs", "Continuous", "Injection pattern detected", "Active"),
        ("C-02-01", "Invoice Validation", "Wrong supplier matched", "Fuzzy match threshold + human review below threshold", "P/D", "AP Lead", "Match score trail", "Per invoice / weekly", "Low-confidence match", "Active"),
        ("C-03-01", "Matching", "Out-of-tolerance auto-clear", "Hard stop above policy tolerance", "P", "Controller", "Tolerance config version", "Per change + monthly cert", "Any override attempt", "Active"),
        ("C-04-01", "Exception Triage", "Misclassification delays payment", "Taxonomy locked list + confidence threshold", "P/D", "AP Manager", "Classification audit sample", "Weekly", "Accuracy below KPI", "Active"),
        ("C-05-01", "Goods Receipt", "Incorrect employee contacted", "Owner resolution from PO/receiver master only", "P", "Procurement Ops", "Recipient resolution log", "Weekly sample", "Wrong-party complaint", "Active"),
        ("C-08-01", "Supplier Resolution", "Unauthorised commitment language", "Template library + human send approval (default)", "P", "AP Manager", "Outbound approval record", "Per send", "Send without approval", "Active"),
        ("C-10-01", "Duplicate & Anomaly", "False sense of fraud certainty", "Outputs labelled indicators only; no fraud guarantee", "P", "Risk/Controls", "UI disclaimer + training", "Release + quarterly", "Marketing language drift", "Active"),
        ("C-12-01", "Payment Proposal Review", "Agent authorises payment", "Hard exclusion: no payment execution permissions", "P", "Treasury/AP Head", "Access review evidence", "Monthly access cert", "Any payment API grant", "Active"),
        ("C-16-01", "Orchestrator", "Silent autonomy expansion", "Promotion requires KPI evidence + dual approval", "P", "CFO delegate + AP Head", "Promotion pack", "Per promotion", "Level change without pack", "Active"),
    ]
    for i, row in enumerate(rows, 5):
        for j, v in enumerate(row, 1):
            ws.cell(row=i, column=j, value=v).border = thin

    blank = wb.create_sheet("Blank Matrix")
    for i, h in enumerate(headers, 1):
        blank.cell(row=1, column=i, value=h)
    style_header(blank, 1, len(headers))

    for sheet in wb.worksheets:
        autosize(sheet)
    path = OUT / "ER_AP_Control_Matrix.xlsx"
    wb.save(path)
    return path


def build_implementation_roadmap():
    wb = Workbook()
    ws = wb.active
    ws.title = "Roadmap"
    add_title(
        ws,
        "Evidence Room — Implementation Roadmap",
        "Illustrative. One well-bounded agent may take 4–6 weeks; actual duration depends on systems, controls, data, governance.",
    )
    headers = ["Phase", "Name", "Objective", "Exit criteria", "Owner", "Start", "End", "Status", "% Complete", "Dependencies", "Risks"]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))
    phases = [
        ("0", "Baseline & readiness", "Score maturity and baseline KPIs", "Diagnostic complete; baseline recorded", "", "", "", "Not started", 0, "", ""),
        ("1", "Process discovery", "Map real AP workflow", "Process map + exception list signed", "", "", "", "Not started", 0, "Phase 0", ""),
        ("2", "Agent specification", "Write charter & exclusions", "Charter approved", "", "", "", "Not started", 0, "Phase 1", ""),
        ("3", "Data / tool access", "Least-privilege access ready", "Access certified", "", "", "", "Not started", 0, "Phase 2", ""),
        ("4", "Prototype", "Build recommend-only prototype", "Prototype outputs reviewed", "", "", "", "Not started", 0, "Phase 3", ""),
        ("5", "Historical testing", "Replay historical cases", "Accuracy thresholds met or gaps logged", "", "", "", "Not started", 0, "Phase 4", ""),
        ("6", "Shadow mode", "Live observe without action rights", "Shadow KPIs stable", "", "", "", "Not started", 0, "Phase 5", ""),
        ("7", "Controlled execution", "Limited prepare/execute guardrails", "Pilot exit criteria met", "", "", "", "Not started", 0, "Phase 6", ""),
        ("8", "Performance review", "Formal evidence review", "Go/no-go documented", "", "", "", "Not started", 0, "Phase 7", ""),
        ("9", "Responsibility progression", "Earned level change", "Dual approval of promotion pack", "", "", "", "Not started", 0, "Phase 8", ""),
        ("10", "Scale", "Expand scope carefully", "Scale checklist complete", "", "", "", "Not started", 0, "Phase 9", ""),
    ]
    for i, row in enumerate(phases, 5):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.border = thin
            if j == 9:
                cell.number_format = "0%"

    for sheet in wb.worksheets:
        autosize(sheet)
    path = TEAM_OUT / "ER_AP_Implementation_Roadmap.xlsx"
    wb.save(path)
    # also copy pointer path under Pro
    path2 = OUT / "ER_AP_Implementation_Roadmap.xlsx"
    wb.save(path2)
    return path2


def build_benefits_tracker():
    wb = Workbook()
    ws = wb.active
    ws.title = "Benefits Tracker"
    add_title(ws, "Evidence Room — Benefits Realisation Tracker", "Only record savings with Finance-validated evidence")
    headers = [
        "Benefit ID",
        "Description",
        "Category",
        "Baseline",
        "Actual",
        "Delta",
        "Financial value (USD)",
        "Validation status",
        "Evidence",
        "Owner",
        "Period",
        "Notes",
    ]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))
    example = [
        "BEN-001",
        "Hours released from duplicate triage",
        "Capacity",
        "40 hrs/mo",
        "28 hrs/mo",
        "12 hrs",
        900,
        "Pending validation",
        "Time study + sample",
        "AP Manager",
        "2026-Q2",
        "Illustrative example — replace",
    ]
    for j, v in enumerate(example, 1):
        ws.cell(row=5, column=j, value=v).border = thin
    for r in range(6, 26):
        for c in range(1, len(headers) + 1):
            ws.cell(row=r, column=c).border = thin
    autosize(ws)
    path = TEAM_OUT / "ER_AP_Benefits_Tracker.xlsx"
    wb.save(path)
    return path


def build_maturity_diagnostic():
    wb = Workbook()
    ws = wb.active
    ws.title = "Diagnostic Scorecard"
    add_title(ws, "Evidence Room — AP AI Readiness Diagnostic Scorecard", "35 questions · score 1–5 · email-capture lead magnet companion")
    headers = ["#", "Dimension", "Question", "Score (1-5)", "Evidence / notes", "Opportunity"]
    for i, h in enumerate(headers, 1):
        ws.cell(row=4, column=i, value=h)
    style_header(ws, 4, len(headers))

    questions = [
        ("Process", "Is the AP end-to-end process documented and current?"),
        ("Process", "Are exception types standardised in a shared taxonomy?"),
        ("Process", "Is there a clear RACI for invoice exceptions?"),
        ("Process", "Are SOPs version-controlled?"),
        ("Process", "Do you measure STP and exception rates weekly?"),
        ("Process", "Is month-end AP close checklist formalised?"),
        ("Data", "Is invoice data complete and structured at intake?"),
        ("Data", "Is vendor master quality monitored?"),
        ("Data", "Can you join invoice, PO, GR, and payment data reliably?"),
        ("Data", "Are historical exception outcomes retained for learning?"),
        ("Data", "Is OCR/extraction quality measured?"),
        ("Data", "Are bank/master-data change logs available to AP?"),
        ("Controls", "Is segregation of duties enforced for payments?"),
        ("Controls", "Are DOA rules system-enforced?"),
        ("Controls", "Is there an audit trail for overrides?"),
        ("Controls", "Are access reviews performed periodically?"),
        ("Controls", "Is there an AI/automation change-control process?"),
        ("Controls", "Are dual approvals required for high-risk actions?"),
        ("Technology", "Do you have workflow automation beyond email?"),
        ("Technology", "Is ERP integration stable for AP documents?"),
        ("Technology", "Can tools be permissioned at least-privilege?"),
        ("Technology", "Is there monitoring for automation failures?"),
        ("Technology", "Can you run shadow-mode pilots safely?"),
        ("Skills", "Does AP leadership understand agent vs RPA differences?"),
        ("Skills", "Are staff trained to review AI outputs critically?"),
        ("Skills", "Is there an internal automation/AI product owner?"),
        ("Skills", "Can the team facilitate process discovery workshops?"),
        ("Skills", "Is change management capability available?"),
        ("Governance", "Is there an approved AI use policy for Finance?"),
        ("Governance", "Are model/vendor risks assessed?"),
        ("Governance", "Is human accountability assigned for each automation?"),
        ("Governance", "Are KPIs defined before go-live?"),
        ("Governance", "Is there an incident response path for AI errors?"),
        ("Governance", "Is autonomy expansion gated by evidence?"),
        ("Governance", "Would a Finance Director stake reputation on current AI controls?"),
    ]
    for i, (dim, q) in enumerate(questions, 5):
        ws.cell(row=i, column=1, value=i - 4).border = thin
        ws.cell(row=i, column=2, value=dim).border = thin
        ws.cell(row=i, column=3, value=q).border = thin
        for c in range(4, 7):
            ws.cell(row=i, column=c).border = thin

    summary = wb.create_sheet("Maturity Summary")
    add_title(summary, "Dimension averages & maturity level")
    summary["A4"] = "Dimension"
    summary["B4"] = "Average score"
    summary["C4"] = "Maturity band"
    style_header(summary, 4, 3)
    dims = ["Process", "Data", "Controls", "Technology", "Skills", "Governance"]
    for i, d in enumerate(dims, 5):
        summary.cell(row=i, column=1, value=d).border = thin
        summary.cell(
            row=i,
            column=2,
            value=f'=AVERAGEIF(\'Diagnostic Scorecard\'!B:B,A{i},\'Diagnostic Scorecard\'!D:D)',
        ).border = thin
        summary.cell(
            row=i,
            column=3,
            value=f'=IF(B{i}<2,"1 Initial",IF(B{i}<3,"2 Emerging",IF(B{i}<4,"3 Structured",IF(B{i}<4.5,"4 Managed","5 Optimising"))))',
        ).border = thin
    summary["A12"] = "Overall average"
    summary["B12"] = "=AVERAGE(B5:B10)"
    summary["A14"] = "Scoring: 1=absent/ad hoc · 2=informal · 3=documented · 4=measured & controlled · 5=continuously improved with evidence"
    summary["A16"] = "Industry context (not a target): Ardent Partners 2025 avg exception 18.4%, STP 35.4%, cost/invoice $9.84; BIC cost $2.65."

    for sheet in wb.worksheets:
        autosize(sheet)
    path = FREE_OUT / "ER_AP_AI_Readiness_Diagnostic.xlsx"
    wb.save(path)
    return path


def build_business_case_model():
    # Extended model already largely in ROI; create dedicated workbook with dashboard feel
    wb = Workbook()
    ws = wb.active
    ws.title = "Business Case"
    add_title(ws, "Evidence Room — Transformation Business Case Model", "Conservative / Base / Upside · no false precision")

    ws["A4"] = "Organisation name"
    ws["B4"] = "[Your organisation]"
    ws["A5"] = "Prepared by"
    ws["B5"] = ""
    ws["A6"] = "Date"
    ws["B6"] = "2026-03-20"

    ws["A8"] = "KEY INPUTS"
    ws["A8"].font = Font(bold=True, color=INK)
    headers = ["Input", "Value"]
    for i, h in enumerate(headers, 1):
        ws.cell(row=9, column=i, value=h)
    style_header(ws, 9, 2)
    data = [
        ("Annual invoices", 180000),
        ("Current cost per invoice", 9.84),
        ("Target cost per invoice (illustrative)", 6.50),
        ("AP FTEs", 12),
        ("Loaded cost / FTE", 85000),
        ("One-time transformation investment", 120000),
        ("Annual run-rate AI/automation tools", 36000),
        ("Evidence Room Team licence (one-time)", 499),
    ]
    for i, (k, v) in enumerate(data, 10):
        ws.cell(row=i, column=1, value=k).border = thin
        cell = ws.cell(row=i, column=2, value=v)
        cell.border = thin
        cell.number_format = "#,##0.00"

    ws["A20"] = "SCENARIO RESULTS (illustrative)"
    ws["A20"].font = Font(bold=True, color=INK)
    for i, h in enumerate(["Metric", "Conservative", "Base", "Upside"], 1):
        ws.cell(row=21, column=i, value=h)
    style_header(ws, 21, 4)
    results = [
        ("Cost/invoice improvement vs current", "10%", "20%", "34%"),
        ("Annual processing cost baseline", "=B10*B11", "=B10*B11", "=B10*B11"),
        ("Annual processing cost scenario", "=B10*B11*0.9", "=B10*B11*0.8", "=B10*B11*0.66"),
        ("Gross annual benefit", "=B23-B24", "=C23-C24", "=D23-D24"),
        ("Net annual benefit (after tools)", "=B25-B16", "=C25-B16", "=D25-B16"),
        ("Simple payback (months)", "=IF(B26<=0,\"n/a\",(B15+B17)/(B26/12))", "=IF(C26<=0,\"n/a\",(B15+B17)/(C26/12))", "=IF(D26<=0,\"n/a\",(B15+B17)/(D26/12))"),
    ]
    for i, row in enumerate(results, 22):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.border = thin
            if j > 1 and i >= 23:
                cell.number_format = "#,##0"

    ws["A30"] = (
        "Disclaimer: Illustrative planning tool. Does not guarantee ROI or savings. "
        "External default $9.84 is Ardent Partners 2025 average cost per invoice (context only)."
    )
    ws.merge_cells("A30:D32")
    ws["A30"].alignment = Alignment(wrap_text=True)
    autosize(ws)
    path = OUT / "ER_AP_Business_Case_Model.xlsx"
    wb.save(path)
    return path


def main():
    paths = [
        build_roi_calculator(),
        build_kpi_scorecard(),
        build_agent_registry(),
        build_exception_tracker(),
        build_controls_matrix(),
        build_implementation_roadmap(),
        build_benefits_tracker(),
        build_maturity_diagnostic(),
        build_business_case_model(),
    ]
    for p in paths:
        print(f"Wrote {p}")


if __name__ == "__main__":
    main()
