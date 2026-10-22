"""
cot_generation.py -- chain-of-thought generation shared by the SQL, SAS and R beta tiers.

Why: a one-shot "write the code" call silently dropped spec logic (columns left NULL
although the spec gave logic, a whole flag Case, a duration condition). This module makes
the model
  1. read the spec into an explicit INVENTORY of every output column, filter, Case,
     scenario and sort rule (verbatim quotes),
  2. reason through each item before writing code,
  3. write the code, and mark each item with VERBATIM EVIDENCE copied from that code,
and then CHECKS the result deterministically (column present, every "Case N" listed,
evidence really in the code, logic-bearing columns not left NULL). If hard gaps remain it
makes ONE repair call that lists exactly what is missing.

Nothing here makes the output verified: it is still an unverified draft for programmer review.
"""

import os
import re
from typing import Callable, Optional

import anthropic

MODEL = "claude-sonnet-5"
MAX_TOKENS = 16000
# Default: ONE model call per listing (cost). Reruns and the independent audit are opt-in.
MAX_PASSES = max(1, int(os.environ.get("SPEC2CODE_COT_MAX_PASSES", "1")))  # generation + repairs, hard cap
AUDIT = os.environ.get("SPEC2CODE_COT_AUDIT", "0") in ("1", "true", "yes")

AUDIT_SYSTEM = """You are an independent reviewer of generated code against a clinical report specification. \
You did not write the code. Break the spec into its smallest testable requirements and check each one against \
the code, strictly and literally.

Rules:
- One requirement per output column, per filter, per sort rule, and per ATOMIC condition. A condition like \
"A AND B AND (C OR D)" is four requirements; a Case with several parts is several requirements. Every "Case N", \
"Scenario N" and "Logic N" must be covered.
- A requirement is PRESENT only if the code really implements it, and `code_evidence` is a fragment copied \
CHARACTER FOR CHARACTER from the code. A column that is NULL while the spec gives logic for it is NOT present. \
A column whose spec says "no source or logic given" is present when it appears in the SELECT with that exact name.
- Do not excuse a missing part because it is hard. If it is missing, present=false and say what is missing.
- Do not invent requirements the spec does not state."""

AUDIT_TOOL = {
    "name": "audit_coverage",
    "description": "Report, requirement by requirement, whether the code implements the spec.",
    "input_schema": {
        "type": "object",
        "properties": {
            "requirements": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "spec_text": {"type": "string", "description": "The requirement in the spec's own words"},
                        "present": {"type": "boolean"},
                        "code_evidence": {"type": "string", "description": "Verbatim code fragment; required when present"},
                        "problem": {"type": "string", "description": "What is missing or wrong when not present"},
                    },
                    "required": ["id", "spec_text", "present"],
                },
            }
        },
        "required": ["requirements"],
    },
}

COT_PROCEDURE = """
METHOD -- work in this order and do not skip a step. Your reasoning is returned in the \
tool fields, so write it there, before the code.

BE CONCISE: every token costs money. In `inventory` give `spec_text` as the item's name and at most the \
first 12 words of its spec text (not the whole paragraph); in `reasoning_steps` use one short line per item. \
Do not repeat the spec back. Spend your effort on the code being complete and correct.

STEP 1 INVENTORY (field `inventory`). Read the spec line by line and list EVERY item:
- one item per output column in the Column Heading / Output columns list (kind "column"), \
in the spec's order, using the spec's exact column name;
- one item per filter or programming consideration (kind "filter");
- one item per labelled branch inside any column or rule: every "Case N", "Scenario N", \
"Logic N", "Logic N.M" (kind "case" / "scenario");
- one item for the sort rule (kind "sort").
For each item give the spec's own words in `spec_text` (name plus the first 12 words). A column whose spec text says \
"no source or logic given" is status "null_no_logic" and must still appear in the SELECT as \
a NULL (or missing) column with its exact name. A column or Case that HAS stated logic must \
NEVER be "null_no_logic".

STEP 2 REASON (field `reasoning_steps`, one string per step):
 a. Hierarchy: how the filters, scenarios and columns relate (what is ANDed, what is ORed). \
Where the spec's wording is ambiguous (for example AND ... OR with no brackets) say which \
reading you take and why.
 b. For EVERY inventory item in order, write one line: what it needs (source table.column, \
condition, output value) and which SQL/SAS/R construct implements it. Compound conditions \
(for example "A AND B AND C AND (D OR E)") must be broken into every part, and each part \
must appear in the code.
 c. Conditions across several records of the same subject (overlap, concurrent, consecutive, \
first/last, "at least one of") need a self-join, an EXISTS subquery or an equivalent; they \
cannot be written as a test on one row. Say which you use.
 d. Columns whose logic depends on another column that has no logic of its own (for example \
"if Overall Relationship = Related" where Overall Relationship is blank): state the \
interpretation you take and add it to `assumptions`. Do not drop the column.
 e. If an item truly cannot be implemented (for example the spec gives no output text for a \
Case), implement everything else, mark the item "cannot_implement" and say exactly what is \
needed.

STEP 3 WRITE THE CODE in the code field. The code field MUST contain the complete, runnable code. Never \
leave it empty and never put the code only in the explanation. Every inventory item must be reflected in it. \
Never leave out a column, a Case or a part of a condition to keep the code short.

STEP 4 EVIDENCE. For every item whose status is "implemented" or "ambiguous_implemented", \
set `code_evidence` to a short fragment (a column alias, a condition, a function call) copied \
CHARACTER FOR CHARACTER from the code you wrote. It is machine-checked: invented or altered \
evidence is reported as a gap.

COMPLETENESS RULES (override any rule above that would push you to omit logic)
- "Do not invent requirements" never means "leave out a requirement the spec states".
- Every requirement that appears in the spec appears in the code or is listed as \
cannot_implement with the reason.
- Where the spec leaves something open, make a safe, stated choice and record it in \
`assumptions`; do not silently skip it.
- Comparisons on coded values (for example AESER = 'Yes') use the same case-handling \
everywhere in the query: if you wrap one in UPPER(), wrap all of them.
"""

DATES_RULE = (
    "- This overrides the previous bullet: when the spec asks for date arithmetic or a comparison with today's date, IMPLEMENT it. "
    "Use the first 10 characters of the DTC string when it is at least 10 characters long, handle "
    "shorter (partial) values explicitly, and say how you treated them. Use the current-date function "
    "only when the spec names today / the current date. When the spec is silent about a missing end "
    "date, treat it as ongoing as of data cutoff and say so."
)

_ITEM = {
    "type": "object",
    "properties": {
        "id": {"type": "string", "description": "e.g. COL-12, FILTER-1, CASE-4, SORT-1"},
        "kind": {"type": "string", "enum": ["column", "filter", "case", "scenario", "sort", "other"]},
        "spec_text": {"type": "string", "description": "The spec's own words, verbatim"},
        "status": {"type": "string", "enum": ["implemented", "ambiguous_implemented", "null_no_logic", "cannot_implement"]},
        "code_evidence": {"type": "string", "description": "Fragment copied exactly from the code; required for implemented items"},
        "note": {"type": "string"},
    },
    "required": ["id", "kind", "spec_text", "status"],
}


def build_tool(name: str, code_field: str, code_desc: str, label: str) -> dict:
    return {
        "name": name,
        "description": f"Submit UNVERIFIED BETA {label} with the full reasoning, an inventory of every spec item and an explanation.",
        "input_schema": {
            "type": "object",
            "properties": {
                "reasoning_steps": {"type": "array", "items": {"type": "string"}, "description": "Steps 2a to 2e, written before the code"},
                "inventory": {"type": "array", "items": _ITEM, "description": "Every column, filter, Case, scenario and sort rule in the spec"},
                "assumptions": {"type": "array", "items": {"type": "string"}},
                code_field: {"type": "string", "description": code_desc},
                "explanation": {
                    "type": "string",
                    "description": "Must state EXPLICIT vs INFERRED names, resolved ambiguity, and the unverified-schema caveat",
                },
            },
            "required": ["reasoning_steps", "inventory", "assumptions", code_field, "explanation"],
        },
    }


# ------------------------------------------------------------------ deterministic checks

def _norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def spec_columns(spec: dict) -> list:
    """Output column names from the spec's column-heading field (numbered list, lines, or commas)."""
    text = (spec.get("columnHeading") or "").strip()
    if not text:
        return []
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    if lines and lines[0].lower().startswith("output columns"):
        lines = lines[1:]
    cols = []
    for l in lines:
        m = re.match(r"^\d+[.)]\s*(.+)$", l)
        cols.append((m.group(1) if m else l).strip())
    if len(cols) == 1 and "," in cols[0]:
        cols = [c.strip() for c in cols[0].split(",") if c.strip()]
    return cols


def _logic_line_for(col: str, logic: str) -> Optional[str]:
    n = _norm(col)
    if not n:
        return None
    for line in (logic or "").splitlines():
        head = re.split(r"[:=\[]", line, maxsplit=1)[0]
        if _norm(head) == n or (_norm(line).startswith(n) and len(_norm(head)) <= len(n) + 3):
            return line
    return None


def spec_case_numbers(spec: dict) -> list:
    nums = []
    for m in re.finditer(r"\bCase\s*(\d+)\b", (spec.get("logic") or ""), flags=re.I):
        if m.group(1) not in nums:
            nums.append(m.group(1))
    return nums


def check(spec: dict, result: dict, code_field: str) -> dict:
    """Returns {"gaps": [...], "warnings": [...]}. Gaps trigger a repair call; warnings need a human."""
    code = result.get(code_field) or ""
    ncode = _norm(code)
    inv = result.get("inventory") or []
    gaps, warnings = [], []

    if not inv:
        gaps.append("No inventory was returned. List every column, filter, Case, scenario and sort rule of the spec.")

    # 1. every spec column is in the code
    for col in spec_columns(spec):
        if _norm(col) not in ncode:
            gaps.append(f"Output column '{col}' is missing from the code.")

    # 2. columns with stated logic must not be left NULL
    by_text = {}
    for it in inv:
        by_text[_norm(it.get("spec_text", ""))[:60]] = it
    for col in spec_columns(spec):
        line = _logic_line_for(col, spec.get("logic", ""))
        if not line or "no source or logic" in line.lower():
            continue
        body = re.split(r"[:=]", line, maxsplit=1)[-1].strip()
        if not body:
            continue  # the logic is on the following lines (for example Flag with Cases); the Case check covers it
        for it in inv:
            head = re.split(r"[:=\[(]", it.get("spec_text", ""), maxsplit=1)[0]
            if it.get("kind") == "column" and (_norm(head) == _norm(col) or _norm(it.get("spec_text", "")).startswith(_norm(col))) and it.get("status") == "null_no_logic":
                gaps.append(f"Column '{col}' has logic in the spec but was left NULL: \"{line.strip()[:160]}\".")
                break

    # 3. every "Case N" in the spec is in the inventory
    for n in spec_case_numbers(spec):
        pat = re.compile(rf"\bcase[\s_-]*{n}\b", re.I)
        if not any(pat.search(it.get("id", "")) or pat.search(it.get("spec_text", "")) for it in inv):
            gaps.append(f"Case {n} of the spec is not in the inventory, so it was not implemented.")

    # 4. evidence must really be in the code
    for it in inv:
        st = it.get("status")
        if st in ("implemented", "ambiguous_implemented"):
            ev = it.get("code_evidence") or ""
            if not ev.strip():
                gaps.append(f"Item {it.get('id')} is marked implemented but has no code evidence.")
            elif _norm(ev) not in ncode:
                gaps.append(f"Item {it.get('id')}: the evidence \"{ev[:80]}\" is not in the code.")
        elif st == "cannot_implement":
            warnings.append(f"NEEDS A DECISION -- {it.get('id')}: {it.get('note') or it.get('spec_text', '')[:160]}")
        elif st == "ambiguous_implemented":
            warnings.append(f"Ambiguity resolved -- {it.get('id')}: {it.get('note', '')}")
    for a in result.get("assumptions") or []:
        warnings.append(f"Assumption: {a}")
    return {"gaps": gaps, "warnings": warnings}


def _summary(chk: dict, repaired: bool, attempts: int, history: Optional[list] = None) -> str:
    lines = ["", "COVERAGE CHECK (machine-checked against the spec; still an unverified draft)"]
    trail = f" (open gaps per pass: {', '.join(str(h) for h in history)})" if history and len(history) > 1 else ""
    lines.append(f"- Generation passes: {attempts}{trail}; independent audit: {'ran' if chk.get('audit_ran') else 'off'}")
    if chk["gaps"]:
        lines.append(f"- {len(chk['gaps'])} GAP(S) FOUND by the free machine check -- fix these before relying on this code:")
        lines += [f"    * {g}" for g in chk["gaps"]]
    else:
        lines.append("- The machine check found every spec column and Case in the code.")
    lines += [f"- {w}" for w in chk["warnings"][:25]]
    return "\n".join(lines)


# ------------------------------------------------------------------ the call

def _call(system: str, user: str, tool: dict, error_cls) -> dict:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise error_cls("ANTHROPIC_API_KEY is not set.")
    client = anthropic.Anthropic(api_key=api_key)
    try:
        with client.messages.stream(
            model=MODEL, max_tokens=MAX_TOKENS, system=system, tools=[tool],
            tool_choice={"type": "tool", "name": tool["name"]},
            messages=[{"role": "user", "content": user}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        if "credit balance is too low" in str(e):
            raise error_cls("The Anthropic API credit balance is too low. Add credits (Plans & Billing in the Anthropic console), then retry.") from e
        raise error_cls(f"Claude API request failed: {e}") from e
    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == tool["name"]:
            return block.input
    if response.stop_reason == "max_tokens":
        raise error_cls("Generation was cut off before finishing (ran out of tokens).")
    raise error_cls(f"Model did not return structured output (stop_reason={response.stop_reason}).")


def _audit(spec: dict, code: str, code_field: str, error_cls) -> list:
    """Independent pass: a fresh call that has not seen the first call's reasoning and judges the code
    against the spec. Its claims are machine-checked too (evidence must be in the code)."""
    user = (
        "REPORT SPEC\n"
        f"Description: {spec.get('description', '')}\n"
        f"Output columns:\n{spec.get('columnHeading', '')}\n\n"
        f"Logic:\n{spec.get('logic', '')}\n\n"
        f"Report Scenarios:\n{spec.get('reportScenarios', '')}\n\n"
        f"Sorting: {spec.get('sorting', '')}\n\n"
        f"CODE TO REVIEW\n{code}\n\nReview every requirement now."
    )
    out = _call(AUDIT_SYSTEM, user, AUDIT_TOOL, error_cls)
    ncode = _norm(code)
    gaps = []
    for r in out.get("requirements") or []:
        text = (r.get("spec_text") or "")[:140]
        if not r.get("present"):
            gaps.append(f"Audit: not implemented -- {r.get('id', '')} \"{text}\": {r.get('problem') or 'missing from the code'}")
        else:
            ev = r.get("code_evidence") or ""
            if not ev.strip() or _norm(ev) not in ncode:
                gaps.append(f"Audit: claimed present but not found in the code -- {r.get('id', '')} \"{text}\"")
    return gaps


def _assess(spec: dict, res: dict, code_field: str, error_cls, lint: Optional[Callable] = None) -> dict:
    chk = check(spec, res, code_field)
    if lint is not None:
        chk["gaps"] += list(lint(res.get(code_field) or ""))
    chk["audit_ran"] = False
    if AUDIT:
        try:
            chk["gaps"] += _audit(spec, res.get(code_field) or "", code_field, error_cls)
            chk["audit_ran"] = True
        except error_cls as e:
            chk["warnings"].append(f"The independent audit could not run: {e}")
    return chk


def _rescue_code(res: dict, code_field: str) -> dict:
    """The model sometimes leaves the code field empty and writes the code in a fenced block inside its
    explanation. Recover the largest fenced block instead of reporting 'no code'. No extra API call."""
    if (res.get(code_field) or "").strip():
        return res
    texts = [res.get("explanation") or ""] + [x for x in (res.get("reasoning_steps") or []) if isinstance(x, str)]
    blocks = []
    for t in texts:
        blocks += re.findall(r"```[a-zA-Z]*\n(.*?)```", t, flags=re.S)
    if blocks:
        res = dict(res)
        res[code_field] = max(blocks, key=len).strip()
        res["explanation"] = (res.get("explanation") or "") + "\n(The code field was empty; the code was recovered from the explanation.)"
    return res


def generate(spec: dict, system: str, user: str, tool: dict, code_field: str, error_cls: type, lint: Optional[Callable] = None) -> dict:
    """Generate, then loop: check + independent audit -> if anything is missing, regenerate with the exact
    gaps listed -> check again. Stops at zero gaps, when a pass makes no progress twice, or at MAX_PASSES.
    The attempt with the fewest open gaps is returned. This cannot promise a correct query, only that every
    requirement is present or is reported; gaps that survive every pass are listed for a human."""
    best = _rescue_code(_call(system, user, tool, error_cls), code_field)
    best_chk = _assess(spec, best, code_field, error_cls, lint)
    attempts, stalled, history = 1, 0, [len(best_chk["gaps"])]
    while best_chk["gaps"] and attempts < MAX_PASSES and stalled < 2:
        gap_text = "\n".join(f"- {g}" for g in best_chk["gaps"][:60])
        fix_user = (
            user
            + "\n\nPREVIOUS ATTEMPT (incomplete)\n"
            + f"{best.get(code_field, '')}\n\n"
            + "A machine check and an independent reviewer found these gaps against the spec:\n"
            + gap_text
            + "\n\nProduce the COMPLETE corrected result with the same method. Keep everything in the previous "
              "attempt that was correct, fix EVERY gap above (implement each missing part, do not just argue it away), "
              "and list every spec item in the inventory with evidence copied exactly from the new code."
        )
        try:
            cand = _rescue_code(_call(system, fix_user, tool, error_cls), code_field)
            cand_chk = _assess(spec, cand, code_field, error_cls, lint)
        except error_cls:
            break
        attempts += 1
        history.append(len(cand_chk["gaps"]))
        if len(cand_chk["gaps"]) < len(best_chk["gaps"]):
            best, best_chk, stalled = cand, cand_chk, 0
        else:
            stalled += 1
    out = dict(best)
    out["explanation"] = (best.get("explanation") or "") + "\n" + _summary(best_chk, attempts > 1, attempts, history)
    out["coverageCheck"] = {"gaps": best_chk["gaps"], "warnings": best_chk["warnings"], "passes": attempts,
                            "repaired": attempts > 1, "gapHistory": history, "auditRan": best_chk["audit_ran"],
                            "complete": not best_chk["gaps"]}
    return out
