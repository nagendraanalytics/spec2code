# Complex cross-form edit-check listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings that compare several forms, use multiple OR-ed scenarios, or compare consecutive records. Each one needs the study's real form and item names.

## LIB-CX-01: Date sequence across the study

Report ID: LIB-CX-01
Description: Subjects whose key dates are not in the expected order.

Columns: 1. Country; 2. Site; 3. Subject; 4. Consent date; 5. Randomization date; 6. First dose date; 7. Last dose date; 8. End of study date; 9. Rule broken

Logic:
Check each rule separately and show the rule broken:
Rule 1: Consent date > Randomization date.
Rule 2: Randomization date > First dose date.
Rule 3: First dose date > Last dose date.
Rule 4: Last dose date > End of study date.
Skip a rule when either date is null. Compare dates as dates.

Displays when: Any rule is broken.
Does not display when: All dates are in order.
Sorting: Country, Site, Subject
Notes: A subject can appear once per broken rule.

## LIB-CX-02: Disposition and dosing agree

Report ID: LIB-CX-02
Description: Disposition status that conflicts with dosing records.

Columns: 1. Country; 2. Site; 3. Subject; 4. Disposition; 5. Disposition date; 6. Last dose date; 7. Issue

Logic:
Scenario 1: Disposition = "Discontinued treatment" AND a dose is dated after the disposition date.
Scenario 2: Disposition = "Completed treatment" AND the last dose date is earlier than [planned end date] without a recorded reason.
Scenario 3: Disposition reason = "Adverse event" AND no AE with action taken = "Drug withdrawn" exists for the subject.

Displays when: Any scenario.
Does not display when: None.
Sorting: Country, Site, Subject

## LIB-CX-03: Death consistency across forms

Report ID: LIB-CX-03
Description: Death recorded differently on different forms, or activity after death.

Columns: 1. Country; 2. Site; 3. Subject; 4. Death date (disposition); 5. Death date (death form); 6. Fatal AE end date; 7. Last visit date; 8. Last dose date; 9. Issue

Logic:
Scenario 1: Death dates on different forms are not equal.
Scenario 2: Death date present AND any visit or dose date is later.
Scenario 3: Fatal AE exists AND no death date is recorded anywhere.

Displays when: Any scenario.
Does not display when: Death data agree and nothing follows death.
Sorting: Country, Site, Subject

## LIB-CX-04: Abnormal lab with no AE and no medication

Report ID: LIB-CX-04
Description: Severe lab abnormalities with neither an AE nor a treatment recorded.

Columns: 1. Country; 2. Site; 3. Subject; 4. Test; 5. Result; 6. Grade; 7. Collection date; 8. AEs in window; 9. CMs in window

Logic:
Scenario 1: Lab grade >= [3] AND no AE starts within [N days] of the collection date AND no CM starts within [N days] of the collection date.
Grades are taken from the lab data if derived there, or by a grading table in the data review plan.

Displays when: Severe abnormality with no AE or CM.
Does not display when: An AE or CM covers it.
Sorting: Country, Site, Subject, Collection date

## LIB-CX-05: Pregnancy test checks

Report ID: LIB-CX-05
Description: Pregnancy testing that is missing, wrongly collected or positive without follow-up.

Columns: 1. Country; 2. Site; 3. Subject; 4. Sex; 5. Childbearing potential; 6. Visit; 7. Test result; 8. Issue

Logic:
Scenario 1: Sex = "Female" AND Childbearing potential = "Yes" AND a required visit has no pregnancy test.
Scenario 2: Sex = "Male" AND a pregnancy test exists.
Scenario 3: Test result = "Positive" AND no AE, dosing stop or disposition follows within [N days].

Displays when: Any scenario.
Does not display when: None.
Sorting: Country, Site, Subject, Visit

## LIB-CX-06: Overlapping records of the same medication

Report ID: LIB-CX-06
Description: The same medication with overlapping date ranges for one subject.

Columns: 1. Country; 2. Site; 3. Subject; 4. Medication; 5. Start date 1; 6. End date 1; 7. Start date 2; 8. End date 2

Logic:
Scenario 1: Two CM records for the same Subject and coded medication, where start2 <= end1 AND start1 <= end2 (null end = ongoing). Compare each pair once (self-join).

Displays when: Date ranges overlap.
Does not display when: No overlap.
Sorting: Country, Site, Subject, Medication
Notes: Overlap may be valid for different doses. Review before correcting.

## LIB-CX-07: AE already present at baseline

Report ID: LIB-CX-07
Description: Adverse events that match an ongoing medical history condition but are not flagged as worsening.

Columns: 1. Country; 2. Site; 3. Subject; 4. AE term; 5. AE start date; 6. Medical history term; 7. Ongoing; 8. Flagged as pre-existing

Logic:
Scenario 1: Medical history Ongoing = "Yes" AND the AE coded term equals the medical history coded term (or the same system organ class) AND the AE start date is after consent AND the pre-existing / worsening flag is null.

Displays when: Same condition and not flagged.
Does not display when: Flagged, or no match.
Sorting: Country, Site, Subject
Notes: Matching on coded terms needs coding to be complete.

## LIB-CX-08: Randomization stratum disagrees with source data

Report ID: LIB-CX-08
Description: Stratification factors given at randomization that differ from the data in the EDC.

Columns: 1. Country; 2. Site; 3. Subject; 4. Stratum (randomization); 5. Value from source form; 6. Form

Logic:
Scenario 1: Age group at randomization <> age group derived from Date of birth and Consent date.
Scenario 2: Stratification factor on the randomization form <> the value on its source form.

Displays when: Stratum and source differ.
Does not display when: They agree.
Sorting: Country, Site, Subject

## LIB-CX-09: Large change between consecutive visits

Report ID: LIB-CX-09
Description: Lab or vital values that change by more than a threshold relative to the previous visit.

Columns: 1. Country; 2. Site; 3. Subject; 4. Test; 5. Previous visit; 6. Previous value; 7. Visit; 8. Value; 9. Ratio or change

Logic:
Scenario 1: For each subject and test, compare each value with the previous value by visit date (consecutive record comparison). Value / Previous value >= [ratio, for example 1.5 for creatinine] OR ABS(Value - Previous value) >= [absolute change].
Do not compare values in different units.

Displays when: Change above the threshold.
Does not display when: Below.
Sorting: Country, Site, Subject, Test, Visit

## LIB-CX-10: Discontinuation status differs across forms

Report ID: LIB-CX-10
Description: A subject marked as discontinued on one form but not on related forms, repeated for each trial segment.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Visit; 6. Date; 7. Status on this form; 8. Status on disposition; 9. Scenario

Logic:
Scenario 1: The study disposition form says "Discontinued" AND the treatment status form for any segment does not.
Scenario 2: The treatment status form for a segment says "Discontinued" AND the study disposition form does not.
Scenario 3: Repeat Scenarios 1 and 2 for each trial segment form (same check, different forms).
Compare the latest record per subject and form.

Displays when: Statuses disagree.
Does not display when: Statuses agree.
Sorting: Country, Site, Subject, Form
Notes: Typical OR-ed scenario list. The same check applies to several forms.

## LIB-CX-11: Visit marked not done but has data

Report ID: LIB-CX-11
Description: Visits recorded as not conducted that still have assessments or dosing.

Columns: 1. Country; 2. Site; 3. Subject; 4. Visit; 5. Visit not done reason; 6. Form with data; 7. Date

Logic:
Scenario 1: Visit performed = "No" AND any assessment or exposure form for that visit has data.

Displays when: Not done but data exists.
Does not display when: No conflict.
Sorting: Country, Site, Subject, Visit

## LIB-CX-12: Repeating form sequence problems

Report ID: LIB-CX-12
Description: Gaps or duplicates in the sequence numbers of repeating forms.

Columns: 1. Country; 2. Site; 3. Subject; 4. Form; 5. Sequence number; 6. Issue

Logic:
Scenario 1: For the same Subject and Form, two records have the same sequence number.
Scenario 2: A sequence number is missing between 1 and the highest number.

Displays when: Duplicate or gap in sequence.
Does not display when: Sequence is continuous.
Sorting: Country, Site, Subject, Form, Sequence number
Notes: Deleted records can create gaps. Say whether they count.

## LIB-CX-13: Overlapping exposure periods

Report ID: LIB-CX-13
Description: Exposure records for the same subject and study drug whose date ranges overlap.

Columns: 1. Country; 2. Site; 3. Subject; 4. Study drug; 5. Start date 1; 6. End date 1; 7. Start date 2; 8. End date 2

Logic:
Scenario 1: Two exposure records for the same subject and drug where start2 <= end1 AND start1 <= end2. Compare each pair once.

Displays when: Ranges overlap.
Does not display when: No overlap.
Sorting: Country, Site, Subject

## LIB-CX-14: Conditional forms present or missing

Report ID: LIB-CX-14
Description: A form that should exist only when an answer on another form is Yes, shown both ways.

Columns: 1. Country; 2. Site; 3. Subject; 4. Trigger form; 5. Trigger answer; 6. Dependent form; 7. Dependent form exists; 8. Issue

Logic:
Scenario 1: Trigger answer = "Yes" AND the dependent form does not exist.
Scenario 2: Trigger answer = "No" or null AND the dependent form exists.

Displays when: Dependency is broken in either direction.
Does not display when: Both sides agree.
Sorting: Country, Site, Subject
