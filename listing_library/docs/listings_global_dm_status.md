# Data management status listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings about the state of the data: queries, signatures, locks, coding and reconciliation.

## LIB-DM-01: Open queries older than the limit

Report ID: LIB-DM-01
Description: Queries that have been open longer than the allowed number of days.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. Query text; 7. Opened date; 8. Days open; 9. Status

Logic:
Scenario 1: Query status in (Open, Answered) AND Data cut date - Opened date > [N days].

Displays when: Open longer than the limit.
Does not display when: Closed, or younger.
Sorting: Days open (desc), Site, Subject

## LIB-DM-02: Forms not submitted

Report ID: LIB-DM-02
Description: Forms still in progress or not started.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Form; 6. Form status; 7. Last modified

Logic:
Scenario 1: Form status <> submitted for a visit that has a visit date and is older than [N days].

Displays when: Not submitted.
Does not display when: Submitted.
Sorting: Country, Site, Subject, Visit

## LIB-DM-03: Missing pages

Report ID: LIB-DM-03
Description: Expected forms with no record for a completed visit.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Expected form

Logic:
Scenario 1: A required form for the visit has no record and was not marked not done.

Displays when: Required form missing.
Does not display when: Present or not done with a reason.
Sorting: Country, Site, Subject, Visit

## LIB-DM-04: SDV incomplete on critical forms

Report ID: LIB-DM-04
Description: Critical forms with source data verification outstanding.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. SDV status

Logic:
Scenario 1: Form or item is on the critical data list AND SDV status <> verified.

Displays when: SDV outstanding on a critical form.
Does not display when: Verified.
Sorting: Site, Subject, Form

## LIB-DM-05: Signatures pending or broken

Report ID: LIB-DM-05
Description: Forms awaiting investigator signature, and signatures invalidated by later changes.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Signature status; 6. Last change date; 7. Signed date

Logic:
Scenario 1: Form is submitted AND the PI signature is missing.
Scenario 2: Data changed after the signature date.

Displays when: Unsigned, or changed after signing.
Does not display when: Signed and unchanged.
Sorting: Site, Subject, Form

## LIB-DM-06: Changes after lock or freeze

Report ID: LIB-DM-06
Description: Items modified after the form was frozen or locked.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. Locked date; 7. Changed date; 8. Changed by

Logic:
Scenario 1: Audit trail change date > Locked or Frozen date for the same form.

Displays when: Changed after lock.
Does not display when: No change after lock.
Sorting: Site, Subject, Form
Notes: Needs audit trail data.

## LIB-DM-07: Intentionally left blank items

Report ID: LIB-DM-07
Description: Items or forms marked intentionally left blank, with their reasons.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Item; 6. Reason

Logic:
Scenario 1: Item or form is marked ILB.

Displays when: Marked ILB.
Does not display when: Not marked.
Sorting: Form, Site, Subject

## LIB-DM-08: Uncoded terms

Report ID: LIB-DM-08
Description: Adverse events and medications still waiting for dictionary coding.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Verbatim term; 6. Coding status

Logic:
Scenario 1: Coding status <> coded.

Displays when: Not coded.
Does not display when: Coded.
Sorting: Form, Verbatim term
Notes: Needs the coding tool's status.

## LIB-DM-09: Protocol deviations to review

Report ID: LIB-DM-09
Description: Protocol deviations with no category, or open for too long.

Columns: 1. Country; 2. Site; 3. Subject; 4. Deviation date; 5. Description; 6. Category; 7. Status; 8. Days open

Logic:
Scenario 1: Category is null.
Scenario 2: Status is open AND Days open > [N days].

Displays when: Uncategorized or open too long.
Does not display when: Categorized and closed.
Sorting: Site, Subject, Deviation date

## LIB-DM-10: Query rate by site

Report ID: LIB-DM-10
Description: Number of queries per form and per subject by site.

Columns: 1. Country; 2. Site; 3. Forms; 4. Queries; 5. Queries per 100 forms

Logic:
Scenario 1: For each site, count queries and forms; Queries per 100 forms = Queries / Forms x 100. Use GROUP BY.

Displays when: All sites are listed.
Does not display when: not applicable
Sorting: Queries per 100 forms (desc)
Notes: A summary listing. It has no subject-level rows.

## LIB-DM-11: External data not in the EDC

Report ID: LIB-DM-11
Description: Subjects or visits present in an external file (central lab, ECG, ePRO) but not in the EDC, and the reverse.

Columns: 1. Subject; 2. Visit; 3. Source; 4. In EDC; 5. In external file

Logic:
Scenario 1: A subject-visit key exists in the external file and not in the EDC.
Scenario 2: A subject-visit key exists in the EDC and not in the external file where the schedule expects data.

Displays when: Records do not match.
Does not display when: Both sides match.
Sorting: Subject, Visit
Notes: Keys are matched on subject and visit. Check naming of visits across systems.
