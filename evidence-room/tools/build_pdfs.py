#!/usr/bin/env python3
"""Convert key commercial markdown documents to styled HTML and PDF."""

from __future__ import annotations

import html
from pathlib import Path

import markdown
from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "brand" / "design-system.css").read_text(encoding="utf-8")

JOBS = [
    (ROOT / "01_FREE_AP_AI_READINESS" / "DIAGNOSTIC.md", "AP AI Readiness Diagnostic", "Free"),
    (ROOT / "01_FREE_AP_AI_READINESS" / "SCORECARD_WORKSHEET.md", "Diagnostic Scorecard Worksheet", "Free"),
    (ROOT / "02_AP_AGENT_STARTER" / "STARTER_GUIDE.md", "AP Agent Starter Kit", "Starter · US$79"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "Agent_Library" / "00_AGENT_STACK_OVERVIEW.md", "AP Agent Stack Overview", "Professional"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "Agent_Library" / "RESPONSIBILITY_MODEL.md", "Responsibility Model", "Professional"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "Process_Mapping" / "ER_METHODOLOGY.md", "Evidence Room Methodology", "Professional"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "Process_Mapping" / "EXCEPTION_TAXONOMY.md", "AP Exception Taxonomy", "Professional"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "Governance" / "AP_AGENT_GOVERNANCE_FRAMEWORK.md", "AP Agent Governance Framework", "Professional"),
    (ROOT / "03_AP_AGENT_OS_PRO" / "KPI_and_Measurement" / "KPI_FRAMEWORK.md", "KPI Framework", "Professional"),
    (ROOT / "04_AP_AGENT_OS_TEAM" / "TEAM_PLAYBOOK.md", "Team Implementation Playbook", "Team · US$499"),
    (ROOT / "05_CUSTOM_BLUEPRINT" / "SERVICE_BROCHURE.md", "AP Transformation Blueprint", "Custom service"),
    (ROOT / "00_READ_ME" / "QUICK_START.md", "Quick Start", "All paid tiers"),
    (ROOT / "brand" / "BRAND_SYSTEM.md", "Brand System", "Internal"),
]


def md_to_html(text: str) -> str:
    return markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "sane_lists", "toc"],
        output_format="html5",
    )


def wrap(title: str, edition: str, body: str) -> str:
    safe_title = html.escape(title)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{safe_title} · Evidence Room</title>
  <style>{CSS}
    body {{ padding: 0 8mm; }}
    h1 {{ font-size: 28px; }}
    pre, code {{ font-family: var(--mono); font-size: 12px; }}
    blockquote {{ border-left: 3px solid var(--forest); margin: 16px 0; padding-left: 14px; color: var(--ink-soft); }}
  </style>
</head>
<body>
  <header style="margin:0 0 28px;padding-bottom:16px;border-bottom:1px solid var(--rule);">
    <p class="wordmark">Evidence Room</p>
    <p class="kicker">{html.escape(edition)}</p>
  </header>
  {body}
  <footer style="margin-top:36px;padding-top:12px;border-top:1px solid var(--rule-soft);font-family:var(--mono);font-size:10px;color:var(--slate);">
    © 2026 Evidence Room · Independently authored · Not legal, tax, accounting or investment advice · Responsibility is earned.
  </footer>
</body>
</html>
"""


def convert(src: Path, title: str, edition: str) -> tuple[Path, Path | None]:
    html_path = src.with_suffix(".html")
    pdf_path = src.with_suffix(".pdf")
    body = md_to_html(src.read_text(encoding="utf-8"))
    html_path.write_text(wrap(title, edition, body), encoding="utf-8")
    try:
        HTML(filename=str(html_path)).write_pdf(str(pdf_path))
        return html_path, pdf_path
    except Exception as exc:  # noqa: BLE001
        print(f"PDF failed for {src.name}: {exc}")
        return html_path, None


def main() -> None:
    for src, title, edition in JOBS:
        if not src.exists():
            print(f"MISSING {src}")
            continue
        html_path, pdf_path = convert(src, title, edition)
        print(html_path, pdf_path or "")


if __name__ == "__main__":
    main()
