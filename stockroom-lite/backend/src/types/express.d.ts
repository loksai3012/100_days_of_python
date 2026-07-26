import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface UserContext {
      userId: string;
      role: Role;
      email: string;
    }

    interface Request {
      user?: UserContext;
    }
  }
}

export {};
