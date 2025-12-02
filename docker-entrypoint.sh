#!/bin/bash
set -e

echo "Running migrations..."
python manage.py migrate --no-input

echo "Starting Daphne..."
exec daphne chatting.asgi:application -p 8000 -b 0.0.0.0