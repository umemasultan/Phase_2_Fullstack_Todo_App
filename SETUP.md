# Setup and Testing Guide

Complete guide for setting up and testing the hackathon-todo full-stack application.

## Prerequisites

- **Python 3.11+** installed
- **Node.js 18+** and npm installed
- **Neon PostgreSQL** database (or local PostgreSQL)
- **Git** installed

## Quick Start

### 1. Clone and Navigate

```bash
cd kiro-openai-gateway
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

**Edit `backend/.env` with your configuration:**

```env
# Database
DATABASE_URL=postgresql://user:password@host/database
# Example for Neon: postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application
APP_NAME=Hackathon Todo API
APP_VERSION=1.0.0
ENVIRONMENT=development

# CORS (add your frontend URL)
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Run database migrations:**

```bash
# Initialize Alembic (if not already done)
alembic upgrade head
```

**Start backend server:**

```bash
# From backend directory
python main.py

# Server will run on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

### 3. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

**Edit `frontend/.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Start frontend server:**

```bash
npm run dev

# Server will run on http://localhost:3000
```

## Testing the Application

### 1. Open Browser

Navigate to: **http://localhost:3000**

### 2. Test Authentication Flow

**Sign Up:**
1. You should be redirected to `/auth` page
2. Click "Sign up" tab
3. Enter email: `test@example.com`
4. Enter password: `password123`
5. Click "Sign up"
6. You should be redirected to `/dashboard`

**Verify Token:**
- Open browser DevTools → Application → Session Storage
- You should see `auth_token` stored

### 3. Test Task Management

**Create Tasks:**
1. Click "+ Add New Task" button
2. Enter title: "Buy groceries"
3. Enter description: "Milk, eggs, bread"
4. Click "Create Task"
5. Task should appear in the list

**Create More Tasks:**
- "Finish project documentation"
- "Review pull requests"
- "Schedule team meeting"

**Mark Task Complete:**
1. Click the checkbox next to a task
2. Task should show strikethrough text
3. Task should have green checkmark

**Edit Task:**
1. Click the edit icon (pencil) on a task
2. Modify title or description
3. Click "Save"
4. Changes should be reflected

**Delete Task:**
1. Click the delete icon (trash) on a task
2. Confirm deletion in the dialog
3. Task should be removed from list

### 4. Test Filtering

**Filter by Status:**
1. Click "Active" tab → Should show only incomplete tasks
2. Click "Completed" tab → Should show only completed tasks
3. Click "All" tab → Should show all tasks

**Verify Counts:**
- Total Tasks count should match all tasks
- Active count should match incomplete tasks
- Completed count should match completed tasks

### 5. Test Sign Out

1. Click "Sign out" button in header
2. You should be redirected to `/auth` page
3. Token should be removed from session storage
4. Trying to access `/dashboard` should redirect to `/auth`

### 6. Test Sign In

1. Enter the same credentials you used for sign up
2. Click "Sign in"
3. You should see your previously created tasks

### 7. Test User Isolation

**Create Second User:**
1. Sign out
2. Sign up with different email: `user2@example.com`
3. You should see an empty task list (no tasks from first user)
4. Create some tasks for this user
5. Sign out and sign back in as first user
6. Verify you only see first user's tasks

## API Testing (Optional)

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"api@example.com","password":"password123"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:8000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"api@example.com","password":"password123"}'
```

**Get Tasks (replace TOKEN and USER_ID):**
```bash
curl -X GET http://localhost:8000/api/{USER_ID}/tasks \
  -H "Authorization: Bearer {TOKEN}"
```

**Create Task:**
```bash
curl -X POST http://localhost:8000/api/{USER_ID}/tasks \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"title":"API Test Task","description":"Created via API"}'
```

### Using Swagger UI

1. Navigate to: **http://localhost:8000/docs**
2. Click "Authorize" button
3. Enter Bearer token (get from sign in response)
4. Test all endpoints interactively

## Troubleshooting

### Backend Issues

**"Connection refused" or database errors:**
- Verify DATABASE_URL is correct in `backend/.env`
- Check Neon database is accessible
- Verify migrations ran successfully: `alembic upgrade head`

**"Module not found" errors:**
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

**Port 8000 already in use:**
- Change port in `backend/main.py` or kill existing process

### Frontend Issues

**"Failed to fetch" or CORS errors:**
- Verify backend is running on http://localhost:8000
- Check CORS_ORIGINS in `backend/.env` includes http://localhost:3000
- Verify NEXT_PUBLIC_API_URL in `frontend/.env.local`

**"Authentication expired" errors:**
- Token may have expired (30 minutes default)
- Sign in again to get new token

**Styles not loading:**
- Restart frontend dev server: `npm run dev`
- Clear browser cache

**Port 3000 already in use:**
- Next.js will automatically use port 3001
- Or kill existing process

### Database Issues

**Migrations fail:**
```bash
# Reset migrations (WARNING: deletes all data)
alembic downgrade base
alembic upgrade head
```

**Connection timeout:**
- Check Neon database is not suspended
- Verify network connectivity
- Check firewall settings

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host/db |
| JWT_SECRET | Secret key for JWT signing | random-secret-key-here |
| JWT_ALGORITHM | JWT algorithm | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token expiration time | 30 |
| CORS_ORIGINS | Allowed frontend origins | http://localhost:3000 |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:8000 |

## Production Deployment

### Backend (Railway/Render)

1. Create new project
2. Connect GitHub repository
3. Set environment variables (same as .env)
4. Deploy from `backend` directory
5. Run migrations: `alembic upgrade head`

### Frontend (Vercel)

1. Import GitHub repository
2. Set root directory to `frontend`
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
4. Deploy

### Database (Neon)

1. Create production database
2. Update DATABASE_URL in backend environment
3. Run migrations on production database

## Next Steps

After successful testing:

1. **Add Features:**
   - Task categories/tags
   - Task priorities (high, medium, low)
   - Due dates with calendar picker
   - Task search functionality
   - Task sorting options

2. **Improve UX:**
   - Dark mode toggle
   - Keyboard shortcuts
   - Drag-and-drop task reordering
   - Bulk operations (delete multiple, mark all complete)

3. **Enhance Security:**
   - Email verification
   - Password reset flow
   - Rate limiting
   - HTTPS enforcement

4. **Add Monitoring:**
   - Error tracking (Sentry)
   - Analytics (Google Analytics, Plausible)
   - Performance monitoring (Vercel Analytics)

## Support

For issues or questions:
- Check API documentation: http://localhost:8000/docs
- Review specs in `specs/` directory
- Check CLAUDE.md for development guidelines
