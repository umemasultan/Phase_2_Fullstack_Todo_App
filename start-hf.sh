#!/bin/bash

# Start script for Hugging Face Spaces
echo "Starting Hackathon Todo Application..."

# Start backend in background
echo "Starting FastAPI backend on port 8000..."
cd /app/backend && python main.py &

# Wait for backend to be ready
echo "Waiting for backend to start..."
sleep 5

# Start frontend
echo "Starting Next.js frontend on port 7860..."
cd /app/frontend && npm start -- -p 7860
