import express from "express";
import authController from "../controllers/authController"
import productController from "../controllers/productController"
import { validate } from "../middlewares/validate";
import auth from "../validations/auth"
import product from "../validations/product"
import { verifyToken, admin } from "../middlewares/verifyToken"

let router = express.Router();

let initAPIRoutes = (app) => {
    // Auth
    router.post('/register', auth.vailidationRegister(), validate, authController.register)
    router.post('/login', auth.validationLogin(), validate, authController.login)
    router.get('/auth-user', verifyToken, authController.authUser);
    router.post('/refresh-token', authController.refreshToken)
    router.post('/logout', authController.logout)
    router.post('/forgot-password', auth.validationForgotPassword(), validate, authController.forgotPassword)
    router.put('/reset-password', auth.validationResetPassword(), validate, authController.resetPassword)

    // Product
    router.post('/new-product', [verifyToken, admin], product.validationNewProduct(), validate, productController.newProduct)
    router.put('/update-product/:productId', [verifyToken, admin], product.vailidationUpdateProduct(), validate, productController.updateProduct)
    router.get('/get-products', productController.getProducts)
    router.get('/get-product/:productId', productController.getProduct)
    router.delete('/delete-product/:productId', [verifyToken, admin], productController.deleteProduct)

    return app.use('/api', router);
};

module.exports = initAPIRoutes;