"""
clinical_modules.py — registry of clinical SPEC TYPES (the "modules").

Spec2Code is a general platform: any clinical specification in, code in
any supported language out. A *spec type* says what kind of clinical
specification this is, so the generators can be given the right domain
context and the UI can offer the right starting template.

Honest status, same discipline as code_gen_registry.py and
spec_templates.py:

  "verified"  -- real, human-confirmed specs and code exist for this type
                 (today: only the EDC/CDM listing type, grounded in the
                 469-spec report library).
  "template"  -- the module ships a starting template and general domain
                 guidance for generators. NOTHING has been checked against
                 a real, confirmed spec+code pair yet. Output for these
                 types is a draft for a programmer to review, never a
                 verified result. Promoting a module to "verified" needs at
                 least one real (spec, correct code) pair first.

A module is a FAMILY of listings (the spec type); `listing_types` are the
specific listings inside it. A listing type adds its own short guidance to the
prompt on top of the module's. Listing types inherit their module's status:
nothing here says which types the 469-spec library actually covers. Measuring
that (classify the real library against this taxonomy) is a separate step.

`guidance` is general clinical-programming domain knowledge appended to the
beta generators' prompts (SQL / R / SAS). It deliberately never names
tables, columns or dictionary versions as certain -- generators must keep
flagging those as EXPLICIT vs INFERRED. The verified Veeva/CQL path does
NOT receive module guidance: its verified behaviour must not change.
"""

from typing import Optional, TypedDict


class ListingType(TypedDict):
    id: str
    label: str
    summary: str
    guidance: str  # appended to the generator prompt, never shown in the public listing


class ClinicalModule(TypedDict):
    id: str
    label: str
    status: str  # "verified" | "template"
    summary: str
    typical_inputs: list
    typical_outputs: list
    guidance: str
    listing_types: list  # ListingType, the specific listings this family covers
    example_spec: dict


DEFAULT_MODULE_ID = "edc_cdm_listing"

MODULES: dict = {
    "edc_cdm_listing": {
        "id": "edc_cdm_listing",
        "label": "EDC / CDM listings",
        "status": "verified",
        "summary": "Data-cleaning and reconciliation listings built from EDC form and item data.",
        "typical_inputs": ["CDM report specification", "Study form and item metadata"],
        "typical_outputs": ["Cleaning listings", "Cross-form reconciliation listings"],
        "guidance": (
            "This is a data-management cleaning listing. Records marked deleted and visits marked "
            "erroneous are normally excluded unless the report's purpose is to surface them. "
            "Partial and unknown dates must be handled explicitly, as the spec states."
        ),
        "listing_types": [
            {"id": 'cross_form_consistency', "label": 'Cross-form consistency', "summary": 'A value on one form disagrees with another form (status vs. date, yes/no vs. detail).', "guidance": 'Compare the same subject and visit across the forms involved. Say which form is the source of truth.'},
            {"id": 'missing_data', "label": 'Missing data and pages', "summary": 'Expected fields, forms or visits that were not entered.', "guidance": 'Define what is expected (visit schedule, form rules). An absent record and a blank field are different findings.'},
            {"id": 'date_chronology', "label": 'Date chronology', "summary": 'Dates in an impossible order, such as an end before a start or an event before consent.', "guidance": 'Handle partial and unknown dates explicitly and state the comparison granularity (day, month or year).'},
            {"id": 'range_plausibility', "label": 'Out-of-range and plausibility', "summary": 'Values outside allowed limits or clinically implausible.', "guidance": 'Limits and units come from the spec. Do not assume a unit conversion.'},
            {"id": 'duplicates', "label": 'Duplicate records', "summary": 'The same event or assessment recorded more than once.', "guidance": 'Define the key. Separate exact duplicates from conflicting duplicates.'},
            {"id": 'visit_window', "label": 'Visit window and schedule', "summary": 'Visits outside protocol windows, out of sequence or missing.', "guidance": 'Window definition and reference date come from the spec.'},
            {"id": 'form_status', "label": 'Form status, SDV and signatures', "summary": 'Forms that are incomplete, unsigned, unverified or unlocked.', "guidance": 'Status values come from the spec. Be explicit about frozen and locked states.'},
            {"id": 'coding_listing', "label": 'Medical coding', "summary": 'Terms that are uncoded, or coded inconsistently (adverse events, medications, history).', "guidance": 'Do not assume a dictionary or version. Compare the verbatim term with the coded term as the spec says.'},
            {"id": 'enrollment_randomization', "label": 'Enrollment and randomization checks', "summary": 'Eligibility, stratification or randomization data that conflicts across forms.', "guidance": 'Name the stratification factors and the form each one comes from.'},
            {"id": 'exposure_dosing', "label": 'Dosing and exposure consistency', "summary": 'Dosing records that conflict with each other or with the visit schedule.', "guidance": 'State the dose unit and how interruptions and partial doses are treated.'},
            {"id": 'erroneous_deleted', "label": 'Deleted and erroneous records', "summary": 'Records marked deleted or erroneous, listed for review.', "guidance": 'Here the usual default of excluding deleted and erroneous records is reversed: the listing exists to surface them.'},
        ],
        "example_spec": {
            "reportId": "ABC002_JR",
            "description": "This report identifies overlaps in adverse events based on matching LLT terms and overlapping onset/end dates.",
            "columnHeading": "1. Country\n2. Site\n3. Subject Number\n4. AE/VAE 1 Seq\n5. AE/VAE 1 Verbatim\n6. AE/VAE LLT\n7. AE/VAE 1 Onset Dt\n8. AE/VAE 1 End Dt\n9. AE/VAE 2 Seq\n10. AE/VAE 2 Verbatim\n11. AE/VAE 2 Onset Dt\n12. AE/VAE 2 End Dt",
            "logic": "This report lists subjects with overlapping onset dates/end dates for identical AE/VAE Terms. Identical AE/VAE terms are defined as having the same LLT after encoding. Each pair of overlapping adverse events should be output on one line. Note: Continuing adverse events (with no End Date) should also be included in the report.",
            "reportScenarios": "Scenario 1 - YES: overlapping onset/end dates and identical LLT after encoding. Scenario 2 - NO: overlapping dates but LLT differs. Scenario 3 - NO: identical LLT but no overlapping dates.",
            "sorting": "Country, Site, Subject Number, AE/VAE LLT, AE/VAE 1 Seq, AE/VAE 2 Seq",
        },
    },
    "data_review": {
        "id": "data_review",
        "label": "Data review",
        "status": "template",
        "summary": "Cross-form and cross-visit checks that drive queries and missing or inconsistent data reports.",
        "typical_inputs": ["Data review plan check definitions", "Edit check specifications"],
        "typical_outputs": ["Query-driving listings", "Missing and inconsistent data reports"],
        "guidance": (
            "This is a data review check. The output is the set of records that FAIL the check, "
            "so the population is the exceptions, not the clean records. Be explicit about the grain "
            "(record, visit or subject). Comparisons across consecutive records and date differences "
            "need a stated ordering and explicit handling of missing and partial dates."
        ),
        "listing_types": [
            {"id": 'edit_check_fail', "label": 'Edit-check failures', "summary": 'Records that fail a programmed edit check.', "guidance": 'Output the failing records only. State the check logic exactly as written.'},
            {"id": 'query_status', "label": 'Open queries and aging', "summary": 'Queries by status, age and owner.', "guidance": 'Age is measured from a stated date to a stated reference date. State how closed and cancelled queries are treated.'},
            {"id": 'entry_timeliness', "label": 'Data entry timeliness', "summary": 'Delay between a visit or event and its data entry.', "guidance": 'Both dates, and the unit of the delay, come from the spec.'},
            {"id": 'missing_assessments', "label": 'Missing visits and assessments', "summary": 'Planned visits or assessments with no data.', "guidance": 'The plan (visit schedule, assessment matrix) must be the stated source of what is expected.'},
            {"id": 'subject_status', "label": 'Subject status consistency', "summary": 'Disposition or status that conflicts with later data.', "guidance": 'Define which status wins when forms disagree.'},
            {"id": 'repeat_unscheduled', "label": 'Unscheduled and repeated assessments', "summary": 'Unscheduled visits and repeated measurements.', "guidance": 'Define what counts as a repeat and which value is the reportable one.'},
            {"id": 'protocol_compliance_dm', "label": 'Protocol compliance checks', "summary": 'Data showing a protocol requirement was not met.', "guidance": 'Quote the protocol requirement. Do not infer limits that the spec does not give.'},
        ],
        "example_spec": {
            "reportId": "DR_TEMPLATE_01",
            "description": "Lists subjects whose visit date is earlier than the informed consent date.",
            "columnHeading": "1. Site\n2. Subject Number\n3. Informed Consent Date\n4. Visit Name\n5. Visit Date",
            "logic": "Include a record when the visit date is earlier than the informed consent date for the same subject. Exclude records with a missing visit date or a missing consent date.",
            "reportScenarios": "Scenario 1 - YES: visit date earlier than consent date. Scenario 2 - NO: visit date on or after consent date. Scenario 3 - NO: consent date missing.",
            "sorting": "Site, Subject Number, Visit Date",
        },
    },
    "safety_monitoring": {
        "id": "safety_monitoring",
        "label": "Safety monitoring",
        "status": "template",
        "summary": "Adverse event, serious adverse event and laboratory safety listings and signal reports.",
        "typical_inputs": ["Safety review plan", "AE/SAE reporting specification", "Lab shift specification"],
        "typical_outputs": ["Safety listings", "SAE reconciliation listings", "Lab abnormality listings"],
        "guidance": (
            "This is a safety listing. Seriousness, severity, causality and outcome are separate "
            "attributes and must not be conflated. Ongoing events have no end date and must be "
            "handled as the spec states. Coded terms (MedDRA) must match exactly as the spec says, "
            "without assuming a dictionary version. Lab shifts compare a post-baseline value to the "
            "baseline category, so the baseline definition must come from the spec."
        ),
        "listing_types": [
            {"id": 'ae_all', "label": 'All adverse events', "summary": 'Every adverse event, by subject.', "guidance": 'Output one row per event. Keep seriousness, severity, causality and outcome as separate columns.'},
            {"id": 'teae', "label": 'Treatment-emergent adverse events', "summary": 'Events starting on or after the first dose, within a stated window.', "guidance": 'The treatment-emergent definition and window come from the spec. Handle partial onset dates as stated.'},
            {"id": 'ae_soc_pt', "label": 'Adverse events by SOC and preferred term', "summary": 'Events grouped by system organ class and preferred term.', "guidance": 'Use the coded terms as the spec says. Do not assume a dictionary version.'},
            {"id": 'ae_severe_related_fatal', "label": 'Severe, related or fatal events', "summary": 'Events filtered on severity, causality or outcome.', "guidance": 'State the exact category values that count as severe or related.'},
            {"id": 'ae_discontinuation', "label": 'Events leading to discontinuation or dose change', "summary": 'Events with an action taken on study treatment.', "guidance": 'Use the action-taken field exactly as defined. Say which treatment it applies to.'},
            {"id": 'aesi', "label": 'Adverse events of special interest', "summary": 'Events matching a predefined AESI list or query.', "guidance": 'The list or query definition must come from the spec. Do not build one from medical judgement.'},
            {"id": 'sae', "label": 'Serious adverse events', "summary": 'Events with the serious flag, with criteria.', "guidance": 'Show the seriousness criteria. Ongoing events have no end date and must be handled as stated.'},
            {"id": 'deaths', "label": 'Deaths', "summary": 'Subjects who died, with cause and date.', "guidance": 'Reconcile the death date across forms as the spec says, and list conflicts.'},
            {"id": 'pregnancy', "label": 'Pregnancies and exposure in pregnancy', "summary": 'Pregnancy reports and outcomes.', "guidance": 'Include the exposure timing relative to study treatment as the spec defines it.'},
            {"id": 'lab_abnormal', "label": 'Laboratory abnormalities', "summary": 'Results outside range or at or above a stated toxicity grade.', "guidance": 'The range, unit and grading scale come from the spec. Do not assume one.'},
            {"id": 'lab_shift', "label": 'Laboratory shift', "summary": 'Movement from the baseline category to the worst post-baseline category.', "guidance": 'The baseline definition and the category scheme must come from the spec.'},
            {"id": 'liver_safety', "label": 'Potential liver injury', "summary": 'Subjects meeting liver-enzyme and bilirubin criteria together.', "guidance": 'Thresholds and the time window for combining values come from the spec.'},
            {"id": 'vitals_ecg_abnormal', "label": 'Vital signs and ECG abnormalities', "summary": 'Measurements meeting a stated abnormality or change criterion.', "guidance": 'State the criterion and the reference value (baseline or limit).'},
            {"id": 'overdose_error', "label": 'Overdose, medication error and misuse', "summary": 'Reports of overdose, wrong dose, misuse or abuse.', "guidance": "Use the spec's definitions. Keep these separate from adverse event rows unless it says to join them."},
        ],
        "example_spec": {
            "reportId": "SAF_TEMPLATE_01",
            "description": "Lists serious adverse events with a causality assessment of related to study treatment.",
            "columnHeading": "1. Site\n2. Subject Number\n3. AE Term\n4. Onset Date\n5. End Date\n6. Severity\n7. Causality\n8. Outcome",
            "logic": "Include adverse events where the serious flag is Yes and the causality is Related. Include ongoing events that have no end date.",
            "reportScenarios": "Scenario 1 - YES: serious and related. Scenario 2 - NO: serious but not related. Scenario 3 - NO: related but not serious.",
            "sorting": "Site, Subject Number, Onset Date",
        },
    },
    "medical_monitoring": {
        "id": "medical_monitoring",
        "label": "Medical monitoring",
        "status": "template",
        "summary": "Patient profiles and medical review listings for the study physician.",
        "typical_inputs": ["Medical monitoring plan", "Patient profile specification"],
        "typical_outputs": ["Patient profiles", "Protocol deviation listings", "Eligibility review listings"],
        "guidance": (
            "This is a medical review listing, read by a clinician. Group output by subject and keep "
            "related events, concomitant medications and deviations traceable to the same subject and "
            "date range. Links between records (for example a medication started in response to an "
            "event) must come from the spec, never from guesswork."
        ),
        "listing_types": [
            {"id": 'patient_profile', "label": 'Patient profiles', "summary": 'One combined view per subject across events, medications, labs and visits.', "guidance": 'Group by subject and keep every section traceable to the same subject and date range.'},
            {"id": 'eligibility_ie', "label": 'Eligibility and inclusion/exclusion', "summary": 'Subjects whose eligibility answers conflict with the criteria.', "guidance": 'List each criterion with the data that answers it. Do not infer a criterion from the title.'},
            {"id": 'protocol_deviation', "label": 'Protocol deviations', "summary": 'Deviations by category and importance, per subject.', "guidance": 'Use the category and importance values as recorded. Do not reclassify.'},
            {"id": 'conmeds', "label": 'Concomitant medications', "summary": 'Medications taken during the study.', "guidance": 'Handle partial and ongoing dates as the spec states. Say how coded names are used.'},
            {"id": 'prohibited_meds', "label": 'Prohibited and rescue medication', "summary": 'Medications the protocol disallows or limits.', "guidance": 'The prohibited list and timing window must come from the spec.'},
            {"id": 'medical_history', "label": 'Medical history and baseline conditions', "summary": 'Conditions present before treatment.', "guidance": 'State the cut-off date that separates history from adverse events.'},
            {"id": 'dose_modification', "label": 'Dose modifications and interruptions', "summary": 'Reductions, delays and interruptions of study treatment.', "guidance": 'Include the reason as recorded. State the dose unit.'},
            {"id": 'disposition', "label": 'Subject disposition and discontinuations', "summary": 'Completion and discontinuation by reason.', "guidance": "Use the spec's reason categories. Flag conflicts between status forms."},
            {"id": 'ae_conmed_link', "label": 'Events with the medication given', "summary": 'Adverse events listed with treatments given for them.', "guidance": 'A link between an event and a medication must come from the spec, for example a recorded linkage or a stated date window.'},
            {"id": 'lab_trend', "label": 'Lab and vital sign trends', "summary": 'Serial values for a clinician to review.', "guidance": 'Order by visit date. State handling of repeats and unscheduled values.'},
        ],
        "example_spec": {
            "reportId": "MED_TEMPLATE_01",
            "description": "Lists concomitant medications started within seven days after the onset of an adverse event.",
            "columnHeading": "1. Subject Number\n2. AE Term\n3. AE Onset Date\n4. Medication\n5. Medication Start Date",
            "logic": "Include a medication when its start date is on or after the adverse event onset date and no more than seven days later, for the same subject.",
            "reportScenarios": "Scenario 1 - YES: start within seven days after onset. Scenario 2 - NO: start before onset. Scenario 3 - NO: start more than seven days after onset.",
            "sorting": "Subject Number, AE Onset Date, Medication Start Date",
        },
    },
    "adam_listing": {
        "id": "adam_listing",
        "label": "Analysis and CSR listings",
        "status": "template",
        "summary": "Subject-level listings for the clinical study report (ICH E3 section 16.2) and ADaM-based derivation checks.",
        "typical_inputs": ["ADaM dataset specification", "Listing shell"],
        "typical_outputs": ["ADaM-based listings", "Derivation code"],
        "guidance": (
            "This is an analysis-dataset listing. Population flags (for example the analysis set), "
            "baseline flags and analysis visit windows are defined by the ADaM spec and must be applied "
            "exactly as written. Derived variables must follow the spec's derivation text, and the "
            "source variables each derivation uses must be named."
        ),
        "listing_types": [
            {"id": 'e3_discontinued', "label": 'Discontinued patients (E3 16.2.1)', "summary": 'Subjects who stopped treatment or study, with reasons.', "guidance": 'Use the disposition reasons as the spec defines them.'},
            {"id": 'e3_protocol_deviations', "label": 'Protocol deviations (E3 16.2.2)', "summary": 'Deviations by subject for the report.', "guidance": 'List category and importance as recorded.'},
            {"id": 'e3_excluded_efficacy', "label": 'Patients excluded from efficacy analysis (E3 16.2.3)', "summary": 'Subjects outside an analysis set, with the reason.', "guidance": 'Apply the population flags exactly as the ADaM spec defines them.'},
            {"id": 'e3_demographics', "label": 'Demographic data (E3 16.2.4)', "summary": 'Demographics and baseline characteristics per subject.', "guidance": 'Use the derived variables as specified. Do not recompute age or similar.'},
            {"id": 'e3_compliance_concentration', "label": 'Compliance and drug concentration (E3 16.2.5)', "summary": 'Exposure, compliance and concentration data.', "guidance": 'State how compliance is derived and the unit of concentration.'},
            {"id": 'e3_efficacy_individual', "label": 'Individual efficacy response (E3 16.2.6)', "summary": 'Per-subject efficacy data.', "guidance": 'Name the source variables for every derived column.'},
            {"id": 'e3_adverse_events', "label": 'Adverse events by subject (E3 16.2.7)', "summary": 'Adverse event listing for the report.', "guidance": 'Treatment-emergent flags come from the ADaM spec, not from re-derivation.'},
            {"id": 'e3_laboratory', "label": 'Laboratory measurements by subject (E3 16.2.8)', "summary": 'Individual lab values for the report.', "guidance": 'Use analysis visit, baseline flag and range indicators as specified.'},
            {"id": 'population_membership', "label": 'Analysis population membership', "summary": 'Which subjects fall in each analysis set.', "guidance": 'Show each flag and the reason for any exclusion.'},
            {"id": 'exposure_listing', "label": 'Exposure', "summary": 'Dosing summaries per subject.', "guidance": 'State how duration and cumulative dose are derived.'},
            {"id": 'derivation_check', "label": 'Derived-variable check', "summary": 'Source values beside derived values to verify a derivation.', "guidance": 'Name the source variables and the derivation text the listing is checking.'},
        ],
        "example_spec": {
            "reportId": "ADAM_TEMPLATE_01",
            "description": "Lists subjects in the safety analysis set with their baseline and last post-baseline value of a laboratory parameter.",
            "columnHeading": "1. Subject Number\n2. Parameter\n3. Baseline Value\n4. Last Post-Baseline Value\n5. Change From Baseline",
            "logic": "Include subjects whose safety population flag is Y. Baseline is the record whose baseline flag is Y. The last post-baseline value is the latest analysis visit after baseline. Change from baseline is the last post-baseline value minus the baseline value.",
            "reportScenarios": "Scenario 1 - YES: subject in the safety set with baseline and post-baseline values. Scenario 2 - NO: subject not in the safety set. Scenario 3 - NO: no baseline value.",
            "sorting": "Parameter, Subject Number",
        },
    },

    "external_reconciliation": {
        "id": "external_reconciliation",
        "label": "External data reconciliation",
        "status": "template",
        "summary": "Checks that vendor and external-system data agree with the EDC: safety database, central lab, imaging, PK, ePRO and IRT.",
        "typical_inputs": ["Data transfer agreement", "Reconciliation plan", "Vendor data specification"],
        "typical_outputs": ["Mismatch listings", "Unmatched subject listings", "Transfer check listings"],
        "guidance": (
            "This is a reconciliation listing. Two sources are compared, so the output must show both "
            "sides of each mismatch and the key used to match them. Matching keys, tolerances for date "
            "differences and which source wins must come from the spec, never assumed."
        ),
        "listing_types": [
            {"id": 'sae_reconciliation', "label": 'SAE reconciliation', "summary": 'Serious events in the safety database compared with the EDC.', "guidance": 'Define the matching keys and which fields must agree. Output both sides of each mismatch.'},
            {"id": 'central_lab_recon', "label": 'Central lab reconciliation', "summary": 'Vendor lab data compared with EDC visit and sample records.', "guidance": 'Match on subject, visit and collection date. State the tolerance for date differences.'},
            {"id": 'ecg_imaging_recon', "label": 'ECG and imaging reconciliation', "summary": 'Vendor read data compared with EDC.', "guidance": 'State the matching keys and what a read versus a local assessment means.'},
            {"id": 'pk_biomarker_recon', "label": 'PK and biomarker sample reconciliation', "summary": 'Sample collection records compared with lab receipt and results.', "guidance": 'Define the expected sample set per visit and time point.'},
            {"id": 'epro_recon', "label": 'ePRO and eCOA reconciliation', "summary": 'Patient-reported data compared with visit and subject records.', "guidance": 'Handle missed diaries and late entries as the spec states.'},
            {"id": 'irt_recon', "label": 'IRT and RTSM reconciliation', "summary": 'Randomization and drug dispensing in the IRT compared with the EDC.', "guidance": 'Compare treatment assignment, kit and date. Keep any treatment code blinded as the spec requires.'},
            {"id": 'external_load_checks', "label": 'External data load checks', "summary": 'Unmatched subjects, missing visits or duplicate rows in a data transfer.', "guidance": 'State the key and the expected population for the transfer.'},
        ],
        "example_spec": {
            "reportId": "REC_TEMPLATE_01",
            "description": "Lists serious adverse events present in the safety database but missing or different in the EDC.",
            "columnHeading": "1. Site\n2. Subject Number\n3. Event Term\n4. Safety DB Onset Date\n5. EDC Onset Date\n6. Difference",
            "logic": "Match on subject number and event term. Include a record when the onset dates differ, or when the event exists in only one source.",
            "reportScenarios": "Scenario 1 - YES: event only in one source. Scenario 2 - YES: onset dates differ. Scenario 3 - NO: both sources agree.",
            "sorting": "Site, Subject Number, Event Term",
        },
    },
    "efficacy_outcomes": {
        "id": "efficacy_outcomes",
        "label": "Efficacy and clinical outcomes",
        "status": "template",
        "summary": "Endpoint, response, scale and biomarker listings used to review and check efficacy data.",
        "typical_inputs": ["Statistical analysis plan", "Endpoint definitions", "Scoring manual"],
        "typical_outputs": ["Endpoint listings", "Response listings", "Score listings"],
        "guidance": (
            "This is an efficacy data listing. Endpoint definitions, scoring rules, analysis visits and "
            "response criteria come from the analysis plan and must be applied exactly as written. "
            "Do not assume a criteria version or a handling rule for missing items."
        ),
        "listing_types": [
            {"id": 'primary_endpoint', "label": 'Primary endpoint data', "summary": 'Source data and derived values for the primary endpoint.', "guidance": 'Derivation rules and the analysis visit come from the spec.'},
            {"id": 'tumor_response', "label": 'Tumor response', "summary": 'Lesion measurements and overall response per assessment.', "guidance": 'The response criteria version must come from the spec. Do not assume one.'},
            {"id": 'pro_qol', "label": 'Patient-reported outcomes and quality of life', "summary": 'Instrument scores per visit.', "guidance": 'Scoring rules and the handling of missing items come from the spec.'},
            {"id": 'clinical_scales', "label": 'Clinical scales and scores', "summary": 'Item-level and total scores of a rating scale.', "guidance": 'State the scale version and how totals are computed.'},
            {"id": 'biomarker_pkpd', "label": 'Biomarker and PK/PD data', "summary": 'Concentrations, biomarker levels and time points.', "guidance": 'State the time-point convention and handling of values below the limit of quantification.'},
            {"id": 'time_to_event', "label": 'Time-to-event data', "summary": 'Event and censoring dates and derived durations.', "guidance": 'Define the start date, the event and the censoring rule exactly.'},
            {"id": 'responder', "label": 'Responder and non-responder', "summary": 'Subjects classified by a response definition.', "guidance": 'The response threshold and its time point come from the spec.'},
            {"id": 'immunogenicity', "label": 'Immunogenicity', "summary": 'Antibody or titre results and seroresponse.', "guidance": 'State the assay cut-offs and the seroresponse definition.'},
        ],
        "example_spec": {
            "reportId": "EFF_TEMPLATE_01",
            "description": "Lists subjects with a total score at week 12 and the change from baseline.",
            "columnHeading": "1. Subject Number\n2. Baseline Score\n3. Week 12 Score\n4. Change From Baseline",
            "logic": "Baseline is the last score on or before the first dose. Week 12 is the score at the visit named Week 12. Change is week 12 minus baseline. Exclude subjects with no baseline score.",
            "reportScenarios": "Scenario 1 - YES: baseline and week 12 present. Scenario 2 - NO: baseline missing.",
            "sorting": "Subject Number",
        },
    },
    "trial_operations": {
        "id": "trial_operations",
        "label": "Trial operations",
        "status": "template",
        "summary": "Enrollment, site, supply, monitoring and consent listings used to manage the study.",
        "typical_inputs": ["Monitoring plan", "Data management plan", "Supply plan"],
        "typical_outputs": ["Enrollment listings", "Site status listings", "Accountability listings"],
        "guidance": (
            "This is an operational listing, read by the study team rather than a clinician. Counts and "
            "dates must be exact, and the reference date for any status or age must be stated. "
            "Treatment information stays blinded unless the spec says otherwise."
        ),
        "listing_types": [
            {"id": 'enrollment_screen_fail', "label": 'Enrollment and screen failures', "summary": 'Subjects screened, enrolled and failed, with reasons.', "guidance": 'Define the point at which a subject counts as enrolled.'},
            {"id": 'site_status', "label": 'Site activation and status', "summary": 'Sites by activation date and status.', "guidance": 'State the status values and the reference date.'},
            {"id": 'ip_accountability', "label": 'Investigational product accountability', "summary": 'Shipped, dispensed, returned and destroyed supply.', "guidance": 'State the unit and the reconciliation rule. Keep treatment codes blinded as required.'},
            {"id": 'monitoring_sdv', "label": 'Monitoring and source verification status', "summary": 'Verification progress by site and subject.', "guidance": 'State how percentage complete is computed.'},
            {"id": 'crf_completion', "label": 'CRF completion and timeliness', "summary": 'Forms completed against what is expected, and how late.', "guidance": 'The expected form set and the timeliness limit come from the spec.'},
            {"id": 'randomization_stratification', "label": 'Randomization and stratification checks', "summary": 'Assigned stratum compared with the recorded data.', "guidance": 'Name each stratification factor and its source.'},
            {"id": 'unblinding', "label": 'Unblinding events', "summary": 'Emergency and planned unblindings.', "guidance": 'Restrict who can see treatment information, as the spec requires.'},
            {"id": 'consent_tracking', "label": 'Informed consent tracking', "summary": 'Consent versions, dates and re-consent.', "guidance": 'Define the version-to-date rule that makes a consent valid.'},
        ],
        "example_spec": {
            "reportId": "OPS_TEMPLATE_01",
            "description": "Lists screened subjects who were not enrolled, with the screen failure reason.",
            "columnHeading": "1. Site\n2. Subject Number\n3. Screening Date\n4. Screen Failure Reason",
            "logic": "Include subjects with a screening date and no randomization date. Show the screen failure reason as recorded.",
            "reportScenarios": "Scenario 1 - YES: screened and not randomized. Scenario 2 - NO: randomized.",
            "sorting": "Site, Subject Number",
        },
    },
    "regulatory_safety": {
        "id": "regulatory_safety",
        "label": "Regulatory and committee safety reporting",
        "status": "template",
        "summary": "Line listings for expedited reports, periodic safety reports and data monitoring committees.",
        "typical_inputs": ["Safety management plan", "DMC charter", "Reference safety information"],
        "typical_outputs": ["SUSAR line listings", "DMC listings", "Periodic safety line listings"],
        "guidance": (
            "This is a regulated safety listing. Reporting periods, cut-off dates, expectedness and "
            "who may see treatment information are defined by the plan or charter and must come from "
            "the spec. Never decide expectedness or causality yourself."
        ),
        "listing_types": [
            {"id": 'susar', "label": 'SUSAR line listing', "summary": 'Suspected unexpected serious adverse reactions for expedited reporting.', "guidance": 'Expectedness depends on a reference document the spec must name. Do not decide it.'},
            {"id": 'dmc_open', "label": 'DMC open-report listings', "summary": 'Listings for a data monitoring committee, blinded.', "guidance": 'Keep treatment information out where the spec says the report is open.'},
            {"id": 'dmc_closed', "label": 'DMC closed-report listings', "summary": 'Unblinded listings for a data monitoring committee.', "guidance": 'Treatment information is included only as the spec states. Restrict access accordingly.'},
            {"id": 'periodic_safety_line', "label": 'Periodic safety report line listings', "summary": 'Line listings for an annual or periodic safety report.', "guidance": 'The reporting period and cut-off dates come from the spec.'},
            {"id": 'expedited_clock', "label": 'Expedited reporting clock', "summary": 'Time from awareness of an event to its report.', "guidance": 'Both dates and the time limit come from the spec.'},
        ],
        "example_spec": {
            "reportId": "REG_TEMPLATE_01",
            "description": "Lists serious adverse reactions reported in the period that are marked unexpected.",
            "columnHeading": "1. Subject Number\n2. Event Term\n3. Onset Date\n4. Causality\n5. Expectedness\n6. Report Date",
            "logic": "Include events where the serious flag is Yes, the causality is Related and the expectedness is Unexpected, with a report date inside the reporting period.",
            "reportScenarios": "Scenario 1 - YES: serious, related and unexpected in the period. Scenario 2 - NO: expected.",
            "sorting": "Report Date, Subject Number",
        },
    },

    "pharmacovigilance": {
        "id": "pharmacovigilance",
        "label": "Pharmacovigilance",
        "status": "template",
        "summary": "Case, signal and periodic reporting listings from a safety database, for marketed and investigational products.",
        "typical_inputs": ["Safety database case data", "Safety management plan", "Periodic report plan", "Signal evaluation request"],
        "typical_outputs": ["Case line listings", "Timeliness listings", "Signal case series", "Periodic report line listings"],
        "guidance": (
            "This is a pharmacovigilance listing built on case data, where one case can have several "
            "versions, events and products. State the grain (case, event or product) and which case "
            "version is used. Clock-start dates, reporting time limits, data lock points and "
            "expectedness reference documents must come from the spec. Never decide causality, "
            "expectedness or seriousness yourself, and never assume a dictionary version."
        ),
        "listing_types": [
            {"id": 'icsr_line_listing', "label": 'Individual case safety report line listing', "summary": 'One row per case with the key case, product and event fields.', "guidance": 'Output one row per case, not per event, unless the spec says otherwise. Keep case version and follow-up number visible.'},
            {"id": 'case_timeliness', "label": 'Case processing and reporting timeliness', "summary": 'Time from case receipt to processing steps and regulatory submission.', "guidance": 'The clock-start date, the end date and the time limit come from the spec. Do not assume a limit.'},
            {"id": 'expedited_submission', "label": 'Expedited submission and acknowledgement status', "summary": 'Cases due, submitted and acknowledged, by authority or partner.', "guidance": 'State the destination, the due-date rule and what counts as acknowledged.'},
            {"id": 'duplicate_cases', "label": 'Potential duplicate cases', "summary": 'Cases that may describe the same patient and event.', "guidance": 'Matching fields and any date tolerance come from the spec. Output both cases of each pair.'},
            {"id": 'followup_status', "label": 'Follow-up status', "summary": 'Cases with follow-up requested, received or overdue.', "guidance": 'Define the follow-up cycle and the reference date for overdue.'},
            {"id": 'literature_cases', "label": 'Literature surveillance cases', "summary": 'Cases from published literature, with the source reference.', "guidance": 'Show the citation fields. State how a single article with several patients is split into cases.'},
            {"id": 'periodic_report_line', "label": 'Periodic benefit-risk report line listings', "summary": 'Cumulative and interval case listings for a periodic report.', "guidance": 'The data lock point, reporting interval and product scope come from the spec.'},
            {"id": 'signal_case_series', "label": 'Signal case series', "summary": 'All cases for a product and event combination under evaluation.', "guidance": 'The product and event definition (for example a term group) must come from the spec. Do not widen it.'},
            {"id": 'special_interest_cases', "label": 'Cases of special interest', "summary": 'Cases matching a safety topic, risk or watch list.', "guidance": 'The topic definition or list must come from the spec. Do not build one from medical judgement.'},
            {"id": 'pregnancy_lactation', "label": 'Pregnancy and lactation exposure', "summary": 'Exposure during pregnancy or breastfeeding, with outcome.', "guidance": 'State the exposure window and the follow-up needed for an outcome.'},
            {"id": 'medication_error_misuse', "label": 'Medication error, misuse and off-label use', "summary": 'Reports of error, abuse, overdose or use outside the label.', "guidance": "Use the spec's categories. Keep them separate from event rows unless it says to join them."},
            {"id": 'lack_of_efficacy', "label": 'Lack of efficacy and product complaints', "summary": 'Reports of treatment failure or a product quality complaint.', "guidance": 'State whether an associated adverse event is required for a row to appear.'},
            {"id": 'special_populations', "label": 'Special populations', "summary": 'Cases in children, older adults, or patients with organ impairment.', "guidance": 'Age bands and population definitions come from the spec. State the age reference date.'},
            {"id": 'fatal_cases', "label": 'Fatal and life-threatening cases', "summary": 'Cases with a fatal or life-threatening outcome.', "guidance": 'Show seriousness criteria and the reported versus company assessed cause. Do not infer cause.'},
            {"id": 'assessment_comparison', "label": 'Reporter versus company assessment', "summary": 'Seriousness, causality or expectedness that differs between the reporter and the company.', "guidance": 'Show both assessments side by side. Expectedness depends on a named reference document.'},
            {"id": 'partner_reconciliation', "label": 'Partner and licensee case reconciliation', "summary": 'Case lists compared with a business partner.', "guidance": 'Define the matching key and which fields must agree. Output both sides of each mismatch.'},
            {"id": 'coding_audit_pv', "label": 'Coding and recoding audit', "summary": 'Terms coded or recoded, with the dictionary version used.', "guidance": 'Never assume a dictionary version. Show verbatim, coded term and version as the spec says.'},
        ],
        "example_spec": {
            "reportId": "PV_TEMPLATE_01",
            "description": "Lists serious cases for a product received in the reporting interval, with the days from receipt to submission.",
            "columnHeading": "1. Case Number\n2. Version\n3. Product\n4. Event Term\n5. Seriousness\n6. Receipt Date\n7. Submission Date\n8. Days To Submit",
            "logic": "Use the latest version of each case. Include cases where the serious flag is Yes and the receipt date is inside the reporting interval. Days to submit is the submission date minus the receipt date. Show cases with no submission date as not yet submitted.",
            "reportScenarios": "Scenario 1 - YES: serious and received in the interval. Scenario 2 - NO: non-serious. Scenario 3 - NO: received outside the interval.",
            "sorting": "Receipt Date, Case Number",
        },
    },
}


def get_module(module_id: str) -> Optional[ClinicalModule]:
    return MODULES.get(module_id)


def is_known(module_id: str) -> bool:
    return module_id in MODULES


def list_modules() -> list:
    """Public view of every module (without the long guidance text)."""
    out = []
    for m in MODULES.values():
        pub = {k: v for k, v in m.items() if k != "guidance"}
        pub["listing_types"] = [{k: v for k, v in t.items() if k != "guidance"} for t in m["listing_types"]]
        out.append(pub)
    return out


def get_listing_type(module_id: str, listing_type_id: str) -> Optional[ListingType]:
    module = MODULES.get(module_id)
    if module is None:
        return None
    return next((t for t in module["listing_types"] if t["id"] == listing_type_id), None)


def is_known_listing_type(module_id: str, listing_type_id: str) -> bool:
    """An empty listing type is always valid (it is optional)."""
    return not listing_type_id or get_listing_type(module_id, listing_type_id) is not None


def prompt_block(spec: dict) -> str:
    """Domain context appended to a beta generator's user prompt. Returns
    an empty string for an unknown or unset spec type, so callers can
    append it unconditionally."""
    module = MODULES.get((spec or {}).get("specType", ""))
    if module is None:
        return ""
    status_note = (
        "Verified against real specs."
        if module["status"] == "verified"
        else "This spec type has NOT been verified against a real, confirmed spec and code pair; "
        "treat your output as a draft for programmer review and say so in the explanation."
    )
    listing = get_listing_type(module["id"], (spec or {}).get("listingType", ""))
    listing_line = (
        f"LISTING TYPE: {listing['label']}. {listing['summary']}\n"
        f"Listing-specific guidance: {listing['guidance']}\n"
        if listing else ""
    )
    return (
        f"\n\nSPEC TYPE: {module['label']}\n"
        f"Domain context: {module['guidance']}\n"
        f"{listing_line}"
        f"{status_note}\n"
    )
