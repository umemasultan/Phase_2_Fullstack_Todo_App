# Database Setup Guide

This guide walks you through setting up the Neon PostgreSQL database for the hackathon-todo application.

## Prerequisites

- Neon account (free tier available at https://neon.tech)
- Python 3.11+ with pip
- Backend dependencies installed (`pip install -r requirements.txt`)

## Step 1: Create Neon PostgreSQL Database

1. **Sign up for Neon** (if you haven't already):
   - Go to https://neon.tech
   - Sign up with GitHub, Google, or email

2. **Create a new project**:
   - Click "New Project"
   - Name: `hackathon-todo` (or your preferred name)
   - Region: Choose closest to your location
   - PostgreSQL version: 16 (recommended)

3. **Get your connection string**:
   - After creating the project, you'll see a connection string
   - Format: `postgresql://user:password@host/database?sslmode=require`
   - Copy this connection string

## Step 2: Configure Backend Environment

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Copy the environment template**:
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file**:
   ```bash
   # Open .env in your editor
   nano .env  # or code .env, vim .env, etc.
   ```

4. **Update the DATABASE_URL**:
   ```env
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```

   Replace with your actual Neon connection string from Step 1.

5. **Set other required variables**:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CORS_ORIGINS=http://localhost:3000
   DEBUG=True
   ```

## Step 3: Run Database Migrations

### Option A: Using Alembic (Recommended for Production)

1. **Run the initial migration**:
   ```bash
   alembic upgrade head
   ```

   This will create the `users` and `tasks` tables in your database.

2. **Verify migration**:
   ```bash
   alembic current
   ```

   You should see: `001 (head)`

### Option B: Auto-create Tables (Development Only)

If you have `DEBUG=True` in your `.env`, tables will be created automatically when you start the server:

```bash
python main.py
```

You'll see:
```
Creating database tables...
Database tables created successfully
```

## Step 4: Verify Database Setup

### Method 1: Using Neon Console

1. Go to your Neon project dashboard
2. Click "SQL Editor"
3. Run this query:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public';
   ```
4. You should see: `users` and `tasks`

### Method 2: Using psql

```bash
psql "postgresql://user:password@host/database?sslmode=require"
```

Then run:
```sql
\dt  -- List all tables
\d users  -- Describe users table
\d tasks  -- Describe tasks table
```

### Method 3: Using Python

Create a test script `test_db.py`:

```python
from sqlmodel import Session, select
from src.core.database import engine
from src.models import User, Task

# Test connection
with Session(engine) as session:
    # Try to query (will be empty initially)
    users = session.exec(select(User)).all()
    tasks = session.exec(select(Task)).all()
    print(f"Users: {len(users)}, Tasks: {len(tasks)}")
    print("✅ Database connection successful!")
```

Run it:
```bash
python test_db.py
```

## Step 5: Create Test Data (Optional)

Create a script `seed_db.py`:

```python
from sqlmodel import Session
from src.core.database import engine
from src.models import User, Task

with Session(engine) as session:
    # Create a test user
    user = User(email="test@example.com")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create test tasks
    task1 = Task(
        user_id=user.id,
        title="Buy groceries",
        description="Milk, eggs, bread",
        completed=False
    )
    task2 = Task(
        user_id=user.id,
        title="Write documentation",
        completed=True
    )

    session.add(task1)
    session.add(task2)
    session.commit()

    print(f"✅ Created user: {user.email}")
    print(f"✅ Created {2} tasks")
```

Run it:
```bash
python seed_db.py
```

## Troubleshooting

### Error: "connection refused"

**Problem**: Cannot connect to Neon database

**Solutions**:
1. Check your connection string is correct
2. Ensure `sslmode=require` is in the connection string
3. Verify your Neon project is active (not suspended)
4. Check your internet connection

### Error: "relation does not exist"

**Problem**: Tables haven't been created

**Solutions**:
1. Run migrations: `alembic upgrade head`
2. Or set `DEBUG=True` and restart the server
3. Check Alembic version table: `SELECT * FROM alembic_version;`

### Error: "password authentication failed"

**Problem**: Invalid credentials

**Solutions**:
1. Regenerate connection string in Neon dashboard
2. Copy the entire connection string (including password)
3. Ensure no extra spaces in `.env` file

### Error: "too many connections"

**Problem**: Connection pool exhausted

**Solutions**:
1. Check for connection leaks in your code
2. Reduce `pool_size` in `src/core/database.py`
3. Upgrade Neon plan for more connections

### Error: "SSL connection required"

**Problem**: Missing SSL mode

**Solutions**:
1. Add `?sslmode=require` to your connection string
2. Full format: `postgresql://user:pass@host/db?sslmode=require`

## Database Management Commands

### Create a new migration

After modifying models:
```bash
alembic revision --autogenerate -m "description of changes"
```

### Apply migrations

```bash
alembic upgrade head
```

### Rollback last migration

```bash
alembic downgrade -1
```

### View migration history

```bash
alembic history
```

### View current migration

```bash
alembic current
```

## Neon-Specific Features

### Branching (Development)

Neon supports database branching for development:

1. Create a branch in Neon dashboard
2. Get the branch connection string
3. Use it in your development `.env`

### Auto-suspend

Neon automatically suspends inactive databases:
- Free tier: After 5 minutes of inactivity
- Wakes up automatically on first query
- First query after wake may be slower

### Connection Pooling

Neon provides built-in connection pooling:
- Use the pooled connection string for better performance
- Format: `postgresql://user:pass@host/db?sslmode=require&pgbouncer=true`

## Security Best Practices

1. **Never commit `.env` file**:
   - Already in `.gitignore`
   - Use `.env.example` as template

2. **Rotate credentials regularly**:
   - Generate new password in Neon dashboard
   - Update `.env` file

3. **Use environment-specific databases**:
   - Development: Local or Neon branch
   - Staging: Separate Neon project
   - Production: Separate Neon project with backups

4. **Enable connection pooling**:
   - Reduces connection overhead
   - Better performance under load

## Next Steps

After setting up the database:

1. **Start the backend server**:
   ```bash
   python main.py
   ```

2. **Test the API**:
   - Visit http://localhost:8000/docs
   - Try the health check endpoint

3. **Implement API endpoints**:
   - Create CRUD operations for users
   - Create CRUD operations for tasks

4. **Connect the frontend**:
   - Update `frontend/.env.local` with API URL
   - Start building UI components

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [FastAPI Database Guide](https://fastapi.tiangolo.com/tutorial/sql-databases/)
