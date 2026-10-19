# Pediatrics listings

Scope: Therapeutic area: Pediatrics. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Age-related and growth listings.

## LIB-PED-01: Age group, growth and pubertal stage checks

Report ID: LIB-PED-01
Description: Subjects whose age group, growth values or Tanner stage look wrong.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Age at visit; 6. Age group; 7. Height; 8. Weight; 9. Tanner stage; 10. Previous Tanner stage

Logic:
Scenario 1: Age group on the form <> the group derived from Date of birth and visit date.
Scenario 2: Height decreases between consecutive visits.
Scenario 3: Tanner stage decreases between consecutive visits.
Scenario 4: Dose per kg outside [protocol range] using the recorded weight.

Displays when: Any check fails.
Does not display when: All checks pass.
Sorting: Country, Site, Subject, Visit
Notes: Do not apply adult plausibility ranges to children.
