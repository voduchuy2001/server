import { body, query, param } from "express-validator";

const vailidationRegister = () => [
    body('email').notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Email format wrong!'),
    body('password').notEmpty().withMessage('Password is required!')
        .isLength({ min: 6 }).withMessage('Password min 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
]

const validationLogin = () => [
    body('email').notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Email format wrong!'),
    body('password').notEmpty().withMessage('Password is required!')
        .isLength({ min: 6 }).withMessage('Password min 6 characters'),
]

const validationForgotPassword = () => [
    body('email').notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Email format wrong!'),
]

const validationResetPassword = () => [
    body('password').notEmpty().withMessage('Password is required!')
        .isLength({ min: 6 }).withMessage('Password min 6 characters'),
    body('token').notEmpty().withMessage('Token is required!')
]

module.exports = {
    vailidationRegister,
    validationLogin,
    validationForgotPassword,
    validationResetPassword,
}