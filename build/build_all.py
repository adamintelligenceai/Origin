#!/usr/bin/env python3
"""Evidence Room AP Agent OS — Master build script."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from generate_excel import generate_all as gen_excel
from generate_docs import generate_all as gen_docs
from generate_pptx import generate_all as gen_pptx
from generate_content import generate_all as gen_content
from generate_website import generate_all as gen_website


def main():
    print("=" * 60)
    print("EVIDENCE ROOM — AP Agent OS Build System")
    print("=" * 60)
    gen_content()
    gen_excel()
    gen_docs()
    gen_pptx()
    gen_website()
    # Regenerate product index after all files created
    from generate_content import gen_product_index
    gen_product_index()
    print("=" * 60)
    print("BUILD COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    main()
