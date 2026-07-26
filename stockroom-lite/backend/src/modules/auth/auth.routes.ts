import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate';
import { login, logout, refresh, register } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/refresh', validate(z.object({ refreshToken: z.string().min(10) })), refresh);
authRouter.post('/logout', validate(z.object({ refreshToken: z.string().min(10) })), logout);

export default authRouter;
