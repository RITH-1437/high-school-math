# AGENTS.md — High School Math

> Product name and page title: **High School Math** (never "Axiom"). Use it in the header brand,
> `<title>`, footer, and any user-facing copy.

This file is the operating contract for every human or AI agent working in this repository.
Read it fully before changing code or content.

## 1. Project identity

**High School Math** is a premium, anonymous mathematics formula library for Grades 7–12.
It is a digital textbook and interactive mathematics laboratory, not a formula list.

- Grades 7, 8, 9, 10, 11, 12 only.
- English only.
- No accounts, login, authentication, payments, subscriptions, teacher/student management, or backend.
- Content, search, bookmarks, exercises, and shape interaction run entirely in the browser.
- Every feature must work; visual polish is never a substitute for correctness.

## 2. Stack (fixed — do not change without Lead approval)

| Concern | Choice |
|---|---|
| Build | Vite 7 |
| UI | React 19 + TypeScript (strict) |
| Routing | React Router 7 |
| Math typesetting | KaTeX |
| Styling | Hand-authored CSS design system (no Tailwind, no CSS-in-JS) |
| 2D diagrams | Inline SVG |
| 3D diagrams | Custom mathematically driven canvas renderer (no Three.js) |
| Search | Deterministic client-side index + scoring |
| Persistence | `localStorage` only (bookmarks, recents, exercise progress, theme) |
| Unit/integration tests | Vitest + Testing Library |
| E2E | Playwright |
| Fonts | Self-hosted Fontsource: Fraunces (display) + Inter (UI/body) |

Do not add a dependency unless it removes significant complexity and is approved. In particular,
do not add UI kits, icon packs, animation libraries, state managers, query libraries, CMSs, or
backend services. Native CSS animation is preferred.

## 3. Commands

```bash
npm run dev          # local development server
npm run typecheck    # TypeScript, no emit
npm run build        # typecheck + production build
npm run preview      # serve production build
npm test             # Vitest unit/integration suite
npm run test:e2e     # Playwright E2E suite
npm run test:all     # both suites
```

A change is not complete until `npm run typecheck`, `npm test`, and the relevant build/E2E checks pass.

## 4. Planned repository map

```text
src/
  main.tsx                  App bootstrap only
  App.tsx                   Router and providers
  types/content.ts          Source-of-truth content contracts
  data/
    grades.ts               Grade registry + aggregate helpers
    grades/grade7.ts …      Grade-owned content (one export per grade)
    shapes.ts               Shape definitions, dimensions, metrics
    index.ts                Derived indexes (formulas, topics, counts)
    search-synonyms.ts      Alternative mathematical terminology
  lib/
    search.ts               Build + rank the search index
    bookmarks.tsx           Bookmark context and localStorage persistence
    progress.ts             Recents and exercise attempts
    geometry.ts             Pure shape calculations and verification helpers
    format.ts               Number formatting and answer normalization
  components/
    layout/                 Header, MobileNav, Footer, PageShell
    ui/                     Buttons, cards, Math, RichText, badges, dialogs…
    shapes/                 ShapeCard, ShapeLab, ShapeViewer2D/3D
    exercises/              ExercisePlayer, score summary
  pages/                    Route-level pages
  styles/                   tokens.css, base.css, layout.css, components.css, pages.css
  test/                     Test setup and helpers
e2e/                        Playwright specs
```

## 5. Content contract

The canonical types live in `src/types/content.ts`. Do not invent parallel shapes.

Hierarchy: **Grade → Subject → Topic → (theory, formulas, examples, exercises)**.

Global invariants:

- Topic IDs are globally unique kebab-case slugs (e.g. `quadratic-equations`).
- Formula IDs are globally unique and namespaced by grade/topic
  (e.g. `g10-quadratic-formula-standard`).
- Exercise IDs are globally unique.
- Every formula has: title, LaTeX expression (no `$` delimiters), plain-English description,
  variable definitions, at least one condition/restriction when applicable, and search tags.
- Every topic has at least one worked example and at least four exercises.
- Examples use the 7-step structure: problem, knowns, formula, substitution, calculation,
  answer, units. Every calculation must be independently rechecked.
- Exercise answers must be unambiguous. Multiple-choice has exactly one correct index.
  Numeric answers include a tolerance and unit when relevant.
- No official-curriculum alignment claims.
- No duplicate identical topics across grade levels. Revisit advanced material only with a clearly
  different treatment (e.g. intro vs. calculus-based).
- Content lives in `src/data/`, never hardcoded in page components.
- Prose uses inline math `$...$`; display math is passed as LaTeX to the `MathBlock` component.
- Never inject user input as HTML. Only KaTeX-generated output may be marked up.

## 6. Parallel work and file ownership

When multiple agents work at once:

- **One agent owns one file at a time.** Never edit a file owned by another active workstream.
- Content agents own only their assigned `src/data/grades/gradeN.ts` file(s).
- Shape-content agents own only `src/data/shapes.ts` (plus explicitly assigned tests).
- The integration agent owns shared types, shared utilities, layout, and aggregate indexes.
- If a shared contract is wrong, report it; do not silently change it in a content file.
- Do not reformat or rewrite another agent's file to "clean it up".
- Do not edit `package.json`, lockfiles, or shared configs unless explicitly assigned.
- Do not run package installs, commit, or push unless explicitly asked.

Report back with: files changed, commands run/results, assumptions, and open risks.

## 7. Mathematics rules

Accuracy outranks coverage.

- Use `$...$` for inline math and LaTeX-free prose in variable descriptions.
- Angles are in degrees unless stated; include the degree symbol where a numerical value is given.
- Geometry answers use units; area is unit², volume unit³. State approximations with `\approx`
  and at most two decimal places unless exact values are available.
- Use `\pi` symbolically when exact, with a decimal approximation after it where useful.
- Prefer standard notation: `\sin`, `\cos`, `\tan`, `\log`, `\ln`, `\sqrt{}`, `\frac{}{}`.
- Verify every solved example independently before saving.
- Check domain restrictions: denominators not zero, radicands non-negative, log arguments
  positive, triangle inequality, non-negative dimensions, probability in `[0, 1]`.
- Do not fabricate theorems or misattribute names.
- Keep the mathematics appropriate to the grade, and label prerequisites explicitly.

Required spot checks (must remain correct):

- Pythagorean theorem: `a^2 + b^2 = c^2`.
- Circle area: `A = πr²`; circumference: `C = 2πr`.
- Quadratic formula: `x = (-b ± √(b² - 4ac)) / (2a)` — denominator covers both terms.
- Cylinder volume: `V = πr²h`.
- Slope: `m = (y₂ − y₁)/(x₂ − x₁)`, `x₁ ≠ x₂`.

## 8. Design and UX rules

- Design tokens are defined in `src/styles/tokens.css`; never scatter raw hex values.
- Typography: Fraunces for editorial display, Inter for UI/body, KaTeX for mathematics.
- The visual direction is premium editorial + cinematic digital lab: warm paper light theme,
  deep ink dark theme, restrained chartreuse/green accent, fine rules, generous space.
- Avoid excessive glassmorphism, gradient noise, oversized cards, and decorative animation.
- Motion must be GPU-friendly, purposeful, and completely disabled under
  `@media (prefers-reduced-motion: reduce)`.
- Every page needs loading (when applicable), empty, error, and not-found behavior.
- Desktop navigation must always visibly include Home, Grades, Shapes, Search, Bookmarks.
  Mobile keeps all five reachable and search one tap away.
- All interactive controls must work with keyboard and have visible focus states.
- Use semantic landmarks, headings in order, labels, `aria-current`, and accessible descriptions
  for visual mathematics.
- Color contrast: WCAG AA minimum. Tap targets: at least 44×44 px.
- No layout shift from font loading or images; avoid oversized images entirely.

## 9. Search, bookmarks, and state

- Search is derived from content; never maintain a separate hand-written search index.
- Support formula titles, expressions, topic/subject/grade names, theorems, shape names,
  and alternative terms (e.g. "Pythagoras", "sin/cos/tan").
- Bookmarks are keyed as `formula:<id>`, `topic:<id>`, `shape:<id>` in
  `localStorage` under a versioned key; validate parsed data and tolerate corruption.
- There are no accounts. Never add authentication or remote persistence.
- Derive counts, related formulas, and navigation links from data. Do not hardcode totals.

## 10. Testing and review

- Unit-test calculation utilities and content invariants: unique IDs, valid answer indexes,
  non-empty variables/explanations, valid related-topic references.
- Integration-test grade → subject → topic flow, search filters, bookmark persistence,
  exercise scoring, and shape dimension recalculation.
- E2E-test the primary user journeys at desktop and mobile widths.
- QA must record evidence for each acceptance item. Never report "passing" without running it.
- Reviewers must surface real issues with file paths and reproduction steps, not blanket approval.

## 11. Definition of done

A task is done when:

1. The implementation matches the content contract and design system.
2. The mathematics has been independently verified.
3. It works on mobile (375px), tablet (768px), and desktop (1440px).
4. Keyboard and screen-reader paths are usable, including reduced motion.
5. `npm run typecheck`, `npm test`, and the relevant E2E/build checks pass.
6. Empty/error/loading states exist where relevant.
7. No new console errors, dead links, unsafe HTML, or unapproved dependency exist.

## 12. Non-negotiable boundaries

No backend. No database. No auth. No tracking. No third-party API calls at runtime.
No content outside Grades 7–12. No placeholder formulas. No fake test results.
