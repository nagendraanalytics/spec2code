# Medrio Reference for Spec2Code

Status: DRAFT, and thin. Written from one university-hosted Medrio feature page read on 2026-10-17 (see Sources), which restates marketing-level features. It has no query or check syntax. A programmer with Medrio documentation access should extend it.

## 1. Features described
- Forms are built with drag-and-drop tools and templates. The data structure is relational at record, form and visit level and allows repeated records within a form (for example medication lists) and repeated forms and visits.
- Edit checks are "data exception flags" built with drag-and-drop. They can check completion and hard (the value must be) or soft (the value should be) ranges, can send email, and let coordinators correct a value or document the reason for an exception and route queries to named people.
- Reports: ad hoc reports (online or scheduled by email), operational reports including Missing Forms and Scheduled Visits (overdue, open-window and upcoming), custom data listings of selected variables, and on-demand reports under Data Management, Query Metrics, Study Documentation, Study Summary and Data Analysis (including the data dictionary, query aging report and data audit log).
- Data: long-form datasets (one record per data point) with metadata, relational data tables, and an Excel data dictionary that holds coded values, visit schedules and query definitions.
- Export formats: SAS, SPSS, STATA, CSV, CDISC ODM, an API, Excel templates and blank CRF PDFs.
- The page did not describe derived fields.

## 2. What this means for listing code (suggestions, not verified)
- Listings in Medrio are selected variables plus filters (custom data listings) or built-in operational reports, so a listing spec should name the report it maps to or say that it needs a dataset export processed outside Medrio.
- Cross-form logic and date arithmetic are not documented here. Plan for them to happen on exported long-form or relational data.

## Sources
- Medrio features page hosted by UCSF: https://medrio.ucsf.edu/document/features
