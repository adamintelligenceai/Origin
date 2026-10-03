#!/usr/bin/env python3
"""Build clean, reproducible customer archives for each Evidence Room SKU."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import tempfile
import zipfile
from dataclasses import dataclass
from pathlib import Path

EDITION = "1.1.0"
FIXED_ZIP_TIME = (2026, 9, 20, 0, 0, 0)
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "releases"

COMMON_NAVIGATION = (
    "00_READ_ME/QUICK_START.md",
    "00_READ_ME/PRODUCT_INDEX.md",
    "00_READ_ME/VERSION_HISTORY.md",
    "00_READ_ME/ER_Product_Overview.pdf",
)
CUSTOMER_TERMS = (
    "10_LEGAL_AND_LICENSING/LICENCE_TERMS.md",
    "10_LEGAL_AND_LICENSING/REFUND_POLICY.md",
    "10_LEGAL_AND_LICENSING/DISCLAIMER.md",
    "10_LEGAL_AND_LICENSING/AI_USE_DISCLOSURE.md",
)


@dataclass(frozen=True)
class Release:
    sku: str
    slug: str
    name: str
    price: str
    licence: str
    paths: tuple[str, ...]


RELEASES = (
    Release(
        sku="ER-DIAG",
        slug="free-diagnostic",
        name="AP AI Readiness Diagnostic",
        price="$0",
        licence="Free lead magnet; no certification or audit claim.",
        paths=("01_FREE_AP_AI_READINESS",),
    ),
    Release(
        sku="ER-START",
        slug="starter",
        name="AP Agent Starter",
        price="$79",
        licence="Individual licence for one named user.",
        paths=("01_FREE_AP_AI_READINESS", "02_AP_AGENT_STARTER"),
    ),
    Release(
        sku="ER-PRO",
        slug="professional",
        name="AP Agent OS Professional",
        price="$199",
        licence="Individual licence for one named practitioner.",
        paths=(
            "01_FREE_AP_AI_READINESS",
            "02_AP_AGENT_STARTER",
            "03_AP_AGENT_OS_PRO",
        ),
    ),
    Release(
        sku="ER-TEAM",
        slug="team",
        name="AP Agent OS Team",
        price="$499",
        licence="Working-group licence; confirm named-user cap in the licence terms.",
        paths=(
            "01_FREE_AP_AI_READINESS",
            "02_AP_AGENT_STARTER",
            "03_AP_AGENT_OS_PRO",
            "04_AP_AGENT_OS_TEAM",
        ),
    ),
)


def iter_files(path: Path) -> list[Path]:
    if path.is_file():
        return [path]
    return sorted(
        candidate
        for candidate in path.rglob("*")
        if candidate.is_file()
        and candidate.name not in {".DS_Store", ".gitignore"}
        and "__pycache__" not in candidate.parts
    )


def collect_release_files(release: Release) -> list[Path]:
    selected: set[Path] = set()
    entries = (*COMMON_NAVIGATION, *release.paths, *CUSTOMER_TERMS)
    for relative in entries:
        source = ROOT / relative
        if not source.exists():
            raise FileNotFoundError(f"Required release input is missing: {relative}")
        selected.update(iter_files(source))
    return sorted(selected, key=lambda path: path.relative_to(ROOT).as_posix())


def release_readme(release: Release) -> str:
    return f"""# {release.name}

**SKU:** {release.sku}
**Edition:** {EDITION}
**List price:** {release.price}
**Licence:** {release.licence}

Start with `00_READ_ME/QUICK_START.md`, then open the README in each numbered
folder. The PDF files are the printable books; the Markdown, Word, PowerPoint,
and Excel files are the working assets.

This toolkit is not legal, audit, accounting, fraud, or financial advice. It
does not authorise an agent to approve, release, or transmit payment.
"""


def write_zip(release: Release, output_dir: Path) -> tuple[Path, dict[str, object]]:
    archive_name = f"Evidence_Room_{release.slug}_v{EDITION}.zip"
    archive_path = output_dir / archive_name
    files = collect_release_files(release)
    prefix = f"Evidence_Room_{release.slug}_v{EDITION}"

    with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        readme = release_readme(release).encode("utf-8")
        info = zipfile.ZipInfo(f"{prefix}/START_HERE.md", FIXED_ZIP_TIME)
        info.compress_type = zipfile.ZIP_DEFLATED
        archive.writestr(info, readme)

        for source in files:
            relative = source.relative_to(ROOT).as_posix()
            info = zipfile.ZipInfo(f"{prefix}/{relative}", FIXED_ZIP_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, source.read_bytes())

    digest = hashlib.sha256(archive_path.read_bytes()).hexdigest()
    metadata: dict[str, object] = {
        "sku": release.sku,
        "name": release.name,
        "price": release.price,
        "edition": EDITION,
        "file": archive_name,
        "sha256": digest,
        "customerFileCount": len(files) + 1,
        "licence": release.licence,
    }
    return archive_path, metadata


def build(output_dir: Path) -> list[dict[str, object]]:
    output_dir.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output_dir.parent) as temporary:
        staging = Path(temporary)
        manifest = []
        for release in RELEASES:
            _, metadata = write_zip(release, staging)
            manifest.append(metadata)

        (staging / "release-manifest.json").write_text(
            json.dumps({"edition": EDITION, "products": manifest}, indent=2) + "\n",
            encoding="utf-8",
        )
        (staging / "SHA256SUMS.txt").write_text(
            "".join(f"{item['sha256']}  {item['file']}\n" for item in manifest),
            encoding="utf-8",
        )

        if output_dir.exists():
            shutil.rmtree(output_dir)
        shutil.copytree(staging, output_dir)
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Destination directory (default: {DEFAULT_OUTPUT})",
    )
    args = parser.parse_args()
    manifest = build(args.output.resolve())
    print(f"Built {len(manifest)} customer archives in {args.output.resolve()}")


if __name__ == "__main__":
    main()
