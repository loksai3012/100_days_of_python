import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

const signToken = (payload: object, secret: Secret, expiresIn: string): string =>
  jwt.sign(payload, secret, { expiresIn } as SignOptions);

export const createAccessToken = (payload: object): string =>
  signToken(payload, env.JWT_ACCESS_SECRET, env.ACCESS_TOKEN_EXPIRES_IN);

export const createRefreshToken = (payload: object): string =>
  signToken(payload, env.JWT_REFRESH_SECRET, env.REFRESH_TOKEN_EXPIRES_IN);

export const verifyAccessToken = (token: string): jwt.JwtPayload =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;

export const verifyRefreshToken = (token: string): jwt.JwtPayload =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
