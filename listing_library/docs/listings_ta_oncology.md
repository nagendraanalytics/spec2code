# Oncology listings

Scope: Therapeutic area: Oncology. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Tumor response, performance status, biomarker and timing listings. Response rules follow the protocol's criteria (for example RECIST 1.1).

## LIB-ONC-01: Overall response inconsistent with lesion data

Report ID: LIB-ONC-01
Description: Overall response that cannot follow from the target, non-target and new lesion assessments.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Target lesion response; 6. Non-target response; 7. New lesion; 8. Overall response; 9. Issue

Logic:
Scenario 1: New lesion = "Yes" AND Overall response <> "PD".
Scenario 2: Overall response = "CR" AND (Target lesion response <> "CR" OR Non-target response <> "CR").
Scenario 3: Overall response = "PR" AND Target lesion response in ("SD", "PD").
Use the response criteria named in the protocol; these three follow the RECIST pattern.

Displays when: Overall response cannot follow from the components.
Does not display when: Components and overall response agree.
Sorting: Country, Site, Subject, Visit
Notes: Rules differ for other criteria (Lugano, RANO, PCWG3). Follow the protocol.

## LIB-ONC-02: Target lesion measurements incomplete

Report ID: LIB-ONC-02
Description: Assessment visits with target lesions identified at baseline but no measurement.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Lesion; 6. Baseline size; 7. Visit size; 8. Not evaluable reason

Logic:
Scenario 1: A target lesion recorded at baseline has no measurement at the visit AND no not-evaluable reason.
Scenario 2: Number of target lesions at a visit > [protocol limit, 5 in RECIST 1.1, 2 per organ].

Displays when: Missing measurement, or too many target lesions.
Does not display when: All baseline target lesions are measured.
Sorting: Country, Site, Subject, Visit, Lesion

## LIB-ONC-03: Tumor assessment timing

Report ID: LIB-ONC-03
Description: Assessments done earlier or later than the protocol schedule, or before the baseline scan.

Columns: 1. Country; 2. Site; 3. Subject; 4. Baseline assessment date; 5. Assessment date; 6. Previous assessment date; 7. Weeks between

Logic:
Scenario 1: Assessment date <= Baseline assessment date.
Scenario 2: Weeks between consecutive assessments > [protocol interval + allowed window].
Scenario 3: Subject on treatment past the scheduled assessment with no assessment recorded.

Displays when: Timing breaks the schedule.
Does not display when: Timing follows the schedule.
Sorting: Country, Site, Subject, Assessment date

## LIB-ONC-04: Performance status missing or worsening

Report ID: LIB-ONC-04
Description: ECOG performance status missing at scheduled visits, or worsening by two or more grades without an AE.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. ECOG; 6. Previous ECOG; 7. AEs in window

Logic:
Scenario 1: ECOG is null at a scheduled visit.
Scenario 2: ECOG - Previous ECOG >= 2 AND no AE starts within [N days].

Displays when: Missing, or worsening with no AE.
Does not display when: Present and stable.
Sorting: Country, Site, Subject, Visit

## LIB-ONC-05: PSA values missing or rising

Report ID: LIB-ONC-05
Description: Prostate studies: PSA missing at scheduled visits, or rising across consecutive visits.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. PSA; 6. Previous PSA; 7. Nadir PSA; 8. Rise from nadir

Logic:
Scenario 1: PSA is null at a scheduled visit.
Scenario 2: PSA >= Nadir PSA + [protocol rise] AND the rise is confirmed by a later value (consecutive record comparison).

Displays when: Missing, or rising and confirmed.
Does not display when: Present and not rising.
Sorting: Country, Site, Subject, Visit
Notes: PSA progression rules are protocol-specific.

## LIB-ONC-06: Biomarker status missing

Report ID: LIB-ONC-06
Description: Randomized subjects with no tumor biomarker status where the protocol needs it.

Columns: 1. Country; 2. Site; 3. Subject; 4. Biomarker; 5. Result; 6. Sample date; 7. Randomization date

Logic:
Scenario 1: Subject is randomized AND the required biomarker (for example KRAS or EGFR) has no result, or the result is dated after randomization when it must come before.

Displays when: Biomarker missing or late.
Does not display when: Result present and timely.
Sorting: Country, Site, Subject
