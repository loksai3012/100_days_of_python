const prisma = require('../config/prisma');

async function getDashboardStats() {
  const [totalProducts, totalCategories, totalSuppliers, lowStockProducts, products] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.supplier.count(),
    prisma.product.findMany({ where: { quantity: { lte: prisma.product.fields.lowStockThreshold } } }).catch(() => []),
    prisma.product.findMany({ select: { quantity: true, unitPrice: true } })
  ]);

  const inventoryValue = products.reduce((sum, p) => sum + Number(p.unitPrice) * p.quantity, 0);

  return {
    totalProducts,
    totalCategories,
    totalSuppliers,
    lowStockCount: lowStockProducts.length,
    inventoryValue
  };
}

module.exports = { getDashboardStats };
