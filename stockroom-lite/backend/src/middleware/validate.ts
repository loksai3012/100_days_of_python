import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HttpError } from '../utils/http-error';

export const validate = (schema: z.ZodTypeAny) => (req: Request, _res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    next(new HttpError(400, result.error.issues.map((issue) => issue.message).join(', ')));
    return;
  }
  req.body = result.data;
  next();
};
