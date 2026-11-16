# Telegram Exports

This folder holds exports from the Telegram group
[Mathsarith](https://t.me/Mathsarith) (គណិតទី១២ — វិទ្យាសាស្រ្តពិត) and the files extracted
from them.

The group is not publicly readable, so the first step is always a local export from Telegram
Desktop. Once the export is here, the helper script can copy PDFs into `research/pdfs/`, extract
their text, and write a readable message digest.

## 1. Export from Telegram Desktop

1. Open the group in Telegram Desktop.
2. Open the group menu (three dots) → **Export chat history**.
3. Set **Format** to **JSON** (machine-readable).
4. Include **Documents** (and Photos if the material is image-based).
5. Choose a date range if you only need part of the history.
6. Save the export folder here:

```text
research/telegram-exports/raw/telegram-export-2026-11-16/
```

The folder should contain `result.json` (newer Telegram) or `messages.json` (older Telegram),
plus the media folders.

## 2. Process the export

From the repository root:

```bash
python research/scripts/telegram_export.py research/telegram-exports/raw/telegram-export-2026-11-16
```

The script:

- finds every PDF in the export,
- copies it to `research/pdfs/` (keeping the original filename, adding `-2` if needed),
- extracts text from text-based PDFs into `research/telegram-exports/extracted/<name>.txt`,
- writes `research/telegram-exports/manifest.md` with page counts and extraction status,
- writes `research/telegram-exports/messages.md` with the chat text and attachment references.

Useful options:

```bash
# Do not copy PDFs into research/pdfs/
python research/scripts/telegram_export.py <export-dir> --no-copy

# Render the first 3 pages of each PDF as PNGs (for scanned PDFs)
python research/scripts/telegram_export.py <export-dir> --render-pages 3
```

## 3. What the script can and cannot do

| PDF type | Result |
|---|---|
| Text-based PDF (normal digital textbook) | Text is extracted to `.txt`. |
| Scanned/image-only PDF | No text layer; the script marks it as `image-only`. I can render pages and read them visually, but this is slower and best for selected pages. |
| Mixed PDF | Extracts the pages that have text and marks the file as mixed. |

## 4. Privacy and copyright

- A Telegram export contains member names, user IDs, and message history. `raw/`,
  `messages.md`, `manifest.md`, and `extracted/` are ignored by git so personal data and
  extracted source text are not committed. Do not move raw exports into a tracked folder.
  If you deliberately want to track an extract, use `git add -f <path>`.
- The group's material may be copyrighted. Use it as a **reference and citation source**; do not
  copy textbook passages, exam questions, or worked solutions into the app. Facts are paraphrased
  and all examples/exercises are original.
- Do not share Telegram login codes, session files, or exported personal data with anyone.

## 5. After extraction

Tell me the export is ready. I will:

1. Read `manifest.md` and the extracted text.
2. Check which grades and topics the material covers.
3. Cross-check formulas against the research knowledge base.
4. Add source records and notes to `research/data/fragments/` where appropriate.
5. Report what was found, what is usable, and what is missing.