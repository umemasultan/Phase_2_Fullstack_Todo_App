# Hackathon Todo - Production Ready Full-Stack Application

A modern, production-ready todo application built for hackathon submission. Features a beautiful UI, secure authentication, and single-server deployment.

## 🎯 Quick Start (One Command!)

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

**That's it!** The script will:
1. ✅ Build the frontend (Next.js)
2. ✅ Install backend dependencies
3. ✅ Start the application on **http://localhost:8002**

Open your browser and start managing tasks!

---

## ✨ Features

### 🔐 Authentication
- Secure signup/login with JWT tokens
- Password hashing with bcrypt
- Session management
- Auto-redirect based on auth state

### ✅ Task Management
- **Create** tasks with title and description
- **Edit** tasks inline
- **Delete** tasks with confirmation
- **Complete/Uncomplete** tasks with checkbox
- **Filter** by All/Active/Completed

### 🎨 Modern UI
- Clean, professional design with Tailwind CSS
- Gradient backgrounds and smooth animations
- Responsive layout (mobile, tablet, desktop)
- Loading states and empty state UI
- Hover effects and transitions
- Icons and visual feedback

### 🚀 Production Ready
- Single-server deployment
- Static frontend served by FastAPI
- Environment variable configuration
- SQLite database (easily switch to PostgreSQL)
- Error handling and validation
- CORS protection

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with static export
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Context** - State management

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **JWT** - Secure authentication
- **SQLite** - Database (production: PostgreSQL)
- **Pydantic** - Data validation

---

## 📦 Manual Setup (Optional)

If you prefer manual setup instead of using the startup script:

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Frontend Build
```bash
cd frontend
npm install
npm run build
```

### 3. Start Server
```bash
cd backend
python main.py
```

---

## 🌐 Application URLs

Once started, access:

- **Application**: http://localhost:8002
- **API Documentation**: http://localhost:8002/docs
- **Health Check**: http://localhost:8002/api/v1/health

---

## 📝 Environment Configuration

### Backend (.env)
Located in `backend/.env`:

```env
# Database (SQLite for development, PostgreSQL for production)
DATABASE_URL=sqlite:///./hackathon_todo.db

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS (adjust for production)
CORS_ORIGINS=["http://localhost:3000"]

# Application
APP_NAME=Hackathon Todo API
APP_VERSION=0.1.0
DEBUG=True
```

### Frontend (.env.local for development)
Located in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8002
```

### Frontend (.env.production for production)
Located in `frontend/.env.production`:

```env
# Empty string uses same server (single-server deployment)
NEXT_PUBLIC_API_URL=
```

---

## 🎯 How to Use

### 1. Sign Up
- Open http://localhost:8002
- Click "Sign up"
- Enter email and password (min 8 characters)
- Click "Sign up" button

### 2. Create Tasks
- Click "Add New Task" button
- Enter task title (required)
- Optionally add description
- Click "Create Task"

### 3. Manage Tasks
- **Complete**: Click checkbox to mark done
- **Edit**: Click edit icon (appears on hover)
- **Delete**: Click delete icon (with confirmation)

### 4. Filter Tasks
- **All**: View all tasks
- **Active**: View incomplete tasks
- **Completed**: View completed tasks

### 5. Sign Out
- Click "Sign out" in header

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  Browser (http://localhost:8002)        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  FastAPI Server (Port 8002)             │
│  ┌─────────────────────────────────┐   │
│  │  Frontend (Static Files)        │   │
│  │  - Next.js build output         │   │
│  │  - Served from /frontend/out/   │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Backend API (/api/*)           │   │
│  │  - Authentication               │   │
│  │  - Task CRUD operations         │   │
│  │  - JWT validation               │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  SQLite Database                        │
│  - users table                          │
│  - tasks table                          │
└─────────────────────────────────────────┘
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Input validation with Pydantic
- ✅ SQL injection prevention (SQLModel ORM)
- ✅ XSS protection (React escaping)
- ✅ Secure token storage (localStorage)

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in backend/main.py (line 118)
port=8002  # Change to 8003 or another port
```

### Frontend Not Showing
```bash
# Rebuild frontend
cd frontend
npm run build
cd ..
```

### Database Errors
```bash
# Delete and recreate database
rm backend/hackathon_todo.db
# Restart server - database will be recreated
```

### Build Errors
```bash
# Clean and rebuild
cd frontend
rm -rf .next out node_modules
npm install
npm run build
cd ..
```

---

## 🚀 Deployment

### Deploy to Production

1. **Update Environment Variables**:
   - Set strong `JWT_SECRET` in backend/.env
   - Configure production database URL
   - Update CORS_ORIGINS for your domain

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

3. **Deploy Backend**:
   - Use services like Railway, Render, or Heroku
   - Ensure frontend/out directory is included
   - Set environment variables in platform

4. **Database**:
   - Switch to PostgreSQL for production
   - Update DATABASE_URL in .env

---

## 📱 Connect with Developer

Built by **Umema Sultan** for Hackathon Submission

- **LinkedIn**: [Umema Sultan](https://www.linkedin.com/in/umema-sultan)
- **TikTok**: [@codedremer](https://www.tiktok.com/@codedremer) - Coding tutorials & tips
- **WhatsApp Channel**: [Join for updates](https://whatsapp.com/channel/0029VajhSWv77qVa4QVQJX3u)
- **GitHub**: [@umemasultan](https://github.com/umemasultan)

---

## 📄 License

MIT License - Free to use and modify for hackathons and personal projects.

---

## 🎉 Demo Flow

1. Run `start.bat` (Windows) or `./start.sh` (Linux/Mac)
2. Open http://localhost:8002
3. Sign up with test@example.com / password123
4. Create your first task: "Complete hackathon project"
5. Mark it as complete! ✅

---

## 💡 Features Showcase

### Beautiful UI
- Gradient backgrounds (slate → blue → indigo)
- Smooth animations and transitions
- Professional card-based layout
- Hover effects on interactive elements
- Loading spinners and empty states

### Smart Interactions
- Auto-redirect based on auth state
- Inline task editing
- Delete confirmation dialogs
- Real-time task filtering
- Responsive mobile menu

### Developer Experience
- TypeScript for type safety
- ESLint for code quality
- Hot reload in development
- Single command deployment
- Clear error messages

---

## 🏆 Hackathon Ready

This application is **production-ready** and perfect for hackathon demos:

✅ **One-command startup** - Impress judges with easy setup
✅ **Modern UI** - Professional, clean design
✅ **Full-stack** - Frontend + Backend + Database
✅ **Secure** - JWT auth, password hashing
✅ **Responsive** - Works on all devices
✅ **Well-documented** - Clear README and code comments
✅ **Deployable** - Ready for cloud deployment

---

<div align="center">

**Built with ❤️ by Umema Sultan**

[LinkedIn](https://www.linkedin.com/in/umema-sultan) • [TikTok](https://www.tiktok.com/@codedremer) • [WhatsApp](https://whatsapp.com/channel/0029VajhSWv77qVa4QVQJX3u) • [GitHub](https://github.com/umemasultan)

</div>
