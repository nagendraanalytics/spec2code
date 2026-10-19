"""cdisc_files.py -- what the usual CDISC publication file names mean, so a folder of them loads with the right
scope, therapeutic area, type and version without anyone typing it per file.

Each rule: (regex on the file name, title, scope, scope_ref, standard_version). First match wins. Therapeutic area
names are broad on purpose (Oncology, Diabetes, Infectious Disease ...) because a run only uses TA knowledge when its
study's TA equals the scope name (case-insensitive). The specific condition stays in the title. Edit the manifest
CSV the importer writes if your studies name their areas differently.
A file matching no rule is loaded at global scope as "other" and flagged, never guessed.
"""
import re

G = ("global", "")


def ta(name):
    return ("ta", name)


RULES = [
    # foundational standards and guides (global)
    (r"SDTMIG[ _]?v?3\.4", "SDTM Implementation Guide v3.4", *G, "SDTMIG 3.4"),
    (r"SDTMIG[ _]?v?3\.3", "SDTM Implementation Guide v3.3", *G, "SDTMIG 3.3"),
    (r"SDTMIG[ _]?v?3\.2", "SDTM Implementation Guide v3.2", *G, "SDTMIG 3.2"),
    (r"SDTM-MSG", "SDTM Metadata Submission Guidelines v2.0", *G, "SDTM-MSG 2.0"),
    (r"ADaM-MSG", "ADaM Metadata Submission Guidelines v1.0", *G, "ADaM-MSG 1.0"),
    (r"ADaMIG[ _]?v?1\.3", "ADaM Implementation Guide v1.3", *G, "ADaMIG 1.3"),
    (r"ADaMIG[ _]?v?1\.2", "ADaM Implementation Guide v1.2", *G, "ADaMIG 1.2"),
    (r"CDASH[ _]Model[ _]v?1\.3", "CDASH Model v1.3", *G, "CDASH Model 1.3"),
    (r"CDASH_SAE", "CDASH SAE Supplement v2.0", *G, "CDASH SAE Supplement 2.0"),
    # therapeutic area guides -> (title, TA)
    (r"taug-diabetes-adam", "TAUG Diabetes: ADaM Supplement v1.0", *ta("Diabetes"), "TAUG-Diabetes ADaM Supplement 1.0"),
    (r"taug-diabetes", "TAUG Diabetes v1.0", *ta("Diabetes"), "TAUG-Diabetes 1.0"),
    (r"T1D.*Screening", "TAUG Type 1 Diabetes: Screening, Staging and Monitoring v1.0", *ta("Diabetes"), "TAUG-T1D Screening 1.0"),
    (r"T1D.*Pediatrics", "TAUG Type 1 Diabetes: Pediatrics and Devices v2.0", *ta("Diabetes"), "TAUG-T1D Pediatrics and Devices 2.0"),
    (r"T1D.*Exercise", "TAUG Type 1 Diabetes: Exercise and Nutrition v1.0", *ta("Diabetes"), "TAUG-T1D Exercise and Nutrition 1.0"),
    (r"Prostate", "TAUG Prostate Cancer v1.0", *ta("Oncology"), "TAUG-Prostate Cancer 1.0"),
    (r"LuCa|Lung", "TAUG Lung Cancer v1.0", *ta("Oncology"), "TAUG-Lung Cancer 1.0"),
    (r"Pancreatic", "TAUG Pancreatic Cancer v1.0", *ta("Oncology"), "TAUG-Pancreatic Cancer 1.0"),
    (r"Colorectal", "TAUG Colorectal Cancer v1.0", *ta("Oncology"), "TAUG-Colorectal Cancer 1.0"),
    (r"COVID", "TAUG COVID-19 v2.0", *ta("Infectious Disease"), "TAUG-COVID-19 2.0"),
    (r"CDAD", "TAUG Clostridium Difficile Associated Diarrhea v1.0", *ta("Infectious Disease"), "TAUG-CDAD 1.0"),
    (r"EVD", "TAUG Ebola Virus Disease v1.0", *ta("Infectious Disease"), "TAUG-EVD 1.0"),
    (r"HIV", "TAUG HIV v1.0", *ta("Infectious Disease"), "TAUG-HIV 1.0"),
    (r"Influenza", "TAUG Influenza v1.1", *ta("Infectious Disease"), "TAUG-Influenza 1.1"),
    (r"Malaria", "TAUG Uncomplicated Malaria v1.0", *ta("Infectious Disease"), "TAUG-Malaria 1.0"),
    (r"Virology", "TAUG Virology v2.1", *ta("Infectious Disease"), "TAUG-Virology 2.1"),
    (r"Psoriasis", "TAUG Psoriasis v1.0", *ta("Dermatology"), "TAUG-Psoriasis 1.0"),
    (r"TAUG_HF|HF_v", "TAUG Heart Failure v1.0", *ta("Cardiovascular"), "TAUG-Heart Failure 1.0"),
    (r"taug-cv", "TAUG Cardiovascular Studies v1.0", *ta("Cardiovascular"), "TAUG-Cardiovascular 1.0"),
    (r"taug-qt", "TAUG QT Studies v1.0", *ta("Cardiovascular"), "TAUG-QT 1.0"),
    (r"TCM.?CAD|Angina", "TAUG Traditional Chinese Medicine for Coronary Artery Disease, Angina v1.0", *ta("Cardiovascular"), "TAUG-TCM CAD Angina 1.0"),
    (r"Acupuncture", "TAUG Traditional Chinese Medicine, Acupuncture v1.0", *ta("Traditional Chinese Medicine"), "TAUG-TCM Acupuncture 1.0"),
    (r"Pediatrics-User|Pediatric", "Data Standards User Guide for Pediatrics v1.0", *ta("Pediatrics"), "Pediatrics User Guide 1.0"),
    (r"Rare", "TAUG Rare Diseases v1.0", *ta("Rare Diseases"), "TAUG-Rare Diseases 1.0"),
    (r"DMD", "TAUG Duchenne Muscular Dystrophy v1.0", *ta("Neurology"), "TAUG-DMD 1.0"),
    (r"Alzheimer", "TAUG Alzheimer's Disease and Mild Cognitive Impairment v2.0.1", *ta("Neurology"), "TAUG-Alzheimer's 2.0.1"),
    (r"tbi", "TAUG Traumatic Brain Injury v1.0", *ta("Neurology"), "TAUG-TBI 1.0"),
    (r"multiplesclerosis", "TAUG Multiple Sclerosis v1.0", *ta("Neurology"), "TAUG-Multiple Sclerosis 1.0"),
    (r"Pain", "TAUG Pain v1.1", *ta("Pain"), "TAUG-Pain 1.1"),
    (r"KT_|Kidney", "TAUG Kidney Transplant v1.0", *ta("Nephrology"), "TAUG-Kidney Transplant 1.0"),
    (r"AKI", "TAUG Acute Kidney Injury v1.0", *ta("Nephrology"), "TAUG-AKI 1.0"),
    (r"Nutrition_v", "TAUG Nutritional Research v1.0", *ta("Nutrition"), "TAUG-Nutrition 1.0"),
    (r"Schizophrenia", "TAUG Schizophrenia v1.1", *ta("Psychiatry"), "TAUG-Schizophrenia 1.1"),
    (r"Crohn", "TAUG Crohn's Disease v1.0", *ta("Gastroenterology"), "TAUG-Crohn's 1.0"),
    (r"asthma", "TAUG Asthma v1.0", *ta("Respiratory"), "TAUG-Asthma 1.0"),
]
_COMPILED = [(re.compile(p, re.I), t, s, r, v) for p, t, s, r, v in RULES]


def identify(filename: str):
    """(title, scope, scope_ref, standard_version) or None."""
    for rx, title, scope, ref, ver in _COMPILED:
        if rx.search(filename):
            return title, scope, ref, ver
    return None
