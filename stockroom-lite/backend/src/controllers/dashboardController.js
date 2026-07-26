const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');

async function getStats(req, res, next) {
  try {
    const [totalProducts, totalCategories, totalSuppliers, products] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.supplier.count(),
      prisma.product.findMany({ select: { id: true, name: true, quantity: true, lowStockThreshold: true, unitPrice: true } })
    ]);

    const lowStockProducts = products.filter((p) => p.quantity <= p.lowStockThreshold);
    const inventoryValue = products.reduce((sum, p) => sum + Number(p.unitPrice) * p.quantity, 0);

    return sendSuccess(res, {
      totalProducts,
      totalCategories,
      totalSuppliers,
      lowStockProducts,
      lowStockCount: lowStockProducts.length,
      inventoryValue
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getStats };
