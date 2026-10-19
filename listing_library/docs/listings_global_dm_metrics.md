# Data management status and metrics

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings and summaries used to run database lock readiness.

## LIB-DMM-01: Missing pages

Report ID: LIB-DMM-01
Description: Expected forms not entered.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Form; 5. Visit date; 6. Days missing

Logic:
Scenario 1: Visit has a date AND an expected form has no record.

Displays when: Missing.
Does not display when: Present.
Sorting: Site, Subject, Visit

## LIB-DMM-02: Duplicate records in repeating forms

Report ID: LIB-DMM-02
Description: Same record entered twice.

Columns: 1. Site; 2. Subject; 3. Form; 4. Key values; 5. Count

Logic:
Scenario 1: More than one record with identical key values.

Displays when: Duplicates.
Does not display when: Unique.
Sorting: Form, Subject

## LIB-DMM-03: Forms changed after lock or freeze

Report ID: LIB-DMM-03
Description: Changes after a freeze.

Columns: 1. Site; 2. Subject; 3. Form; 4. Freeze date; 5. Change date; 6. User; 7. Reason

Logic:
Scenario 1: Change date > freeze date.

Displays when: Changed after freeze.
Does not display when: No.
Sorting: Change date

## LIB-DMM-04: Unanswered or pending data clarifications

Report ID: LIB-DMM-04
Description: Query status by form for lock readiness.

Columns: 1. Form; 2. Open; 3. Answered; 4. Closed; 5. Total

Logic:
Scenario 1: Count by status per form.

Displays when: Open or answered > 0.
Does not display when: All closed.
Sorting: Form
Notes: Summary view.

## LIB-DMM-05: Audit trail review

Report ID: LIB-DMM-05
Description: Unusual change patterns.

Columns: 1. Site; 2. Subject; 3. Form; 4. Item; 5. Old value; 6. New value; 7. User; 8. Date; 9. Reason

Logic:
Scenario 1: A single item changed more than [N] times.
Scenario 2: A change has no reason.
Scenario 3: A change made by a user not on the site delegation log.

Displays when: Pattern found.
Does not display when: None.
Sorting: Site, Subject

## LIB-DMM-06: Reconciliation status across all sources

Report ID: LIB-DMM-06
Description: One line per source for lock.

Columns: 1. Source; 2. Last transfer date; 3. Records; 4. Open discrepancies; 5. Reconciled by; 6. Status

Logic:
Scenario 1: One row per source (EDC, central lab, ECG, IRT, safety, coding).

Displays when: Open discrepancies > 0.
Does not display when: None.
Sorting: Source
