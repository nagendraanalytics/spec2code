"""
code_gen_agents.py — multi-agent CQL generation, decomposing the single
Tier 5 Claude call (cql_agents.run_cql_generation) into 6 sequential
reasoning sub-agents + 1 synthesis agent.

Why sequential, not parallel (unlike spec_review_agents.py's 5
independent field agents): the real dependency graph doesn't support
parallelism here.
    domains    -- needs only the spec. The one genuinely independent step.
    columns    -- needs domains (which tables are even in play).
    joins      -- needs domains + columns (join keys reference specific columns).
    filters    -- needs domains + columns + joins (WHERE clauses reference joined tables).
    edge_cases -- needs the filters already drafted, to know what they don't yet cover.
    self_check -- needs the full chain, to review it for gaps/contradictions.
    synthesis  -- needs the full validated chain to render actual code.
Running columns before domains exist, for example, would just make the
model guess at table names it hasn't reasoned about yet -- worse output,
not faster generation, since none of these calls are on the critical
path of anything else running concurrently.

Cost, stated plainly: 7 Claude calls per generation vs. 1 in
cql_agents.run_cql_generation(). This is a separate, opt-in function --
main.py and orchestration/graph.py's tier5_claude_node do not call this.
"""

from typing import Optional

import llm_client

import chain_guardrails
import guardrails

CQL_DATA_MODEL_CONTEXT = """CQL data model (Veeva Vault CDB): source data lives in \
EDC Forms named after the domain (e.g. AE, VAE, LB), referenced directly \
in FROM (e.g. `FROM AE`) -- there are no RM_<DOMAIN> tables. Subject/Site/ \
Country come from the implicit @HDR context (@HDR.Subject.Name, \
@HDR.Site.Number, etc.), never a joined table. "After encoding/coding" \
means CODEDTERM(Item, 'TermLevel'). Ongoing/continuing records (NULL end \
date) use IFNULL(EndDateItem, ...) per the spec's stated handling."""

# Same pattern as spec_review_agents.py's _CATEGORY_DEFINITIONS: ONE shared
# block, injected identically into every sub-agent's prompt, rather than each
# step re-deriving its own partial phrasing of the same constraints. Before
# this fix, "no CTEs" only appeared in the synthesis agent's own wording --
# every earlier step could reason toward a CTE-shaped structure with nothing
# telling it not to, and only synthesis (or guardrails.py, after the fact)
# would ever catch it.
CQL_RULES_CONTEXT = """Rules that apply at every step of this reasoning chain:
- Ground every choice in the spec's actual Description/Logic/Report Scenarios \
text -- never invent a table, column, join, or condition the spec doesn't \
support. If something is inferred rather than explicitly stated (e.g. an \
Item name assumed from CDISC convention), say so rather than presenting it \
as certain.
- The final query must be a SINGLE statement -- no WITH clauses / CTEs \
anywhere. Plan around subqueries or direct joins from the start, not just \
at the synthesis step -- a join or filter plan that assumes a CTE will \
force a worse rewrite later, not just a syntax swap."""


class AgentError(Exception):
    pass


def _spec_text(spec: dict) -> str:
    return (
        f"Report ID: {spec.get('reportId', '')}\n"
        f"Description: {spec.get('description', '')}\n"
        f"Column Heading: {spec.get('columnHeading', '')}\n"
        f"Logic: {spec.get('logic', '')}\n"
        f"Report Scenarios: {spec.get('reportScenarios', '')}\n"
        f"Sorting: {spec.get('sorting', '')}"
    )


def _call_tool_agent(step_name: str, system: str, user: str, tool: dict) -> dict:
    try:
        res = llm_client.call_tool(system=system, user=user, tool=tool, max_tokens=1500, model="claude-sonnet-5")
    except llm_client.LLMClientError as e:
        raise AgentError(f"{step_name} agent failed: {e}") from e
    if res.input is not None:
        return res.input
    raise AgentError(f"{step_name} agent did not call its tool (stop_reason={res.stop_reason})")


# ---------------------------------------------------------------------
# Step 1: Domains -- the one independent step
# ---------------------------------------------------------------------

DOMAINS_TOOL = {
    "name": "submit_domains",
    "description": "Submit the Forms this spec requires.",
    "input_schema": {
        "type": "object",
        "properties": {
            "domains": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"form": {"type": "string"}, "reason": {"type": "string"}},
                    "required": ["form", "reason"],
                },
            }
        },
        "required": ["domains"],
    },
}


def run_domains_agent(spec: dict) -> dict:
    system = f"""You identify which Forms a CDM report spec needs. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

List every Form implicated by the spec's Description, Column Heading, and Logic. Use submit_domains."""
    return _call_tool_agent("domains", system, _spec_text(spec), DOMAINS_TOOL)


# ---------------------------------------------------------------------
# Step 2: Columns -- needs domains
# ---------------------------------------------------------------------

COLUMNS_TOOL = {
    "name": "submit_columns",
    "description": "Submit the Items (columns) required from each Form already identified.",
    "input_schema": {
        "type": "object",
        "properties": {
            "columns": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "form": {"type": "string"},
                        "item": {"type": "string"},
                        "source": {"type": "string", "enum": ["EXPLICIT", "INFERRED"]},
                    },
                    "required": ["form", "item", "source"],
                },
            }
        },
        "required": ["columns"],
    },
}


def run_columns_agent(spec: dict, domains: list) -> dict:
    system = f"""You identify which Items (columns) are needed from each Form already \
identified for this spec. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Mark each item EXPLICIT (named in the spec) or INFERRED (standard CDISC \
convention you assumed). Use submit_columns."""
    user = f"{_spec_text(spec)}\n\nForms already identified:\n{domains}"
    return _call_tool_agent("columns", system, user, COLUMNS_TOOL)


# ---------------------------------------------------------------------
# Step 3: Joins -- needs domains + columns
# ---------------------------------------------------------------------

JOINS_TOOL = {
    "name": "submit_joins",
    "description": "Submit the joins required between the identified Forms.",
    "input_schema": {
        "type": "object",
        "properties": {
            "joins": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "forms": {"type": "array", "items": {"type": "string"}},
                        "join_type": {"type": "string", "enum": ["implicit_subject_event", "self_join_same_form", "explicit_left", "explicit_inner"]},
                        "reason": {"type": "string"},
                    },
                    "required": ["forms", "join_type", "reason"],
                },
            }
        },
        "required": ["joins"],
    },
}


def run_joins_agent(spec: dict, domains: list, columns: list) -> dict:
    system = f"""You determine join logic between the Forms already identified for this \
spec. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

CQL joins on Subject+Event automatically by default across Forms -- only \
specify an explicit join type when the spec requires comparing two rows \
of the SAME Form (self_join_same_form, e.g. overlap/duplicate checks) or \
an explicit cross-form join on something other than Subject+Event. \
Default to implicit_subject_event when nothing special is needed. \
Use submit_joins."""
    user = f"{_spec_text(spec)}\n\nForms:\n{domains}\n\nColumns:\n{columns}"
    return _call_tool_agent("joins", system, user, JOINS_TOOL)


# ---------------------------------------------------------------------
# Step 4: Filters -- needs domains + columns + joins
# ---------------------------------------------------------------------

FILTERS_TOOL = {
    "name": "submit_filters",
    "description": "Submit the filter conditions mapped from the spec's Logic and Report Scenarios.",
    "input_schema": {
        "type": "object",
        "properties": {
            "filters": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"condition": {"type": "string"}, "spec_reference": {"type": "string"}},
                    "required": ["condition", "spec_reference"],
                },
            }
        },
        "required": ["filters"],
    },
}


def run_filters_agent(spec: dict, domains: list, columns: list, joins: list) -> dict:
    system = f"""You map a CDM report spec's Logic and Report Scenarios to filter \
conditions, line by line. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Every condition in the spec must map to a filter; every filter must trace \
back to spec text -- don't invent conditions. Use CODEDTERM(...) for \
"after encoding/coding" comparisons. Use submit_filters."""
    user = f"{_spec_text(spec)}\n\nForms:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}"
    return _call_tool_agent("filters", system, user, FILTERS_TOOL)


# ---------------------------------------------------------------------
# Step 5: Edge cases -- needs the filters already drafted
# ---------------------------------------------------------------------

EDGE_CASES_TOOL = {
    "name": "submit_edge_cases",
    "description": "Submit edge cases the spec calls out and how each is handled.",
    "input_schema": {
        "type": "object",
        "properties": {
            "edge_cases": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"case": {"type": "string"}, "handling": {"type": "string"}},
                    "required": ["case", "handling"],
                },
            }
        },
        "required": ["edge_cases"],
    },
}


def run_edge_cases_agent(spec: dict, filters: list) -> dict:
    system = f"""You identify edge cases a CDM report spec calls out explicitly (ongoing/ \
continuing records with no end date, missing values) that the filters \
drafted so far don't yet address, and state the CQL handling for each \
(e.g. IFNULL(EndDateItem, ...) for ongoing records). {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Only include cases the spec text actually implies -- don't invent edge \
cases it doesn't call for. Use submit_edge_cases."""
    user = f"{_spec_text(spec)}\n\nFilters drafted so far:\n{filters}"
    return _call_tool_agent("edge_cases", system, user, EDGE_CASES_TOOL)


# ---------------------------------------------------------------------
# Step 6: Self-check -- needs the full chain
# ---------------------------------------------------------------------

SELF_CHECK_TOOL = {
    "name": "submit_self_check",
    "description": "Submit a review of the full reasoning chain for gaps or contradictions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "issues_found": {"type": "array", "items": {"type": "string"}},
            "consistent": {"type": "boolean", "description": "true if the chain is internally consistent and complete"},
        },
        "required": ["issues_found", "consistent"],
    },
}


def run_self_check_agent(spec: dict, domains: list, columns: list, joins: list, filters: list, edge_cases: list) -> dict:
    system = f"""You review a completed reasoning chain (domains, columns, joins, \
filters, edge cases) for a CDM report spec, checking for anything \
invented that isn't grounded in the spec, or anything the spec requires \
that the chain doesn't address.

{CQL_RULES_CONTEXT}

Specifically check whether any step's plan implies a structure that would \
force a CTE at synthesis time (e.g. a filter step that assumes named \
intermediate result sets) -- flag it now, not after the query is written. \
Use submit_self_check."""
    user = (
        f"{_spec_text(spec)}\n\n"
        f"Domains:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}\n\n"
        f"Filters:\n{filters}\n\nEdge cases:\n{edge_cases}"
    )
    return _call_tool_agent("self_check", system, user, SELF_CHECK_TOOL)


# ---------------------------------------------------------------------
# Step 7: Synthesis -- renders the actual code from the validated chain
# ---------------------------------------------------------------------

SYNTHESIS_TOOL = {
    "name": "submit_code",
    "description": "Submit the final CQL and explanation, rendered from the validated reasoning chain.",
    "input_schema": {
        "type": "object",
        "properties": {
            "cql": {"type": "string"},
            "explanation": {"type": "string"},
        },
        "required": ["cql", "explanation"],
    },
}


def run_synthesis_agent(spec: dict, domains: list, columns: list, joins: list, filters: list, edge_cases: list, self_check: dict) -> dict:
    system = f"""You render final CQL from an already-validated reasoning chain -- do \
not re-derive the analysis, just translate it into a single CQL \
statement consistent with everything in the \
chain. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

If self_check flagged issues, resolve them consistent with the spec \
rather than ignoring them. Use submit_code."""
    user = (
        f"{_spec_text(spec)}\n\n"
        f"Domains:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}\n\n"
        f"Filters:\n{filters}\n\nEdge cases:\n{edge_cases}\n\nSelf-check:\n{self_check}"
    )
    return _call_tool_agent("synthesis", system, user, SYNTHESIS_TOOL)


# ---------------------------------------------------------------------
# Orchestrator
# ---------------------------------------------------------------------

def run_multi_agent_code_generation(spec: dict) -> dict:
    """Runs all 7 steps in sequence, each fed the accumulated output of
    the ones before it. Returns {"cql", "explanation", "reasoning_chain",
    "chain_guardrail_report", "guardrail_report"}.

    GUARDRAILS at two points, closing a real gap: this function used to
    run with NO guardrail checks at all, unlike the single-call and
    Tier 1 paths which both pass through orchestration/graph.py's
    guardrails_node. That made the most complex generation path the
    least checked one -- backwards.
      1. chain_guardrails.run_chain_guardrails() runs on the intermediate
         steps BEFORE synthesis -- catches a hallucinated Form reference
         structurally, which the final CQL text alone wouldn't reveal
         cleanly.
      2. guardrails.run_guardrails() runs on the SYNTHESIZED CQL after --
         same structural check every other generation path gets.
    Neither currently blocks/retries on failure -- both are reported in
    the return value so a caller can decide (surface to a reviewer, log,
    or retry the affected step). Wiring an automatic retry on a
    chain-guardrail failure is a reasonable next step, not done here."""
    domains = run_domains_agent(spec)["domains"]
    columns = run_columns_agent(spec, domains)["columns"]
    joins = run_joins_agent(spec, domains, columns)["joins"]
    filters = run_filters_agent(spec, domains, columns, joins)["filters"]

    chain_guardrail_report = chain_guardrails.run_chain_guardrails(domains, columns, joins, filters)
    if not chain_guardrail_report["passed"]:
        # Not a hard stop -- self_check gets to see these issues too and
        # may resolve them; synthesis's own guardrail check below is the
        # final backstop either way.
        pass

    edge_cases = run_edge_cases_agent(spec, filters)["edge_cases"]
    self_check = run_self_check_agent(spec, domains, columns, joins, filters, edge_cases)
    result = run_synthesis_agent(spec, domains, columns, joins, filters, edge_cases, self_check)

    final_cql = result.get("cql", "") or ""
    guardrail_report = guardrails.run_guardrails(final_cql)

    return {
        "cql": result.get("cql"),
        "explanation": result.get("explanation"),
        "chain_guardrail_report": chain_guardrail_report,
        "guardrail_report": guardrail_report,
        "reasoning_chain": {
            "domains": domains,
            "columns": columns,
            "joins": joins,
            "filters": filters,
            "edge_cases": edge_cases,
            "self_check": self_check,
        },
    }
