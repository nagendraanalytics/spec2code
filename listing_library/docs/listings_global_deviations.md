# Protocol deviation and compliance listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that find possible protocol deviations from data and track those already recorded.

## LIB-DEV-01: Visits outside the protocol window

Report ID: LIB-DEV-01
Description: Visits dated outside the allowed window around their target day.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Visit date; 5. Target date; 6. Allowed from; 7. Allowed to; 8. Days off

Logic:
Scenario 1: Visit date < Target date - [lower] OR Visit date > Target date + [upper]. Target date = Reference date + planned day.
Reference date is the first dose date, or randomization date if the protocol says so.

Displays when: A visit falls outside its window.
Does not display when: Within window.
Sorting: Site, Subject, Visit
Notes: Windows are from the schedule of assessments.

## LIB-DEV-02: Missed required assessments

Report ID: LIB-DEV-02
Description: Required assessments with no data at a visit that took place.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Assessment; 5. Visit date; 6. Status

Logic:
Scenario 1: Visit exists AND the assessment required at that visit has no record AND is not marked Not Done with a reason.

Displays when: Required assessment absent.
Does not display when: Present or documented.
Sorting: Site, Subject, Visit

## LIB-DEV-03: Dosing deviations

Report ID: LIB-DEV-03
Description: Doses not as planned.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Planned dose; 5. Actual dose; 6. Dose date; 7. Reason

Logic:
Scenario 1: Actual dose <> Planned dose AND no reason such as dose reduction for toxicity is recorded.
Scenario 2: Dose given after a recorded stop-treatment date.
Scenario 3: Dose given while a criterion in the dose-hold rule is met.

Displays when: Dose differs from the plan without a recorded reason.
Does not display when: As planned.
Sorting: Site, Subject, Dose date

## LIB-DEV-04: Prohibited medication use

Report ID: LIB-DEV-04
Description: Medications the protocol prohibits.

Columns: 1. Site; 2. Subject; 3. Medication; 4. Drug class; 5. Start date; 6. End date; 7. Overlaps treatment

Logic:
Scenario 1: Medication matches the prohibited list (by drug record, ATC class, or name) AND its dates overlap the treatment period.

Displays when: Prohibited drug taken during treatment.
Does not display when: None.
Sorting: Site, Subject, Start date
Notes: The prohibited list is protocol-specific.

## LIB-DEV-05: Recorded deviations with no category or no action

Report ID: LIB-DEV-05
Description: Deviation log quality.

Columns: 1. Site; 2. Subject; 3. Deviation ID; 4. Date; 5. Category; 6. Severity; 7. Action; 8. Status

Logic:
Scenario 1: Category is null.
Scenario 2: Severity is null.
Scenario 3: Status is open AND age > [N days].

Displays when: Incomplete or stale deviation record.
Does not display when: Complete and current.
Sorting: Site, Subject

## LIB-DEV-06: Informed consent version and re-consent

Report ID: LIB-DEV-06
Description: Subjects consented on an outdated version or not re-consented.

Columns: 1. Site; 2. Subject; 3. Consent version; 4. Consent date; 5. Current version approved on; 6. Re-consent date

Logic:
Scenario 1: Consent date is after the current version approval date AND the version on record is older.
Scenario 2: A new version required re-consent AND the subject has data after approval date but no re-consent date.

Displays when: Wrong version or missing re-consent.
Does not display when: Current.
Sorting: Site, Subject
Notes: Version dates come from the study's approval log.
