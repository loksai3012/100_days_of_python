import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { loginUser, logoutUser, refreshUserToken, registerUser } from './auth.service';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body.email, req.body.password);
  res.status(200).json({ success: true, data: result });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.body.refreshToken as string;
  const result = await refreshUserToken(token);
  res.status(200).json({ success: true, data: result });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.body.refreshToken as string;
  await logoutUser(token);
  res.status(200).json({ success: true, message: 'Logged out' });
});
