import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { HttpError } from '../utils/http-error';

export const requireRoles = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(new HttpError(403, 'Forbidden'));
    return;
  }
  next();
};
