"""Evidence Room PDF engine — institutional report aesthetic."""

from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    CondPageBreak,
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

INK = HexColor("#121614")
PAPER = HexColor("#F3EFE6")
BONE = HexColor("#E6DFD2")
BRONZE = HexColor("#8C7349")
SLATE = HexColor("#4A524C")
RULE = HexColor("#C9C2B4")
SIGNAL = HexColor("#7A2E24")
LEDGER = HexColor("#2C5A4A")
WHITE = white

pdfmetrics.registerFont(TTFont("ERSerif", "/usr/share/fonts/truetype/noto/NotoSerif-Regular.ttf"))
pdfmetrics.registerFont(TTFont("ERSerif-Bold", "/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("ERSerif-Italic", "/usr/share/fonts/truetype/noto/NotoSerif-Italic.ttf"))
pdfmetrics.registerFont(TTFont("ERSerif-BoldItalic", "/usr/share/fonts/truetype/noto/NotoSerif-BoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("ERSans", "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"))
pdfmetrics.registerFont(TTFont("ERSans-Med", "/usr/share/fonts/truetype/macos/Inter-Medium.ttf"))
pdfmetrics.registerFont(TTFont("ERSans-Semi", "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("ERSans-Bold", "/usr/share/fonts/truetype/macos/Inter-Bold.ttf"))
pdfmetrics.registerFont(TTFont("ERMono", "/usr/share/fonts/truetype/macos/JetBrainsMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("ERMono-Bold", "/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Bold.ttf"))


class Hairline(Flowable):
    def __init__(self, color=RULE, thickness=0.4, space_before=4, space_after=10):
        super().__init__()
        self.color = color
        self.thickness = thickness
        self.space_before = space_before
        self.space_after = space_after
        self.height = space_before + thickness + space_after

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return availWidth, self.height

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        y = self.height - self.space_before
        self.canv.line(0, y, self.width, y)


class Callout(Flowable):
    def __init__(self, title, body, kind="note", width=160 * mm):
        super().__init__()
        self.title = title
        self.body = body
        self.kind = kind
        self.box_width = width
        accent = {"do": LEDGER, "risk": SIGNAL, "note": BRONZE, "own": INK}.get(kind, BRONZE)
        self.accent = accent
        styles = _styles()
        self._title = Paragraph(title, styles["CalloutTitle"])
        self._body = Paragraph(body, styles["CalloutBody"])

    def wrap(self, availWidth, availHeight):
        w = min(self.box_width, availWidth)
        tw, th = self._title.wrap(w - 16 * mm, availHeight)
        bw, bh = self._body.wrap(w - 16 * mm, availHeight)
        self.width = w
        self.height = th + bh + 12 * mm
        self._th = th
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(BONE)
        c.roundRect(0, 0, self.width, self.height, 2, fill=1, stroke=0)
        c.setFillColor(self.accent)
        c.rect(0, 0, 2.2 * mm, self.height, fill=1, stroke=0)
        self._title.drawOn(c, 7 * mm, self.height - 6 * mm - self._th)
        self._body.drawOn(c, 7 * mm, 5 * mm)


def _styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(name="CoverKicker", fontName="ERSans-Med", fontSize=8.5, leading=12,
                         textColor=BRONZE, tracking=1.4, alignment=TA_LEFT))
    s.add(ParagraphStyle(name="CoverTitle", fontName="ERSerif", fontSize=28, leading=34,
                         textColor=INK, alignment=TA_LEFT, spaceAfter=8))
    s.add(ParagraphStyle(name="CoverSub", fontName="ERSans", fontSize=11.5, leading=16,
                         textColor=SLATE, alignment=TA_LEFT))
    s.add(ParagraphStyle(name="H1", fontName="ERSerif", fontSize=18, leading=23,
                         textColor=INK, spaceBefore=6, spaceAfter=8))
    s.add(ParagraphStyle(name="H2", fontName="ERSerif", fontSize=13.5, leading=18,
                         textColor=INK, spaceBefore=12, spaceAfter=6))
    s.add(ParagraphStyle(name="H3", fontName="ERSans-Semi", fontSize=10.5, leading=14,
                         textColor=INK, spaceBefore=9, spaceAfter=4))
    s.add(ParagraphStyle(name="Body", fontName="ERSans", fontSize=9.4, leading=13.4,
                         textColor=INK, alignment=TA_JUSTIFY, spaceAfter=7))
    s.add(ParagraphStyle(name="BodyLeft", fontName="ERSans", fontSize=9.4, leading=13.4,
                         textColor=INK, alignment=TA_LEFT, spaceAfter=7))
    s.add(ParagraphStyle(name="Small", fontName="ERSans", fontSize=8.2, leading=11.4,
                         textColor=SLATE, spaceAfter=4))
    s.add(ParagraphStyle(name="Caption", fontName="ERSans-Med", fontSize=7.6, leading=10,
                         textColor=SLATE, spaceBefore=2, spaceAfter=8))
    s.add(ParagraphStyle(name="ERBullet", fontName="ERSans", fontSize=9.2, leading=13,
                         textColor=INK, leftIndent=8, spaceAfter=2))
    s.add(ParagraphStyle(name="TableCell", fontName="ERSans", fontSize=7.6, leading=10.2,
                         textColor=INK))
    s.add(ParagraphStyle(name="TableHead", fontName="ERSans-Semi", fontSize=7.4, leading=10,
                         textColor=PAPER))
    s.add(ParagraphStyle(name="CalloutTitle", fontName="ERSans-Semi", fontSize=8.2, leading=11,
                         textColor=INK, spaceAfter=3))
    s.add(ParagraphStyle(name="CalloutBody", fontName="ERSans", fontSize=8.2, leading=11.4,
                         textColor=INK))
    s.add(ParagraphStyle(name="Footer", fontName="ERSans", fontSize=7.2, leading=9,
                         textColor=SLATE))
    s.add(ParagraphStyle(name="Mono", fontName="ERMono", fontSize=8, leading=11,
                         textColor=INK))
    return s


def _inline(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
    text = re.sub(r"`(.+?)`", r'<font name="ERMono" size="8">\1</font>', text)
    return text


def parse_frontmatter(md: str) -> tuple[dict, str]:
    meta = {}
    if md.startswith("---"):
        parts = md.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip().strip('"').strip("'")
            md = parts[2].lstrip("\n")
    return meta, md


def markdown_to_flowables(md: str, styles):
    flow = []
    lines = md.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        raw = line.rstrip()
        if not raw:
            i += 1
            continue
        if raw.startswith("> "):
            block = [raw[2:]]
            i += 1
            while i < len(lines) and lines[i].startswith("> "):
                block.append(lines[i][2:])
                i += 1
            title = "Note"
            kind = "note"
            body_lines = block
            if block and block[0].upper().startswith("DO:"):
                title, kind, body_lines = "What to do", "do", [block[0][3:].strip()] + block[1:]
            elif block and block[0].upper().startswith("RISK:"):
                title, kind, body_lines = "What can go wrong", "risk", [block[0][5:].strip()] + block[1:]
            elif block and block[0].upper().startswith("OWN:"):
                title, kind, body_lines = "Who owns it", "own", [block[0][4:].strip()] + block[1:]
            elif block and block[0].upper().startswith("MEASURE:"):
                title, kind, body_lines = "How to measure it", "note", [block[0][8:].strip()] + block[1:]
            flow.append(Spacer(1, 3 * mm))
            flow.append(Callout(title, _inline(" ".join(body_lines)), kind))
            flow.append(Spacer(1, 4 * mm))
            continue
        if raw.startswith("|") and i + 1 < len(lines) and set(lines[i + 1].replace("|", "").strip()) <= set("-: "):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not set("".join(cells)) <= set("-: "):
                    rows.append(cells)
                i += 1
            flow.append(_table(rows, styles))
            flow.append(Spacer(1, 3 * mm))
            continue
        if raw.startswith("# "):
            flow.append(Spacer(1, 2 * mm))
            flow.append(Paragraph(_inline(raw[2:]), styles["H1"]))
            flow.append(Hairline(BRONZE, 0.8, 2, 8))
            i += 1
            continue
        if raw.startswith("## "):
            flow.append(Paragraph(_inline(raw[3:]), styles["H2"]))
            flow.append(Hairline(RULE, 0.35, 1, 6))
            i += 1
            continue
        if raw.startswith("### "):
            flow.append(Paragraph(_inline(raw[4:]), styles["H3"]))
            i += 1
            continue
        if raw.startswith(("- ", "* ")):
            items = []
            while i < len(lines) and lines[i].lstrip().startswith(("- ", "* ")):
                items.append(Paragraph("•  " + _inline(lines[i].lstrip()[2:]), styles["ERBullet"]))
                i += 1
            flow.extend(items)
            flow.append(Spacer(1, 2 * mm))
            continue
        if re.match(r"^\d+\.\s", raw):
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s", lines[i].strip()):
                items.append(Paragraph(_inline(lines[i].strip()), styles["ERBullet"]))
                i += 1
            flow.extend(items)
            flow.append(Spacer(1, 2 * mm))
            continue
        if raw == "---":
            flow.append(Hairline(RULE, 0.4, 6, 8))
            i += 1
            continue
        para = [raw]
        i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].startswith(("#", "|", ">", "-", "*", "---")) and not re.match(r"^\d+\.\s", lines[i].strip()):
            para.append(lines[i].rstrip())
            i += 1
        flow.append(Paragraph(_inline(" ".join(para)), styles["Body"]))
    return flow


def _table(rows, styles):
    if not rows:
        return Spacer(1, 1)
    ncol = max(len(r) for r in rows)
    norm = [r + [""] * (ncol - len(r)) for r in rows]
    data = []
    for r_i, row in enumerate(norm):
        style = styles["TableHead"] if r_i == 0 else styles["TableCell"]
        data.append([Paragraph(_inline(c), style) for c in row])
    col_w = (168 * mm) / ncol
    t = Table(data, colWidths=[col_w] * ncol, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), PAPER),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, BONE]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("LINEBELOW", (0, 0), (-1, 0), 0.6, BRONZE),
        ("LINEBELOW", (0, 1), (-1, -1), 0.2, RULE),
        ("BOX", (0, 0), (-1, -1), 0.3, RULE),
    ]))
    return t


def _header_footer(meta):
    title = meta.get("title", "Evidence Room")
    code = meta.get("code", "ER-AP")
    confidential = meta.get("classification", "Commercial product · Not legal or accounting advice")

    def draw(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        if doc.page > 1:
            canvas.setFillColor(INK)
            canvas.rect(0, A4[1] - 12 * mm, A4[0], 12 * mm, fill=1, stroke=0)
            canvas.setFillColor(BRONZE)
            canvas.rect(0, A4[1] - 12.4 * mm, A4[0], 0.5 * mm, fill=1, stroke=0)
            canvas.setFillColor(PAPER)
            canvas.setFont("ERSans-Med", 7)
            canvas.drawString(18 * mm, A4[1] - 8 * mm, "EVIDENCE ROOM")
            canvas.setFont("ERSans", 7)
            canvas.drawRightString(A4[0] - 18 * mm, A4[1] - 8 * mm, title.upper())
            canvas.setStrokeColor(RULE)
            canvas.setLineWidth(0.3)
            canvas.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
            canvas.setFillColor(SLATE)
            canvas.setFont("ERSans", 7)
            canvas.drawString(18 * mm, 7.5 * mm, f"{code}  ·  {confidential}")
            canvas.drawRightString(A4[0] - 18 * mm, 7.5 * mm, f"{doc.page:02d}")
        canvas.restoreState()

    return draw


def _cover(meta, styles):
    flow = []
    flow.append(Spacer(1, 28 * mm))
    flow.append(Paragraph("EVIDENCE ROOM", styles["CoverKicker"]))
    flow.append(Spacer(1, 3 * mm))
    flow.append(Hairline(BRONZE, 1.2, 0, 10))
    flow.append(Paragraph(meta.get("title", "Untitled"), styles["CoverTitle"]))
    flow.append(Paragraph(meta.get("subtitle", ""), styles["CoverSub"]))
    flow.append(Spacer(1, 14 * mm))
    bits = [
        ["Product", meta.get("product", "AP Agent OS")],
        ["Tier", meta.get("tier", "")],
        ["Version", meta.get("version", "1.0")],
        ["Date", meta.get("date", "September 2026")],
        ["Use", meta.get("use", "Implementation toolkit")],
    ]
    data = [[Paragraph(f"<font name='ERSans-Semi' size='8'>{a}</font>", styles["Small"]),
             Paragraph(b, styles["Small"])] for a, b in bits if b]
    t = Table(data, colWidths=[32 * mm, 120 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("LINEABOVE", (0, 0), (-1, 0), 0.3, RULE),
        ("LINEBELOW", (0, -1), (-1, -1), 0.3, RULE),
    ]))
    flow.append(t)
    flow.append(Spacer(1, 28 * mm))
    flow.append(Paragraph(meta.get("idea", "Responsibility is earned."), styles["CoverSub"]))
    flow.append(PageBreak())
    return flow


def build_pdf(md_path: Path, pdf_path: Path):
    md = Path(md_path).read_text(encoding="utf-8")
    meta, body = parse_frontmatter(md)
    styles = _styles()
    pdf_path = Path(pdf_path)
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=meta.get("title", "Evidence Room"),
        author="Evidence Room",
        subject=meta.get("subtitle", "AP Agent OS"),
    )
    story = _cover(meta, styles) + markdown_to_flowables(body, styles)
    story.append(Spacer(1, 10 * mm))
    story.append(Hairline(BRONZE, 0.8, 4, 8))
    story.append(Paragraph(
        "This material is an implementation toolkit. It is not legal, tax, accounting, audit or investment advice. "
        "Agents do not authorise payments. Humans remain accountable. Statistics are cited in the Research Ledger.",
        styles["Small"],
    ))
    doc.build(story, onFirstPage=_header_footer(meta), onLaterPages=_header_footer(meta))
    return pdf_path
