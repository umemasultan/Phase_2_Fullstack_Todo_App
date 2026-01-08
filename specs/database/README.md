# Database Specifications

This directory contains database schemas, data models, and migration documentation for the hackathon-todo application.

## Purpose

Database specifications define the data structure, relationships, and constraints for the application. This serves as the source of truth for backend implementation.

## Structure

```
database/
├── README.md           # This file
├── schema.md           # Overall database schema documentation
├── models/             # Individual model documentation
│   ├── users.md
│   ├── todos.md
│   └── tags.md
└── migrations/         # Migration documentation
    └── migration-log.md
```

## Schema Documentation Guidelines

### 1. Entity-Relationship Diagram (ERD)

Include a visual or textual representation of relationships:
```
User (1) ──< (N) Todo
Todo (N) ──< (N) Tag
```

### 2. Table Definitions

For each table, document:
- **Table Name**: `users`, `todos`, `tags`
- **Columns**: Name, type, constraints, default values
- **Primary Key**: Which column(s)
- **Foreign Keys**: References to other tables
- **Indexes**: For performance optimization
- **Constraints**: UNIQUE, NOT NULL, CHECK, etc.

Example:
```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);
```

### 3. Data Types

Choose appropriate data types:
- **IDs**: UUID, BIGINT, or INT
- **Strings**: VARCHAR(n), TEXT
- **Numbers**: INT, BIGINT, DECIMAL, FLOAT
- **Booleans**: BOOLEAN
- **Dates**: DATE, TIMESTAMP, TIMESTAMPTZ
- **JSON**: JSON, JSONB (PostgreSQL)

### 4. Relationships

Document relationships clearly:
- **One-to-One**: User ↔ Profile
- **One-to-Many**: User → Todos
- **Many-to-Many**: Todos ↔ Tags (via junction table)

### 5. Normalization

- Follow normalization principles (1NF, 2NF, 3NF)
- Document denormalization decisions (for performance)
- Explain trade-offs

## Migration Guidelines

### 1. Migration Naming

Use descriptive names with timestamps:
- `20260108_create_users_table.sql`
- `20260108_add_priority_to_todos.sql`

### 2. Migration Content

Each migration should:
- Be reversible (include rollback script)
- Be idempotent (safe to run multiple times)
- Include comments explaining the change
- Test on a copy of production data

### 3. Migration Log

Document all migrations in `migrations/migration-log.md`:
- Date applied
- Description
- Author
- Related feature/ticket

## Data Integrity

### 1. Constraints

- Use NOT NULL for required fields
- Use UNIQUE for unique values
- Use CHECK for value validation
- Use FOREIGN KEY for referential integrity

### 2. Cascading

Define cascade behavior:
- `ON DELETE CASCADE`: Delete related records
- `ON DELETE SET NULL`: Set foreign key to NULL
- `ON DELETE RESTRICT`: Prevent deletion if references exist

### 3. Validation

- Database-level validation (constraints)
- Application-level validation (before insert/update)
- Document which validation happens where

## Performance Considerations

### 1. Indexes

- Index foreign keys
- Index frequently queried columns
- Avoid over-indexing (impacts write performance)
- Use composite indexes for multi-column queries

### 2. Query Optimization

- Use EXPLAIN/ANALYZE to profile queries
- Avoid N+1 queries
- Use pagination for large result sets
- Consider materialized views for complex queries

## Security

- Never store passwords in plain text (use bcrypt, argon2)
- Encrypt sensitive data at rest
- Use parameterized queries to prevent SQL injection
- Implement row-level security if needed
