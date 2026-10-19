# REDCap Reference for Spec2Code

Status: DRAFT summary for programmer review. Written in our own words from public pages read on 2026-10-17 (listed under Sources). Several are university help pages and training slides, not the REDCap vendor manual, and REDCap versions differ by installation. Where this file and the installation's own Help pages disagree, the installation wins.

## 1. Data model and data dictionary
REDCap stores a project as fields grouped into forms (instruments). Projects can be classic or longitudinal (events). The data dictionary is a CSV with these columns in order: Variable / Field Name, Form Name, Section Header, Field Type, Field Label, Choices / Calculations / Slider Labels, Field Note, Text Validation Type or Show Slider Number, Text Validation Min, Text Validation Max, Identifier?, Branching Logic, Required Field?, Custom Alignment, Question Number (surveys only).
- Field types written in the Field Type column: text, notes, calc, dropdown, radio, checkbox, file (plus slider and descriptive, set through other columns).
- Text validation types include date, time, integer, number, zipcode, phone and email. Min and Max apply to number and integer validation.
- A calculated field (type calc) is read-only for entry. Its formula is in the Choices / Calculations column.

## 2. Logic syntax (branching logic, calculations, data quality rules, report filters)
- A field is written in square brackets by variable name, never label: `[age]`.
- In a longitudinal project an event is prefixed: `[baseline_arm_1][age_of_child] <= 17`.
- A checkbox option is referenced with its code in parentheses: `[country(3)] = '1'`. Referring to a checkbox like a radio field fails without an error.
- Operators: `=`, `<>` (not `!=`), `>`, `<`, `>=`, `<=`, `and`, `or` (not `&&`, `||`), `+ - * /`, parentheses for order. A power is `(number)^(exponent)` with the parentheses required.
- Text and coded values are usually quoted with single quotes: `[smoker] = '1'`. Test for empty with `''`: `[dob] = ''`.
- Branching logic must evaluate to true or false, is placed on the field to be shown or hidden, and works within a single project.

## 3. Special functions (syntax as published on the page read)
- `if(condition, value_if_true, value_if_false)`. The only conditional function; nest for more branches.
- `datediff([date1], [date2], "units", returnSignedValue)`. Units y, M, d, h, m, s. The result is absolute unless the signed flag is true. `'today'` and `'now'` are allowed. (Another page shows an extra date-format argument for calculations: `datediff([date1],[date2],"units","date_format",return_signed_value)`. Check the installation's own Help.)
- `age_at_date([dob], [other_date], returnDecimal)` returns an integer unless the decimal flag is set.
- `dayoftheweek([date])` returns 1 (Monday) to 7 (Sunday). `year()`, `month()`, `day()` return parts of a date.
- Missing data code tests: `isblankormissingcode()`, `isblanknotmissingcode()`, `ismissingcode()`, `hasmissingcode(value, 'NASK,NI,UNK')`. Codes are defined in Project Setup.
- Number: `round`, `roundup`, `rounddown`, `sqrt`, `abs`, `exponential`, `min`, `max`, `mean`, `median`, `mod`, `sum`, `stdev`, `log`, `isnumber`, `isinteger`. Blank values are ignored by min, max, mean, median, sum and stdev.
- Text: `contains`, `not_contain`, `starts_with`, `ends_with` (case-insensitive; they do not work in calculated fields but do work in Data Quality rules, report filters and Survey Queue), `left`, `right`, `mid`, `length`, `find`, `replace_text`, `concat`, `concat_ws`, `upper`, `lower`, `trim`.
- Functions use a field's value, never its label; the `:label` option cannot be used inside them.
- Text functions should not be used on MDY or DMY dates in branching logic or calculations. They work on YMD dates there, and on any date format in Data Quality rules and report filters.

## 4. Calculated fields: variants and the recalculation trap
- Three variants share the same expression language: the calc field type (numeric), `@CALCDATE` (date) and `@CALCTEXT` (text).
- A calculation is re-evaluated only when someone opens that form for that record in a browser. It is not recalculated in the background. A new calculated field on existing records can be blank or stale; an edited formula updates only records opened afterwards.
- Data Quality rule H, "Incorrect values for calculated fields", flags stored values that differ from the current formula. Its Fix calcs now option recalculates the project.
- If a referenced field is empty the calculation returns blank, not an error. Using `'today'` or `'now'` in a stored calculation makes the value depend on when the form was last saved.
- Action tags such as `@HIDDEN` and `@DEFAULT` interact with branching logic. `@HIDDEN` hides a field whatever the logic says; `@DEFAULT` pre-fills only if the field starts shown.

## 5. Data quality rules and reports
- Data Quality rules are logic expressions that return the records that break a check. Built-in rules include rule H above.
- The Report Builder takes filters and can switch to advanced logic using the same syntax.
- Missing Data Codes set in the project change how blank-handling functions behave.

## 6. What this means for listing code (suggestions, not verified against a live REDCap)
- Listing logic for REDCap is naturally written as a logic expression that selects records, using `[variable]` references, `datediff`, `if` and the missing-code functions.
- Date comparisons depend on the date format of each field (YMD, MDY, DMY). State the format when comparing or using text functions.
- Where a listing needs a derived value across forms, a calculated field exists only after its form is opened, so a listing that relies on one needs a Rule H check first.
- Checkbox fields need the `(code)` form in every reference.

## 7. Not covered
Export formats and the API are not described here. Smart variables (for example for events and repeating instances) were not documented in the pages read, so do not assume their syntax.

## Sources
- Special Functions page, University of Iowa REDCap: https://redcap.icts.uiowa.edu/redcap/redcap_v16.1.5/DataEntry/special_functions_explanation.php
- REDCap Logic Syntax training slides (ITHS): https://www.iths.org/wp-content/uploads/202-Logic-Syntax.pdf
- REDCap data dictionary guide, UC Davis: https://health.ucdavis.edu/data/includes/documents/REDCap/redcap_data_dictionary-190719-1.pdf
- Calculated fields syntax, limits and the recalculation trap (CASRAI): https://www.casrai.org/guides/redcap-calculated-fields-syntax-limits-and-the-recalculation-trap
