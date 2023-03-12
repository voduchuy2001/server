import { body, param, query } from "express-validator";

const validationNewProduct = () => [
    body('productName').notEmpty().withMessage('Name is required'),
    body('productSlug').notEmpty().withMessage('Slug is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('originalPrice').notEmpty().withMessage('Original price is required'),
    body('sellingPrice').notEmpty().withMessage('Selling price is required'),
    body('stock').notEmpty().withMessage('Stock is required')
        .isIn(['inStock', 'outStock']).withMessage('In stock or out stock'),
    body('status').notEmpty().withMessage('Stock is required')
        .isIn(['published', 'unPublished']).withMessage('Published or un published'),
    body('categoryId').notEmpty().withMessage('Category is required'),
]

const vailidationUpdateProduct = () => [
    body('productName').notEmpty().withMessage('Name is required'),
    body('productSlug').notEmpty().withMessage('Slug is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('originalPrice').notEmpty().withMessage('Original price is required'),
    body('sellingPrice').notEmpty().withMessage('Selling price is required'),
    body('stock').notEmpty().withMessage('Stock is required')
        .isIn(['inStock', 'outStock']).withMessage('In stock or out stock'),
    body('status').notEmpty().withMessage('Stock is required')
        .isIn(['published', 'unPublished']).withMessage('Published or un published'),
    body('categoryId').notEmpty().withMessage('Category is required'),
]

module.exports = {
    validationNewProduct,
    vailidationUpdateProduct,
}