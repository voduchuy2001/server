import express from "express";
import authController from "../controllers/authController"
import { validate } from "../middlewares/validate";
import verifyAccessToken from "../middlewares/verifyAccessToken"
import { body } from "express-validator";

let router = express.Router();

let initAPIRoutes = (app) => {
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

    router.get('/auth-user', verifyAccessToken, authController.authUser);
    router.post('/refresh-token', authController.refreshToken)
    router.post('/logout', authController.logout)

    return app.use('/api', router);
};

module.exports = initAPIRoutes;