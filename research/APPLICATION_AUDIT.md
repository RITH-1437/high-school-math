# Application Architecture & Content Audit

> **Product Name**: High School Math  
> **Repository Path**: `D:\Personal\my-project\math`  
> **Author**: Application Auditor (`audit`)  
> **Date**: November 14, 2026  
> **Status**: Completed Phase 1 Audit  
> **Target Goal**: Migration from generic international curriculum to official Cambodian MoEYS National Mathematics Curriculum (Grades 7–12)

---

## 1. Executive Summary

**High School Math** is a client-side digital textbook, interactive laboratory, and formula library designed for secondary school mathematics across Grades 7 to 12. The application is completely anonymous, account-free, privacy-preserving, and offline-capable, requiring zero backend services or databases.

The purpose of this audit is to systematically evaluate the existing software architecture, content contracts, data structures, and feature implementations before migrating the library's content to the official curriculum framework of the **Ministry of Education, Youth and Sport (MoEYS) of the Kingdom of Cambodia**.

### Key Architectural Strengths
- **Deterministic and Robust**: 100% browser-based with zero external API calls or tracking.
- **Strictly Typed Content Model**: Plain TypeScript objects validated by automated Vitest assertions ensure mathematical and typographical consistency.
- **Self-Contained Visual Laboratory**: Interactive 2D inline SVG diagrams and a custom-built, mathematically driven 3D canvas projection engine (built without heavy 3D dependencies such as Three.js).
- **Fast, High-Quality Typography**: KaTeX typesetting combined with self-hosted variable fonts (Fraunces and Inter) and a newly refreshed White + Navy Blue academic design system.

---

## 2. Technology Stack Overview

| Layer / Concern | Technology | Version | Purpose & Constraints |
|---|---|---|---|
| **Build Tool** | Vite | 7.3.8 | Rapid HMR, optimized tree-shaking, fast ESM builds |
| **Framework** | React | 19.3.1 | Core UI view layer, concurrent rendering |
| **Language** | TypeScript | 5.9.3 | Strict type-checking (`tsc --noEmit`), no `any` |
| **Routing** | React Router | 7.18.5 | Client-side URL management and deep linking |
| **Math Typesetting** | KaTeX | 0.19.1 | Fast, accessible LaTeX typesetting for inline and display math |
| **Styling** | Hand-authored CSS | Native CSS | CSS custom properties design token system (no Tailwind, no CSS-in-JS) |
| **Typography** | Fontsource Variable | 5.3.0 | Self-hosted `Inter` (UI/body) and `Fraunces` (display/editorial) |
| **Unit Testing** | Vitest + Testing Library | 5.1.0 | Rigorous content invariant tests and utility unit testing |
| **E2E Testing** | Playwright | 1.65.1 | End-to-end browser regression testing across viewports |
| **Persistence** | Browser `localStorage` | HTML5 | Account-free local storage for bookmarks, recents, and quiz attempts |

---

## 3. Current Content Structure & Metrics

The content library is organized as a strict four-tier hierarchy:
$$\text{Grade} \longrightarrow \text{Subject} \longrightarrow \text{Topic} \longrightarrow (\text{Theory}, \text{Formulas}, \text{Examples}, \text{Exercises}, \text{Mistakes})$$

### 3.1 Content Metrics Summary

```
Total Grades:               6  (Grades 7, 8, 9, 10, 11, 12)
Total Subjects:            27  (Covering 8 Subject Families)
Total Topics:              74  (Unique kebab-case slugs)
Total Formulas:           264  (Verified KaTeX expressions)
Total Worked Examples:    148  (7-step worked solutions)
Total Practice Exercises: 427  (Multiple-choice and numeric)
Total Interactive Shapes:  20  (12 2D SVG shapes + 8 3D Canvas solids)
```

### 3.2 Grade-by-Grade Content Breakdown

| Grade | Subjects | Topics | Formulas | Exercises | Examples | Primary Curricular Focus |
|---|:---:|:---:|:---:|:---:|:---:|---|
| **Grade 7** | 4 | 14 | 48 | 79 | 28 | Integers, rational numbers, basic algebra, angle relationships, 2D perimeter/area, basic probability |
| **Grade 8** | 4 | 12 | 42 | 70 | 24 | Real numbers, Pythagorean theorem, linear functions, polynomials, quadrilaterals, data displays |
| **Grade 9** | 4 | 13 | 45 | 76 | 26 | Radicals, quadratic introduction, similarity, circle geometry, Cartesian coordinates, scatter plots |
| **Grade 10** | 5 | 12 | 44 | 70 | 24 | Quadratic equations, trigonometry (sine/cosine rules), circle theorems, coordinate lines, inequalities |
| **Grade 11** | 5 | 12 | 46 | 72 | 24 | Polynomials, logarithms, unit circle, 2D vectors, matrices, conic introduction, conditional probability |
| **Grade 12** | 5 | 11 | 39 | 60 | 22 | Limits, differentiation, integration, complex numbers, 3D vectors, normal distribution |
| **Total** | **27** | **74** | **264** | **427** | **148** | — |

### 3.3 Subject Families

All subjects across the 6 grades map into 8 core subject families:
1. `number` (**Number Systems**, $\mathbb{N}$): Integers, rationals, real numbers, powers, roots, scientific notation.
2. `algebra` (**Algebra**, $x$): Expressions, linear equations, polynomials, quadratics, functions, sequences, systems.
3. `geometry` (**Geometry**, $\triangle$): Lines, angles, triangles, polygons, circles, congruence, similarity, 2D/3D solids.
4. `trigonometry` (**Trigonometry**, $\theta$): Right-triangle ratios, sine/cosine laws, unit circle, trigonometric identities.
5. `statistics-probability` (**Statistics & Probability**, $\Sigma$): Data representation, measures of center and spread, probability rules, distributions.
6. `coordinate-geometry` (**Coordinate Geometry**, $\langle x,y \rangle$): Cartesian coordinates, distance/midpoint/slope, line equations, circles and parabolas in coordinates.
7. `vectors-matrices` (**Vectors & Matrices**, $\nearrow$): 2D/3D vectors, matrix operations, determinants, linear systems.
8. `advanced` (**Advanced Mathematics**, $\int$): Limits, continuity, derivatives, integrals, calculus applications.

---

## 4. Type System Overview (`src/types/content.ts`)

The canonical types in `src/types/content.ts` serve as the absolute source of truth. Any content added or modified during the migration must conform to these interfaces.

```
                    ┌─────────────┐
                    │    Grade    │
                    └──────┬──────┘
                           │ 1:N
                    ┌──────▼──────┐
                    │   Subject   │
                    └──────┬──────┘
                           │ 1:N
                    ┌──────▼──────┐
                    │    Topic    │
                    └──────┬──────┘
         ┌────────────┬────┴───────┬────────────┬─────────────┐
         ▼            ▼            ▼            ▼             ▼
   ┌───────────┐┌───────────┐┌───────────┐┌───────────┐┌──────────────┐
   │  Theory   ││  Formula  ││  Example  ││ Exercise  ││CommonMistake │
   │  Section  ││           ││           ││ (MC / Num)││              │
   └───────────┘└───────────┘└───────────┘└───────────┘└──────────────┘
```

### Key Content Interfaces

1. **`Grade`**:
   - `id: GradeId` ('7' | '8' | '9' | '10' | '11' | '12')
   - `number: number`
   - `title: string`
   - `tagline: string`
   - `description: string`
   - `focus: string[]` (3–5 themes per grade)
   - `subjects: Subject[]`

2. **`Subject`**:
   - `id: string` (kebab-case, e.g., `number-systems`, `algebra`, `geometry`)
   - `family: SubjectFamily`
   - `title: string`
   - `description: string`
   - `topics: Topic[]`
   - `theorems?: Theorem[]` (Named theorems highlighted on subject pages)

3. **`Topic`**:
   - `id: string` (Globally unique slug, e.g., `quadratic-equations`)
   - `title: string`
   - `subtitle: string`
   - `introduction: string` (Prose with inline math `$..$`)
   - `prerequisites?: string[]`
   - `keyIdeas?: string[]`
   - `theory: TheorySection[]`
   - `formulas: Formula[]`
   - `examples: WorkedExample[]`
   - `mistakes: CommonMistake[]`
   - `exercises: Exercise[]`
   - `related: string[]` (References to other topic IDs)
   - `shapeId?: string` (Optional foreign key into `shapes.ts`)
   - `shapeCaption?: string`
   - `aliases?: string[]` (Alternative terms for search index)

4. **`Formula`**:
   - `id: string` (Globally unique namespaced slug, e.g., `g10-quadratic-formula-standard`)
   - `title: string`
   - `expression: string` (Pure LaTeX string without `$` delimiters)
   - `description: string`
   - `spoken?: string` (Screen reader reading)
   - `variables: VariableDefinition[]` (`symbol`, `name`, `unit?`, `note?`)
   - `conditions?: string[]` (Domain restrictions, e.g., $a \neq 0$)
   - `notes?: string`
   - `tags: string[]`

5. **`WorkedExample`**:
   - `title: string`
   - `problem: string`
   - `given: string[]`
   - `steps: ExampleStep[]` (`text`, `math?`)
   - `answer: string`

6. **`Exercise`** (`MultipleChoiceExercise | NumericExercise`):
   - Multiple Choice: `type: 'multiple-choice'`, `options: string[]`, `correctOption: number` (0-indexed).
   - Numeric: `type: 'numeric'`, `answer: number`, `tolerance?: number` (defaults to 0.01), `answerUnit?: string`.
   - Common fields: `id`, `prompt`, `promptMath?`, `hint?`, `explanation`, `difficulty: 'easy' | 'medium' | 'hard'`.

7. **`Shape`**:
   - `id: string`, `name: string`, `category: '2d' | '3d'`
   - `dimensions: ShapeDimension[]` (`key`, `label`, `symbol`, `min`, `max`, `step`, `defaultValue`, `unit`)
   - `metrics: ShapeMetric[]` (`key`, `label`, `formula`, `kind`, `compute: (dims) => number`, `exact?`)
   - `formulas: { label: string; expression: string; note?: string }[]`
   - `example: { problem: string; steps: string[]; answer: string }`

### Test Invariants (`src/data/content.test.ts`)
Vitest asserts strict invariants across the entire content tree:
- Exactly 6 grades (`7` through `12`).
- Topic IDs, Formula IDs, and Exercise IDs must be globally unique.
- Every topic must have: `introduction.length > 40`, `theory.length > 0`, `formulas.length > 0`, `examples.length > 0`, `exercises.length >= 4`, `mistakes.length > 0`.
- Every formula expression and variable symbol must successfully parse and render in KaTeX without throwing errors.
- Every inline `$..$` math fragment in descriptions, examples, and exercises must render without KaTeX errors.
- No control-character escapes (`\f`, `\t`, `\b`, `\r`, `\v`) in LaTeX strings.
- Multiple-choice questions must have $\ge 3$ options, unique options, and a valid integer `correctOption`.
- Numeric questions must have finite numerical answers.

---

## 5. Application Route Structure

Routing is managed via React Router 7 in `src/App.tsx`:

```
/                                   HomePage (Discovery hero, featured formulas, grade cards, recents)
├── grades                          GradesPage (Directory of all grades 7–12)
│   └── :gradeId                    GradePage (Overview of subjects in a specific grade)
│       └── subjects/:subjectId     SubjectPage (Sequential topic listing within a subject)
│           └── topics/:topicId     TopicPage (Complete lesson: theory, formulas, examples, exercises)
├── formulas                        FormulasPage (Master formula index with grade/subject filters)
│   └── :formulaId                  FormulaPage (Focused view of an individual formula & example)
├── shapes                          ShapesPage (Interactive Shape Lab with 2D/3D selector)
│   └── :shapeId                    ShapesPage (Direct link to specific 2D/3D shape lab)
├── search                          SearchPage (Real-time multi-attribute search & category filters)
├── bookmarks                       BookmarksPage (User-saved formulas, topics, and shapes)
└── *                               NotFoundPage (Accessible 404 fallback)
```

All route segments are dynamic and driven directly from data:
- `gradeHref(gradeId)` $\rightarrow$ `/grades/${gradeId}`
- `subjectHref(gradeId, subjectId)` $\rightarrow$ `/grades/${gradeId}/subjects/${subjectId}`
- `topicHref(gradeId, subjectId, topicId)` $\rightarrow$ `/grades/${gradeId}/subjects/${subjectId}/topics/${topicId}`
- `formulaHref(formulaId)` $\rightarrow$ `/formulas/${formulaId}`
- `shapeHref(shapeId)` $\rightarrow$ `/shapes/${shapeId}`

---

## 6. Feature Inventory & Implementation Analysis

### 6.1 Deterministic Client-Side Search (`src/lib/search.ts`)
- **Indexing**: Built at runtime from `grades`, `shapes`, and `formulaRefs`. Zero external search service.
- **Normalization**: NFKD accent stripping, lowercasing, normalization of math symbols ($\pi \to \text{pi}$, $\sqrt{} \to \text{sqrt}$, $\pm \to \text{plus minus}$, etc.).
- **Query Processing**: Stop-word filtering (`SEARCH_STOP_WORDS`), query tokenization, synonym expansion (`SEARCH_SYNONYMS` in `src/data/search-synonyms.ts`).
- **Scoring & Ranking**: Multi-field weighted scoring (exact title match, token match, keyword match, description match) adjusted by `kindRank` (Formulas: 5, Topics: 3, Shapes: 3, Subjects: 2).
- **Filters**: Instant client-side filtering by `grade` and `subjectFamily`.

### 6.2 Browser Persistence & Bookmarks (`src/lib/bookmarks.tsx`)
- **Key**: `axiom.bookmarks.v1` in `localStorage`.
- **Schema**: Array of `{ kind: 'formula' | 'topic' | 'shape', id: string, savedAt: number }` (capped at 500).
- **Safety**: Tolerates corrupt storage, handles storage quota limits gracefully, and synchronizes state across browser tabs via `window.addEventListener('storage', ...)`.
- **Orphan Tolerance**: If a bookmarked topic or formula ID is removed or renamed, `BookmarksPage.tsx` detects it as an orphan item without crashing.

### 6.3 Local Progress & Recents Tracking (`src/lib/progress.ts`)
- **Keys**: `axiom.recents.v1` (recent pages visited, max 8) and `axiom.exercises.v1` (exercise scores by topic).
- **Reactivity**: Emits and listens to `axiom:progress` custom window events for reactive updates across components without requiring a heavy global state library.

### 6.4 Interactive Visual Shape Lab (`src/components/shapes/`)
- **2D Geometry (`Shape2D.tsx`)**: Pure inline SVG renderer with dynamic dimensions, responsive viewBox, coordinate scaling, angle markers, and dimension labels.
- **3D Solids (`Shape3D.tsx`)**:
  - Custom canvas projection renderer executing pure matrix 3D-to-2D perspective and isometric mathematics.
  - Interactive mouse/touch drag for 3D rotation, zoom controls, and depth sorting (Painter's algorithm).
  - Handles 8 solids: Cube, Cuboid, Sphere, Cylinder, Cone, Square Pyramid, Triangular Prism, Rectangular Prism.
- **Metric Computation**: Dynamic recalculation of perimeter, area, volume, total surface area, slant height, diagonals, etc., with both decimal and exact ($\pi$ multiple) readouts.

### 6.5 Interactive Practice Exercise Player (`src/components/exercises/ExercisePlayer.tsx`)
- Supports step-by-step multiple-choice and numeric questions.
- Numeric input parser in `src/lib/format.ts` accepts standard decimals, fractions ($3/4$), negative values, and constants like $\pi$, evaluating answers against strict tolerances.
- Displays instant feedback, expandable hints, step-by-step solution explanations, and a final score summary persisted to `localStorage`.

### 6.6 Mathematics Rendering & RichText (`src/components/ui/Math.tsx`, `src/lib/inline-math.ts`)
- `MathBlock`: Displays stand-alone KaTeX equations with error boundary fallback.
- `RichText`: Tokenizes mixed prose and `$..$` inline math, rendering text and KaTeX spans seamlessly without layout shift.

---

## 7. What Must Be Preserved vs. What Must Be Replaced

| Area | Preserve (Keep Intact) | Replace / Adapt (Migration Scope) |
|---|---|---|
| **Design System** | Newly restyled White + Navy Blue academic tokens (`tokens.css`, `base.css`), typography (Fraunces + Inter), responsive grid layouts, animations. | No CSS or layout changes required. |
| **Component Library** | `RootLayout`, `Brand`, `Header`, `Footer`, `PageHero`, `ExercisePlayer`, `FormulaCard`, `ExampleCard`, `BookmarkButton`, `MathBlock`, `RichText`. | No component architecture changes required. |
| **Shape Lab Engine** | Complete 2D SVG and 3D Canvas rendering engines, slider controls, geometric projection math, dimension recalculations. | Shape names and metrics remain; ensure alignment with MoEYS geometry terminologies. |
| **Core Type Contracts** | The data structures in `src/types/content.ts` (`Grade`, `Subject`, `Topic`, `Formula`, `WorkedExample`, `Exercise`). | None; preserve existing interfaces strictly so UI components continue functioning seamlessly. |
| **Search & Persistence** | Search algorithm (`search.ts`), bookmark manager (`bookmarks.tsx`), recents tracker (`progress.ts`). | Update `src/data/search-synonyms.ts` with Cambodian math terms (e.g., Khmer transliterations, French/English variations). |
| **Curriculum Content** | Mathematical verification standards, 7-step example methodology, 4+ exercises per topic rule. | **REPLACE content in `src/data/grades/grade7.ts` through `grade12.ts`** to accurately reflect the official Cambodian MoEYS syllabus and textbook sequencing. |
| **Editorial Copy & Disclaimers** | Product name ("High School Math"), anonymity statement, browser privacy rules. | **REPLACE generic disclaimer** ("This library does not claim to follow any single official curriculum...") with official Cambodian MoEYS curriculum alignment statement. |
| **Homepage Features** | Hero layout, floating math symbols, statistics counters. | Re-point `featuredTopicIds` in `src/data/index.ts` to high-yield Cambodian national exam topics (Bac II and Diploma staples). |

---

## 8. Migration Risk Areas & Mitigation Strategy

### Risk 1: Violation of Content Contract Invariants
- **Risk**: New or modified content files may omit required fields (e.g. `< 4` exercises, missing worked examples, unclosed inline math delimiters `$`, or missing variable definitions), causing `npm test` (`content.test.ts`) to fail.
- **Mitigation**: Every content update must be run against `npm test` and `npm run typecheck` before considering the task complete. The authoring scripts and templates must enforce the 7-step example format and $\ge 4$ exercises per topic.

### Risk 2: KaTeX Syntax and Escape Character Corruption
- **Risk**: In LaTeX strings inside TypeScript files, accidental escape sequences (such as `\tau`, `\frac`, `\rho`, `\beta`) can be interpreted by JavaScript as control characters (`\t`, `\f`, `\b`, `\r`) unless escaped properly as `\\tau`, `\\frac`, `\\rho`, `\\beta`.
- **Mitigation**: `content.test.ts` includes an explicit test against control characters in expressions (`has no LaTeX control-character corruption`). Continue running this check on all grade files.

### Risk 3: Disruption of Existing Bookmarks and URLs
- **Risk**: If existing topic IDs or formula IDs are modified, users with saved bookmarks in `localStorage` could encounter broken references.
- **Mitigation**: `BookmarksPage.tsx` already implements orphan-detection, rendering orphaned entries gracefully without crashing. However, where concepts remain identical across curricula (e.g. `pythagorean-theorem`, `quadratic-equations`), retain the existing kebab-case slug.

### Risk 4: English Language Consistency for Cambodian Syllabus
- **Risk**: Cambodian textbooks are published in Khmer (with French/English mathematical heritage). The project contract specifies "English only" (AGENTS.md).
- **Mitigation**: All formulas, explanations, worked examples, and exercises must be authored in clear, accurate English while adhering strictly to the pedagogical sequence, scope, and terminology of the MoEYS curriculum. Cambodian mathematical terminology, Khmer chapter titles, and transliterations should be registered in `search-synonyms.ts` and topic `aliases` so users can search via either terminology.

### Risk 5: Multi-Agent Parallel File Conflicts
- **Risk**: Multiple agents modifying shared files simultaneously (e.g. `index.ts` or `package.json`).
- **Mitigation**: Adhere strictly to AGENTS.md Section 6: One agent owns one file at a time. Content workers each own exactly one grade file (`grade7.ts`, `grade8.ts`, etc.).

---

## 9. Conclusion & Next Steps

The application architecture of **High School Math** is exceptionally clean, well-tested, decoupled from any backend, and fully equipped to support the Cambodian MoEYS curriculum migration without requiring architectural refactoring.

Phase 1 (Audit) confirms that the data models, rendering engines, and persistence layers are ready. Upon completion of Phase 2 (Official Source Discovery & Registry by `@sources`), Phase 3 (Curriculum Mapping & Content Transformation) can begin immediately on a per-grade basis.
