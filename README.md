# High School Math

> **A premium, anonymous mathematics digital textbook, interactive laboratory, and national examination preparation platform for Grades 7–12.**

[![React](https://img.shields.io/badge/React-19.3-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9_Strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.19-00d8ff?style=flat-square&logo=latex&logoColor=white)](https://katex.org/)
[![Vitest](https://img.shields.io/badge/Vitest-52_Passed-6e9f18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tested-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-100%25_Client--Side-102a56?style=flat-square)](#architecture--tech-stack)
[![Bilingual](https://img.shields.io/badge/Bilingual-English_%7C_Khmer_(ខ្មែរ)-c83b45?style=flat-square)](#bilingual-support--glossary)
[![License](https://img.shields.io/badge/License-MIT-d6a84b?style=flat-square)](LICENSE)

---

## 📑 Table of Contents

- [Overview & Vision](#-overview--vision)
- [Key Features](#-key-features)
- [Curriculum Coverage & Statistics](#-curriculum-coverage--statistics)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Repository Map & Project Structure](#-repository-map--project-structure)
- [Getting Started & Development Guide](#-getting-started--development-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Typechecking & Verification](#typechecking--verification)
  - [Testing (Unit & E2E)](#testing-unit--e2e)
  - [Production Build & Preview](#production-build--preview)
- [Mathematical & Pedagogical Philosophy](#-mathematical--pedagogical-philosophy)
  - [The 7-Step Solution Framework](#the-7-step-solution-framework)
  - [Mathematical Invariants & Domain Boundaries](#mathematical-invariants--domain-boundaries)
  - [Cambodian MoEYS Curriculum Alignment](#cambodian-moeys-curriculum-alignment)
- [Interactive Shape Lab (2D & 3D)](#-interactive-shape-lab-2d--3d)
- [National Examination Testing Lab](#-national-examination-testing-lab)
- [Bilingual Support & Glossary](#-bilingual-support--glossary)
- [Design System & Accessibility](#-design-system--accessibility)
- [Privacy, Offline Resilience & Local Storage](#-privacy-offline-resilience--local-storage)
- [Contribution Guidelines](#-contribution-guidelines)
- [License & Acknowledgments](#-license--acknowledgments)

---

## 🌟 Overview & Vision

**High School Math** is a browser-native digital textbook and interactive mathematics laboratory crafted for secondary school students, educators, and candidates preparing for national examinations in **Grades 7 through 12**. 

Unlike flat reference tables or cheat sheets, High School Math treats mathematics as an interconnected, deductive discipline. Every formula is grounded in its theoretical derivations, illustrated with comprehensive step-by-step worked solutions, accompanied by interactive practice exercises, and linked to visual geometry models that students can manipulate in real-time.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                      HIGH SCHOOL MATH                       │
       │           Digital Textbook & Interactive Lab                │
       └──────┬──────────────────────┬────────────────────────┬──────┘
              │                      │                        │
       ▼                      ▼                        ▼
 📚 CURRICULUM          📐 SHAPE LAB             📝 EXAM LAB
  • Grades 7–9           • 12 2D SVG Geometries   • Diploma (Grade 9)
    (Lower Secondary)    • 8 3D Isometric Canvas  • Bac II (Grade 12)
  • Grades 10–12         • Live Dimensions        • Semester Exams
    (Upper Secondary)    • Exact π & Surds        • MoEYS 6-Tier Grades
```

### Core Design Principles

1. **Digital Textbook & Laboratory, Not a Formula Sheet**: Formulas are never presented in isolation. Every entry includes plain-language descriptions, screen-reader speech transcriptions, rigorous domain restrictions, variable definitions with dimensional units, and concrete worked examples.
2. **Zero Backend, Absolute Privacy**: No accounts, no sign-ins, no tracking scripts, no third-party telemetry, and no remote databases. Everything—from search indexing to real-time 3D geometry and timed national exam simulations—runs 100% in the client browser.
3. **Bilingual by Design**: Seamless switching between **English** and **Khmer (ភាសាខ្មែរ)**, pairing international mathematical standards with official Cambodian Ministry of Education, Youth and Sport (MoEYS) classroom terminology and French loan cognates.
4. **Editorial Aesthetic & Cinematic Quality**: Powered by a hand-crafted design system inspired by academic publishing and vintage scientific instruments—featuring warm paper light mode, deep midnight ink dark mode, fluid typography, and KaTeX typesetting.

---

## 🚀 Key Features

| Feature | Description | Highlights |
|---|---|---|
| 🎓 **Curriculum Tracks (Grades 7–12)** | Complete coverage of lower and upper secondary mathematics structured into 8 fundamental subject families. | 6 Grades · 27 Subjects · 74 In-depth Topics · 264 Namespaced Formulas |
| 📐 **Interactive Shape Lab** | Real-time parametric geometry laboratory with dynamic 2D inline SVG and custom 3D isometric canvas rendering. | 20 Shapes (12 2D, 8 3D) · Dynamic sliders · Exact algebraic expressions ($\pi$, surds, radicals) · Zero Three.js |
| 📈 **Function Grapher** | Exact Cartesian plotting for lines, parabolas, polynomials, rational, trigonometric, root and absolute-value functions. | Intercepts · Vertex · Domain & range · Point tracer · Table of values · Step-by-step plotting guide |
| 📝 **MoEYS National Exam Lab** | Timed mock examinations with real-world format matching Cambodian national diploma and baccalaureate standards. | Grade 9 Diploma · Grade 12 Bac II · Semester Papers · Official A–F Letter Grading · Printable exam layout |
| 🌐 **Bilingual Khmer/English** | Native bilingual interface and curriculum content with dedicated Khmer typography and terminology. | English & ភាសាខ្មែរ · Khmer lesson prose · Khmer Shape Lab · 227-term enriched glossary · Noto Sans/Serif Khmer Variable fonts · MoEYS vocabulary |
| 🔬 **7-Step Worked Examples** | Pedagogically verified problem-solving sequences ensuring complete comprehension of every step. | 148 Worked Examples · Problem, Given, Formula, Substitution, Calculation, Answer, Units |
| ✍️ **Interactive Practice Exercises** | Self-scoring multiple-choice and numeric problem sets with step-by-step explanations and hint systems. | 427 Exercises · Configurable numeric tolerance · Real-time validation · Attempt history |
| 🔍 **Deterministic Instant Search** | Instant client-side search engine indexed over formulas, variables, theorems, topics, and bilingual synonyms. | Sub-millisecond queries · Weighted field scoring · Alias matching · Zero network calls |
| 🛡️ **Privacy-First & Offline Ready** | Fully self-contained single-page application with zero remote requests and full offline resilience. | No auth · No cookies · Zero trackers · Local persistence in `localStorage` |

---

## 📊 Curriculum Coverage & Statistics

The High School Math library is structured around a strict hierarchy: **Grade → Subject Family → Subject → Topic → (Theory, Formulas, Worked Examples, Exercises)**.

```text
Library Totals:
├── 6 Grades (Grades 7–12)
├── 8 Subject Families
├── 27 Curated Subjects
├── 74 Rigorous Topics
├── 264 Math Formulas
├── 148 7-Step Worked Solutions
├── 427 Interactive Exercises
├── 20 Interactive Shapes (12 2D + 8 3D)
└── 227 Bilingual Mathematical Glossary Terms
```

### Grade Overview

| Grade | Phase / Track | Focus Themes | MoEYS Milestones |
|:---:|:---:|---|---|
| **Grade 7** | Lower Secondary | Integers, fractions, decimals, introductory linear algebra, plane geometry, perimeter & area, basic data representation. | Foundation building for secondary mathematics |
| **Grade 8** | Lower Secondary | Real numbers, exponents, polynomial expressions, linear inequalities, Cartesian coordinates, surface area & volume. | Expansion into algebraic abstraction & solid geometry |
| **Grade 9** | Lower Secondary (Diploma Track) | Quadratic equations, systems of linear equations, circle theorems, similarity, trigonometry fundamentals, probability. | **National Lower Secondary Diploma Examination** (*ឌីប្លូម*) |
| **Grade 10** | Upper Secondary | Functions & relations, quadratic functions, polynomial division, logarithms & exponents, circle analytic geometry, trigonometry identities. | Transition to advanced secondary mathematics |
| **Grade 11** | Upper Secondary | Sequences & series, combinatorial mathematics, binomial theorem, trigonometric equations, vectors in 2D/3D, statistics & variance. | Advanced algebraic structures & spatial geometry |
| **Grade 12** | Upper Secondary (Bac II Track) | Differential calculus, limits, derivatives & curve sketching, integral calculus & areas, complex numbers, 3D analytic geometry. | **National High School Baccalaureate Examination** (*បាក់ឌុប*) |

### Subject Families

1. **Number Systems (ℕ)**: Integers, rational and real numbers, scientific notation, powers, roots, and surd arithmetic.
2. **Algebra ($x$)**: Expressions, factoring, linear and quadratic equations, systems, inequalities, and functions.
3. **Geometry ($\triangle$)**: Euclidean plane geometry, congruence, similarity, circles, polygons, and spatial measurements.
4. **Trigonometry ($\theta$)**: Right-triangle ratios, unit circle, trigonometric identities, sine/cosine laws, and periodic functions.
5. **Statistics & Probability ($\Sigma$)**: Central tendency, dispersion, probability laws, combinations, permutations, and distributions.
6. **Coordinate Geometry ($\langle x,y \rangle$)**: Lines, slopes, distances, midpoints, conic sections, and circle equations.
7. **Vectors & Matrices ($\nearrow$)**: Vector components, dot products, 2D/3D transformations, determinants, and matrix operations.
8. **Advanced Mathematics ($\int$)**: Limits, continuity, differential calculus, indefinite/definite integration, and complex numbers.

---

## 🏗️ Architecture & Tech Stack

High School Math adheres to a strict zero-backend architecture. There is no server API, database, or cloud synchronization layer. All computation, rendering, state management, and search indexing execute within the user's browser runtime.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BROWSER CLIENT RUNTIME                          │
├────────────────────────────────────────────────────────────────────────┤
│  UI Layer: React 19 + React Router 7 (Strict TypeScript)               │
│  Math Typography: KaTeX 0.19 (Serverless client-side typesetting)      │
│  Visual Engine: Inline SVG (2D) + Custom Canvas Pipeline (3D Isometric) │
│  Search Engine: In-memory inverted index + Token scoring + Synonyms     │
│  Storage Layer: Versioned browser `localStorage` schema                │
│  Styling Engine: Pure CSS Design Tokens (No Tailwind, No CSS-in-JS)   │
└────────────────────────────────────────────────────────────────────────┘
```

### Technology Matrix

| Concern | Technology | Version | Rationale |
|---|---|---|---|
| **Build Tool** | Vite | `^7.3.8` | Instant ESM HMR during development and optimized Rollup production builds. |
| **UI Framework** | React | `^19.3.1` | Concurrent rendering, modern hooks, zero external UI component library dependency. |
| **Routing** | React Router | `^7.18.5` | Client-side routing with code-splitting (`React.lazy` / `Suspense`). |
| **Language** | TypeScript | `^5.9.3` | Enforces strict compile-time contracts (`strict: true`, `noUncheckedIndexedAccess`). |
| **Math Typesetting** | KaTeX | `^0.19.1` | Ultra-fast LaTeX rendering without external network requests or MathJax overhead. |
| **Typography** | Fontsource | `^5.3.0` | Self-hosted *Fraunces Variable*, *Inter Variable*, *Noto Sans Khmer*, and *Noto Serif Khmer*. |
| **2D Geometry** | Inline SVG | Native | Mathematically calculated vector paths, dynamic tick marks, and dimension guides. |
| **3D Geometry** | HTML5 2D Canvas | Native | Custom matrix rotation, isometric projection, depth sorting, and wireframing (no Three.js). |
| **State & Storage**| Web Storage | Native | Resilient `localStorage` persistence with defensive schema parsing and zero external state store. |
| **Unit Testing** | Vitest + Testing Library | `^5.1.0` / `^16.3.3`| In-memory unit and integration test suite with JSDOM environment. |
| **E2E Testing** | Playwright | `^1.65.1` | Multi-viewport end-to-end testing across Desktop (1440px), Tablet (768px), and Mobile (375px). |

### Architectural Invariants

- **No Third-Party Component Kits**: No Material UI, Tailwind CSS, Bootstrap, or styled-components. All components use scoped, clean CSS classes driven by CSS custom properties in `tokens.css`.
- **No Heavy 3D Engines**: Three.js, Babylon.js, or WebGL shaders are strictly avoided. The custom canvas renderer calculates vertex transformations, depth buffers, and lighting in fewer than 650 lines of pure, transparent mathematics.
- **No Remote Telemetry**: Zero tracking pixels, Google Analytics, cookies, or remote pings. The site functions identically whether fully connected to the internet or completely offline.

---

## 📁 Repository Map & Project Structure

```text
high-school-math/
├── .github/                     CI/CD workflows and automated verification
├── e2e/                         Playwright end-to-end user journey tests
│   └── app.spec.ts              Comprehensive multi-viewport test suite
├── public/                      Static assets, favicon manifests, and illustrations
│   └── img/                     High-resolution brand icons and diagrams
├── src/
│   ├── components/              Modular presentation and interaction components
│   │   ├── exercises/           Interactive problem runners and score badges
│   │   │   └── ExercisePlayer.tsx
│   │   ├── layout/              Header, Footer, MobileNav, Language Switcher
│   │   │   ├── Brand.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── RootLayout.tsx
│   │   ├── shapes/              Interactive geometry canvas and SVG engines
│   │   │   ├── Shape2D.tsx      Dynamic inline SVG renderer with live dimensions
│   │   │   ├── Shape3D.tsx      Custom 3D canvas isometric engine
│   │   │   ├── ShapeCard.tsx    Card preview component for shapes directory
│   │   │   └── ShapeLab.tsx     Full interactive playground with live controls
│   │   └── ui/                  Atomic design elements (Cards, Dialogs, Icons)
│   │       ├── Graph.tsx        Exact SVG Cartesian graph renderer
│   │       ├── Flowchart.tsx    Curriculum flowchart renderer
│   │       ├── Math.tsx         KaTeX math wrapper (Inline & Block display)
│   │       ├── ExampleCard.tsx  7-step worked solution card
│   │       ├── FormulaCard.tsx  Card representation of namespaced formulas
│   │       └── Icons.tsx        Hand-crafted accessible SVG icons
│   ├── data/                    Single source of truth for curriculum & shapes
│   │   ├── grades/              Individual curriculum files by grade level
│   │   │   ├── grade7.ts        Grade 7 curriculum content
│   │   │   ├── grade8.ts        Grade 8 curriculum content
│   │   │   ├── grade9.ts        Grade 9 curriculum content (Diploma Track)
│   │   │   ├── grade10.ts       Grade 10 curriculum content
│   │   │   ├── grade11.ts       Grade 11 curriculum content
│   │   │   └── grade12.ts       Grade 12 curriculum content (Bac II Track)
│   │   ├── glossary-enriched.ts Extended bilingual math definitions & annotations
│   │   ├── index.ts             Aggregate indexing, relational lookups & statistics
│   │   ├── search-synonyms.ts   Synonym mappings, acronyms & alternate spellings
│   │   └── shapes.ts            Mathematical definitions, dimensions & metric formulas
│   ├── i18n/                    Internationalization dictionary & localization
│   │   ├── en.ts                English localization strings
│   │   ├── km.ts                Khmer (ភាសាខ្មែរ) localization strings
│   │   ├── content.ts           Bilingual mapping for curriculum titles & topics
│   │   ├── shapes-km.ts         Khmer Shape Lab definitions, properties & examples
│   │   ├── glossary.ts          227-term bilingual mathematics terminology
│   │   └── types.ts             Language types & translation keys
│   ├── lib/                     Pure logic, math engines, search & state management
│   │   ├── bookmarks.tsx        Bookmark context with versioned localStorage
│   │   ├── exam.ts              Exam generator, Mulberry32 PRNG, MoEYS grading
│   │   ├── format.ts            Number formatting, tolerance verification & units
│   │   ├── i18n.tsx             Language provider, document lang sync, font switches
│   │   ├── inline-math.ts       Prose parser for `$math$` LaTeX expressions
│   │   ├── math-parser.ts       Safe expression parser and function analyzer
│   │   ├── progress.ts          Exercise attempts & recently viewed items
│   │   ├── search.ts            Deterministic multi-field client-side search engine
│   │   └── theme.tsx            Light/dark theme provider with flash-prevention
│   ├── pages/                   Route-level views and feature dashboards
│   │   ├── BookmarksPage.tsx    User saved formulas, topics, and shapes
│   │   ├── ExamPage.tsx         Timed MoEYS testing lab & printable paper preview
│   │   ├── FormulaPage.tsx      Dedicated permalink view for individual formulas
│   │   ├── FormulasPage.tsx     Filtered directory of all 264 formulas
│   │   ├── GlossaryPage.tsx     Bilingual searchable terminology dictionary
│   │   ├── GraphPage.tsx        Interactive function grapher and analyzer
│   │   ├── GradePage.tsx        Single grade dashboard with subject breakdowns
│   │   ├── GradesPage.tsx       Overview of all Grades 7–12
│   │   ├── HomePage.tsx         Editorial landing page with quick jump hubs
│   │   ├── NotFoundPage.tsx     Accessible 404 handler with fallback search
│   │   ├── SearchPage.tsx       Deep search interface with real-time filters
│   │   ├── ShapesPage.tsx       Interactive Shape Lab with 2D & 3D tabs
│   │   ├── SubjectPage.tsx      Subject-level view with theorem highlights
│   │   └── TopicPage.tsx        Topic deep-dive: Theory, Formulas, Examples, Exercises
│   ├── styles/                  Pure CSS design system
│   │   ├── base.css             Reset, CSS variables binding, accessibility & print
│   │   ├── components.css       Buttons, cards, badges, inputs, math blocks
│   │   ├── exam.css             Exam testing interface, timer, printable sheets
│   │   ├── layout.css           Grid shells, navigation, mobile drawer, footer
│   │   ├── pages.css            Page-specific visual styling & hero banners
│   │   └── tokens.css           Core design tokens: colors, spacing, typography, radii
│   ├── test/                    Test configuration and setup
│   │   └── setup.ts             Vitest matchers & browser mocks setup
│   ├── types/                   Source-of-truth TypeScript definitions
│   │   ├── content.ts           Grades, subjects, topics, formulas, examples, shapes
│   │   └── exam.ts              Exam papers, sections, grading tiers, score summaries
│   ├── App.tsx                  Router setup, code-splitting & layout providers
│   └── main.tsx                 React 19 root bootstrap & self-hosted font loading
├── AGENTS.md                    Repository operating rules and mathematical contracts
├── index.html                   HTML entry point with flash-prevention script
├── package.json                 Dependencies, build scripts & engine constraints
├── playwright.config.ts         Playwright multi-device configuration
├── tsconfig.json                Strict TypeScript configuration
└── vite.config.ts               Vite configuration with KaTeX font optimization
```

---

## 🛠️ Getting Started & Development Guide

### Prerequisites

Ensure your development environment meets the following baseline requirements:
- **Node.js**: `v18.20.0` or `v20.x`+ (LTS recommended)
- **npm**: `v9.x`+ or `v10.x`+ (or compatible package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/high-school-math.git
cd high-school-math
npm install
```

### Development Server

Start the local development server with Vite hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Typechecking & Verification

Verify TypeScript compilation without emitting output to catch any typing inconsistencies:

```bash
npm run typecheck
```

### Testing (Unit & E2E)

Run the Vitest unit and integration test suite (covering content invariants, LaTeX compilation, search ranking, and MoEYS exam scoring):

```bash
# Run unit & integration tests once
npm test

# Run tests in watch mode during development
npm run test:watch
```

Run end-to-end tests across Desktop, Tablet, and Mobile viewports using Playwright:

```bash
# Run Playwright E2E suite (automatically starts local web server)
npm run test:e2e

# Run both unit tests and E2E tests together
npm run test:all
```

### Production Build & Preview

Compile and bundle the production-ready distribution:

```bash
npm run build
```

Preview the production build locally to verify asset loading, chunking, and font optimizations:

```bash
npm run preview
```

### Available NPM Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Starts the local dev server on `http://localhost:5173`. |
| `npm run build` | `tsc --noEmit && vite build` | Typechecks the entire project and outputs static bundle into `dist/`. |
| `npm run preview` | `vite preview` | Serves the production build locally on `http://localhost:4173`. |
| `npm run typecheck`| `tsc --noEmit` | Validates TypeScript types across the entire project. |
| `npm test` | `vitest run` | Runs all 52+ unit and integration tests. |
| `npm run test:watch` | `vitest` | Runs tests in interactive watch mode. |
| `npm run test:e2e` | `playwright test` | Runs multi-browser end-to-end tests. |
| `npm run test:all` | `vitest run && playwright test` | Runs the full verification pipeline (unit + E2E). |

---

## 📐 Mathematical & Pedagogical Philosophy

### The 7-Step Solution Framework

Every worked example in High School Math follows a structured 7-step pedagogical method designed to build systematic reasoning rather than rote memorization:

```text
1. Problem Statement   ──▶ Real-world or conceptual question clearly articulated
2. Given Quantities    ──▶ Explicit list of known variables, values, and units
3. Governing Formula   ──▶ Canonical formula stated before numbers are substituted
4. Substitution        ──▶ Clear, step-by-step replacement of symbols with values
5. Calculation         ──▶ Intermediate algebraic/arithmetic simplification
6. Final Answer        ──▶ Exact symbolic form (π, radicals) or rounded decimal
7. Dimensional Units   ──▶ Explicit units verifying dimensional consistency
```

### Mathematical Invariants & Domain Boundaries

Accuracy outranks coverage. All mathematical content adheres to rigorous formal constraints validated in automated test suites (`src/data/content.test.ts`):

- **Domain Boundaries**:
  - Non-zero denominators: $\frac{a}{b} \implies b \neq 0$
  - Real radicands: $\sqrt{x} \implies x \ge 0$ (unless complex numbers are explicitly treated in Grade 12)
  - Logarithmic arguments: $\log_b(x) \implies x > 0, b > 0, b \neq 1$
  - Triangle inequalities: $a + b > c, a + c > b, b + c > a$
  - Probability bounds: $0 \le P(A) \le 1$
- **Standard Notation**:
  - Exact quantities: $\pi$, $\sqrt{2}$, $\frac{1}{3}$ preserved symbolically, with decimal approximations clearly indicated using $\approx$.
  - LaTeX expressions are stored cleanly without enclosing `$` or `$$` delimiters in data models.
  - Standard functions: $\sin, \cos, \tan, \ln, \log, \lim_{x \to a}, \int_a^b$.
- **Spot-Checked Invariants**:
  - Pythagorean Theorem: $a^2 + b^2 = c^2$
  - Circle Metrics: $C = 2\pi r$, $A = \pi r^2$
  - Quadratic Formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ (denominator covers entire numerator)
  - Cylinder Volume: $V = \pi r^2 h$
  - Cartesian Slope: $m = \frac{y_2 - y_1}{x_2 - x_1}$ where $x_1 \neq x_2$

### Cambodian MoEYS Curriculum Alignment

High School Math integrates the official curriculum standards of the **Ministry of Education, Youth and Sport (MoEYS) of Cambodia (ក្រសួងអប់រំ យុវជន និងកីឡា)**:
- **Lower Secondary Cycle (Grades 7–9)**: Concludes with the National Examination for the Lower Secondary Education Diploma (*ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ - ឌីប្លូម*).
- **Upper Secondary Cycle (Grades 10–12)**: Concludes with the National High School Baccalaureate Examination (*ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ - បាក់ឌុប - Bac II*).
- **Curriculum Terminology**: Standardized terminology aligns with textbook standards published by the Department of Curriculum Development (MoEYS).

---

## 🎨 Interactive Shape Lab (2D & 3D)

The **Shape Lab** (`/shapes`) provides a hands-on visual laboratory for exploring 20 fundamental geometric shapes.

### 2D Inline SVG Engine
- Dynamic vector rendering with responsive viewBox.
- Dynamic dimension controls (sliders & number inputs with minimum, maximum, and step increments).
- Real-time display of side lengths, radii, perpendicular heights, right-angle indicators, and angle arcs.
- Live recalculation of Perimeter ($P$), Area ($A$), Circumference ($C$), Inradius ($r$), and Circumradius ($R$).

### 3D Custom Canvas Engine (Zero Three.js)
- Implemented from scratch using pure HTML5 2D Canvas matrix math (`src/components/shapes/Shape3D.tsx`).
- **Isometric & Perspective Projections**: Projects 3D $(X, Y, Z)$ vertices to $(U, V)$ 2D viewport coordinates.
- **Interactive Controls**:
  - Mouse/touch drag rotation (Azimuth and Elevation).
  - Smooth zoom controls (in/out/reset).
  - Auto-spin toggle with physics damping.
  - Dynamic dimensional wireframe guides with real-time text labels.
- **Lighting & Shading**: Normal-vector face shading based on directional illumination.
- **Exact Symbolic Math**: Computes exact multiples of $\pi$ (e.g. $18\pi$), simplified radicals (e.g. $4\sqrt{3}$), and formatted decimals.

### Catalog of 20 Supported Shapes

| 2D Geometries (12 Shapes) | 3D Geometries (8 Shapes) |
|---|---|
| • Triangle (Equilateral, Isosceles, Scalene) | • Cube |
| • Square | • Rectangular Prism (Cuboid) |
| • Rectangle | • Sphere |
| • Circle | • Cylinder |
| • Semicircle | • Cone |
| • Parallelogram | • Square Pyramid |
| • Rhombus | • Triangular Prism |
| • Trapezoid (Trapezium) | • General Rectangular Prism |
| • Kite | |
| • Regular Pentagon | |
| • Regular Hexagon | |
| • Regular Polygon ($n$-sided) | |

---

## 📝 National Examination Testing Lab

The **Exam Lab** (`/exam`) allows students to simulate genuine Cambodian national exams under realistic conditions.

```text
┌─────────────────────────────────────────────────────────────┐
│                 MoEYS NATIONAL EXAM LAB                     │
├─────────────────────────────────────────────────────────────┤
│  Exam Types:                                                │
│  1. Grade 9 Diploma (សញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ - ឌីប្លូម)       │
│  2. Grade 12 Bac II (សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ - បាក់ឌុប)      │
│  3. Semester 1 & Semester 2 Exams (Grades 7, 8, 10, 11)     │
├─────────────────────────────────────────────────────────────┤
│  Features:                                                  │
│  • Timed Simulation (60 to 150 minutes with countdown)      │
│  • Mulberry32 Seeded Deterministic Generation               │
│  • Official MoEYS 6-Tier Grading Scale (A, B, C, D, E, F)   │
│  • Dual Numeral Presentation (Khmer ០–៩ and Western 0–9)   │
│  • Standardized Printable Exam Paper Layout (CSS @media print)│
│  • Detailed Post-Exam Diagnostic by Topic Performance        │
└─────────────────────────────────────────────────────────────┘
```

### Official MoEYS Grading Scale

| Grade Letter | Khmer Classification | Percentage Range | Description |
|:---:|---|:---:|---|
| **A** | **និទ្ទេស A · ល្អប្រសើរ** | $\ge 90\%$ | Exceptional mastery of mathematical concepts and problem solving. |
| **B** | **និទ្ទេស B · ល្អណាស់** | $80\% - 89\%$ | Very strong performance with comprehensive accuracy. |
| **C** | **និទ្ទេស C · ល្អ** | $70\% - 79\%$ | Good conceptual grasp and consistent calculation skills. |
| **D** | **និទ្ទេស D · ល្អបង្គួរ** | $60\% - 69\%$ | Satisfactory mathematical knowledge with minor gaps. |
| **E** | **និទ្ទេស E · មធ្យម** | $50\% - 59\%$ | Minimum passing standard; meets basic curriculum competencies. |
| **F** | **និទ្ទេស F · ធ្លាក់** | $< 50\%$ | Did not meet minimum criteria; intensive remediation required. |

---

## 🌐 Bilingual Support & Glossary

High School Math is built with first-class internationalization (`en` and `km`) baked into the core architecture.

### Dedicated Khmer Typography
- Powered by self-hosted variable font weights from Google Fonts via Fontsource:
  - **Noto Serif Khmer Variable**: Used for headings and editorial emphasis.
  - **Noto Sans Khmer Variable**: Used for legible body text, labels, and table layouts.
- Khmer numerals (០, ១, ២, ៣, ៤, ៥, ៦, ៧, ៨, ៩) are systematically supported in exam papers, question numbers, and grade tags.

### 227-Term Mathematical Glossary (`/glossary`)
- Covers all five essential branches:
  1. **Number & Algebra** (*ចំនួន និងពិជគណិត*)
  2. **Geometry** (*ធរណីមាត្រ*)
  3. **Trigonometry** (*ត្រីកោណមាត្រ*)
  4. **Data & Probability** (*ទិន្នន័យ និងប្រូបាប៊ីលីតេ*)
  5. **Calculus & Advanced Math** (*គណិតវិទ្យាកម្រិតខ្ពស់ និងកាល់គុល*)
- Includes French loan cognates frequently used in Cambodian classrooms (e.g. *entier relatif*, *discriminant*, *apothème*, *hypoténuse*).

---

## 🎨 Design System & Accessibility

High School Math features a bespoke, hand-crafted design system inspired by classical scientific literature, architectural drafting, and modern editorial journals.

```
       LIGHT THEME (Warm Academic White)            DARK THEME (Midnight Ink)
 ┌────────────────────────────────────────┐ ┌────────────────────────────────────────┐
 │ Header: Academic Navy (#102A56)        │ │ Header: Midnight Navy (#091B38)        │
 │ Surface: Pure White (#FFFFFF)          │ │ Surface: Deep Navy (#102A56)           │
 │ Ink: Deep Slate (#17263D)              │ │ Ink: Soft White (#F7F9FC)              │
 │ Accents: Royal Blue & Academic Gold    │ │ Accents: Bright Cobalt & Gold Glow     │
 └────────────────────────────────────────┘ └────────────────────────────────────────┘
```

### Color Palette Tokens

- **Academic Navy** (`--palette-deep-navy: #102A56`): Foundational authority color for headers, badges, and primary structure.
- **Midnight Navy** (`--palette-midnight-navy: #091B38`): The deep ink background of the dark theme.
- **Academic Blue** (`--palette-academic-blue: #2457A7`): Interactive hyperlinks, active states, and focal accents.
- **Academic Gold** (`--palette-academic-gold: #D6A84B`): Highlights, formula marks, and honors tiers.
- **Cambodian Red** (`--palette-cambodian-red: #C83B45`): National identity accent, danger states, and error alerts.

### Accessibility Standards (WCAG 2.1 AA/AAA)

- **Color Contrast**: All text-to-background combinations meet or exceed the WCAG AA requirement of 4.5:1 (with large headers exceeding 7:1 AAA).
- **Touch Targets**: All interactive elements (buttons, inputs, shape sliders) have a minimum clickable area of 44×44 CSS pixels.
- **Keyboard Navigation**: Full `tabindex` flows, visible high-contrast focus rings (`:focus-visible`), and accessible skip links (`#content`).
- **Screen Reader Support**: All mathematical expressions include KaTeX semantic MathML and plain-language `spoken` descriptions.
- **Motion Reduction**: All transitions, card reveals, and animations are strictly disabled under `@media (prefers-reduced-motion: reduce)`.

---

## 🔒 Privacy, Offline Resilience & Local Storage

High School Math respects student and educator privacy unconditionally.

### Zero-Tracking Guarantee
- **No User Accounts**: No registration, no login forms, no OAuth providers.
- **No Analytics / Telemetry**: No tracking scripts, session replay libraries, or advertising pixels.
- **No Third-Party Font CDNs**: All fonts and assets are packaged and served locally from the app bundle.

### LocalStorage Schema Reference

All persistent user preferences and practice history remain exclusively inside the user's browser:

| Key | Type | Description |
|---|---|---|
| `axiom.theme.v1` | `'light' \| 'dark'` | Active interface theme mode. |
| `axiom.lang.v1` | `'en' \| 'km'` | Active interface and curriculum language. |
| `axiom.bookmarks.v1`| `BookmarkEntry[]` | User-saved bookmarks for formulas, topics, and shapes. |
| `axiom.recents.v1` | `RecentEntry[]` | Recently viewed formulas and topics (capped to 20 items). |
| `axiom.exercises.v1`| `ExerciseAttempt[]` | Historical practice exercise answers and accuracy states. |
| `hsm.exam.history.v1`| `ExamAttemptRecord[]`| Completed MoEYS mock examination results and scores. |

---

## 🤝 Contribution Guidelines

We welcome contributions from mathematicians, educators, curriculum specialists, and frontend engineers.

### How to Contribute

1. **Fork the Repository**: Create a topic branch from `main` (e.g. `feat/grade11-vectors-addition`).
2. **Follow Repository Invariants**: Read [`AGENTS.md`](file:///D:/Personal/my-project/math/AGENTS.md) carefully.
   - Do not add external UI libraries or dependencies without prior approval.
   - Keep mathematics accurate and verify all worked calculations independently.
   - Maintain the strict separation of concerns (`src/data/` for content, `src/components/` for UI).
3. **Verify Locally**:
   ```bash
   npm run typecheck
   npm test
   npm run build
   ```
4. **Submit a Pull Request**: Provide a clear explanation of changes, reference curriculum standards where applicable, and confirm all automated checks pass.

---

## 📜 License & Acknowledgments

### License
This project is open-source software licensed under the **[MIT License](file:///D:/Personal/my-project/math/LICENSE)**.

```text
Copyright (c) 2026 Nairith Rin
```

### Acknowledgments
- **Ministry of Education, Youth and Sport (MoEYS), Cambodia**: For curriculum frameworks, textbook standards, and national examination syllabi.
- **KaTeX Team**: For the fastest, most reliable mathematics typesetting engine on the web.
- **Fontsource & Google Fonts**: For *Fraunces Variable*, *Inter Variable*, *Noto Sans Khmer*, and *Noto Serif Khmer*.

---

<p align="center">
  <sub>High School Math — Dedicated to mathematics education for every student, everywhere.</sub>
</p>
