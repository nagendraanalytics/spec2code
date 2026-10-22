"""study_model_config.py -- which AI model a study uses (chosen in Study setup).

STORAGE: one small table, `study_model_config`, keyed by (tenant_id, study_id). It is a NEW table on
purpose: db.init_db() only creates missing tables and never adds columns to existing ones (there is no
migration tooling), so a new column on `studies` would break every existing database. The table is created
on startup with CREATE TABLE IF NOT EXISTS (works on SQLite and Postgres). If the app connects as a
least-privilege Postgres role that cannot CREATE TABLE, ensure_table() logs the error and reads degrade to
"no study model chosen"; saving then fails with a message. Run TABLE_DDL once as an admin to fix that.

Every query filters by tenant_id, like the rest of store.py.

API KEYS are never stored here -- they come from the server environment (see code_gen_agents.py).

PIPELINE_HONORS_STUDY_MODEL: the saved choice is only *applied* once the generation agents (extract,
understand, review, the CQL cascade) call code_gen_agents' provider layer. Until then it is saved and
recorded on each run as "not applied", never silently implied. Flip it to True when they are wired.
"""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone

from sqlalchemy import text

import code_gen_agents

log = logging.getLogger(__name__)

PIPELINE_HONORS_STUDY_MODEL = False

TABLE_DDL = """CREATE TABLE IF NOT EXISTS study_model_config (
    tenant_id VARCHAR(100) NOT NULL,
    study_id VARCHAR(100) NOT NULL,
    config_json TEXT NOT NULL,
    updated_at VARCHAR(40) NOT NULL,
    PRIMARY KEY (tenant_id, study_id)
)"""

_TABLE_READY = False

PROVIDER_LABELS = {"claude": "Claude", "gemini": "Gemini", "gpt": "GPT"}
# Suggestions only. Anthropic's current API model ids; no ids are suggested for the others because they
# change often -- the user types the id they have access to.
SUGGESTED_MODELS = {
    "claude": [
        {"id": "claude-sonnet-5-5", "label": "Claude Sonnet 5.5"},
        {"id": "claude-opus-5-5", "label": "Claude Opus 5.5"},
        {"id": "claude-haiku-5-5", "label": "Claude Haiku 5.5"},
    ],
}
UNAPPROVED_NOTE = (
    "Use only with masked, non-proprietary specs unless this provider is approved for the study's data. "
    "Free or personal API keys may allow inputs to be used for model improvement."
)


def ensure_table(session_factory) -> bool:
    """Create the table if it is missing. Never raises: a failure is logged and reads degrade."""
    global _TABLE_READY
    s = session_factory()
    try:
        s.execute(text(TABLE_DDL))
        s.commit()
        _TABLE_READY = True
    except Exception as e:  # noqa: BLE001
        s.rollback()
        _TABLE_READY = False
        log.error("study_model_config table could not be created (%s). Study model choices cannot be saved until "
                  "this is run by an admin:\n%s", e, TABLE_DDL)
    finally:
        s.close()
    return _TABLE_READY


# ---- API <-> stored form ------------------------------------------------------

def _clean(v):
    v = (str(v).strip() if v is not None else "")
    return v or None


def normalize(api_cfg) -> dict:
    """UI payload (camelCase, provider names claude/gemini/gpt) -> validated stored config (snake_case,
    internal provider names). Raises code_gen_agents.AgentError with a message fit to show the user."""
    if not isinstance(api_cfg, dict):
        raise code_gen_agents.AgentError("modelConfig must be an object.")
    snake: dict = {"provider": api_cfg.get("provider"), "model": _clean(api_cfg.get("model"))}

    if api_cfg.get("maxTokens") not in (None, ""):
        try:
            mt = int(api_cfg["maxTokens"])
        except (TypeError, ValueError):
            raise code_gen_agents.AgentError("maxTokens must be a number.") from None
        if not 100 <= mt <= 32000:
            raise code_gen_agents.AgentError("maxTokens must be between 100 and 32000.")
        snake["max_tokens"] = mt

    steps: dict = {}
    for step, ov in (api_cfg.get("stepModels") or {}).items():
        if not isinstance(ov, dict):
            raise code_gen_agents.AgentError(f"Step '{step}' override must be an object.")
        o = {k: _clean(ov.get(k)) for k in ("provider", "model") if _clean(ov.get(k))}
        if o:
            steps[step] = o
    snake["step_models"] = steps

    validated = code_gen_agents.validate_model_config(snake)
    # validate_model_config fills in a provider for every step override; a step that did not name one must
    # keep following the study's provider if that is changed later, so take the filled-in value back out.
    for step, ov in (validated.get("step_models") or {}).items():
        if "provider" not in steps.get(step, {}):
            ov.pop("provider", None)
    return {k: v for k, v in validated.items() if v not in (None, {})}


def to_api(cfg) -> dict | None:
    """Stored config -> the shape the UI uses."""
    if not cfg:
        return None
    ui = code_gen_agents.PROVIDER_UI_NAMES
    out: dict = {"provider": ui.get(cfg.get("provider"), cfg.get("provider"))}
    if cfg.get("model"):
        out["model"] = cfg["model"]
    if cfg.get("max_tokens"):
        out["maxTokens"] = cfg["max_tokens"]
    steps = {}
    for step, ov in (cfg.get("step_models") or {}).items():
        item = {}
        if ov.get("provider"):
            item["provider"] = ui.get(ov["provider"], ov["provider"])
        if ov.get("model"):
            item["model"] = ov["model"]
        if item:
            steps[step] = item
    if steps:
        out["stepModels"] = steps
    return out


# ---- persistence ----------------------------------------------------------------

def get(session, tenant_id: str, study_id: str) -> dict | None:
    """The stored (internal-form) config, or None if the study has not chosen one."""
    if not _TABLE_READY or not (study_id or "").strip():
        return None
    row = session.execute(
        text("SELECT config_json FROM study_model_config WHERE tenant_id = :t AND study_id = :s"),
        {"t": tenant_id, "s": study_id.strip()},
    ).first()
    return json.loads(row[0]) if row else None


def get_api(session, tenant_id: str, study_id: str) -> dict | None:
    return to_api(get(session, tenant_id, study_id))


def get_all_api(session, tenant_id: str) -> dict:
    """study_id -> UI-form config for every study of the tenant that has one (one query for the list page)."""
    if not _TABLE_READY:
        return {}
    rows = session.execute(
        text("SELECT study_id, config_json FROM study_model_config WHERE tenant_id = :t"), {"t": tenant_id}
    ).all()
    return {sid: to_api(json.loads(cj)) for sid, cj in rows}


def save(session, tenant_id: str, study_id: str, api_cfg) -> dict:
    """Validate and store. Raises code_gen_agents.AgentError (bad choice, or storage unavailable)."""
    cfg = normalize(api_cfg)
    if not _TABLE_READY:
        raise code_gen_agents.AgentError(
            "Model settings storage is not available on this server (the study_model_config table could not be "
            "created). Ask an administrator to create it; see the server log for the SQL.")
    params = {"t": tenant_id, "s": study_id.strip(), "c": json.dumps(cfg),
              "u": datetime.now(timezone.utc).isoformat(timespec="seconds")}
    exists = session.execute(
        text("SELECT 1 FROM study_model_config WHERE tenant_id = :t AND study_id = :s"), params).first()
    if exists:
        session.execute(text("UPDATE study_model_config SET config_json = :c, updated_at = :u "
                             "WHERE tenant_id = :t AND study_id = :s"), params)
    else:
        session.execute(text("INSERT INTO study_model_config (tenant_id, study_id, config_json, updated_at) "
                             "VALUES (:t, :s, :c, :u)"), params)
    session.commit()
    return cfg


def delete(session, tenant_id: str, study_id: str) -> None:
    if not _TABLE_READY:
        return
    session.execute(text("DELETE FROM study_model_config WHERE tenant_id = :t AND study_id = :s"),
                    {"t": tenant_id, "s": study_id.strip()})
    session.commit()


# ---- providers list for the UI ---------------------------------------------------

def providers_info() -> list:
    out = []
    for st in code_gen_agents.provider_status():
        ui = code_gen_agents.PROVIDER_UI_NAMES[st["id"]]
        item = {"id": ui, "label": PROVIDER_LABELS[ui], "enabled": st["enabled"],
                "keyConfigured": st["keyConfigured"], "models": SUGGESTED_MODELS.get(ui, [])}
        if ui != "claude":
            item["note"] = UNAPPROVED_NOTE
        out.append(item)
    return out


# ---- run recording -----------------------------------------------------------------

def trace_entry(cfg) -> dict | None:
    """One cascade_trace entry recording the study's model choice on a run. Says plainly when the pipeline did
    not apply it, so a run never implies a provider that was not used."""
    if not cfg:
        return None
    api = to_api(cfg)
    label = PROVIDER_LABELS.get(api["provider"], api["provider"]) + (f" ({api['model']})" if api.get("model") else "")
    plain_default = cfg.get("provider") == "anthropic" and not cfg.get("model") and not cfg.get("step_models")
    if PIPELINE_HONORS_STUDY_MODEL or plain_default:
        return {"tier": "model", "status": "ran", "detail": f"Study model: {label}"}
    return {"tier": "model", "status": "not_applied",
            "detail": f"Study is set to {label}, but the generation pipeline still calls Claude with its built-in "
                      f"model. The choice is saved but not applied to this run yet."}
