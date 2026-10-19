# Adverse event and safety listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that check adverse event dates, seriousness, outcome and consistency with other forms.

## LIB-AE-01: Adverse events starting before consent

Report ID: LIB-AE-01
Description: Adverse events with a start date before the informed consent date.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Consent date

Logic:
Scenario 1: AE start date < Consent date. Partial start dates: compare the known parts only and say so.
Exclude deleted AE forms.

Displays when: AE start is before consent.
Does not display when: AE start is on or after consent.
Sorting: Country, Site, Subject, AE start date
Notes: Events before consent usually belong in medical history.

## LIB-AE-02: AE end date before start date

Report ID: LIB-AE-02
Description: Adverse events whose end date is before the start date.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. AE end date

Logic:
Scenario 1: AE end date < AE start date, both dates present. Compare dates as dates. Partial dates: compare known parts only.

Displays when: End is before start.
Does not display when: End is on or after start, or end is null.
Sorting: Country, Site, Subject, AE start date

## LIB-AE-03: Fatal AE and death consistency

Report ID: LIB-AE-03
Description: Fatal adverse events with no matching death record, and death records with no fatal AE.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE outcome; 6. Date of death; 7. Disposition; 8. Issue

Logic:
Scenario 1: AE outcome = "Fatal" AND (no death date on the disposition or death form OR death date differs from AE end date).
Scenario 2: Death date present on the disposition or death form AND no AE with outcome = "Fatal".

Displays when: Fatal AE without death record, or death without fatal AE.
Does not display when: Death data and fatal AE agree.
Sorting: Country, Site, Subject
Notes: Some protocols record death as the primary cause rather than an AE.

## LIB-AE-04: Seriousness flag and criteria disagree

Report ID: LIB-AE-04
Description: Serious AEs with no seriousness criterion selected, and non-serious AEs with a criterion selected.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. Serious; 6. Criteria selected

Logic:
Scenario 1: Serious = "Yes" AND no seriousness criterion (death, life-threatening, hospitalization, disability, congenital anomaly, other medically important) is selected.
Scenario 2: Serious = "No" AND at least one criterion is selected.

Displays when: Seriousness flag and criteria disagree.
Does not display when: Flag and criteria agree.
Sorting: Country, Site, Subject, AE start date

## LIB-AE-05: SAE reporting timeliness

Report ID: LIB-AE-05
Description: Serious AEs reported later than the protocol allows.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. Date of awareness; 6. Date reported; 7. Hours or days late

Logic:
Scenario 1: Date reported - Date of awareness > [protocol reporting limit, often 24 hours]. If only dates are collected, compare in days.

Displays when: Report is later than the limit.
Does not display when: Report is within the limit.
Sorting: Country, Site, Subject
Notes: The limit comes from the protocol.

## LIB-AE-06: AE action taken withdraw with dosing still active

Report ID: LIB-AE-06
Description: AEs where the study drug was withdrawn but dosing continues after the AE start.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Action taken; 7. Last dose date

Logic:
Scenario 1: Action taken with study drug = "Drug withdrawn" AND the subject has an exposure record dated after the AE start date.

Displays when: Withdrawn but dosed afterwards.
Does not display when: No dosing after withdrawal.
Sorting: Country, Site, Subject
Notes: Check the dose-modification form if the protocol allows restart.

## LIB-AE-07: Outcome and end date disagree

Report ID: LIB-AE-07
Description: Outcome says recovered with no end date, or an end date with an ongoing or not recovered outcome.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. AE end date; 7. Outcome

Logic:
Scenario 1: Outcome in ("Recovered/Resolved", "Recovered with sequelae") AND AE end date is null.
Scenario 2: Outcome in ("Not recovered", "Ongoing") AND AE end date is not null.

Displays when: Outcome and end date disagree.
Does not display when: They agree.
Sorting: Country, Site, Subject, AE start date
Notes: Codelist values differ by study. Use the values in the study's codelist.

## LIB-AE-08: Serious AEs missing causality

Report ID: LIB-AE-08
Description: Serious AEs with no relationship to study treatment recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. Serious; 6. Relationship to study drug

Logic:
Scenario 1: Serious = "Yes" AND Relationship to study drug is null.

Displays when: Serious and causality missing.
Does not display when: Causality is recorded.
Sorting: Country, Site, Subject, AE start date

## LIB-AE-09: Duplicate AE records

Report ID: LIB-AE-09
Description: AEs with the same term and start date for the same subject.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Record count

Logic:
Scenario 1: Count of AE records with the same Subject, AE term and AE start date > 1. Use GROUP BY with HAVING. Exclude deleted forms.

Displays when: More than one record with the same term and start date.
Does not display when: Only one record.
Sorting: Country, Site, Subject, AE term
Notes: Repeats with different severity may be real. Review before treating as errors.

## LIB-AE-10: Ongoing AEs at end of study

Report ID: LIB-AE-10
Description: AEs with no end date for subjects who completed or discontinued the study.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Disposition; 7. Disposition date

Logic:
Scenario 1: AE end date is null AND the subject has a disposition date (completed, discontinued or death).

Displays when: Open AE after the subject left the study.
Does not display when: AE has an end date, or the subject is still active.
Sorting: Country, Site, Subject
Notes: Follow-up AEs after study end may be expected. Check the protocol.
