# Laboratory, vital signs and ECG listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that check measurement completeness, units, ranges and plausibility.

## LIB-LB-01: Out-of-range lab with no clinical significance

Report ID: LIB-LB-01
Description: Lab results outside the normal range where the investigator did not assess clinical significance.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Test; 6. Result; 7. Unit; 8. Normal low; 9. Normal high; 10. Clinically significant

Logic:
Scenario 1: Result < Normal low OR Result > Normal high AND Clinically significant is null.
Skip records where the test was not done. Compare numbers, not text.

Displays when: Abnormal with no assessment.
Does not display when: In range, or assessed.
Sorting: Country, Site, Subject, Visit, Test

## LIB-LB-02: Clinically significant lab with no AE

Report ID: LIB-LB-02
Description: Clinically significant lab values with no adverse event reported near the collection date.

Columns: 1. Country; 2. Site; 3. Subject; 4. Test; 5. Result; 6. Collection date; 7. AEs within window

Logic:
Scenario 1: Clinically significant = "Yes" AND no AE for the subject starts within [N days] of the collection date.

Displays when: Significant lab with no AE nearby.
Does not display when: An AE exists in the window.
Sorting: Country, Site, Subject, Collection date
Notes: The window is a convention, set it with the study team.

## LIB-LB-03: Lab units differ within a subject and test

Report ID: LIB-LB-03
Description: The same lab test reported in different units across records.

Columns: 1. Country; 2. Site; 3. Subject; 4. Test; 5. Unit 1; 6. Unit 2

Logic:
Scenario 1: For the same Subject and Test, the count of distinct units > 1.

Displays when: More than one unit.
Does not display when: One unit.
Sorting: Country, Site, Subject, Test
Notes: Conversion may be valid. List them, do not change results.

## LIB-LB-04: Missing mandatory lab panel

Report ID: LIB-LB-04
Description: Visits where a required lab panel has no data.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Visit date; 6. Panel missing

Logic:
Scenario 1: The visit occurred AND the required panel is scheduled for that visit in the schedule of assessments AND no panel record exists AND the panel was not marked not done.

Displays when: Required panel missing.
Does not display when: Panel present or not done with a reason.
Sorting: Country, Site, Subject, Visit

## LIB-LB-05: Duplicate lab results

Report ID: LIB-LB-05
Description: More than one result for the same subject, test and collection date and time.

Columns: 1. Country; 2. Site; 3. Subject; 4. Test; 5. Collection date; 6. Record count

Logic:
Scenario 1: Count of records with the same Subject, Test and Collection date/time > 1. Use GROUP BY with HAVING.

Displays when: Duplicate result records.
Does not display when: A single result.
Sorting: Country, Site, Subject, Test
Notes: Repeat or retest results may be valid. Check the retest flag.

## LIB-LB-06: Test not done with a result

Report ID: LIB-LB-06
Description: Results entered for tests marked not done, and not-done tests with no reason.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Test; 6. Not done; 7. Reason; 8. Result

Logic:
Scenario 1: Not done = "Yes" AND Result is not null.
Scenario 2: Not done = "Yes" AND Reason is null.

Displays when: Not done conflicts with a result, or has no reason.
Does not display when: Neither applies.
Sorting: Country, Site, Subject, Visit

## LIB-VS-01: Implausible vital signs

Report ID: LIB-VS-01
Description: Vital sign values that are physiologically unlikely or inconsistent.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Test; 6. Result; 7. Unit; 8. Issue

Logic:
Scenario 1: Diastolic >= Systolic blood pressure at the same time point.
Scenario 2: Value outside [plausibility range per test, for example heart rate].
Scenario 3: Height changes by more than [N cm] between visits for an adult.

Displays when: A plausibility rule is broken.
Does not display when: All values are plausible.
Sorting: Country, Site, Subject, Visit
Notes: Ranges are guides. Take them from the protocol or data review plan.

## LIB-VS-02: Large weight change between visits

Report ID: LIB-VS-02
Description: Weight changes by more than the allowed percentage between consecutive visits.

Columns: 1. Country; 2. Site; 3. Subject; 4. Previous visit; 5. Previous weight; 6. Visit; 7. Weight; 8. Change %

Logic:
Scenario 1: Compare each weight with the previous weight of the same subject (consecutive record comparison). ABS(Weight - Previous weight) / Previous weight x 100 > [threshold, commonly 10].

Displays when: Change above the threshold.
Does not display when: At or below.
Sorting: Country, Site, Subject, Visit
Notes: Check the unit (kg or lb) first.

## LIB-EG-01: ECG interval and interpretation checks

Report ID: LIB-EG-01
Description: ECG records with interpretation or interval problems.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Time point; 6. QTcF; 7. Interpretation; 8. Clinically significant

Logic:
Scenario 1: Interpretation = "Abnormal" AND Clinically significant is null.
Scenario 2: QTcF > [alert level, commonly 450, 480 or 500 ms] without an AE.
Scenario 3: Required ECG time point has no record.

Displays when: Any of the three conditions.
Does not display when: None.
Sorting: Country, Site, Subject, Visit, Time point
Notes: Alert levels are protocol-specific.
