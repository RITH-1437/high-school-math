import os
import json
from pathlib import Path
import pymupdf

pdf_dir = Path(r"D:\Personal\my-project\math\research\pdfs")
extracted_dir = Path(r"D:\Personal\my-project\math\research\telegram-exports\extracted")
extracted_dir.mkdir(parents=True, exist_ok=True)

# Also check Downloads/Telegram Desktop for any math pdfs
tg_dir = Path(r"C:\Users\Administrator\Downloads\Telegram Desktop")
math_tg_pdf = tg_dir / "Math Exam 2024 4.pdf"
if math_tg_pdf.exists():
    target = pdf_dir / "math_exam_2024_4.pdf"
    if not target.exists():
        import shutil
        shutil.copy2(math_tg_pdf, target)
        print(f"Copied {math_tg_pdf.name} -> {target.name}")

recent_names = [
    "baccii1.pdf", "world7.pdf", "world6.pdf", "world4.pdf", "world5.pdf",
    "world3.pdf", "world2.pdf", "world1.pdf", "math_analysis.pdf", "world.pdf",
    "outstanding3.pdf", "pi.pdf", "math102.pdf", "integral.pdf", "parabol.pdf",
    "limit.pdf", "research.pdf", "exam202.pdf", "math_exam_2024_4.pdf"
]

results = []
for name in recent_names:
    p = pdf_dir / name
    if not p.exists():
        continue
    try:
        doc = pymupdf.open(p)
        pages = len(doc)
        parts = []
        for i, page in enumerate(doc):
            t = page.get_text("text") or ""
            if t.strip():
                parts.append(f"--- page {i+1} ---\n{t.strip()}")
        doc.close()
        full_text = "\n\n".join(parts)
        char_len = len(full_text)
        out_txt = extracted_dir / f"{p.stem}.txt"
        out_txt.write_text(full_text, encoding="utf-8")
        results.append({
            "name": name,
            "pages": pages,
            "chars": char_len,
            "has_text": char_len > 100,
            "preview": full_text[:120].replace("\n", " ") if full_text else "(No text layer / scanned)"
        })
    except Exception as e:
        results.append({
            "name": name,
            "error": str(e)
        })

print(f"Processed {len(results)} files.")
for r in results:
    if "error" in r:
        print(f"ERROR: {r['name']} -> {r['error']}")
    else:
        status = "TEXT" if r["has_text"] else "SCANNED/EMPTY"
        print(f"{r['name']:<25} | {r['pages']:>3} pgs | {r['chars']:>7} chars | [{status}] | {r['preview'][:60]}")
