# hackathon-todo Constitution

**Project Name**: hackathon-todo
**Type**: Full-stack Todo Application (Monorepo)
**Created**: 2026-01-08
**Status**: Active Development

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Server Actions
- **HTTP Client**: Native fetch with Next.js
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLModel
- **Database**: Neon PostgreSQL (Serverless)
- **Authentication**: JWT (python-jose)
- **Validation**: Pydantic (built into FastAPI)
- **Testing**: pytest + httpx
- **Linting**: ruff + black

### Infrastructure
- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **Deployment**: TBD (Vercel for frontend, Railway/Render for backend)
- **Version Control**: Git + GitHub

## Core Principles

### I. Type Safety First
- Use TypeScript for frontend with strict mode enabled
- Use Python type hints for backend with mypy validation
- Define explicit types for all API contracts
- Validate all input data with schemas (Zod, Pydantic)
- No `any` types in TypeScript; use `unknown` when type is uncertain

### II. API-First Design
- Define API contracts before implementation
- Document all endpoints in `specs/api/`
- Use OpenAPI/Swagger for API documentation
- Backend implements contracts, frontend consumes them
- Contract testing to ensure compliance

### III. Test-Driven Development (NON-NEGOTIABLE)
- Write tests before implementation
- Unit tests: >80% coverage for business logic
- Integration tests: Test API endpoints and database operations
- E2E tests: Test critical user flows
- Red-Green-Refactor cycle strictly enforced

### IV. Security by Default
- Validate and sanitize all user input
- Use parameterized queries (SQLModel handles this)
- Implement JWT authentication with refresh tokens
- Never log sensitive data (passwords, tokens, PII)
- Use environment variables for secrets
- Enforce HTTPS in production

### V. Performance Standards
- Frontend: Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)
- Backend: API response time p95 <200ms
- Database: Optimize queries with indexes
- Use connection pooling for database
- Implement caching for frequently accessed data

### VI. Code Quality
- Zero linting errors before commit
- Consistent code formatting (Prettier, Black)
- Code review required for all changes
- Document complex logic, not obvious code
- Follow separation of concerns

## Development Workflow

### Feature Development Process
1. Create feature spec in `specs/features/<feature-name>/spec.md`
2. Define API contract in `specs/api/`
3. Create implementation plan in `specs/features/<feature-name>/plan.md`
4. Generate tasks in `specs/features/<feature-name>/tasks.md`
5. Implement backend first (API + database)
6. Implement frontend (UI + API integration)
7. Write tests (unit + integration)
8. Code review and merge

### Git Workflow
- **Branch Naming**: `feature/<feature-name>`, `fix/<bug-name>`
- **Commit Messages**: Conventional commits (feat, fix, docs, chore, test, refactor)
- **Pull Requests**: Required for all changes to main
- **Code Review**: At least one approval required
- **CI/CD**: All tests must pass before merge

### Code Standards

#### Frontend (Next.js + TypeScript)
```typescript
// Use functional components with TypeScript
interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoItem({ id, title, completed }: TodoProps) {
  // Component logic
}

// Use Server Actions for mutations
'use server'
export async function createTodo(formData: FormData) {
  // Server action logic
}
```

#### Backend (FastAPI + SQLModel)
```python
# Use SQLModel for models
from sqlmodel import SQLModel, Field

class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    completed: bool = Field(default=False)
    user_id: int = Field(foreign_key="user.id")

# Use FastAPI dependency injection
@app.get("/api/v1/todos")
async def get_todos(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todos = db.exec(select(Todo).where(Todo.user_id == current_user.id)).all()
    return todos
```

## Database Standards
- **Migrations**: Use Alembic for all schema changes
- **Naming**: Tables (plural, lowercase), columns (snake_case)
- **Timestamps**: Include `created_at` and `updated_at` for all tables
- **Indexes**: Index foreign keys and frequently queried columns
- **Normalization**: Follow 3NF principles

## API Standards
- **Versioning**: `/api/v1/` prefix for all endpoints
- **HTTP Methods**: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- **Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)
- **Error Format**: Consistent JSON error responses with code, message, and details

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:3000
```

## Non-Goals
- Mobile app development (web-only)
- Real-time collaboration (WebSockets)
- Offline support (PWA)
- Multi-tenancy
- Advanced analytics

## Governance
- Constitution supersedes all other practices
- Amendments require documentation and approval
- All PRs must verify compliance with constitution
- Complexity must be justified with ADRs

**Version**: 1.0.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
