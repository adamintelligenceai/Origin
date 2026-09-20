#!/usr/bin/env python3
"""Compile flagship markdown into Evidence Room PDFs."""

from pathlib import Path
import html as html_lib
import markdown
from weasyprint import HTML, CSS

ROOT = Path("/workspace/EVIDENCE_ROOM")
CSS_PATH = ROOT / "99_BUILD" / "er.css"
OUT_DIRS = {
    "diagnostic": ROOT / "01_FREE_AP_AI_READINESS",
    "starter": ROOT / "02_AP_AGENT_STARTER",
    "pro": ROOT / "03_AP_AGENT_OS_PRO",
    "team": ROOT / "04_AP_AGENT_OS_TEAM",
    "custom": ROOT / "05_CUSTOM_BLUEPRINT",
    "readme": ROOT / "00_READ_ME",
}

MD = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists", "toc"])


def md_to_body(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    MD.reset()
    return MD.convert(text)


def wrap(title: str, kicker: str, tag: str, bodies: list[str]) -> str:
    inner = "\n".join(f"<section>{b}</section>" for b in bodies)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>{html_lib.escape(title)}</title>
</head>
<body>
<article class="cover">
  <div class="kicker">{html_lib.escape(kicker)}</div>
  <div class="rule"></div>
  <h1>{html_lib.escape(title)}</h1>
  <p class="tag">{html_lib.escape(tag)}</p>
  <p class="foot">Evidence Room  ·  evidenceroom.ai  ·  Version 1.0  ·  20 September 2026<br/>
  Independently authored. Not legal, tax, audit, or accounting advice.</p>
</article>
{inner}
</body>
</html>"""


def write_pdf(name: str, dest: Path, html_str: str):
    dest.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=html_str, base_url=str(ROOT)).write_pdf(
        dest, stylesheets=[CSS(filename=str(CSS_PATH))]
    )
    print(f"{dest}  ({dest.stat().st_size // 1024} KB)")


def concat(paths: list[Path]) -> list[str]:
    out = []
    for p in paths:
        if not p.exists():
            print("MISSING", p)
            continue
        out.append(md_to_body(p))
    return out


def main():
    write_pdf(
        "diagnostic",
        OUT_DIRS["diagnostic"] / "Evidence_Room_AP_AI_Readiness_Diagnostic.pdf",
        wrap(
            "AP AI Readiness Diagnostic",
            "Tier 0  ·  Free lead magnet",
            "Proof before permission. Thirty-six questions. A score you can defend.",
            concat([
                ROOT / "01_FREE_AP_AI_READINESS" / "Evidence_Room_AP_AI_Readiness_Diagnostic.md",
                ROOT / "01_FREE_AP_AI_READINESS" / "SCORECARD_INSTRUCTIONS.md",
            ]),
        ),
    )
    write_pdf(
        "starter",
        OUT_DIRS["starter"] / "Evidence_Room_AP_Agent_Starter_Kit.pdf",
        wrap(
            "AP Agent Starter Kit",
            "Tier 1  ·  US$79  ·  Individual licence",
            "Friday purchase. Monday start. One bounded agent at L0.",
            concat([ROOT / "02_AP_AGENT_STARTER" / "Evidence_Room_AP_Agent_Starter_Kit.md"]),
        ),
    )

    pro_files = [
        ROOT / "03_AP_AGENT_OS_PRO" / "00_PROFESSIONAL_OPERATING_SYSTEM.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Agent_Library" / "00_AGENT_STACK_OVERVIEW.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Agent_Library" / "17_AUTONOMY_PROGRESSION.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Agent_Library" / "18_HUMAN_VS_AGENT_DECISION.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Process_Mapping" / "00_METHODOLOGY.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Governance" / "00_GOVERNANCE_FRAMEWORK.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Controls" / "00_CONTROL_FRAMEWORK.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Controls" / "03_EXCEPTION_TAXONOMY.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "KPI_and_Measurement" / "00_KPI_FRAMEWORK.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Business_Case" / "00_BUSINESS_CASE_MODEL.md",
        ROOT / "03_AP_AGENT_OS_PRO" / "Testing" / "00_TESTING_STANDARD.md",
    ]
    write_pdf(
        "pro",
        OUT_DIRS["pro"] / "Evidence_Room_AP_Agent_OS_Professional.pdf",
        wrap(
            "AP Agent OS  —  Professional",
            "Tier 2  ·  US$199  ·  Professional licence",
            "The operating system for AP agents that earn responsibility.",
            concat(pro_files),
        ),
    )

    team_files = [
        ROOT / "04_AP_AGENT_OS_TEAM" / "00_TEAM_EDITION_PLAYBOOK.md",
        ROOT / "04_AP_AGENT_OS_TEAM" / "Workshop" / "01_FACILITATION_PACK.md",
        ROOT / "04_AP_AGENT_OS_TEAM" / "Workshop" / "02_WORKSHOP_AGENDA_ONE_DAY.md",
        ROOT / "04_AP_AGENT_OS_TEAM" / "Executive" / "02_CFO_BRIEF.md",
        ROOT / "04_AP_AGENT_OS_TEAM" / "Change_Management" / "01_CHANGE_TOOLKIT.md",
    ]
    write_pdf(
        "team",
        OUT_DIRS["team"] / "Evidence_Room_AP_Agent_OS_Team_Playbook.pdf",
        wrap(
            "AP Agent OS  —  Team Edition",
            "Tier 3  ·  US$499  ·  Five named seats  ·  One legal entity",
            "A transformation leader can run a session from this pack tomorrow.",
            concat(team_files),
        ),
    )

    write_pdf(
        "custom",
        OUT_DIRS["custom"] / "Evidence_Room_AP_Transformation_Blueprint.pdf",
        wrap(
            "AP Transformation Blueprint",
            "Tier 4  ·  US$1,500–3,000  ·  Productised service",
            "You provide a structured file. We return a written operating design. Still AP only.",
            concat([
                ROOT / "05_CUSTOM_BLUEPRINT" / "00_SERVICE_BROCHURE.md",
                ROOT / "05_CUSTOM_BLUEPRINT" / "03_DELIVERABLE_OUTLINE.md",
            ]),
        ),
    )

    write_pdf(
        "start",
        OUT_DIRS["readme"] / "START_HERE.pdf",
        wrap(
            "Start here",
            "Customer navigation",
            "Twelve steps. One increment. Evidence decides.",
            concat([
                ROOT / "00_READ_ME" / "START_HERE.md",
                ROOT / "00_READ_ME" / "QUICK_START.md",
                ROOT / "00_READ_ME" / "PRODUCT_INDEX.md",
            ]),
        ),
    )


if __name__ == "__main__":
    main()
