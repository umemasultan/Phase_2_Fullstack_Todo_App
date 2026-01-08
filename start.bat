@echo off
REM Production Startup Script for Hackathon Todo Application
REM This script builds the frontend and starts the full-stack application

echo ==========================================
echo   Hackathon Todo - Production Startup
echo ==========================================
echo.

REM Check if we're in the correct directory
if not exist "backend\main.py" (
    echo Error: Please run this script from the project root directory
    exit /b 1
)

REM Step 1: Build Frontend
echo Step 1/3: Building frontend...
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)
echo Building Next.js application...
call npm run build
cd ..
echo [32m✓ Frontend built successfully[0m
echo.

REM Step 2: Check Backend Dependencies
echo Step 2/3: Checking backend dependencies...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -q -r requirements.txt
cd ..
echo [32m✓ Backend dependencies ready[0m
echo.

REM Step 3: Start Application
echo Step 3/3: Starting application...
echo.
echo ==========================================
echo   Application Starting
echo ==========================================
echo.
echo Frontend: Served by FastAPI
echo Backend API: http://localhost:8002/api
echo Health Check: http://localhost:8002/api/v1/health
echo.
echo Press Ctrl+C to stop the server
echo.

cd backend
python main.py
