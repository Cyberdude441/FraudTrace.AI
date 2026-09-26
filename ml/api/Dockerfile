# FraudTrace AI ML Inference Service Container
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY ml/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy ML package and API code
COPY ml /app/ml

ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["uvicorn", "ml.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
