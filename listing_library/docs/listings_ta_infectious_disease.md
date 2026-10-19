# Infectious disease listings

Scope: Therapeutic area: Infectious Disease. EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

HIV, COVID-19, influenza and malaria listings.

## LIB-ID-01: HIV viral load rebound and missing CD4

Report ID: LIB-ID-01
Description: Detectable viral load after suppression, with no repeat test, and visits missing CD4.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Viral load; 6. Previous viral load; 7. Repeat test date; 8. CD4

Logic:
Scenario 1: Viral load >= [threshold, for example 200 copies/mL] after a previous value below the threshold AND no repeat test within [N days].
Scenario 2: CD4 is null at a scheduled visit.

Displays when: Rebound with no repeat, or CD4 missing.
Does not display when: Repeated, or present.
Sorting: Country, Site, Subject, Visit

## LIB-ID-02: Respiratory support without hospitalization

Report ID: LIB-ID-02
Description: COVID-19 records of oxygen or ventilation support with no hospitalization record.

Columns: 1. Country; 2. Site; 3. Subject; 4. Support type; 5. Start date; 6. End date; 7. Hospitalization admission; 8. Hospitalization discharge

Logic:
Scenario 1: Oxygen or ventilation support recorded AND no hospitalization record overlaps the support dates.
Scenario 2: Support end date < start date.

Displays when: Support with no hospitalization.
Does not display when: Hospitalization covers the support.
Sorting: Country, Site, Subject, Start date

## LIB-ID-03: Malaria parasitemia at follow-up without rescue treatment

Report ID: LIB-ID-03
Description: Positive parasite counts at the end of follow-up with no rescue medication recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Parasite count; 6. Gametocytes; 7. Rescue medication; 8. Fever

Logic:
Scenario 1: Parasite count > 0 at Day [28] AND no rescue medication recorded.
Scenario 2: Parasite count missing at a scheduled day.

Displays when: Positive and no rescue, or missing.
Does not display when: Negative, rescued, or recorded.
Sorting: Country, Site, Subject, Visit

## LIB-ID-04: Influenza symptom diary completeness

Report ID: LIB-ID-04
Description: Subjects with missing diary days within the symptom period.

Columns: 1. Country; 2. Site; 3. Subject; 4. Day; 5. Diary entry; 6. Hospitalized

Logic:
Scenario 1: A diary day inside the symptom assessment period has no entry for a subject who was not hospitalized.
Scenario 2: Hospitalization recorded AND diary entries continue during the stay without an explanation.

Displays when: Missing diary days, or entries during hospitalization.
Does not display when: Diary is complete.
Sorting: Country, Site, Subject, Day
