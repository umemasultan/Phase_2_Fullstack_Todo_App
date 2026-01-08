# Deployment Guide

This guide explains how to deploy the Full-Stack Todo Application to production using Vercel (frontend) and Railway (backend).

## Architecture

- **Frontend**: Deployed on Vercel (static Next.js site)
- **Backend**: Deployed on Railway (FastAPI server)
- **Database**: SQLite (included with backend)

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Railway account (free tier)

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

### 1.2 Deploy from GitHub
1. Select "Deploy from GitHub repo"
2. Choose your repository: `Phase_2_Fullstack_Todo_App`
3. Railway will automatically detect the configuration from `railway.json`

### 1.3 Configure Environment Variables
In Railway dashboard, add these environment variables:

```env
DATABASE_URL=sqlite:///./todo.db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
PORT=8002
```

**Important**: Generate a secure JWT_SECRET:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 1.4 Get Backend URL
After deployment, Railway will provide a URL like:
```
https://your-app-name.up.railway.app
```

Copy this URL - you'll need it for the frontend.

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 2.2 Import Project
1. Click "Add New Project"
2. Import your GitHub repository: `Phase_2_Fullstack_Todo_App`
3. Vercel will automatically detect Next.js

### 2.3 Configure Build Settings
Vercel should auto-detect these settings from `vercel.json`:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/out`
- **Install Command**: `cd frontend && npm install`

### 2.4 Configure Environment Variables
Add this environment variable in Vercel:

```env
NEXT_PUBLIC_API_URL=https://your-app-name.up.railway.app
```

Replace `your-app-name.up.railway.app` with your Railway backend URL from Step 1.4.

### 2.5 Deploy
Click "Deploy" and wait for the build to complete.

## Step 3: Update CORS Settings

After getting your Vercel URL (e.g., `https://your-app.vercel.app`):

1. Go to Railway dashboard
2. Add your Vercel URL to the CORS_ORIGINS environment variable:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:8002,https://your-app.vercel.app
```

3. Redeploy the backend on Railway

## Step 4: Test the Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try signing up with a new account
3. Create, update, and delete tasks
4. Verify all features work correctly

## Troubleshooting

### Frontend can't connect to backend
- Check that `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL
- Verify CORS settings in Railway include your Vercel URL
- Check Railway logs for errors

### Backend crashes on Railway
- Check Railway logs for error messages
- Verify all environment variables are set correctly
- Ensure `DATABASE_URL` is set to `sqlite:///./todo.db`

### Database not persisting
- Railway's free tier may reset the database on redeploy
- For production, consider upgrading to Railway's persistent storage
- Or migrate to a hosted database like PostgreSQL

## Alternative: Deploy Both on Same Platform

### Option 1: Deploy Everything on Railway
1. Deploy backend as described above
2. Build frontend locally: `cd frontend && npm run build`
3. Copy `frontend/out/*` to `backend/static/`
4. Update `backend/main.py` to serve static files (revert to original)
5. Deploy to Railway

### Option 2: Deploy Everything on Render
1. Create account on https://render.com
2. Create Web Service for backend
3. Create Static Site for frontend
4. Configure environment variables as above

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] JWT_SECRET is secure and unique
- [ ] Test signup/signin flow
- [ ] Test task CRUD operations
- [ ] Test on mobile devices
- [ ] Monitor error logs

## Monitoring

### Railway Logs
```bash
# View logs in Railway dashboard
# Or use Railway CLI:
railway logs
```

### Vercel Logs
```bash
# View logs in Vercel dashboard
# Or use Vercel CLI:
vercel logs
```

## Updating the Application

### Update Backend
1. Push changes to GitHub
2. Railway will automatically redeploy

### Update Frontend
1. Push changes to GitHub
2. Vercel will automatically redeploy

## Cost Estimates

- **Vercel**: Free tier (100GB bandwidth, unlimited deployments)
- **Railway**: Free tier ($5 credit/month, ~500 hours)
- **Total**: $0/month for hobby projects

## Support

If you encounter issues:
1. Check Railway logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify environment variables are set correctly
4. Test locally first to isolate the issue

---

Built by Umema Sultan
