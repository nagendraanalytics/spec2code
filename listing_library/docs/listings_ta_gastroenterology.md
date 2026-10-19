# Gastroenterology listings

Scope: Therapeutic area: Gastroenterology. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Crohn's disease activity listings.

## LIB-GI-01: CDAI components and diary completeness

Report ID: LIB-GI-01
Description: Visits where the Crohn's Disease Activity Index cannot be calculated.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Diary days; 6. Stool frequency; 7. Abdominal pain; 8. General well-being; 9. CDAI

Logic:
Scenario 1: Diary days available in the 7 days before the visit < [required days].
Scenario 2: CDAI is present AND any component used to calculate it is null.
Scenario 3: Fistula assessment missing for subjects with perianal disease at baseline.

Displays when: CDAI cannot be supported, or fistula assessment is missing.
Does not display when: All components are present.
Sorting: Country, Site, Subject, Visit
