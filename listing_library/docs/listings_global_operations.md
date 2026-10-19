# Site and operational listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings used by study teams and monitors to see how sites and data entry are performing.

## LIB-OPS-01: Data entry timeliness

Report ID: LIB-OPS-01
Description: Visits entered late.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Visit date; 5. Entry date; 6. Days to enter

Logic:
Scenario 1: Days to enter = Entry date minus Visit date AND Days to enter > [target days].

Displays when: Late entry.
Does not display when: On time.
Sorting: Days to enter desc
Notes: Entry date is the first save of the form.

## LIB-OPS-02: Open queries by age

Report ID: LIB-OPS-02
Description: Queries still open, grouped by age.

Columns: 1. Site; 2. Subject; 3. Form; 4. Item; 5. Query text; 6. Opened; 7. Age (days); 8. Owner

Logic:
Scenario 1: Query status is Open or Answered AND age > [N days].
Age = report date minus opened date.

Displays when: Query still open.
Does not display when: Closed.
Sorting: Age desc, Site

## LIB-OPS-03: Overdue visits

Report ID: LIB-OPS-03
Description: Subjects whose next visit is past its window with no data.

Columns: 1. Site; 2. Subject; 3. Last visit; 4. Next expected visit; 5. Latest allowed date; 6. Days overdue

Logic:
Scenario 1: The next planned visit has no record AND the latest allowed date < report date AND the subject is still active.

Displays when: Visit overdue.
Does not display when: Not overdue.
Sorting: Days overdue desc
Notes: Exclude subjects who have discontinued or completed.

## LIB-OPS-04: Forms not source verified or not signed

Report ID: LIB-OPS-04
Description: Pending monitoring and investigator sign-off.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Form; 5. SDV status; 6. Signature status; 7. Entry date

Logic:
Scenario 1: SDV status is required AND not complete.
Scenario 2: Signature status is not signed AND the form is older than [N days].

Displays when: Pending verification or signature.
Does not display when: Complete.
Sorting: Site, Subject, Visit
Notes: Applies only where the study uses SDV or signatures.

## LIB-OPS-05: Enrollment by site against target

Report ID: LIB-OPS-05
Description: Recruitment progress.

Columns: 1. Country; 2. Site; 3. Screened; 4. Screen failures; 5. Randomized; 6. Target; 7. % of target

Logic:
Scenario 1: Count subjects by site and status.
Scenario 2: Highlight sites with % of target below [threshold] after [N weeks] open.

Displays when: Behind target.
Does not display when: At or ahead.
Sorting: Country, Site
Notes: Not a subject-level listing.

## LIB-OPS-06: Subjects lost or not seen

Report ID: LIB-OPS-06
Description: Subjects with no activity for a long period.

Columns: 1. Site; 2. Subject; 3. Last activity date; 4. Days since; 5. Status; 6. Contact attempts recorded

Logic:
Scenario 1: Days since last data > [N] AND no disposition recorded.

Displays when: Possible lost to follow-up.
Does not display when: Active or dispositioned.
Sorting: Days since desc

## LIB-OPS-07: Key risk indicators by site

Report ID: LIB-OPS-07
Description: Risk-based monitoring indicators.

Columns: 1. Site; 2. AE per subject; 3. SAE rate; 4. Deviation rate; 5. Query rate; 6. Entry delay (median); 7. Missing data %; 8. Flag

Logic:
Scenario 1: Each indicator compared with the study median or an agreed threshold.
Scenario 2: Flag = Yes when two or more indicators exceed the limit.

Displays when: Site flagged.
Does not display when: Within limits.
Sorting: Flag, Site
Notes: Limits come from the monitoring plan.
