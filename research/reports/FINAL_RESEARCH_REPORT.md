# Final Research Report

Research pass for the High School Math library, Grades 7–12.
All counts below are produced by `research/scripts/merge-and-verify.mjs` from `research/data/`.

## 1. Research scope

Research-only knowledge base for a Grades 7–12 mathematics formula library: formulas, theory,
definitions, properties, theorems, shapes, solved examples, applications, common mistakes and
practice concepts. English only. Grade 12 is the ceiling.

## 2. Sources consulted

**56 sources, all fetched and read in this pass**, across six distinct sites:

| Site | Sources | Role |
|---|---|---|
| OpenStax | 16 | Tier 1 textbook |
| Wolfram MathWorld | 13 | Tier 2 formal reference |
| Math is Fun | 20 | Tier 3 explanatory |
| NIST/SEMATECH e-Handbook | 4 | Tier 2 formal reference |
| LibreTexts (2 sites) | 3 | Tier 2 explanatory |

Tier split: 16 Tier 1, 20 Tier 2, 20 Tier 3.

Khan Academy (Tier 1) could not be used: it blocks automated retrieval. No record cites it.
Full details, URLs, access dates and usage notes: `SOURCE_REGISTRY.md`.

## 3. Grades covered

Coverage exists for the statistics and probability strand at Grades **7, 8, 9, 10, 11 and 12**
(all six). It does not cover the other subject strands at those grades.

## 4. Subjects covered

Two of nine: **Statistics** and **Probability**. The other seven (Number Systems, Algebra,
Geometry, Trigonometry, Coordinate Geometry, Vectors and Matrices, Calculus, Additional
Mathematics) have **no records**. Documented in `CONTENT_GAP_REPORT.md`.

## 5. Topics discovered

**25 curriculum topic mappings**, all with grade recommendations.

| Grade | Topics |
|---|---|
| 7 | 5 |
| 8 | 5 |
| 9 | 6 |
| 10 | 4 |
| 11 | 3 |
| 12 | 2 |

Grade placement is recorded as `recommendation` for all 25. No fetched source assigns secondary
topics to specific grades in a citable way, so nothing is claimed as `source-backed`.

## 6. Formula collection

**32 formulas.** By grade: 7 → 4, 8 → 2, 9 → 7, 10 → 11, 11 → 3, 12 → 5.
By status: 25 `VERIFIED`, 7 `PARTIALLY_VERIFIED`, 0 `UNVERIFIED`.

Every formula record carries name, LaTeX expression, subject, topic, grade, description, meaning,
variable definitions, conditions, an explanation, a worked example and source IDs.

## 7. Theorem collection

**5 theorems.** 2 `VERIFIED`, 3 `PARTIALLY_VERIFIED`. Each carries a formal statement, conditions,
notation, explanation, a proof or outline, diagram requirements, a solved application and sources.

## 8. Geometry collection

**Empty.** `research/data/shapes.json` contains no records. No shape, surface-area or volume
research was completed. The application's Shape Lab therefore has **no research backing** at all.

## 9. Solved examples

**28 examples** — 21 intermediate, 7 advanced. Every numeric example is machine-checked; all pass.
A further 32 examples are embedded in formula records.

## 10. Exercise collection

**60 original questions.** By type: 35 numeric, 18 multiple-choice, 4 word problems, 3 reasoning.
By difficulty: 14 easy, 40 medium, 6 hard (hard is under-represented).

## 11. Mathematical verification results

- **110 numeric checks evaluated, 110 passed, 0 failed.**
- **0 validation errors, 0 warnings.**
- `VERIFIED` requires two distinct websites plus a passing check; the validator enforces this.
- Prose is not machine-checked — see `MATHEMATICAL_ACCURACY_REPORT.md`, residual risk 1.

Two claims were independently re-fetched and confirmed during this pass: OpenStax §2.7 and
MathWorld's *Standard Deviation* page both state the population/sample division difference.

## 12. Missing content

1. Seven of nine subject areas — no records.
2. The entire shape catalogue — no records.
3. Inside the completed area: correlation coefficient formula, fuller normal-distribution
   treatment, Chebyshev as a theorem, grouped-data standard deviation depth.
4. Only 6 hard-difficulty exercises.
5. No research on interactive visualization approaches (SVG/canvas/Three.js trade-offs).
6. No research on the app's own Grade 7–12 content, which exists independently and is unverified
   except where it overlaps statistics and probability.

## 13. Research limitations

- The research agents were stopped by an external usage limit partway through the pass; seven
  subject areas were never started.
- All retrieval used one network path and one tool, so reachability conclusions are specific to
  this environment and date (2026-11-14).
- Web search returned no results during this pass; discovery relied on known source structures and
  direct page fetches. Some candidate URLs 404'd and were discarded rather than guessed at.
- Grade placement is a documented recommendation throughout.
- Statistics/probability sources are heavily US-textbook-oriented (OpenStax, NIST), which biases
  notation and convention toward US practice; international variants (e.g. "trapezium", different
  quartile methods) are only partially represented.
- The research was produced by AI agents and spot-checked by the lead. It is not a substitute for
  review by a qualified mathematics teacher before publication.

## 14. Recommendations for the development team

1. **Do not treat the app's current Grade 7–12 content as verified.** Reconcile it against
   research before release, or label it as unreviewed in the QA report.
2. **Prioritise Algebra, then Geometry/shapes, then Number Systems** for the next research pass;
   these carry the most app surface and the most prerequisite weight.
3. **Fix the prose-verification gap** by having a second agent or a human read every worked
   example and exercise explanation end to end. Automated checks cannot catch a wrong number in
   prose.
4. **Do not ship the Shape Lab as educationally authoritative** until shape research exists; its
   formulas are currently app-authored and unverified.
5. **Balance exercise difficulty** when expanding content; hard questions are 10% of the bank.
6. **Keep the tooling.** `merge-and-verify.mjs` is reusable as-is for any new research area and is
   the reason the counts in this report are trustworthy.
7. **Record grade placement honestly** as recommendation until a citable curriculum source is
   obtained for the target market.