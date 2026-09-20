#!/usr/bin/env python3
"""Evidence Room commercial PDF pack — reportlab builder."""
from __future__ import annotations

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
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
    Table,
    TableStyle,
)

INK = HexColor("#0B1F2A")
PAPER = HexColor("#F7F4EE")
AMBER = HexColor("#C47A2C")
TEAL = HexColor("#1F5C5C")
RULE = HexColor("#8A8580")
HAIR = HexColor("#D9D2C7")
MUTED = HexColor("#3D4F5A")
ALT = HexColor("#EFEBE3")
OUT = Path(__file__).resolve().parents[1] / "exports" / "pdf"
PAGE = LETTER
M = 0.75 * inch
CONF = "CONFIDENTIAL — Evidence Room · Licensed materials · Agents that earn responsibility."


def sty():
    return {
        "cb": ParagraphStyle("cb", fontName="Times-Bold", fontSize=26, textColor=PAPER, leading=32, spaceAfter=6),
        "ctag": ParagraphStyle("ctag", fontName="Helvetica", fontSize=11, textColor=AMBER, leading=14, spaceBefore=6, spaceAfter=16),
        "ctitle": ParagraphStyle("ctitle", fontName="Times-Bold", fontSize=18, textColor=PAPER, leading=24, spaceAfter=8),
        "csub": ParagraphStyle("csub", fontName="Helvetica", fontSize=10, textColor=HexColor("#B7C0C6"), leading=14, spaceAfter=10),
        "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=9, textColor=HexColor("#B7C0C6"), leading=12),
        "h1": ParagraphStyle("h1", fontName="Times-Bold", fontSize=14, textColor=INK, leading=18, spaceBefore=10, spaceAfter=5),
        "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=10.5, textColor=TEAL, leading=13, spaceBefore=8, spaceAfter=3),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9, textColor=MUTED, leading=12.5, alignment=TA_JUSTIFY, spaceAfter=6),
        "bu": ParagraphStyle("bu", fontName="Helvetica", fontSize=9, textColor=MUTED, leading=12),
        "call": ParagraphStyle("call", fontName="Helvetica-Oblique", fontSize=8.5, textColor=INK, leading=12, spaceBefore=3, spaceAfter=6),
        "small": ParagraphStyle("small", fontName="Helvetica", fontSize=7.5, textColor=RULE, leading=10),
        "th": ParagraphStyle("th", fontName="Helvetica-Bold", fontSize=7.5, textColor=white, leading=10),
        "td": ParagraphStyle("td", fontName="Helvetica", fontSize=7.5, textColor=MUTED, leading=10),
        "ver": ParagraphStyle("ver", fontName="Helvetica", fontSize=8, textColor=RULE, leading=10),
    }


class Doc:
    def __init__(self, name: str, title: str):
        self.path = OUT / name
        self.title = title
        self.s = sty()
        self.story: list = []
        self.doc = SimpleDocTemplate(
            str(self.path), pagesize=PAGE, leftMargin=M, rightMargin=M,
            topMargin=M + 8, bottomMargin=M + 14, title=title, author="Evidence Room",
        )

    def _hf(self, c, _d):
        c.saveState()
        p = c.getPageNumber()
        if p > 1:
            c.setStrokeColor(TEAL); c.setLineWidth(1.4)
            c.line(M, PAGE[1] - 0.42 * inch, PAGE[0] - M, PAGE[1] - 0.42 * inch)
            c.setFont("Helvetica-Bold", 8); c.setFillColor(INK)
            c.drawString(M, PAGE[1] - 0.35 * inch, "Evidence Room")
            c.setFont("Helvetica", 7.5); c.setFillColor(RULE)
            c.drawRightString(PAGE[0] - M, PAGE[1] - 0.35 * inch, self.title)
            c.setStrokeColor(HAIR); c.setLineWidth(0.5)
            c.line(M, 0.5 * inch, PAGE[0] - M, 0.5 * inch)
            c.setFont("Helvetica", 6.5); c.setFillColor(RULE)
            c.drawString(M, 0.34 * inch, CONF)
            c.drawRightString(PAGE[0] - M, 0.34 * inch, f"Page {p}")
        c.restoreState()

    def cover(self, title, sub, meta):
        s = self.s
        body = [
            Paragraph("Evidence Room", s["cb"]),
            Paragraph("Agents that earn responsibility.", s["ctag"]),
            Spacer(1, 18),
            Paragraph(title, s["ctitle"]),
            Paragraph(sub, s["csub"]),
            HRFlowable(width="35%", thickness=2, color=AMBER, spaceBefore=6, spaceAfter=12, hAlign="LEFT"),
            Paragraph(meta, s["meta"]),
            Spacer(1, 140),
            Paragraph("v1.0 · Commercial pack · Not legal advice · Not a software runtime", s["ver"]),
        ]
        t = Table([[body]], colWidths=[PAGE[0] - 2 * M])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), INK),
            ("LEFTPADDING", (0, 0), (-1, -1), 26), ("RIGHTPADDING", (0, 0), (-1, -1), 26),
            ("TOPPADDING", (0, 0), (-1, -1), 42), ("BOTTOMPADDING", (0, 0), (-1, -1), 30),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]))
        self.story += [t, PageBreak()]

    def h1(self, t):
        self.story += [Paragraph(t, self.s["h1"]), HRFlowable(width="100%", thickness=1, color=TEAL, spaceBefore=0, spaceAfter=5)]

    def h2(self, t):
        self.story.append(Paragraph(t, self.s["h2"]))

    def p(self, t):
        self.story.append(Paragraph(t, self.s["body"]))

    def note(self, t):
        self.story.append(Paragraph(t, self.s["call"]))

    def bullets(self, items):
        flow = [ListItem(Paragraph(i, self.s["bu"]), leftIndent=10, bulletColor=AMBER) for i in items]
        self.story += [ListFlowable(flow, bulletType="bullet", start="•", leftIndent=8), Spacer(1, 4)]

    def table(self, headers, rows, widths=None):
        data = [[Paragraph(h, self.s["th"]) for h in headers]]
        for r in rows:
            data.append([Paragraph(str(c), self.s["td"]) for c in r])
        t = Table(data, colWidths=widths, repeatRows=1)
        cmds = [
            ("BACKGROUND", (0, 0), (-1, 0), INK), ("BACKGROUND", (0, 1), (-1, -1), PAPER),
            ("GRID", (0, 0), (-1, -1), 0.35, HAIR), ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
            ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ]
        for i in range(1, len(data)):
            if i % 2 == 0:
                cmds.append(("BACKGROUND", (0, i), (-1, i), ALT))
        t.setStyle(TableStyle(cmds))
        self.story += [t, Spacer(1, 7)]

    def pb(self):
        self.story.append(PageBreak())

    def disc(self):
        self.h1("Disclaimer")
        self.p(
            "Evidence Room provides methodologies, diagnostics, and design artefacts. We do not guarantee "
            "cost reduction, ROI, fraud prevention, or audit outcomes. Industry benchmarks attributed to "
            "Ardent Partners (2025) — average cost per invoice <b>$9.84</b>, exception rate <b>18.4%</b>, "
            "STP <b>35.4%</b> — are third-party reference points only and are not Evidence Room performance "
            "claims. Agents must operate under your controls, policies, and human accountability. "
            "Evidence Room is not your ERP vendor, bank, or auditor."
        )
        self.p(
            "AI agents can be wrong. Humans remain accountable for approvals, postings, payments, "
            "supplier master changes, and representations to auditors and regulators."
        )

    def build(self) -> Path:
        OUT.mkdir(parents=True, exist_ok=True)
        self.doc.build(self.story, onFirstPage=self._hf, onLaterPages=self._hf)
        return self.path


def para_block(d: Doc, title: str, paras: list[str]):
    d.h1(title)
    for p in paras:
        d.p(p)


# ── Free Diagnostic (target 8–12) ─────────────────────────────
def build_free():
    d = Doc("ER_Free_Diagnostic_Guide.pdf", "Free Diagnostic Guide")
    d.cover(
        "AP AI Readiness — Free Diagnostic Guide",
        "Score your Accounts Payable operating posture before you grant agents any authority.",
        "SKU ER-FREE-AP · Educational kit · 8–12 pages",
    )
    para_block(d, "1. Purpose", [
        "Most AP AI efforts fail because teams skip the operating model and jump to prompts. This guide exists so Controllers and AP leaders can score readiness honestly, decide what agents may do, and refuse unsafe autonomy.",
        "It accompanies the Free AP AI Readiness Kit: diagnostic, maturity model, opportunity heatmap, ten-agent overview, KPI worksheet, business-case starter, and scorecard. The output is a posture — not a vanity score.",
    ])
    d.h1("2. How to run the diagnostic")
    d.bullets([
        "Schedule 60–90 minutes with an AP lead present; invite Controls and IT for access, SoD, and integration items.",
        "Score each of the 35 statements 0–4 using the rubric. Prefer evidence over optimism.",
        "Require an evidence note for any score of 3 or 4. If you cannot point to a control, report, or SOP, lower the score.",
        "Sum each dimension, then total out of 140. Map to maturity levels before discussing any pilot.",
        "Agree two baseline KPIs and one control KPI that must not worsen before any agent shadow mode.",
    ])
    d.h1("3. Scoring rubric (0–4)")
    d.table(["Score", "Meaning", "Evidence expectation"], [
        ["0", "Absent / unknown", "No artefact, no owner"],
        ["1", "Ad hoc", "Exists in pockets; tribal knowledge"],
        ["2", "Emerging", "Documented but unevenly followed"],
        ["3", "Established", "Mostly followed; measurable gaps"],
        ["4", "Managed", "Consistent, reviewed, improvable with evidence"],
    ], [0.7 * inch, 1.6 * inch, 4.2 * inch])
    d.pb()
    d.h1("4. Dimension deep-dive — Process & Data")
    d.h2("Process (7 questions · max 28)")
    d.p("Intake channels and owners, completeness standards before queue entry, separation of PO and non-PO paths, exception catalogues with owners, current approval matrices, payment calendars with cut-offs, and checklist-driven close tasks. Low process scores mean agents will accelerate confusion.")
    d.bullets(["Document every intake channel before automating capture.", "Catalogue exception types before building triage agents.", "Do not pilot matching if GR/PO hygiene is unknown."])
    d.h2("Data (6 · max 24)")
    d.p("Vendor master payment fields, duplicate vendor reviews, clean ERP field mapping, joinability of PO/GR/invoice IDs, ≥12 months historical queryability, and logged remediation. Agents inherit your data defects; they do not cure them.")
    d.h1("5. Dimension deep-dive — Controls, Technology, People, Measurement")
    d.h2("Controls (7 · max 28)")
    d.p("SoD between vendor setup, entry, and payment release; dual control on bank changes; audit trails; limited force-pay; annual access reviews; monitoring of high-risk classes; and written discount/hold policies. Controls gate earn-up — they are not optional polish after the demo.")
    d.h2("Technology (6 · max 24)")
    d.p("System of record (not spreadsheet-as-ledger), capture/OCR share, workflow beyond email chase, stable procurement/receiving integrations, non-heroic reporting extracts, and a sandbox for pilots.")
    d.h2("People (5 · max 20)")
    d.p("Clear roles, ability to explain approvals from system evidence, redesign capacity (not only firefighting), leadership stance that agents sit under human accountability, and measured training adoption.")
    d.h2("Measurement (4 · max 16)")
    d.p("Cost per invoice (or proxy), exception and STP rates with agreed definitions, cycle time by class, and fixed-cadence KPI reviews with owners and actions.")
    d.pb()
    d.h1("6. Maturity levels → agent posture")
    d.table(["Level", "Points", "Label", "Safe agent posture"], [
        ["1", "0–27", "Manual &amp; opaque", "Observation only — map processes and KPIs"],
        ["2", "28–55", "Documented but fragile", "Draft-only; 100% human action; no write-backs"],
        ["3", "56–83", "Controlled operations", "Propose-and-confirm; mandatory human for money/master data"],
        ["4", "84–111", "Measurable &amp; integrable", "Bounded autonomy for narrow low-risk classes with sampling"],
        ["5", "112–140", "Agent-ready with governance", "Portfolio with RACI, evidence standards, continuous monitoring"],
    ], [0.6 * inch, 0.8 * inch, 1.6 * inch, 3.5 * inch])
    d.h1("7. Earn-up stages")
    d.p("Responsibility is earned, not asserted. Promote agents only through evidence gates:")
    d.bullets([
        "<b>Observe</b> — read-only signals; no outbound action.",
        "<b>Recommend</b> — ranked suggestions; human decides.",
        "<b>Draft</b> — artefacts prepared; human edits and sends/posts.",
        "<b>Execute (narrow)</b> — bounded actions on pre-approved classes after earn-in.",
        "<b>Expand</b> — widen scope only with sampled performance and kill-switches intact.",
    ])
    d.note("Demotion is a first-class control. Precision slips, SoD near-misses, or evidence gaps return an agent to Draft or Observe.")
    d.pb()
    d.h1("8. Baseline KPI worksheet")
    d.p("Agree definitions in writing. Capture last full quarter. Industry averages are context only.")
    d.table(["KPI", "Definition", "Your value", "Period"], [
        ["Monthly invoice volume", "Invoices completed", "", ""],
        ["Cost per invoice", "Loaded AP cost ÷ invoices", "", ""],
        ["Exception rate", "Manual intervention after capture ÷ invoices", "", ""],
        ["STP / touchless", "No human touch after intake ÷ invoices", "", ""],
        ["Median cycle time", "Receipt → payment-ready (days)", "", ""],
        ["First-pass match", "Clean PO match ÷ PO invoices", "", ""],
        ["Duplicate suspect rate", "Flagged potential dups ÷ invoices", "", ""],
        ["On-time payment", "Paid by due/discount date ÷ invoices", "", ""],
    ], [1.5 * inch, 2.6 * inch, 1.2 * inch, 1.2 * inch])
    d.note("Industry context (Ardent Partners 2025 survey averages): cost/invoice $9.84 · exception 18.4% · STP 35.4%. External benchmark — not a guarantee of your results.")
    d.h1("9. Opportunity heatmap — how to read it")
    d.p("After scoring, plot agents against pain × readiness. Prefer high-pain, high-readiness cells for pilots. High-pain, low-readiness cells need foundation work first. Low-pain cells are distractions, not pilots.")
    d.h1("10. What not to do")
    d.bullets([
        "Do not skip Level 1–2 foundations to chase automation theatre.",
        "Do not grant payment release or bank-edit authority to any agent.",
        "Do not market agents as guaranteed fraud prevention.",
        "Do not treat illustrative ROI models as forecasts.",
        "Do not confuse Ardent survey averages with your targets.",
    ])
    d.pb()
    d.h1("11. Recommended product path")
    d.table(["Maturity", "Recommended next step"], [
        ["1–2", "Stay on Free kit; optionally Starter for operating-model literacy"],
        ["3", "AP Agent Starter → selective Pro blueprints"],
        ["4", "AP Agent OS Pro + Custom for edge cases"],
        ["5", "Team change packs + Custom + multi-process roadmap (still AP-first)"],
    ], [1.2 * inch, 5.3 * inch])
    d.h1("12. Session close checklist")
    d.bullets([
        "Scorecard completed with evidence notes",
        "Maturity level agreed (not negotiated upward without evidence)",
        "Two primary KPIs + one control KPI named",
        "One candidate agent identified or explicitly deferred",
        "Internal Audit / Controls informed if a pilot is planned",
    ])
    d.disc()
    return d.build()


# ── Starter (target 12–16) ────────────────────────────────────
def build_starter():
    d = Doc("ER_Starter_Guide.pdf", "AP Agent Starter Guide")
    d.cover(
        "AP Agent Starter — Operating Guide",
        "Operating model, ten condensed blueprints, and a 90-day path from diagnosis to disciplined pilot.",
        "SKU ER-START-79 · $79 · Individual / practitioner licence",
    )
    para_block(d, "1. What Starter is (and is not)", [
        "Starter is a governed introduction to AP agents for Controllers and AP practitioners: an operating model, human-vs-agent RACI patterns, ten condensed blueprints (A01–A10), a transform roadmap, and an implementation checklist.",
        "It is not hosted AP software, not a prompt marketplace, and not authorisation to release payments. If you need full control matrices, testing scripts, and A11–A16 depth, that is Pro. Multi-seat change management is Team. ERP-specific design is Custom.",
    ])
    d.h1("2. Operating model essentials")
    d.h2("Invoice Case as the unit of work")
    d.p("Treat each invoice as an Invoice Case with status, evidence pointers, exception codes, owners, and stage history. Agents write to the case; humans remain accountable for money movement. Cases prevent chat residue from becoming the system of record.")
    d.h2("Charter before code")
    d.p("Every agent needs a charter: purpose, inputs/outputs, allowed stages, forbidden actions, evidence standard, pilot KPIs, and kill-switch. Copy the Starter charter stub and fill invoice classes before any production use.")
    d.h2("Human responsibilities that never move")
    d.bullets(["Payment authorisation and release", "Vendor bank detail changes", "SoD conflict resolution", "Representations to auditors", "Stage promotion decisions"])
    d.pb()
    d.h1("3. Human vs agent framework")
    d.table(["Work type", "Human", "Agent (earn-up dependent)"], [
        ["Policy interpretation", "Owns meaning and exceptions", "May draft summaries of policy hits"],
        ["Master-data change", "Owns and dual-controls", "May flag anomalies; never silent write"],
        ["Match within tolerance", "Samples and overrides", "May propose; later bounded execute if earned"],
        ["Supplier communication", "Edits, approves, sends", "May draft packs with citations"],
        ["Payment release", "Always human", "Propose only (Pro A12 pattern)"],
        ["Audit representation", "Always human", "May assemble evidence index"],
    ], [1.5 * inch, 2.5 * inch, 2.5 * inch])
    d.h1("4. Earn-up in Starter practice")
    d.p("Starter deployments typically stop at Propose. Bounded execute is a Pro-era decision after earn-in samples. Demotion remains available at every stage.")
    d.bullets(["Observe: coverage and noise review", "Recommend: precision sample + owner accept", "Draft: edit-distance / QA sample", "Propose: mandatory human confirm for money-adjacent actions"])
    d.pb()
    # Agents A01-A05
    d.h1("5. Agent blueprints A01–A05")
    for aid, name, purpose, stage, forbid in [
        ("A01", "Invoice Intake", "Capture, classify, extract, enrich into Invoice Cases.", "Observe → Draft → Propose", "Changing bank details; inventing PO numbers"),
        ("A02", "Invoice Validation", "Structural and master-data checks before matching.", "Observe → Propose holds/fixes", "Silent master-data writes"),
        ("A03", "Matching", "2-/3-way match within published tolerances.", "Propose; bounded execute only after earn-in", "Silent override of price/qty failures"),
        ("A04", "Exception Triage", "Classify, prioritise, route with taxonomy codes.", "Draft → Propose assignment", "Closing exceptions without policy; payment release"),
        ("A05", "Goods Receipt", "Signal GR completeness and timing blockers.", "Observe → Propose follow-ups", "Fabricating GR documents"),
    ]:
        d.h2(f"{aid} {name}")
        d.p(f"<b>Purpose:</b> {purpose} <b>Stage path:</b> {stage}. <b>Forbidden:</b> {forbid}.")
    d.pb()
    d.h1("6. Agent blueprints A06–A10")
    for aid, name, purpose, stage, forbid in [
        ("A06", "PO Quality", "Detect PO hygiene issues that create preventable mismatches.", "Observe → Draft tickets", "Unilateral PO changes"),
        ("A07", "Approval", "Route approval packets per policy without breaking SoD.", "Propose → bounded execute after earn-in", "Self-approval loops; skipping required approvers"),
        ("A08", "Supplier Resolution", "Prepare external clarification packs.", "Draft → Propose send", "Promising payment dates not in system"),
        ("A09", "Internal Follow-Up", "Chase internal owners against SLAs.", "Draft → Propose; bounded reminders after earn-in", "Harassing channels outside policy"),
        ("A10", "Duplicate / Anomaly", "Emit duplicate and anomaly signals for investigation.", "Propose holds; human investigates", "Auto-voiding; asserting fraud certainty"),
    ]:
        d.h2(f"{aid} {name}")
        d.p(f"<b>Purpose:</b> {purpose} <b>Stage path:</b> {stage}. <b>Forbidden:</b> {forbid}.")
    d.p("Pro extends the library to A11–A16 (statements, payment proposal, close, reporting, root cause, orchestrator).")
    d.pb()
    d.h1("7. Cross-cutting rules")
    d.bullets([
        "No agent writes bank details.",
        "Starter deployments do not authorise or release payments.",
        "Every production run writes evidence.",
        "Stage promotion requires sampled performance review — not enthusiasm.",
        "A10 emits signals only — never market as guaranteed fraud detection.",
        "Do not claim guaranteed cost/invoice reduction; industry context only via Ardent Partners 2025 ($9.84, 18.4% exceptions, 35.4% STP).",
    ])
    d.h1("8. 90-day transform path (illustrative)")
    d.table(["Days", "Focus", "Exit criteria"], [
        ["0–14", "Baseline KPIs; taxonomy; charter for one agent", "Written pilot charter + kill-switch"],
        ["15–45", "Shadow Observe → Draft on one channel / org", "Evidence pack quality review"],
        ["46–75", "Propose stage with mandatory human confirm", "KPI movement with controls intact"],
        ["76–90", "Retrospective; promote/demote; roadmap to Pro", "Board-ready pilot report"],
    ], [1.0 * inch, 3.0 * inch, 2.5 * inch])
    d.pb()
    d.h1("9. Implementation checklist")
    d.h2("Before shadow mode")
    d.bullets(["Owners named for agent, control, and KPI", "Sandbox available", "Exception taxonomy published", "Evidence storage path defined", "Kill-switch tested", "Internal Audit informed of pilot scope"])
    d.h2("During Propose")
    d.bullets(["100% human confirmation for money-adjacent actions", "Weekly sample of false positives/negatives", "Override log reviewed", "No silent prompt changes"])
    d.h2("Before any bounded execute (usually Pro)")
    d.bullets(["Earn-in sample meets precision bar", "Invoice class whitelist published", "Demotion trigger defined", "Controller sign-off recorded"])
    d.h1("10. Pilot KPI template")
    d.table(["Type", "KPI", "Baseline", "Success signal", "Non-goal"], [
        ["Primary", "", "", "", "Guaranteed $ savings"],
        ["Secondary", "", "", "", ""],
        ["Control (must not worsen)", "", "", "e.g. on-time pay / audit findings", "Fraud certainty claims"],
    ], [1.3 * inch, 1.3 * inch, 1.1 * inch, 1.5 * inch, 1.3 * inch])
    d.pb()
    d.h1("11. Common failure modes")
    d.bullets([
        "Piloting three agents at once with no taxonomy",
        "Skipping evidence packs because 'the model is good'",
        "Letting processors paste invoices into personal LLM chats",
        "Promising the board cost/invoice equal to survey averages",
        "Treating A10 hits as confirmed fraud",
    ])
    d.h1("12. When to upgrade")
    d.p("Move to Pro when you need full control matrices, deeper playbooks, testing packs, and business-case models. Move to Team when multiple seats need shared RACI and change packs. Engage Custom when ERP object models or edge policies require bespoke design.")
    d.disc()
    return d.build()


# ── Pro overview (target 20–28) ───────────────────────────────
def build_pro():
    d = Doc("ER_Professional_OS_Overview.pdf", "AP Agent OS Pro — Overview")
    d.cover(
        "AP Agent OS Pro — Operating System Overview",
        "Governance spine for an AP agent workforce — beside your stack, not instead of it.",
        "SKU ER-PRO · Operating system overview (not full agent dump) · 20–28 pages",
    )
    for n, title, paras in [
        ("1", "What an AP Agent OS is", [
            "AP Agent OS Pro is the governed layer between your ERP/AP automation stack and AI agents that assist invoice-to-pay. It supplies process maps, agent role cards, promotion gates, controls, KPI measurement, illustrative business-case worksheets, templates, and testing packs.",
            "It does not replace Coupa, Tipalti, SAP, Oracle, or your auditor. Think of it as the missing operating system for an agent workforce: charters, evidence standards, earn-up, and demotion — the same discipline you would apply to a new hire, applied to software that can draft and (eventually, narrowly) act.",
        ]),
        ("2", "Design principles", None),
    ]:
        if paras:
            para_block(d, f"{n}. {title}", paras)
    d.h1("2. Design principles")
    d.bullets([
        "Evidence before autonomy.",
        "Promotion gates for agents; accountability for humans.",
        "Beside the stack — not a rip-and-replace fantasy.",
        "Propose-only for payment; dual control for bank changes.",
        "Illustrative models labeled ILLUSTRATIVE; benchmarks labeled EXTERNAL.",
        "Demotion is hygiene, not theatre.",
    ])
    d.h1("3. Logical architecture")
    d.bullets([
        "<b>Process Mapping</b> — current-state invoice-to-pay lifecycle and exception taxonomy.",
        "<b>Agent Library</b> — A01–A16 role cards with stage paths and forbidden actions.",
        "<b>Governance</b> — earn-up gates, RACI, kill-switches, change control for prompts/models.",
        "<b>Controls</b> — preventive and detective controls mapped to agent risks.",
        "<b>KPI Measurement</b> — activity, operational, financial, and risk-control metrics.",
        "<b>Business Case</b> — illustrative models; your inputs required.",
        "<b>Templates &amp; Testing</b> — charters, evidence packs, pilot test scripts.",
    ])
    d.pb()
    d.h1("4. Earn-up as the control plane")
    d.p("Observe → Recommend → Draft → Execute (narrow) → Expand. Each promotion requires sampled evidence, owner sign-off, and intact kill-switches. Demotion is first-class when precision fails.")
    d.table(["Stage", "Agent may", "Agent may not", "Gate to next"], [
        ["Observe", "Read signals; log", "Outbound action", "Coverage + noise review"],
        ["Recommend", "Rank options", "Decide", "Precision sample + owner accept"],
        ["Draft", "Prepare artefacts", "Send/post alone", "Edit-distance / QA sample"],
        ["Execute (narrow)", "Act on whitelist classes", "Act outside class / money release", "Earn-in metrics + Controller sign-off"],
        ["Expand", "Widen classes carefully", "Skip sampling", "Board roadmap + capacity"],
    ], [1.2 * inch, 1.5 * inch, 1.8 * inch, 2.0 * inch])
    d.h1("5. Agent portfolio map (overview — not full dump)")
    d.p("This overview intentionally omits full playbook text. Pro ZIP packs contain the complete library.")
    d.table(["Band", "Agents", "Primary risk focus"], [
        ["Intake &amp; validate", "A01–A02", "Garbage-in; master-data damage"],
        ["Match &amp; triage", "A03–A04", "False match; wrong routing"],
        ["Upstream quality", "A05–A06", "GR/PO defects flooding AP"],
        ["Decision support", "A07–A09", "SoD; supplier/internal chase quality"],
        ["Signals", "A10", "Duplicate/anomaly — signals only"],
        ["Close &amp; stewardship", "A11–A14", "Statement, proposal, close, report drafts"],
        ["Improve &amp; orchestrate", "A15–A16", "Root cause; queue orchestration"],
    ], [1.6 * inch, 1.4 * inch, 3.5 * inch])
    d.pb()
    d.h1("6. Band narratives — Intake through Signals")
    d.h2("Intake &amp; validate (A01–A02)")
    d.p("Intake creates the Invoice Case. Validation fails closed on structural and master-data defects before matching. Pilot on one channel; measure capture completeness and false holds.")
    d.h2("Match &amp; triage (A03–A04)")
    d.p("Matching proposes dispositions within published tolerances. Triage assigns taxonomy codes and owners. False auto-match is more expensive than slow human review — precision gates before any bounded execute.")
    d.h2("Upstream quality (A05–A06)")
    d.p("Many AP exceptions are born in receiving and procurement. These agents signal; they do not fabricate GR or rewrite POs.")
    d.h2("Decision support (A07–A09)")
    d.p("Approval routing must preserve SoD. Supplier and internal follow-up agents draft; humans send until earn-in on approved templates.")
    d.h2("Signals (A10)")
    d.p("Duplicate and anomaly agents emit investigation signals. Never market as fraud guarantees. Never auto-void.")
    d.pb()
    d.h1("7. Band narratives — Close, Improve, Orchestrate")
    d.h2("Close &amp; stewardship (A11–A14)")
    d.p("Statement reconciliation, payment proposal review (propose only), close task drafting, and reporting packs — all under human accountability. A12 must never hold release authority.")
    d.h2("Improve &amp; orchestrate (A15–A16)")
    d.p("Root-cause analysis drafts and queue orchestration recommendations for the AP Manager — not autonomous reallocation of payment authority.")
    d.h1("8. Control themes")
    d.bullets([
        "Fail-closed validation for money-adjacent fields",
        "Propose-only for payment; human release identity required",
        "Dual control on vendor bank changes — independent of agents",
        "Version-pinned prompts/models in evidence packs",
        "Sampled QA with demotion triggers",
        "Data minimisation toward external LLM tools",
        "Change control for every prompt/model promotion",
        "Kill-switch tested before first Propose",
    ])
    d.pb()
    d.h1("9. Controls matrix (illustrative pattern)")
    d.table(["Scope", "Risk", "Control type", "Evidence"], [
        ["A01 Intake", "Incomplete case enters queue", "Preventive gate", "Source hash; confidence; edit log"],
        ["A03 Match", "False auto-match", "Detective sample", "Line compare; policy version"],
        ["A07 Approval", "SoD breach", "Preventive matrix", "Route path; matrix version"],
        ["A10 Duplicate", "Missed duplicate paid", "Detective + human", "Signal set; investigator notes"],
        ["A12 Proposal", "Agent releases payment", "Preventive forbid", "Proposal packet; human release ID"],
        ["Bank change", "Fraudulent remit", "Dual control", "Call-back log; dual approver IDs"],
        ["All agents", "Silent model change", "Change control", "Ticket; model hash"],
    ], [1.2 * inch, 1.6 * inch, 1.5 * inch, 2.2 * inch])
    d.h1("10. KPI spine")
    d.p("Track activity (volume, agent-assisted share, evidence packs), operational (STP, exception rate, first-pass match, cycle time), financial (cost/invoice, on-time pay, discount capture), and risk-control (SoD breaches, force-pays, duplicate precision, dual-control %). Definitions before targets; baselines before pilots.")
    d.table(["Category", "Example KPI", "Cadence", "Owner"], [
        ["Activity", "Agent-assisted volume %", "Weekly", "Agent Owner"],
        ["Operational", "Exception rate", "Weekly", "Exception Lead"],
        ["Operational", "First-pass match rate", "Weekly", "Matching Lead"],
        ["Financial", "Cost per invoice", "Quarterly", "Controller"],
        ["Financial", "On-time payment rate", "Monthly", "Treasury/AP"],
        ["Risk-control", "SoD violations", "Monthly", "Internal Controls"],
        ["Risk-control", "Duplicate suspect precision", "Monthly", "A10 Owner"],
    ], [1.3 * inch, 2.2 * inch, 1.2 * inch, 1.8 * inch])
    d.pb()
    d.h1("11. Measurement hygiene")
    d.bullets([
        "Write definitions before the first dashboard.",
        "Document exclusions (intercompany, expenses, etc.).",
        "Do not mix payment-ready cycle time with paid cycle time without labeling.",
        "Label sample data ILLUSTRATIVE in every worksheet.",
        "Cite Ardent figures only as external context — never as Evidence Room targets.",
    ])
    d.h1("12. Implementation phases (0–10)")
    d.table(["Phase", "Workstream", "Exit"], [
        ["0", "Foundation — readiness &amp; baseline KPIs", "Scorecard + baselines"],
        ["1", "Operating model &amp; exception taxonomy", "Published taxonomy"],
        ["2", "A01 Intake shadow → draft", "Charter + evidence quality"],
        ["3", "A04 Triage + A03 Match propose", "Controls matrix live"],
        ["4", "A10 Duplicate signals", "Precision sampling"],
        ["5", "A07 Approval propose (narrow)", "SoD tests"],
        ["6", "A05/A06 GR &amp; PO quality", "Preventable defect metrics"],
        ["7", "A08/A09 Resolution &amp; follow-up", "Template approval"],
        ["8", "Bounded execute for clean match class", "Earn-in review"],
        ["9", "A11–A14 close &amp; reporting drafts", "Close owner accept"],
        ["10", "Scale, Team packs, Custom edges", "Governance board roadmap"],
    ], [0.7 * inch, 3.3 * inch, 2.5 * inch])
    d.pb()
    d.h1("13. Integration posture")
    d.p("The OS sits beside your stack. Prefer read APIs and draft artefacts first. Write-backs — if ever — are limited to explicitly approved fields after earn-in, with compensating controls and logging.")
    d.bullets(["No silent master-data writes", "No payment release authority on agents", "Human identity on every money-adjacent confirmation", "Sandbox parity for prompt/model changes"])
    d.h1("14. Security &amp; privacy notes")
    d.bullets([
        "Minimise PII and bank data sent to external LLM tools",
        "Prefer enterprise-approved model endpoints with retention controls",
        "Keep prompt/model change control in the same evidence trail as process changes",
        "Align retention of evidence packs with your audit and privacy policies",
    ])
    d.h1("15. Illustrative economics (labels matter)")
    d.p("Business-case worksheets in the Pro pack are labeled ILLUSTRATIVE. Replace every input with measured internal data. Industry averages such as Ardent Partners 2025 ($9.84 cost/invoice, 18.4% exceptions, 35.4% STP) appear on Notes sheets only — not as embedded targets or promises.")
    d.pb()
    d.h1("16. Governance board")
    d.p("Stand up a board with AP Manager, Controller (or delegate), Controls, and IT. Meet monthly on KPIs and samples; per release on change tickets; per incident on demotion; quarterly on portfolio roadmap.")
    d.h1("17. Fit with Team and Custom")
    d.p("Team adds multi-seat RACI, workshops, and change packs for rollout. Custom designs 1–3 client-specific blueprints when ERP objects or policies diverge from the Pro spine. Fees are fixed-band, not contingent on savings claims.")
    d.h1("18. Buyer checklist")
    d.bullets([
        "Controller or AP Manager owns the OS — not only IT innovation",
        "Sandbox available before any write-back",
        "Internal Audit briefed on earn-up and evidence standards",
        "Illustrative ROI worksheets replaced with measured inputs",
        "Licence allows internal use; no public republishing of blueprint text",
        "Kill-switch tested; demotion examples rehearsed",
    ])
    d.pb()
    d.h1("19. What success looks like in year one")
    d.bullets([
        "Baselines published and trusted",
        "Taxonomy live; exception ageing visible",
        "At least two agents at Propose with sampled QA",
        "Zero unsupervised payment releases",
        "Governance board meeting on cadence with demotion examples on record",
    ])
    d.h1("20. Anti-patterns")
    d.bullets([
        "Prompt libraries without charters",
        "Shadow agents in personal LLM chats",
        "Optimism-scored diagnostics",
        "Guaranteed savings marketing",
        "Calling A10 'fraud prevention'",
        "Skipping SoD for speed",
        "Treating survey averages as SLAs",
    ])
    d.h1("21. Operating principles — charter discipline")
    d.p("No agent enters Propose without a written charter covering purpose, allowed invoice classes, forbidden actions, evidence standard, KPI gates, owner, and kill-switch. Charters are versioned.")
    d.h1("22. Evidence packs")
    d.p("Each material decision leaves a pack: inputs used, rule/model version, confidence or variance table, human override if any, and timestamped identity of the accountable person.")
    d.pb()
    d.h1("23. Demotion culture")
    d.p("Demotion is not failure theatre — it is control hygiene. Precision slips, SoD near-misses, or evidence gaps trigger automatic return to Draft or Observe until the gate is re-earned.")
    d.h1("24. How to use this overview")
    d.p("Share with sponsors to set expectations. Use the full Pro pack for implementation. Pair with Team when people change is the bottleneck. Pair with Custom when your ERP objects refuse to fit generic blueprints.")
    d.h1("25. Claims blacklist (never use in customer materials)")
    d.bullets([
        "Guaranteed cost/invoice reduction to any industry average",
        "Eliminate fraud / guaranteed fraud detection",
        "Audit pass guaranteed / SOX certified by Evidence Room",
        "Autonomous payment release without human identity",
    ])
    d.disc()
    return d.build()


# ── Team (target 12–16) ───────────────────────────────────────
def build_team():
    d = Doc("ER_Team_Playbook_Overview.pdf", "Team Playbook Overview")
    d.cover(
        "AP Agent OS Team — Playbook Overview",
        "Change, training, and multi-seat accountability for rolling out a governed agent workforce.",
        "SKU ER-TEAM · Facilitation &amp; change assets overview · 12–16 pages",
    )
    para_block(d, "1. Why Team exists", [
        "Pro designs the OS. Team helps you install it across people: executive alignment, workshops, training outlines, implementation facilitation, and change-management packs so agents do not arrive as shadow IT with no owners.",
    ])
    d.h1("2. Seat model (illustrative)")
    d.p("Commercial variants may include Team 5 / 10 / 25 seat bands. Seat enforcement may be honour-system plus licence text unless a key tool is configured. Confirm at checkout. Prices in store materials are commercial suggestions for modeling — not validated willingness-to-pay research.")
    d.h1("3. Playbook modules")
    d.table(["Module", "Audience", "Outcome"], [
        ["Executive brief", "CFO / Controller", "Decision frame; non-goals; earn-up"],
        ["Workshop: maturity", "AP + Controls + IT", "Shared score; gap owners"],
        ["Workshop: taxonomy", "Exception owners", "Published exception codes"],
        ["Training: evidence", "Processors / leads", "How to read/write evidence packs"],
        ["Training: kill-switch", "Ops + IT", "Tested demotion / stop procedures"],
        ["RACI multi-seat", "All seats", "Named owners per agent &amp; control"],
        ["Change plan", "Sponsor + HR/comms", "90-day communication &amp; adoption"],
        ["Retro cadence", "Governance board", "Promote / demote / expand decisions"],
    ], [1.6 * inch, 1.6 * inch, 3.3 * inch])
    d.pb()
    d.h1("4. Executive brief outline")
    d.bullets([
        "Problem: stack ≠ agent governance",
        "Method: earn-up stages with evidence",
        "What we will not do: unsupervised payment release; fraud certainty claims",
        "Ask: approve Phase 0–3 pilot with kill-switches",
        "Industry context only: Ardent 2025 averages — not promises",
    ])
    d.h1("5. Workshop agendas")
    d.h2("Maturity workshop (90 minutes)")
    d.bullets(["Score dimensions live with evidence challenges", "Identify top five gaps with owners", "Agree one pilot candidate only if Level 3+"])
    d.h2("Taxonomy workshop (60 minutes)")
    d.bullets(["Map top exception types by volume", "Assign default owners and SLAs", "Publish codes into Exception Tracker workbook"])
    d.h2("Evidence training (45 minutes)")
    d.bullets(["What belongs in an evidence pack", "How overrides are logged", "How demotion is triggered"])
    d.pb()
    d.h1("6. Governance board rhythm")
    d.bullets([
        "Monthly: KPI review; exception ageing; control samples",
        "Per release: change ticket for prompt/model; evidence version pin",
        "Per incident: demotion decision within published SLA",
        "Quarterly: portfolio roadmap vs capacity",
    ])
    d.h1("7. RACI pattern (multi-seat)")
    d.table(["Decision", "AP Mgr", "Controller", "Controls", "IT", "Processor"], [
        ["Stage promotion", "A", "C", "C", "C", "I"],
        ["Kill-switch fire", "A", "I", "C", "R", "I"],
        ["Taxonomy change", "A", "I", "C", "I", "C"],
        ["Payment proposal accept", "C", "A", "C", "I", "R"],
        ["Bank change", "I", "C", "A", "C", "I"],
    ], [1.8 * inch, 0.9 * inch, 1.0 * inch, 0.9 * inch, 0.7 * inch, 1.0 * inch])
    d.p("R = Responsible, A = Accountable, C = Consulted, I = Informed. Adjust to your SoD policy.")
    d.pb()
    d.h1("8. Training principles")
    d.p("Teach judgment, not button clicks. Staff must explain why an invoice was approved or held using system evidence. Agents that draft supplier messages still require human edit and send until earn-in.")
    d.h1("9. Change risks to name aloud")
    d.bullets([
        "Shadow agents in personal LLM chats without charters",
        "Optimism bias in maturity scoring",
        "Skipping SoD because 'the agent is faster'",
        "Treating A10 signals as fraud certainty",
        "Promising cost/invoice equal to industry averages",
    ])
    d.h1("10. 90-day change plan (sketch)")
    d.table(["Week", "Message", "Channel"], [
        ["1", "Why earn-up; what we will not automate", "Town hall + email"],
        ["2–3", "Taxonomy live; how to file exceptions", "Team huddles"],
        ["4–6", "Pilot charter; how to read evidence packs", "Training"],
        ["7–10", "Propose stage live; override etiquette", "Floor support"],
        ["11–12", "Retro; celebrate demotions as hygiene", "Board + all-hands"],
    ], [0.9 * inch, 3.4 * inch, 2.2 * inch])
    d.pb()
    d.h1("11. Facilitator notes")
    d.bullets([
        "Never let the room negotiate maturity scores upward without evidence.",
        "Capture parking-lot ERP issues for Custom — do not derail workshops.",
        "Model demotion language: 'we returned A03 to Draft after precision slip' as professional, not punitive.",
        "Keep Ardent figures in footnotes, not slide headlines promising outcomes.",
    ])
    d.h1("12. Handoff from Team to BAU")
    d.p("Exit criteria: named owners, live taxonomy, baseline KPIs, at least one agent at Propose with sampled QA, kill-switch tested, and Internal Audit aware. Custom engagements handle ERP-specific residue.")
    d.disc()
    return d.build()


# ── Custom (target 6–8) ───────────────────────────────────────
def build_custom():
    d = Doc("ER_Custom_Service_Brochure.pdf", "Custom Blueprint Brochure")
    d.cover(
        "Custom Agent Blueprint — Service Brochure",
        "Client-specific agent design when your ERP objects, policies, or edge cases need tailored blueprints.",
        "SKU ER-CUSTOM · Fixed fee bands $1,500–$3,000 · 6–8 pages",
    )
    para_block(d, "1. Who Custom is for", [
        "Organisations that have completed readiness (and usually Starter or Pro literacy) and need 1–3 agent blueprints fitted to their ERP fields, approval matrices, shared-services model, or industry-specific invoice classes.",
    ])
    d.h1("2. Fee bands")
    d.table(["Band", "Fee", "Typical scope"], [
        ["Focused", "$1,500", "One agent; limited ERP variance"],
        ["Standard", "$2,200", "One to two agents; moderate policy complexity"],
        ["Complex", "$3,000", "Up to three agents; multi-entity or heavy SoD edges"],
    ], [1.2 * inch, 1.2 * inch, 4.1 * inch])
    d.p("Fees are fixed by band for design and fulfilment — not contingent on savings or KPI outcomes. Confirm live price at engagement.")
    d.h1("3. What you receive")
    d.bullets([
        "Current-state map for the scoped process slice",
        "Agent charter(s) with stage path and forbidden actions",
        "Control notes and evidence standard",
        "Pilot plan with KPIs and kill-switch",
        "Walkthrough session (remote)",
        "Disclaimer and licence addendum",
    ])
    d.pb()
    d.h1("4. What Custom is not")
    d.bullets([
        "Not ERP development or middleware build (unless separately scoped)",
        "Not payment execution or bank connectivity",
        "Not an audit opinion or SOX certification",
        "Not a guarantee of cost/invoice reduction",
    ])
    d.h1("5. Engagement flow")
    d.p("Intake questionnaire → scoping call → quote/SOW for fee band → design → walkthrough → optional follow-on Team facilitation. Prefer application + manual fulfilment over impulse checkout for services clarity.")
    d.h1("6. Intake themes (preview)")
    d.bullets([
        "ERP / AP automation platforms in scope",
        "Invoice classes and volumes",
        "Existing exception taxonomy (if any)",
        "SoD and bank-change controls today",
        "Target agents (A01–A16 or other)",
        "Sandbox availability",
        "Success KPIs and non-goals",
    ])
    d.pb()
    d.h1("7. Working norms")
    d.bullets([
        "Humans review before delivery",
        "No production credentials in marketing forms",
        "Client artefacts retained only as needed, then returned/deleted per agreement",
        "Claims blacklist: guaranteed savings, fraud certainty, audit pass promises",
    ])
    d.h1("8. How Custom sits with Pro and Team")
    d.p("Pro provides the generic spine. Custom fits the edges. Team installs the people system. Buy Custom when generic blueprints would misstate your ERP objects or SoD — not as a shortcut past readiness.")
    d.disc()
    return d.build()


# ── Brand one-pager ───────────────────────────────────────────
def build_one_pager():
    d = Doc("ER_Brand_One_Pager.pdf", "Brand One-Pager")
    d.doc.topMargin = 0.5 * inch
    d.doc.bottomMargin = 0.5 * inch
    header = Table([[Paragraph(
        "<font color='#F7F4EE'><b>Evidence Room</b></font><br/>"
        "<font color='#C47A2C' size='9'>Agents that earn responsibility.</font>",
        ParagraphStyle("op", fontName="Helvetica", fontSize=17, leading=21, textColor=PAPER),
    )]], colWidths=[PAGE[0] - 2 * M])
    header.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 14), ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    d.story += [header, Spacer(1, 8), HRFlowable(width="28%", thickness=2, color=AMBER, hAlign="LEFT", spaceAfter=6)]
    d.h1("AP Agent Operating System")
    d.p("Evidence Room is the governed agent layer for Accounts Payable — templates, controls, KPIs, and earn-up playbooks so finance teams can put AI to work on invoice-to-pay without pretending agents are already trustworthy. Complements your AP and ERP stack.")
    d.h2("Who it's for")
    d.p("Controllers, AP managers, and Finance Ops leaders who will not rubber-stamp AI.")
    d.h2("The method")
    d.p("Observe → Recommend → Draft → Execute (narrow) → Expand — with kill-switches and evidence packs.")
    d.h2("Product ladder")
    d.table(["Tier", "Promise"], [
        ["Free Readiness", "35-question diagnostic, maturity, KPI baseline"],
        ["Starter $79", "Operating model + ten condensed blueprints"],
        ["Pro / Team", "Full OS spine; Team adds change &amp; seats"],
        ["Custom $1.5–3k", "Client-specific agent blueprints"],
    ], [1.5 * inch, 5.0 * inch])
    d.h2("Positioning lines")
    d.bullets([
        "Evidence before autonomy.",
        "Promotion gates for agents. Accountability for humans.",
        "Built for Controllers who will not rubber-stamp AI.",
    ])
    d.note("Industry context only (Ardent Partners 2025): $9.84 avg cost/invoice · 18.4% exceptions · 35.4% STP — external benchmark, not a guarantee.")
    d.p("<b>Store:</b> Digital goods via Merchant of Record · No guaranteed savings · Humans accountable.")
    d.story += [
        Spacer(1, 4),
        HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=3),
        Paragraph(
            "Disclaimer: Methodologies and templates only. Not legal/audit advice. Not ERP/payment software. "
            "No guaranteed ROI, fraud prevention, or audit outcomes. CONFIDENTIAL.",
            d.s["small"],
        ),
    ]
    return d.build()


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.pdf"):
        old.unlink()
    print(f"Writing PDFs to {OUT}")
    for fn in (build_free, build_starter, build_pro, build_team, build_custom, build_one_pager):
        path = fn()
        print(f"  OK {path.name} ({path.stat().st_size:,} bytes)")
    print("Padding PDFs to page targets...")
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from pad_pdfs import pad_all
    pad_all()
    print("Done.")


if __name__ == "__main__":
    main()
