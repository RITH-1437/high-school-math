import os
import shutil
from pathlib import Path
from datetime import datetime, timezone
import pymupdf

REPO_ROOT = Path(r"D:\Personal\my-project\math")
PDF_DIR = REPO_ROOT / "research" / "pdfs"
EXTRACTED_DIR = REPO_ROOT / "research" / "telegram-exports" / "extracted"
MANIFEST_PATH = REPO_ROOT / "research" / "telegram-exports" / "manifest.md"
SECOND_BRAIN_NOTE = Path(r"C:\Users\Administrator\OneDrive - itc.edu.kh\2025\Documents\SecondBrain\Knowledge\math\uploaded-curriculum-pdfs.md")

EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)
SECOND_BRAIN_NOTE.parent.mkdir(parents=True, exist_ok=True)

# 1. Sync from Telegram Desktop if present
tg_dir = Path(r"C:\Users\Administrator\Downloads\Telegram Desktop")
math_tg_pdf = tg_dir / "Math Exam 2024 4.pdf"
if math_tg_pdf.exists():
    target = PDF_DIR / "math_exam_2024_4.pdf"
    if not target.exists() or target.stat().st_size != math_tg_pdf.stat().st_size:
        shutil.copy2(math_tg_pdf, target)
        print(f"Copied {math_tg_pdf.name} -> {target.name}")

# 2. Process all PDFs in PDF_DIR
all_pdfs = sorted(PDF_DIR.glob("*.pdf"), key=lambda p: p.name.lower())
records = []

for pdf_path in all_pdfs:
    out_txt = EXTRACTED_DIR / f"{pdf_path.stem}.txt"
    # Extract text with PyMuPDF
    try:
        doc = pymupdf.open(pdf_path)
        page_count = len(doc)
        pages_text = []
        for i, page in enumerate(doc):
            t = (page.get_text("text") or "").strip()
            if t:
                pages_text.append(f"--- page {i + 1} ---\n{t}")
        doc.close()
        body = "\n\n".join(pages_text).strip()
        chars = len(body)
        
        if chars == 0:
            status = "no text"
        elif chars < 50:
            status = "image-only or no text layer"
        elif chars < 500:
            status = "very little text"
        else:
            status = "text extracted"

        header = (
            f"# {pdf_path.name}\n\n"
            f"- Source: `research/pdfs/{pdf_path.name}`\n"
            f"- Pages: {page_count}\n"
            f"- Characters: {chars}\n"
            f"- Extractor: pymupdf\n"
            f"- Status: {status}\n\n"
            "---\n\n"
        )
        out_txt.write_text(header + body + "\n", encoding="utf-8")

        records.append({
            "name": pdf_path.name,
            "stem": pdf_path.stem,
            "pages": page_count,
            "chars": chars,
            "status": status,
            "snippet": body[:120].replace("\n", " ") if body else "(No text layer)"
        })
    except Exception as e:
        records.append({
            "name": pdf_path.name,
            "stem": pdf_path.stem,
            "pages": 0,
            "chars": 0,
            "status": f"error: {e}",
            "snippet": ""
        })

# 3. Generate Manifest
now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
manifest_lines = [
    "# PDF Research Knowledge Manifest",
    "",
    f"- Last Synced: {now}",
    f"- Total PDFs: {len(records)}",
    f"- Text Extracted: {sum(1 for r in records if r['status'] == 'text extracted')}",
    f"- Image-only / Scanned: {sum(1 for r in records if 'image' in r['status'] or 'no text' in r['status'])}",
    "",
    "| PDF | Pages | Chars | Status | Snippet |",
    "|---|---:|---:|---|---|",
]

for r in records:
    clean_snippet = r['snippet'].replace("|", "\\|")
    manifest_lines.append(f"| `{r['name']}` | {r['pages']} | {r['chars']} | {r['status']} | {clean_snippet} |")

MANIFEST_PATH.write_text("\n".join(manifest_lines) + "\n", encoding="utf-8")
print(f"Updated {MANIFEST_PATH}")

# 4. Update Second Brain Note
sb_lines = [
    "# Uploaded Curriculum and Exam PDFs",
    "",
    "Shared reference for High School Math Team agents (`Euler - Math`, `Nova - QA`, `Dev - Code`, `Sage - Review`, `Flux - DB`, `Plex - PM`).",
    "",
    f"- **Sync Timestamp**: {now}",
    f"- **PDF Directory**: `D:\\Personal\\my-project\\math\\research\\pdfs`",
    f"- **Extracted Text Directory**: `D:\\Personal\\my-project\\math\\research\\telegram-exports\\extracted`",
    f"- **Total PDF Sources**: {len(records)}",
    "",
    "## Key Uploaded Collections",
    "",
    "### 1. BacII Exam Papers & Mock Tests",
    "- `math_exam_2024_4.pdf`: 2024 BacII Mock Examination questions & solutions (42 pages)",
    "- `baccii1.pdf`: MoEYS Grade 12 National BacII exam papers (12 pages)",
    "- `exam202.pdf`: BacII preparatory exam compilation",
    "- `exam2025.pdf`: 2025 BacII preparation problems",
    "- `exam2015.pdf`: Historical 2015 BacII exam paper",
    "- `outstanding3.pdf`: Grade 12 Phnom Penh City Outstanding Student Competition Answer Key (អត្រាកំណែ គណិតវិទ្យា ថ្នាក់ទី១២)",
    "",
    "### 2. High School Calculus & Analysis Textbooks",
    "- `math_analysis.pdf`: Mathematical Analysis (គណិតវិភាគ) — Complete Limits, Derivatives, and Integrals (204 pages)",
    "- `math102.pdf`: Lim Phalkun (លឹម ផល្គុន) High School Math Exercise Collection (240 pages)",
    "- `integral.pdf` & `integral12_2.pdf`: Grade 12 Virakchey High School Integral calculus exercises",
    "- `limit.pdf` & `limit11_2.pdf`: Grade 11 & 12 Limits exercises and step-by-step methods",
    "- `parabol.pdf` & `parabolic12_3.pdf`: Conics & Parabola geometry/analytic coordinate geometry",
    "- `research.pdf`: Limits of Functions (លីមីតនៃអនុគមន៍, 31 pages)",
    "",
    "### 3. International & National Olympiad Math",
    "- `world.pdf` through `world7.pdf`: Advanced problem sets covering algebra, geometry, inequalities, and combinatorics.",
    "- `pi.pdf`: Comprehensive Cambodian high school reference manual.",
    "",
    "## Citation Rule for Agents",
    "When updating formulas in `src/data/` or auditing Khmer terms with `Euler - Math` and `Nova - QA`, cite the specific PDF filename and page number from `research/pdfs/` or the extracted transcript in `research/telegram-exports/extracted/<file>.txt`.",
    ""
]

SECOND_BRAIN_NOTE.write_text("\n".join(sb_lines), encoding="utf-8")
print(f"Updated Second Brain at {SECOND_BRAIN_NOTE}")
