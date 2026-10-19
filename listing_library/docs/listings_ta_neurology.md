# Neurology listings

Scope: Therapeutic area: Neurology. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Multiple sclerosis, Alzheimer's disease, traumatic brain injury and related listings.

## LIB-NEU-01: MS relapses without a disability assessment

Report ID: LIB-NEU-01
Description: Relapses with no EDSS assessment near the relapse, and scheduled MRI scans missing.

Columns: 1. Country; 2. Site; 3. Subject; 4. Relapse start; 5. EDSS date; 6. EDSS; 7. MRI date; 8. MRI scheduled

Logic:
Scenario 1: Relapse recorded AND no EDSS assessment within [N days] of the relapse start.
Scenario 2: MRI scheduled at a visit AND no MRI record exists.

Displays when: Relapse with no EDSS, or MRI missing.
Does not display when: Both present.
Sorting: Country, Site, Subject, Relapse start

## LIB-NEU-02: Cognitive scale scores out of range or missing

Report ID: LIB-NEU-02
Description: Cognitive scores outside the scale range, outside the eligibility range, or missing.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Scale; 6. Score; 7. Valid range; 8. Eligibility range; 9. Rater

Logic:
Scenario 1: Score outside the valid range of the scale (for example MMSE 0 to 30).
Scenario 2: Screening score outside [protocol eligibility range].
Scenario 3: A scheduled cognitive assessment has no score.
Scenario 4: Rater changes between consecutive visits where the protocol asks for the same rater.

Displays when: Out of range, missing or rater changed.
Does not display when: In range, present, same rater.
Sorting: Country, Site, Subject, Visit

## LIB-NEU-03: Glasgow Coma Scale checks

Report ID: LIB-NEU-03
Description: Glasgow Coma Scale totals that do not equal the components, or are out of range.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Eye; 6. Verbal; 7. Motor; 8. Total

Logic:
Scenario 1: Total <> Eye + Verbal + Motor.
Scenario 2: Total < 3 or Total > 15.

Displays when: Total disagrees or is out of range.
Does not display when: Total is correct.
Sorting: Country, Site, Subject, Visit
