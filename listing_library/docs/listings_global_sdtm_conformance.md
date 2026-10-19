# SDTM dataset conformance listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings run on SDTM datasets to find conformance and consistency problems. They are not a replacement for a validation tool, but they cover study-specific checks that tools cannot know.

## LIB-SDT-01: Required and expected variables missing or null

Report ID: LIB-SDT-01
Description: Core variables that are empty.

Columns: 1. Domain; 2. USUBJID; 3. Variable; 4. Core; 5. Record number

Logic:
Scenario 1: Variable is Required in the implementation guide AND null.
Scenario 2: Variable is Expected AND null for every record in the domain.

Displays when: Required value missing.
Does not display when: Present.
Sorting: Domain, USUBJID
Notes: The Core designation comes from the SDTM Implementation Guide version in use.

## LIB-SDT-02: Values outside controlled terminology

Report ID: LIB-SDT-02
Description: Coded variables with values not in the codelist.

Columns: 1. Domain; 2. USUBJID; 3. Variable; 4. Value; 5. Codelist; 6. Record count

Logic:
Scenario 1: Value is not in the codelist for the variable, using the controlled terminology version stated in the define file.
Extensible codelists: list the value as a new term for review.

Displays when: Value not in codelist.
Does not display when: In codelist.
Sorting: Domain, Variable

## LIB-SDT-03: Invalid or inconsistent ISO 8601 dates

Report ID: LIB-SDT-03
Description: Date variables with a bad format or order.

Columns: 1. Domain; 2. USUBJID; 3. Variable; 4. Value; 5. Issue

Logic:
Scenario 1: A --DTC value is not valid ISO 8601.
Scenario 2: --STDTC > --ENDTC.
Scenario 3: A --DY value does not agree with the date and RFSTDTC.

Displays when: Invalid or inconsistent date.
Does not display when: Valid.
Sorting: Domain, USUBJID
Notes: Day numbering has no day 0.

## LIB-SDT-04: USUBJID not in DM

Report ID: LIB-SDT-04
Description: Subjects in other domains that are missing from the demographics domain.

Columns: 1. Domain; 2. USUBJID; 3. Record count

Logic:
Scenario 1: USUBJID in any domain does not exist in DM.
Scenario 2: A DM subject has no record in DS.

Displays when: Orphan subject.
Does not display when: All in DM.
Sorting: Domain, USUBJID

## LIB-SDT-05: Sequence and key uniqueness

Report ID: LIB-SDT-05
Description: Duplicate sequence numbers or keys.

Columns: 1. Domain; 2. USUBJID; 3. --SEQ; 4. Key variables; 5. Count

Logic:
Scenario 1: --SEQ repeats within a USUBJID.
Scenario 2: The record keys declared in the define file repeat.

Displays when: Duplicate.
Does not display when: Unique.
Sorting: Domain, USUBJID

## LIB-SDT-06: Standardized and original values disagree

Report ID: LIB-SDT-06
Description: Result variables whose standard and original forms conflict.

Columns: 1. Domain; 2. USUBJID; 3. Test; 4. Original result; 5. Standard result; 6. Original unit; 7. Standard unit

Logic:
Scenario 1: Numeric standard result is null while original result is numeric.
Scenario 2: Standard unit differs from original unit AND no conversion is documented.

Displays when: Conflict.
Does not display when: Consistent.
Sorting: Domain, USUBJID

## LIB-SDT-07: Baseline flag problems

Report ID: LIB-SDT-07
Description: Baseline flag missing or applied more than once.

Columns: 1. Domain; 2. USUBJID; 3. Test; 4. Baseline records; 5. Reference date

Logic:
Scenario 1: A subject-test combination has more than one baseline flag.
Scenario 2: A subject has dosing and tests before the first dose but no baseline flag.

Displays when: No or multiple baselines.
Does not display when: One baseline.
Sorting: Domain, USUBJID, Test
Notes: The baseline rule is in the study's SDTM specification.

## LIB-SDT-08: SUPPQUAL records with no parent

Report ID: LIB-SDT-08
Description: Supplemental qualifiers that cannot be linked.

Columns: 1. RDOMAIN; 2. USUBJID; 3. IDVAR; 4. IDVARVAL; 5. QNAM

Logic:
Scenario 1: No parent record in the related domain matches USUBJID, IDVAR and IDVARVAL.

Displays when: Orphan.
Does not display when: Linked.
Sorting: RDOMAIN, USUBJID

## LIB-SDT-09: Dataset and define file mismatches

Report ID: LIB-SDT-09
Description: Variables present in data but not described, or the reverse.

Columns: 1. Domain; 2. Variable; 3. In data; 4. In define; 5. Issue

Logic:
Scenario 1: Variable in the data but not in the define file.
Scenario 2: In the define file but not in the data.
Scenario 3: Label, type or length differs.

Displays when: Mismatch.
Does not display when: Match.
Sorting: Domain, Variable
