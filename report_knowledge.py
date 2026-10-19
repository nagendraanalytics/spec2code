"""Puts a programmer-verified report (its spec and CQL) into the knowledge library at report scope.

Called when a programmer confirms a result as a verified precedent. That confirmation is the verification step, so
the source is stored already approved, in the name of the person who confirmed it. Nothing is stored from an
unconfirmed generation run. The stored file holds the spec and the verified code, so later specs that read alike
find this report's code by similarity, whatever their own Report ID is.
"""
import models_db as m
import knowledge_store as ks


def _text(rid: str, description: str, column_heading: str, logic: str, scenarios: str, cql: str, notes: str) -> str:
    parts = [f"# Verified report {rid}", "", "## Spec", f"Report ID: {rid}", f"Description: {description}"]
    if column_heading:
        parts.append(f"Columns: {column_heading}")
    if logic:
        parts += ["", "Logic:", logic]
    if scenarios:
        parts += ["", "Scenarios:", scenarios]
    parts += ["", "## Verified CQL", "", "```", cql.strip(), "```"]
    if notes:
        parts += ["", "## Programmer note", notes]
    return "\n".join(parts) + "\n"


def save_verified(db, tenant_id: str, rid: str, description: str, column_heading: str, logic: str, scenarios: str,
                  cql: str, notes: str, by: str) -> dict:
    """Stores the pair as an approved report-scope source. A newer confirmation for the same report retires the earlier
    one, so the library holds one current version per report."""
    fname = f"{rid}_verified.md"
    old = [s for s in db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, scope="report", filename=fname).all()
           if s.scope_ref.lower() == rid.lower() and s.status != "retired"]
    r = ks.add_source(db, tenant_id, fname, _text(rid, description, column_heading, logic, scenarios, cql, notes).encode("utf-8"),
                      scope="report", scope_ref=rid, doc_type="history", title=f"{rid}: verified spec and CQL",
                      license_note="Confirmed by a programmer as a verified precedent.", created_by=by)
    if r["duplicate"]:
        return {"sourceId": r["sourceId"], "duplicate": True}
    src = ks.get_source(db, tenant_id, r["sourceId"])
    ks.set_status(db, src, "approved", by)
    for s in old:
        ks.set_status(db, s, "retired", by)
    db.commit()
    return {"sourceId": r["sourceId"], "duplicate": False, "chunks": r["chunks"], "retired": len(old)}
