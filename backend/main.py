from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
from pathlib import Path
from src.core.config import settings
from src.core.database import create_db_and_tables
from src.api.auth import router as auth_router
from src.api.tasks import router as tasks_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup: Create database tables (for development only)
    # In production, use Alembic migrations instead
    if settings.DEBUG:
        print("Creating database tables...")
        create_db_and_tables()
        print("Database tables created successfully")
    yield
    # Shutdown: cleanup if needed
    print("Shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="A full-stack todo application API",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend static files
# Get the correct path to frontend/out directory
backend_dir = Path(__file__).parent
project_root = backend_dir.parent
frontend_path = project_root / "frontend" / "out"

# Mount static files FIRST (CSS, JS, images, etc.)
if frontend_path.exists():
    app.mount("/_next", StaticFiles(directory=str(frontend_path / "_next")), name="next-static")
    print(f"[OK] Frontend static files mounted from: {frontend_path}")
else:
    print(f"[ERROR] Frontend not found at: {frontend_path}")

# Include API routers
app.include_router(auth_router)
app.include_router(tasks_router)


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# Serve frontend HTML pages (must be LAST to not override API routes)
@app.get("/")
async def serve_root():
    """Serve root - either frontend or API info"""
    index_path = frontend_path / "index.html"
    if index_path.exists() and index_path.is_file():
        return FileResponse(index_path)
    else:
        return {
            "message": "Hackathon Todo API",
            "version": settings.APP_VERSION,
            "status": "healthy",
            "note": "Frontend not built. Run 'npm run build' in frontend directory."
        }


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve frontend for all other non-API routes"""
    # Skip API routes
    if full_path.startswith("api"):
        return {"error": "Not found"}, 404

    # If frontend doesn't exist, return error
    if not frontend_path.exists():
        return {"error": "Frontend not built"}, 404

    # Try to serve the specific file first
    file_path = frontend_path / full_path
    if file_path.is_file():
        return FileResponse(file_path)

    # Try with .html extension
    html_path = frontend_path / f"{full_path}.html"
    if html_path.is_file():
        return FileResponse(html_path)

    # Try index.html in the directory
    index_path = frontend_path / full_path / "index.html"
    if index_path.is_file():
        return FileResponse(index_path)

    # Default to root index.html (for SPA routing)
    return FileResponse(frontend_path / "index.html")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8002,
        reload=True
    )
