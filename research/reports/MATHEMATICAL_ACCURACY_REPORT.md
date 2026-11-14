# Mathematical Accuracy Report

Scope: every formula, theorem, example and exercise in `research/data/`.
Regenerate all figures with `node research/scripts/merge-and-verify.mjs`.

## Automated verification

The verifier (`research/scripts/merge-and-verify.mjs`) does four things, and reports them
separately rather than as one opaque "pass":

1. **Re-evaluates every numeric claim.** Each record's `check` block is a restricted JavaScript
   expression (numbers, `Math.*` and operators only; identifiers, assignment, string and regex
   literals are rejected). The evaluator compares the result to the claimed value within a stated
   tolerance.
2. **Enforces the VERIFIED rule.** `VERIFIED` requires machine-checkable evidence, `recomputed: true`,
   and source IDs resolving to **at least two distinct websites**. A record claiming `VERIFIED`
   with one site, or with a failing check, is an error.
3. **Cross-checks identifiers and references.** Unknown formula, topic, theorem, source or
   prerequisite IDs are reported.
4. **Structural checks.** Unique IDs; complete required fields; multiple-choice answers have
   exactly one valid option whose index and letter agree; duplicate options rejected.

## Results

| Check | Result |
|---|---|
| Numeric checks evaluated | 110 |
| Passed | **110** |
| Failed | **0** |
| Records with no numeric check (symbolic results) | 15 |
| Validation errors | 0 |
| Validation warnings | 0 |
| Formula records | 32 (25 VERIFIED, 7 PARTIALLY VERIFIED) |
| Theorem records | 5 (2 VERIFIED, 3 PARTIALLY VERIFIED) |

A zero-failure result is only meaningful because the checks are independent of the text: they
recompute the arithmetic rather than reading the author's prose. A record whose prose claimed the
wrong value but whose `check` block was right would pass the arithmetic check while the prose
stayed wrong — see "Residual risks" below.

## Convention issues found and resolved

These are the places where sources disagree or where an easy mistake hides:

1. **Population vs sample standard deviation.** Sources agree the population form divides by `N`
   and the sample form by `n − 1`, but terminology for the `n − 1` form is described by MathWorld
   as "inconsistent and ambiguous". The research records both forms explicitly and labels which
   is which, rather than presenting a single unqualified symbol.
2. **Quartile conventions.** MathWorld documents more than one quartile definition. Records that
   depend on a convention state the convention used.
3. **Bayes' theorem.** Status held at `PARTIALLY_VERIFIED` because the specific framing (a
   screening-test example with a stated false-positive rate) is a pedagogical construction, not a
   direct quotation from a source. The algebra itself is standard.
4. **Grade placement.** No fetched source assigns topics to Grades 7–12 in a way that could be
   quoted. All 25 topic records are therefore `recommendation`, not `source-backed`. This is a
   limitation of the evidence, not of the mathematics.

## Spot checks performed by hand

- OpenStax §2.7 (fetched) confirms `σ = √(Σ(x−μ)²/N)` and `s = √(Σ(x−x̄)²/(n−1))`.
- Wolfram MathWorld *Standard Deviation* (fetched) confirms the same, and the `68–95–99.7`
  intervals for normal data (0.6827, 0.9545, 0.9973).
- `μ = np` and `σ² = np(1−p)` for the binomial distribution are consistent across the binomial
  formula records and their examples.

## Residual risks

1. **Prose is not machine-checked.** Every example's prose, substitution line and explanation are
   written by an author and read by a human, not evaluated. A wrong number in prose with a correct
   `check` block would not be caught. This is the most likely remaining error class.
2. **Symbolic results** (15 records) have no numeric check by design; their correctness rests on
   the algebra being visibly right and on source agreement.
3. **Exercise answers** are machine-checked where numeric, but the *distractor* options in
   multiple-choice questions are not semantically verified — a plausible-looking wrong option could
   accidentally be correct under a different reading.
4. **Single-pass research.** Formulas were researched once. A second independent pass would
   increase confidence, especially for the seven `PARTIALLY_VERIFIED` records.
5. **Not yet checked against the app.** The app's own Grade 7–12 content has not been reconciled
   with this research; only statistics and probability overlap.

## Verdict

The statistics and probability slice is mathematically sound and correctly cited, with every
numeric claim machine-verified and every VERIFIED record backed by two or more distinct sites.
It is not a complete knowledge base, and the prose-level risk above remains until a human or a
second agent reads the examples end to end.