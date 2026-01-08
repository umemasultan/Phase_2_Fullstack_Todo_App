# Hackathon Todo Backend

FastAPI backend for the Hackathon Todo application.

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLModel
- **Database**: Neon PostgreSQL
- **Authentication**: JWT

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── src/
│   ├── api/            # API routes and endpoints
│   ├── models/         # SQLModel database models
│   ├── services/       # Business logic layer
│   └── core/           # Core configuration and database
├── tests/              # Test files
├── main.py             # Application entry point
├── requirements.txt    # Python dependencies
└── pyproject.toml      # Project configuration
```

## Development

Run tests:
```bash
pytest
```

Run linter:
```bash
ruff check .
```

Format code:
```bash
black .
```

Type check:
```bash
mypy src/
```
