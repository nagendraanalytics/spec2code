import json

import pytest

import logic_understanding_agent as agent


def test_list_passes_through():
    out = agent._sanitize_understanding({"logic_steps": [{"step_number": 1, "explanation": "a", "inferred": False}]})
    assert out["logic_steps"][0]["explanation"] == "a" and out["assumptions"] == []


def test_json_string_steps_are_decoded():
    steps = json.dumps([{"step_number": 1, "explanation": "a", "inferred": True}])
    assert agent._sanitize_understanding({"logic_steps": steps})["logic_steps"][0]["inferred"] is True


def test_wrapped_and_bare_string_steps():
    out = agent._sanitize_understanding({"logic_steps": {"steps": ["first", "second"]}, "assumptions": '["x"]'})
    assert [s["step_number"] for s in out["logic_steps"]] == [1, 2]
    assert out["assumptions"] == ["x"]


@pytest.mark.parametrize("bad", [None, [], "", "not json", {"a": 1, "b": 2}, [{"explanation": ""}]])
def test_unusable_steps_still_fail_with_detail(bad):
    with pytest.raises(agent.AgentError) as e:
        agent._sanitize_understanding({"logic_steps": bad})
    assert "logic_steps" in str(e.value)


def test_leaked_parameter_markup_is_recovered():
    """Model emitted its tool-call markup as text inside logic_steps, with a
    sibling field stuffed into the same string."""
    leaked = (
        '\n<parameter name="logic_steps">[{"step_number": 1, "explanation": '
        '"Gather each subject\'s AE/VAE records.", "inferred": false}, '
        '{"step_number": 2, "explanation": "Pair overlapping events.", "inferred": true}]\n'
        '</parameter>\n<parameter name="assumptions">["Ongoing events have no end date"]'
    )
    out = agent._sanitize_understanding({"summary": "s", "logic_steps": leaked})
    assert [s["step_number"] for s in out["logic_steps"]] == [1, 2]
    assert out["logic_steps"][1]["inferred"] is True
    assert out["assumptions"] == ["Ongoing events have no end date"]


def test_leaked_markup_in_other_field():
    leaked = '<parameter name="logic_steps">[{"explanation": "Only step"}]'
    out = agent._sanitize_understanding({"summary": leaked, "logic_steps": ""})
    assert out["logic_steps"][0]["explanation"] == "Only step"
