const bcrypt = require('bcryptjs');
const { z } = require('zod');
const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');
const { signToken } = require('../utils/jwt');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role: 'ADMIN' },
      select: { id: true, name: true, email: true, role: true }
    });

    return sendSuccess(res, user, 'User registered', 201);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const token = signToken({ id: user.id, role: user.role, email: user.email });

    return sendSuccess(res, {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }, 'Login successful');
  } catch (error) {
    return next(error);
  }
}

module.exports = { registerSchema, loginSchema, register, login };
