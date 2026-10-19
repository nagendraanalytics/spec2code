# External (vendor) data listings

Scope: Global (all therapeutic areas). EDC systems: all (listing logic is system-neutral).

AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.

Listings for data that arrives from outside the EDC: central lab, ECG, PK, biomarker, IRT/RTSM, ePRO/eCOA and imaging. They compare the vendor file with the EDC and with the transfer agreement.

## LIB-EXT-01: Vendor records with no matching EDC visit

Report ID: LIB-EXT-01
Description: Vendor records (lab, ECG, PK, imaging) whose subject and date match no EDC visit.

Columns: 1. Vendor; 2. Subject; 3. Vendor visit label; 4. Collection date; 5. Test or assessment; 6. Nearest EDC visit; 7. Days from nearest visit

Logic:
Scenario 1: Subject exists in the vendor file AND no EDC visit for the subject has a date within [N days] of the collection date.
Scenario 2: Subject exists in the vendor file but not in the EDC subject list.

Displays when: A vendor record cannot be tied to an EDC visit or subject.
Does not display when: Every vendor record matches an EDC visit.
Sorting: Vendor, Subject, Collection date
Notes: The window N comes from the data transfer agreement.

## LIB-EXT-02: EDC visit with no vendor result

Report ID: LIB-EXT-02
Description: EDC visits where the vendor sample or assessment was due but nothing arrived.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Visit date; 5. Sample collected flag; 6. Expected vendor data; 7. Days since visit

Logic:
Scenario 1: EDC shows the sample as collected = "Yes" AND no vendor record exists within [N days] of the visit date AND days since visit > [transfer lag].
Scenario 2: EDC shows not done and a vendor record exists for the same visit.

Displays when: Collected in EDC with no vendor data, or vendor data for a visit marked not done.
Does not display when: Both sources agree.
Sorting: Site, Subject, Visit
Notes: Do not list visits younger than the vendor's normal turnaround.

## LIB-EXT-03: Collection date or time differs between EDC and vendor

Report ID: LIB-EXT-03
Description: Same sample with different collection dates or times in the two sources.

Columns: 1. Site; 2. Subject; 3. Visit; 4. EDC collection date; 5. Vendor collection date; 6. EDC time; 7. Vendor time; 8. Difference

Logic:
Scenario 1: EDC and vendor collection dates are both present and not equal.
Scenario 2: Dates are equal, both times are present and differ by more than [N minutes].

Displays when: The two sources disagree on when the sample was taken.
Does not display when: They agree.
Sorting: Site, Subject, Visit
Notes: Time zones and date formats must be aligned first.

## LIB-EXT-04: Duplicate vendor records

Report ID: LIB-EXT-04
Description: The same test for the same subject, visit and collection date received more than once.

Columns: 1. Subject; 2. Visit; 3. Test code; 4. Collection date; 5. Result; 6. Transfer date; 7. Record count

Logic:
Scenario 1: More than one record with the same Subject, Visit, Test code and Collection date.
Show whether results are identical (true duplicate) or different (conflicting).

Displays when: More than one record for the same test and sample.
Does not display when: One record per test and sample.
Sorting: Subject, Visit, Test code
Notes: Re-test records may be legitimate if the vendor flags them as such.

## LIB-EXT-05: Vendor values outside the transfer specification

Report ID: LIB-EXT-05
Description: Values that break the data transfer agreement.

Columns: 1. Vendor; 2. Subject; 3. Variable; 4. Value; 5. Allowed values or format; 6. Issue

Logic:
Scenario 1: A coded variable has a value not in the agreed code list.
Scenario 2: A date does not follow the agreed format.
Scenario 3: A numeric result contains text other than the agreed qualifiers.
Scenario 4: A required variable is null.

Displays when: Any scenario.
Does not display when: All values conform.
Sorting: Vendor, Subject, Variable
Notes: The code lists and formats come from the transfer agreement.

## LIB-EXT-06: Lab results missing units or reference ranges

Report ID: LIB-EXT-06
Description: Central or local lab results that cannot be interpreted.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Test; 5. Result; 6. Unit; 7. Normal low; 8. Normal high; 9. Issue

Logic:
Scenario 1: Result is numeric AND unit is null.
Scenario 2: Result is numeric AND both reference limits are null.
Scenario 3: Same test has more than one unit for the same lab.

Displays when: A result lacks the information needed to interpret it.
Does not display when: Units and ranges are present.
Sorting: Site, Subject, Test, Visit

## LIB-EXT-07: Randomization and dispensing do not match IRT

Report ID: LIB-EXT-07
Description: Disagreement between the EDC and the IRT/RTSM system.

Columns: 1. Site; 2. Subject; 3. EDC randomization date; 4. IRT randomization date; 5. EDC treatment or kit; 6. IRT treatment or kit; 7. Issue

Logic:
Scenario 1: Subject randomized in one source and not in the other.
Scenario 2: Randomization dates differ.
Scenario 3: Dispensed kit number in the EDC differs from the IRT.
Do not show treatment arm in any output intended for blinded users.

Displays when: The EDC and IRT disagree.
Does not display when: They agree.
Sorting: Site, Subject
Notes: Blinded studies: restrict this listing to unblinded roles.

## LIB-EXT-08: ePRO or eCOA compliance

Report ID: LIB-EXT-08
Description: Subjects below the required diary or questionnaire completion rate.

Columns: 1. Site; 2. Subject; 3. Instrument; 4. Expected entries; 5. Completed entries; 6. Completion %; 7. Threshold %; 8. Last entry date

Logic:
Scenario 1: Completion % = Completed / Expected * 100 AND Completion % < [threshold].
Scenario 2: Last entry date is more than [N days] before the data cut.

Displays when: Completion is below the threshold or entries have stopped.
Does not display when: Completion meets the threshold.
Sorting: Completion %, Site, Subject
Notes: The threshold and expected schedule come from the protocol.

## LIB-EXT-09: PK samples out of window

Report ID: LIB-EXT-09
Description: PK samples collected outside the allowed time window around dosing.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Nominal time point; 5. Dose date and time; 6. Sample date and time; 7. Actual hours; 8. Allowed window

Logic:
Scenario 1: Actual hours = Sample time minus Dose time AND Actual hours is outside nominal +/- [window].
Scenario 2: Dose time or sample time is null.

Displays when: Sample is out of window or cannot be timed.
Does not display when: Sample is in window.
Sorting: Subject, Visit, Nominal time point
Notes: Windows are in the protocol or lab manual.

## LIB-EXT-10: Imaging or ECG read missing or late

Report ID: LIB-EXT-10
Description: Central reads not returned in time.

Columns: 1. Site; 2. Subject; 3. Visit; 4. Assessment date; 5. Read status; 6. Days since assessment; 7. Read date

Logic:
Scenario 1: Assessment exists AND Read status is null or pending AND days since assessment > [turnaround].
Scenario 2: Read date is before assessment date.

Displays when: A read is overdue or impossible by date.
Does not display when: Reads are complete and ordered.
Sorting: Days since assessment desc
