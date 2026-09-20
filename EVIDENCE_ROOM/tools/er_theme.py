"""Evidence Room visual tokens and print CSS."""

from pathlib import Path

INK = "#14110E"
PAPER = "#F6F1E8"
VELLUM = "#EFE8DC"
RULE = "#C8BDAA"
OXBLOOD = "#7A1F2B"
FOREST = "#1F4A3A"
BRONZE = "#8A6A32"
SLATE = "#5C5852"
WHITE = "#FFFcf6"

FONT_SANS = "Inter, 'Liberation Sans', 'Helvetica Neue', Arial, sans-serif"
FONT_SERIF = "Tinos, 'Liberation Serif', 'Times New Roman', Times, serif"
FONT_MONO = "'JetBrains Mono', 'Liberation Mono', Consolas, monospace"


def css() -> str:
    return f"""
@page {{
  size: A4;
  margin: 18mm 16mm 20mm 18mm;
  background: {PAPER};
  @top-left {{
    content: "EVIDENCE ROOM  ·  AP AGENT OS";
    font-family: {FONT_MONO};
    font-size: 8pt;
    letter-spacing: 0.08em;
    color: {SLATE};
  }}
  @top-right {{
    content: string(doccode);
    font-family: {FONT_MONO};
    font-size: 8pt;
    color: {SLATE};
  }}
  @bottom-left {{
    content: "Confidential to licensee  ·  Not legal, tax or audit advice";
    font-family: {FONT_SANS};
    font-size: 7.5pt;
    color: {SLATE};
  }}
  @bottom-right {{
    content: counter(page);
    font-family: {FONT_MONO};
    font-size: 8pt;
    color: {INK};
  }}
}}
@page :first {{
  margin: 0;
  @top-left {{ content: none; }}
  @top-right {{ content: none; }}
  @bottom-left {{ content: none; }}
  @bottom-right {{ content: none; }}
}}
html, body {{
  background: {PAPER};
  color: {INK};
  font-family: {FONT_SANS};
  font-size: 10pt;
  line-height: 1.45;
}}
* {{ box-sizing: border-box; }}
h1, h2, h3, h4 {{ font-weight: 600; line-height: 1.2; margin: 0 0 0.4em; }}
h1 {{ font-family: {FONT_SERIF}; font-size: 26pt; font-weight: 700; }}
h2 {{ font-family: {FONT_SERIF}; font-size: 15pt; margin-top: 1.4em; border-bottom: 0.4pt solid {RULE}; padding-bottom: 0.25em; }}
h3 {{ font-size: 11pt; letter-spacing: 0.02em; margin-top: 1.1em; color: {OXBLOOD}; }}
h4 {{ font-size: 10pt; margin-top: 0.9em; }}
p {{ margin: 0 0 0.7em; }}
ul, ol {{ margin: 0 0 0.8em 1.2em; padding: 0; }}
li {{ margin-bottom: 0.25em; }}
a {{ color: {OXBLOOD}; text-decoration: none; }}
small, .meta {{ color: {SLATE}; font-size: 8.5pt; }}
code, .mono {{ font-family: {FONT_MONO}; font-size: 8.5pt; }}
table {{
  width: 100%;
  border-collapse: collapse;
  margin: 0.6em 0 1.1em;
  font-size: 8.6pt;
}}
th {{
  text-align: left;
  background: {VELLUM};
  border-bottom: 0.6pt solid {INK};
  padding: 5px 6px;
  font-weight: 600;
}}
td {{
  border-bottom: 0.4pt solid {RULE};
  padding: 4px 6px;
  vertical-align: top;
}}
td.num, th.num {{ text-align: right; font-family: {FONT_MONO}; }}
.cover {{
  min-height: 297mm;
  padding: 22mm 20mm 18mm 22mm;
  background: {PAPER};
  position: relative;
  page-break-after: always;
}}
.cover::before {{
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 8px;
  background: {OXBLOOD};
}}
.brand {{
  font-family: {FONT_SERIF};
  font-size: 11pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}}
.family {{
  font-family: {FONT_MONO};
  font-size: 9pt;
  color: {SLATE};
  letter-spacing: 0.06em;
  float: right;
}}
.cover h1 {{ font-size: 34pt; margin: 48mm 0 12px; max-width: 140mm; }}
.promise {{
  font-size: 12.5pt;
  color: {SLATE};
  max-width: 140mm;
  margin-bottom: 28mm;
}}
.cover-foot {{
  position: absolute;
  bottom: 18mm;
  left: 22mm;
  right: 20mm;
  display: flex;
  justify-content: space-between;
  font-family: {FONT_MONO};
  font-size: 8pt;
  color: {SLATE};
  border-top: 0.4pt solid {RULE};
  padding-top: 8px;
}}
.doccode {{ string-set: doccode content(); }}
.callout {{
  border-left: 3px solid {OXBLOOD};
  background: {VELLUM};
  padding: 8px 12px;
  margin: 0.8em 0 1em;
}}
.callout.do {{ border-left-color: {FOREST}; }}
.callout.evidence {{ border-left-color: {BRONZE}; }}
.callout .k {{
  font-family: {FONT_MONO};
  font-size: 7.5pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: {SLATE};
  display: block;
  margin-bottom: 3px;
}}
.grid2 {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
}}
.card {{
  background: {VELLUM};
  padding: 10px 12px;
  break-inside: avoid;
}}
.card h4 {{ margin-top: 0; color: {INK}; }}
.kicker {{
  font-family: {FONT_MONO};
  font-size: 8pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: {OXBLOOD};
  margin-bottom: 4px;
}}
.page-break {{ page-break-before: always; }}
.keep {{ break-inside: avoid; }}
.footer-note {{ font-size: 8pt; color: {SLATE}; margin-top: 1.2em; }}
"""


def wrap(title: str, code: str, promise: str, body: str, version: str = "v1.0", date: str = "20 September 2026") -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>{title} — Evidence Room</title>
<style>{css()}</style>
</head>
<body>
<section class="cover">
  <div class="brand">Evidence Room <span class="family">AP AGENT OS</span></div>
  <div class="kicker" style="margin-top:16mm;">Digital product</div>
  <h1>{title}</h1>
  <p class="promise">{promise}</p>
  <div class="cover-foot">
    <span class="doccode">{code}</span>
    <span>{version}  ·  {date}</span>
  </div>
</section>
<main>
{body}
</main>
</body>
</html>
"""


OUT = Path("/workspace/EVIDENCE_ROOM")
