# Safety reconciliation and coding listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that reconcile the clinical database with the safety database and check dictionary coding.

## LIB-REC-01: SAE in the clinical database but not in the safety database

Report ID: LIB-REC-01
Description: Serious AEs in the EDC with no matching safety-system case.

Columns: 1. Site; 2. Subject; 3. AE term; 4. Onset date; 5. Serious flag; 6. Seriousness criteria; 7. Safety case ID

Logic:
Scenario 1: Serious flag = "Yes" AND no safety case matches on Subject and onset date (within [N days]).
Exclude deleted AE records.

Displays when: A serious AE has no safety case.
Does not display when: Every SAE has a matching case.
Sorting: Site, Subject, Onset date
Notes: Matching keys are agreed in the reconciliation plan.

## LIB-REC-02: SAE in the safety database but not in the EDC

Report ID: LIB-REC-02
Description: Safety cases with no corresponding AE in the EDC.

Columns: 1. Subject; 2. Safety case ID; 3. Event term; 4. Onset date; 5. Seriousness criteria; 6. Report date

Logic:
Scenario 1: A safety case exists for the subject AND no AE in the EDC matches on onset date (within [N days]) or on term.

Displays when: A safety case has no EDC AE.
Does not display when: All cases are in the EDC.
Sorting: Subject, Onset date

## LIB-REC-03: Matched SAE with differing fields

Report ID: LIB-REC-03
Description: Cases found in both systems that disagree on key fields.

Columns: 1. Subject; 2. Safety case ID; 3. Field; 4. EDC value; 5. Safety value

Logic:
Scenario 1: Onset date differs.
Scenario 2: Outcome differs.
Scenario 3: Causality (relationship to treatment) differs.
Scenario 4: Seriousness criteria differ.
Scenario 5: Stop date differs while both are present.

Displays when: Any field differs.
Does not display when: All compared fields agree.
Sorting: Subject, Safety case ID, Field
Notes: Fields to compare come from the reconciliation plan.

## LIB-REC-04: AE with no MedDRA coding

Report ID: LIB-REC-04
Description: AE terms not yet coded or coded incompletely.

Columns: 1. Site; 2. Subject; 3. Reported term; 4. LLT; 5. PT; 6. SOC; 7. Coding status

Logic:
Scenario 1: Reported term is not null AND PT is null.
Scenario 2: PT is present AND SOC is null.
Scenario 3: Coding status = "Query" or "Uncodable".

Displays when: A term is not fully coded.
Does not display when: All AE terms are coded to PT and SOC.
Sorting: Site, Subject

## LIB-REC-05: Same verbatim term coded to different PTs

Report ID: LIB-REC-05
Description: Coding consistency check.

Columns: 1. Reported term (normalized); 2. PT; 3. Record count; 4. Subjects

Logic:
Scenario 1: After lowercasing and trimming, the same verbatim term maps to more than one PT.

Displays when: One term, several PTs.
Does not display when: Each term has one PT.
Sorting: Reported term, PT
Notes: May be correct when the context differs. For review.

## LIB-REC-06: Medication with no WHODrug coding

Report ID: LIB-REC-06
Description: Concomitant medications not coded.

Columns: 1. Site; 2. Subject; 3. Medication; 4. Drug record; 5. ATC code; 6. Coding status

Logic:
Scenario 1: Medication name is not null AND Drug record is null.
Scenario 2: Drug record present AND ATC code is null.

Displays when: A medication is not coded.
Does not display when: All coded.
Sorting: Site, Subject

## LIB-REC-07: Dictionary version differences

Report ID: LIB-REC-07
Description: Records coded with a dictionary version different from the study version.

Columns: 1. Domain; 2. Dictionary; 3. Version on record; 4. Study version; 5. Record count

Logic:
Scenario 1: Dictionary version on a record <> the version in the data management plan.

Displays when: Mixed versions.
Does not display when: One version throughout.
Sorting: Domain

## LIB-REC-08: Death and pregnancy reporting check

Report ID: LIB-REC-08
Description: Deaths and pregnancies with no expedited-report record.

Columns: 1. Site; 2. Subject; 3. Event; 4. Event date; 5. Reported in safety system; 6. Days to report

Logic:
Scenario 1: Death recorded AND no safety case.
Scenario 2: Pregnancy recorded AND no safety case.

Displays when: Missing report.
Does not display when: Every event has a case.
Sorting: Site, Subject
