# Content Gap Report

Generated against the nine subject areas in the research brief. Counts are read from
`research/data/` (see `RESEARCH_SUMMARY.md` for how to regenerate).

## Coverage status

| Subject area | Status | Records |
|---|---|---|
| Statistics | Complete | 14 formulas, 2 theorems, 14 topics |
| Probability | Complete | 18 formulas, 3 theorems, 11 topics |
| Number Systems | Not started | 0 |
| Algebra | Not started | 0 |
| Geometry | Not started | 0 |
| Trigonometry | Not started | 0 |
| Coordinate Geometry | Not started | 0 |
| Vectors and Matrices | Not started | 0 |
| Calculus | Not started | 0 |
| Additional Mathematics | Not started | 0 |
| Shape catalogue (2D + 3D) | Not started | 0 shape records |

Seven of nine subject areas have **no** research records. This is the single largest gap in
the research pass and it is not hidden: the JSON files contain only what was actually produced,
with no placeholder records.

## Specific gaps inside the completed area

1. **Grouped-data standard deviation** is described in sources but only lightly represented as a
   formula record; students working from frequency tables may find thin coverage.
2. **Normal distribution** has sources (NIST, LibreTexts, Math is Fun) but only a small number of
   formulas; z-score tables and worked inverse-normal problems are not researched.
3. **Chebyshev's rule** is confirmed in a fetched source but has no dedicated theorem record.
4. **Correlation coefficient** (`r`) is sourced but not given a formula record; only qualitative
   correlation is covered.
5. **Exercise difficulty balance** is skewed: 40 medium, 14 easy, 6 hard. Hard questions are
   under-represented.
6. **Theorem coverage** is thin (5 theorems) and weighted to probability; statistics has only 2.
7. **Bayes' theorem** is `PARTIALLY_VERIFIED` and framed as Grade 12 enrichment; a full worked
   example with a natural-frequency presentation would strengthen it.

## Gaps in the research brief itself

- **Khan Academy** (Tier 1) is unreachable to automated retrieval; it could not be used as a
  source. Human review may still consult it manually, and any claim drawn from it must be
  recorded as human-verified, not agent-verified.
- **Desmos and GeoGebra** were listed as visualization references but are interactive tools; their
  pages were not used as mathematical sources for formula facts.
- **MIT OpenCourseWare** and university department pages were not retrieved in this pass.
- **Tier 2 usage**: LibreTexts contributed only 3 sources; a deeper LibreTexts pass would
  strengthen the algebra and calculus areas when they are researched.

## Consequences for the development team

- The application's own content (Grades 7–12, all subjects) currently exists independently of
  this research and is **not** verified against it. Only the statistics and probability portions
  of the app can be cross-checked now.
- Do not treat `research/data/` as a complete knowledge base. It is a verified slice covering
  statistics and probability, plus tooling that any future research agent can reuse.

## Recommended next research targets (in priority order)

1. Algebra (largest app surface area, and Grade 7–11 dependent).
2. Geometry and the shape catalogue (the Shape Lab depends entirely on it).
3. Number Systems (Grade 7–8 foundation, prerequisite for everything).
4. Trigonometry, then Coordinate Geometry.
5. Calculus and Additional Mathematics.
6. Vectors and Matrices.
7. Deepen statistics/probability: normal distribution, correlation coefficient, Chebyshev,
   and more hard exercises.