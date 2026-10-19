"""Therapeutic-area listing definitions. `basis` lists (TAUG title, term) pairs that the build step checks against the
imported guides. A pair that is not found is dropped from the output, never invented."""
from content_global import L

DOCS = []


def add(key, ta, title, intro, listings):
    DOCS.append(dict(key=key, title=title, scope="ta", ref=ta, intro=intro, listings=listings))


add("oncology", "Oncology", "Oncology listings", "Tumor response, performance status, biomarker and timing listings. Response rules follow the protocol's criteria (for example RECIST 1.1).", [
    L("LIB-ONC-01", "Overall response inconsistent with lesion data",
      "Overall response that cannot follow from the target, non-target and new lesion assessments.",
      ["Country", "Site", "Subject", "Visit", "Target lesion response", "Non-target response", "New lesion", "Overall response", "Issue"],
      "Scenario 1: New lesion = \"Yes\" AND Overall response <> \"PD\".\nScenario 2: Overall response = \"CR\" AND (Target lesion response <> \"CR\" OR Non-target response <> \"CR\").\nScenario 3: Overall response = \"PR\" AND Target lesion response in (\"SD\", \"PD\").\nUse the response criteria named in the protocol; these three follow the RECIST pattern.",
      "Overall response cannot follow from the components.", "Components and overall response agree.", "Country, Site, Subject, Visit",
      "Rules differ for other criteria (Lugano, RANO, PCWG3). Follow the protocol.", [("TAUG Lung Cancer v1.0", "RECIST"), ("TAUG Colorectal Cancer v1.0", "RECIST")]),
    L("LIB-ONC-02", "Target lesion measurements incomplete",
      "Assessment visits with target lesions identified at baseline but no measurement.",
      ["Country", "Site", "Subject", "Visit", "Lesion", "Baseline size", "Visit size", "Not evaluable reason"],
      "Scenario 1: A target lesion recorded at baseline has no measurement at the visit AND no not-evaluable reason.\nScenario 2: Number of target lesions at a visit > [protocol limit, 5 in RECIST 1.1, 2 per organ].",
      "Missing measurement, or too many target lesions.", "All baseline target lesions are measured.", "Country, Site, Subject, Visit, Lesion", "", [("TAUG Lung Cancer v1.0", "target lesion")]),
    L("LIB-ONC-03", "Tumor assessment timing",
      "Assessments done earlier or later than the protocol schedule, or before the baseline scan.",
      ["Country", "Site", "Subject", "Baseline assessment date", "Assessment date", "Previous assessment date", "Weeks between"],
      "Scenario 1: Assessment date <= Baseline assessment date.\nScenario 2: Weeks between consecutive assessments > [protocol interval + allowed window].\nScenario 3: Subject on treatment past the scheduled assessment with no assessment recorded.",
      "Timing breaks the schedule.", "Timing follows the schedule.", "Country, Site, Subject, Assessment date", "", [("TAUG Lung Cancer v1.0", "RECIST")]),
    L("LIB-ONC-04", "Performance status missing or worsening",
      "ECOG performance status missing at scheduled visits, or worsening by two or more grades without an AE.",
      ["Country", "Site", "Subject", "Visit", "ECOG", "Previous ECOG", "AEs in window"],
      "Scenario 1: ECOG is null at a scheduled visit.\nScenario 2: ECOG - Previous ECOG >= 2 AND no AE starts within [N days].",
      "Missing, or worsening with no AE.", "Present and stable.", "Country, Site, Subject, Visit", "", [("TAUG Lung Cancer v1.0", "ECOG"), ("TAUG Colorectal Cancer v1.0", "ECOG")]),
    L("LIB-ONC-05", "PSA values missing or rising",
      "Prostate studies: PSA missing at scheduled visits, or rising across consecutive visits.",
      ["Country", "Site", "Subject", "Visit", "PSA", "Previous PSA", "Nadir PSA", "Rise from nadir"],
      "Scenario 1: PSA is null at a scheduled visit.\nScenario 2: PSA >= Nadir PSA + [protocol rise] AND the rise is confirmed by a later value (consecutive record comparison).",
      "Missing, or rising and confirmed.", "Present and not rising.", "Country, Site, Subject, Visit", "PSA progression rules are protocol-specific.", [("TAUG Prostate Cancer v1.0", "PSA")]),
    L("LIB-ONC-06", "Biomarker status missing",
      "Randomized subjects with no tumor biomarker status where the protocol needs it.",
      ["Country", "Site", "Subject", "Biomarker", "Result", "Sample date", "Randomization date"],
      "Scenario 1: Subject is randomized AND the required biomarker (for example KRAS or EGFR) has no result, or the result is dated after randomization when it must come before.",
      "Biomarker missing or late.", "Result present and timely.", "Country, Site, Subject", "", [("TAUG Colorectal Cancer v1.0", "KRAS")]),
])

add("diabetes", "Diabetes", "Diabetes listings", "Glycemic control, hypoglycemia and device data listings. Glucose thresholds are protocol-defined.", [
    L("LIB-DIA-01", "Hypoglycemia events and glucose values disagree",
      "Hypoglycemia events whose recorded glucose does not fit the severity, and events with no glucose value.",
      ["Country", "Site", "Subject", "Event date", "Severity", "Glucose value", "Unit", "Treatment given"],
      "Scenario 1: Severity = \"Severe\" AND no assistance recorded.\nScenario 2: Glucose value >= [protocol hypoglycemia threshold; 70 mg/dL is commonly used for level 1] AND event classified as hypoglycemia.\nScenario 3: Glucose value is null AND event classified as hypoglycemia.\nConvert mg/dL and mmol/L before comparing (1 mmol/L = 18 mg/dL, approximately).",
      "Severity, glucose and assistance disagree.", "They agree.", "Country, Site, Subject, Event date", "", [("TAUG Diabetes v1.0", "hypoglyc")]),
    L("LIB-DIA-02", "HbA1c missing or in a different unit",
      "HbA1c missing at scheduled visits, or reported in a different unit from the other visits.",
      ["Country", "Site", "Subject", "Visit", "HbA1c", "Unit", "Previous unit"],
      "Scenario 1: HbA1c is null at a visit where it is scheduled.\nScenario 2: Unit differs between visits for the same subject (% versus mmol/mol).",
      "Missing or unit differs.", "Present and consistent.", "Country, Site, Subject, Visit", "", [("TAUG Diabetes v1.0", "HbA1c")]),
    L("LIB-DIA-03", "Insulin dose changes without a reason",
      "Insulin dose changes between consecutive records with no recorded reason.",
      ["Country", "Site", "Subject", "Date", "Previous basal dose", "Basal dose", "Previous bolus dose", "Bolus dose", "Reason"],
      "Scenario 1: Compare each insulin record with the previous record of the same subject (consecutive record comparison). Basal or bolus dose differs AND Reason is null.",
      "Dose changed with no reason.", "Unchanged, or reason given.", "Country, Site, Subject, Date", "", [("TAUG Diabetes v1.0", "insulin")]),
    L("LIB-DIA-04", "Continuous glucose monitor data coverage",
      "Subjects whose sensor wear time is below the protocol minimum.",
      ["Country", "Site", "Subject", "Period start", "Period end", "Days with data", "Wear time %"],
      "Scenario 1: Wear time % = readings obtained / readings possible x 100 < [protocol minimum, often 70 over 14 days].",
      "Coverage below the minimum.", "At or above.", "Wear time %, Site, Subject", "Check the device type and reading interval.", [("TAUG Type 1 Diabetes: Pediatrics and Devices v2.0", "continuous glucose")]),
])

add("cardiovascular", "Cardiovascular", "Cardiovascular listings", "Heart failure, cardiovascular events and QT/ECG listings.", [
    L("LIB-CV-01", "Heart failure hospitalization dates",
      "Hospitalizations with missing or illogical dates.",
      ["Country", "Site", "Subject", "Admission date", "Discharge date", "Reason", "Related AE"],
      "Scenario 1: Discharge date < Admission date.\nScenario 2: Admission date is null.\nScenario 3: Hospitalization reason = heart failure AND no AE or event form is recorded.",
      "Dates or linked records are wrong.", "Dates are logical and linked.", "Country, Site, Subject, Admission date", "", [("TAUG Heart Failure v1.0", "hospitalization")]),
    L("LIB-CV-02", "Baseline cardiac measures missing",
      "Subjects with no baseline ejection fraction or NYHA class.",
      ["Country", "Site", "Subject", "Baseline LVEF", "Baseline NYHA", "Baseline visit date"],
      "Scenario 1: Baseline LVEF is null.\nScenario 2: Baseline NYHA class is null.\nScenario 3: LVEF is outside [protocol eligibility range].",
      "Missing or out of range.", "Present and in range.", "Country, Site, Subject", "", [("TAUG Heart Failure v1.0", "ejection fraction"), ("TAUG Heart Failure v1.0", "NYHA")]),
    L("LIB-CV-03", "Cardiovascular events without an event form",
      "AEs of myocardial infarction, stroke or similar with no corresponding event form for adjudication.",
      ["Country", "Site", "Subject", "AE term", "AE start date", "Event form exists"],
      "Scenario 1: Coded AE term in [myocardial infarction, stroke, other adjudicated events] AND no event form exists for the subject within [N days] of the AE start date.\nThe adjudicated event list is protocol-specific.",
      "Event with no event form.", "Event form exists.", "Country, Site, Subject, AE start date", "", [("TAUG Cardiovascular Studies v1.0", "myocardial infarction"), ("TAUG Cardiovascular Studies v1.0", "stroke")]),
    L("LIB-CV-04", "QTcF thresholds and missing ECG time points",
      "QTcF above alert levels, increases from baseline, and incomplete ECG sets.",
      ["Country", "Site", "Subject", "Visit", "Time point", "QTcF", "Baseline QTcF", "Change from baseline", "Replicates"],
      "Scenario 1: QTcF > [alert level; 450, 480 and 500 ms are commonly used].\nScenario 2: QTcF - Baseline QTcF > [change; 30 and 60 ms are commonly used].\nScenario 3: Number of ECG replicates at a time point < [protocol replicates].",
      "Above a level, or incomplete.", "Within limits and complete.", "Country, Site, Subject, Visit, Time point", "", [("TAUG QT Studies v1.0", "QTcF")]),
])

add("respiratory", "Respiratory", "Respiratory listings", "Asthma exacerbation and lung function listings.", [
    L("LIB-RESP-01", "Exacerbations without systemic corticosteroids",
      "Exacerbations that the protocol defines by treatment, with no corticosteroid recorded.",
      ["Country", "Site", "Subject", "Exacerbation start", "Exacerbation end", "Systemic corticosteroid", "Related CM"],
      "Scenario 1: Exacerbation recorded AND no CM with a systemic corticosteroid starts within [N days] of the exacerbation start.\nScenario 2: Exacerbation end < start.\nScenario 3: Exacerbation is reported as an AE but not on the exacerbation form, or the reverse.",
      "Exacerbation and treatment or forms disagree.", "They agree.", "Country, Site, Subject, Exacerbation start", "", [("TAUG Asthma v1.0", "exacerbation")]),
    L("LIB-RESP-02", "FEV1 measurement checks",
      "FEV1 results missing, or large changes between visits.",
      ["Country", "Site", "Subject", "Visit", "Pre-bronchodilator FEV1", "Post-bronchodilator FEV1", "Previous FEV1", "Change %"],
      "Scenario 1: A scheduled FEV1 has no pre- or post-bronchodilator value.\nScenario 2: ABS(FEV1 - Previous FEV1) / Previous FEV1 x 100 > [threshold] (consecutive record comparison).\nScenario 3: Post-bronchodilator FEV1 < pre-bronchodilator FEV1 by more than [tolerance].",
      "Missing or implausible.", "Present and plausible.", "Country, Site, Subject, Visit", "", [("TAUG Asthma v1.0", "FEV1")]),
])

add("infectious_disease", "Infectious Disease", "Infectious disease listings", "HIV, COVID-19, influenza and malaria listings.", [
    L("LIB-ID-01", "HIV viral load rebound and missing CD4",
      "Detectable viral load after suppression, with no repeat test, and visits missing CD4.",
      ["Country", "Site", "Subject", "Visit", "Viral load", "Previous viral load", "Repeat test date", "CD4"],
      "Scenario 1: Viral load >= [threshold, for example 200 copies/mL] after a previous value below the threshold AND no repeat test within [N days].\nScenario 2: CD4 is null at a scheduled visit.",
      "Rebound with no repeat, or CD4 missing.", "Repeated, or present.", "Country, Site, Subject, Visit", "", [("TAUG HIV v1.0", "viral load"), ("TAUG HIV v1.0", "CD4")]),
    L("LIB-ID-02", "Respiratory support without hospitalization",
      "COVID-19 records of oxygen or ventilation support with no hospitalization record.",
      ["Country", "Site", "Subject", "Support type", "Start date", "End date", "Hospitalization admission", "Hospitalization discharge"],
      "Scenario 1: Oxygen or ventilation support recorded AND no hospitalization record overlaps the support dates.\nScenario 2: Support end date < start date.",
      "Support with no hospitalization.", "Hospitalization covers the support.", "Country, Site, Subject, Start date", "", [("TAUG COVID-19 v2.0", "ventilat"), ("TAUG COVID-19 v2.0", "oxygen")]),
    L("LIB-ID-03", "Malaria parasitemia at follow-up without rescue treatment",
      "Positive parasite counts at the end of follow-up with no rescue medication recorded.",
      ["Country", "Site", "Subject", "Visit", "Parasite count", "Gametocytes", "Rescue medication", "Fever"],
      "Scenario 1: Parasite count > 0 at Day [28] AND no rescue medication recorded.\nScenario 2: Parasite count missing at a scheduled day.",
      "Positive and no rescue, or missing.", "Negative, rescued, or recorded.", "Country, Site, Subject, Visit", "", [("TAUG Uncomplicated Malaria v1.0", "parasit")]),
    L("LIB-ID-04", "Influenza symptom diary completeness",
      "Subjects with missing diary days within the symptom period.",
      ["Country", "Site", "Subject", "Day", "Diary entry", "Hospitalized"],
      "Scenario 1: A diary day inside the symptom assessment period has no entry for a subject who was not hospitalized.\nScenario 2: Hospitalization recorded AND diary entries continue during the stay without an explanation.",
      "Missing diary days, or entries during hospitalization.", "Diary is complete.", "Country, Site, Subject, Day", "", [("TAUG Influenza v1.1", "symptom")]),
])

add("neurology", "Neurology", "Neurology listings", "Multiple sclerosis, Alzheimer's disease, traumatic brain injury and related listings.", [
    L("LIB-NEU-01", "MS relapses without a disability assessment",
      "Relapses with no EDSS assessment near the relapse, and scheduled MRI scans missing.",
      ["Country", "Site", "Subject", "Relapse start", "EDSS date", "EDSS", "MRI date", "MRI scheduled"],
      "Scenario 1: Relapse recorded AND no EDSS assessment within [N days] of the relapse start.\nScenario 2: MRI scheduled at a visit AND no MRI record exists.",
      "Relapse with no EDSS, or MRI missing.", "Both present.", "Country, Site, Subject, Relapse start", "", [("TAUG Multiple Sclerosis v1.0", "EDSS"), ("TAUG Multiple Sclerosis v1.0", "relapse")]),
    L("LIB-NEU-02", "Cognitive scale scores out of range or missing",
      "Cognitive scores outside the scale range, outside the eligibility range, or missing.",
      ["Country", "Site", "Subject", "Visit", "Scale", "Score", "Valid range", "Eligibility range", "Rater"],
      "Scenario 1: Score outside the valid range of the scale (for example MMSE 0 to 30).\nScenario 2: Screening score outside [protocol eligibility range].\nScenario 3: A scheduled cognitive assessment has no score.\nScenario 4: Rater changes between consecutive visits where the protocol asks for the same rater.",
      "Out of range, missing or rater changed.", "In range, present, same rater.", "Country, Site, Subject, Visit", "", [("TAUG Alzheimer's Disease and Mild Cognitive Impairment v2.0.1", "MMSE")]),
    L("LIB-NEU-03", "Glasgow Coma Scale checks",
      "Glasgow Coma Scale totals that do not equal the components, or are out of range.",
      ["Country", "Site", "Subject", "Visit", "Eye", "Verbal", "Motor", "Total"],
      "Scenario 1: Total <> Eye + Verbal + Motor.\nScenario 2: Total < 3 or Total > 15.",
      "Total disagrees or is out of range.", "Total is correct.", "Country, Site, Subject, Visit", "", [("TAUG Traumatic Brain Injury v1.0", "Glasgow")]),
])

add("dermatology", "Dermatology", "Dermatology listings", "Psoriasis severity score listings.", [
    L("LIB-DER-01", "PASI components and total disagree",
      "PASI totals that do not match the regional scores, and regional values out of range.",
      ["Country", "Site", "Subject", "Visit", "Head", "Upper limbs", "Trunk", "Lower limbs", "Total PASI", "Calculated PASI"],
      "Scenario 1: Total PASI <> the sum of regional scores calculated with the standard region weights (head 0.1, upper limbs 0.2, trunk 0.3, lower limbs 0.4) applied to (erythema + induration + scaling) x area score.\nScenario 2: Area score outside 0 to 6, or a sign score outside 0 to 4.\nScenario 3: Total PASI outside 0 to 72.",
      "Total disagrees or an input is out of range.", "Total matches and inputs are valid.", "Country, Site, Subject, Visit", "", [("TAUG Psoriasis v1.0", "PASI")]),
    L("LIB-DER-02", "PGA and PASI disagree",
      "Physician global assessment of clear with a high PASI, or the reverse.",
      ["Country", "Site", "Subject", "Visit", "PGA", "PASI", "BSA"],
      "Scenario 1: PGA = \"Clear\" AND PASI >= [threshold].\nScenario 2: PGA = \"Severe\" AND PASI <= [threshold].\nScenario 3: BSA > 100.",
      "Scales disagree or BSA is impossible.", "Scales agree.", "Country, Site, Subject, Visit", "Thresholds are a judgment call. Agree them with the clinical team.", [("TAUG Psoriasis v1.0", "PGA"), ("TAUG Psoriasis v1.0", "BSA")]),
])

add("gastroenterology", "Gastroenterology", "Gastroenterology listings", "Crohn's disease activity listings.", [
    L("LIB-GI-01", "CDAI components and diary completeness",
      "Visits where the Crohn's Disease Activity Index cannot be calculated.",
      ["Country", "Site", "Subject", "Visit", "Diary days", "Stool frequency", "Abdominal pain", "General well-being", "CDAI"],
      "Scenario 1: Diary days available in the 7 days before the visit < [required days].\nScenario 2: CDAI is present AND any component used to calculate it is null.\nScenario 3: Fistula assessment missing for subjects with perianal disease at baseline.",
      "CDAI cannot be supported, or fistula assessment is missing.", "All components are present.", "Country, Site, Subject, Visit", "", [("TAUG Crohn's Disease v1.0", "CDAI"), ("TAUG Crohn's Disease v1.0", "fistula")]),
])

add("psychiatry", "Psychiatry", "Psychiatry listings", "Schizophrenia scale and relapse listings.", [
    L("LIB-PSY-01", "PANSS item scores and totals",
      "PANSS items out of range, missing, or totals that do not match.",
      ["Country", "Site", "Subject", "Visit", "Positive total", "Negative total", "General total", "Total", "Items missing"],
      "Scenario 1: Any item score outside 1 to 7.\nScenario 2: Any item is null while a total is present.\nScenario 3: Total <> Positive + Negative + General.",
      "Out of range, missing or totals differ.", "Items valid and totals match.", "Country, Site, Subject, Visit", "", [("TAUG Schizophrenia v1.1", "PANSS")]),
    L("LIB-PSY-02", "Relapse and hospitalization consistency",
      "Relapses and psychiatric hospitalizations recorded without each other.",
      ["Country", "Site", "Subject", "Relapse date", "Hospitalization admission", "Hospitalization discharge"],
      "Scenario 1: Relapse defined by hospitalization in the protocol AND no hospitalization record exists.\nScenario 2: Psychiatric hospitalization recorded AND no relapse record within [N days].",
      "Relapse and hospitalization disagree.", "They agree.", "Country, Site, Subject, Relapse date", "", [("TAUG Schizophrenia v1.1", "relapse")]),
])

add("nephrology", "Nephrology", "Nephrology listings", "Acute kidney injury and kidney transplant listings.", [
    L("LIB-NEP-01", "Creatinine rise without an AKI event",
      "Serum creatinine increases that meet the AKI definition with no AKI event recorded.",
      ["Country", "Site", "Subject", "Baseline creatinine", "Creatinine", "Collection date", "Rise", "AKI event recorded", "Dialysis"],
      "Scenario 1: Creatinine - previous creatinine >= 0.3 mg/dL within 48 hours, OR Creatinine >= 1.5 x baseline, AND no AKI event or AE is recorded.\nScenario 2: Dialysis recorded AND no AKI or renal AE.\nUse the definition in the protocol. These thresholds are the commonly used KDIGO ones.",
      "Rise or dialysis with no AKI event.", "AKI event is recorded.", "Country, Site, Subject, Collection date", "", [("TAUG Acute Kidney Injury v1.0", "creatinine"), ("TAUG Acute Kidney Injury v1.0", "KDIGO")]),
    L("LIB-NEP-02", "Rejection episodes and graft loss records",
      "Rejection episodes with no biopsy, and graft loss with no date.",
      ["Country", "Site", "Subject", "Rejection date", "Biopsy date", "Biopsy result", "Graft loss", "Graft loss date"],
      "Scenario 1: Rejection episode recorded AND no biopsy within [N days] where the protocol requires one.\nScenario 2: Graft loss = \"Yes\" AND graft loss date is null.\nScenario 3: Graft loss date < transplant date.",
      "Missing biopsy or date, or illogical date.", "Records complete.", "Country, Site, Subject, Rejection date", "", [("TAUG Kidney Transplant v1.0", "rejection"), ("TAUG Kidney Transplant v1.0", "graft")]),
])

add("pediatrics", "Pediatrics", "Pediatrics listings", "Age-related and growth listings.", [
    L("LIB-PED-01", "Age group, growth and pubertal stage checks",
      "Subjects whose age group, growth values or Tanner stage look wrong.",
      ["Country", "Site", "Subject", "Visit", "Age at visit", "Age group", "Height", "Weight", "Tanner stage", "Previous Tanner stage"],
      "Scenario 1: Age group on the form <> the group derived from Date of birth and visit date.\nScenario 2: Height decreases between consecutive visits.\nScenario 3: Tanner stage decreases between consecutive visits.\nScenario 4: Dose per kg outside [protocol range] using the recorded weight.",
      "Any check fails.", "All checks pass.", "Country, Site, Subject, Visit", "Do not apply adult plausibility ranges to children.", [("Data Standards User Guide for Pediatrics v1.0", "Tanner"), ("Data Standards User Guide for Pediatrics v1.0", "growth")]),
])
