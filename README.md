# 📝 Full-Stack Todo Application

A modern, production-ready Todo application built with Next.js and FastAPI, featuring a clean and professional UI inspired by Notion, Linear, and Asana.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

### Frontend
- 🎨 **Clean, Modern UI** - Professional SaaS-style design with Tailwind CSS
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🔐 **JWT Authentication** - Secure user authentication with React Context
- ✅ **Task Management** - Create, read, update, delete, and toggle task completion
- 🔍 **Task Filtering** - Filter tasks by all, active, or completed status
- 📊 **Statistics Dashboard** - View total, active, and completed task counts
- ⚡ **Fast & Optimized** - Built with Next.js 14 App Router and static export

### Backend
- 🚀 **FastAPI** - High-performance Python web framework
- 🗄️ **SQLite Database** - Lightweight database with SQLAlchemy ORM
- 🔒 **Secure Authentication** - JWT tokens with bcrypt password hashing
- 📡 **RESTful API** - Clean API design with proper HTTP methods
- 🌐 **CORS Enabled** - Configured for frontend integration
- 📦 **Static File Serving** - Serves the frontend from the same server

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Pydantic

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/umemasultan/Phase_2_Fullstack_Todo_App.git
cd Phase_2_Fullstack_Todo_App
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
cp .env.example .env

# The backend will automatically create the SQLite database on first run
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env.local file from example
cp .env.local.example .env.local

# Build the frontend
npm run build
```

### 4. Deploy Frontend to Backend

```bash
# Copy built frontend to backend static directory
# On Windows (PowerShell):
Copy-Item -Path "frontend\out\*" -Destination "backend\static" -Recurse -Force

# On Linux/Mac:
cp -r frontend/out/* backend/static/
```

### 5. Run the Application

```bash
# From the backend directory
cd backend
python main.py
```

The application will be available at: **http://localhost:8002**

## 📁 Project Structure

```
Phase_2_Fullstack_Todo_App/
├── backend/
│   ├── src/
│   │   ├── api/          # API routes and schemas
│   │   ├── core/         # Core configuration and utilities
│   │   ├── models/       # Database models
│   │   └── services/     # Business logic
│   ├── static/           # Frontend build output (generated)
│   ├── main.py           # Application entry point
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages and layouts
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and API client
│   │   └── types/        # TypeScript types
│   ├── package.json      # Node.js dependencies
│   └── tailwind.config.js # Tailwind configuration
├── specs/                # API and database specifications
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=sqlite:///./todo.db

# JWT Configuration
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8002

# Server
HOST=0.0.0.0
PORT=8002
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8002
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/signin` | Login and get JWT token |
| GET | `/api/v1/auth/me` | Get current user info |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{user_id}/tasks` | Get all tasks for user |
| POST | `/api/{user_id}/tasks` | Create a new task |
| PUT | `/api/{user_id}/tasks/{task_id}` | Update a task |
| PATCH | `/api/{user_id}/tasks/{task_id}/complete` | Toggle task completion |
| DELETE | `/api/{user_id}/tasks/{task_id}` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Check API health status |

## 🎨 UI Features

- **Clean Design**: Minimal, professional interface with consistent spacing and typography
- **Task Cards**: Clean cards with hover effects for edit/delete actions
- **Filter Buttons**: Simple toggle buttons for filtering tasks
- **Statistics**: Dashboard showing total, active, and completed task counts
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Smooth loading indicators for all async operations
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Secure authentication with HTTP-only cookies
- **CORS Protection**: Configured allowed origins
- **Input Validation**: Pydantic schemas for request validation
- **SQL Injection Prevention**: SQLAlchemy ORM with parameterized queries

## 🧪 Development

### Frontend Development

```bash
cd frontend
npm run dev  # Runs on http://localhost:3000
```

### Backend Development

```bash
cd backend
uvicorn main:app --reload --port 8002
```

### Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Copy to backend
cp -r out/* ../backend/static/

# Run backend
cd ../backend
python main.py
```

## 📝 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8002/docs
- **ReDoc**: http://localhost:8002/redoc

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Umema Sultan**

- LinkedIn: [umema-sultan](https://www.linkedin.com/in/umema-sultan)
- GitHub: [@umemasultan](https://github.com/umemasultan)
- TikTok: [@codedremer](https://www.tiktok.com/@codedremer)
- WhatsApp Channel: [Join](https://whatsapp.com/channel/0029VajhSWv77qVa4QVQJX3u)

## 🙏 Acknowledgments

Built with ❤️ using Next.js, FastAPI, and SQLite.

---

<div align="center">
  <p>Made for Hackathon Submission</p>
  <p>© 2026 Umema Sultan. All rights reserved.</p>
</div>
