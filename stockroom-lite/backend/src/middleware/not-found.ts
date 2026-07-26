import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/http-error';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new HttpError(404, 'Resource not found'));
};
