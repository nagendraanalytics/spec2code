# Nephrology listings

Scope: Therapeutic area: Nephrology. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Acute kidney injury and kidney transplant listings.

## LIB-NEP-01: Creatinine rise without an AKI event

Report ID: LIB-NEP-01
Description: Serum creatinine increases that meet the AKI definition with no AKI event recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. Baseline creatinine; 5. Creatinine; 6. Collection date; 7. Rise; 8. AKI event recorded; 9. Dialysis

Logic:
Scenario 1: Creatinine - previous creatinine >= 0.3 mg/dL within 48 hours, OR Creatinine >= 1.5 x baseline, AND no AKI event or AE is recorded.
Scenario 2: Dialysis recorded AND no AKI or renal AE.
Use the definition in the protocol. These thresholds are the commonly used KDIGO ones.

Displays when: Rise or dialysis with no AKI event.
Does not display when: AKI event is recorded.
Sorting: Country, Site, Subject, Collection date

## LIB-NEP-02: Rejection episodes and graft loss records

Report ID: LIB-NEP-02
Description: Rejection episodes with no biopsy, and graft loss with no date.

Columns: 1. Country; 2. Site; 3. Subject; 4. Rejection date; 5. Biopsy date; 6. Biopsy result; 7. Graft loss; 8. Graft loss date

Logic:
Scenario 1: Rejection episode recorded AND no biopsy within [N days] where the protocol requires one.
Scenario 2: Graft loss = "Yes" AND graft loss date is null.
Scenario 3: Graft loss date < transplant date.

Displays when: Missing biopsy or date, or illogical date.
Does not display when: Records complete.
Sorting: Country, Site, Subject, Rejection date
