# Tasks API Specification

**Version**: 1.0.0
**Created**: 2026-01-08
**Base Path**: `/api/{user_id}/tasks`

## Overview

This document defines the Tasks API for the hackathon-todo application. All endpoints require JWT authentication and enforce user-level authorization.

## Authorization Rules

1. **JWT Required**: All endpoints require a valid JWT token in the Authorization header
2. **User Ownership**: The `user_id` in the URL must match the user_id from the JWT token
3. **Task Ownership**: Users can only access, modify, or delete their own tasks

## Endpoints

### GET /api/{user_id}/tasks

Get all tasks for a user.

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)

**Query Parameters:**
- `completed` (boolean, optional): Filter by completion status
- `limit` (integer, optional): Maximum number of tasks to return (default: 100)
- `offset` (integer, optional): Number of tasks to skip (default: 0)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2026-01-08T12:00:00Z",
    "updated_at": "2026-01-08T12:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Write documentation",
    "description": null,
    "completed": true,
    "created_at": "2026-01-08T11:00:00Z",
    "updated_at": "2026-01-08T13:00:00Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user

---

### POST /api/{user_id}/tasks

Create a new task.

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Validation:**
- `title`: Required, 1-255 characters
- `description`: Optional, max 1000 characters

**Response (201 Created):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2026-01-08T12:00:00Z",
  "updated_at": "2026-01-08T12:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user

---

### GET /api/{user_id}/tasks/{id}

Get a specific task by ID.

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)
- `id` (integer): Task ID

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2026-01-08T12:00:00Z",
  "updated_at": "2026-01-08T12:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user or task doesn't belong to user
- `404 Not Found`: Task not found

---

### PUT /api/{user_id}/tasks/{id}

Update a task (full update).

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)
- `id` (integer): Task ID

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread, chicken",
  "completed": false
}
```

**Validation:**
- `title`: Required, 1-255 characters
- `description`: Optional, max 1000 characters
- `completed`: Optional, boolean

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread, chicken",
  "completed": false,
  "created_at": "2026-01-08T12:00:00Z",
  "updated_at": "2026-01-08T14:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user or task doesn't belong to user
- `404 Not Found`: Task not found

---

### DELETE /api/{user_id}/tasks/{id}

Delete a task.

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)
- `id` (integer): Task ID

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (204 No Content):**
No response body.

**Error Responses:**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user or task doesn't belong to user
- `404 Not Found`: Task not found

---

### PATCH /api/{user_id}/tasks/{id}/complete

Toggle task completion status.

**Path Parameters:**
- `user_id` (integer): User ID (must match JWT user)
- `id` (integer): Task ID

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "created_at": "2026-01-08T12:00:00Z",
  "updated_at": "2026-01-08T14:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id doesn't match JWT user or task doesn't belong to user
- `404 Not Found`: Task not found

---

## Common Error Response Format

All error responses follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

## Authorization Flow

```
1. Client sends request with JWT token in Authorization header
2. Backend extracts and verifies JWT token
3. Backend extracts user_id from JWT payload
4. Backend compares JWT user_id with URL user_id
5. If match: proceed with request
6. If no match: return 403 Forbidden
```

## Example Usage

### Create a task

```bash
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

### Get all tasks

```bash
curl http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer <token>"
```

### Get tasks filtered by completion status

```bash
curl "http://localhost:8000/api/1/tasks?completed=false" \
  -H "Authorization: Bearer <token>"
```

### Update a task

```bash
curl -X PUT http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "description": "Milk, eggs, bread, chicken",
    "completed": false
  }'
```

### Mark task as complete

```bash
curl -X PATCH http://localhost:8000/api/1/tasks/1/complete \
  -H "Authorization: Bearer <token>"
```

### Delete a task

```bash
curl -X DELETE http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer <token>"
```

## Security Considerations

1. **User Isolation**: Users can only access their own tasks
2. **JWT Validation**: All requests must include a valid JWT token
3. **URL Parameter Validation**: user_id in URL must match JWT user
4. **Task Ownership**: Backend verifies task belongs to user before any operation
5. **SQL Injection Protection**: SQLModel uses parameterized queries
6. **Input Validation**: Pydantic schemas validate all input data

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting:
- 100 requests per minute per user
- 1000 requests per hour per user

## Pagination (Future Enhancement)

For large task lists, implement cursor-based pagination:
- `cursor`: Opaque cursor for next page
- `limit`: Number of items per page
