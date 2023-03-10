import express from "express";
import authController from "../controllers/authController"
import productController from "../controllers/productController"
import { validate } from "../middlewares/validate";
import { verifyToken, admin } from "../middlewares/verifyToken"
import { body } from "express-validator";

let router = express.Router();

let initAPIRoutes = (app) => {
    // Auth
    router.post('/register', validate([
        body('email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Email format wrong!'),
        body('password').notEmpty().withMessage('Password is required!').isLength({ min: 6 }).withMessage('Password min 6 characters'),
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required')
    ]), authController.register)
    router.post('/login', validate([
        body('email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Email format wrong!'),
        body('password').notEmpty().withMessage('Password is required!').isLength({ min: 6 }).withMessage('Password min 6 characters'),
    ]), authController.login)
    router.get('/auth-user', verifyToken, authController.authUser);
    router.post('/refresh-token', authController.refreshToken)
    router.post('/logout', authController.logout)
    router.post('/forgot-password', validate([
        body('email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Email format wrong!'),
    ]), authController.forgotPassword)
    router.put('/reset-password', validate([
        body('password').notEmpty().withMessage('Password is required!').isLength({ min: 6 }).withMessage('Password min 6 characters'),
        body('token').notEmpty().withMessage('Token is required!')
    ]), authController.resetPassword)

    // Product
    router.post('/new-product', [verifyToken, admin, validate([
        body('productName').notEmpty().withMessage('Name is required'),
        body('productSlug').notEmpty().withMessage('Slug is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('originalPrice').notEmpty().withMessage('Original price is required'),
        body('sellingPrice').notEmpty().withMessage('Selling price is required'),
        body('stock').notEmpty().withMessage('Stock is required').isIn(['inStock', 'outStock']),
        body('status').notEmpty().withMessage('Stock is required').isIn(['published', 'unPublished']),
        body('categoryId').notEmpty().withMessage('Category is required'),
    ])], productController.newProduct)
    router.put('/update-product/:productId', [verifyToken, admin, validate([
        body('stock').notEmpty().withMessage('Stock is required').isIn(['inStock', 'outStock']),
        body('status').notEmpty().withMessage('Stock is required').isIn(['published', 'unPublished']),
    ])], productController.updateProduct)

    return app.use('/api', router);
};

module.exports = initAPIRoutes;