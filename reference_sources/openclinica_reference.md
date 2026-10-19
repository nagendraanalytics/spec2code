# OpenClinica Reference for Spec2Code

Status: DRAFT, and thin. The OpenClinica documentation pages returned only their navigation menus and summary lines when read on 2026-10-17, not their article bodies. This file therefore records only what those menus and summaries state. It has no syntax. A programmer should read the linked pages and extend this file before it is relied on. Several pages are labelled as OpenClinica 3.1 documentation.

## 1. What the pages state
- Simple single-field checks can be put in the CRF template or written as a rule. "More complex edit checks that compare values across fields, across forms, or across Events can only be addressed by writing a Rule."
- Rules are written in XML and uploaded into OpenClinica. The Rule Designer is an XML code generator that can create rules.
- A rules file is organised around a Rule Assignment and Rule Definition, an Expression element (evaluates to a result, for example true or false depending on the value of an item OID), a Target element, and Action types. The documentation also has pages for testing expressions and an OID overview.
- Rule expression pages cover: equal or not equal, greater than or equal, less than or equal, arithmetic operators, and the contains operator. Rule action models include ShowAction and InsertAction. There is a functions section linked to a validated functions index.
- Data extracts (OpenClinica 4 documentation): a dataset defines which events, forms, items and attributes to include. The menu lists these dataset file formats: tab-delimited text, HTML, Excel, SPSS, Data Mart, CDISC ODM and SAS. A variable naming convention is described for the tab-delimited format.

## 2. Not verified
Item OID path format, function names, operator syntax, XML examples, action behaviour, dataset contents and variable naming rules were not readable. Do not generate OpenClinica rules from this file alone.

## Sources
- Creating rules: https://docs.openclinica.com/3.1/rules/creating-rules
- Rule expressions (OpenClinica 3.1): https://docs.openclinica.com/3-1/rules/rules-examples-rule-expressions
- Expression element: https://docs.openclinica.com/3-1/rules/rules-creating-rules/rules-creating-rules-expression-element/
- Rule Designer: https://docs.openclinica.com/3-1/rules/rules-using-rule-designer/rules-using-rule-designer-building-rules-rule-designer/
- Extract data (OpenClinica 4): https://docs.openclinica.com/oc4/getting-data-for-your-study-reports-and-extracts/oc4-extract-data/?r=9656
