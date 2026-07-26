# Authentication Flow

1. Admin registers or already exists in system.
2. Admin submits login credentials.
3. Backend verifies email and bcrypt password hash.
4. Backend returns JWT token and user payload.
5. Frontend stores token in localStorage.
6. Frontend sends token in `Authorization` header.
7. Backend middleware verifies token and role.
8. Protected routes are accessible only to `ADMIN`.
9. Logout clears local token and user state.

## Security Notes
- Passwords are never stored in plain text.
- JWT expiration is configurable.
- Role check enforces admin-only access.
