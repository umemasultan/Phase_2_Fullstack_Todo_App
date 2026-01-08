# Frontend UI Implementation Guide

Complete guide for the Todo app frontend with Next.js, TypeScript, and Tailwind CSS.

## Overview

The frontend is a responsive, single-page application with authentication and full CRUD operations for tasks.

## Pages & Routes

### 1. Home Page (`/`)
- **Purpose**: Landing page with automatic routing
- **Behavior**:
  - If authenticated → redirect to `/dashboard`
  - If not authenticated → redirect to `/auth`

### 2. Auth Page (`/auth`)
- **Purpose**: Login and signup
- **Features**:
  - Toggle between login and signup modes
  - Email and password validation
  - Error handling
  - Responsive design

### 3. Dashboard Page (`/dashboard`)
- **Purpose**: Main task management interface
- **Features**:
  - Protected route (requires authentication)
  - Task statistics (total, active, completed)
  - Add new task
  - Filter tasks (all, active, completed)
  - Task list with CRUD operations
  - Sign out functionality

## Components

### TaskList Component
- **Location**: `src/components/TaskList.tsx`
- **Purpose**: Renders a list of tasks
- **Props**:
  - `tasks`: Array of tasks to display
  - `onToggleComplete`: Handler for marking tasks complete
  - `onUpdate`: Handler for updating tasks
  - `onDelete`: Handler for deleting tasks

### TaskItem Component
- **Location**: `src/components/TaskItem.tsx`
- **Purpose**: Individual task card with actions
- **Features**:
  - Checkbox to toggle completion
  - Inline editing mode
  - Delete confirmation
  - Visual feedback for completed tasks
  - Responsive layout

### TaskForm Component
- **Location**: `src/components/TaskForm.tsx`
- **Purpose**: Form for creating new tasks
- **Features**:
  - Title input (required)
  - Description textarea (optional)
  - Validation
  - Error handling
  - Cancel functionality

## Authentication Flow

```
1. User visits / → Redirects to /auth (if not authenticated)
2. User signs up/signs in → JWT token stored in sessionStorage
3. User redirected to /dashboard
4. All API requests include JWT token in Authorization header
5. User signs out → Token removed, redirected to /auth
```

## API Integration

### Using the Authenticated API Client

All API calls use the `authenticatedApiClient` which automatically:
- Includes JWT token in Authorization header
- Handles 401 errors (expired tokens)
- Provides consistent error handling

**Example:**
```typescript
import { authenticatedApiClient } from '@/lib/authenticated-api-client'

// Get tasks
const tasks = await authenticatedApiClient.get<Task[]>(`/api/${userId}/tasks`)

// Create task
const newTask = await authenticatedApiClient.post<Task>(`/api/${userId}/tasks`, {
  title: 'Buy groceries',
  description: 'Milk, eggs, bread'
})

// Update task
const updated = await authenticatedApiClient.put<Task>(`/api/${userId}/tasks/${taskId}`, {
  title: 'Updated title',
  description: 'Updated description',
  completed: true
})

// Toggle completion
const toggled = await authenticatedApiClient.patch<Task>(
  `/api/${userId}/tasks/${taskId}/complete`,
  {}
)

// Delete task
await authenticatedApiClient.delete(`/api/${userId}/tasks/${taskId}`)
```

## State Management

### Auth Context
- **Location**: `src/lib/auth-context.tsx`
- **Provides**:
  - `user`: Current user object
  - `token`: JWT token
  - `isAuthenticated`: Boolean authentication status
  - `isLoading`: Loading state
  - `signup`: Function to create account
  - `signin`: Function to login
  - `signout`: Function to logout

**Usage:**
```typescript
import { useAuth } from '@/lib/auth-context'

function MyComponent() {
  const { user, isAuthenticated, signin, signout } = useAuth()

  // Use auth state and functions
}
```

### Local State
- Each page/component manages its own local state
- Tasks are fetched and stored in dashboard page state
- Form inputs use controlled components

## Responsive Design

### Breakpoints (Tailwind CSS)
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `lg:` (≥ 1024px)

### Responsive Features
- **Stats Cards**: Stack vertically on mobile, grid on tablet+
- **Task Actions**: Always visible, optimized for touch
- **Forms**: Full width on mobile, constrained on desktop
- **Navigation**: Simplified on mobile

## Styling

### Color Palette
- **Primary**: Blue (`blue-600`, `blue-700`)
- **Success**: Green (`green-500`, `green-600`)
- **Error**: Red (`red-600`, `red-800`)
- **Neutral**: Gray shades

### Components
- **Cards**: White background, shadow, rounded corners
- **Buttons**: Solid colors with hover states
- **Inputs**: Border with focus ring
- **Icons**: SVG icons from Heroicons

## Error Handling

### Display Errors
```typescript
const [error, setError] = useState('')

try {
  await someApiCall()
} catch (err) {
  setError(err instanceof Error ? err.message : 'Operation failed')
}

// Display error
{error && (
  <div className="rounded-md bg-red-50 p-4">
    <div className="text-sm text-red-800">{error}</div>
  </div>
)}
```

### Common Errors
- **401 Unauthorized**: Token expired → Clear token, redirect to login
- **403 Forbidden**: User accessing wrong resources
- **404 Not Found**: Task doesn't exist
- **Network errors**: Connection issues

## Loading States

### Patterns
```typescript
const [isLoading, setIsLoading] = useState(false)

const handleAction = async () => {
  setIsLoading(true)
  try {
    await apiCall()
  } finally {
    setIsLoading(false)
  }
}

// Disable buttons during loading
<button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

## Development Workflow

### 1. Start Backend
```bash
cd backend
python main.py
# Backend runs on http://localhost:8000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 3. Test Flow
1. Visit http://localhost:3000
2. Sign up with email and password
3. Create tasks
4. Edit, complete, and delete tasks
5. Test filtering
6. Sign out and sign in again

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   ├── page.tsx            # Home page (redirects)
│   │   ├── auth/
│   │   │   └── page.tsx        # Login/Signup page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Main dashboard
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── TaskList.tsx        # Task list container
│   │   ├── TaskItem.tsx        # Individual task card
│   │   └── TaskForm.tsx        # Task creation form
│   ├── lib/
│   │   ├── auth.ts             # Auth API client
│   │   ├── auth-context.tsx    # Auth context provider
│   │   ├── api-client.ts       # Base API client
│   │   └── authenticated-api-client.ts  # Authenticated API client
│   └── types/
│       ├── index.ts            # Type exports
│       ├── auth.ts             # Auth types
│       ├── user.ts             # User types
│       └── task.ts             # Task types
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind config
└── next.config.js              # Next.js config
```

## Key Features

### ✅ Authentication
- JWT-based authentication
- Persistent sessions (sessionStorage)
- Protected routes
- Auto-redirect based on auth state

### ✅ Task Management
- Create tasks with title and description
- Edit tasks inline
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Filter by status (all, active, completed)

### ✅ User Experience
- Responsive design (mobile, tablet, desktop)
- Loading states for all async operations
- Error messages for failed operations
- Visual feedback for completed tasks
- Smooth transitions and hover effects

### ✅ Code Quality
- TypeScript for type safety
- Reusable components
- Consistent error handling
- Clean, maintainable code structure

## Testing Checklist

### Authentication
- [ ] Sign up with new account
- [ ] Sign in with existing account
- [ ] Invalid credentials show error
- [ ] Token persists across page reloads
- [ ] Sign out clears token and redirects

### Task Operations
- [ ] Create task with title only
- [ ] Create task with title and description
- [ ] Edit task title and description
- [ ] Mark task as complete
- [ ] Mark task as incomplete
- [ ] Delete task with confirmation
- [ ] Cancel operations work correctly

### Filtering
- [ ] "All" shows all tasks
- [ ] "Active" shows only incomplete tasks
- [ ] "Completed" shows only completed tasks
- [ ] Counts update correctly

### Responsive Design
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Touch targets are large enough on mobile
- [ ] Text is readable on all screen sizes

### Error Handling
- [ ] Network errors show appropriate message
- [ ] Invalid input shows validation error
- [ ] Expired token redirects to login
- [ ] 404 errors handled gracefully

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Add Features
1. **Task Categories**: Add category field to Task model
2. **Task Priority**: Add priority levels (high, medium, low)
3. **Due Dates**: Add date picker for task deadlines
4. **Search**: Add search input to filter tasks by title
5. **Sorting**: Add sort options (date, title, priority)

## Troubleshooting

### "Authentication expired" error
**Cause**: JWT token expired (30 minutes)
**Solution**: Sign in again to get new token

### Tasks not loading
**Cause**: Backend not running or wrong API URL
**Solution**:
1. Check backend is running on http://localhost:8000
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### CORS errors
**Cause**: Backend CORS not configured for frontend origin
**Solution**: Add `http://localhost:3000` to `CORS_ORIGINS` in backend `.env`

### Styles not applying
**Cause**: Tailwind not configured correctly
**Solution**:
1. Ensure `tailwind.config.js` includes all content paths
2. Restart dev server: `npm run dev`

## Next Steps

### Enhancements
1. **Add task categories/tags**
2. **Implement task search**
3. **Add task sorting options**
4. **Implement task due dates**
5. **Add task priority levels**
6. **Implement task sharing**
7. **Add dark mode**
8. **Implement real-time updates (WebSockets)**

### Production Deployment
1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy to Railway or Render
3. **Database**: Use production Neon database
4. **Environment Variables**: Set production values
5. **HTTPS**: Ensure all connections use HTTPS

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
