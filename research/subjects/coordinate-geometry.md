# Coordinate Geometry — research status

**Status: not researched.** No records for this subject area exist in `research/data/`.

This file exists so the gap is explicit rather than silent. It contains no mathematical content,
because none was verified against a fetched source.

## What a future agent must do

1. Read `RESEARCH_METHODOLOGY.md` for schemas, ID prefixes and verification statuses.
2. Fetch sources first (`webfetch` with markdown format), then write records that cite them.
   Never cite an unfetched page; never infer a citation from a search snippet.
3. Give every numeric example a `check` block and evaluate it before saving.
4. Write `data/fragments/<prefix>.{sources,topics,formulas,theorems,examples,exercises}.json`.
5. Run `node research/scripts/merge-and-verify.mjs` and clear every reported error.
6. Report counts exactly as the script computed them.

## Why this is documented as a gap

Seven of the nine subject areas in the research brief were not researched in the current pass
because the research agents were stopped by an external usage limit. The completed area is
Statistics and Probability. See `../reports/CONTENT_GAP_REPORT.md` for the full coverage table
and recommended research order.

No placeholder records were written to `research/data/`. The JSON datasets contain only
verified content.
