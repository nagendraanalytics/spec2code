"""
generation_router.py — the single place that decides whether a
(spec_template, edc_system, language) combination can be attempted at
all, and if so, which Tier 1 rule module and Tier 5 handler apply.

This exists so "support any language/sponsor" is implemented as ONE gate
everything else calls through, instead of every layer (main.py, the
LangGraph nodes, guardrails) independently having to know which combos
are real. Adding a new verified combo later means updating
code_gen_registry.py/spec_templates.py's data and this file's small
dispatch tables -- not touching the pipeline logic itself.
"""

from typing import Optional, TypedDict

import code_gen_registry
import spec_templates


class GenerationUnavailable(Exception):
    """Raised when a request asks for a (template, edc_system, language)
    combination with no verified path AND no explicit opt-in for an
    unverified-beta path. Callers should turn this into a clear 4xx
    response, not attempt generation anyway -- there is no generic
    fallback prompt to fall back to, on purpose."""


class RouteInfo(TypedDict):
    edc_system: str
    language: str
    has_tier1: bool
    has_tier5: bool
    is_beta: bool  # True if this route only works because allow_unverified was set


# Which modules provide Tier 1 (deterministic rule) matching per language.
# Only languages with an actual verified rules module are listed.
_TIER1_MODULES = {
    "cql": "rules_engine",
    "python": "code_templates",
}

# Which (edc_system, language) combos have a real, VERIFIED Tier 5 (Claude)
# prompt -- used unconditionally, no opt-in needed.
_TIER5_HANDLERS = {
    ("veeva", "cql"),
}

# Which (edc_system, language) combos have a real but UNVERIFIED Tier 5
# prompt -- only usable when the caller explicitly passes allow_unverified=True.
_TIER5_BETA_HANDLERS = {
    ("veeva", "sql"): "sql_agents",
    ("veeva", "r"): "r_agents",
    ("veeva", "sas"): "sas_agents",
}


def coverage(edc_system: str, language: str) -> str:
    """How much of the pipeline backs this (edc_system, language) cell:
      "full"       -- rules, retrieval, Claude generation and guardrails
      "rules_only" -- Tier 1 deterministic rules only; no Claude fallback,
                      so most specs produce no code
      "draft"      -- unverified-beta Claude generation, programmer review needed
      "none"       -- nothing to run
    Exposed through /api/targets so the UI never calls a rules-only path
    "verified" without saying how narrow it is."""
    if (edc_system, language) in _TIER5_HANDLERS:
        return "full"
    if (edc_system, language) in _TIER5_BETA_HANDLERS:
        return "draft"
    if language in _TIER1_MODULES and code_gen_registry.is_available(edc_system, language):
        return "rules_only"
    return "none"


def grounded_draft_possible(edc_system: str, language: str, has_metadata: bool) -> bool:
    """A system with no checked generator can still produce an UNVERIFIED DRAFT
    in a language that has a beta generator, when the study's own metadata is
    loaded: the model then names real forms and items instead of guessing a
    convention. Never applies to Veeva (it has its own cells) or to CQL."""
    import edc_registry

    return (
        has_metadata
        and edc_system != "veeva"
        and language in edc_registry.GROUNDED_LANGUAGES
        and edc_registry.is_known(edc_system)
    )


def resolve(spec_template: str, edc_system: str, language: str, allow_unverified: bool = False, has_metadata: bool = False) -> RouteInfo:
    """Validates the full combination and returns what's actually
    available. Raises GenerationUnavailable with a specific, honest
    reason (not a generic "not supported") if anything in the chain is
    unverified AND allow_unverified was not explicitly set. Passing
    allow_unverified=True only unlocks "unverified_beta" status combos --
    it does nothing for "planned"/"needs_precedent" combos, which have no
    prompt to run regardless of opt-in."""
    if not spec_templates.is_supported(spec_template):
        template = spec_templates.get_template(spec_template)
        if template is None:
            raise GenerationUnavailable(
                f"Unknown spec template '{spec_template}'. Known templates: "
                f"{list(spec_templates.TEMPLATES.keys())}. A new sponsor format needs a real "
                f"example spec registered via spec_templates.register_template() first."
            )
        raise GenerationUnavailable(f"Spec template '{spec_template}' is registered but not verified: {template['detail']}")

    status = code_gen_registry.get_status(edc_system, language)
    grounded = status["status"] not in ("verified", "built", "unverified_beta") and grounded_draft_possible(edc_system, language, has_metadata)
    if grounded:
        status = {"status": "unverified_beta", "detail": "Metadata-grounded draft: no checked generator exists for this system, so names come from the loaded study metadata."}
    is_beta = status["status"] == "unverified_beta"

    if status["status"] not in ("verified", "built") and not (is_beta and allow_unverified):
        reason = status["detail"]
        if is_beta and not allow_unverified:
            reason = f"UNVERIFIED BETA (opt-in required): {reason}"
        raise GenerationUnavailable(
            f"No verified generation path for (edc_system={edc_system}, language={language}): {reason}"
        )

    return {
        "edc_system": edc_system,
        "language": language,
        "has_tier1": language in _TIER1_MODULES,
        "has_tier5": (edc_system, language) in _TIER5_HANDLERS or (((edc_system, language) in _TIER5_BETA_HANDLERS or grounded) and allow_unverified),
        "is_beta": is_beta,
    }


def apply_tier1(language: str, spec: dict) -> Optional[dict]:
    """Dispatches to the right Tier 1 module's apply_rules() for this
    language. Returns None if the language has no Tier 1 module, or if
    the module has one but it didn't match."""
    module_name = _TIER1_MODULES.get(language)
    if module_name is None:
        return None

    if module_name == "rules_engine":
        import rules_engine
        return rules_engine.apply_rules(spec)
    if module_name == "code_templates":
        import code_templates
        match = code_templates.apply_python_rules(spec)
        if match is None:
            return None
        # Normalize code_templates' {"code": ...} shape to the same
        # {"cql": ...} key rules_engine uses, so callers don't need to
        # know which module produced the match.
        return {"rule_name": match["rule_name"], "cql": match["code"], "explanation": match["explanation"]}
    return None


# Each beta module returns its own code-field name (sql_agents: "sql",
# r_agents: "r_code", sas_agents: "sas_code") -- this maps language to
# (module_name, function_name, code_field) so run_beta_generation() can
# normalize all three to the same {"code": ..., "explanation": ...} shape,
# the same way apply_tier1() normalizes across Tier 1 modules above.
_BETA_MODULE_INFO = {
    "sql": ("sql_agents", "run_sql_generation", "sql"),
    "r": ("r_agents", "run_r_generation", "r_code"),
    "sas": ("sas_agents", "run_sas_generation", "sas_code"),
}


def run_beta_generation(language: str, spec: dict) -> dict:
    """Dispatches to the right unverified-beta module and normalizes its
    output to {"code": ..., "explanation": ...}. Callers (main.py) must
    have already confirmed allow_unverified was set via resolve() before
    calling this -- it does not re-check that itself. Raises whatever
    AgentError the underlying module raises (each module defines its own,
    but all share the same {message} contract)."""
    info = _BETA_MODULE_INFO.get(language)
    if info is None:
        raise ValueError(f"No beta module registered for language '{language}' -- check _TIER5_BETA_HANDLERS/_BETA_MODULE_INFO are in sync.")
    module_name, function_name, code_field = info

    import importlib
    module = importlib.import_module(module_name)
    fn = getattr(module, function_name)
    result = fn(spec)
    return {"code": result.get(code_field), "explanation": result.get("explanation")}
