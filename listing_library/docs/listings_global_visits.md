# Visit, date and schedule listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that check visit windows, ordering, missing visits and date quality.

## LIB-VIS-01: Visits outside the protocol window

Report ID: LIB-VIS-01
Description: Visits outside the allowed window around the target day.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Target day; 6. Actual day; 7. Window; 8. Days outside

Logic:
Scenario 1: Actual study day - Target day is outside [protocol window]. Study day counts from the first dose or randomization as the protocol defines it.

Displays when: Outside the window.
Does not display when: Within the window.
Sorting: Country, Site, Subject, Visit
Notes: Study day has no day 0. Compute from dates.

## LIB-VIS-02: Visit dates out of order

Report ID: LIB-VIS-02
Description: Visit dates that do not follow the visit sequence.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Visit date; 6. Previous visit; 7. Previous visit date

Logic:
Scenario 1: Visit date < the date of an earlier-numbered visit for the same subject. Exclude unscheduled visits.

Displays when: Date earlier than a previous visit.
Does not display when: In order.
Sorting: Country, Site, Subject, Visit

## LIB-VIS-03: Data after death, discontinuation or completion

Report ID: LIB-VIS-03
Description: Data dated after the subject's last expected date.

Columns: 1. Country; 2. Site; 3. Subject; 4. End event; 5. End date; 6. Form; 7. Later date

Logic:
Scenario 1: Any visit or assessment date > the death date, study discontinuation date or completion date. Follow-up visits that the protocol allows are excluded.

Displays when: Data after the end.
Does not display when: None.
Sorting: Country, Site, Subject

## LIB-VIS-04: Missing expected visits

Report ID: LIB-VIS-04
Description: Scheduled visits with no data although the window has passed.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Expected by date; 6. Days overdue

Logic:
Scenario 1: The subject is active (no disposition) AND the visit's window has ended before the data cut date AND no form exists for that visit.

Displays when: Visit overdue with no data.
Does not display when: Visit exists, or is not due.
Sorting: Country, Site, Subject, Visit
Notes: Needs the schedule of assessments.

## LIB-VIS-05: Late data entry

Report ID: LIB-VIS-05
Description: Forms entered much later than the visit.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Visit date; 6. Entry date; 7. Days late

Logic:
Scenario 1: Entry date - Visit date > [protocol or site target, in days].

Displays when: Entered later than the target.
Does not display when: Entered on time.
Sorting: Days late (desc), Site
Notes: Entry date comes from the audit trail or the form created date.

## LIB-VIS-06: Future-dated entries

Report ID: LIB-VIS-06
Description: Dates later than the date the data was entered or later than today.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. Date; 7. Entry date

Logic:
Scenario 1: Any date item > Entry date, or > the data cut date.

Displays when: Date is in the future.
Does not display when: None.
Sorting: Country, Site, Subject, Form

## LIB-VIS-07: Partial and unknown dates

Report ID: LIB-VIS-07
Description: All dates with an unknown day, month or year, grouped by form.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. Date as entered; 7. Unknown parts

Logic:
Scenario 1: Any date item with at least one unknown part (day, month, year or time). Show the date as entered. Do not impute for this listing.

Displays when: Date is not complete.
Does not display when: Date is complete.
Sorting: Form, Site, Subject
Notes: Useful before the imputation rules are agreed.

## LIB-VIS-08: Unscheduled visits

Report ID: LIB-VIS-08
Description: Unscheduled visits and their reasons.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit date; 5. Reason; 6. Related AE

Logic:
Scenario 1: Visit type = "Unscheduled". Show the reason and whether an AE starts within 7 days before the visit.

Displays when: Unscheduled visit.
Does not display when: Not unscheduled.
Sorting: Country, Site, Subject, Visit date
Notes: An unplanned visit has no planned visit day.
