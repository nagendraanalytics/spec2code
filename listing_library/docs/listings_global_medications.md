# Medication and exposure listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that check concomitant medication and study drug exposure.

## LIB-CM-01: CM end date before start date

Report ID: LIB-CM-01
Description: Concomitant medications ending before they start.

Columns: 1. Country; 2. Site; 3. Subject; 4. Medication; 5. Start date; 6. End date

Logic:
Scenario 1: CM end date < CM start date. Partial dates: compare known parts only.

Displays when: End before start.
Does not display when: End on or after start, or end null.
Sorting: Country, Site, Subject, Start date

## LIB-CM-02: CM with no indication

Report ID: LIB-CM-02
Description: Concomitant medications with no indication recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. Medication; 5. Start date; 6. Indication

Logic:
Scenario 1: Indication is null AND the medication is not marked prophylaxis or study-related.

Displays when: Indication missing.
Does not display when: Indication present.
Sorting: Country, Site, Subject, Start date

## LIB-CM-03: Prohibited medication use

Report ID: LIB-CM-03
Description: Medications on the protocol's prohibited list taken during the study.

Columns: 1. Country; 2. Site; 3. Subject; 4. Medication; 5. Coded term; 6. Start date; 7. End date; 8. Study period

Logic:
Scenario 1: Coded medication term or drug class is in [protocol prohibited list] AND the medication period overlaps the treatment period (start <= last dose date AND (end is null OR end >= first dose date)).

Displays when: A prohibited medication overlaps treatment.
Does not display when: No prohibited medication overlaps.
Sorting: Country, Site, Subject, Start date
Notes: Needs coded medication terms. Uncoded terms should be listed separately.

## LIB-CM-04: AE treated by medication but no CM record

Report ID: LIB-CM-04
Description: AEs marked as treated with medication where no concomitant medication is linked.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Treatment given; 7. CM records in window

Logic:
Scenario 1: AE Treatment given = "Yes" AND no CM record for the subject starts between the AE start date and the AE end date (or the last visit date if the AE is ongoing).

Displays when: Treated AE with no CM in the AE window.
Does not display when: A CM exists in the window.
Sorting: Country, Site, Subject, AE start date
Notes: Use a linking item (AE number on CM) if the CRF has one.

## LIB-EX-01: Dosing before randomization

Report ID: LIB-EX-01
Description: Subjects with a dose dated before the randomization date.

Columns: 1. Country; 2. Site; 3. Subject; 4. Randomization date; 5. First dose date; 6. Days before

Logic:
Scenario 1: First dose date < Randomization date. Exclude run-in or lead-in dosing if the protocol defines it.

Displays when: Dose before randomization.
Does not display when: First dose on or after randomization.
Sorting: Country, Site, Subject

## LIB-EX-02: Dosing after treatment discontinuation

Report ID: LIB-EX-02
Description: Doses dated after the recorded treatment discontinuation date.

Columns: 1. Country; 2. Site; 3. Subject; 4. Discontinuation date; 5. Dose date; 6. Dose

Logic:
Scenario 1: Dose date > treatment discontinuation date from the end-of-treatment form.

Displays when: Dosing after discontinuation.
Does not display when: No dosing after discontinuation.
Sorting: Country, Site, Subject, Dose date

## LIB-EX-03: Dose changes without a reason

Report ID: LIB-EX-03
Description: Dose differs from the previous record with no dose modification reason.

Columns: 1. Country; 2. Site; 3. Subject; 4. Previous dose date; 5. Previous dose; 6. Dose date; 7. Dose; 8. Reason

Logic:
Scenario 1: Compare each exposure record with the previous record of the same subject (consecutive record comparison by date). Dose <> previous dose AND Reason for dose change is null.

Displays when: Dose changed and no reason given.
Does not display when: Dose unchanged, or reason present.
Sorting: Country, Site, Subject, Dose date

## LIB-EX-04: Gaps in dosing

Report ID: LIB-EX-04
Description: Gaps between consecutive dosing records longer than the allowed interval.

Columns: 1. Country; 2. Site; 3. Subject; 4. Previous dose end date; 5. Next dose start date; 6. Gap days

Logic:
Scenario 1: Next dose start date - previous dose end date > [protocol allowed gap, in days]. Do not list planned dose holds that have a hold reason.

Displays when: Gap longer than allowed without a hold.
Does not display when: No gap, or a recorded hold.
Sorting: Country, Site, Subject, Next dose start date

## LIB-EX-05: Dose above the protocol maximum

Report ID: LIB-EX-05
Description: Exposure records with a dose above the allowed maximum.

Columns: 1. Country; 2. Site; 3. Subject; 4. Dose date; 5. Dose; 6. Unit; 7. Maximum dose

Logic:
Scenario 1: Dose (converted to the protocol unit) > [protocol maximum dose]. Say how units are converted.

Displays when: Dose above the maximum.
Does not display when: Dose within limit.
Sorting: Country, Site, Subject, Dose date

## LIB-EX-06: Low treatment compliance

Report ID: LIB-EX-06
Description: Subjects whose compliance is below the protocol threshold.

Columns: 1. Country; 2. Site; 3. Subject; 4. Doses planned; 5. Doses taken; 6. Compliance %

Logic:
Scenario 1: Compliance % = Doses taken / Doses planned x 100 < [protocol threshold, commonly 80]. Planned doses are counted up to the discontinuation date.

Displays when: Compliance below the threshold.
Does not display when: At or above.
Sorting: Compliance %, Site, Subject
