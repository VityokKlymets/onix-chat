# Use Python 3.11.13 base image
FROM python:3.11.13-slim

ENV DJANGO_SETTINGS_MODULE=chatting.settings
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /

# Install system dependencies (optional but common)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

# Expose port
EXPOSE 8000


ENTRYPOINT ["/docker-entrypoint.sh"]
