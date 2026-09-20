#!/usr/bin/env python3
"""Render Evidence Room HTML documents to print-ready HTML and PDF."""

from __future__ import annotations

import argparse
from pathlib import Path

FONTS = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">
"""

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "brand" / "design-system.css").read_text(encoding="utf-8")


def wrap(title: str, body: str, *, product: str = "AP AGENT OS", classification: str = "Licensed material") -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} · Evidence Room</title>
  {FONTS}
  <style>{CSS}</style>
</head>
<body>
  {body}
  <footer style="margin-top:48px;padding-top:16px;border-top:1px solid var(--rule-soft);font-family:var(--mono);font-size:10px;color:var(--slate);letter-spacing:.06em;">
    EVIDENCE ROOM · {product} · {classification} · © 2026 Evidence Room · Independently authored · Not legal, tax, accounting or investment advice
  </footer>
</body>
</html>
"""


def cover(kicker: str, title: str, subtitle: str, edition: str, version: str = "1.0") -> str:
    return f"""
<section class="cover">
  <div>
    <div class="cover-mark" aria-hidden="true"></div>
    <p class="wordmark" style="margin-top:18px;">Evidence Room</p>
    <p class="kicker">{kicker}</p>
  </div>
  <div>
    <h1 class="cover-title">{title}</h1>
    <p class="cover-sub">{subtitle}</p>
  </div>
  <div class="meta-row">
    {edition} · Version {version} · September 2026 · evidenceroom.ai
  </div>
</section>
"""


def write_html(path: Path, title: str, body: str, **kwargs) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(wrap(title, body, **kwargs), encoding="utf-8")
    return path


def html_to_pdf(html_path: Path, pdf_path: Path | None = None) -> Path:
    from weasyprint import HTML

    pdf_path = pdf_path or html_path.with_suffix(".pdf")
    HTML(filename=str(html_path)).write_pdf(str(pdf_path))
    return pdf_path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("html")
    parser.add_argument("--pdf", default=None)
    args = parser.parse_args()
    html_to_pdf(Path(args.html), Path(args.pdf) if args.pdf else None)


if __name__ == "__main__":
    main()
