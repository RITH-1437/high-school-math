---
name: axiom-math-library-contributor
description: Use when adding or editing mathematics content, shapes, features, or tests in the High School Math Grades 7–12 formula library. Covers the content schema, mathematical verification workflow, shape calculation workflow, UI conventions, and release checks.
---

# High School Math Contributor Skill

Operational playbook for agents working on the High School Math library.
`AGENTS.md` is the binding contract; this skill explains **how** to execute common tasks well.

## 0. Orient before acting (required)

1. Read `AGENTS.md`.
2. Read `src/types/content.ts` and one existing grade file.
3. Locate the closest existing component/page for the pattern you need.
4. Run `npm run dev` to inspect real behavior; do not judge from code alone.
5. For content changes, identify the exact grade, subject, topic, and prerequisite chain.

Do not edit a file owned by another active workstream. Content agents own their assigned grade
file only. Integration agents own shared types, styles, routing, and derived indexes.

## 1. Add or revise a topic

Use this order:

1. Choose a globally unique topic slug (`kebab-case`).
2. Place it under the correct subject in the correct `src/data/grades/gradeN.ts`.
3. Fill the topic in this exact narrative order:
   introduction → theory → formulas → variable definitions → conditions → worked examples →
   common mistakes → practice exercises → related topics.
4. Add prerequisites and related-topic IDs only when those topics exist.
5. Add 2–5 formulas, each with:
   - globally unique formula ID (`g<grade>-<topic>-<short-name>`),
   - title, LaTeX expression, plain-English description,
   - variables (`symbol`, `name`, optional unit/note),
   - conditions/restrictions,
   - at least two search tags (including common alternative names).
6. Write at least one fully solved example:
   - state the problem and knowns,
   - name the formula,
   - substitute values,
   - show every arithmetic step,
   - give the final answer with units and a sensible rounding statement.
7. Write 4–6 exercises with at least one MC and one numeric item. Vary difficulty.
   Every explanation must explain why the answer is correct.
8. Link a relevant shape only if it genuinely illuminates the topic.
9. Recompute examples and exercises by hand or with a scratch calculation; then run tests.

### Content quality bar

- Write like a patient teacher, not a formula database.
- Explain *why* a step is legal, not only *what* to compute.
- Define every symbol the first time it appears.
- Prefer concrete numbers and units in examples.
- Use British-or-American spelling consistently within a file; the project uses standard
  international mathematical English.
- Keep paragraphs tight; use bullets for properties and conditions.
- Avoid unverifiable claims and official-curriculum alignment statements.
- Never duplicate an existing topic verbatim under another grade. If revisiting, change the
  treatment (e.g. Grade 9 factoring → Grade 11 polynomial roots with the factor theorem).

### LaTeX conventions

- Formula expressions contain no surrounding `$`.
- Prose math is written as `$x^2$`.
- Use `\frac{a}{b}`, `\sqrt{b^2-4ac}`, `\sin\theta`, `\pi r^2`, `\approx`.
- Use `^{\circ}` for degree symbols in LaTeX, or `°` in prose.
- Keep fractions readable; avoid overly deep nesting.
- KaTeX must render every expression without errors; content tests should fail on bad TeX.

## 2. Verify mathematics like a reviewer

For each example answer:

1. Solve independently, then compare to the written solution.
2. Check substitution, arithmetic, rounding, units, and sign conventions.
3. Check restrictions:
   - division by zero,
   - even roots of negatives,
   - logs of non-positive numbers,
   - triangle validity,
   - probability bounds,
   - geometric dimensions > 0.
4. For geometry, test a second dimension set to catch formula mix-ups.
5. For statistics, specify population vs. sample formulas and use the same definition everywhere.
6. Record completed checks in the delivery report.

### Canonical checks

| Item | Correct form |
|---|---|
| Pythagorean theorem | `a^2 + b^2 = c^2` (hypotenuse `c`) |
| Circle area / circumference | `A = πr²`, `C = 2πr` |
| Semicircle area | `A = ½πr²` (full perimeter `πr + 2r`) |
| Quadratic formula | `x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}` |
| Slope | `\frac{y_2-y_1}{x_2-x_1}`, `x_1 \ne x_2` |
| Sphere volume / surface | `V = \frac{4}{3}πr³`, `S = 4πr²` |
| Cylinder volume / surface | `V = πr²h`, `S = 2πr² + 2πrh` |
| Cone volume / surface | `V = \frac{1}{3}πr²h`, `S = πr² + πrℓ` |
| Sine rule | `\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}` |
| Cosine rule | `c² = a² + b² − 2ab\cos C` |

When in doubt, use exact values first, then an approximation; never round intermediate steps
more aggressively than the final answer.

## 3. Add or modify a shape

Shapes live in `src/data/shapes.ts`; pure calculations belong with the data or in
`src/lib/geometry.ts`. Rendering is separate from calculation.

1. Add the shape metadata: id, name, category (`2d` / `3d`), definition, properties,
   dimension definitions, and formulas.
2. Define dimension controls with min/max/step/default and guard against invalid geometry.
3. Implement each metric once as a pure `compute(dimensions)` function.
4. Reuse the same compute functions for the live value panel and solved examples.
5. For 2D shapes, add an SVG drawing keyed by shape id with honest dimension labels.
6. For 3D shapes, provide a mesh builder based on dimensions; no decorative shape that
   misrepresents the mathematics.
7. Unit tests must check known values, e.g. a radius-3 sphere has volume `36π`.
8. Verify degenerate/edge cases: radius → 0, height → 0, invalid triangle sides.

Do not duplicate formulas between the viewer, the content text, and the tests. One source of truth.

## 4. Build a UI feature

1. Identify the user journey and its loading/empty/error/not-found states.
2. Use existing primitives (`Button`, `Card`, `Badge`, `MathBlock`, `RichText`, `EmptyState`).
3. Add design tokens rather than new one-off colors; use existing spacing/radius/motion scales.
4. Ensure responsive behavior at 375px, 768px, and ≥1280px.
5. Ensure keyboard interaction, labels, focus management for dialogs, and screen-reader math
   descriptions.
6. Add an `IntersectionObserver` reveal only via the shared `Reveal` component; never trap content
   visible only after animation.
7. Respect `prefers-reduced-motion` by disabling transforms and transitions.
8. Test the real journey in the browser, including refresh persistence.

### Search additions

- Add aliases/synonyms to `src/data/search-synonyms.ts`, not to UI code.
- Search must match formula title, expression, topic/subject, theorem, shape, tags, and grade.
- Highlight matches in React text nodes; never use `dangerouslySetInnerHTML` for highlighting.
- Keyboard: `/` or `Ctrl/Cmd+K` opens search; arrows move; Enter opens; Escape closes.
- Filters: grade and subject, with clear reset and explicit result counts.
- Empty results must suggest broader terms, not show a blank page.

### Bookmarks

- Store only IDs and a schema version; derive titles/URLs from content.
- Handle malformed JSON and storage quota failures gracefully.
- Sync across tabs via the `storage` event if touching the bookmark store.
- Show all three types (formula, topic, shape) with distinct icons/filters.

## 5. Testing recipe

```bash
npm run typecheck
npm test -- --run
npm run build
npm run test:e2e
```

Minimum tests for content and features:

- Content integrity: unique grade/subject/topic/formula/exercise IDs, referenced topic IDs exist,
  valid MC indexes, non-empty variable definitions and explanations.
- Math: expected numeric results for representative formulas and all shape metrics.
- Search: synonyms, filters, ranking, no-result state.
- Bookmarks: add/remove, persistence across remount, corrupt storage.
- Exercises: MC and numeric scoring, tolerance, summary, retry.
- Routing: every grade/subject/topic renders; unknown IDs show a designed 404.
- Shape lab: dimension changes update values; labels toggle; keyboard-accessible controls.

Do not mock the feature under test into triviality. Test behavior a student can observe.

## 6. Accessibility and performance checks

- Keyboard-only pass: skip link → nav → page content → interactive controls.
- Screen reader pass on one formula page and one shape page.
- Color contrast AA for body text, muted text, buttons, and focus rings in both themes.
- Reduced motion: no entrance transforms, floating animation, or orbit spin.
- Canvas diagrams: provide a text alternative with dimensions and the current computed values.
- Lazy-load route-level modules and the Shape Lab where practical.
- No font layout shift; confirm self-hosted font files resolve in the production build.
- Lighthouse: target 90+ Performance, Accessibility, Best Practices, SEO.

## 7. Delivery report template

```text
Task:
Files changed:
What works:
Mathematics verified (examples checked):
Tests/commands run and results:
Responsive/a11y checks:
Known limitations or follow-ups:
```

Never claim a check passed without running it. If something cannot be done, say so and propose
an alternative that stays within the project boundaries.
