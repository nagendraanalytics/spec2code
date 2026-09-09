"""
fix_graph_file.py — run this directly: `python fix_graph_file.py`

This does NOT ask you to copy a file anywhere. It finds the EXACT file
your Python is actually importing for orchestration.graph -- wherever
that really is, even if it's not the path you think you're editing --
and tells you definitively whether it's stale, live.

Run this from the SAME directory / SAME virtual environment you use
to actually start the server (same as `uvicorn main:app` or however
you run it), or the "real" file it finds may not match what the
server itself loads.
"""

import importlib
import inspect
import sys

print("=" * 70)
print("Python executable actually running this script:")
print(" ", sys.executable)
print()

try:
    import orchestration.graph as g
except Exception as e:
    print(f"FATAL: could not import orchestration.graph at all: {type(e).__name__}: {e}")
    print("This means Python can't find the orchestration package from here --")
    print("run this script from your project root (C:\\projects\\cdm-spec-to-cql),")
    print("in the same virtual environment the server uses.")
    sys.exit(1)

real_path = g.__file__
print("The REAL file Python is loading for orchestration.graph:")
print(" ", real_path)
print()

sig = inspect.signature(g.run_generation_pipeline)
has_param = "supporting_doc" in sig.parameters
print("Current run_generation_pipeline signature:")
print(" ", sig)
print()

if has_param:
    print("RESULT: This file is already CORRECT -- it has supporting_doc.")
    print("If the server is still erroring, the server process itself is")
    print("running from a DIFFERENT Python / different working directory")
    print("than this script just used. Compare 'sys.executable' above")
    print("against how you actually start the server.")
else:
    print("RESULT: CONFIRMED STALE. This exact file is missing supporting_doc.")
    print(f"Fixing it directly at: {real_path}")
    with open(real_path, "r", encoding="utf-8") as f:
        content = f.read()

    old_sig = 'def run_generation_pipeline(spec: dict, spec_id: str, tenant_id: str = "default", force_generate: bool = True, precedent_store=None, study_metadata_lookup: dict = None, learned_patterns: list = None) -> PipelineState:'
    new_sig = 'def run_generation_pipeline(spec: dict, spec_id: str, tenant_id: str = "default", force_generate: bool = True, precedent_store=None, study_metadata_lookup: dict = None, learned_patterns: list = None, supporting_doc: list = None) -> PipelineState:'

    old_state_key = '"_learned_patterns": learned_patterns,\n    }'
    new_state_key = '"_learned_patterns": learned_patterns,\n        "_supporting_doc": supporting_doc,\n    }'

    if old_sig not in content:
        print()
        print("Could not find the expected old signature text to patch automatically.")
        print("This file's content doesn't match what was expected at all -- paste")
        print("the full content of this exact file path back, and it'll be fixed by hand:")
        print(" ", real_path)
        sys.exit(1)

    content = content.replace(old_sig, new_sig)
    content = content.replace(old_state_key, new_state_key)

    with open(real_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Patched successfully. Re-checking...")
    importlib.reload(g)
    new_sig_check = inspect.signature(g.run_generation_pipeline)
    if "supporting_doc" in new_sig_check.parameters:
        print("CONFIRMED FIXED:", new_sig_check)
    else:
        print("Patch did not take effect on reload -- restart Python entirely and re-run this script to confirm.")

print("=" * 70)
