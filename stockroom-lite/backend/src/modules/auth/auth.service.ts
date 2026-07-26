import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { HttpError } from '../../utils/http-error';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../utils/jwt';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export const registerUser = async (payload: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) {
    throw new HttpError(409, 'Email already exists');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      passwordHash,
      role: payload.role ?? Role.STAFF,
    },
    select: { id: true, name: true, email: true, role: true },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new HttpError(401, 'Invalid credentials');

  const tokenPayload = { sub: user.id, role: user.role, email: user.email };
  const accessToken = createAccessToken(tokenPayload);
  const refreshToken = createRefreshToken(tokenPayload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const refreshUserToken = async (token: string) => {
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw new HttpError(401, 'Invalid refresh token');
  }

  const payload = verifyRefreshToken(token);
  const accessToken = createAccessToken({
    sub: payload.sub,
    role: payload.role,
    email: payload.email,
  });

  return { accessToken };
};

export const logoutUser = async (token: string): Promise<void> => {
  await prisma.refreshToken.updateMany({
    where: { token },
    data: { revokedAt: new Date() },
  });
};
