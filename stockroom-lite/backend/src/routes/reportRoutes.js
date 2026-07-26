const express = require('express');
const { inventoryReport, salesReport, exportInventoryPdf } = require('../controllers/reportController');

const router = express.Router();

router.get('/inventory', inventoryReport);
router.get('/sales', salesReport);
router.get('/inventory/pdf', exportInventoryPdf);

module.exports = router;
