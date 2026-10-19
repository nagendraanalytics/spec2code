# ADaM dataset check listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings used to check analysis datasets against their specification and against SDTM.

## LIB-ADM-01: Population flags inconsistent

Report ID: LIB-ADM-01
Description: Analysis population flags that conflict with each other.

Columns: 1. USUBJID; 2. ITTFL; 3. SAFFL; 4. PPROTFL; 5. Randomized; 6. Dosed; 7. Issue

Logic:
Scenario 1: SAFFL = "Y" AND no exposure record exists.
Scenario 2: ITTFL = "Y" AND subject is not randomized.
Scenario 3: PPROTFL = "Y" AND ITTFL <> "Y".

Displays when: Flags conflict.
Does not display when: Consistent.
Sorting: USUBJID
Notes: The flag definitions come from the analysis plan.

## LIB-ADM-02: Treatment variables differ from SDTM

Report ID: LIB-ADM-02
Description: Planned or actual treatment not matching the source.

Columns: 1. USUBJID; 2. TRT01P; 3. ARM; 4. TRT01A; 5. ACTARM; 6. Issue

Logic:
Scenario 1: TRT01P differs from the source planned arm.
Scenario 2: TRT01A differs from the source actual arm.
Scenario 3: Treatment variable is null for a subject in a population.

Displays when: Treatment mismatch.
Does not display when: Matches.
Sorting: USUBJID

## LIB-ADM-03: Derived value cannot be reproduced

Report ID: LIB-ADM-03
Description: Derived variables whose value differs from an independent recalculation.

Columns: 1. USUBJID; 2. PARAMCD; 3. AVISIT; 4. Derived value; 5. Recalculated value; 6. Difference

Logic:
Scenario 1: ABS(derived - recalculated) > [tolerance].
Recalculation follows the derivation text in the ADaM specification.

Displays when: Value differs.
Does not display when: Reproduced.
Sorting: PARAMCD, USUBJID, AVISIT

## LIB-ADM-04: Change from baseline missing

Report ID: LIB-ADM-04
Description: Post-baseline records with no change value.

Columns: 1. USUBJID; 2. PARAMCD; 3. AVISIT; 4. BASE; 5. AVAL; 6. CHG

Logic:
Scenario 1: AVAL is not null AND BASE is not null AND CHG is null.
Scenario 2: Baseline record exists, but BASE is null on later records.

Displays when: Change missing.
Does not display when: Present.
Sorting: PARAMCD, USUBJID

## LIB-ADM-05: Analysis visit windowing

Report ID: LIB-ADM-05
Description: Records mapped to a visit inconsistent with the windowing rule.

Columns: 1. USUBJID; 2. PARAMCD; 3. ADT; 4. ADY; 5. AVISIT; 6. Window rule

Logic:
Scenario 1: ADY lies outside the window defined for AVISIT.
Scenario 2: Two records are assigned to the same AVISIT with ANL01FL = "Y".

Displays when: Window broken.
Does not display when: In window.
Sorting: USUBJID, PARAMCD, ADY

## LIB-ADM-06: Time-to-event censoring check

Report ID: LIB-ADM-06
Description: Records with unclear event or censor status.

Columns: 1. USUBJID; 2. PARAMCD; 3. AVAL; 4. CNSR; 5. Start date; 6. Event or censor date; 7. Issue

Logic:
Scenario 1: CNSR is null.
Scenario 2: AVAL < 0.
Scenario 3: CNSR = 0 AND no event record in the source.

Displays when: Status problem.
Does not display when: Valid.
Sorting: USUBJID
