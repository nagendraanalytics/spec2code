from dataclasses import dataclass


@dataclass(frozen=True)
class ModelConfig:
    model_name: str
    temperature: float
    max_tokens: int


PRODUCTION_MODEL = ModelConfig(
    model_name="claude-sonnet-4-6",
    temperature=0.0,
    max_tokens=4096,
)

ZDR_REQUIRED = True

PIPELINE_STAGES = ("reading", "logic_understanding", "code_generation")

REVIEWER_ROLES = ("programmer", "statistician", "qa", "lead")