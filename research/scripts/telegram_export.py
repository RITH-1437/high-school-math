#!/usr/bin/env python3
"""Process a Telegram Desktop export.

Copies PDFs into research/pdfs/, extracts text from text-based PDFs, and writes
a message digest plus a manifest.

Usage:
    python research/scripts/telegram_export.py <export-dir>
    python research/scripts/telegram_export.py <export-dir> --no-copy
    python research/scripts/telegram_export.py <export-dir> --render-pages 3
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_PDF_DIR = REPO_ROOT / "research" / "pdfs"
DEFAULT_OUT_DIR = REPO_ROOT / "research" / "telegram-exports" / "extracted"
DEFAULT_MANIFEST = REPO_ROOT / "research" / "telegram-exports" / "manifest.md"
DEFAULT_MESSAGES = REPO_ROOT / "research" / "telegram-exports" / "messages.md"


def find_export_json(export_dir: Path) -> Path | None:
    """Find result.json or messages.json in the export folder."""
    direct = [export_dir / "result.json", export_dir / "messages.json"]
    for path in direct:
        if path.is_file():
            return path

    # Some Telegram versions put the JSON one level below the chosen folder.
    for name in ("result.json", "messages.json"):
        matches = sorted(export_dir.rglob(name))
        if matches:
            return matches[0]
    return None


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8-sig") as handle:
        return json.load(handle)


def flatten_text(value: Any) -> str:
    """Telegram text can be a string or a list of text/entity objects."""
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        parts: list[str] = []
        for item in value:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                text = item.get("text")
                if isinstance(text, str):
                    parts.append(text)
                elif item.get("type") == "link":
                    parts.append(str(item.get("href") or item.get("text") or ""))
        return "".join(parts)
    return ""


def iter_messages(data: Any) -> Iterable[dict[str, Any]]:
    """Yield messages from the common Telegram export shapes."""
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                yield item
        return

    if not isinstance(data, dict):
        return

    messages = data.get("messages")
    if isinstance(messages, list):
        for item in messages:
            if isinstance(item, dict):
                yield item
        return

    chats = data.get("chats")
    chat_items: list[Any] = []
    if isinstance(chats, list):
        chat_items = chats
    elif isinstance(chats, dict):
        chat_items = list(chats.values())

    for chat in chat_items:
        if not isinstance(chat, dict):
            continue
        chat_messages = chat.get("messages")
        if not isinstance(chat_messages, list):
            continue
        chat_name = chat.get("name") or chat.get("title") or chat.get("id") or ""
        for item in chat_messages:
            if isinstance(item, dict):
                message = dict(item)
                message.setdefault("_chat", chat_name)
                yield message


def message_file_name(message: dict[str, Any]) -> str:
    name = message.get("file_name")
    if isinstance(name, str) and name.strip():
        return name.strip()

    file_value = message.get("file")
    if isinstance(file_value, str) and file_value.strip():
        cleaned = re.sub(r"^\(File\)\s*", "", file_value.strip())
        return cleaned

    return ""


def is_pdf_message(message: dict[str, Any], name: str) -> bool:
    mime = str(message.get("mime_type") or "").lower()
    return mime == "application/pdf" or name.lower().endswith(".pdf")


def build_file_index(export_dir: Path) -> dict[str, list[Path]]:
    index: dict[str, list[Path]] = {}
    for path in export_dir.rglob("*"):
        if path.is_file():
            index.setdefault(path.name.lower(), []).append(path)
    return index


def resolve_attachment(name: str, export_dir: Path, index: dict[str, list[Path]]) -> Path | None:
    if not name:
        return None
    candidate = export_dir / name
    if candidate.is_file():
        return candidate
    matches = index.get(Path(name).name.lower())
    if matches:
        return matches[0]
    stem = Path(name).stem.lower()
    for path in export_dir.rglob("*"):
        if path.is_file() and path.stem.lower() == stem:
            return path
    return None


def unique_destination(source: Path, pdf_dir: Path) -> Path:
    destination = pdf_dir / source.name
    if not destination.exists():
        return destination
    if destination.stat().st_size == source.stat().st_size:
        return destination

    stem, suffix = destination.stem, destination.suffix
    counter = 2
    while True:
        candidate = pdf_dir / f"{stem}-{counter}{suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def extract_pdf_text(path: Path) -> tuple[str, dict[str, Any]]:
    """Extract text with PyMuPDF, falling back to pypdf."""
    try:
        import pymupdf  # type: ignore

        document = pymupdf.open(path)
        pages = [page.get_text("text") or "" for page in document]
        page_count = document.page_count
        document.close()
        extractor = "pymupdf"
    except Exception:
        from pypdf import PdfReader

        reader = PdfReader(str(path))
        pages = [(page.extract_text() or "") for page in reader.pages]
        page_count = len(reader.pages)
        extractor = "pypdf"

    text = "\n\n".join(pages)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text, {"pages": page_count, "extractor": extractor}


def render_pages(path: Path, out_dir: Path, limit: int, dpi: int = 150) -> int:
    """Render the first `limit` pages as PNGs. Returns the number written."""
    try:
        import pymupdf  # type: ignore
    except Exception:
        return 0

    page_dir = out_dir / "pages" / path.stem
    page_dir.mkdir(parents=True, exist_ok=True)
    document = pymupdf.open(path)
    count = 0
    for index, page in enumerate(document):
        if index >= limit:
            break
        pixmap = page.get_pixmap(dpi=dpi)
        pixmap.save(page_dir / f"page-{index + 1:03d}.png")
        count += 1
    document.close()
    return count


def status_for(text: str) -> str:
    length = len(text)
    if length == 0:
        return "no text"
    if length < 50:
        return "image-only or no text layer"
    if length < 500:
        return "very little text"
    return "text extracted"


def md_escape(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ").strip()


def relative(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def process(
    export_dir: Path,
    pdf_dir: Path,
    out_dir: Path,
    copy_pdfs: bool,
    render_limit: int,
    manifest_path: Path,
    messages_path: Path,
) -> dict[str, Any]:
    export_json = find_export_json(export_dir)
    messages: list[dict[str, Any]] = []
    json_path = ""
    if export_json:
        messages = list(iter_messages(load_json(export_json)))
        json_path = relative(export_json)

    file_index = build_file_index(export_dir)
    pdfs = sorted(
        (path for path in export_dir.rglob("*") if path.is_file() and path.suffix.lower() == ".pdf"),
        key=lambda path: str(path).lower(),
    )

    pdf_dir.mkdir(parents=True, exist_ok=True)
    out_dir.mkdir(parents=True, exist_ok=True)

    records: list[dict[str, Any]] = []
    copied = 0
    extracted = 0
    image_only = 0

    for source in pdfs:
        destination = None
        if copy_pdfs:
            destination = unique_destination(source, pdf_dir)
            if destination != pdf_dir / source.name or not destination.exists():
                shutil.copy2(source, destination)
                copied += 1
            elif destination.stat().st_size != source.stat().st_size:
                shutil.copy2(source, destination)
                copied += 1

        text, meta = extract_pdf_text(source)
        status = status_for(text)
        if status in ("image-only or no text layer", "no text"):
            image_only += 1
        else:
            extracted += 1

        output_name = source.stem + ".txt"
        output_path = out_dir / output_name
        header = (
            f"# {source.name}\n\n"
            f"- Source: `{relative(source)}`\n"
            f"- Copied to: `{relative(destination) if destination else 'not copied'}`\n"
            f"- Pages: {meta['pages']}\n"
            f"- Characters: {len(text)}\n"
            f"- Extractor: {meta['extractor']}\n"
            f"- Status: {status}\n\n"
            "---\n\n"
        )
        write_text(output_path, header + text + "\n")

        if render_limit > 0:
            render_pages(source, out_dir, render_limit)

        records.append(
            {
                "source": source,
                "destination": destination,
                "text_path": output_path,
                "chars": len(text),
                "pages": meta["pages"],
                "extractor": meta["extractor"],
                "status": status,
                "snippet": text[:160].replace("\n", " "),
            }
        )

    # Message digest.
    message_lines = [
        "# Telegram export messages",
        "",
        f"- Source: `{json_path or 'no JSON found'}`",
        f"- Export folder: `{relative(export_dir)}`",
        f"- Messages: {len(messages)}",
        "",
    ]
    attachment_messages = 0
    for message in messages:
        text = flatten_text(message.get("text"))
        name = message_file_name(message)
        pdf = is_pdf_message(message, name)
        if name or pdf:
            attachment_messages += 1

        date = str(message.get("date") or "")
        sender = str(message.get("from") or message.get("actor") or "")
        chat = str(message.get("_chat") or "")
        heading = f"## {date} — {sender}"
        if chat:
            heading += f" ({chat})"
        message_lines.append(heading)
        message_lines.append("")
        if text:
            message_lines.append(text)
            message_lines.append("")
        if name:
            marker = "PDF attachment" if pdf else "Attachment"
            message_lines.append(f"{marker}: `{name}`")
            message_lines.append("")

    write_text(messages_path, "\n".join(message_lines))

    # Manifest.
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    manifest = [
        "# Telegram export manifest",
        "",
        f"- Generated: {now}",
        f"- Export folder: `{relative(export_dir)}`",
        f"- Export JSON: `{json_path or 'not found'}`",
        f"- Messages: {len(messages)}",
        f"- PDFs found: {len(pdfs)}",
        f"- PDFs copied: {copied}",
        f"- PDFs with extracted text: {extracted}",
        f"- PDFs marked image-only/no text: {image_only}",
        "",
        "## PDFs",
        "",
        "| PDF | Pages | Characters | Status | Extracted text |",
        "|---|---:|---:|---|---|",
    ]
    for record in records:
        manifest.append(
            "| `{source}` | {pages} | {chars} | {status} | `{text}` |".format(
                source=md_escape(relative(record["source"])),
                pages=record["pages"],
                chars=record["chars"],
                status=md_escape(record["status"]),
                text=md_escape(relative(record["text_path"])),
            )
        )

    manifest.extend(
        [
            "",
            "## Messages with attachments",
            "",
            "| Date | Sender | Attachment | Message |",
            "|---|---|---|---|",
        ]
    )
    for message in messages:
        name = message_file_name(message)
        if not name:
            continue
        text = flatten_text(message.get("text"))
        manifest.append(
            "| {date} | {sender} | `{name}` | {text} |".format(
                date=md_escape(str(message.get("date") or "")),
                sender=md_escape(str(message.get("from") or message.get("actor") or "")),
                name=md_escape(name),
                text=md_escape(text[:120]),
            )
        )

    manifest.extend(
        [
            "",
            "## Notes",
            "",
            "- Image-only PDFs have no text layer. Use `--render-pages N` to render pages as PNGs,",
            "  then read the images directly.",
            "- A Telegram export contains member names and user IDs. `raw/` is ignored by git;",
            "  keep personal data out of tracked folders.",
            "",
        ]
    )
    write_text(manifest_path, "\n".join(manifest))

    return {
        "messages": len(messages),
        "pdfs": len(pdfs),
        "copied": copied,
        "extracted": extracted,
        "image_only": image_only,
        "attachment_messages": attachment_messages,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Process a Telegram Desktop export.")
    parser.add_argument("export_dir", type=Path, help="Folder containing result.json or messages.json")
    parser.add_argument("--pdf-dir", type=Path, default=DEFAULT_PDF_DIR, help="Where to copy PDFs")
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT_DIR, help="Where to write extracted text")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST, help="Where to write manifest.md")
    parser.add_argument("--messages", type=Path, default=DEFAULT_MESSAGES, help="Where to write messages.md")
    parser.add_argument("--no-copy", action="store_true", help="Do not copy PDFs into the PDF folder")
    parser.add_argument(
        "--render-pages",
        type=int,
        default=0,
        metavar="N",
        help="Render the first N pages of each PDF as PNGs (for scanned PDFs)",
    )
    args = parser.parse_args()

    export_dir = args.export_dir.resolve()
    if not export_dir.is_dir():
        print(f"Export folder not found: {export_dir}", file=sys.stderr)
        return 1

    summary = process(
        export_dir=export_dir,
        pdf_dir=args.pdf_dir.resolve(),
        out_dir=args.out_dir.resolve(),
        copy_pdfs=not args.no_copy,
        render_limit=args.render_pages,
        manifest_path=args.manifest.resolve(),
        messages_path=args.messages.resolve(),
    )

    print(f"Export folder: {export_dir}")
    print(f"Messages: {summary['messages']}")
    print(f"PDFs found: {summary['pdfs']}")
    print(f"PDFs copied: {summary['copied']}")
    print(f"PDFs with extracted text: {summary['extracted']}")
    print(f"PDFs image-only/no text: {summary['image_only']}")
    print(f"Manifest: {args.manifest.resolve()}")
    print(f"Messages: {args.messages.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())