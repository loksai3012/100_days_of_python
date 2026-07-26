const { z } = require('zod');
const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');

const categoryBody = z.object({
  name: z.string().min(2),
  description: z.string().optional().nullable()
});

const idParam = z.object({ id: z.coerce.number().int().positive() });

const createCategorySchema = z.object({ body: categoryBody, params: z.object({}).optional().default({}), query: z.object({}).optional().default({}) });
const updateCategorySchema = z.object({ body: categoryBody.partial(), params: idParam, query: z.object({}).optional().default({}) });
const idSchema = z.object({ body: z.object({}).optional().default({}), params: idParam, query: z.object({}).optional().default({}) });

async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
    return sendSuccess(res, categories);
  } catch (error) { return next(error); }
}

async function createCategory(req, res, next) {
  try {
    const category = await prisma.category.create({ data: req.body });
    return sendSuccess(res, category, 'Category created', 201);
  } catch (error) { return next(error); }
}

async function updateCategory(req, res, next) {
  try {
    const category = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
    return sendSuccess(res, category, 'Category updated');
  } catch (error) { return next(error); }
}

async function deleteCategory(req, res, next) {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    return sendSuccess(res, null, 'Category deleted');
  } catch (error) { return next(error); }
}

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  idSchema,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
