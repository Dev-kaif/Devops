# Dockerfile Practice Task 5 — Debug a Broken FastAPI Image

You are given a FastAPI backend.

## Project structure

```text
analytics-api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes/
│   │   └── analytics.py
│   └── services/
│       └── report.py
├── requirements.txt
├── requirements-dev.txt
├── .env
├── .git/
├── .venv/
├── __pycache__/
├── tests/
├── reports/
└── README.md
```

`app/main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}
```

`requirements.txt`:

```text
fastapi==0.116.0
uvicorn==0.35.0
pandas==2.3.0
```

`requirements-dev.txt`:

```text
-r requirements.txt
pytest==8.4.0
ruff==0.12.0
```

The API should run as:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## The broken Dockerfile

A junior developer wrote:

```dockerfile
FROM python:latest

WORKDIR /app

COPY . .

RUN pip install -r requirements-dev.txt

ENV APP_ENV=production

EXPOSE 80

USER nobody

HEALTHCHECK --interval=30s \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "main:app", "--port", "8000"]
```

Your job is to replace it with a production-oriented Dockerfile.

## Production requirements

The final image must use Python `3.13` on a slim Debian-based image. Do not use `latest`.

Install only production dependencies from:

```text
requirements.txt
```

Do not install:

```text
pytest
ruff
```

Optimize Docker layer caching. If only:

```text
app/routes/analytics.py
```

changes, dependency installation should remain cached.

The final image must not contain:

```text
.env
.git/
.venv/
__pycache__/
tests/
reports/
README.md
requirements-dev.txt
```

The app must run as a non-root user. Unlike the previous Node task, assume the Python image does **not** provide the application user you want. Create:

```text
user  → appuser
group → appgroup
```

The application files under:

```text
/app
```

must be readable by `appuser`.

Do not install:

```text
curl
wget
```

Add a health check for:

```text
http://localhost:8000/health
```

Use:

```text
interval     → 30s
timeout      → 3s
start period → 10s
retries      → 3
```

Use only the Python standard library for the health check.

Set:

```text
PYTHONDONTWRITEBYTECODE=1
PYTHONUNBUFFERED=1
APP_ENV=production
```

Document container port:

```text
8000
```

Run:

```text
uvicorn app.main:app
```

with:

```text
host → 0.0.0.0
port → 8000
```

Use exec-form `CMD`.

## Runtime requirements

Build image:

```text
analytics-api:5.0
```

Run container:

```text
detached mode
container name → analytics-api-prod

host port 9800
      ↓
container port 8000
```

Verify:

```bash
curl localhost:9800/health
```

Expected:

```json
{ "status": "ok" }
```

## Your deliverables

Send:

```text
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```
