const { z } = require('zod');
const prisma = require('../config/prisma');
const env = require('../config/env');
const { sendSuccess } = require('../utils/apiResponse');

const productBody = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  description: z.string().optional().nullable(),
  unitPrice: z.coerce.number().positive(),
  quantity: z.coerce.number().int().nonnegative().default(0),
  lowStockThreshold: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive(),
  supplierId: z.coerce.number().int().positive()
});

const idParam = z.object({ id: z.coerce.number().int().positive() });

const createProductSchema = z.object({ body: productBody, params: z.object({}).optional().default({}), query: z.object({}).optional().default({}) });
const updateProductSchema = z.object({ body: productBody.partial(), params: idParam, query: z.object({}).optional().default({}) });
const idSchema = z.object({ body: z.object({}).optional().default({}), params: idParam, query: z.object({ q: z.string().optional() }).optional().default({}) });
const listSchema = z.object({ body: z.object({}).optional().default({}), params: z.object({}).optional().default({}), query: z.object({ q: z.string().optional() }).optional().default({}) });

async function listProducts(req, res, next) {
  try {
    const { q } = req.query;
    const products = await prisma.product.findMany({
      where: q ? {
        OR: [
          { name: { contains: q } },
          { sku: { contains: q } }
        ]
      } : undefined,
      include: {
        category: true,
        supplier: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return sendSuccess(res, products);
  } catch (error) { return next(error); }
}

async function getProduct(req, res, next) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true, supplier: true, transactions: { take: 20, orderBy: { createdAt: 'desc' } } }
    });
    return sendSuccess(res, product);
  } catch (error) { return next(error); }
}

async function createProduct(req, res, next) {
  try {
    const payload = {
      ...req.body,
      lowStockThreshold: req.body.lowStockThreshold || env.lowStockDefaultThreshold,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined
    };

    const product = await prisma.product.create({ data: payload, include: { category: true, supplier: true } });
    return sendSuccess(res, product, 'Product created', 201);
  } catch (error) { return next(error); }
}

async function updateProduct(req, res, next) {
  try {
    const payload = { ...req.body };
    if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

    const product = await prisma.product.update({ where: { id: req.params.id }, data: payload, include: { category: true, supplier: true } });
    return sendSuccess(res, product, 'Product updated');
  } catch (error) { return next(error); }
}

async function deleteProduct(req, res, next) {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    return sendSuccess(res, null, 'Product deleted');
  } catch (error) { return next(error); }
}

module.exports = {
  listSchema,
  idSchema,
  createProductSchema,
  updateProductSchema,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
