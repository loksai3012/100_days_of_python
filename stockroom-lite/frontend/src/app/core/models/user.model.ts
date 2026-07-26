export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accessToken: string;
}
