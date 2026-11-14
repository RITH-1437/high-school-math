# Statistics — research status

**Status: researched and validated.**

Records: 14 formulas, 2 theorems, 14 topic mappings, examples and exercises in `research/data/`.
Every numeric claim is machine-checked (`MATHEMATICAL_ACCURACY_REPORT.md`).

## Coverage

Researched and documented:

- Data types and sampling; choosing a display for the data
- Frequency tables, histograms, frequency polygons, time-series graphs, pie charts, stem-and-leaf
- Mean, median, mode (including grouped-data estimates), range
- Quartiles, percentiles, IQR, five-number summary, box plots, outlier rule (1.5 × IQR)
- Variance and standard deviation, **population and sample forms stated separately**
- z-scores and comparing values from different data sets
- Scatter plots, correlation, line of best fit, correlation versus causation
- Normal distribution, empirical rule (sourced; formula coverage is thin — see gap report)
- Discrete random variables and expected value

## Key source

OpenStax *Introductory Statistics 2e* §2.7 (fetched) is the primary reference for spread measures
and states the population/sample division difference explicitly. Wolfram MathWorld and Math is Fun
provide independent confirmation. NIST/SEMATECH documents the box-plot fence rule.

## Deliberate choices

- **Population and sample standard deviation are never conflated.** Each has its own record and
  its own notation (`σ` vs `s`), because sources use the symbols inconsistently.
- **Quartile convention is stated** wherever a result depends on it, since MathWorld documents
  more than one definition.
- **Chebyshev's rule is noted but not promoted to a theorem record**; it is confirmed in a fetched
  source but would need its own worked examples to be `VERIFIED` as a theorem.

## Gaps

Correlation coefficient `r` has sources but no formula record. The normal distribution needs more
worked problems, including inverse-normal. Grouped-data standard deviation is described in sources
but thinly represented. See `../reports/CONTENT_GAP_REPORT.md`.