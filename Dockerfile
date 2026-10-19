# =========================================================================
# Stage 1 — Python deps
# =========================================================================
FROM python:3.12-slim AS builder

WORKDIR /install

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install/pkg -r requirements.txt

# =========================================================================
# Stage 2 — Build the Next.js static frontend (output: "export" → /fe/out)
# =========================================================================
FROM node:22-alpine AS frontend
WORKDIR /fe

COPY frontend-nextjs/package.json frontend-nextjs/package-lock.json ./
RUN npm ci

COPY frontend-nextjs/ ./
# lib/api.ts defaults API_BASE to "" → all fetches are same-origin.
# No NEXT_PUBLIC_API_BASE needed; the FastAPI server serves both
# the static files and /api/* from the same origin.
RUN npm run build

# =========================================================================
# Stage 3 — Runtime
# =========================================================================
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /install/pkg /usr/local
COPY . .

# Ship the built Next.js export as the new static root.
# main.py:1484 already mounts StaticFiles(directory="static", html=True),
# so this replaces the old vanilla UI with the v2 UI without code change.
COPY --from=frontend /fe/out /app/static

RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8002

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8002/ || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
