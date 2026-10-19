# Patient data listings (clinical study report appendix style)

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Subject-level data listings of the kind that appear in a clinical study report appendix. They show data as collected rather than flag problems.

## LIB-PDL-01: Demographics

Report ID: LIB-PDL-01
Description: Subject demographic data.

Columns: 1. Treatment; 2. Site; 3. Subject; 4. Age; 5. Sex; 6. Race; 7. Ethnicity; 8. Country

Logic:
Scenario 1: One row per subject in the population selected.

Displays when: Always, for subjects in the population.
Does not display when: Subjects outside the population.
Sorting: Treatment, Site, Subject
Notes: Population is a parameter.

## LIB-PDL-02: Subject disposition

Report ID: LIB-PDL-02
Description: Completion and discontinuation.

Columns: 1. Treatment; 2. Site; 3. Subject; 4. First dose date; 5. Last dose date; 6. Completed; 7. Discontinuation reason; 8. Date

Logic:
Scenario 1: One row per subject with the end-of-study or end-of-treatment disposition.

Displays when: Subjects with disposition data.
Does not display when: Subjects without it show as ongoing.
Sorting: Treatment, Site, Subject

## LIB-PDL-03: Adverse events

Report ID: LIB-PDL-03
Description: All reported AEs.

Columns: 1. Treatment; 2. Subject; 3. SOC; 4. PT; 5. Reported term; 6. Start; 7. End; 8. Severity; 9. Relationship; 10. Serious; 11. Action; 12. Outcome

Logic:
Scenario 1: One row per AE. Include treatment-emergent flag where derived.

Displays when: All AE records not deleted.
Does not display when: Deleted records.
Sorting: Treatment, Subject, Start

## LIB-PDL-04: Serious adverse events and deaths

Report ID: LIB-PDL-04
Description: Serious events and deaths.

Columns: 1. Treatment; 2. Subject; 3. PT; 4. Start; 5. End; 6. Seriousness criteria; 7. Relationship; 8. Outcome; 9. Death date

Logic:
Scenario 1: AE with serious flag = Yes.
Scenario 2: Any death recorded.

Displays when: Serious or fatal.
Does not display when: Non-serious.
Sorting: Treatment, Subject, Start

## LIB-PDL-05: Concomitant medications

Report ID: LIB-PDL-05
Description: Medications taken during the study.

Columns: 1. Treatment; 2. Subject; 3. Medication; 4. ATC class; 5. Dose; 6. Route; 7. Start; 8. End; 9. Indication

Logic:
Scenario 1: One row per medication record.

Displays when: All records.
Does not display when: None.
Sorting: Treatment, Subject, Start

## LIB-PDL-06: Exposure

Report ID: LIB-PDL-06
Description: Study drug administration.

Columns: 1. Treatment; 2. Subject; 3. Visit; 4. Dose; 5. Unit; 6. Start; 7. End; 8. Dose change reason

Logic:
Scenario 1: One row per administration or dosing record.

Displays when: All records.
Does not display when: None.
Sorting: Treatment, Subject, Start

## LIB-PDL-07: Laboratory abnormalities

Report ID: LIB-PDL-07
Description: Out-of-range lab results.

Columns: 1. Treatment; 2. Subject; 3. Visit; 4. Test; 5. Result; 6. Unit; 7. Range; 8. Flag; 9. Grade

Logic:
Scenario 1: Result is outside the reference range or graded.

Displays when: Abnormal.
Does not display when: Normal.
Sorting: Treatment, Subject, Test, Visit

## LIB-PDL-08: Vital signs

Report ID: LIB-PDL-08
Description: Vital sign measurements.

Columns: 1. Treatment; 2. Subject; 3. Visit; 4. Test; 5. Result; 6. Unit; 7. Position; 8. Date

Logic:
Scenario 1: One row per measurement.

Displays when: All.
Does not display when: None.
Sorting: Treatment, Subject, Visit

## LIB-PDL-09: Protocol deviations

Report ID: LIB-PDL-09
Description: Recorded deviations.

Columns: 1. Treatment; 2. Subject; 3. Deviation; 4. Category; 5. Date; 6. Important flag

Logic:
Scenario 1: One row per deviation.

Displays when: All.
Does not display when: None.
Sorting: Treatment, Subject, Date

## LIB-PDL-10: Efficacy assessments

Report ID: LIB-PDL-10
Description: Primary and secondary measurements by visit.

Columns: 1. Treatment; 2. Subject; 3. Visit; 4. Parameter; 5. Result; 6. Change from baseline

Logic:
Scenario 1: One row per parameter and visit, for parameters in the analysis plan.

Displays when: Planned parameters.
Does not display when: Others.
Sorting: Treatment, Subject, Parameter, Visit
Notes: Parameter list comes from the analysis plan.
