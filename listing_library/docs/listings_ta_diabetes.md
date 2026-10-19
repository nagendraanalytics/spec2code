# Diabetes listings

Scope: Therapeutic area: Diabetes. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Glycemic control, hypoglycemia and device data listings. Glucose thresholds are protocol-defined.

## LIB-DIA-01: Hypoglycemia events and glucose values disagree

Report ID: LIB-DIA-01
Description: Hypoglycemia events whose recorded glucose does not fit the severity, and events with no glucose value.

Columns: 1. Country; 2. Site; 3. Subject; 4. Event date; 5. Severity; 6. Glucose value; 7. Unit; 8. Treatment given

Logic:
Scenario 1: Severity = "Severe" AND no assistance recorded.
Scenario 2: Glucose value >= [protocol hypoglycemia threshold; 70 mg/dL is commonly used for level 1] AND event classified as hypoglycemia.
Scenario 3: Glucose value is null AND event classified as hypoglycemia.
Convert mg/dL and mmol/L before comparing (1 mmol/L = 18 mg/dL, approximately).

Displays when: Severity, glucose and assistance disagree.
Does not display when: They agree.
Sorting: Country, Site, Subject, Event date

## LIB-DIA-02: HbA1c missing or in a different unit

Report ID: LIB-DIA-02
Description: HbA1c missing at scheduled visits, or reported in a different unit from the other visits.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. HbA1c; 6. Unit; 7. Previous unit

Logic:
Scenario 1: HbA1c is null at a visit where it is scheduled.
Scenario 2: Unit differs between visits for the same subject (% versus mmol/mol).

Displays when: Missing or unit differs.
Does not display when: Present and consistent.
Sorting: Country, Site, Subject, Visit

## LIB-DIA-03: Insulin dose changes without a reason

Report ID: LIB-DIA-03
Description: Insulin dose changes between consecutive records with no recorded reason.

Columns: 1. Country; 2. Site; 3. Subject; 4. Date; 5. Previous basal dose; 6. Basal dose; 7. Previous bolus dose; 8. Bolus dose; 9. Reason

Logic:
Scenario 1: Compare each insulin record with the previous record of the same subject (consecutive record comparison). Basal or bolus dose differs AND Reason is null.

Displays when: Dose changed with no reason.
Does not display when: Unchanged, or reason given.
Sorting: Country, Site, Subject, Date

## LIB-DIA-04: Continuous glucose monitor data coverage

Report ID: LIB-DIA-04
Description: Subjects whose sensor wear time is below the protocol minimum.

Columns: 1. Country; 2. Site; 3. Subject; 4. Period start; 5. Period end; 6. Days with data; 7. Wear time %

Logic:
Scenario 1: Wear time % = readings obtained / readings possible x 100 < [protocol minimum, often 70 over 14 days].

Displays when: Coverage below the minimum.
Does not display when: At or above.
Sorting: Wear time %, Site, Subject
Notes: Check the device type and reading interval.
