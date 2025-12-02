# Use Python 3.11.13 base image
FROM python:3.11.13-slim

ENV DJANGO_SETTINGS_MODULE=chatting.settings
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt

# Copy Django project
COPY . /

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 8000


ENTRYPOINT ["/docker-entrypoint.sh"]
