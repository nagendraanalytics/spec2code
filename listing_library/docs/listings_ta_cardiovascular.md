# Cardiovascular listings

Scope: Therapeutic area: Cardiovascular. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Heart failure, cardiovascular events and QT/ECG listings.

## LIB-CV-01: Heart failure hospitalization dates

Report ID: LIB-CV-01
Description: Hospitalizations with missing or illogical dates.

Columns: 1. Country; 2. Site; 3. Subject; 4. Admission date; 5. Discharge date; 6. Reason; 7. Related AE

Logic:
Scenario 1: Discharge date < Admission date.
Scenario 2: Admission date is null.
Scenario 3: Hospitalization reason = heart failure AND no AE or event form is recorded.

Displays when: Dates or linked records are wrong.
Does not display when: Dates are logical and linked.
Sorting: Country, Site, Subject, Admission date

## LIB-CV-02: Baseline cardiac measures missing

Report ID: LIB-CV-02
Description: Subjects with no baseline ejection fraction or NYHA class.

Columns: 1. Country; 2. Site; 3. Subject; 4. Baseline LVEF; 5. Baseline NYHA; 6. Baseline visit date

Logic:
Scenario 1: Baseline LVEF is null.
Scenario 2: Baseline NYHA class is null.
Scenario 3: LVEF is outside [protocol eligibility range].

Displays when: Missing or out of range.
Does not display when: Present and in range.
Sorting: Country, Site, Subject

## LIB-CV-03: Cardiovascular events without an event form

Report ID: LIB-CV-03
Description: AEs of myocardial infarction, stroke or similar with no corresponding event form for adjudication.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Event form exists

Logic:
Scenario 1: Coded AE term in [myocardial infarction, stroke, other adjudicated events] AND no event form exists for the subject within [N days] of the AE start date.
The adjudicated event list is protocol-specific.

Displays when: Event with no event form.
Does not display when: Event form exists.
Sorting: Country, Site, Subject, AE start date

## LIB-CV-04: QTcF thresholds and missing ECG time points

Report ID: LIB-CV-04
Description: QTcF above alert levels, increases from baseline, and incomplete ECG sets.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Time point; 6. QTcF; 7. Baseline QTcF; 8. Change from baseline; 9. Replicates

Logic:
Scenario 1: QTcF > [alert level; 450, 480 and 500 ms are commonly used].
Scenario 2: QTcF - Baseline QTcF > [change; 30 and 60 ms are commonly used].
Scenario 3: Number of ECG replicates at a time point < [protocol replicates].

Displays when: Above a level, or incomplete.
Does not display when: Within limits and complete.
Sorting: Country, Site, Subject, Visit, Time point
