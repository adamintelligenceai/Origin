#!/usr/bin/env python3
"""Generate Evidence Room working workbooks. Formulas over decoration."""

from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, Fill, PatternFill, Alignment, Border, Side, NamedStyle, Protection
from openpyxl.utils import get_column_letter
from openpyxl.chart import BarChart, Reference
from openpyxl.formatting.rule import ColorScaleRule, FormulaRule
from openpyxl.workbook.protection import WorkbookProtection
from openpyxl.chart.series import DataPoint
from openpyxl.chart.shapes import GraphicalProperties
from openpyxl.drawing.line import LineProperties
from openpyxl.chart.layout import Layout, ManualLayout

INK = "1A1C19"
PAPER = "F6F3EC"
MARK = "8B6914"
PERMIT = "2F4A3C"
HOLD = "8A3A2A"
RULE = "D4CFC3"
FIELD = "E8E4D9"
WHITE = "FFFCF7"

thin = Border(
    left=Side(style="thin", color=RULE),
    right=Side(style="thin", color=RULE),
    top=Side(style="thin", color=RULE),
    bottom=Side(style="thin", color=RULE),
)


def fill(hex_color):
    return PatternFill("solid", fgColor=hex_color)


def font(name="Calibri", size=11, bold=False, color=INK, italic=False):
    return Font(name=name, size=size, bold=bold, color=color, italic=italic)


def header_row(ws, row, values, widths=None):
    for i, v in enumerate(values, 1):
        c = ws.cell(row, i, v)
        c.font = font(size=10, bold=True, color=WHITE)
        c.fill = fill(INK)
        c.alignment = Alignment(wrap_text=True, vertical="center")
        c.border = thin
    ws.row_dimensions[row].height = 28


def style_cell(c, wrap=True):
    c.font = font()
    c.alignment = Alignment(wrap_text=wrap, vertical="center")
    c.border = thin


def banner(ws, title, subtitle, cols=8):
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=cols)
    a = ws.cell(1, 1, "EVIDENCE ROOM  ·  AP AGENT OS")
    a.font = font(size=10, bold=True, color=MARK)
    a.fill = fill(PAPER)
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=cols)
    b = ws.cell(2, 1, title)
    b.font = font(size=18, bold=True)
    b.fill = fill(PAPER)
    ws.merge_cells(start_row=3, start_column=1, end_row=3, end_column=cols)
    c = ws.cell(3, 1, subtitle)
    c.font = font(size=11, italic=True, color="5C6158")
    c.fill = fill(PAPER)
    ws.row_dimensions[1].height = 18
    ws.row_dimensions[2].height = 24
    ws.row_dimensions[3].height = 18
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.oddHeader.left.text = "Evidence Room"
    ws.oddFooter.left.text = "Proof before permission.  ·  Not a savings guarantee."
    ws.oddFooter.right.text = "ILLUSTRATIVE cells are labelled. Buyer cells are [BUYER]."


def autosize(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w


def write_note(ws, row, text, cols=8):
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=cols)
    c = ws.cell(row, 1, text)
    c.font = font(size=9, italic=True, color="5C6158")
    c.alignment = Alignment(wrap_text=True)
    ws.row_dimensions[row].height = 36


ROOT = Path("/workspace/EVIDENCE_ROOM")


def diagnostic_workbook():
    path = ROOT / "01_FREE_AP_AI_READINESS" / "ER_AP_AI_Readiness_Scorecard.xlsx"
    wb = Workbook()
    domains = [
        ("Process integrity", "PI"),
        ("Data & systems", "DS"),
        ("Controls & audit", "CA"),
        ("Exception economics", "EE"),
        ("Talent & operating model", "TO"),
        ("Agent readiness", "AR"),
    ]
    questions = []
    stems = {
        "PI": [
            "Invoice channels are documented (email, portal, EDI, scan) with an owner per channel.",
            "PO vs non-PO policy is written and used, not tribal.",
            "Matching rules (2-way / 3-way / tolerances) are published per category.",
            "Exception reason codes exist and are used on the queue.",
            "Aged exceptions have a named owner and a clock.",
            "Month-end AP completeness (GR/IR, unprocessed, blocked) has a checklist.",
        ],
        "DS": [
            "Invoice image/PDF is retrievable from the case, not only a posted header.",
            "Vendor master quality is measured (duplicates, inactive, bank-change trail).",
            "PO, GR, invoice, and payment keys can be joined without a hero spreadsheet.",
            "Legal entity / company code is reliable on the invoice packet.",
            "Tax fields are captured and reconcilable to policy, not free text.",
            "Interface failures are visible (not silent drops).",
        ],
        "CA": [
            "A named human is accountable for AP posting quality.",
            "Segregation of duties exists between vendor bank-change and payment release.",
            "Delegation of authority is current and system-enforced where the ERP allows.",
            "Overrides are logged with reason and approver.",
            "Evidence retention period is defined for invoices, approvals, and queries.",
            "Internal Audit or Controls can sample an invoice end-to-end in one sitting.",
        ],
        "EE": [
            "Monthly invoice volume is known by entity and channel.",
            "Exception rate is measured (not guessed).",
            "Average resolution minutes are measured for the top three exception families.",
            "Cost per invoice (or a proxy) is calculated at least annually.",
            "Duplicate detection exists before payment proposal.",
            "Late-payment / early-discount impact is known enough to put in a case, even if rough.",
        ],
        "TO": [
            "AP roles are named (intake, match, query, payments, close) — not 'the team'.",
            "Workload is visible (queue, ageing, not inbox heroics).",
            "Procurement / receiving / AP have a working escalation path.",
            "A process owner exists who can change a rule, not only a ticket.",
            "Training for a new processor is documented.",
            "Shared-services vs in-country split is written down.",
        ],
        "AR": [
            "AI / automation work in AP has a named owner (not 'innovation').",
            "Any existing bot or model has a written scope and a kill-switch.",
            "Output is sampled against a gold set or dual-review, not vibes.",
            "Autonomy is not assumed; observe/recommend is the default conversation.",
            "Data-privacy review path exists before sending invoices to a model.",
            "Leadership will accept L0 evidence before asking for L3.",
        ],
    }
    for domain, code in domains:
        for i, stem in enumerate(stems[code], 1):
            questions.append((f"{code}-{i:02d}", domain, stem))

    intro = wb.active
    intro.title = "START"
    banner(intro, "AP AI Readiness Diagnostic — Scorecard", "36 questions · 0–4 rubric · unweighted · 30–40 minutes. Proof before permission.", 6)
    intro["A5"] = "How to score"
    intro["A5"].font = font(size=13, bold=True)
    notes = [
        "0 = Absent / unknown. 1 = Informal / hero-dependent. 2 = Partial / uneven. 3 = Documented and mostly used. 4 = Operated, sampled, and evidenced.",
        "Do not score what you hope is true. Score what you can show on Monday.",
        "Unweighted: 36 × 4 = 144. Domain subtotals (0–24) matter more than the headline.",
        "Hard brakes: if CA-02 (bank-change vs payment SoD) is 0–1, do not interpret a high AR score as permission to execute.",
        "No industry target is pre-filled. Deloitte / APQC / Hackett figures are market context in the PDF, not your score.",
        "Yellow cells on Answers are [BUYER] inputs. Do not overwrite formulas on Results.",
    ]
    for i, n in enumerate(notes, 6):
        intro.merge_cells(start_row=i, start_column=1, end_row=i, end_column=6)
        intro.cell(i, 1, n).alignment = Alignment(wrap_text=True)
        intro.row_dimensions[i].height = 22
    intro["A13"] = "Organisation (optional)"
    intro["B13"] = "[BUYER legal name]"
    intro["A14"] = "Scored by"
    intro["B14"] = "[BUYER name / role]"
    intro["A15"] = "Date"
    intro["B15"] = "[YYYY-MM-DD]"
    intro["A16"] = "Entities in scope"
    intro["B16"] = "[BUYER]"
    autosize(intro, [28, 40, 18, 18, 18, 18])

    ans = wb.create_sheet("Answers")
    banner(ans, "Answers", "Enter Score 0–4 only. Rubric text is a reminder — do not score the reminder.", 6)
    header_row(ans, 5, ["ID", "Domain", "Question", "Score 0–4", "Evidence pointer", "Notes"])
    for i, (qid, domain, stem) in enumerate(questions, 6):
        ans.cell(i, 1, qid).font = font(name="Consolas", size=10)
        ans.cell(i, 2, domain)
        ans.cell(i, 3, stem)
        sc = ans.cell(i, 4, None)
        sc.fill = fill("FFF3BF")
        sc.border = thin
        sc.alignment = Alignment(horizontal="center")
        ans.cell(i, 5, "").fill = fill(WHITE)
        ans.cell(i, 6, "")
        for col in range(1, 7):
            style_cell(ans.cell(i, col))
        sc.fill = fill("FFF3BF")
    write_note(ans, 43, "Validation: scores outside 0–4 will flag on Results. Blank is treated as unanswered, not zero.")
    autosize(ans, [10, 24, 78, 14, 28, 28])

    res = wb.create_sheet("Results")
    banner(res, "Results", "Formulas only. Do not type over this sheet.", 6)
    header_row(res, 5, ["Domain", "Answered", "Sum", "Max possible", "Domain %", "Maturity hint"])
    # Answers occupy rows 6-41
    for i, (domain, code) in enumerate(domains):
        r = 6 + i
        res.cell(r, 1, domain)
        # answered count
        start = 6 + i * 6
        end = start + 5
        res.cell(r, 2, f'=COUNT(Answers!D{start}:D{end})')
        res.cell(r, 3, f'=SUM(Answers!D{start}:D{end})')
        res.cell(r, 4, f"=B{r}*4")
        res.cell(r, 5, f'=IF(D{r}=0,"—",C{r}/D{r})')
        res.cell(r, 5).number_format = "0%"
        res.cell(r, 6, f'=IF(B{r}<6,"Incomplete",IF(E{r}<0.25,"1 Unprepared",IF(E{r}<0.45,"2 Experimental",IF(E{r}<0.65,"3 Governed pilot",IF(E{r}<0.85,"4 Earned scale","5 Institutional")))))')
        for col in range(1, 7):
            style_cell(res.cell(r, col))
    res.cell(13, 1, "TOTAL")
    res.cell(13, 1).font = font(bold=True)
    res.cell(13, 2, "=SUM(B6:B11)")
    res.cell(13, 3, "=SUM(C6:C11)")
    res.cell(13, 4, "=SUM(D6:D11)")
    res.cell(13, 5, '=IF(D13=0,"—",C13/D13)')
    res.cell(13, 5).number_format = "0%"
    res.cell(13, 6, '=IF(B13<36,"Incomplete — do not over-interpret",IF(E13<0.25,"1 Unprepared",IF(E13<0.45,"2 Experimental",IF(E13<0.65,"3 Governed pilot",IF(E13<0.85,"4 Earned scale","5 Institutional")))))')
    for col in range(1, 7):
        style_cell(res.cell(13, col))
        res.cell(13, col).fill = fill(FIELD)
    res["A15"] = "Hard brake"
    res["B15"] = '=IF(Answers!D18="","Unanswered CA-02",IF(Answers!D18<=1,"BRAKE — SoD too weak to interpret Agent readiness as execute-ready","OK — SoD not at 0–1"))'
    res["B15"].font = font(bold=True, color=HOLD)
    res.merge_cells("B15:F15")
    res["A17"] = "Out-of-range scores"
    res["B17"] = '=COUNTIFS(Answers!D6:D41,">4")+COUNTIFS(Answers!D6:D41,"<0")'
    write_note(res, 19, "Maturity bands are interpretive aids, not a certification. A high score is not permission to pay autonomously.")
    autosize(res, [26, 14, 12, 16, 14, 42])

    heat = wb.create_sheet("Heatmap")
    banner(heat, "Opportunity heatmap", "Buyer-scored. Volume × pain × control risk × data readiness. Not a vendor ranking.", 6)
    header_row(heat, 5, ["Candidate (first-wave agent)", "Volume 1–5", "Pain 1–5", "Control risk 1–5 (higher = more sensitive)", "Data readiness 1–5", "Priority index (vol×pain×data / risk)"])
    agents = [
        "01 Invoice Intake",
        "02 Invoice Validation",
        "03 Matching",
        "04 Exception Triage",
        "05 Goods Receipt",
        "07 Approval",
        "08 Supplier Resolution",
        "09 Internal Follow-Up",
        "10 Duplicate & Anomaly",
        "16 Orchestrator",
    ]
    for i, a in enumerate(agents, 6):
        heat.cell(i, 1, a)
        for col in range(2, 6):
            heat.cell(i, col, None).fill = fill("FFF3BF")
            style_cell(heat.cell(i, col))
        heat.cell(i, 6, f'=IF(OR(B{i}="",C{i}="",D{i}="",E{i}=""),"",IF(D{i}=0,"", (B{i}*C{i}*E{i})/D{i}))')
        style_cell(heat.cell(i, 1))
        style_cell(heat.cell(i, 6))
    write_note(heat, 17, "Higher index = better first-slice candidate only if control risk is honestly scored. Do not game risk down to force Intake into execute.")
    autosize(heat, [32, 14, 12, 36, 18, 36])

    kpi = wb.create_sheet("Baseline_KPI")
    banner(kpi, "Baseline KPI worksheet", "Buyer fills actuals. No fake industry targets.", 5)
    header_row(kpi, 5, ["KPI", "Your figure", "Period", "Source system / extract", "Owner"])
    kpis = [
        "Monthly invoice volume",
        "Exception rate %",
        "Straight-through / first-pass yield % (define locally)",
        "Median days invoice receipt → post",
        "Aged exceptions > 15 days (count)",
        "Duplicate invoices detected pre-payment (count)",
        "Cost per invoice (fully loaded proxy)",
        "AP FTE (or hours) on exceptions",
        "On-time payment %",
        "Missing GR open items (count)",
    ]
    for i, k in enumerate(kpis, 6):
        kpi.cell(i, 1, k)
        kpi.cell(i, 2, None).fill = fill("FFF3BF")
        for col in range(1, 6):
            style_cell(kpi.cell(i, col))
        kpi.cell(i, 2).fill = fill("FFF3BF")
    autosize(kpi, [52, 16, 16, 32, 22])

    case = wb.create_sheet("Case_starter")
    banner(case, "Business-case starter (inputs only)", "No promised savings. Feeds the Professional model later.", 4)
    header_row(case, 5, ["Input", "Value", "Unit", "Notes"])
    inputs = [
        ("Monthly invoices", "", "count", "[BUYER]"),
        ("AP operational FTE", "", "FTE", "Processors + exception + query"),
        ("Fully loaded cost per FTE / year", "", "currency", "Use local loaded rate"),
        ("Manual-touch share", "", "0–1", "Invoices with ≥1 human touch"),
        ("Exception rate", "", "0–1", "From your queue, not a blog"),
        ("Avg resolution minutes", "", "minutes", "Top families if overall unknown"),
        ("AI / tool cost / month (expected)", "", "currency", "Leave blank if unknown"),
        ("Implementation hours (expected)", "", "hours", "Internal + external"),
    ]
    for i, (a, b, c, d) in enumerate(inputs, 6):
        case.cell(i, 1, a)
        case.cell(i, 2, b).fill = fill("FFF3BF")
        case.cell(i, 3, c)
        case.cell(i, 4, d)
        for col in range(1, 5):
            style_cell(case.cell(i, col))
        case.cell(i, 2).fill = fill("FFF3BF")
    write_note(case, 15, "Conservative / Base / Upside efficiency ranges belong in the Professional ROI workbook. This sheet only captures inputs.")
    autosize(case, [40, 16, 14, 40])
    wb.save(path)
    return path


def roi_workbook():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "ER_AP_Agent_Business_Case.xlsx"
    wb = Workbook()
    inp = wb.active
    inp.title = "Inputs"
    banner(inp, "AP Agent business case — inputs", "Yellow = [BUYER]. Scenarios apply efficiency ranges only. Not a guarantee.", 5)
    header_row(inp, 5, ["ID", "Input", "Value", "Unit", "Notes"])
    rows = [
        ("I-01", "Monthly invoice volume", 8400, "invoices", "ILLUSTRATIVE ACME default — overwrite"),
        ("I-02", "AP operational headcount", 14, "FTE", "Processors, exception, query — not whole finance"),
        ("I-03", "Fully loaded labour cost / FTE / year", 85000, "currency", "Overwrite with local loaded cost"),
        ("I-04", "Manual-touch percentage", 0.62, "0–1", "Share with ≥1 human touch"),
        ("I-05", "Exception rate", 0.22, "0–1", "Do not paste a blog rate without measuring"),
        ("I-06", "Average resolution minutes", 18, "minutes", "Clocked, not hoped"),
        ("I-07", "Known duplicate rate (detected)", 0.004, "0–1", "Detected, not 'fraud'"),
        ("I-08", "Late-payment cost / year (known)", 0, "currency", "0 if unknown — do not invent"),
        ("I-09", "Early-pay discount missed / year", 0, "currency", "0 if unknown"),
        ("I-10", "Current processing cost / invoice (if known)", 0, "currency", "0 = model will derive labour proxy"),
        ("I-11", "AI / tool cost / year", 36000, "currency", "Licences + inference envelope"),
        ("I-12", "Implementation cost (one-off)", 45000, "currency", "Internal time + external if any"),
        ("I-13", "Working months / year", 12, "months", "Usually 12"),
    ]
    for i, (a, b, c, d, e) in enumerate(rows, 6):
        inp.cell(i, 1, a).font = font(name="Consolas", size=10)
        inp.cell(i, 2, b)
        cell = inp.cell(i, 3, c)
        cell.fill = fill("FFF3BF")
        if isinstance(c, float) and c <= 1:
            cell.number_format = "0.0%"
        elif isinstance(c, (int, float)) and c >= 100:
            cell.number_format = "#,##0"
        inp.cell(i, 4, d)
        inp.cell(i, 5, e)
        for col in range(1, 6):
            style_cell(inp.cell(i, col))
        inp.cell(i, 3).fill = fill("FFF3BF")
    inp["A20"] = "Scenario efficiency (share of current exception-touch hours that could be released — NOT a promise)"
    inp["A20"].font = font(bold=True)
    header_row(inp, 21, ["Scenario", "Efficiency range (of exception hours)", "Hours-release haircut (realisation)", "Cash conversion of released hours", "Use"])
    scenarios = [
        ("Conservative", 0.10, 0.50, 0.00, "Capacity only; no cash until Controller signs"),
        ("Base", 0.22, 0.65, 0.25, "Partial backfill avoided"),
        ("Upside", 0.35, 0.75, 0.40, "Still not a guarantee"),
    ]
    for i, (a, b, c, d, e) in enumerate(scenarios, 22):
        inp.cell(i, 1, a)
        inp.cell(i, 2, b).number_format = "0%"
        inp.cell(i, 3, c).number_format = "0%"
        inp.cell(i, 4, d).number_format = "0%"
        inp.cell(i, 5, e)
        for col in range(1, 6):
            style_cell(inp.cell(i, col))
            if col in (2, 3, 4):
                inp.cell(i, col).fill = fill("FFF3BF")
    write_note(inp, 26, "Hackett 19 Nov 2025 software-adopter figures (60% touchless, 3.5× productivity at ≥30% touchless) are NOT inputs. Deloitte 8 Oct 2025: 63% AI deployed / 21% measurable ROI — treat ROI as something you must evidence, not copy.")
    autosize(inp, [16, 52, 18, 36, 48])

    calc = wb.create_sheet("Model")
    banner(calc, "Model", "Labour-proxy economics. Validated savings require a Controller signature — see Benefits tracker.", 6)
    labels = [
        (5, "Annual invoices", "=Inputs!C6*Inputs!C18"),
        (6, "Annual labour cost (AP ops)", "=Inputs!C7*Inputs!C8"),
        (7, "Derived labour $ / invoice", "=IF(B5=0,0,B6/B5)"),
        (8, "Exception invoices / year", "=B5*Inputs!C10"),
        (9, "Exception hours / year", "=B8*Inputs!C11/60"),
        (10, "Exception labour $ / year", "=IF(Inputs!C7=0,0,B9*(Inputs!C8/1800))"),
        (11, "Processing $ / invoice used", '=IF(Inputs!C15>0,Inputs!C15,B7)'),
        (12, "Baseline processing $ / year", "=B11*B5"),
        (13, "Late + missed discount (known only)", "=Inputs!C13+Inputs!C14"),
        (14, "Baseline total $ (labour proxy + known cash)", "=B6+B13"),
        (15, "AI + tool $ / year", "=Inputs!C16"),
        (16, "Implementation $ (one-off)", "=Inputs!C17"),
    ]
    calc["A5"].font = font(bold=True)
    for r, label, formula in labels:
        calc.cell(r, 1, label)
        calc.cell(r, 2, formula)
        calc.cell(r, 2).number_format = "#,##0.00"
        style_cell(calc.cell(r, 1))
        style_cell(calc.cell(r, 2))
    header_row(calc, 18, ["Output", "Conservative", "Base", "Upside", "Unit", "Definition"])
    # Conservative row 22 on Inputs
    outs = [
        ("Hours released (after haircut)",
         "=Model!B9*Inputs!B22*Inputs!C22",
         "=Model!B9*Inputs!B23*Inputs!C23",
         "=Model!B9*Inputs!B24*Inputs!C24",
         "hours",
         "Exception hours × efficiency × realisation haircut"),
        ("Capacity $ (not cash)",
         "=B19*(Inputs!C8/1800)",
         "=C19*(Inputs!C8/1800)",
         "=D19*(Inputs!C8/1800)",
         "currency",
         "Hours × loaded hourly (1800 h/FTE)"),
        ("Cash from released hours (conversion %)",
         "=B20*Inputs!D22",
         "=C20*Inputs!D23",
         "=D20*Inputs!D24",
         "currency",
         "Only the converted slice is treated as cash-like"),
        ("Known cash levers used",
         "=Model!B13*0.15",
         "=Model!B13*0.30",
         "=Model!B13*0.45",
         "currency",
         "Applied only if I-08/I-09 > 0. If zero, stays zero."),
        ("Gross annual benefit (cash-like)",
         "=B21+B22",
         "=C21+C22",
         "=D21+D22",
         "currency",
         "Converted hours + known cash levers"),
        ("Net annual (after AI run-cost)",
         "=B23-Model!B15",
         "=C23-Model!B15",
         "=D23-Model!B15",
         "currency",
         "Does not amortise implementation"),
        ("Payback years (impl / net)",
         '=IF(B24<=0,"No payback",Model!B16/B24)',
         '=IF(C24<=0,"No payback",Model!B16/C24)',
         '=IF(D24<=0,"No payback",Model!B16/D24)',
         "years",
         "One-off / net annual. Blank if net ≤ 0"),
        ("ROI year-1 (net - impl) / impl",
         '=IF(Model!B16=0,"n/a",(B24-Model!B16)/Model!B16)',
         '=IF(Model!B16=0,"n/a",(C24-Model!B16)/Model!B16)',
         '=IF(Model!B16=0,"n/a",(D24-Model!B16)/Model!B16)',
         "ratio",
         "Negative is allowed and informative"),
    ]
    for i, row in enumerate(outs, 19):
        for col, val in enumerate(row, 1):
            calc.cell(i, col, val)
            style_cell(calc.cell(i, col))
            if col in (2, 3, 4) and i not in (25, 26):
                calc.cell(i, col).number_format = "#,##0"
            if i == 25 and col in (2, 3, 4):
                calc.cell(i, col).number_format = "0.00"
            if i == 26 and col in (2, 3, 4):
                calc.cell(i, col).number_format = "0%"
    write_note(calc, 28, "If Conservative net is negative, that is a finding — not a reason to invent a larger efficiency. Do not present Upside as the board case.")
    autosize(calc, [42, 18, 16, 16, 12, 52])

    sens = wb.create_sheet("Sensitivity")
    banner(sens, "Sensitivity", "Exception rate vs efficiency (Base realisation and conversion). Illustrative grid.", 8)
    header_row(sens, 5, ["Exception rate →", 0.10, 0.16, 0.22, 0.28, 0.34, "Note"])
    for col in range(2, 7):
        sens.cell(5, col).number_format = "0%"
    efficiencies = [0.10, 0.16, 0.22, 0.28, 0.35]
    sens["A6"] = "Efficiency ↓  /  Net annual $"
    for i, eff in enumerate(efficiencies, 7):
        sens.cell(i, 1, eff).number_format = "0%"
        for j, ex in enumerate(range(2, 7)):
            # Net = exception hours * eff * 0.65 * hourly * 0.25 - AI cost
            # exception hours = volume*12*ex_rate*minutes/60
            sens.cell(i, ex, f"=Inputs!$C$6*Inputs!$C$18*{get_column_letter(ex)}$5*Inputs!$C$11/60*$A{i}*Inputs!$C$23*(Inputs!$C$8/1800)*Inputs!$D$23-Inputs!$C$16")
            sens.cell(i, ex).number_format = "#,##0"
            style_cell(sens.cell(i, ex))
        style_cell(sens.cell(i, 1))
    write_note(sens, 13, "Grid uses Base haircut and Base cash conversion. It is a thinking tool, not a forecast.")
    autosize(sens, [28, 14, 14, 14, 14, 14, 28])

    disc = wb.create_sheet("Disclaimers")
    banner(disc, "Disclaimers", "This workbook does not certify savings, ROI, fraud prevention, or compliance.", 4)
    lines = [
        "Evidence Room provides a model. The buyer provides the facts.",
        "Released hours are not cash until a Controller decides not to backfill or to reduce overtime / contractor.",
        "Agent 10 findings are not a fraud opinion.",
        "Do not cite Hackett or Deloitte numbers as your results.",
        "Counsel and tax advisers are not replaced by this file.",
    ]
    for i, line in enumerate(lines, 5):
        disc.merge_cells(start_row=i, start_column=1, end_row=i, end_column=4)
        disc.cell(i, 1, line)
    autosize(disc, [40, 20, 20, 20])
    wb.save(path)
    return path


def kpi_scorecard():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "KPI_and_Measurement" / "ER_KPI_Scorecard.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Scorecard"
    banner(ws, "Agent KPI scorecard", "One row per KPI per agent per period. No composite 'AI score'.", 10)
    header_row(ws, 5, [
        "Period", "Agent", "KPI ID", "Family", "Actual", "n", "n_min", "Publish?",
        "Target (buyer)", "Owner",
    ])
    families = [
        ("AG-01", "KPI-ACC-EXT", "Operational"),
        ("AG-01", "KPI-ACT-INV", "Activity"),
        ("AG-02", "KPI-ACC-CLS", "Operational"),
        ("AG-03", "KPI-ACC-MAT", "Operational"),
        ("AG-03", "KPI-OPS-STP", "Operational"),
        ("AG-04", "KPI-OPS-RES", "Operational"),
        ("AG-04", "KPI-OPS-RPT", "Operational"),
        ("AG-10", "KPI-OPS-DUP", "Operational"),
        ("AG-10", "KPI-RSK-FPR", "Risk-control"),
        ("AG-12", "KPI-RSK-BRK", "Risk-control"),
        ("AG-00", "KPI-FIN-CPI", "Financial"),
        ("AG-00", "KPI-FIN-HRS", "Financial"),
        ("AG-00", "KPI-FIN-SAV", "Financial"),
        ("AG-00", "KPI-RSK-AUD", "Risk-control"),
        ("AG-00", "KPI-OPS-AGE", "Operational"),
        ("AG-00", "KPI-OPS-T2P", "Operational"),
    ]
    for i, (ag, kid, fam) in enumerate(families, 6):
        ws.cell(i, 1, "2026-09")
        ws.cell(i, 2, ag)
        ws.cell(i, 3, kid)
        ws.cell(i, 4, fam)
        ws.cell(i, 5, None).fill = fill("FFF3BF")
        ws.cell(i, 6, None).fill = fill("FFF3BF")
        ws.cell(i, 7, 30)
        ws.cell(i, 8, f'=IF(OR(E{i}="",F{i}=""),"Incomplete",IF(F{i}<G{i},"Count only","Publish"))')
        ws.cell(i, 9, None).fill = fill("FFF3BF")
        ws.cell(i, 10, "[BUYER]")
        for col in range(1, 11):
            style_cell(ws.cell(i, col))
        ws.cell(i, 5).fill = fill("FFF3BF")
        ws.cell(i, 6).fill = fill("FFF3BF")
        ws.cell(i, 9).fill = fill("FFF3BF")
    write_note(ws, 24, "If Publish? = Count only, do not put a percentage in an exec pack. Financial KPIs require Controller validation before the word 'savings' is used.")
    autosize(ws, [12, 10, 16, 14, 12, 10, 10, 14, 16, 16])

    dic = wb.create_sheet("Dictionary_index")
    banner(dic, "KPI index", "Full definitions live in 01_KPI_DICTIONARY.md", 4)
    header_row(dic, 5, ["KPI ID", "Name", "Family", "Formula (short)"])
    idx = [
        ("KPI-ACC-CLS", "Classification accuracy", "Operational", "correct / scored"),
        ("KPI-ACC-EXT", "Extraction accuracy", "Operational", "critical fields correct / scored"),
        ("KPI-ACC-MAT", "Matching accuracy", "Operational", "match decision = gold / scored"),
        ("KPI-RSK-FPR", "False-positive rate", "Risk-control", "false alarms / flagged"),
        ("KPI-RSK-FNR", "False-negative rate", "Risk-control", "misses / gold-positives"),
        ("KPI-OPS-RES", "Exception resolution rate", "Operational", "resolved / exceptions"),
        ("KPI-OPS-STP", "Straight-through rate", "Operational", "STP with evidence / invoices"),
        ("KPI-OPS-HUM", "Human intervention rate", "Operational", "touched / invoices"),
        ("KPI-OPS-ART", "Average resolution time", "Operational", "sum minutes / resolved"),
        ("KPI-OPS-T2P", "Time to post", "Operational", "median receipt→post"),
        ("KPI-ACT-INV", "Invoices handled", "Activity", "count"),
        ("KPI-ACT-EXC", "Exceptions handled", "Activity", "count"),
        ("KPI-OPS-RPT", "Repeat exception rate", "Operational", "repeats / exceptions"),
        ("KPI-OPS-DUP", "Duplicates detected", "Operational", "count (not payments prevented unless proven)"),
        ("KPI-FIN-CPI", "Cost per invoice", "Financial", "AP ops cost / invoices"),
        ("KPI-FIN-HRS", "Hours released", "Financial", "measured, then Controller-classified"),
        ("KPI-FIN-SAV", "Validated financial savings", "Financial", "signed, not modelled"),
        ("KPI-RSK-BRK", "Control breaches", "Risk-control", "count"),
        ("KPI-RSK-AUD", "Audit exceptions", "Risk-control", "count"),
        ("KPI-OPS-AGE", "Ageing >15 days", "Operational", "count or $"),
    ]
    for i, row in enumerate(idx, 6):
        for col, v in enumerate(row, 1):
            dic.cell(i, col, v)
            style_cell(dic.cell(i, col))
    autosize(dic, [16, 32, 14, 44])
    wb.save(path)
    return path


def agent_registry():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "Templates" / "ER_Agent_Registry.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Registry"
    banner(ws, "Agent registry", "One row per agent × entity × slice. Ceiling is not a vibe.", 12)
    header_row(ws, 5, [
        "Agent ID", "Agent name", "Entity", "Slice", "Human owner",
        "Current level", "Ceiling", "Last promotion date", "Evidence pack ID",
        "Kill-switch", "Status", "Notes",
    ])
    names = [
        "AG-01 Invoice Intake", "AG-02 Invoice Validation", "AG-03 Matching",
        "AG-04 Exception Triage", "AG-05 Goods Receipt", "AG-06 PO Quality",
        "AG-07 Approval", "AG-08 Supplier Resolution", "AG-09 Internal Follow-Up",
        "AG-10 Duplicate & Anomaly", "AG-11 Vendor Statement Rec",
        "AG-12 Payment Proposal Review", "AG-13 AP Close", "AG-14 AP Reporting",
        "AG-15 Root Cause", "AG-16 Orchestrator",
    ]
    for i, name in enumerate(names, 6):
        aid, aname = name.split(" ", 1)
        ws.cell(i, 1, aid)
        ws.cell(i, 2, aname)
        ws.cell(i, 3, "[BUYER entity]")
        ws.cell(i, 4, "[channel × type]")
        ws.cell(i, 5, "[named human]")
        ws.cell(i, 6, "L0")
        ws.cell(i, 7, "L1")
        ws.cell(i, 8, "")
        ws.cell(i, 9, "")
        ws.cell(i, 10, "Armed")
        ws.cell(i, 11, "Observe")
        ws.cell(i, 12, "")
        for col in range(1, 13):
            style_cell(ws.cell(i, col))
        for col in (3, 4, 5):
            ws.cell(i, col).fill = fill("FFF3BF")
    write_note(ws, 23, "Default current level is L0. Do not set L3 in this register without a promotion file. Agent 12 ceiling never includes payment release.")
    autosize(ws, [12, 28, 18, 20, 20, 14, 12, 18, 18, 14, 12, 24])
    hist = wb.create_sheet("Performance_history")
    banner(hist, "Performance history", "Append-only. One row per review.", 8)
    header_row(hist, 5, ["Date", "Agent ID", "Entity", "Slice", "Level tested", "KPI pack ID", "Decision", "Signed by"])
    autosize(hist, [12, 12, 16, 18, 14, 16, 16, 16])
    wb.save(path)
    return path


def exception_tracker():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "Controls" / "ER_Exception_Tracker.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Queue"
    banner(ws, "Exception tracker", "Primary code only. UNMAPPED is a holding status, not a home.", 12)
    header_row(ws, 5, [
        "case_id", "invoice_id", "entity", "vendor_id", "primary_code",
        "amount", "owner_role", "owner_name", "opened", "sla_clock",
        "status", "agent_last",
    ])
    codes = ["EX-PO-001", "EX-MAT-001", "EX-GR-001", "EX-DUP-002", "EX-APR-001", "UNMAPPED"]
    for i, code in enumerate(codes, 6):
        ws.cell(i, 1, f"ACME-2026-0{i}")
        ws.cell(i, 2, f"INV-ILLUS-{i:04d}")
        ws.cell(i, 3, "ACME-US")
        ws.cell(i, 4, f"V{1000+i}")
        ws.cell(i, 5, code)
        ws.cell(i, 6, 2500 * i).number_format = "#,##0.00"
        ws.cell(i, 7, "Exception owner")
        ws.cell(i, 8, "[BUYER]")
        ws.cell(i, 9, "2026-09-01")
        ws.cell(i, 10, "2026-09-03")
        ws.cell(i, 11, "Open")
        ws.cell(i, 12, "AG-04")
        for col in range(1, 13):
            style_cell(ws.cell(i, col))
        if code == "UNMAPPED":
            ws.cell(i, 5).fill = fill("F4C7C3")
    write_note(ws, 13, "ACME rows are ILLUSTRATIVE. Delete before live use. Duplicate this sheet as Blank_queue.")
    autosize(ws, [16, 16, 12, 12, 14, 12, 16, 14, 12, 12, 12, 12])

    blank = wb.create_sheet("Blank_queue")
    banner(blank, "Blank queue", "Reusable. No sample rows.", 12)
    header_row(blank, 5, [
        "case_id", "invoice_id", "entity", "vendor_id", "primary_code",
        "amount", "owner_role", "owner_name", "opened", "sla_clock",
        "status", "agent_last",
    ])
    for r in range(6, 26):
        for c in range(1, 13):
            style_cell(blank.cell(r, c))
            blank.cell(r, c).fill = fill("FFF3BF") if c in (1, 2, 5, 8) else fill(WHITE)
    autosize(blank, [16, 16, 12, 12, 14, 12, 16, 14, 12, 12, 12, 12])

    tax = wb.create_sheet("Taxonomy_index")
    banner(tax, "Taxonomy index", "Full cards in 03_EXCEPTION_TAXONOMY.md", 4)
    header_row(tax, 5, ["Code", "Name", "Risk", "First owner"])
    idx = [
        ("EX-PO-001", "Missing PO", "M", "Requester / Buyer"),
        ("EX-PO-002", "Invalid PO", "M", "Buyer"),
        ("EX-PO-003", "PO closed", "M", "Buyer"),
        ("EX-PO-004", "PO exhausted", "M", "Buyer"),
        ("EX-MAT-001", "Price mismatch", "M", "Buyer / AP match"),
        ("EX-MAT-002", "Quantity mismatch", "M", "Receiver / Buyer"),
        ("EX-GR-001", "Missing receipt", "M", "Receiver"),
        ("EX-GR-002", "Partial receipt", "L–M", "Receiver"),
        ("EX-DUP-001", "Duplicate invoice", "H", "AP Controls"),
        ("EX-DUP-002", "Potential duplicate", "H", "AP Controls"),
        ("EX-MDM-001", "Wrong supplier", "H", "Master data / AP"),
        ("EX-MDM-002", "Incorrect legal entity", "H", "AP / Controller"),
        ("EX-TAX-001", "Tax issue", "H", "Tax / AP"),
        ("EX-APR-001", "Approval missing", "M", "Approver"),
        ("EX-APR-002", "DOA issue", "H", "Controller"),
        ("EX-COD-001", "Coding missing", "M", "Requester"),
        ("EX-COD-002", "Invalid cost centre", "M", "Requester / Finance"),
        ("EX-QLT-001", "Invoice quality", "M", "Supplier / Intake"),
        ("EX-QLT-002", "OCR / extraction issue", "M", "Intake"),
        ("EX-MDM-003", "Master-data issue", "M", "Master data"),
        ("EX-PAY-001", "Banking-change concern", "C", "Treasury / Controls — human"),
        ("EX-PAY-002", "Payment hold", "H", "Payments Lead"),
        ("EX-CN-001", "Credit note required", "M", "Supplier / AP"),
        ("EX-STM-001", "Statement discrepancy", "M", "Reconciliations"),
        ("EX-DSP-001", "Disputed invoice", "H", "Business owner"),
        ("EX-AGE-001", "Aged unresolved item", "M", "Exception lead"),
        ("EX-SYS-001", "System / interface error", "H", "Finance Systems"),
    ]
    for i, row in enumerate(idx, 6):
        for col, v in enumerate(row, 1):
            tax.cell(i, col, v)
            style_cell(tax.cell(i, col))
        if row[2] == "C":
            tax.cell(i, 3).fill = fill("F4C7C3")
    autosize(tax, [14, 28, 10, 28])
    wb.save(path)
    return path


def control_matrix():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "Controls" / "ER_Control_Matrix.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Matrix"
    banner(ws, "AP Agent control matrix", "Agents do not own controls. Humans do.", 8)
    header_row(ws, 5, [
        "Agent", "Risk", "Control", "Preventive / Detective",
        "Human owner", "Evidence", "Frequency", "Escalation trigger",
    ])
    rows = [
        ("AG-01 Intake", "Wrong extract treated as fact", "Cite-check critical fields to source image", "Detective", "AP Supervisor", "Cite-check log + image ID", "Sample daily / 100%", "Any amount field fail"),
        ("AG-01 Intake", "Silent channel drop", "Channel completeness recon to mailbox/EDI log", "Detective", "Intake Lead", "Recon file", "Daily", "Unmatched inbound > SLA"),
        ("AG-02 Validation", "Incomplete invoice posted", "Mandatory field gate before match", "Preventive", "AP Team Lead", "Gate reject log", "Every case", "Bypass of gate"),
        ("AG-03 Matching", "False match within tolerance", "Tolerance table versioned; residual stated", "Preventive", "AP Processor / Controller (table)", "Tolerance version + residual", "Every case", "Tolerance change without C2"),
        ("AG-04 Triage", "Wrong owner / code", "Primary code from taxonomy only", "Preventive", "Exception Lead", "Code + packet", "Every case", "UNMAPPED > 24h"),
        ("AG-05 GR", "Invented receipt", "Agent cannot post GR; recommend only", "Preventive", "Plant AP liaison", "Packet without GR post", "Every case", "Any write attempt"),
        ("AG-06 PO Quality", "Repeat PO defect ignored", "Defect ticket with evidence to Procurement", "Detective", "Procurement Ops", "Ticket ID", "Weekly", "Same vendor defect ≥ n"),
        ("AG-07 Approval", "Stale DoA", "DoA extract date + approver active check", "Preventive", "AP Supervisor", "DoA version", "Every routing", "Approver departed"),
        ("AG-08 Supplier", "Unauthorised send", "Send-gate default human", "Preventive", "Vendor Desk", "Send approval ID", "Every send", "Send without gate"),
        ("AG-09 Internal", "Chase-storm / wrong person", "Owner from RACI, not model guess", "Preventive", "Query Desk", "Owner field + source", "Every chase", "Second wrong owner"),
        ("AG-10 Duplicate", "Missed duplicate payment", "Pre-post + pre-pay last look", "Detective", "AP Controls", "Pair IDs + decision", "Every invoice + proposal", "EX-DUP-001 on paid item"),
        ("AG-10 Duplicate", "Treated as fraud finding", "Language standard: anomaly not fraud", "Preventive", "AP Controls", "Output template", "Every output", "Word 'fraud' in output"),
        ("AG-11 Statement", "Timing difference posted as miss", "Age + status before chase", "Detective", "Reconciliations", "Rec file", "Per statement", "Write-off without Controller"),
        ("AG-12 Pay review", "Agent releases payment", "No payment verb in tool list; human authorises", "Preventive", "Payments Lead / Treasury", "Proposal pack + human sign", "Every run", "Any release API call"),
        ("AG-12 Pay review", "Bank-change on proposal", "EX-PAY-001 forces human class", "Preventive", "Treasury", "Hold reason", "Every hit", "Bank change + pay same cycle"),
        ("AG-13 Close", "Incomplete GR/IR", "Close checklist with open-item extract", "Detective", "AP Manager", "Checklist + extract hash", "Monthly", "Sign-off with open critical"),
        ("AG-14 Reporting", "Vanity metric pack", "KPI family split; unsigned savings omitted", "Preventive", "AP Manager", "Pack version", "Weekly / monthly", "Unsigned $ in exec pack"),
        ("AG-15 Root cause", "Fix without evidence", "Minimum n and gold before change request", "Preventive", "Process Owner", "Cause file", "Per theme", "Config change without C2"),
        ("AG-16 Orchestrator", "Skip gate", "Refuse packet missing evidence_refs", "Preventive", "AP Manager", "Reject log", "Every hand-off", "Forced override"),
        ("ALL", "Prompt injection via invoice text", "Untrusted text sandboxed; tools allow-listed", "Preventive", "Finance Systems", "Tool allow-list version", "Release", "Tool call outside list"),
        ("ALL", "Model change silent", "Pin hash; C2+ for model swap", "Preventive", "Finance Systems", "Pin + change record", "Each release", "Unpinned model in prod"),
        ("ALL", "Autonomy creep", "Registry ceiling vs applied level sampled", "Detective", "AP Manager", "Registry + sample", "Weekly", "Applied > ceiling"),
    ]
    for i, row in enumerate(rows, 6):
        for col, v in enumerate(row, 1):
            ws.cell(i, col, v)
            style_cell(ws.cell(i, col))
    autosize(ws, [22, 32, 44, 20, 24, 26, 16, 28])
    wb.save(path)
    return path


def roadmap():
    path = ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "ER_Implementation_Roadmap.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Phases"
    banner(ws, "Implementation roadmap", "Duration depends on systems, controls, data, and governance. 4–6 weeks is one bounded agent, not the estate.", 8)
    header_row(ws, 5, ["Phase", "Name", "Objective", "Exit evidence", "Typical owner", "Status", "Start", "End"])
    phases = [
        ("0", "Baseline and readiness", "Score diagnostic; name owners; pick slice", "Completed scorecard + named registry rows", "Transformation + AP Manager", "Not started", "", ""),
        ("1", "Process discovery", "Observe as-done work", "Discovery pack + sample list", "Process owner", "Not started", "", ""),
        ("2", "Agent specification", "Charter for first agent", "Signed charter at L0", "Human owner", "Not started", "", ""),
        ("3", "Data / tool access", "Read paths, allow-list, privacy", "Access ticket + DPIA/privacy note", "Finance Systems", "Not started", "", ""),
        ("4", "Prototype", "Offline or boxed run", "Prototype log", "Owner + FinSys", "Not started", "", ""),
        ("5", "Historical testing", "Gold-first labelled pack", "Scores + confusion notes", "Owner + QA", "Not started", "", ""),
        ("6", "Shadow mode", "Live, no action permissions", "Shadow report", "Owner", "Not started", "", ""),
        ("7", "Controlled execution", "Allow-list only, at-most-once", "Pilot file + incidents", "Owner + Controls", "Not started", "", ""),
        ("8", "Performance review", "Compare to baseline", "Review minutes", "AP Manager", "Not started", "", ""),
        ("9", "Responsibility progression", "One increment if evidence", "Promotion pack or stay", "Controller + owner", "Not started", "", ""),
        ("10", "Scale", "Next slice or next agent — not both at once", "Updated registry", "AP Manager", "Not started", "", ""),
    ]
    for i, row in enumerate(phases, 6):
        for col, v in enumerate(row, 1):
            ws.cell(i, col, v)
            style_cell(ws.cell(i, col))
        ws.cell(i, 6).fill = fill("FFF3BF")
        ws.cell(i, 7).fill = fill("FFF3BF")
        ws.cell(i, 8).fill = fill("FFF3BF")
    write_note(ws, 18, "ILLUSTRATIVE 4–6 week path for ONE agent (default Intake L0 + Duplicate companion): Phases 0–6 in weeks 1–4, Phase 7 only if evidence, Phase 8–9 in week 5–6. Integrations and DoA delays add time.")
    autosize(ws, [8, 26, 36, 36, 24, 14, 12, 12])
    wb.save(path)
    return path


def benefits():
    path = ROOT / "04_AP_AGENT_OS_TEAM" / "Implementation" / "ER_Benefits_Tracker.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Register"
    banner(ws, "Benefits realisation tracker", "Unsigned savings do not enter an exec pack.", 9)
    header_row(ws, 5, [
        "Benefit ID", "Type (capacity / cash / control)", "Description",
        "Modelled $", "Validated $", "Controller signed", "Date signed",
        "Evidence", "Status",
    ])
    samples = [
        ("BEN-01", "capacity", "Exception minutes down on EX-GR-001 slice", 0, 0, "No", "", "", "Hypothesis"),
        ("BEN-02", "control", "Duplicate last-look before proposal (count of holds)", 0, 0, "No", "", "", "Hypothesis"),
        ("BEN-03", "cash", "Avoided late fees — only if I-08 known", 0, 0, "No", "", "", "Not started"),
    ]
    for i, row in enumerate(samples, 6):
        for col, v in enumerate(row, 1):
            ws.cell(i, col, v)
            style_cell(ws.cell(i, col))
        ws.cell(i, 4).number_format = "#,##0"
        ws.cell(i, 5).number_format = "#,##0"
        ws.cell(i, 5).fill = fill("FFF3BF")
        ws.cell(i, 6).fill = fill("FFF3BF")
    ws["A10"] = "Validated total (signed only)"
    ws["B10"] = '=SUMIF(F6:F20,"Yes",E6:E20)'
    ws["B10"].number_format = "#,##0"
    write_note(ws, 12, "Modelled $ may come from the business-case workbook. It is not a result.")
    autosize(ws, [12, 26, 48, 12, 12, 16, 12, 20, 14])
    wb.save(path)
    return path


def implementation_tracker():
    path = ROOT / "04_AP_AGENT_OS_TEAM" / "Implementation" / "ER_Implementation_Tracker.xlsx"
    wb = Workbook()
    ws = wb.active
    ws.title = "Tracker"
    banner(ws, "Implementation tracker", "Team Edition. One increment at a time.", 8)
    header_row(ws, 5, ["ID", "Work item", "Phase", "Owner", "Due", "Status", "Evidence", "Blocker"])
    items = [
        ("T-01", "Complete diagnostic scorecard", "0", "[BUYER]", "", "Not started", "", ""),
        ("T-02", "Appoint human owners for AG-01 and AG-10", "0", "AP Manager", "", "Not started", "", ""),
        ("T-03", "Select entity × channel × invoice type slice", "0", "AP Manager", "", "Not started", "", ""),
        ("T-04", "Observe 8–12 live cases", "1", "Process owner", "", "Not started", "", ""),
        ("T-05", "Draft AG-01 charter at L0", "2", "Intake owner", "", "Not started", "", ""),
        ("T-06", "Privacy / access note for invoice images", "3", "Finance Systems", "", "Not started", "", ""),
        ("T-07", "Build gold set (labels first)", "5", "QA + owner", "", "Not started", "", ""),
        ("T-08", "Shadow week", "6", "Owner", "", "Not started", "", ""),
        ("T-09", "Steering paper (no unsigned $)", "8", "Transformation", "", "Not started", "", ""),
        ("T-10", "Promotion decision or stay at L0/L1", "9", "Controller", "", "Not started", "", ""),
    ]
    for i, row in enumerate(items, 6):
        for col, v in enumerate(row, 1):
            ws.cell(i, col, v)
            style_cell(ws.cell(i, col))
        ws.cell(i, 6).fill = fill("FFF3BF")
    autosize(ws, [8, 48, 8, 18, 12, 14, 20, 20])
    wb.save(path)
    return path


def main():
    paths = [
        diagnostic_workbook(),
        roi_workbook(),
        kpi_scorecard(),
        agent_registry(),
        exception_tracker(),
        control_matrix(),
        roadmap(),
        benefits(),
        implementation_tracker(),
    ]
    for p in paths:
        print(p)


if __name__ == "__main__":
    main()
