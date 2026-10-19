"""Renders the listing definitions to markdown files plus manifest.json.

  python listing_library/build.py                       write files, no grounding
  python listing_library/build.py --db PATH --tenant T  also check each therapeutic-area `basis` pair against the
                                                       chunks of the imported guides, and drop pairs that are not found

Only a basis pair that is found in the stored text is written. Nothing is claimed that was not checked.
"""
import argparse
import json
import os
import re
import sqlite3
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import content_complex  # noqa: E402
import content_global  # noqa: E402
import content_ta  # noqa: E402
import content_types  # noqa: E402

BANNER = ("AI-generated draft. These listings were written from general knowledge of clinical data review practice, CDASH and SDTM, not from a "
          "specific study or company, and no CDM programmer has verified them. Values in [brackets] come from the protocol. Form and item "
          "names are generic and must be mapped to the study metadata. Treat them as starting points, not as approved specifications.")


def check_basis(db_path, tenant, pairs):
    """Returns [(title, term)] that were found, using the chunks of the source with that title."""
    if not db_path:
        return []
    con = sqlite3.connect(db_path)
    found = []
    for title, term in pairs:
        row = con.execute("select id from knowledge_sources where tenant_id=? and title=?", (tenant, title)).fetchone()
        if not row:
            continue
        n = con.execute("select count(*) from knowledge_chunks where source_id=? and lower(text) like ?", (row[0], f"%{term.lower()}%")).fetchone()[0]
        if n:
            found.append((title, term, n))
    con.close()
    return found


def render(doc, db_path="", tenant=""):
    scope = "Global (all therapeutic areas)" if doc["scope"] == "global" else f"Therapeutic area: {doc['ref']}"
    out = [f"# {doc['title']}", "", f"Scope: {scope}. EDC systems: all (listing logic is system-neutral).", "", BANNER, "", doc["intro"], ""]
    grounded = 0
    for l in doc["listings"]:
        out += [f"## {l['id']}: {l['title']}", "", f"Report ID: {l['id']}", f"Description: {l['desc']}", "",
                "Columns: " + "; ".join(f"{i}. {c}" for i, c in enumerate(l["cols"], 1)), "", "Logic:", l["logic"], "",
                f"Displays when: {l['yes']}", f"Does not display when: {l['no'] or 'not applicable'}", f"Sorting: {l['sort']}"]
        if l["notes"]:
            out.append(f"Notes: {l['notes']}")
        if l["basis"]:
            found = check_basis(db_path, tenant, l["basis"])
            if found:
                grounded += 1
                out.append("Related topic found in the imported guides: " + "; ".join(f"{t} ({term})" for t, term, _ in found) + ".")
        out.append("")
    return "\n".join(out), grounded


def spec_rows(docs):
    """The listings as specs in the Spec library / Batch import format (one per listing). The title leads the description
    because the spec format has no title field. Placeholders in [brackets] are listed so they can be filled before a run."""
    rows = []
    for d in docs:
        for l in d["listings"]:
            ph = sorted(set(re.findall(r"\[[^\]]{1,60}\]", l["logic"])))
            rows.append({"reportId": l["id"], "description": f"{l['title']}. {l['desc']}",
                         "columnHeading": "\n".join(f"{i}. {c}" for i, c in enumerate(l["cols"], 1)),
                         "logic": l["logic"],
                         "reportScenarios": f"Scenario 1 - YES: {l['yes']}\nScenario 2 - NO: {l['no']}",
                         "sorting": l["sort"],
                         "_document": d["title"], "_placeholders": ph, "_notes": l.get("notes", "")})
    return rows


def write_specs(docs, outdir):
    rows = spec_rows(docs)
    core = [{k: v for k, v in r.items() if not k.startswith("_")} for r in rows]
    json.dump(core, open(os.path.join(outdir, "listing_specs.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    try:
        import openpyxl
        from openpyxl.styles import Alignment
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Specs"
        ws.append(["Report ID", "Description", "Column Heading", "Logic", "Report Scenarios", "Sorting", "Document", "Placeholders to fill", "Notes"])
        for r in rows:
            ws.append([r["reportId"], r["description"], r["columnHeading"], r["logic"], r["reportScenarios"], r["sorting"], r["_document"],
                       ", ".join(r["_placeholders"]), r["_notes"]])
        for col, w in zip("ABCDEFGHI", (14, 50, 36, 70, 50, 24, 36, 30, 40)):
            ws.column_dimensions[col].width = w
        for row in ws.iter_rows(min_row=2):
            for c in row:
                c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.freeze_panes = "A2"
        wb.save(os.path.join(outdir, "listing_specs.xlsx"))
    except ImportError:
        pass
    return len(rows), sum(1 for r in rows if r["_placeholders"])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", default="")
    ap.add_argument("--tenant", default="default")
    a = ap.parse_args()
    docs = content_global.DOCS + content_complex.DOCS + content_types.DOCS + content_ta.DOCS
    outdir = os.path.join(HERE, "docs")
    os.makedirs(outdir, exist_ok=True)
    manifest, total, ta_total, ta_grounded = [], 0, 0, 0
    for d in docs:
        text, g = render(d, a.db, a.tenant)
        fn = f"listings_{d['scope']}_{d['key']}.md"
        open(os.path.join(outdir, fn), "w", encoding="utf-8").write(text)
        manifest.append({"file": fn, "title": f"Listing library: {d['title']} (AI draft)", "scope": d["scope"], "scopeRef": d["ref"],
                         "docType": "listing_standard", "listings": len(d["listings"]),
                         "ids": [l["id"] for l in d["listings"]]})
        total += len(d["listings"])
        if d["scope"] == "ta":
            ta_total += len(d["listings"])
            ta_grounded += g
    json.dump(manifest, open(os.path.join(HERE, "manifest.json"), "w", encoding="utf-8"), indent=1)
    n_specs, n_ph = write_specs(docs, HERE)
    print(f"Specs for the Spec library: {n_specs} written to listing_specs.json and listing_specs.xlsx ({n_ph} have [placeholders] to fill).")
    print(f"{len(docs)} documents, {total} listings. Therapeutic-area listings with a checked related topic: {ta_grounded} of {ta_total}.")


if __name__ == "__main__":
    main()
