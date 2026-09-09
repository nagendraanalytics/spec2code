from spec2code_audit import repository, identifier_registry
from spec2code_audit.pipeline_hooks import run_stage_with_audit, request_programmer_review, submit_programmer_review


def fake_claude_call(masked_spec_text):
    return "def derive_endpoint():\n    return STUDY_A_result"


raw_spec = "Study ACME-401 evaluates compound Xylocaprine for the primary efficacy endpoint derivation."

run_id = run_stage_with_audit(
    raw_spec_text=raw_spec,
    domain="ADaM",
    pipeline_stage="code_generation",
    prompt_template_name="code_generation_v1",
    prompt_template_version="1.0.0",
    prompt_template_text="Generate ADaM derivation code for: {spec}",
    call_model_fn=fake_claude_call,
    actor="nagendra",
    study_key="TEST-STUDY",
)
print("Run created:", run_id)
print("Deployable before review:", repository.is_run_deployable(run_id))

assignment_id = request_programmer_review(run_id, assigned_to="nagendra", assigned_by="pipeline")

token_map = {"STUDY_A": "ACME-401"}
submit_programmer_review(
    run_id,
    reviewer="nagendra",
    approved=True,
    final_code_masked="def derive_endpoint():\n    return STUDY_A_result",
    token_map=token_map,
    checklist_results={
        "logic_correctness": True,
        "cdisc_conformance": True,
        "no_proprietary_leak": True,
        "syntax_safety": True,
        "edge_case_handling": True,
    },
    assignment_id=assignment_id,
)

print("Deployable after review:", repository.is_run_deployable(run_id))
print("Final code:", repository.get_final_code(run_id))