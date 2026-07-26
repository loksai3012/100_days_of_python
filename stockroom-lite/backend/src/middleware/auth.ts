import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { HttpError } from '../utils/http-error';

export const auth = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token) {
    next(new HttpError(401, 'Unauthorized'));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      userId: String(payload.sub),
      role: payload.role as 'ADMIN' | 'MANAGER' | 'STAFF',
      email: String(payload.email),
    };
    next();
  } catch {
    next(new HttpError(401, 'Invalid token'));
  }
};
