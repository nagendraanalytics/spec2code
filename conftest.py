"""pytest setup: a fake enterprise-LLM configuration so the suite sees the model as 'configured'.
No test calls a real model (agents are stubbed or enterprise_llm.complete is patched); these values are never sent anywhere."""
import os

for _k, _v in dict(
    GENAI_TOKEN_URL="https://login.example.invalid/token", GENAI_AUTH_CLIENT_ID="test-app", GENAI_AUTH_CLIENT_SECRET="test-secret",
    GENAI_SCOPE="api://test/.default", GENAI_BASE_URL="https://genai.example.invalid/api/v1", GENAI_CLIENT_ID="test-client",
    GENAI_ENGINE_ID="test-engine", GENAI_MODEL_ID="test-model",
).items():
    os.environ.setdefault(_k, _v)
