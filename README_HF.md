---
title: Hackathon Todo App
emoji: ✅
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
license: mit
---

# Hackathon Todo Application

A production-ready, full-stack todo application built with FastAPI, Next.js, PostgreSQL, and JWT authentication.

## Features

- 🔐 JWT Authentication
- ✅ Create, Read, Update, Delete tasks
- 🎨 Modern dark UI with Tailwind CSS
- 🚀 Fast API with FastAPI
- 💾 PostgreSQL database with SQLModel ORM

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11
- **Database**: Neon PostgreSQL
- **ORM**: SQLModel
- **Authentication**: JWT

## Environment Variables

Configure these in Hugging Face Spaces settings:

- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_ALGORITHM`: HS256 (default)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: 30 (default)
- `CORS_ORIGINS`: https://huggingface.co (or your custom domain)
- `APP_NAME`: Hackathon Todo API
- `APP_VERSION`: 0.1.0
- `DEBUG`: False

## Usage

1. Sign up for a new account
2. Log in with your credentials
3. Create, edit, and manage your tasks
4. Toggle task completion status

## License

MIT License - See LICENSE file for details
