import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { HttpError } from '../utils/http-error';

export const validate = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    next(new HttpError(400, result.error.errors.map((e) => e.message).join(', ')));
    return;
  }
  req.body = result.data;
  next();
};
