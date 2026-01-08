from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os
from src.core.config import settings
from src.core.database import create_db_and_tables
from src.api.auth import router as auth_router
from src.api.tasks import router as tasks_router

# Create database tables on startup
create_db_and_tables()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="A full-stack todo application API",
)

# Configure CORS - allow all origins for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth_router)
app.include_router(tasks_router)


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@app.get("/api")
async def root():
    """Root API endpoint"""
    return {
        "message": "Hackathon Todo API",
        "version": settings.APP_VERSION,
        "status": "healthy",
        "docs": "/api/docs",
        "health": "/api/v1/health"
    }

# Mangum handler for Vercel
handler = Mangum(app)
