# Veeva CDB (Clinical Data Workbench) Reference for Spec2Code

Status: DRAFT summary for programmer review. Written from Veeva's public documentation pages listed under Sources. It is a summary in our own words, not a copy, and it can be out of date. Where this file and Veeva's current documentation disagree, Veeva's documentation wins. The CQL pages were labelled 26R2 General Release when read. The REST API pages were labelled v23.2 GA (with a v23.3 Beta label). A programmer should check anything critical against the current pages before relying on it.

Product naming: the help pages call the product Veeva DQS or CDB Workbench in different places. This file uses CDB and CQL as Spec2Code does.

## 1. What CQL is

CQL (Clinical Query Language) is a SQL-like language for querying clinical data in CDB. It understands clinical context (Study, Site, Subject, Event, Form, Item), so queries need less syntax than SQL. A query returns a table with ordered columns. A query has four parts: SELECT (projection, the fields returned), FROM (the forms the data comes from), WHERE (optional filter, the filter fields need not be returned) and ORDER BY (optional row order).

```
SELECT *
FROM F.Demographics, F.Inclusion_Criteria
```

Clinical context objects: Study (container), Site, Country (study country of the site), Subject, Event (a collection point, usually a visit), Header @HDR (the operational context above a form), Form, Data Item, and Properties (read through functions or dot notation).

## 2. Listings in CDB

- CDB creates one Core Listing automatically for each form, for EDC and third-party sources.
- A custom listing is made by editing the CQL of a listing in the CQL Editor (Actions menu, edit, Apply). Errors show in a banner above the query. Save the result as a custom listing to reuse or share it.
- Listing types: Core (one per form), Custom, System (study context only, available only in raw export packages), Report (Form Progress and Event Progress reports), Export (created when adding listings to an export definition) and Review (used to review incoming data and log known discrepancies).
- Core listings show only forms in Submitted status. To include forms that are In Progress after submit, filter on @Form.Status for both values.
- Limits in the user interface: 100 rows per page, up to 1,000 rows shown, a listing that takes longer than 90 seconds to load is not displayed, and up to 5 listings can be pinned in the Subject Details panel.
- CSV export is available from the listing menu. Filter values in the filter menu must be static values, not functions. Dates are written YYYY-MM-DD.
- Blinded (restricted) data is visible only to users with the Restricted Data Access permission.

## 3. Projection (SELECT)

- `*` returns all columns in layout order. A qualified wildcard such as `Creation_Criteria.*` works only for FORM and ITEMGROUP qualifiers.
- Named items: `SELECT Demographics.Item, Enrollment.Item2`. With several forms, qualify the item with the form.
- `DISTINCT` returns unique values. `AS` renames columns or forms, and the alias becomes the column title.
- `@HDR` returns header (operational context) data. `@HDR` alone returns defaults. `@HDR.Subject`, `@HDR.Site`, `@HDR.Study`, `@HDR.Event` return summaries. A single property is read with dot notation, for example `@HDR.Study.Phase` or `@HDR.Subject.Name`.
- `@Form.Status`, `@ItemGroup.SeqNbr` read form and item group properties.
- `@FormLink.<link>.<item>` reads an item on a linked form.
- `@PD` reads protocol deviation data. It cannot be joined to form data. Only `FROM @PD` is supported.
- `@QRY` and `@QRYMSG` read query and query message properties (for example ID, Status, Age, CreatedDate, OriginSystem, FormName, ItemName).
- `@OBS` and `@OBSMSG` read observation data. They combine only with each other.
- Result format: the default is WIDE (each item in its own column, per form or item group instance). `COMPACT` puts each item in one column across instances. COMPACT is not supported with ON SUBJECT.
- Default column order: form name, form sequence number (if repeating), item group, item group sequence number (if repeating), then items in layout order.

## 4. Selection (FROM) and joins

- FROM names forms only. The exception is `FROM @PD`.
- Forms are joined by default on Subject and Event. Forms in different events give one row per form.
- `ON SUBJECT` gives one row per subject. Event group and event header properties return NULL in this mode unless taken through a form alias.
- `ALIGN` and `UNALIGN` control repeating-sequence behaviour with ON SUBJECT. UNALIGN is the default.
- Advanced joins: LEFT JOIN, RIGHT JOIN and INNER JOIN. Outer joins are not supported. Reference data cannot be used in advanced joins. Join on ID values rather than names for speed.

```
select @Form.Subject.Name, @Form.Event.Name, AETERM, CMTRT
from AE as ae LEFT JOIN CM as cm
     ON ae.@Form.Subject.ID = cm.@Form.Subject.ID
where @Form.Status = 'submitted__v'
```

```
SELECT @HDR.Subject, creation_criteria.subject_initials, vitals.height
FROM demographics, vitals ON subject
```

## 5. Subqueries, UNION and UNPIVOT

- Subqueries: IN subquery, subquery joins (two subqueries joined with a comma, the second left-outer-joined to the first, implicitly on Event and Subject), subqueries inside functions including aggregates, and correlated subqueries in filters.
- UNION and UNION ALL return all rows. UNION DISTINCT removes exact duplicate rows. Column names come from the first SELECT and matching columns must have the same data type. The limit is 4000 UNION operations.
- UNPIVOT turns columns into column values. It cannot include @HDR values, and the unpivoted items cannot be used in WHERE, GROUP BY or ORDER BY. UNPIVOT is not supported inside a subquery or a UNION, and @Form or @ItemGroup properties cannot be referenced inside it. Cell highlighting is not shown for listings that use UNPIVOT.

```
SELECT * FROM Randomization
WHERE @HDR.Subject.ID IN (
    SELECT @HDR.Subject.ID FROM Demographics
    WHERE Creation_Criteria.Sex = 'Female'
)
```

## 6. Filter (WHERE), order, grouping

- Logical: AND, OR. Comparison: =, !=, >, <, >=, <=. Set and range: IN(), NOT IN(), BETWEEN ... AND .... Boolean: IS, IS NOT. Null: IS NULL, IS NOT NULL. Text: CONTAINS, DOES NOT CONTAIN.
- ORDER BY is not supported for data items inside repeating item groups. FIELD() can give a custom sort order: `ORDER BY FIELD(Route, 'Oral', 'Nasal', 'Topical')`.
- GROUP BY needs at least one aggregate in the projection. WHERE is not supported with aggregates, so use HAVING, which also needs an aggregate in the projection.
- Aggregates: AVG, COUNT, MAX, MIN, SUM, STDDEV_POP, STDDEV_SAMP, VAR_POP, VAR_SAMP. COUNT with no argument counts all columns.
- Comments start with two dashes and a space.

```
SELECT COUNT(@HDR.Subject.Name), @HDR.Site.Number
FROM EDC.demographics
GROUP BY @HDR.Site.Number
HAVING COUNT(@HDR.Subject.Name) > 100
```

## 7. Functions (selected, as documented)

Clinical functions take a data item: DESCRIPTION, DMR (data management reviewed), FROZEN, HELPTEXT, HINTLABEL, ILB (intentionally left blank), ILBREASON, LABEL (optionally localized), CODELABEL (label of the selected codelist value), LASTMODIFIEDDATE, LOCKED, SDV (source data verified), SIGNED, STATUS, UOM, UOMTRANSLATED, TRANSLATED (value converted to the default unit), FILL (fills NULL cells from a non-repeating item group, projection only), FormName, FormSeqNbr, ItemGroupName, ItemGroupSeqNbr, FormEvents(form, ...), Query(item, [filter]).

Lab functions: SpecimenType, TestingMethod, LOINCCode, AnalyteName, AnalyteSDTM (take LBTEST), LabLocTitle (LBLOC), OverrideReason (LBOVRDNRLO or LBOVRDNRHI), LabModifier (returns LT, LTE, GT or GTE when present).

Coding functions need Veeva Coder and give an error on forms not configured for it: CODEDTERM(item, 'level'), CODEDCODE(item, 'level'), CODEDDICTTYPE, CODEDDICTREL, CODEDSTATUS, CODEDBY, USERCODEDBY, LASTCODED.

Reference objects: KEYMATCH(form_name, reference_object_name).

Flow control: IF(expr, a, b), CASE WHEN ... THEN ... ELSE ... END, IFNULL(item, value).

String: CONCAT, CONCAT_WS, GROUP_CONCAT (ignores NULLs), COALESCE, LENGTH, TRIM, LTRIM, RTRIM, UPPER, LOWER, LEFT, RIGHT, MID, SUBSTR, REPLACE, and the REGEXP operator.

Date and time: DATE, ADDDATE, SUBDATE (with INTERVAL n unit: MICROSECOND, SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, QUARTER, YEAR and compound units), TIMESTAMPDIFF(unit, d1, d2), DATEDIFF(d1, d2) in days, DATE_FORMAT, STR_TO_DATE, CURDATE, NOW, YEAR, MONTH, WEEK, DAY, HOUR, MINUTE, SECOND, LAST_DAY, SiteNormalizedDate (UTC), RawDate (value as entered, string), SDTMDateFormat (ISO 8601 string, handles unknown parts).

Other: CAST(item AS type) with types such as CHAR, DATE, DATETIME, TIME, DECIMAL, SIGNED, UNSIGNED. The page also lists many standard SQL math, string and date functions; the list was cut off in the part read, so check the source for the full list.

## 8. Dates, unknown parts and ISO 8601

- Default behaviour: an unknown month becomes January, an unknown day becomes the 1st, and an unknown time becomes 00:00:00. This makes comparisons simple but it is an assumption, so any spec that cares about partial dates should say so.
- `RawDate()` returns the value as entered, with unknown parts shown as UN (day, month or time) or UNK (month). Examples from the source: `?-Oct-2020` becomes `UN-Oct-2020`, and `?-?-2020` becomes `UN-UNK-2020`.
- `SDTMDateFormat()` returns an ISO 8601 string and handles unknown parts by truncation.
- `Unknown(Date)` returns the unknown parts (M, D, H) or COMPLETE.
- `UnknownImpute(Item, 'day type', 'month type', 'time type')` imputes with a chosen rule. Day: FIRST DAY, LAST DAY, MID DAY (15th). Month: FIRST MONTH (1), LAST MONTH (12), MID MONTH (6). Time: FIRST HOUR (00:00), LAST HOUR (23:59), MID HOUR (12:00). All three arguments are required even if the field cannot be unknown in that part.

```
UnknownImpute(edc.ae_start_datetime, 'FIRST DAY', 'FIRST MONTH', 'FIRST HOUR')
```

Date format specifiers follow the MySQL style, for example %Y four-digit year, %m month 00-12, %d day 01-31, %H hour.

## 9. Nulls

Test with IS NULL and IS NOT NULL. Replace with IFNULL (one value) or COALESCE (first non-NULL). Event group and event header properties are NULL under ON SUBJECT. FormName and ItemName return NULL for event-date queries and observations. A query that compares a NULL gives no match, so say in the spec what should happen to records with a missing value.

## 10. Describe, Show and Call

- `DESCRIBE HEADER | FORM | ITEMGROUP | ITEM | REFERENCE` lists fields and data types, for example `DESCRIBE Form VITALS`.
- `SHOW STUDIES | EVENTGROUPS | EVENTS | FORMS | CODELIST <item> | VIEWS | Reference` lists objects.
- `CALL` runs system listings: Sys_Sites, Sys_Subjects, Sys_Events, Sys_Forms, Sys_ILB, Sys_Links, Sys_PD.

## 11. Known limits and traps (as documented)

- No outer joins. Reference data cannot be used in advanced joins.
- Protocol deviation data cannot be joined to form data. @OBS combines only with @OBSMSG.
- COMPACT is not supported with ON SUBJECT. ORDER BY is not supported for items in repeating item groups.
- WHERE cannot filter on aggregates; use HAVING. Item groups cannot be used inside functions.
- `@HDR.EventGroup` has no default summary, so request a property.
- Header attributes are indexed for these only: @HDR.Subject.ID, @HDR.Event.Name, @HDR.Site.Name, @HDR.Event.ID, @HDR.Subject.Name, @HDR.Site.Number. Filtering or joining on other header fields can be slow.
- Cell highlighting is not shown with DISTINCT or UNPIVOT.

Known errors in the source pages (noted so they are not copied into specs): the unknown-day imputation text says "first hour of the day", and one SDTM date example maps March 15 to 2020-03-14. Trust the impute options table and check dates against real output.

## 12. REST API (summary)

The REST API is for CDB license holders. It documents forms and query endpoints only. It has no documented endpoint to run CQL, fetch listings or datasets, or export data. Exports are described as user interface steps in Vault CDMS Help.

- Authentication, username and password: `POST https://{vault_subdomain}/api/{version}/auth` with form fields `username` and `password` (optional `vaultDNS`). The response has `responseStatus`, `sessionId`, `userId`, `vaultIds` and `vaultId`. Send the session ID in the `Authorization` header, either alone or as `Bearer {sessionId}`. Sessions time out after inactivity (the timeout varies by vault).
- Authentication, OAuth 2.0 / OpenID Connect: `POST https://login.veevavault.com/auth/oauth/session/{profile_id}` with `Authorization: Bearer {access_token}`. An authentication type discovery call tells you whether a user logs in with a password or SSO.
- CDB calls go to `https://{cdbDNS}/edcworkbench/api/{version}/...`, not to the vault host. Authenticate on the vault, then call CDB.
- `GET forms/data`: required query parameters `study_name`, `source` (use EDC for Vault EDC), `site_number`, `subject_name` (must include the site number) and `form_name`. Optional `size` (default 50) and `page` (default 1). It returns event, form, item group and item details, including `event_id`, `form_id`, `item_id`, `item_name`, `datatype` and `restricted`.
- Queries, up to 500 per request: `POST queries/item/open`, `POST queries/event/open`, `POST queries/answer`, `POST queries/close`. Messages are limited to 500 characters. Opening can address an item by IDs or by full hierarchy (study, source, site, subject, event group and sequence, event, form and sequence, item group and sequence, item). `manual` defaults to true and should be false for queries raised by an external system, with `origin_sys`, `origin_id` and `origin_name` set.
- Permissions: a study role with API Access, Workbench Tab Access and the specific action (Open Query, Answer Query, Close Query), All Sites access. The CDB API Read Write role grants them. Without API Access, login works but other calls fail with INSUFFICIENT_ACCESS.
- Responses carry `responseStatus` (SUCCESS, FAILURE for user error, EXCEPTION for system error) and an `errors` list with `type` and `message`. Base logic on `responseStatus` and the error `type`, not the HTTP status or message text.

## 13. Use in Spec2Code

- Generated CQL is a draft until a programmer has run it in CDB Workbench against study data. Nothing here lets Spec2Code run CQL by itself.
- Prefer ID-based joins and the indexed header attributes in section 11 when a listing joins several forms.
- When a spec says "submitted" or "locked", write it as a condition on @Form.Status or LOCKED() and check the real status values (for example submitted__v) in the study.
- For partial dates, state how unknown parts are treated (default imputation, UnknownImpute, or exclusion) rather than relying on the default.

## Sources

- Veeva Vault CDMS Help, Clinical Query Language (CQL) Reference: https://cdmshelp.veeva.com/gr/monitors/cdb/cql-reference/
- Veeva Vault CDMS Help, Using Listings: https://cdmshelp.veeva.com/gr/monitors/cdb/listings/
- Veeva CDB REST API documentation: https://developer-cdms.veevavault.com/cdb-api/23.3
