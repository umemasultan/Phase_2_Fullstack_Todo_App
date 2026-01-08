# Authentication Setup Guide

This guide explains how to use the JWT-based authentication system in the hackathon-todo application.

## Overview

The authentication system uses:
- **Backend**: FastAPI with JWT tokens (HS256 algorithm)
- **Frontend**: React Context API for state management
- **Token Storage**: sessionStorage (can be changed to httpOnly cookies)
- **Password Hashing**: bcrypt with 12 salt rounds

## Backend Setup

### 1. Environment Configuration

Ensure your `.env` file has the JWT configuration:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Important**: Use a strong, random secret in production. Generate one with:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 2. Run Database Migration

Add the password field to the users table:

```bash
cd backend
alembic upgrade head
```

This will run migration `002_add_password_to_users.py`.

### 3. Test Authentication Endpoints

Start the backend server:
```bash
python main.py
```

Visit http://localhost:8000/docs to see the authentication endpoints:
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/signin` - Login existing user
- `GET /api/v1/auth/me` - Get current user (requires auth)

## Frontend Setup

### 1. AuthProvider Integration

The `AuthProvider` is already integrated in `src/app/layout.tsx`. It provides authentication state to all components.

### 2. Using Authentication in Components

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'

export default function MyComponent() {
  const { user, isAuthenticated, isLoading, signin, signup, signout } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <button onClick={signout}>Sign Out</button>
    </div>
  )
}
```

### 3. Sign Up Example

```typescript
'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signup({ email, password })
      // User is now authenticated, redirect or update UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (min 8 characters)"
        required
        minLength={8}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

### 4. Sign In Example

```typescript
'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

export default function SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signin({ email, password })
      // User is now authenticated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signin failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  )
}
```

### 5. Making Authenticated API Requests

Use the `authenticatedApiClient` for protected endpoints:

```typescript
import { authenticatedApiClient } from '@/lib/authenticated-api-client'
import type { Task } from '@/types'

// Get user's tasks
const tasks = await authenticatedApiClient.get<Task[]>('/api/v1/tasks')

// Create a new task
const newTask = await authenticatedApiClient.post<Task>('/api/v1/tasks', {
  title: 'Buy groceries',
  description: 'Milk, eggs, bread'
})

// Update a task
const updatedTask = await authenticatedApiClient.put<Task>('/api/v1/tasks/1', {
  completed: true
})

// Delete a task
await authenticatedApiClient.delete('/api/v1/tasks/1')
```

## Backend: Protecting Endpoints

### Using the `get_current_user` Dependency

```python
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.api.dependencies import get_current_user
from src.core.database import get_session
from src.models.user import User

router = APIRouter()

@router.get("/api/v1/tasks")
async def get_tasks(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get tasks for the current user"""
    tasks = session.exec(
        select(Task).where(Task.user_id == current_user.id)
    ).all()
    return tasks
```

### Optional Authentication

For endpoints that work with or without authentication:

```python
from src.api.dependencies import get_current_user_optional

@router.get("/api/v1/public-tasks")
async def get_public_tasks(
    current_user: Optional[User] = Depends(get_current_user_optional),
    session: Session = Depends(get_session)
):
    """Get public tasks, with user-specific filtering if authenticated"""
    if current_user:
        # Show user's tasks
        tasks = session.exec(
            select(Task).where(Task.user_id == current_user.id)
        ).all()
    else:
        # Show public tasks only
        tasks = []
    return tasks
```

## Testing Authentication

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Get Current User:**
```bash
# Replace <TOKEN> with the access_token from signup/signin response
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

### Using Python

```python
import requests

# Sign up
response = requests.post(
    'http://localhost:8000/api/v1/auth/signup',
    json={'email': 'test@example.com', 'password': 'testpass123'}
)
data = response.json()
token = data['access_token']
print(f"User ID: {data['user']['id']}")

# Make authenticated request
headers = {'Authorization': f'Bearer {token}'}
response = requests.get('http://localhost:8000/api/v1/auth/me', headers=headers)
print(response.json())
```

## Security Best Practices

### 1. Token Storage

**Current Implementation**: sessionStorage
- ✅ Cleared when tab closes
- ✅ Not accessible across tabs
- ⚠️ Vulnerable to XSS attacks

**Recommended for Production**: httpOnly cookies
- ✅ Not accessible to JavaScript
- ✅ Automatic inclusion in requests
- ✅ Protected from XSS

To implement httpOnly cookies, modify the backend to set cookies instead of returning tokens in the response body.

### 2. Password Requirements

Current: Minimum 8 characters

Consider adding:
- At least one uppercase letter
- At least one number
- At least one special character

Update validation in `src/api/schemas.py`:
```python
from pydantic import validator
import re

class UserSignup(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

    @validator('password')
    def validate_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character')
        return v
```

### 3. Rate Limiting

Implement rate limiting on auth endpoints to prevent brute force attacks:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/api/v1/auth/signin")
@limiter.limit("5/minute")  # 5 attempts per minute
async def signin(...):
    ...
```

### 4. HTTPS Only

In production, always use HTTPS:
- Set `secure=True` on cookies
- Use HSTS headers
- Redirect HTTP to HTTPS

### 5. Token Expiration

Current: 30 minutes

For production, consider:
- Short-lived access tokens (15-30 minutes)
- Long-lived refresh tokens (7-30 days)
- Implement token refresh endpoint

## Troubleshooting

### "Could not validate credentials"

**Cause**: Invalid or expired JWT token

**Solutions**:
1. Check token is being sent in Authorization header
2. Verify JWT_SECRET matches between signup and verification
3. Check token hasn't expired (default 30 minutes)
4. Ensure token format is `Bearer <token>`

### "Email already registered"

**Cause**: User with that email already exists

**Solutions**:
1. Use a different email
2. Implement "forgot password" flow
3. Check if user should sign in instead

### "Incorrect email or password"

**Cause**: Invalid credentials

**Solutions**:
1. Verify email is correct
2. Check password is correct
3. Ensure user has signed up first

### CORS Errors

**Cause**: Frontend and backend on different origins

**Solutions**:
1. Add frontend URL to `CORS_ORIGINS` in backend `.env`
2. Ensure `allow_credentials=True` in CORS middleware
3. Check browser console for specific CORS error

## Next Steps

After setting up authentication:

1. **Implement Protected Routes**: Create task CRUD endpoints that require authentication
2. **Add User Profile**: Allow users to update their email or password
3. **Implement Refresh Tokens**: For longer sessions without re-authentication
4. **Add Email Verification**: Verify email addresses before allowing signin
5. **Implement Password Reset**: Allow users to reset forgotten passwords
6. **Add OAuth Providers**: Google, GitHub, etc. for social login

## Resources

- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
- [JWT.io](https://jwt.io/) - JWT debugger
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
