# Interview Guide

## HR Questions (20)

1. **Q:** Tell me about yourself.
   **A:** I am a developer focused on building practical full-stack apps with clean APIs, secure authentication, and clear documentation.

2. **Q:** Why do you want this internship?
   **A:** It gives me production exposure and mentorship while I contribute with strong execution on full-stack tasks.

3. **Q:** What are your strengths?
   **A:** Structured problem solving, consistency, and clear communication with stakeholders.

4. **Q:** What is your biggest weakness?
   **A:** I sometimes over-polish; now I timebox and prioritize impact first.

5. **Q:** How do you handle deadlines?
   **A:** I break work into milestones, ship increments, and communicate blockers early.

6. **Q:** Describe a challenge you solved.
   **A:** I resolved stock inconsistency by introducing transaction logs and atomic updates.

7. **Q:** How do you work in a team?
   **A:** I align early on requirements, write readable code, and provide respectful feedback.

8. **Q:** How do you handle feedback?
   **A:** I treat feedback as data, verify it, and convert it into concrete improvements.

9. **Q:** Where do you see yourself in 3 years?
   **A:** As a reliable software engineer owning end-to-end features.

10. **Q:** Why should we hire you?
   **A:** I deliver functional software with security, documentation, and maintainability in mind.

11. **Q:** How do you learn new technologies?
   **A:** I build small projects, read docs deeply, and apply concepts immediately.

12. **Q:** How do you prioritize tasks?
   **A:** I prioritize by business impact, risk, and dependency order.

13. **Q:** What motivates you?
   **A:** Turning real user problems into robust software systems.

14. **Q:** How do you handle failure?
   **A:** I run a quick retrospective, isolate root cause, and update process.

15. **Q:** Can you work under pressure?
   **A:** Yes, by staying structured and reducing decision noise through checklists.

16. **Q:** What does professionalism mean to you?
   **A:** Reliability, accountability, and transparent communication.

17. **Q:** How do you resolve conflicts?
   **A:** I focus on facts, shared goals, and tradeoff-based decisions.

18. **Q:** What are your salary expectations?
   **A:** I am flexible and aligned with role scope and market standards.

19. **Q:** Are you open to relocation or hybrid work?
   **A:** Yes, I can adapt based on team requirements.

20. **Q:** Do you have questions for us?
   **A:** Yes—team architecture practices, mentorship model, and success metrics for interns.

## Angular Questions (20)

1. **Q:** What is Angular?
   **A:** A TypeScript-based frontend framework for building component-driven SPA applications.

2. **Q:** What are standalone components?
   **A:** Components that declare their own imports and do not require NgModules.

3. **Q:** What is data binding?
   **A:** Synchronization between template and component via interpolation, property, event, and two-way binding.

4. **Q:** What is dependency injection in Angular?
   **A:** A system that provides class dependencies via injectors for loose coupling.

5. **Q:** What are Angular guards?
   **A:** Route lifecycle hooks that allow or block navigation based on conditions.

6. **Q:** Difference between template-driven and reactive forms?
   **A:** Reactive forms are model-driven and scalable; template-driven are simpler but less explicit.

7. **Q:** What is HttpClient used for?
   **A:** Making HTTP requests and handling API integration.

8. **Q:** What are interceptors?
   **A:** Middleware-like handlers for requests/responses, useful for auth headers and global errors.

9. **Q:** What is lazy loading?
   **A:** Loading feature routes on demand to reduce initial bundle size.

10. **Q:** What is change detection?
   **A:** Angular mechanism that updates views when component state changes.

11. **Q:** Purpose of router-outlet?
   **A:** Placeholder where routed components render.

12. **Q:** What is RxJS in Angular?
   **A:** Reactive library used for async streams like HTTP, events, and state flows.

13. **Q:** What are pipes?
   **A:** Template transforms for display formatting, like date or currency.

14. **Q:** How do you secure Angular routes?
   **A:** Use auth guards and still enforce security in backend APIs.

15. **Q:** What is Angular Material?
   **A:** UI component library implementing Material Design.

16. **Q:** How do you optimize Angular performance?
   **A:** Lazy load routes, use trackBy, avoid unnecessary re-renders, optimize API calls.

17. **Q:** What is environment.ts used for?
   **A:** Store environment-specific values such as API base URLs.

18. **Q:** What are lifecycle hooks?
   **A:** Component callbacks like ngOnInit and ngOnDestroy for setup/cleanup.

19. **Q:** How is form validation implemented?
   **A:** Using built-in validators and custom validators in reactive forms.

20. **Q:** How do you structure large Angular apps?
   **A:** Feature-based folders with shared services, guards, and reusable UI components.

## Node.js Questions (20)

1. **Q:** What is Node.js?
   **A:** A JavaScript runtime built on V8 for server-side applications.

2. **Q:** Why use Node.js for APIs?
   **A:** Non-blocking I/O and a large ecosystem enable fast API development.

3. **Q:** What is event loop?
   **A:** Mechanism that handles async callbacks without blocking the main thread.

4. **Q:** What are streams?
   **A:** Data processing interfaces for efficient chunk-based handling.

5. **Q:** What is npm?
   **A:** Node package manager for dependency management and scripts.

6. **Q:** Difference between CommonJS and ES Modules?
   **A:** CommonJS uses require/module.exports; ESM uses import/export.

7. **Q:** What is middleware concept?
   **A:** Functions that process request/response pipeline before route handlers.

8. **Q:** How do you manage environment configs?
   **A:** Use .env files and load via dotenv.

9. **Q:** How do you handle errors in async code?
   **A:** Try/catch with centralized error middleware.

10. **Q:** What is package-lock.json?
   **A:** Dependency lockfile ensuring reproducible installs.

11. **Q:** Why use nodemon?
   **A:** Automatically restarts server during development.

12. **Q:** How do you secure a Node app?
   **A:** Input validation, auth, secure headers, and minimal exposure of internals.

13. **Q:** What is CORS?
   **A:** Policy controlling cross-origin browser requests.

14. **Q:** How do you improve Node API scalability?
   **A:** Stateless services, caching, proper DB indexing, and horizontal scaling.

15. **Q:** What is process.env?
   **A:** Access point for environment variables in Node.

16. **Q:** How does Node handle concurrency?
   **A:** Single-threaded event loop with async operations offloaded to system threads.

17. **Q:** What are worker threads?
   **A:** API for CPU-heavy parallel work outside main event loop.

18. **Q:** How do you profile Node performance?
   **A:** Use logs, built-in profilers, and monitoring tools.

19. **Q:** What are child processes?
   **A:** Node capability to spawn external processes for isolated work.

20. **Q:** How do you structure a Node backend?
   **A:** Layer by routes, middleware, controllers, services, and data access.

## Express Questions (20)

1. **Q:** What is Express.js?
   **A:** A minimal web framework for Node.js with middleware and routing.

2. **Q:** What is routing in Express?
   **A:** Mapping HTTP methods and paths to handlers.

3. **Q:** What is express.json()?
   **A:** Middleware to parse JSON request bodies.

4. **Q:** How do you create middleware?
   **A:** Functions with (req, res, next) signature.

5. **Q:** How does error middleware differ?
   **A:** It has four args (err, req, res, next) and handles thrown errors.

6. **Q:** Why use Router() modules?
   **A:** To organize endpoints by feature and improve maintainability.

7. **Q:** How do you serve static files?
   **A:** Use express.static(path).

8. **Q:** How do you protect routes?
   **A:** Attach auth middleware before handlers.

9. **Q:** What is req.params vs req.query?
   **A:** params from URL path segments; query from URL query string.

10. **Q:** How do you handle file uploads?
   **A:** Use multer middleware for multipart form data.

11. **Q:** What is next() used for?
   **A:** Pass control to next middleware/handler.

12. **Q:** How do you standardize API responses?
   **A:** Wrap all responses in a consistent success/message/data envelope.

13. **Q:** How do you test Express APIs?
   **A:** Use integration tests with supertest and mock/test DB data.

14. **Q:** How to enable CORS in Express?
   **A:** Use cors middleware with allowed origins configuration.

15. **Q:** How do you log requests?
   **A:** Use morgan middleware.

16. **Q:** How does Express handle async errors?
   **A:** Errors must be caught and forwarded to error middleware.

17. **Q:** Why use helmet?
   **A:** Adds secure HTTP headers.

18. **Q:** How to version APIs?
   **A:** Prefix routes such as /api/v1.

19. **Q:** What is idempotency?
   **A:** Operation can be repeated without additional side effects (e.g., PUT).

20. **Q:** How do you design clean route layers?
   **A:** Keep routes thin; delegate business logic to controllers/services.

## MySQL Questions (20)

1. **Q:** What is MySQL?
   **A:** A relational database management system using SQL.

2. **Q:** What is a primary key?
   **A:** A unique identifier for each row.

3. **Q:** What is a foreign key?
   **A:** A field referencing another table’s primary key.

4. **Q:** What is normalization?
   **A:** Structuring data to reduce redundancy and improve integrity.

5. **Q:** Why use indexes?
   **A:** To speed up query performance on frequent filters/joins.

6. **Q:** What is ACID?
   **A:** Atomicity, Consistency, Isolation, Durability for reliable transactions.

7. **Q:** Difference between INNER JOIN and LEFT JOIN?
   **A:** INNER returns matching rows only; LEFT returns all left rows plus matches.

8. **Q:** What is a transaction?
   **A:** A sequence of DB operations committed or rolled back as one unit.

9. **Q:** How do you prevent SQL injection?
   **A:** Use parameterized queries/ORM and validate input.

10. **Q:** What is unique constraint?
   **A:** Ensures all values in a column are distinct.

11. **Q:** What is decimal vs float?
   **A:** Decimal is precise for money; float is approximate.

12. **Q:** How do you paginate results?
   **A:** Use LIMIT and OFFSET or cursor-based patterns.

13. **Q:** What is a schema migration?
   **A:** Versioned database structure change process.

14. **Q:** How to design product-stock tables?
   **A:** Products hold current quantity; transactions store movement history.

15. **Q:** What is composite index?
   **A:** Index on multiple columns for combined filtering/sorting.

16. **Q:** How do you back up MySQL data?
   **A:** Use mysqldump or managed backup snapshots.

17. **Q:** What is referential integrity?
   **A:** Guarantee that relationships between tables stay valid.

18. **Q:** How do you optimize slow queries?
   **A:** Analyze execution plan, add indexes, reduce scanned rows.

19. **Q:** What is COUNT(*) cost consideration?
   **A:** On large tables it can be expensive without optimization or caching.

20. **Q:** What isolation level fits inventory updates?
   **A:** Use transactional updates with suitable isolation to avoid race conditions.

## JWT Questions (20)

1. **Q:** What is JWT?
   **A:** A compact token format for signed claims between parties.

2. **Q:** JWT structure?
   **A:** Header, payload, signature.

3. **Q:** Why use JWT in APIs?
   **A:** Stateless auth that scales well across services.

4. **Q:** Where should JWT be sent?
   **A:** Typically Authorization ******

5. **Q:** Can payload be trusted blindly?
   **A:** No, only after signature verification.

6. **Q:** What is token expiration?
   **A:** Time limit after which token becomes invalid.

7. **Q:** What are refresh tokens?
   **A:** Longer-lived tokens used to issue new access tokens.

8. **Q:** How do you revoke JWTs?
   **A:** Use short expiry plus denylist/versioning strategies.

9. **Q:** What algorithm is common?
   **A:** HS256 for symmetric signing, RS256 for asymmetric.

10. **Q:** What should not be in JWT payload?
   **A:** Sensitive data like passwords or private secrets.

11. **Q:** How is JWT validated in Express?
   **A:** Middleware extracts and verifies token before protected routes.

12. **Q:** Difference between auth and authorization in JWT flow?
   **A:** Auth verifies identity; authorization checks permissions/roles.

13. **Q:** What is clock skew issue?
   **A:** Server/client time differences affecting token validity windows.

14. **Q:** How to store JWT on frontend?
   **A:** Local storage or secure cookie, with tradeoff awareness.

15. **Q:** What is XSS risk with localStorage tokens?
   **A:** Malicious scripts can read tokens if XSS exists.

16. **Q:** How to reduce JWT attack surface?
   **A:** Strong secrets, short expiry, HTTPS, input sanitization.

17. **Q:** What is ****** weakness?
   **A:** Whoever possesses token can use it until expiry.

18. **Q:** Can JWT replace all session needs?
   **A:** Not always; session-based auth can be better for revocation-heavy apps.

19. **Q:** Why include role in JWT?
   **A:** Enables quick authorization checks in middleware.

20. **Q:** How to rotate JWT secret?
   **A:** Use key versioning and gradual token re-issuance.

## REST API Questions (20)

1. **Q:** What is REST?
   **A:** Architectural style using stateless resources over HTTP.

2. **Q:** What is a resource?
   **A:** A domain entity identified by a URL.

3. **Q:** Why use nouns in endpoints?
   **A:** Resources represent objects like /products, /suppliers.

4. **Q:** GET vs POST?
   **A:** GET reads data; POST creates new resource/action.

5. **Q:** PUT vs PATCH?
   **A:** PUT replaces resource; PATCH partially updates.

6. **Q:** DELETE semantics?
   **A:** Removes a resource and should return meaningful status.

7. **Q:** What is statelessness?
   **A:** Each request contains all context needed by server.

8. **Q:** What status code for creation?
   **A:** 201 Created.

9. **Q:** What status code for validation failure?
   **A:** 400 Bad Request.

10. **Q:** What status code for unauthorized?
   **A:** 401 Unauthorized.

11. **Q:** What status code for forbidden?
   **A:** 403 Forbidden.

12. **Q:** How to design filtering/search?
   **A:** Use query params like /products?q=term.

13. **Q:** Why consistent response format?
   **A:** Makes frontend integration and error handling predictable.

14. **Q:** What is API versioning?
   **A:** Maintaining backward compatibility through versioned paths/headers.

15. **Q:** What is idempotent operation?
   **A:** Same request repeated yields same state result.

16. **Q:** How to secure REST APIs?
   **A:** Auth tokens, validation, rate limits, least privilege.

17. **Q:** What is pagination?
   **A:** Chunking large result sets for performance and usability.

18. **Q:** How to document APIs?
   **A:** Endpoint, method, auth, payload, response, and errors.

19. **Q:** Why validate both client and server?
   **A:** Client improves UX; server guarantees integrity.

20. **Q:** How to handle API errors cleanly?
   **A:** Centralized middleware with standardized error envelopes.

## Project Viva Questions (20)

1. **Q:** Why did you build Stockroom Lite?
   **A:** To solve everyday inventory problems with a practical full-stack design.

2. **Q:** Who are target users?
   **A:** Small-shop admins managing stock operations.

3. **Q:** Why choose Angular + Node + MySQL?
   **A:** Strong ecosystem, clean separation, and good full-stack learning coverage.

4. **Q:** How is authentication implemented?
   **A:** JWT tokens with bcrypt password hashing and admin role checks.

5. **Q:** How is stock accuracy maintained?
   **A:** Stock in/out updates are transactional and logged in StockTransactions.

6. **Q:** How is low stock detected?
   **A:** Product quantity is compared against product lowStockThreshold.

7. **Q:** How do you calculate inventory value?
   **A:** Sum of quantity multiplied by unit price for all products.

8. **Q:** How did you handle product images?
   **A:** Multipart upload using multer with image type and size checks.

9. **Q:** How is API security enforced?
   **A:** Token verification, role-based access, validation, and safe middleware defaults.

10. **Q:** How are reports generated?
   **A:** Inventory and sales APIs plus PDF export endpoint.

11. **Q:** How did you design database relations?
   **A:** Products reference category and supplier; transactions reference product.

12. **Q:** How do you prevent invalid stock out?
   **A:** Business rule blocks stock-out requests that exceed available quantity.

13. **Q:** How is frontend organized?
   **A:** Feature pages, shared services, auth guard, and route-based navigation.

14. **Q:** What validation strategy did you use?
   **A:** Zod schema validation for body, query, and params on backend.

15. **Q:** How would you scale this project?
   **A:** Add pagination, caching, audit events, background jobs, and better observability.

16. **Q:** What are current limitations?
   **A:** Single-role system and basic reporting filters.

17. **Q:** What enhancements are next?
   **A:** Role hierarchy, barcode support, supplier purchase orders, and richer analytics.

18. **Q:** How did you test it?
   **A:** Module-level API checks and frontend flow validations for core operations.

19. **Q:** What deployment approach did you design?
   **A:** Local MySQL runbook first, with optional Dockerized service setup.

20. **Q:** What did you learn from this project?
   **A:** How to connect secure backend design with practical admin UX and clear documentation.
