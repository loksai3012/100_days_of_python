const { z } = require('zod');
const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');

const supplierBody = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable()
});

const idParam = z.object({ id: z.coerce.number().int().positive() });

const createSupplierSchema = z.object({ body: supplierBody, params: z.object({}).optional().default({}), query: z.object({}).optional().default({}) });
const updateSupplierSchema = z.object({ body: supplierBody.partial(), params: idParam, query: z.object({}).optional().default({}) });
const idSchema = z.object({ body: z.object({}).optional().default({}), params: idParam, query: z.object({}).optional().default({}) });

async function listSuppliers(req, res, next) {
  try {
    const suppliers = await prisma.supplier.findMany({ orderBy: { createdAt: 'desc' } });
    return sendSuccess(res, suppliers);
  } catch (error) { return next(error); }
}

async function createSupplier(req, res, next) {
  try {
    const supplier = await prisma.supplier.create({ data: req.body });
    return sendSuccess(res, supplier, 'Supplier created', 201);
  } catch (error) { return next(error); }
}

async function updateSupplier(req, res, next) {
  try {
    const supplier = await prisma.supplier.update({ where: { id: req.params.id }, data: req.body });
    return sendSuccess(res, supplier, 'Supplier updated');
  } catch (error) { return next(error); }
}

async function deleteSupplier(req, res, next) {
  try {
    await prisma.supplier.delete({ where: { id: req.params.id } });
    return sendSuccess(res, null, 'Supplier deleted');
  } catch (error) { return next(error); }
}

module.exports = {
  createSupplierSchema,
  updateSupplierSchema,
  idSchema,
  listSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
