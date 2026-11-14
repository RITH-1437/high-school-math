# Additional Mathematics — research status

**Status: not researched.** No records for this subject area exist in `research/data/`.

This file exists so the research directory structure is complete and so the gap is explicit
rather than silent. It contains no mathematical content, because none was verified against a
fetched source.

## Scope that remains

Per the research brief, the areas to cover are:

- Complex numbers (arithmetic, conjugate, modulus, argument, polar form, De Moivre)
- Binomial theorem (expansion, coefficients, general term, Pascal's triangle)
- Mathematical induction (principle and worked proofs)
- Conic sections (parabola, ellipse, hyperbola, eccentricity, standard forms)
- Mathematical modelling (linear, quadratic, exponential and periodic models)
- Financial mathematics (simple and compound interest, annuities, depreciation)
- Discrete mathematics fundamentals (sets, logic, truth tables, graphs, recurrence relations)

Sequences, series and logarithms belong to the Algebra area; permutations and combinations to
Probability. Those boundaries are defined in `RESEARCH_METHODOLOGY.md` to avoid duplicate records.

## What a future agent must do

1. Follow `RESEARCH_METHODOLOGY.md` for schemas, ID prefixes (`CAL`) and statuses.
2. Fetch sources first, then write records that cite them.
3. Provide a `check` block for every numeric example.
4. Write `data/fragments/calculus-additional.{sources,topics,formulas,theorems,examples,exercises}.json`.
5. Run `node research/scripts/merge-and-verify.mjs` and clear all errors.

Recorded here so that the absence is visible in the final report rather than discovered later.