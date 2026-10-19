# Psychiatry listings

Scope: Therapeutic area: Psychiatry. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Schizophrenia scale and relapse listings.

## LIB-PSY-01: PANSS item scores and totals

Report ID: LIB-PSY-01
Description: PANSS items out of range, missing, or totals that do not match.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Positive total; 6. Negative total; 7. General total; 8. Total; 9. Items missing

Logic:
Scenario 1: Any item score outside 1 to 7.
Scenario 2: Any item is null while a total is present.
Scenario 3: Total <> Positive + Negative + General.

Displays when: Out of range, missing or totals differ.
Does not display when: Items valid and totals match.
Sorting: Country, Site, Subject, Visit

## LIB-PSY-02: Relapse and hospitalization consistency

Report ID: LIB-PSY-02
Description: Relapses and psychiatric hospitalizations recorded without each other.

Columns: 1. Country; 2. Site; 3. Subject; 4. Relapse date; 5. Hospitalization admission; 6. Hospitalization discharge

Logic:
Scenario 1: Relapse defined by hospitalization in the protocol AND no hospitalization record exists.
Scenario 2: Psychiatric hospitalization recorded AND no relapse record within [N days].

Displays when: Relapse and hospitalization disagree.
Does not display when: They agree.
Sorting: Country, Site, Subject, Relapse date
