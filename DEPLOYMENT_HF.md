# Hugging Face Spaces Deployment Guide

Complete guide to deploy the Hackathon Todo Application on Hugging Face Spaces.

## 📋 Prerequisites

1. **Hugging Face Account**: Create account at https://huggingface.co
2. **Neon PostgreSQL Database**:
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string
3. **GitHub Repository**: Your code should be in a GitHub repository

## 🚀 Deployment Steps

### Step 1: Create New Space

1. Go to https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Configure:
   - **Space name**: `hackathon-todo-app` (or your choice)
   - **License**: MIT
   - **Select SDK**: **Docker**
   - **Space hardware**: CPU basic (free tier)
   - **Visibility**: Public or Private

### Step 2: Clone Your Space Repository

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/hackathon-todo-app
cd hackathon-todo-app
```

### Step 3: Copy Deployment Files

Copy these files from your project to the Space repository:

```bash
# Copy all necessary files
cp /path/to/your/project/Dockerfile .
cp /path/to/your/project/supervisord.conf .
cp /path/to/your/project/start-hf.sh .
cp /path/to/your/project/README_HF.md ./README.md
cp /path/to/your/project/.dockerignore .

# Copy application directories
cp -r /path/to/your/project/frontend .
cp -r /path/to/your/project/backend .
```

### Step 4: Configure Environment Variables

In Hugging Face Spaces settings:

1. Go to your Space → **Settings** → **Variables and secrets**
2. Add these **Secrets** (not variables, for security):

```
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

3. Add these **Variables**:

```
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=https://huggingface.co,https://hf.space
APP_NAME=Hackathon Todo API
APP_VERSION=0.1.0
DEBUG=False
PORT=8000
FRONTEND_PORT=7860
```

### Step 5: Push to Hugging Face

```bash
git add .
git commit -m "Initial deployment to Hugging Face Spaces"
git push
```

### Step 6: Wait for Build

1. Hugging Face will automatically build your Docker container
2. Build time: ~5-10 minutes
3. Monitor build logs in the Space interface
4. Status will change from "Building" to "Running"

### Step 7: Access Your Application

Once deployed, your app will be available at:
```
https://YOUR_USERNAME-hackathon-todo-app.hf.space
```

## 🔧 Configuration Details

### Port Configuration

- **Frontend**: Port 7860 (Hugging Face Spaces default)
- **Backend**: Port 8000 (internal)
- **Communication**: Frontend connects to backend via localhost

### Database Setup

The application will automatically:
1. Connect to your Neon PostgreSQL database
2. Create necessary tables on first run
3. Handle migrations

### CORS Configuration

Update `CORS_ORIGINS` to include your Space URL:
```
CORS_ORIGINS=https://huggingface.co,https://hf.space,https://YOUR_USERNAME-hackathon-todo-app.hf.space
```

## 🐛 Troubleshooting

### Build Fails

**Issue**: Docker build fails
**Solution**:
- Check Dockerfile syntax
- Verify all files are committed
- Check build logs for specific errors

### Application Won't Start

**Issue**: Container starts but app doesn't load
**Solution**:
- Verify environment variables are set correctly
- Check DATABASE_URL is valid
- Review application logs in Space interface

### Database Connection Error

**Issue**: "Could not connect to database"
**Solution**:
- Verify DATABASE_URL format: `postgresql://user:pass@host/db?sslmode=require`
- Check Neon database is active
- Verify IP allowlist in Neon (should allow all IPs for Hugging Face)

### Frontend Can't Reach Backend

**Issue**: API calls fail with network errors
**Solution**:
- Verify both services are running (check logs)
- Ensure NEXT_PUBLIC_API_URL is set correctly in Dockerfile
- Check supervisord.conf has both programs

### CORS Errors

**Issue**: "CORS policy blocked"
**Solution**:
- Add your Space URL to CORS_ORIGINS
- Format: `https://username-spacename.hf.space`
- Restart the Space after updating

## 📊 Monitoring

### View Logs

1. Go to your Space
2. Click **"Logs"** tab
3. Monitor both frontend and backend logs

### Check Health

Access health endpoint:
```
https://YOUR_USERNAME-hackathon-todo-app.hf.space/api/v1/health
```

Expected response:
```json
{
  "status": "healthy",
  "app": "Hackathon Todo API",
  "version": "0.1.0"
}
```

## 🔄 Updating Your Deployment

To update your application:

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push
```

Hugging Face will automatically rebuild and redeploy.

## 🎯 Production Checklist

Before going live:

- [ ] DATABASE_URL points to production Neon database
- [ ] JWT_SECRET is strong (minimum 32 characters)
- [ ] DEBUG is set to False
- [ ] CORS_ORIGINS includes your Space URL
- [ ] All environment variables are configured
- [ ] Database tables are created
- [ ] Health endpoint returns 200
- [ ] Frontend loads correctly
- [ ] Authentication works (sign up/login)
- [ ] Tasks can be created, edited, deleted
- [ ] No errors in logs

## 📚 Additional Resources

- **Hugging Face Spaces Docs**: https://huggingface.co/docs/hub/spaces
- **Docker Spaces Guide**: https://huggingface.co/docs/hub/spaces-sdks-docker
- **Neon PostgreSQL Docs**: https://neon.tech/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Next.js Docs**: https://nextjs.org/docs

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Hugging Face Spaces logs
3. Verify all environment variables
4. Check Neon database connectivity
5. Open an issue on GitHub repository

## 📝 Notes

- **Free Tier Limitations**: CPU basic tier may have slower performance
- **Sleep Mode**: Free Spaces may sleep after inactivity
- **Database**: Neon free tier has storage limits
- **Persistence**: Data is stored in PostgreSQL, not in container

## 🎉 Success!

Once deployed, you'll have a fully functional todo application running on Hugging Face Spaces with:
- ✅ Public URL
- ✅ Persistent database
- ✅ Automatic HTTPS
- ✅ Free hosting (on free tier)
