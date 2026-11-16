# High School Math — Research Knowledge Base

Research-only knowledge base for the High School Math formula library (Grades 7–12, English).
Nothing in this directory is application code. It exists so that content agents and reviewers
can check the app's mathematics against cited sources.

## Current status — read this first

**Completed:** Statistics and Probability (32 formulas, 5 theorems, 25 topic mappings, 28 examples,
60 exercises, 56 fetched sources).

**Not completed:** the other eight subject areas and the shape catalogue. There are no records for
them. This is documented, not hidden — see `reports/CONTENT_GAP_REPORT.md`.

## Start here

| If you want… | Read |
|---|---|
| Where to put a downloaded PDF source | `pdfs/README.md` |
| The rules every record follows | `RESEARCH_METHODOLOGY.md` |
| What is verified and what is not | `reports/MATHEMATICAL_ACCURACY_REPORT.md` |
| What is missing | `reports/CONTENT_GAP_REPORT.md` |
| The headline numbers | `reports/RESEARCH_SUMMARY.md` |
| Every source with URL and access date | `SOURCE_REGISTRY.md` |
| Topic → grade placement | `CURRICULUM_MAPPING.md`, `GRADE_07.md`–`GRADE_12.md` |
| All formulas and their status | `formulas/formulas-index.md`, `formulas/formula-verification.md` |
| Worked examples | `examples/solved-examples.md` |
| Practice questions | `exercises/exercise-bank.md` |

## Regenerating everything

```bash
node research/scripts/merge-and-verify.mjs           # merge, validate, write data + markdown
node research/scripts/merge-and-verify.mjs --check    # validate only, write nothing
```

The script concatenates `data/fragments/*.<kind>.json` into `data/*.json`, re-evaluates every
`check` expression, enforces the VERIFIED rules, and generates the grade files, source registry,
formula index, example bank and exercise bank. **All counts in the reports come from the data.**
Never hand-edit a generated file; edit the fragment and re-run.

Exit code is non-zero if validation finds errors.

## Directory map

```
research/
├── README.md                     this file
├── pdfs/                         downloaded PDF sources — put new PDFs here
├── telegram-exports/             Telegram export inbox + extracted text
├── RESEARCH_METHODOLOGY.md       evidence rules, statuses, schemas
├── SOURCE_REGISTRY.md            generated
├── CURRICULUM_MAPPING.md         generated
├── GRADE_07.md … GRADE_12.md     generated
├── subjects/                     per-subject write-ups (statistics, probability done)
├── formulas/                     index and verification (generated)
├── geometry/                     2D/3D shapes, theorems, visualization (not written)
├── examples/                     solved examples (generated)
├── exercises/                    exercise bank (generated)
├── data/
│   ├── *.json                    merged datasets
│   └── fragments/                source of truth, one file per area and record kind
├── reports/                      summary, gaps, accuracy, final
└── scripts/merge-and-verify.mjs  merge + verify + generate
```

## Conventions at a glance

- **ID prefixes:** `NUM`, `ALG`, `GEO`, `SHP`, `TRG`, `STP`, `CAL`. Sources `SRC-<PFX>-001`,
  formulas `F-<PFX>-<slug>`, theorems `T-…`, topics `TOP-…`, examples `EX-…`, exercises `Q-…`.
- **Statuses:** `VERIFIED` needs two distinct websites plus a passing machine check;
  `PARTIALLY_VERIFIED` for single-source or convention-dependent claims; `UNVERIFIED` and
  `REJECTED` are recorded rather than deleted.
- **Facts vs recommendations:** `sourceIds` are fetched evidence; `gradeBasis: "recommendation"`
  marks a pedagogical judgement, `learningObjectives`, `difficulty`, `recommendedVisualizations`
  and exercise design are recommendations by nature.
- **No copying.** Facts are paraphrased; all examples and exercises are original.

## For agents adding research

1. Read `RESEARCH_METHODOLOGY.md` for the schema before writing any JSON.
2. Write a new fragment, e.g. `data/fragments/algebra.formulas.json`, as a valid JSON array.
3. Only cite pages you actually fetched. Never infer a citation.
4. Give every numeric example a `check` block and run it before saving.
5. Run the merge script; fix every error it reports.
6. Report counts as the script computed them, not as you estimated them.