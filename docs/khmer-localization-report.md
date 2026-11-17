# Khmer Localization & Shape Lab Report

**Date:** 17 November 2026  
**Scope:** Khmer/English bilingual delivery for Cambodian students in Grades 7–12  
**Status:** Implemented and verified; Khmer prose still needs native-speaker review.

## 1. What is localized

| Area | English | Khmer | Notes |
|---|---|---|---|
| Navigation, buttons, labels, notices | Yes | Yes | Typed dictionaries in `src/i18n/en.ts` and `src/i18n/km.ts` |
| Grade / subject / topic names | Yes | Yes | `src/i18n/content.ts` |
| Topic theory, key ideas, prerequisites | Yes | Yes | `src/i18n/km/grade7.ts` … `grade12.ts` |
| Formulas, variables, conditions, notes | Yes | Yes | Same grade overlays, applied by `formulaContent()` |
| Worked examples and mistakes | Yes | Yes | Same grade overlays |
| Exercises, hints and explanations | Yes | Yes | 427 exercises carry Khmer overlays |
| Glossary | Yes | Yes | 227 enriched terms |
| Search | Yes | Yes | Khmer titles, aliases and queries are indexed |
| Shape Lab definitions, properties, dimensions, metrics, formulas and examples | Yes | Yes | `src/i18n/shapes-km.ts` |
| Shape Lab controls and screen-reader labels | Yes | Yes | `lab.*` dictionary keys |
| Function Grapher | Yes | Yes | Page copy plus Khmer parser diagnostics |
| Exam lab and Bac II pages | Yes | Yes | Existing bilingual data and UI |

## 2. Shape Lab integration

- `localizeShape(shape, language)` in `src/i18n/shapes-km.ts` returns a copy of a shape with Khmer text while preserving:
  - shape ids and categories,
  - dimension keys, ranges, steps and defaults,
  - metric keys and `compute` / `exact` functions,
  - formula LaTeX expressions.
- `ShapesPage` now localizes the selected shape once with `useMemo` and passes it to `ShapeLab` and `ShapeReference`, so the hero title, tagline, breadcrumb, `aria-label` and every panel use the same copy.
- Shape filtering searches English names/taglines/aliases **and** Khmer names, taglines and aliases, so either script finds the shape.
- The malformed count display (`20 20 2D shapes`) is fixed: the count is rendered once by the page, and `shapes.meta2d` / `shapes.meta3d` are count-free labels.
- Shape-not-found now uses the translated `shapes.notFound` message instead of a hardcoded English sentence.
- 2D/3D diagrams and canvas controls translate their accessible labels and empty states.

## 3. Function Grapher and parser correctness

- The grapher is available at `/graph` and `/plotter` with a header entry and a Khmer interface.
- During verification, a real precedence bug was found and fixed in `src/lib/math-parser.ts`:
  - Before: unary minus bound more tightly than exponentiation, so `−x²` was evaluated as `(−x)²`.
  - After: `−x² = −(x²)`, while `−2x = (−2)·x` remains correct.
  - This affected the inverted-parabola preset and its vertex/intercept analysis.
- The page now translates the parser's common diagnostics into Khmer instead of showing only English error text.
- Graph titles and captions are emitted in both languages, so switching language does not leave stale copy.

## 4. Verification evidence

All commands were run from the repository root on 17 November 2026.

| Check | Command | Result |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | Pass, no diagnostics |
| Unit / integration tests | `npm test -- --run` | 6 files, 108 tests passed |
| Production build | `npm run build` | Pass (`✓ built`) |
| End-to-end tests | `npm run test:e2e` | 54 passed, 3 skipped across desktop, tablet and mobile |
| Khmer-specific E2E | `npx playwright test --grep "Khmer"` | 6 passed (desktop, tablet, mobile) |
| Grapher E2E | `npx playwright test --grep "function grapher"` | 3 passed (desktop, tablet, mobile) |

New automated coverage:

- `src/data/visuals-and-i18n.test.ts`
  - Every shape has Khmer copy.
  - Property, formula and example-step counts mirror the English source.
  - Every dimension and metric key is translated.
  - Khmer prose is actually Khmer and all inline math compiles with KaTeX.
  - Localization preserves ids, LaTeX expressions, ranges and computed values.
- `src/lib/math-parser.test.ts`
  - Input normalization, implicit multiplication and LaTeX conversion.
  - Linear, quadratic, rational, trigonometric, root and absolute-value evaluation.
  - Error handling for malformed expressions.
  - Slope, intercepts, vertex, extrema, table generation and bisection roots.
  - Unary-minus precedence regression tests.
- `e2e/app.spec.ts`
  - Switching to Khmer updates the interface and Shape Lab content.
  - The language choice survives a reload.
  - A Khmer shape query filters the gallery.
  - The inverted parabola plots with vertex `(1, 4)`.

## 5. Known limitations

1. **Khmer has not been reviewed by a native speaker.** Terminology was chosen to be consistent with Cambodian classroom usage and French-derived mathematical vocabulary, but a fluent mathematics teacher should review it before publication.
2. **Some page copy still uses a local bilingual helper.** `GraphPage` and parts of `Header` keep paired English/Khmer strings next to the JSX instead of moving every string into `en.ts` / `km.ts`. This is functional but less maintainable than the dictionary-based pages.
3. **Parser diagnostics are mirrored, not exhaustively localized.** Common errors are translated; an unusual future parser message falls back to English.
4. **Research coverage remains partial.** Statistics and probability have full research backing; the other subject areas and the shape catalogue are still tracked in `research/reports/CONTENT_GAP_REPORT.md`.
5. **No curriculum-alignment claim is made.** The app is a study resource, not an official MoEYS publication.

## 6. Recommended next steps

1. Commission a native-speaker review of `src/i18n/km/`, `src/i18n/shapes-km.ts` and `src/i18n/glossary.ts`.
2. Move the remaining paired strings in `GraphPage.tsx` and `Header.tsx` into the typed dictionaries.
3. Extend automated Khmer coverage to the glossary, exam lab and topic pages.
4. Reconcile lesson content with the research programme once the remaining subject reports are complete.
