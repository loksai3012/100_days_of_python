const { z } = require('zod');
const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');

const stockSchema = z.object({
  body: z.object({
    productId: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().positive(),
    note: z.string().optional().nullable(),
    unitPrice: z.coerce.number().positive().optional()
  }),
  params: z.object({}).optional().default({}),
  query: z.object({}).optional().default({})
});

const listSchema = z.object({
  body: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
  query: z.object({ productId: z.coerce.number().int().positive().optional() }).optional().default({})
});

async function stockIn(req, res, next) {
  try {
    const { productId, quantity, note, unitPrice } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id: productId },
        data: { quantity: { increment: quantity } }
      });

      const transaction = await tx.stockTransaction.create({
        data: {
          productId,
          type: 'IN',
          quantity,
          note,
          unitPrice,
          performedBy: req.user.id
        }
      });

      return { product, transaction };
    });

    return sendSuccess(res, result, 'Stock added');
  } catch (error) { return next(error); }
}

async function stockOut(req, res, next) {
  try {
    const { productId, quantity, note, unitPrice } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const current = await tx.product.findUnique({ where: { id: productId } });
      if (!current) {
        const err = new Error('Product not found');
        err.statusCode = 404;
        throw err;
      }
      if (current.quantity < quantity) {
        const err = new Error('Insufficient stock');
        err.statusCode = 400;
        throw err;
      }

      const product = await tx.product.update({
        where: { id: productId },
        data: { quantity: { decrement: quantity } }
      });

      const transaction = await tx.stockTransaction.create({
        data: {
          productId,
          type: 'OUT',
          quantity,
          note,
          unitPrice,
          performedBy: req.user.id
        }
      });

      return { product, transaction };
    });

    return sendSuccess(res, result, 'Stock removed');
  } catch (error) { return next(error); }
}

async function listTransactions(req, res, next) {
  try {
    const { productId } = req.query;
    const transactions = await prisma.stockTransaction.findMany({
      where: productId ? { productId } : undefined,
      include: { product: true },
      orderBy: { createdAt: 'desc' }
    });
    return sendSuccess(res, transactions);
  } catch (error) { return next(error); }
}

module.exports = { stockSchema, listSchema, stockIn, stockOut, listTransactions };
