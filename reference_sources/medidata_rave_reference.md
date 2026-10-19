# Medidata Rave Reference for Spec2Code

Status: DRAFT, and thin. Medidata's study-build and custom-function documentation is not public: the Medidata training pages found were course outlines or the marketing home page and said nothing about edit checks, derivations or custom functions. This file holds only what third-party client documentation and a SAS page state about reading Rave data, read on 2026-10-17. It has no Rave edit-check syntax. Do not generate Rave edit checks or custom functions from it. A programmer with Rave documentation access should extend it.

## 1. Reading data through Rave Web Services (RWS)
From the documentation of two open-source RWS client libraries (rwslib and medidatarwsnetstandard):
- `ClinicalStudiesRequest` returns the EDC studies the signed-in user is associated with.
- `StudySubjectsRequest` returns a study's subjects without clinical data. Options: `status` (adds subject workflow status), `include` (`inactive`, `deleted` or `inactiveAndDeleted`), `subjectKeyType` (`SubjectName` or `SubjectUUID`) and `links`.
- Clinical View datasets are requested at three levels: `StudyDatasetRequest` (a study and environment), `SubjectDatasetRequest` (one subject) and `VersionDatasetRequest` (one study version across subjects). Each takes a `dataset_type` of `regular` or `raw` and can filter by form. The responses described are CDISC ODM (version 1.3 in the examples).

## 2. Raw and regular columns (SAS Clinical Data Integration page)
- Retrieved Rave data has `_RAW` columns beside the regular ones. Each regular column has the same name without the suffix.
- If a value fails validation or transformation, the regular column is left empty and the `_RAW` column keeps the source value. Compare the two to find values that did not convert.
- The SAS transformations described: one that replaces all data in the tables with the current study data, and one that updates only data changed since the last retrieval (a full load if the table was never populated).

## 3. What this means for listing code (suggestions, not verified)
- A listing on Rave data should say whether it reads regular or raw values. A date or number that failed conversion is empty in the regular column and present in the raw one.
- Subject lists should say whether inactive and deleted subjects are included.

## 4. Not covered
Edit checks, derivations, custom functions, dynamics, matrices, folder and form structure, Architect loader formats, Rave reports and Clinical View column layouts.

## Sources
- RWS core resources (medidatarwsnetstandard): https://medidatarwsnetstandard.readthedocs.io/en/latest/core_resources.html
- rwslib repository: https://github.com/mdsol/rwslib
- Retrieving Medidata Rave study data (SAS): https://support.sas.com/documentation/cdl/en/clindiug/66867/HTML/default/p1me2kcj7sz5ckn13vl429a9zjuc.htm
