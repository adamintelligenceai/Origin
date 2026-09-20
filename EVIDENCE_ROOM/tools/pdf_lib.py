"""WeasyPrint helper."""

from pathlib import Path

from weasyprint import HTML

from er_theme import wrap


def write_pdf(path: Path, title: str, code: str, promise: str, body: str, version: str = "v1.0") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    html = wrap(title, code, promise, body, version=version)
    HTML(string=html, base_url=str(path.parent)).write_pdf(str(path))
    print("pdf", path)
