FROM python:3.13-slim

WORKDIR /app

# Create a non-root group and user
RUN groupadd --system appgroup \
    && useradd --system --gid appgroup appuser

# Copy dependency file first for better layer caching
COPY requirements.txt .

# Install dependencies as root
RUN pip install -r requirements.txt

# Copy application source
COPY ./app /app/app

ENV APP_ENV=production \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

EXPOSE 8000

HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=10s \
    --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=2)"

USER appuser

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]