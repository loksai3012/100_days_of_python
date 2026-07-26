const express = require('express');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const { listSchema, idSchema, createProductSchema, updateProductSchema, listProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', validate(listSchema), listProducts);
router.get('/:id', validate(idSchema), getProduct);
router.post('/', upload.single('image'), validate(createProductSchema), createProduct);
router.put('/:id', upload.single('image'), validate(updateProductSchema), updateProduct);
router.delete('/:id', validate(idSchema), deleteProduct);

module.exports = router;
