# Enrollment and eligibility listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that check consent, eligibility, randomization and screening data.

## LIB-ENR-01: Study procedures before informed consent

Report ID: LIB-ENR-01
Description: Subjects with any study procedure or assessment dated before the informed consent date, or with study data but no consent date.

Columns: 1. Country; 2. Site; 3. Subject; 4. Consent date; 5. Earliest assessment date; 6. Form with earliest assessment; 7. Days before consent

Logic:
Scenario 1: Consent date is not null AND the earliest date on any assessment form (labs, vital signs, ECG, medical history excluded) < Consent date.
Scenario 2: Consent date is null AND the subject has at least one submitted assessment form.
Exclude deleted forms. Compare dates as dates. If a date is partial, state the imputation used.

Displays when: Any assessment dated before consent, or any data with no consent date.
Does not display when: All assessments are on or after the consent date.
Sorting: Country, Site, Subject
Notes: Medical history and prior medication may legitimately pre-date consent, so leave them out.

## LIB-ENR-02: Eligibility criteria not met

Report ID: LIB-ENR-02
Description: Randomized or enrolled subjects with an inclusion criterion answered No, or an exclusion criterion answered Yes.

Columns: 1. Country; 2. Site; 3. Subject; 4. Criterion type; 5. Criterion number; 6. Response; 7. Randomization date; 8. Deviation recorded

Logic:
Scenario 1: Inclusion form item = "No" for any criterion AND the subject has a randomization date.
Scenario 2: Exclusion form item = "Yes" for any criterion AND the subject has a randomization date.
Show whether a protocol deviation or waiver is recorded for the subject.

Displays when: A criterion that blocks eligibility is failed and the subject was randomized.
Does not display when: All inclusion criteria are Yes and all exclusion criteria are No, or the subject is not randomized.
Sorting: Country, Site, Subject, Criterion number
Notes: Waivers are protocol-specific. List them rather than excluding the record.

## LIB-ENR-03: Randomized subjects with no eligibility data

Report ID: LIB-ENR-03
Description: Subjects with a randomization record but no inclusion/exclusion form, or an incomplete one.

Columns: 1. Country; 2. Site; 3. Subject; 4. Randomization date; 5. Inclusion form status; 6. Exclusion form status

Logic:
Scenario 1: Randomization record exists AND the inclusion form does not exist or its status is not submitted.
Scenario 2: Randomization record exists AND the exclusion form does not exist or its status is not submitted.

Displays when: Randomized with a missing or unsubmitted eligibility form.
Does not display when: Both eligibility forms are submitted.
Sorting: Country, Site, Subject

## LIB-ENR-04: Age outside the protocol range

Report ID: LIB-ENR-04
Description: Subjects whose age at consent is outside the allowed range.

Columns: 1. Country; 2. Site; 3. Subject; 4. Date of birth; 5. Consent date; 6. Age at consent; 7. Minimum age; 8. Maximum age

Logic:
Scenario 1: Age at consent = whole years between Date of birth and Consent date. Age < [protocol minimum] OR Age > [protocol maximum].
If the date of birth is partial, say how the age is derived. Missing date of birth or consent date: list separately as Not derivable.

Displays when: Age at consent is below the minimum or above the maximum.
Does not display when: Age is within range.
Sorting: Country, Site, Subject
Notes: The age limits come from the protocol and are not fixed here.

## LIB-ENR-05: Randomization before eligibility confirmed

Report ID: LIB-ENR-05
Description: Subjects randomized on or before the date eligibility was completed.

Columns: 1. Country; 2. Site; 3. Subject; 4. Eligibility completion date; 5. Randomization date; 6. Days between

Logic:
Scenario 1: Randomization date < the latest of the inclusion and exclusion form dates.
Compare dates as dates; list ties for review.

Displays when: Randomization is dated before eligibility was complete.
Does not display when: Eligibility completed before randomization.
Sorting: Country, Site, Subject

## LIB-ENR-06: Possible duplicate subjects

Report ID: LIB-ENR-06
Description: Subjects at different sites, or repeated at one site, who share the same date of birth, sex and initials.

Columns: 1. Country; 2. Site; 3. Subject; 4. Initials; 5. Date of birth; 6. Sex; 7. Matching subject

Logic:
Scenario 1: Two or more subjects with the same Date of birth, Sex and Initials (self-comparison on the demographics form).
Only full dates of birth count. Show each pair once.

Displays when: Same date of birth, sex and initials appear on more than one subject.
Does not display when: No other subject matches.
Sorting: Date of birth, Initials, Site, Subject
Notes: Initials may be masked or blank in some studies. Check data privacy rules first.

## LIB-ENR-07: Screen failures with later data

Report ID: LIB-ENR-07
Description: Subjects recorded as screen failures who have visits or dosing after the screening disposition.

Columns: 1. Country; 2. Site; 3. Subject; 4. Screen failure date; 5. Latest later data date; 6. Form

Logic:
Scenario 1: Disposition = "Screen failure" AND the subject has submitted data on any visit or exposure form dated after the screen failure date.

Displays when: A screen failure has data after the screening outcome.
Does not display when: A screen failure has no later data.
Sorting: Country, Site, Subject

## LIB-ENR-08: Demographics date and value checks

Report ID: LIB-ENR-08
Description: Impossible or inconsistent demographic values.

Columns: 1. Country; 2. Site; 3. Subject; 4. Date of birth; 5. Consent date; 6. Sex; 7. Issue

Logic:
Scenario 1: Date of birth is after Consent date.
Scenario 2: Date of birth is in the future.
Scenario 3: Sex is missing or not in the allowed codelist.

Displays when: Any of the three conditions.
Does not display when: None apply.
Sorting: Country, Site, Subject
