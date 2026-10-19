# Dermatology listings

Scope: Therapeutic area: Dermatology. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Psoriasis severity score listings.

## LIB-DER-01: PASI components and total disagree

Report ID: LIB-DER-01
Description: PASI totals that do not match the regional scores, and regional values out of range.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Head; 6. Upper limbs; 7. Trunk; 8. Lower limbs; 9. Total PASI; 10. Calculated PASI

Logic:
Scenario 1: Total PASI <> the sum of regional scores calculated with the standard region weights (head 0.1, upper limbs 0.2, trunk 0.3, lower limbs 0.4) applied to (erythema + induration + scaling) x area score.
Scenario 2: Area score outside 0 to 6, or a sign score outside 0 to 4.
Scenario 3: Total PASI outside 0 to 72.

Displays when: Total disagrees or an input is out of range.
Does not display when: Total matches and inputs are valid.
Sorting: Country, Site, Subject, Visit

## LIB-DER-02: PGA and PASI disagree

Report ID: LIB-DER-02
Description: Physician global assessment of clear with a high PASI, or the reverse.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. PGA; 6. PASI; 7. BSA

Logic:
Scenario 1: PGA = "Clear" AND PASI >= [threshold].
Scenario 2: PGA = "Severe" AND PASI <= [threshold].
Scenario 3: BSA > 100.

Displays when: Scales disagree or BSA is impossible.
Does not display when: Scales agree.
Sorting: Country, Site, Subject, Visit
Notes: Thresholds are a judgment call. Agree them with the clinical team.
