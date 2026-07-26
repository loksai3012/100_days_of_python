# Stockroom Lite – Inventory Management System

Stockroom Lite is a full-stack inventory management system for a small shop. It supports product, category, supplier, stock, dashboard, and report workflows with JWT-based admin authentication.

## Tech Stack
- Frontend: Angular 17, Angular Material, TypeScript
- Backend: Node.js, Express.js
- Database: MySQL
- ORM: Prisma
- Security: JWT, bcrypt

## Project Structure
- `/backend` – Express + Prisma REST API
- `/frontend` – Angular application
- `/docs` – specification, architecture, API docs, interview prep

## Features
- Admin authentication (register/login)
- Product CRUD with image upload and search
- Category CRUD
- Supplier CRUD
- Stock in / stock out with transaction logs
- Auto quantity update and low-stock tracking
- Dashboard metrics
- Inventory and sales reports
- Inventory PDF export

## Local Setup (MySQL)
1. Create a MySQL database named `stockroom_lite`.
2. Backend setup:
   ```bash
   cd /home/runner/work/100_days_of_python/100_days_of_python/stockroom-lite/backend
   cp .env.example .env
   # update DATABASE_URL and JWT_SECRET in .env
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   ```
3. Frontend setup:
   ```bash
   cd /home/runner/work/100_days_of_python/100_days_of_python/stockroom-lite/frontend
   npm install
   npm start
   ```
4. Open `http://localhost:4200`.

## API Base URL
- `http://localhost:5000/api`

## Optional Docker
Docker setup instructions are available in `docs/deployment-guide.md`.

## Documentation Index
- `docs/project-specification.md`
- `docs/database-design.md`
- `docs/api-documentation.md`
- `docs/authentication-flow.md`
- `docs/file-by-file-explanation.md`
- `docs/deployment-guide.md`
- `docs/interview-guide.md`
