# Stockroom Lite

Enterprise-style inventory management system scaffold with Angular + Node.js + Prisma + MySQL.

## Monorepo Structure
- `frontend/` Angular application scaffold
- `backend/` Express + TypeScript API scaffold
- `backend/prisma/` Prisma data model
- `deploy/` Nginx configuration
- `docs/` architecture and implementation documentation
- `docker-compose.yml` local orchestration

## Quick Start
1. Backend setup:
   - `cd backend`
   - `cp .env.example .env`
   - `npm install`
   - `npm run dev`
2. Frontend setup:
   - `cd frontend`
   - `npm install`
   - `npm start`
3. Docker setup:
   - `docker compose up --build`

## Current Status
This commit establishes a production-oriented foundation and module scaffolding. Business logic and advanced workflows are intentionally incremental.
