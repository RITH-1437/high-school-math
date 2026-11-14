# Probability — research status

**Status: researched and validated.**

Records: 18 formulas, 3 theorems, 11 topic mappings, examples and exercises in `research/data/`.
Every numeric claim is machine-checked (`MATHEMATICAL_ACCURACY_REPORT.md`).

## Coverage

Researched and documented:

- Basic probability, sample spaces, events, complement
- Addition rule (general and mutually exclusive special case)
- Multiplication rule and the test for independence
- Independent, dependent and mutually exclusive events (kept conceptually distinct)
- Conditional probability, two-way (contingency) tables, tree diagrams, Venn diagrams
- Bayes' theorem (Grade 12 enrichment framing)
- Expected value and discrete random variables
- Factorials, permutations, combinations, fundamental counting principle, repeated-item arrangements
- Binomial distribution, including mean `np` and variance `np(1−p)`

## Key sources

OpenStax *Introductory Statistics 2e* chapters 3 and 4 and *Precalculus 2e* §11.5; Wolfram MathWorld
for formal statements (inclusion–exclusion, conditional probability, Bayes, binomial, permutation,
combination); Math is Fun for explanatory treatments.

## Deliberate choices

- **`P(A ∪ B)` is presented before the mutually exclusive special case**, so students see the
  general rule first and the special case as a consequence of `P(A ∩ B) = 0`.
- **Independence is taught as a test, not just an assumption**: `P(A ∩ B) = P(A)P(B)` is used both
  to compute and to check, with an explicit example where the test fails.
- **Bayes' theorem stays `PARTIALLY_VERIFIED`** because the screening-test framing is a pedagogical
  construction rather than a source quotation. The algebra is standard; the status reflects the
  evidence for the *framing*, and is documented rather than quietly upgraded.
- **Permutations vs combinations** are distinguished by whether order matters, with both the
  formula and a counting argument shown.

## Gaps

Bayes needs a natural-frequency worked example. Hard-difficulty exercises are under-represented
(6 of 60 across both subjects). See `../reports/CONTENT_GAP_REPORT.md`.