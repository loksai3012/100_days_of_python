const express = require('express');
const validate = require('../middleware/validate');
const { idSchema, createCategorySchema, updateCategorySchema, listCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', listCategories);
router.post('/', validate(createCategorySchema), createCategory);
router.put('/:id', validate(updateCategorySchema), updateCategory);
router.delete('/:id', validate(idSchema), deleteCategory);

module.exports = router;
