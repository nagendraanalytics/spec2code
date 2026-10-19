# Respiratory listings

Scope: Therapeutic area: Respiratory. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Asthma exacerbation and lung function listings.

## LIB-RESP-01: Exacerbations without systemic corticosteroids

Report ID: LIB-RESP-01
Description: Exacerbations that the protocol defines by treatment, with no corticosteroid recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. Exacerbation start; 5. Exacerbation end; 6. Systemic corticosteroid; 7. Related CM

Logic:
Scenario 1: Exacerbation recorded AND no CM with a systemic corticosteroid starts within [N days] of the exacerbation start.
Scenario 2: Exacerbation end < start.
Scenario 3: Exacerbation is reported as an AE but not on the exacerbation form, or the reverse.

Displays when: Exacerbation and treatment or forms disagree.
Does not display when: They agree.
Sorting: Country, Site, Subject, Exacerbation start

## LIB-RESP-02: FEV1 measurement checks

Report ID: LIB-RESP-02
Description: FEV1 results missing, or large changes between visits.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Pre-bronchodilator FEV1; 6. Post-bronchodilator FEV1; 7. Previous FEV1; 8. Change %

Logic:
Scenario 1: A scheduled FEV1 has no pre- or post-bronchodilator value.
Scenario 2: ABS(FEV1 - Previous FEV1) / Previous FEV1 x 100 > [threshold] (consecutive record comparison).
Scenario 3: Post-bronchodilator FEV1 < pre-bronchodilator FEV1 by more than [tolerance].

Displays when: Missing or implausible.
Does not display when: Present and plausible.
Sorting: Country, Site, Subject, Visit
