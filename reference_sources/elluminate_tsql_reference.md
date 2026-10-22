# Elluminate T-SQL Objects Reference for Spec2Code

Status: DRAFT, and thin on Elluminate itself. Section 1 is general SQL Server T-SQL knowledge written by the generator's authors, not taken from Elluminate documentation. Section 2 lists what is NOT known. A programmer with Elluminate access must fill Section 2 and check Section 1 before this is approved.

## 1. T-SQL facts the generator relies on (SQL Server 2017 and earlier features)
- Identifiers use [brackets]. There is no LIMIT (use TOP or OFFSET/FETCH), no || operator and no boolean type.
- CONCAT and CONCAT_WS treat NULL as empty; the + operator returns NULL if any operand is NULL. STRING_AGG(x, ', ') WITHIN GROUP (ORDER BY ...) joins values.
- A view cannot take parameters and cannot contain ORDER BY unless it also has TOP or OFFSET; an inline table-valued function is one SELECT and can take parameters; a stored procedure can sort and take parameters.
- CREATE OR ALTER works for views, functions and procedures from SQL Server 2016 SP1.
- Dates: ISO partial dates ('2024', '2024-05') do not convert reliably; test LEN(col) >= 10 before TRY_CONVERT(date, LEFT(col, 10)). DATEDIFF(day, a, b) counts day boundaries.
- NOT IN returns no rows if the list contains NULL. Integer division truncates.

## 2. NOT KNOWN (fill in before approving)
- The schema names and table or view names Elluminate exposes for SDTM-style (SRDM, SDTM) and raw data.
- Whether listings are deployed as views, functions, stored procedures or another object, and the naming rule for them (prefix, schema).
- Required parameters (study, site, cut-off date), required audit or permission statements, and any object header comment standard.
- The SQL Server version in use (this generator avoids anything newer than 2017).
- How deleted records and erroneous visits are flagged in Elluminate data.

## Sources
- General T-SQL behaviour: Microsoft SQL Server documentation (not fetched for this file).
