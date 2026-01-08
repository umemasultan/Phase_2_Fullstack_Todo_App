#!/bin/bash

# Production Startup Script for Hackathon Todo Application
# This script builds the frontend and starts the full-stack application

set -e  # Exit on error

echo "=========================================="
echo "  Hackathon Todo - Production Startup"
echo "=========================================="
echo ""

# Check if we're in the correct directory
if [ ! -f "backend/main.py" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Step 1: Build Frontend
echo "Step 1/3: Building frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
echo "Building Next.js application..."
npm run build
cd ..
echo "✓ Frontend built successfully"
echo ""

# Step 2: Check Backend Dependencies
echo "Step 2/3: Checking backend dependencies..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
if [ -f "venv/Scripts/activate" ]; then
    # Windows
    source venv/Scripts/activate
else
    # Unix/Mac
    source venv/bin/activate
fi

echo "Installing backend dependencies..."
pip install -q -r requirements.txt
cd ..
echo "✓ Backend dependencies ready"
echo ""

# Step 3: Start Application
echo "Step 3/3: Starting application..."
echo ""
echo "=========================================="
echo "  Application Starting"
echo "=========================================="
echo ""
echo "Frontend: Served by FastAPI"
echo "Backend API: http://localhost:8001/api"
echo "Health Check: http://localhost:8001/api/v1/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd backend
python main.py
