# Deployment Guide (Starter)

## Local
- Use `docker compose up --build` from `stockroom-lite/`.
- Frontend: `http://localhost:8080`
- Backend health: `http://localhost:5000/health`

## Production Considerations
- Replace `.env.example` with secure environment secrets.
- Move MySQL to managed service with backups.
- Add TLS termination and WAF.
- Add CI/CD workflow for build, test, and image publishing.
