const express = require('express');
const validate = require('../middleware/validate');
const { stockSchema, listSchema, stockIn, stockOut, listTransactions } = require('../controllers/stockController');

const router = express.Router();

router.post('/in', validate(stockSchema), stockIn);
router.post('/out', validate(stockSchema), stockOut);
router.get('/transactions', validate(listSchema), listTransactions);

module.exports = router;
