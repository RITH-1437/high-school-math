# Research Summary

## Scope

Independent research pass for the High School Math formula library, Grades 7–12, English only.
This pass is **research only**; it produced no application code.

**Completed:** Statistics and Probability (subjects `statistics`, `probability`).
**Not completed:** Number Systems, Algebra, Geometry, Trigonometry, Coordinate Geometry,
Vectors and Matrices, Calculus, Additional Mathematics, and the per-shape catalogue.

The incomplete areas are documented in `CONTENT_GAP_REPORT.md`. Their absence is not a claim
that the research is finished.

## What was produced (computed from `research/data/`)

Run `node research/scripts/merge-and-verify.mjs` to regenerate every count below.

| Record type | Count |
|---|---|
| Sources (fetched and read) | 56 |
| Curriculum topic mappings | 25 |
| Formulas | 32 |
| Theorems | 5 |
| Solved examples | 28 |
| Practice exercises | 60 |
| Shape records | 0 |

Additional breakdowns: `research/reports/validation-output.json` and the generated files
`SOURCE_REGISTRY.md`, `CURRICULUM_MAPPING.md`, `GRADE_07.md`–`GRADE_12.md`,
`formulas/formulas-index.md`, `formulas/formula-verification.md`,
`examples/solved-examples.md`, `exercises/exercise-bank.md`.

## Source base

Fetched sources span six distinct sites:

- OpenStax (16) — introductory statistics, precalculus
- Wolfram MathWorld (13) — formal reference
- Math is Fun (20) — explanatory
- NIST/SEMATECH e-Handbook of Statistical Methods (4) — formal reference
- LibreTexts (3) — explanatory
- one further site among the above

Tier split: 16 Tier 1, 20 Tier 2, 20 Tier 3.

Khan Academy could not be cited: it blocks automated retrieval (a client challenge). No record
cites it.

## Verification results

- **Machine checks: 110 passed, 0 failed** (15 records carry no numeric check because their
  results are symbolic rather than numeric).
- Formula verification status: 25 `VERIFIED`, 7 `PARTIALLY_VERIFIED`, 0 `UNVERIFIED`.
- Theorem status: 2 `VERIFIED`, 3 `PARTIALLY_VERIFIED`.
- Topic grade placement: 0 `source-backed`, 25 `recommendation`.

Two notes on those last two figures:

- **Grade placement is recommendation-only.** No fetched source states which grade a topic
  belongs to, so nothing is recorded as `source-backed`. The grade assignments are pedagogical
  recommendations consistent with the placement hypotheses in `RESEARCH_METHODOLOGY.md`.
- **PARTIALLY_VERIFIED** records are honest, not failures: they typically rely on one fetched
  source for a specific condition, or state a convention that sources present differently
  (for example quartile methods).

## Independent checks performed by the lead

Beyond the automated evaluator, two claims were re-checked by fetching the cited pages directly:

- OpenStax *Introductory Statistics 2e* §2.7 confirms the population standard deviation divides
  by `N` and the sample standard deviation by `n − 1`.
- Wolfram MathWorld *Standard Deviation* confirms the same distinction and notes the
  inconsistent terminology around the bias-corrected form.

## Known limitations

1. Coverage is one subject area out of nine. See `CONTENT_GAP_REPORT.md`.
2. `research/data/shapes.json` is empty; no shape records were researched.
3. Exercise difficulty is unevenly distributed (40 medium, 14 easy, 6 hard).
4. All source access used the same network and retrieval tool, so a source being unreachable
   once is not proof of permanent inaccessibility, and vice versa.
5. No source states grade placement for secondary topics in most jurisdictions; the grade model
   remains a documented recommendation.