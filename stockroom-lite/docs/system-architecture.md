# System Architecture

## Layers
- Angular frontend (role-aware UI, route guards, modular features)
- Express API (REST routes, middleware pipeline, RBAC, validation)
- Prisma ORM (transaction boundary and schema mapping)
- MySQL (relational data, constraints, indexes)

## Request Flow
1. Client calls `/api/*` with JWT.
2. Auth middleware validates token.
3. RBAC middleware enforces role access.
4. Controller delegates to service.
5. Service performs Prisma operations with business rules.
6. Error middleware maps failures to structured responses.
