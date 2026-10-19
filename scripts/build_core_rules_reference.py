"""Builds one CSV from the published CDISC CORE conformance rules (github.com/cdisc-org/cdisc-open-rules, MIT).

Usage:  git clone --depth 1 https://github.com/cdisc-org/cdisc-open-rules
        python scripts/build_core_rules_reference.py ./cdisc-open-rules  out_dir

One row per published rule: CORE id, standard and version, the rule ids the standard uses (CG0001, SD0001 ...),
the plain-language description, the message a failure gives, whether the engine can execute it, and the cited
guidance. The CSV is meant to be uploaded to the Knowledge library (scope: global, type: standard) as reference
text. It is not the executable rule logic. Attribution: CDISC, MIT licence (a notice file is written with it).
"""
import csv
import glob
import os
import sys

import yaml

COLS = ["core_id", "standard", "standard_version", "rule_ids", "description", "failure_message", "executability", "cited_guidance", "cited_document"]


def rows(repo: str):
    for path in sorted(glob.glob(os.path.join(repo, "Published", "*", "rule.yml"))):
        try:
            d = yaml.safe_load(open(path, encoding="utf-8")) or {}
        except yaml.YAMLError:
            continue
        stds, vers, ids, guide, docs = [], [], [], [], []
        for a in d.get("Authorities") or []:
            for s in a.get("Standards") or []:
                if s.get("Name") and s["Name"] not in stds:
                    stds.append(str(s["Name"]))
                if s.get("Version") and str(s["Version"]) not in vers:
                    vers.append(str(s["Version"]))
                for ref in s.get("References") or []:
                    rid = (ref.get("Rule Identifier") or {}).get("Id")
                    if rid and str(rid) not in ids:
                        ids.append(str(rid))
                    for c in ref.get("Citations") or []:
                        if c.get("Cited Guidance") and c["Cited Guidance"] not in guide:
                            guide.append(str(c["Cited Guidance"]))
                        if c.get("Document") and c["Document"] not in docs:
                            docs.append(str(c["Document"]))
        yield [(d.get("Core") or {}).get("Id", os.path.basename(os.path.dirname(path))), "; ".join(stds), "; ".join(vers), "; ".join(ids),
               str(d.get("Description", "")).strip(), str((d.get("Outcome") or {}).get("Message", "")).strip(),
               str(d.get("Executability", "")), " | ".join(guide)[:600], "; ".join(docs)]


def main(repo: str, out: str):
    os.makedirs(out, exist_ok=True)
    n = 0
    with open(os.path.join(out, "cdisc_core_published_rules_reference.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(COLS)
        for r in rows(repo):
            w.writerow(r)
            n += 1
    open(os.path.join(out, "NOTICE.txt"), "w").write(
        "cdisc_core_published_rules_reference.csv is derived from the published rules in\n"
        "https://github.com/cdisc-org/cdisc-open-rules (CDISC, MIT License, Copyright (c) cdisc).\n"
        "Only descriptions, messages and citations are extracted. Rule logic is not included.\n"
        "Reference text for review and code generation; it is not a validation of any data or code.\n")
    print(f"{n} rules written to {out}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
