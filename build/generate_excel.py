"""Generate Evidence Room Excel/CSV spreadsheets."""
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from content_data import AGENTS, EXCEPTIONS, KPI_FRAMEWORK, DIAGNOSTIC_QUESTIONS, RESEARCH_LEDGER

ROOT = Path(__file__).resolve().parent.parent / "evidence-room"
HEADER_FONT = Font(bold=True, color="FFFFFF", size=11)
HEADER_FILL = PatternFill("solid", fgColor="0F4C5C")
THIN = Border(left=Side(style="thin"), right=Side(style="thin"), top=Side(style="thin"), bottom=Side(style="thin"))


def style_header(ws, row=1):
    for cell in ws[row]:
        if cell.value:
            cell.font = HEADER_FONT
            cell.fill = HEADER_FILL
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
            cell.border = THIN


def auto_width(ws, max_width=50):
    for col in ws.columns:
        letter = col[0].column_letter
        length = max(len(str(c.value or "")) for c in col)
        ws.column_dimensions[letter].width = min(max(length + 2, 12), max_width)


def save_wb(wb, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(path)
    print(f"  Created {path.relative_to(ROOT.parent)}")


def gen_roi_calculator():
    wb = Workbook()
    ws = wb.active
    ws.title = "Inputs"
    inputs = [
        ("Monthly invoice volume", 5000, "invoices"),
        ("AP headcount (FTE)", 12, "people"),
        ("Fully loaded labour cost (annual)", 65000, "USD/FTE"),
        ("Manual touch rate (%)", 68, "%"),
        ("Exception rate (%)", 16, "%"),
        ("Avg exception resolution (minutes)", 25, "min"),
        ("Duplicate invoice rate (%)", 0.8, "%"),
        ("Avg cost per duplicate incident", 2500, "USD"),
        ("Current cost per invoice", 9.4, "USD"),
        ("AI/tool monthly cost", 3500, "USD"),
        ("Implementation cost (one-time)", 75000, "USD"),
        ("Efficiency improvement - Conservative (%)", 15, "%"),
        ("Efficiency improvement - Base (%)", 30, "%"),
        ("Efficiency improvement - Upside (%)", 45, "%"),
    ]
    ws.append(["Input", "Value", "Unit", "Notes"])
    for row in inputs:
        ws.append(list(row) + [""])
    style_header(ws)

    ws2 = wb.create_sheet("Outputs")
    ws2.append(["Metric", "Conservative", "Base", "Upside"])
    formulas = [
        ["Annual invoice volume", "=Inputs!B2*12", "=Inputs!B2*12", "=Inputs!B2*12"],
        ["Annual AP labour cost", "=Inputs!B3*Inputs!B4", "=Inputs!B3*Inputs!B4", "=Inputs!B3*Inputs!B4"],
        ["Baseline processing cost", "=B2*Inputs!B10", "=C2*Inputs!B10", "=D2*Inputs!B10"],
        ["Hours on manual touch (annual)", "=B2*Inputs!B5/100*8/60", "=C2*Inputs!B5/100*8/60", "=D2*Inputs!B5/100*8/60"],
        ["Exception volume (annual)", "=B2*Inputs!B6/100", "=C2*Inputs!B6/100", "=D2*Inputs!B6/100"],
        ["Efficiency gain (%)", "=Inputs!B13", "=Inputs!B14", "=Inputs!B15"],
        ["Est. hours released", "=B5*Inputs!B13/100", "=C5*Inputs!B14/100", "=D5*Inputs!B15/100"],
        ["Est. labour savings (USD)", "=B8*Inputs!B4/2080", "=C8*Inputs!B4/2080", "=D8*Inputs!B4/2080"],
        ["Duplicate prevention savings", "=B2*Inputs!B8/100*Inputs!B9", "=C2*Inputs!B8/100*Inputs!B9", "=D2*Inputs!B8/100*Inputs!B9"],
        ["Total annual benefit", "=B10+B11", "=C10+C11", "=D10+D11"],
        ["Total annual cost (tools)", "=Inputs!B11*12", "=Inputs!B11*12", "=Inputs!B11*12"],
        ["Net annual benefit", "=B12-B13", "=C12-C13", "=D12-D13"],
        ["Payback (months)", "=Inputs!B12/(B14/12)", "=Inputs!B12/(C14/12)", "=Inputs!B12/(D14/12)"],
        ["3-year ROI (%)", "=(B14*3-Inputs!B12)/Inputs!B12*100", "=(C14*3-Inputs!B12)/Inputs!B12*100", "=(D14*3-Inputs!B12)/Inputs!B12*100"],
    ]
    for row in formulas:
        ws2.append(row)
    style_header(ws2)
    ws2.append([])
    ws2.append(["DISCLAIMER: Illustrative model only. Results depend on implementation scope, data quality, and organisational factors. Not a guarantee of savings."])
    auto_width(ws)
    auto_width(ws2)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/Business_Case/AP_Agent_ROI_Calculator.xlsx")


def gen_kpi_scorecard():
    wb = Workbook()
    ws = wb.active
    ws.title = "KPI Definitions"
    ws.append(["Category", "Metric", "Definition", "Formula", "Target Direction", "Baseline", "Current", "Target", "Owner", "Frequency"])
    for k in KPI_FRAMEWORK:
        ws.append([k["category"], k["metric"], k["definition"], k["formula"], k["target_direction"], "", "", "", "", "Monthly"])
    style_header(ws)
    ws2 = wb.create_sheet("Agent Scorecard")
    ws2.append(["Agent Code", "Agent Name", "Autonomy Level", "Classification Accuracy", "False Positive Rate", "Volume Handled", "Human Intervention Rate", "Cost per Outcome", "Status", "Notes"])
    for a in AGENTS:
        ws2.append([a["code"], a["name"], a["default_autonomy"], "", "", "", "", "", "Not Deployed", ""])
    style_header(ws2)
    auto_width(ws)
    auto_width(ws2)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/KPI_and_Measurement/AP_Agent_KPI_Scorecard.xlsx")


def gen_agent_registry():
    wb = Workbook()
    ws = wb.active
    ws.title = "Agent Registry"
    headers = ["ID", "Code", "Name", "Purpose", "Human Owner", "Default Autonomy", "Status", "Deploy Date", "Last Review", "Performance Rating"]
    ws.append(headers)
    for a in AGENTS:
        ws.append([a["id"], a["code"], a["name"], a["purpose"], a["human_owner"], a["default_autonomy"], "Planned", "", "", ""])
    style_header(ws)
    ws2 = wb.create_sheet("Agent Specifications")
    spec_headers = ["Code", "Name", "Inputs", "Tools", "Responsibilities", "Exclusions", "Controls", "KPIs", "Escalation"]
    ws2.append(spec_headers)
    for a in AGENTS:
        ws2.append([a["code"], a["name"], "; ".join(a["inputs"]), "; ".join(a["tools"]), "; ".join(a["responsibilities"]), "; ".join(a["exclusions"]), "; ".join(a["controls"]), "; ".join(a["kpis"]), a["escalation"]])
    style_header(ws2)
    auto_width(ws)
    auto_width(ws2)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/Agent_Library/AP_Agent_Registry.xlsx")


def gen_exception_tracker():
    wb = Workbook()
    ws = wb.active
    ws.title = "Exception Taxonomy"
    ws.append(["Code", "Category", "Definition", "Root Cause", "Data Required", "Resolution", "Responsible", "Escalation", "Agent", "Automation Potential", "Risk Level"])
    for e in EXCEPTIONS:
        ws.append([e["code"], e["category"], e["definition"], e["root_cause"], e["data_required"], e["resolution"], e["responsible"], e["escalation"], e["agent"], e["automation"], e["risk"]])
    style_header(ws)
    ws2 = wb.create_sheet("Exception Tracker")
    ws2.append(["Date", "Invoice Ref", "Exception Code", "Category", "Amount", "Owner", "Status", "Age (days)", "Resolution", "Agent Assigned", "Notes"])
    style_header(ws2)
    auto_width(ws)
    auto_width(ws2)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/Templates/AP_Exception_Tracker.xlsx")


def gen_controls_matrix():
    wb = Workbook()
    ws = wb.active
    ws.title = "Control Matrix"
    controls = [
        ("Invoice Intake", "Incorrect routing", "Sender verification + entity rules", "Preventive", "AP Ops Lead", "Intake logs", "Per transaction", "Misroute >2%"),
        ("Validation", "Duplicate payment", "Duplicate detection before posting", "Detective", "AP Manager", "Duplicate check log", "Per invoice", "Duplicate override"),
        ("Matching", "Unauthorised variance approval", "Tolerance limits by category", "Preventive", "AP Matching Lead", "Tolerance config + audit", "Per match", "Variance >threshold"),
        ("Exception Triage", "Misclassification", "Human review sample + taxonomy version", "Detective", "AP Exception Mgr", "Triage audit log", "Weekly sample", "Accuracy <95%"),
        ("Goods Receipt", "Fictitious receipt", "No auto-receipt creation", "Preventive", "AP Ops Lead", "Follow-up log", "Per request", "Any auto-receipt attempt"),
        ("Approval", "Self-approval", "Segregation from payment agent", "Preventive", "AP Manager", "Approval audit trail", "Per approval", "SoD breach"),
        ("Supplier Resolution", "Unauthorised commitment", "Human approval on all comms", "Preventive", "Supplier Relations", "Comm approval log", "Per communication", "Unapproved send"),
        ("Duplicate & Anomaly", "False fraud claim", "Conservative thresholds + human review", "Detective", "AP Controls Lead", "Investigation log", "Per flag", "Block without review"),
        ("Payment Review", "Unauthorised payment", "Cannot execute payments", "Preventive", "Treasury Lead", "Review report", "Per batch", "Missing approval"),
        ("AP Close", "Premature accrual", "Controller review gate", "Detective", "Controller", "Close checklist", "Monthly", "Material misstatement"),
        ("Orchestrator", "Runaway autonomy", "Kill switch + autonomy approval", "Preventive", "AP Director", "Autonomy change log", "Per change", "Unapproved L3+"),
        ("All Agents", "Prompt injection", "Input sanitisation + output validation", "Preventive", "IT Security", "Security test results", "Per release", "Injection detected"),
        ("All Agents", "Hallucination", "Grounding + confidence thresholds", "Detective", "AP Manager", "Validation audit", "Daily sample", "Accuracy below SLA"),
        ("All Agents", "Data privacy breach", "Least privilege + PII masking", "Preventive", "DPO/Privacy", "Access logs", "Continuous", "Unauthorised access"),
    ]
    ws.append(["Agent", "Risk", "Control", "Type", "Human Owner", "Evidence", "Frequency", "Escalation Trigger"])
    for c in controls:
        ws.append(list(c))
    style_header(ws)
    auto_width(ws)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/Controls/AP_Agent_Control_Matrix.xlsx")


def gen_implementation_roadmap():
    wb = Workbook()
    ws = wb.active
    ws.title = "Roadmap"
    phases = [
        (0, "Baseline & Readiness", "Complete diagnostic, establish KPIs, secure sponsorship", "2 weeks", "AP Manager", "Not Started"),
        (1, "Process Discovery", "Walkthroughs, transcription, process maps, exception baseline", "3 weeks", "Transformation Lead", "Not Started"),
        (2, "Agent Specification", "Select first agent, write charter, define controls", "2 weeks", "AP Manager", "Not Started"),
        (3, "Data & Tool Access", "ERP integration, data pipeline, test environment", "3 weeks", "IT + AP", "Not Started"),
        (4, "Prototype", "Build agent workflow, configure rules", "2 weeks", "Automation Lead", "Not Started"),
        (5, "Historical Testing", "Run against 3-12 months historical data", "2 weeks", "AP Analyst", "Not Started"),
        (6, "Shadow Mode", "Agent operates without action permissions", "3 weeks", "AP Manager", "Not Started"),
        (7, "Controlled Execution", "Limited users/transactions/categories", "4 weeks", "AP Manager", "Not Started"),
        (8, "Performance Review", "Compare against baseline, audit sample", "1 week", "Transformation Lead", "Not Started"),
        (9, "Responsibility Progression", "Evaluate autonomy level increase", "1 week", "AP Director", "Not Started"),
        (10, "Scale", "Deploy additional agents, expand scope", "Ongoing", "AP Director", "Not Started"),
    ]
    ws.append(["Phase", "Name", "Activities", "Duration", "Owner", "Status", "Start Date", "End Date", "Notes"])
    for p in phases:
        ws.append(list(p) + ["", "", ""])
    style_header(ws)
    auto_width(ws)
    save_wb(wb, ROOT / "03_AP_AGENT_OS_PRO/Templates/AP_Implementation_Roadmap.xlsx")


def gen_maturity_diagnostic():
    wb = Workbook()
    ws = wb.active
    ws.title = "Diagnostic"
    ws.append(["#", "Dimension", "Question", "Weight", "Score (0-5)", "Weighted Score", "Notes"])
    for i, q in enumerate(DIAGNOSTIC_QUESTIONS, 1):
        ws.append([i, q["dimension"], q["question"], q["weight"], "", f"=E{i+1}*D{i+1}", ""])
    ws.append([])
    ws.append(["", "", "TOTAL WEIGHTED SCORE", "", "", f"=SUM(F2:F{len(DIAGNOSTIC_QUESTIONS)+1})", ""])
    ws.append(["", "", "MAX POSSIBLE", "", "", f"=SUM(D2:D{len(DIAGNOSTIC_QUESTIONS)+1})*5", ""])
    ws.append(["", "", "READINESS %", "", "", "=F{}/F{}*100".format(len(DIAGNOSTIC_QUESTIONS)+3, len(DIAGNOSTIC_QUESTIONS)+4), ""])
    style_header(ws)
    ws2 = wb.create_sheet("Maturity Model")
    ws2.append(["Level", "Name", "Score Range", "Description"])
    levels = [
        (1, "Ad Hoc", "0-25%", "No documented processes, manual AP, no automation strategy"),
        (2, "Emerging", "26-45%", "Some automation, inconsistent metrics, early AI interest"),
        (3, "Defined", "46-65%", "Documented processes, KPIs tracked, pilot-ready"),
        (4, "Managed", "66-85%", "Systematic automation, governance framework, active pilots"),
        (5, "Optimised", "86-100%", "Agent workforce operational, measured autonomy progression"),
    ]
    for l in levels:
        ws2.append(l)
    style_header(ws2)
    auto_width(ws)
    auto_width(ws2)
    save_wb(wb, ROOT / "01_FREE_AP_AI_READINESS/AP_AI_Readiness_Diagnostic.xlsx")


def gen_benefits_tracker():
    wb = Workbook()
    ws = wb.active
    ws.title = "Benefits Tracker"
    ws.append(["Benefit ID", "Category", "Description", "Baseline", "Target", "Current", "Measurement Method", "Owner", "Status", "Evidence"])
    benefits = [
        ("BEN-001", "Efficiency", "Cost per invoice reduction", "$9.40", "$6.00", "", "Monthly KPI report", "AP Manager", "Planned", ""),
        ("BEN-002", "Efficiency", "Straight-through processing rate", "33%", "55%", "", "ERP analytics", "AP Manager", "Planned", ""),
        ("BEN-003", "Efficiency", "Exception resolution time", "3.2 days", "1.5 days", "", "Exception tracker", "AP Manager", "Planned", ""),
        ("BEN-004", "Financial", "Duplicate payments prevented", "0", "5/year", "", "Duplicate agent log", "AP Controls", "Planned", ""),
        ("BEN-005", "Financial", "Human hours released (annual)", "0", "2000", "", "Time study", "Transformation", "Planned", ""),
        ("BEN-006", "Risk", "Control breaches", "TBD", "0", "", "Audit log", "Internal Audit", "Planned", ""),
        ("BEN-007", "Quality", "Supplier inquiry reduction", "22%", "12%", "", "Helpdesk metrics", "AP Manager", "Planned", ""),
        ("BEN-008", "Quality", "Month-end close acceleration", "TBD", "-2 days", "", "Close calendar", "Controller", "Planned", ""),
    ]
    for b in benefits:
        ws.append(list(b))
    style_header(ws)
    auto_width(ws)
    save_wb(wb, ROOT / "04_AP_AGENT_OS_TEAM/Implementation/Benefits_Realisation_Tracker.xlsx")


def gen_business_case_model():
    wb = Workbook()
    ws = wb.active
    ws.title = "Business Case"
    ws.append(["Section", "Item", "Year 1", "Year 2", "Year 3", "Notes"])
    rows = [
        ("Costs", "Evidence Room AP Agent OS licence", 199, 0, 0, "One-time Professional purchase"),
        ("Costs", "Implementation consulting", 50000, 25000, 10000, "Internal + external"),
        ("Costs", "AI/tool subscriptions", 42000, 48000, 54000, "Scales with volume"),
        ("Costs", "Integration development", 75000, 15000, 5000, "Front-loaded"),
        ("Costs", "Training & change management", 15000, 5000, 3000, ""),
        ("Benefits", "Labour efficiency", 120000, 180000, 220000, "Conservative estimate"),
        ("Benefits", "Duplicate prevention", 12500, 15000, 15000, ""),
        ("Benefits", "Early payment discount capture", 8000, 12000, 15000, ""),
        ("Benefits", "Error/rework reduction", 25000, 35000, 40000, ""),
        ("Net", "Net benefit", "=C7-C2-C3-C4-C5-C6", "=D7+D8+D9+D10-D3-D4-D6", "=E7+E8+E9+E10-E3-E4-E6", ""),
    ]
    for r in rows:
        ws.append(list(r))
    style_header(ws)
    auto_width(ws)
    save_wb(wb, ROOT / "04_AP_AGENT_OS_TEAM/Implementation/Transformation_Business_Case_Model.xlsx")


def gen_research_ledger():
    wb = Workbook()
    ws = wb.active
    ws.title = "Research Ledger"
    ws.append(["Claim", "Source", "Date", "URL", "Context", "Type"])
    for r in RESEARCH_LEDGER:
        ws.append([r["claim"], r["source"], r["date"], r["url"], r["context"], r["type"]])
    style_header(ws)
    auto_width(ws)
    save_wb(wb, ROOT / "09_RESEARCH/Evidence_Room_Research_Ledger.xlsx")


def generate_all():
    print("Generating Excel spreadsheets...")
    gen_roi_calculator()
    gen_kpi_scorecard()
    gen_agent_registry()
    gen_exception_tracker()
    gen_controls_matrix()
    gen_implementation_roadmap()
    gen_maturity_diagnostic()
    gen_benefits_tracker()
    gen_business_case_model()
    gen_research_ledger()
    print("Excel generation complete.")


if __name__ == "__main__":
    generate_all()
