# Medical and clinical review listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings for medical monitors and data monitoring committees. They aim to bring out safety signals for a person to judge.

## LIB-MED-01: Possible Hy's law cases

Report ID: LIB-MED-01
Description: Liver injury pattern.

Columns: 1. Subject; 2. Visit date; 3. ALT x ULN; 4. AST x ULN; 5. Bilirubin x ULN; 6. ALP x ULN; 7. Days between

Logic:
Scenario 1: ALT or AST > 3 x ULN AND total bilirubin > 2 x ULN within [N days] AND ALP < 2 x ULN.

Displays when: Pattern met.
Does not display when: Not met.
Sorting: Subject, Visit date
Notes: A screening aid, not a diagnosis. A clinician decides.

## LIB-MED-02: Subjects with more than one serious event

Report ID: LIB-MED-02
Description: Repeat SAEs.

Columns: 1. Site; 2. Subject; 3. SAE count; 4. Terms; 5. Dates

Logic:
Scenario 1: Count of serious AEs per subject > 1.

Displays when: Repeats.
Does not display when: One or none.
Sorting: SAE count desc

## LIB-MED-03: Treatment discontinued for an AE

Report ID: LIB-MED-03
Description: Early stops due to AEs.

Columns: 1. Site; 2. Subject; 3. AE term; 4. Onset date; 5. Severity; 6. Last dose date; 7. Outcome

Logic:
Scenario 1: Action taken with study drug = "Drug withdrawn" OR disposition reason = "Adverse event".

Displays when: Stopped for an AE.
Does not display when: Others.
Sorting: Site, Subject

## LIB-MED-04: Lab shifts from normal to grade 3 or higher

Report ID: LIB-MED-04
Description: Worsening labs.

Columns: 1. Subject; 2. Test; 3. Baseline grade; 4. Worst post-baseline grade; 5. Date of worst

Logic:
Scenario 1: Baseline grade <= 1 AND worst post-baseline grade >= 3.

Displays when: Shifted.
Does not display when: No.
Sorting: Test, Subject
Notes: Grading table is study-specific.

## LIB-MED-05: QTc prolongation

Report ID: LIB-MED-05
Description: ECG intervals of concern.

Columns: 1. Subject; 2. Visit; 3. QTcF (ms); 4. Baseline QTcF; 5. Change; 6. Category

Logic:
Scenario 1: QTcF > [450, 480, 500] ms.
Scenario 2: Change from baseline > [30, 60] ms.

Displays when: Prolonged.
Does not display when: No.
Sorting: Subject, Visit
Notes: Thresholds are from the protocol or guidance in use.

## LIB-MED-06: Dose reductions and interruptions with reason

Report ID: LIB-MED-06
Description: Dose modifications.

Columns: 1. Subject; 2. Date; 3. Previous dose; 4. New dose; 5. Reason; 6. Linked AE

Logic:
Scenario 1: A dose lower than the previous dose, or a gap in dosing longer than [N days].

Displays when: Modification.
Does not display when: No.
Sorting: Subject, Date

## LIB-MED-07: Deaths

Report ID: LIB-MED-07
Description: All deaths with timeline.

Columns: 1. Site; 2. Subject; 3. Death date; 4. Cause; 5. Days from first dose; 6. Last dose date; 7. Related AE

Logic:
Scenario 1: Death date is not null.

Displays when: Death recorded.
Does not display when: None.
Sorting: Death date
