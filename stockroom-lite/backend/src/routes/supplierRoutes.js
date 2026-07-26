const express = require('express');
const validate = require('../middleware/validate');
const { idSchema, createSupplierSchema, updateSupplierSchema, listSuppliers, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.get('/', listSuppliers);
router.post('/', validate(createSupplierSchema), createSupplier);
router.put('/:id', validate(updateSupplierSchema), updateSupplier);
router.delete('/:id', validate(idSchema), deleteSupplier);

module.exports = router;
