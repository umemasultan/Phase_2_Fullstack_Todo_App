# Authentication API Specification

**Version**: 1.0.0
**Created**: 2026-01-08
**Authentication Method**: JWT (JSON Web Tokens)

## Overview

This document defines the authentication API for the hackathon-todo application. The system uses JWT tokens with a shared secret between frontend and backend.

## Authentication Flow

```
1. User Registration (Signup)
   Frontend → POST /api/v1/auth/signup → Backend
   Backend creates user, returns JWT token

2. User Login (Signin)
   Frontend → POST /api/v1/auth/signin → Backend
   Backend verifies credentials, returns JWT token

3. Protected Requests
   Frontend → Request + Authorization header → Backend
   Backend verifies JWT, extracts user_id, processes request
```

## Endpoints

### POST /api/v1/auth/signup

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Validation:**
- Email: Valid email format, unique
- Password: Minimum 8 characters

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2026-01-08T12:00:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid email or password format
- `409 Conflict`: Email already exists

### POST /api/v1/auth/signin

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2026-01-08T12:00:00Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid email or password

### GET /api/v1/auth/me

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2026-01-08T12:00:00Z",
  "updated_at": "2026-01-08T12:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token

## JWT Token Structure

### Token Payload

```json
{
  "sub": "1",           // user_id as string
  "email": "user@example.com",
  "exp": 1704729600,    // expiration timestamp
  "iat": 1704643200     // issued at timestamp
}
```

### Token Claims

- `sub` (subject): User ID as string
- `email`: User email address
- `exp` (expiration): Token expiration time (30 minutes from issue)
- `iat` (issued at): Token creation time

### Token Configuration

- **Algorithm**: HS256 (HMAC with SHA-256)
- **Secret**: Shared secret from `JWT_SECRET` environment variable
- **Expiration**: 30 minutes (configurable via `ACCESS_TOKEN_EXPIRE_MINUTES`)

## Authentication Header

All protected endpoints require the Authorization header:

```
Authorization: Bearer <access_token>
```

## Password Security

- **Hashing Algorithm**: bcrypt
- **Salt Rounds**: 12 (default)
- **Storage**: Only hashed passwords stored in database
- **Validation**: Minimum 8 characters (enforced at application level)

## Error Responses

### 401 Unauthorized

```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden

```json
{
  "detail": "Not enough permissions"
}
```

## Security Considerations

1. **Token Storage (Frontend)**:
   - Store in httpOnly cookies (recommended) OR
   - Store in memory (for SPA)
   - Never store in localStorage (XSS vulnerability)

2. **Token Transmission**:
   - Always use HTTPS in production
   - Include token in Authorization header

3. **Token Expiration**:
   - Short-lived access tokens (30 minutes)
   - Implement refresh tokens for production (future enhancement)

4. **Password Requirements**:
   - Minimum 8 characters
   - Consider adding complexity requirements (uppercase, numbers, symbols)

5. **Rate Limiting**:
   - Implement rate limiting on auth endpoints (future enhancement)
   - Prevent brute force attacks

## Frontend Integration (Better Auth)

### Configuration

```typescript
// Better Auth configuration
export const authConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  endpoints: {
    signUp: '/api/v1/auth/signup',
    signIn: '/api/v1/auth/signin',
    getSession: '/api/v1/auth/me'
  },
  tokenKey: 'access_token'
}
```

### Usage Example

```typescript
// Sign up
const { access_token, user } = await auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { access_token, user } = await auth.signIn({
  email: 'user@example.com',
  password: 'password123'
})

// Make authenticated request
const response = await fetch('/api/v1/tasks', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
```

## Testing

### Test User Credentials

For development/testing:
```
Email: test@example.com
Password: testpassword123
```

### cURL Examples

**Signup:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Signin:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Get Current User:**
```bash
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer <access_token>"
```

## Future Enhancements

- Refresh tokens for long-lived sessions
- Email verification
- Password reset flow
- OAuth providers (Google, GitHub)
- Two-factor authentication (2FA)
- Session management (logout all devices)
