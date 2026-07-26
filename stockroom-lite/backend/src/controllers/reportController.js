const PDFDocument = require('pdfkit');
const prisma = require('../config/prisma');
const { sendSuccess } = require('../utils/apiResponse');

async function inventoryReport(req, res, next) {
  try {
    const products = await prisma.product.findMany({ include: { category: true, supplier: true }, orderBy: { name: 'asc' } });
    return sendSuccess(res, products);
  } catch (error) { return next(error); }
}

async function salesReport(req, res, next) {
  try {
    const sales = await prisma.stockTransaction.findMany({ where: { type: 'OUT' }, include: { product: true }, orderBy: { createdAt: 'desc' } });
    const totalRevenue = sales.reduce((sum, s) => sum + (Number(s.unitPrice || s.product.unitPrice) * s.quantity), 0);
    return sendSuccess(res, { sales, totalRevenue });
  } catch (error) { return next(error); }
}

async function exportInventoryPdf(req, res, next) {
  try {
    const products = await prisma.product.findMany({ include: { category: true, supplier: true }, orderBy: { name: 'asc' } });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory-report.pdf"');

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(18).text('Stockroom Lite Inventory Report');
    doc.moveDown();

    products.forEach((product, index) => {
      doc.fontSize(12).text(`${index + 1}. ${product.name} (${product.sku})`);
      doc.text(`Category: ${product.category.name} | Supplier: ${product.supplier.name}`);
      doc.text(`Qty: ${product.quantity} | Unit Price: ${product.unitPrice} | Low Stock Threshold: ${product.lowStockThreshold}`);
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) { return next(error); }
}

module.exports = { inventoryReport, salesReport, exportInventoryPdf };
