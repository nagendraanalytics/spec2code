# Oracle Clinical One Reference for Spec2Code

Status: DRAFT summary for programmer review. Written in our own words from one Oracle documentation page read on 2026-10-17 (see Sources). It covers custom rules only. Clinical One reporting, extracts and data structures were not read; they are listed under "Not covered". Where this file and Oracle's current documentation disagree, Oracle wins.

## 1. Custom rules
- A custom rule is a JavaScript expression evaluated against study data. It is attached to a question on a form in the Rule editor.
- The rule's behaviour comes from the Action chosen, not from a rule category.

## 2. Actions
- **Create Query**: raises a query each time the expression returns false. A query message is entered for users.
- **Create Assigned Query**: same trigger; the query is assigned to one or more study roles (only roles created in the study are listed, not template roles).
- **Calculate Value**: writes the result into a read-only item. Needs a Target Type (Text or Number) and a Format.
- **Send Notification**: sends an email. Needs a subject, addresses separated by semicolons, and a message.

## 3. Authoring
- Fields: Rule Name (unique within a study), Description (optional), and "Do not block users" (lets site users edit and save while the rule runs).
- **Variables** are declared in the editor by name, then pointed at a visit, a form and an item. Choosing -All Visits- reads the form in the visit where the rule runs. Choosing a specific visit reads that visit for every visit where the rule executes.
- The **Expression** is JavaScript. Helper functions named on the page: `logMsg()` (debug logging) and `isDateInRange()` (date range checks). The page points to a separate Rules Developer Guide for the rest.
- Examples as published:
  - Compare two values (query raised when false): `if(bpdia > bpsys) return false; return true;`
  - Calculate BMI: returns 0 if weight or height is 0, otherwise `weight / (height * height)`.
  - Consent within range: `return isDateInRange(dateInformedConsent, dateFrom, dateEnd, "both");`
- A rule runs against every visit in the study that contains the form.

## 4. Lifecycle
- The editor flags syntax errors. A rule needs a valid expression and at least one action before it can move to UAT and Approved.
- Rules run in the Testing container during development and in Production after publishing.
- Test by entering values on the question and saving, over all scenarios. Then set the rule status from UAT to Approved. Use **Publish All Approved Rules** to send them to Production; the study must be in the Approved container.
- Saving an edit puts a rule back to Draft. The Production version is not changed until the rule is published again.

## 5. What this means for listing code (suggestions, not verified against a live system)
- A rule's expression returns true or false, so a listing check ("show when ...") maps to a rule where the query is raised on false. Invert the condition accordingly.
- Rules read values by variables bound to a visit, form and item. A cross-form check needs one variable for each form involved.
- A check that must hold for each visit has to say whether it reads the current visit or a fixed one.

## 6. Not covered
Reports, analytics, data extracts and exports, the Rules Developer Guide function list, and the data structure were not read. Do not infer them from this file.

## Sources
- Oracle Clinical One custom rules page (quick start for rules): https://docs.oracle.com/en/industries/life-sciences/clinical-one/quick-start-rules/index_text.html
