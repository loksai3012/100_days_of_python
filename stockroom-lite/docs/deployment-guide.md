# Deployment Guide

## Local Deployment (Recommended)

### 1. Database
- Install MySQL.
- Create DB: `stockroom_lite`.

### 2. Backend
```bash
cd /home/runner/work/100_days_of_python/100_days_of_python/stockroom-lite/backend
cp .env.example .env
# update DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### 3. Frontend
```bash
cd /home/runner/work/100_days_of_python/100_days_of_python/stockroom-lite/frontend
npm install
npm start
```

### 4. Access
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:5000`

## Optional Docker (reference)
You can containerize:
- MySQL container
- Backend container
- Frontend container

Suggested steps:
1. Create `Dockerfile` in backend and frontend.
2. Create `docker-compose.yml` for all services.
3. Configure backend `DATABASE_URL` to MySQL service name.
