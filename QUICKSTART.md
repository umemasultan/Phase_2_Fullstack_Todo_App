# 🚀 QUICK START - Hackathon Todo App

## One Command to Rule Them All!

### Windows:
```bash
start.bat
```

### Linux/Mac:
```bash
chmod +x start.sh
./start.sh
```

## What Happens:
1. ✅ Builds frontend (if needed)
2. ✅ Installs dependencies
3. ✅ Starts server on **http://localhost:8002**

## First Time Setup (30 seconds):
1. Run `start.bat`
2. Wait for "Uvicorn running on http://0.0.0.0:8002"
3. Open browser: **http://localhost:8002**
4. Sign up with any email/password
5. Start creating tasks!

## Demo Flow for Judges:
1. **Show startup**: One command starts everything
2. **Sign up**: test@example.com / password123
3. **Create tasks**:
   - "Complete hackathon project" ✅
   - "Present to judges"
   - "Win the hackathon"
4. **Show features**:
   - Mark tasks complete (checkbox)
   - Filter (All/Active/Completed)
   - Edit tasks (hover → edit icon)
   - Delete tasks (hover → delete icon)
5. **Show footer**: Your social links
6. **Show responsive**: Resize browser window

## Tech Stack (Impress Judges):
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + SQLModel + JWT
- **Database**: SQLite (production: PostgreSQL)
- **Deployment**: Single server, production-ready

## Features Highlight:
✅ Modern gradient UI with animations
✅ Secure JWT authentication
✅ Full CRUD operations
✅ Real-time filtering
✅ Responsive design
✅ Single-server deployment
✅ Production-ready code

## Troubleshooting:
**Port 8002 in use?**
- Change port in `backend/main.py` line 118

**Need to rebuild?**
```bash
cd frontend
npm run build
cd ..
```

## URLs:
- **App**: http://localhost:8002
- **API Docs**: http://localhost:8002/docs
- **Health**: http://localhost:8002/api/v1/health

---

Built by **Umema Sultan** | [LinkedIn](https://www.linkedin.com/in/umema-sultan) | [TikTok @codedremer](https://www.tiktok.com/@codedremer) | [GitHub @umemasultan](https://github.com/umemasultan)
