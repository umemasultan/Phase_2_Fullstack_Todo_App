# Backend Workspace - Claude Code Rules

**Workspace:** backend
**Type:** API Service
**Parent:** hackathon-todo monorepo

## Overview

This workspace contains the backend API service for the hackathon-todo project. All development in this workspace must follow the root-level Spec-Kit Plus conventions defined in `../CLAUDE.md`.

## Workspace-Specific Guidelines

### 1. Technology Stack
- **Runtime**: Python 3.11+
- **Framework**: FastAPI
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: SQLModel
- **Authentication**: JWT (python-jose)
- **Validation**: Pydantic (built into FastAPI)
- **Testing**: pytest + httpx
- **Linting**: ruff + black

### 2. Project Structure
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
├── pyproject.toml      # Project configuration (ruff, black, mypy)
├── .env.example        # Environment variables template
└── CLAUDE.md           # This file
```

### 3. Development Workflow

#### API Development
- All API contracts are defined in `../specs/api/`
- Follow RESTful conventions or GraphQL schema as specified
- Implement proper HTTP status codes (200, 201, 400, 401, 403, 404, 500, etc.)
- Version APIs appropriately (e.g., `/api/v1/`)
- Document all endpoints with OpenAPI/Swagger or equivalent

#### Database Management
- All schemas are defined in `../specs/database/`
- Use migrations for all schema changes (never modify database directly)
- Write reversible migrations with up/down scripts
- Test migrations in development before applying to production
- Maintain referential integrity and proper indexing

#### Business Logic
- Keep business logic in the service layer, not in controllers
- Controllers should be thin: validate input, call services, return responses
- Services should be testable in isolation
- Use dependency injection for better testability

#### Error Handling
- Implement centralized error handling middleware
- Use custom error classes for different error types
- Log errors with appropriate severity levels
- Never expose internal error details to clients
- Return consistent error response format

### 4. Testing Strategy

#### Unit Tests
- Test individual functions and methods in isolation
- Mock external dependencies (database, external APIs, etc.)
- Aim for high coverage of business logic (>80%)
- Test edge cases and error conditions

#### Integration Tests
- Test API endpoints with real database (test database)
- Test authentication and authorization flows
- Test database transactions and rollbacks
- Verify error handling and validation

#### E2E Tests
- E2E tests are maintained at the root level
- Coordinate with frontend team for full-stack testing

### 5. Code Quality

#### Type Safety
- Use static typing where available (TypeScript, Python type hints, Go types)
- Define explicit types for request/response payloads
- Validate input data with schemas (Zod, Pydantic, etc.)

#### Linting and Formatting
- Follow language-specific linting standards (ESLint, pylint, golangci-lint)
- Use consistent formatting (Prettier, Black, gofmt)
- Run linters before committing

#### Performance
- Optimize database queries (use indexes, avoid N+1 queries)
- Implement caching where appropriate (Redis, in-memory)
- Use connection pooling for database connections
- Monitor API response times and set SLOs

### 6. Security

#### Authentication & Authorization
- Implement secure authentication (bcrypt for passwords, secure JWT)
- Use role-based access control (RBAC) or attribute-based access control (ABAC)
- Validate and sanitize all user input
- Implement rate limiting to prevent abuse

#### Data Protection
- Never log sensitive data (passwords, tokens, PII)
- Use environment variables for secrets (never commit to git)
- Encrypt sensitive data at rest and in transit
- Implement proper CORS policies
- Use parameterized queries to prevent SQL injection

#### API Security
- Implement CSRF protection for state-changing operations
- Use HTTPS only (enforce in production)
- Validate Content-Type headers
- Implement request size limits
- Follow OWASP API Security Top 10

### 7. Observability

#### Logging
- Use structured logging (JSON format)
- Log levels: DEBUG, INFO, WARN, ERROR, FATAL
- Include request IDs for tracing
- Log all authentication attempts
- Never log sensitive information

#### Monitoring
- Track API response times (p50, p95, p99)
- Monitor error rates and types
- Track database query performance
- Set up alerts for anomalies

#### Metrics
- Request count by endpoint
- Response time by endpoint
- Error rate by type
- Database connection pool usage

### 8. Database Guidelines

#### Schema Design
- Use appropriate data types
- Define primary keys and foreign keys
- Create indexes for frequently queried columns
- Normalize data appropriately (avoid over-normalization)
- Document schema decisions in `../specs/database/`

#### Migrations
- One migration per logical change
- Test migrations on a copy of production data
- Include rollback scripts
- Version migrations sequentially
- Never modify existing migrations after deployment

#### Queries
- Use ORM/query builder for complex queries
- Optimize with EXPLAIN/ANALYZE
- Avoid SELECT * (specify columns)
- Use transactions for multi-step operations
- Implement proper error handling for database operations

### 9. PHR Routing for Backend

When creating Prompt History Records for backend work:
- Backend-specific features → `../history/prompts/backend-<feature>/`
- Cross-workspace features → `../history/prompts/<feature-name>/`
- General backend work → `../history/prompts/general/`

### 10. Specifications Reference

- **Feature Specs**: `../specs/features/` - Business requirements
- **API Contracts**: `../specs/api/` - API endpoints and contracts (source of truth)
- **Database Schemas**: `../specs/database/` - Data models and relationships
- **UI Specs**: `../specs/ui/` - Frontend requirements (for context)

### 11. Common Commands

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server (http://localhost:8000)
python main.py
# Or with uvicorn directly:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest

# Run tests with coverage
pytest --cov=src

# Run linter
ruff check .

# Format code
black .

# Type check
mypy src/

# Run database migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"
```

### 12. Environment Variables

Always use `.env` files for configuration:
- `.env.example` - Template with all required variables (commit to git)
- `.env` - Actual values (never commit to git, add to .gitignore)
- `.env.test` - Test environment configuration
- `.env.production` - Production configuration (managed by deployment)

Required variables (example):
```
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-key
API_PORT=3000
NODE_ENV=development
```

## Reference

For general Spec-Kit Plus conventions, PHR creation, ADR suggestions, and architectural guidelines, see `../CLAUDE.md`.
