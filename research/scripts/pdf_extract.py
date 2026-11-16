#!/usr/bin/env python3
"""Extract text from a PDF into a UTF-8 text file.

Usage:
    python research/scripts/pdf_extract.py <pdf> [-o output.txt] [--max-pages N]
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import pymupdf


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract text from a PDF.")
    parser.add_argument("pdf", type=Path, help="PDF file to read")
    parser.add_argument("-o", "--output", type=Path, help="Output .txt file")
    parser.add_argument("--max-pages", type=int, default=0, help="Stop after N pages (0 = all)")
    args = parser.parse_args()

    if not args.pdf.is_file():
        print(f"PDF not found: {args.pdf}", file=sys.stderr)
        return 1

    document = pymupdf.open(args.pdf)
    limit = args.max_pages if args.max_pages > 0 else document.page_count
    parts: list[str] = []
    for index, page in enumerate(document):
        if index >= limit:
            break
        text = page.get_text("text") or ""
        parts.append(f"--- page {index + 1} ---\n{text}")
    document.close()

    body = "\n\n".join(parts)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    output = args.output or args.pdf.with_suffix(".txt")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(body, encoding="utf-8")

    print(f"pages={min(limit, pymupdf.open(args.pdf).page_count)} chars={len(body)} output={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())