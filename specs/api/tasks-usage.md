# Tasks API Usage Guide

Complete guide for using the Tasks REST API with authentication.

## Prerequisites

1. Backend server running on http://localhost:8000
2. Valid JWT token (obtained from signup/signin)
3. User account created

## Quick Start

### 1. Get Your JWT Token

First, sign up or sign in to get your JWT token:

```bash
# Sign up
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response includes access_token and user.id
# {
#   "access_token": "eyJhbGc...",
#   "token_type": "bearer",
#   "user": {"id": 1, "email": "user@example.com", ...}
# }
```

Save the `access_token` and `user.id` for subsequent requests.

### 2. Set Environment Variables (Optional)

```bash
export TOKEN="your_access_token_here"
export USER_ID="1"
```

## API Endpoints

### GET /api/{user_id}/tasks

Get all tasks for a user.

**Basic Usage:**
```bash
curl http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer $TOKEN"
```

**With Filters:**
```bash
# Get only incomplete tasks
curl "http://localhost:8000/api/1/tasks?completed=false" \
  -H "Authorization: Bearer $TOKEN"

# Get only completed tasks
curl "http://localhost:8000/api/1/tasks?completed=true" \
  -H "Authorization: Bearer $TOKEN"

# With pagination
curl "http://localhost:8000/api/1/tasks?limit=10&offset=0" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
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
  }
]
```

---

### POST /api/{user_id}/tasks

Create a new task.

**Usage:**
```bash
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

**Minimal Request (description optional):**
```bash
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

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

---

### GET /api/{user_id}/tasks/{id}

Get a specific task by ID.

**Usage:**
```bash
curl http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
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

---

### PUT /api/{user_id}/tasks/{id}

Update a task (full update).

**Usage:**
```bash
curl -X PUT http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "description": "Milk, eggs, bread, chicken",
    "completed": false
  }'
```

**Mark as completed:**
```bash
curl -X PUT http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": true
  }'
```

**Response:**
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

---

### PATCH /api/{user_id}/tasks/{id}/complete

Toggle task completion status.

**Usage:**
```bash
curl -X PATCH http://localhost:8000/api/1/tasks/1/complete \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
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

**Note:** This endpoint toggles the completion status. If the task is incomplete, it becomes complete, and vice versa.

---

### DELETE /api/{user_id}/tasks/{id}

Delete a task.

**Usage:**
```bash
curl -X DELETE http://localhost:8000/api/1/tasks/1 \
  -H "Authorization: Bearer $TOKEN"
```

**Response:** 204 No Content (empty response body)

---

## Python Examples

### Using requests library

```python
import requests

# Configuration
BASE_URL = "http://localhost:8000"
TOKEN = "your_access_token_here"
USER_ID = 1

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Create a task
response = requests.post(
    f"{BASE_URL}/api/{USER_ID}/tasks",
    headers=headers,
    json={
        "title": "Buy groceries",
        "description": "Milk, eggs, bread"
    }
)
task = response.json()
print(f"Created task: {task['id']}")

# Get all tasks
response = requests.get(
    f"{BASE_URL}/api/{USER_ID}/tasks",
    headers=headers
)
tasks = response.json()
print(f"Total tasks: {len(tasks)}")

# Get incomplete tasks only
response = requests.get(
    f"{BASE_URL}/api/{USER_ID}/tasks",
    headers=headers,
    params={"completed": False}
)
incomplete_tasks = response.json()
print(f"Incomplete tasks: {len(incomplete_tasks)}")

# Update a task
task_id = 1
response = requests.put(
    f"{BASE_URL}/api/{USER_ID}/tasks/{task_id}",
    headers=headers,
    json={
        "title": "Buy groceries and cook dinner",
        "description": "Milk, eggs, bread, chicken",
        "completed": False
    }
)
updated_task = response.json()
print(f"Updated task: {updated_task['title']}")

# Toggle completion
response = requests.patch(
    f"{BASE_URL}/api/{USER_ID}/tasks/{task_id}/complete",
    headers=headers
)
completed_task = response.json()
print(f"Task completed: {completed_task['completed']}")

# Delete a task
response = requests.delete(
    f"{BASE_URL}/api/{USER_ID}/tasks/{task_id}",
    headers=headers
)
print(f"Task deleted: {response.status_code == 204}")
```

### Complete workflow example

```python
import requests

BASE_URL = "http://localhost:8000"

# 1. Sign up
signup_response = requests.post(
    f"{BASE_URL}/api/v1/auth/signup",
    json={
        "email": "user@example.com",
        "password": "password123"
    }
)
auth_data = signup_response.json()
TOKEN = auth_data["access_token"]
USER_ID = auth_data["user"]["id"]

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# 2. Create tasks
tasks_to_create = [
    {"title": "Buy groceries", "description": "Milk, eggs, bread"},
    {"title": "Write documentation", "description": None},
    {"title": "Review pull requests", "description": "Check PRs #123, #124"}
]

created_tasks = []
for task_data in tasks_to_create:
    response = requests.post(
        f"{BASE_URL}/api/{USER_ID}/tasks",
        headers=headers,
        json=task_data
    )
    created_tasks.append(response.json())
    print(f"Created: {response.json()['title']}")

# 3. Get all tasks
response = requests.get(f"{BASE_URL}/api/{USER_ID}/tasks", headers=headers)
all_tasks = response.json()
print(f"\nTotal tasks: {len(all_tasks)}")

# 4. Complete first task
first_task_id = created_tasks[0]["id"]
response = requests.patch(
    f"{BASE_URL}/api/{USER_ID}/tasks/{first_task_id}/complete",
    headers=headers
)
print(f"\nCompleted: {response.json()['title']}")

# 5. Get incomplete tasks
response = requests.get(
    f"{BASE_URL}/api/{USER_ID}/tasks",
    headers=headers,
    params={"completed": False}
)
incomplete_tasks = response.json()
print(f"Incomplete tasks: {len(incomplete_tasks)}")

# 6. Update a task
response = requests.put(
    f"{BASE_URL}/api/{USER_ID}/tasks/{first_task_id}",
    headers=headers,
    json={
        "title": "Buy groceries and cook dinner",
        "description": "Milk, eggs, bread, chicken, rice",
        "completed": True
    }
)
print(f"\nUpdated: {response.json()['title']}")

# 7. Delete a task
response = requests.delete(
    f"{BASE_URL}/api/{USER_ID}/tasks/{first_task_id}",
    headers=headers
)
print(f"Deleted task: {response.status_code == 204}")
```

## JavaScript/TypeScript Examples

### Using fetch (frontend)

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const token = 'your_access_token_here'
const userId = 1

// Create a task
const createTask = async () => {
  const response = await fetch(`${API_URL}/api/${userId}/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Buy groceries',
      description: 'Milk, eggs, bread'
    })
  })

  const task = await response.json()
  console.log('Created task:', task)
  return task
}

// Get all tasks
const getTasks = async () => {
  const response = await fetch(`${API_URL}/api/${userId}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })

  const tasks = await response.json()
  console.log('Tasks:', tasks)
  return tasks
}

// Get incomplete tasks
const getIncompleteTasks = async () => {
  const response = await fetch(
    `${API_URL}/api/${userId}/tasks?completed=false`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
  )

  const tasks = await response.json()
  return tasks
}

// Update a task
const updateTask = async (taskId: number) => {
  const response = await fetch(`${API_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Buy groceries and cook dinner',
      description: 'Milk, eggs, bread, chicken',
      completed: false
    })
  })

  const task = await response.json()
  return task
}

// Toggle completion
const toggleTaskCompletion = async (taskId: number) => {
  const response = await fetch(
    `${API_URL}/api/${userId}/tasks/${taskId}/complete`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
  )

  const task = await response.json()
  return task
}

// Delete a task
const deleteTask = async (taskId: number) => {
  const response = await fetch(`${API_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })

  return response.status === 204
}
```

## Error Handling

### Common Errors

**401 Unauthorized:**
```json
{
  "detail": "Could not validate credentials"
}
```
**Solution:** Check that your JWT token is valid and included in the Authorization header.

**403 Forbidden:**
```json
{
  "detail": "You can only access your own resources"
}
```
**Solution:** Ensure the `user_id` in the URL matches the user_id from your JWT token.

**404 Not Found:**
```json
{
  "detail": "Task not found"
}
```
**Solution:** Verify the task ID exists and belongs to your user.

**400 Bad Request:**
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```
**Solution:** Check your request body matches the required schema.

### Error Handling in Python

```python
import requests

try:
    response = requests.get(
        f"{BASE_URL}/api/{USER_ID}/tasks",
        headers=headers
    )
    response.raise_for_status()  # Raises HTTPError for bad responses
    tasks = response.json()
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        print("Authentication failed. Please sign in again.")
    elif e.response.status_code == 403:
        print("Access denied. You can only access your own tasks.")
    elif e.response.status_code == 404:
        print("Task not found.")
    else:
        print(f"Error: {e.response.json()}")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

### Error Handling in TypeScript

```typescript
const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/${userId}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!response.ok) {
      const error = await response.json()

      if (response.status === 401) {
        throw new Error('Authentication expired. Please sign in again.')
      } else if (response.status === 403) {
        throw new Error('Access denied. You can only access your own tasks.')
      } else if (response.status === 404) {
        throw new Error('Task not found.')
      } else {
        throw new Error(error.detail || 'Request failed')
      }
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to get tasks:', error)
    throw error
  }
}
```

## Testing with Swagger UI

Visit http://localhost:8000/docs to access the interactive API documentation.

1. Click "Authorize" button
2. Enter your JWT token in the format: `Bearer your_token_here`
3. Click "Authorize"
4. Now you can test all endpoints directly from the browser

## Best Practices

1. **Always include Authorization header** with valid JWT token
2. **Use the correct user_id** from your JWT token
3. **Handle errors gracefully** in your application
4. **Validate input** before sending requests
5. **Use pagination** for large task lists
6. **Cache tasks** on the frontend to reduce API calls
7. **Implement optimistic updates** for better UX

## Next Steps

- Implement frontend components to consume these APIs
- Add real-time updates with WebSockets (future enhancement)
- Implement task sharing between users (future enhancement)
- Add task categories/tags (future enhancement)
