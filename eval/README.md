# Evaluation sets

`golden_template.csv` shows the columns. Put real held-out reports in your own file (not committed): one row per report with its spec text and, ideally, the verified reference code (SAS is fine). Pick reports that cover simple, medium and complex listings, in rough proportion to your real mix, and include several multi-condition ones.

Rules that keep the result honest:
1. A report in the evaluation set must not be answerable from the library. Its own report-scope sources and precedent are hidden by the harness, but reference code stored in global, sponsor or study scope is not. Keep reference code in report scope.
2. Grade blind. The sheet hides which setting produced each row. Do not open `review_key.json` until grading is finished.
3. Use at least 30 reports before reading anything into a difference. The report prints confidence intervals.
4. Re-run with `--repeats 3` if results look unstable. The model is not deterministic.
