# File-by-File Explanation

## Backend

### `/backend/src/server.js`
- Purpose: Starts Express server.
- Responsibilities: Bind app to configured port.
- Functions: Initializes listener.
- Execution Flow: loads app -> reads env -> starts server.
- Dependencies: `app.js`, `config/env.js`.
- Example Usage: `npm run dev`.
- Interview Q: Why separate `server.js` from `app.js`?

### `/backend/src/app.js`
- Purpose: Express app assembly.
- Responsibilities: middleware setup, routes registration, error handler binding.
- Functions: health check endpoint and API mount points.
- Execution Flow: middleware -> route -> auth/validation -> controller -> response/error.
- Dependencies: route files, auth middleware, error handler.
- Example Usage: imported by `server.js`.
- Interview Q: Why keep centralized middleware order?

### `/backend/prisma/schema.prisma`
- Purpose: Database schema and ORM model mapping.
- Responsibilities: table definitions, relations, enums, constraints.
- Functions: drives Prisma Client and migrations.
- Execution Flow: schema -> migration -> generated client used by controllers.
- Dependencies: MySQL datasource.
- Example Usage: `npx prisma migrate dev --name init`.
- Interview Q: How does Prisma enforce relation integrity?

### `/backend/src/middleware/auth.js`
- Purpose: AuthN + authZ gate.
- Responsibilities: verify JWT and admin role.
- Functions: `authenticate`, `authorizeAdmin`.
- Execution Flow: decode token -> attach user -> role check.
- Dependencies: `utils/jwt.js`, `apiResponse.js`.
- Example Usage: applied on protected routes.
- Interview Q: Difference between authentication and authorization?

### `/backend/src/middleware/validate.js`
- Purpose: Input validation middleware.
- Responsibilities: parse `body`, `params`, `query` via Zod schemas.
- Functions: generic `validate(schema)`.
- Execution Flow: route -> validate -> controller.
- Dependencies: Zod schemas from controllers.
- Example Usage: `router.post('/', validate(schema), handler)`.
- Interview Q: Why validate at API boundary?

### `/backend/src/controllers/*`
- Purpose: Business logic for each module.
- Responsibilities: DB operations, stock math, and response composition.
- Functions: CRUD, reports, dashboard, stock transactions.
- Execution Flow: validate/auth -> controller -> Prisma -> response helper.
- Dependencies: Prisma client, helpers.
- Example Usage: route handlers.
- Interview Q: Why keep controllers thin and focused?

### `/backend/src/routes/*`
- Purpose: Endpoint definitions.
- Responsibilities: method/path mapping with middleware chain.
- Functions: route registration per module.
- Execution Flow: HTTP request hits route -> middleware -> controller.
- Dependencies: controllers, middleware.
- Example Usage: mounted in `app.js`.
- Interview Q: Benefits of modular route files?

## Frontend

### `/frontend/src/app/app.routes.ts`
- Purpose: Route map for all pages.
- Responsibilities: page navigation and auth-guarded paths.
- Functions: route list.
- Execution Flow: URL -> route -> standalone component.
- Dependencies: components, `authGuard`.
- Example Usage: `/products` opens products page.
- Interview Q: Why protect routes client-side and server-side both?

### `/frontend/src/app/core/auth.guard.ts`
- Purpose: Prevent unauthenticated page access.
- Responsibilities: check token state and redirect to login.
- Functions: `authGuard`.
- Execution Flow: route evaluation -> allow or redirect.
- Dependencies: `AuthService`, `Router`.
- Example Usage: attached to protected routes.
- Interview Q: Can client guard replace backend auth?

### `/frontend/src/app/services/api.service.ts`
- Purpose: Reusable HTTP wrapper.
- Responsibilities: base URL handling, auth header injection.
- Functions: get/post/put/delete helpers.
- Execution Flow: component/service call -> HttpClient.
- Dependencies: Angular HttpClient.
- Example Usage: `api.get('/products')`.
- Interview Q: Why centralize API calls?

### `/frontend/src/app/services/auth.service.ts`
- Purpose: Login/logout and auth state.
- Responsibilities: token storage and user signal management.
- Functions: `login`, `logout`, `isAuthenticated`.
- Execution Flow: login request -> save token/user -> route access.
- Dependencies: `ApiService`, router.
- Example Usage: login page submit.
- Interview Q: What are token storage tradeoffs?

### `/frontend/src/app/pages/*`
- Purpose: Feature pages for all modules.
- Responsibilities: UI actions, form handling, API integration.
- Functions: CRUD operations, stock operations, report triggers.
- Execution Flow: user action -> form validation -> API call -> UI refresh.
- Dependencies: Material UI modules, API service.
- Example Usage: add product, stock out, view dashboard.
- Interview Q: Why split each module into its own page component?
