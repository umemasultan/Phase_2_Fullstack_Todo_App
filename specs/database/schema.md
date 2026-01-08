# Database Schema - Todo Application

**Version**: 1.0.0
**Created**: 2026-01-08
**Database**: Neon PostgreSQL (Serverless)

## Overview

This document defines the database schema for the hackathon-todo application. The schema supports a user-based task management system where each user can create and manage their own tasks.

## Entity-Relationship Diagram

```
User (1) ──< (N) Task
```

- One user can have many tasks
- Each task belongs to exactly one user

## Tables

### users

Stores user account information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX idx_users_email ON users(email)`

**Constraints:**
- Email must be unique
- Email must be valid format (enforced at application level)

### tasks

Stores user tasks/todos.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique task identifier |
| user_id | INTEGER | FOREIGN KEY → users(id), NOT NULL | Owner of the task |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | NULL | Optional task description |
| completed | BOOLEAN | NOT NULL, DEFAULT FALSE | Task completion status |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Task creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_tasks_user_id ON tasks(user_id)`
- `INDEX idx_tasks_completed ON tasks(completed)`
- `INDEX idx_tasks_created_at ON tasks(created_at DESC)`

**Foreign Keys:**
- `user_id` REFERENCES `users(id)` ON DELETE CASCADE

**Constraints:**
- Title must not be empty (min length 1)
- User must exist (foreign key constraint)

## Data Types Rationale

- **INTEGER for IDs**: Simple, efficient, sufficient for expected scale
- **VARCHAR(255) for email/title**: Standard length for these fields
- **TEXT for description**: Allows unlimited length for detailed descriptions
- **BOOLEAN for completed**: Clear binary state
- **TIMESTAMP for dates**: Includes date and time with timezone support

## Cascade Behavior

- **ON DELETE CASCADE**: When a user is deleted, all their tasks are automatically deleted
- This ensures referential integrity and prevents orphaned tasks

## Indexes Strategy

1. **Primary Keys**: Automatic indexes for fast lookups
2. **Foreign Keys**: Index on `tasks.user_id` for efficient user task queries
3. **Completed Status**: Index for filtering completed/incomplete tasks
4. **Created Date**: Descending index for sorting tasks by creation date

## Query Patterns

Common queries this schema optimizes for:

1. **Get all tasks for a user**:
   ```sql
   SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC;
   ```
   - Uses `idx_tasks_user_id` and `idx_tasks_created_at`

2. **Get incomplete tasks for a user**:
   ```sql
   SELECT * FROM tasks WHERE user_id = ? AND completed = FALSE;
   ```
   - Uses `idx_tasks_user_id` and `idx_tasks_completed`

3. **Find user by email**:
   ```sql
   SELECT * FROM users WHERE email = ?;
   ```
   - Uses `idx_users_email`

## Migration Strategy

- Use Alembic for all schema changes
- Initial migration creates both tables
- Future migrations will be versioned and reversible

## Security Considerations

- Email addresses are sensitive PII - handle with care
- No passwords stored in this schema (authentication handled separately)
- Row-level security: Users can only access their own tasks (enforced at application level)

## Future Enhancements (Not in v1.0)

- Task priority field
- Task due dates
- Task tags/categories
- Task sharing between users
- Soft deletes (deleted_at column)
