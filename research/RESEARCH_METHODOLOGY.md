# Research Methodology

Research-only knowledge base for the High School Math library (Grades 7–12, English).
No application code is produced or modified by this research.

## 1. Principles

1. **Evidence before assertion.** A fact is source-backed only if the source page was actually
   fetched and read in this research session. Search snippets are never evidence.
2. **Separate fact from recommendation.** Source-backed statements carry `sourceIds`.
   Grade placement, difficulty, visualizations and exercise design are *pedagogical
   recommendations* and are labelled as such.
3. **No copying.** Facts, formulas and definitions are paraphrased. No textbook passages,
   proprietary worked solutions or exam questions are reproduced. All examples and exercises
   are original.
4. **Grade placement varies internationally.** Records document the variation; there is no
   claim of one universal assignment, and no official-curriculum alignment is asserted.
5. **Boundary.** Grade 12 is the ceiling. Material beyond secondary school is excluded or
   flagged as enrichment.
6. **Gaps are documented, never hidden.** Incomplete areas appear in
   `reports/CONTENT_GAP_REPORT.md`.

## 2. Source access findings (tested 2026-11-14)

| Source | Automated access | Notes |
|---|---|---|
| Wolfram MathWorld | Works (`format: markdown`) | Equations appear as image alt-text, e.g. `x=(-b+/-sqrt(b^2-4ac))/(2a)`. Verify notation from alt-text. |
| Math is Fun | Works | Elementary-to-secondary explanations; Tier 3. |
| Paul's Online Math Notes (Lamar) | Works | Use current paths such as `/Classes/Alg/Alg.aspx`; old `QuadraticFormula.aspx` path returns 404. |
| Mathematics LibreTexts | Partly | Landing pages load; locate chapter URLs by search. |
| OpenStax | Landing is JS shell; guessed deep links 404 | Must discover real page URLs through search; never guess. |
| Khan Academy | Blocked (client challenge) | Cannot be cited as fetched. Record as "not accessible to automated retrieval". |

If a source cannot be fetched, it must not appear as a citation of a verified fact.

## 3. Verification statuses

| Status | Requirement |
|---|---|
| `VERIFIED` | Expression, variables and conditions match in **at least two independent fetched sources from different websites**, AND every numeric example passed machine recomputation (`check` block, Section 5). |
| `PARTIALLY_VERIFIED` | One fetched source, or two sources that differ in notation/conditions that were reconciled by reasoning; or example recomputed but sources limited. |
| `UNVERIFIED` | No fetched source, or research incomplete. |
| `REJECTED` | Found incorrect, misleading or unsupported; kept in the record with the reason. |

AI generation alone never produces `VERIFIED`.

## 4. ID and file conventions

Source and record IDs are prefixed by research area to avoid collisions:

| Area | Prefix | Fragment basename |
|---|---|---|
| Number systems | `NUM` | `number-systems` |
| Algebra (incl. sequences, series) | `ALG` | `algebra` |
| Geometry + coordinate geometry | `GEO` | `geometry` |
| Shapes + visualization | `SHP` | `shapes` |
| Trigonometry + vectors/matrices | `TRG` | `trig-vectors` |
| Statistics + probability | `STP` | `stats-probability` |
| Calculus + additional topics | `CAL` | `calculus-additional` |

- Sources: `SRC-<PFX>-001`, `SRC-<PFX>-002`, …
- Formulas: `F-<PFX>-<slug>` (e.g. `F-GEO-circle-area`)
- Theorems: `T-<PFX>-<slug>`
- Topics: `TOP-<PFX>-<slug>`
- Examples: `EX-<PFX>-<nnn>`; Exercises: `Q-<PFX>-<nnn>`
- Shapes: `S-SHP-<slug>`

Fragments are written to `research/data/fragments/<basename>.<kind>.json` where kind is
`sources`, `topics`, `formulas`, `theorems`, `examples`, `exercises`, or `shapes`. Each file is
a valid JSON **array**. The merge step concatenates fragments into `research/data/*.json`.

## 5. Record schemas

Dates use `YYYY-MM-DD`. Access date for this research: `2026-11-14`.
Grades are integers 7–12. All LaTeX is KaTeX-compatible, without `$` delimiters.

### 5.1 Source (`sources`)

```json
{
  "id": "SRC-GEO-001",
  "title": "Quadratic Formula",
  "author": "Eric W. Weisstein",
  "institution": "Wolfram Research",
  "website": "Wolfram MathWorld",
  "url": "https://mathworld.wolfram.com/QuadraticFormula.html",
  "tier": 2,
  "type": "formal-reference",
  "subjects": ["algebra"],
  "topics": ["quadratic equations"],
  "gradeRelevance": "Formal statement; suitable for teacher/reference use at Grades 9–11",
  "published": null,
  "accessed": "2026-11-14",
  "quality": "high",
  "verificationNotes": "What was checked on the page, and what the page does NOT cover.",
  "copyright": "Facts paraphrased; no text reproduced. See site terms of use."
}
```

`type`: `"formal-reference"` | `"educational-explanation"` | `"official-curriculum"` |
`"tool"`. `tier`: 1, 2 or 3 (per brief) or 4 for any other reputable source.
Only sources that were successfully fetched and read may be listed.

### 5.2 Topic / curriculum mapping (`topics`)

```json
{
  "id": "TOP-GEO-pythagorean-theorem",
  "subject": "geometry",
  "topic": "Pythagorean theorem",
  "subtopics": ["Theorem and converse", "Distance applications"],
  "recommendedGrade": 8,
  "gradeRange": [8, 9],
  "internationalVariation": "Typically introduced at ages 13–14 in many systems; documented in SRC-…",
  "gradeEvidence": ["SRC-GEO-003"],
  "gradeBasis": "source-backed | recommendation",
  "prerequisites": ["TOP-NUM-square-roots"],
  "difficulty": "intermediate",
  "learningObjectives": ["State the theorem", "Find a missing side of a right triangle"],
  "formulaIds": ["F-GEO-pythagorean-theorem"],
  "theoremIds": ["T-GEO-pythagorean-theorem"],
  "recommendedVisualizations": ["SVG right triangle with squares on each side"],
  "sourceIds": ["SRC-GEO-003", "SRC-GEO-004"]
}
```

`difficulty`: `"introductory" | "intermediate" | "advanced"`.

### 5.3 Formula (`formulas`)

```json
{
  "id": "F-GEO-circle-area",
  "name": "Area of a circle",
  "expression": "A = \\pi r^{2}",
  "subject": "geometry",
  "topicId": "TOP-GEO-circles",
  "subtopic": "Area",
  "category": "area",
  "recommendedGrade": 7,
  "gradeRange": [7, 8],
  "description": "Original wording.",
  "meaning": "What the formula represents and when to use it.",
  "variables": [
    { "symbol": "A", "name": "area", "unit": "square units" },
    { "symbol": "r", "name": "radius", "unit": "length unit" }
  ],
  "conditions": ["r ≥ 0", "All lengths in the same unit"],
  "restrictions": ["Applies to a circle in the Euclidean plane"],
  "derivation": "Short explanation or null",
  "example": {
    "level": "easy",
    "problem": "…",
    "given": ["r = 5 cm"],
    "required": "Area of the circle",
    "formula": "A = \\pi r^{2}",
    "substitution": "A = \\pi \\times 5^{2}",
    "calculation": ["A = 25\\pi", "A \\approx 78.54"],
    "answer": "A ≈ 78.54 cm²",
    "units": "cm²",
    "explanation": "Why each step is valid.",
    "check": { "expr": "Math.PI * 5 ** 2", "expected": 78.5398, "tolerance": 0.01 }
  },
  "relatedFormulaIds": ["F-GEO-circle-circumference"],
  "equivalentForms": ["A = \\frac{\\pi d^{2}}{4}"],
  "sourceIds": ["SRC-GEO-010", "SRC-GEO-011"],
  "verification": {
    "status": "VERIFIED",
    "sourcesChecked": ["SRC-GEO-010", "SRC-GEO-011"],
    "recomputed": true,
    "notes": "What matched across sources; any notation differences."
  }
}
```

The `check` block is **required** for every numeric example. `expr` is a JavaScript expression
using only numbers, `Math.*` and operators (no assignment, no functions defined by the
author); `expected` is the claimed answer; `tolerance` is the absolute allowance.
The verifier evaluates it independently. Non-numeric (symbolic) examples set
`"check": null` and are capped at `PARTIALLY_VERIFIED` unless a second derivation is documented
in `verification.notes`.

### 5.4 Theorem (`theorems`)

```json
{
  "id": "T-GEO-pythagorean-theorem",
  "name": "Pythagorean theorem",
  "subject": "geometry",
  "topicId": "TOP-GEO-pythagorean-theorem",
  "recommendedGrade": 8,
  "gradeRange": [8, 9],
  "statement": "In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs.",
  "notation": "a^{2} + b^{2} = c^{2}",
  "conditions": ["Triangle has a right angle", "c is opposite the right angle"],
  "explanation": "…",
  "proof": { "type": "outline", "summary": "Rearrangement proof with four congruent triangles." },
  "diagramRequirements": ["Right triangle with labelled legs and hypotenuse"],
  "application": { "problem": "…", "solution": "…", "check": { "expr": "Math.sqrt(3*3+4*4)", "expected": 5, "tolerance": 0.0001 } },
  "relatedTheoremIds": [],
  "sourceIds": ["…"],
  "verification": { "status": "VERIFIED", "sourcesChecked": ["…"], "recomputed": true, "notes": "…" }
}
```

### 5.5 Example (`examples`)

Standalone worked examples beyond the one embedded in each formula (intermediate and advanced):

```json
{
  "id": "EX-GEO-001",
  "subject": "geometry",
  "topicId": "TOP-GEO-circles",
  "grade": 7,
  "level": "intermediate",
  "problem": "…",
  "given": ["…"],
  "required": "…",
  "formulaIds": ["F-GEO-circle-area"],
  "steps": ["Select formula: …", "Substitute: …", "Calculate: …"],
  "answer": "…",
  "units": "…",
  "explanation": "…",
  "check": { "expr": "…", "expected": 0, "tolerance": 0.01 }
}
```

### 5.6 Exercise (`exercises`) — original questions only

```json
{
  "id": "Q-GEO-001",
  "grade": 7,
  "subject": "geometry",
  "topicId": "TOP-GEO-circles",
  "type": "multiple-choice",
  "difficulty": "easy",
  "question": "…",
  "options": ["…", "…", "…", "…"],
  "correctAnswer": "B",
  "correctOptionIndex": 1,
  "answerValue": null,
  "steps": ["…"],
  "explanation": "…",
  "formulaIds": ["F-GEO-circle-area"],
  "check": null
}
```

`type`: `"multiple-choice" | "numeric" | "word-problem" | "reasoning"`.
Multiple-choice records have exactly one correct option. Numeric/word-problem records set
`answerValue` (number) and `check`; MC computation questions also carry a `check`.

### 5.7 Shape (`shapes`)

```json
{
  "id": "S-SHP-cylinder",
  "name": "Cylinder",
  "dimension": "3d",
  "definition": "…",
  "classification": "Solid of revolution; right circular cylinder",
  "properties": ["…"],
  "counts": { "sides": null, "vertices": 0, "edges": 2, "faces": 3 },
  "dimensions": [{ "symbol": "r", "name": "radius" }, { "symbol": "h", "name": "height" }],
  "measures": [
    {
      "kind": "volume",
      "name": "Volume",
      "expression": "V = \\pi r^{2} h",
      "units": "cubic units",
      "formulaId": "F-SHP-cylinder-volume"
    }
  ],
  "relationships": ["…"],
  "formulaIds": ["…"],
  "exampleIds": ["…"],
  "diagramReferences": [{ "sourceId": "SRC-SHP-004", "note": "Describes labelled net; not copied" }],
  "visualizationOpportunities": ["Drag r and h; show net unrolling"],
  "sourceIds": ["…"],
  "verification": { "status": "…", "sourcesChecked": ["…"], "recomputed": true, "notes": "…" }
}
```

`measures[].kind` ∈ `"perimeter" | "circumference" | "area" | "lateralSurfaceArea" |
"totalSurfaceArea" | "volume" | "other"`. Perimeter vs circumference and lateral vs total
surface area must be kept distinct.

## 6. Roles

- **Research agents (7)** — one per area in Section 4; produce markdown + fragments.
- **Mathematics Verification Agent** — recomputes every `check`, re-derives key formulas,
  re-reads sources for the claimed match, downgrades statuses that are not supported.
- **Research QA Agent** — audits source credibility, missing subjects, grade placement,
  duplicates, missing explanations, incorrect data and incomplete citations.
- **Orchestrator** — merges fragments, runs validation scripts, writes statistics from the
  merged data, and publishes the reports. Counts are computed, never typed by hand.

## 7. Pipeline

1. Planning (this document).
2. Source discovery and validation (agents).
3. Curriculum mapping, grade research, formulas, geometry, theorems, examples, exercises.
4. Data structuring (fragments → merged JSON by script).
5. Independent verification (verification agent + `scripts/verify-research.mjs`).
6. Research QA audit.
7. Final reports generated from merged data.
