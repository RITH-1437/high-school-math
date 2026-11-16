# PDF Sources

Drop downloaded PDFs here. This folder is the single place for PDF evidence used by the
research knowledge base.

These files are **research inputs only**. The app never loads them at runtime and they are not
part of the production bundle. Content that ships in the app lives in `src/data/`.

## Naming

Use lowercase words separated by hyphens, and include the publisher, year, grade and part when
they apply:

```text
<publisher>-<year>-<title>-<grade>[-<part>].pdf
```

Examples:

```text
moeys-2018-mathematics-grade10-part1.pdf
moeys-2018-mathematics-grade11-advanced.pdf
cambridge-2023-mathematics-grade9.pdf
```

Avoid spaces, uppercase letters and version words like `final` or `new` — the date in the name
is the version.

## How to cite a PDF

1. Add a source record to the relevant fragment in `research/data/fragments/<area>.sources.json`.
2. Put the public page or publisher URL in `url` when the PDF was downloaded from one.
3. Record the local filename and the exact page number in `verificationNotes`, for example:
   `Local copy: research/pdfs/moeys-2018-mathematics-grade10-part1.pdf, p. 42.`
4. If the PDF is the only evidence, set `url` to `local:research/pdfs/<filename>` and say so in
   `verificationNotes`.
5. Cite the page you actually read. Never infer a page number.

## Rules

- One PDF per source document. Do not split a document into parts unless the publisher did.
- Keep the file as downloaded; do not edit, crop or re-save it.
- Do not put app images, screenshots or production assets here — those belong in `public/` or
  `src/`.
- Do not rename an existing cited PDF without updating the scripts and reports that refer to it.
- Older PDFs from the first research pass still sit at `research/` root. Leave them there unless
  you migrate them; several scripts and reports refer to those exact paths.