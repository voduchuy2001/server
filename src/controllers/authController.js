import db from "../models/index"
const { Op } = require('sequelize')
import handleResgiter from "../services/auth/handleRegister"
import handleLogin from "../services/auth/handleLogin"
import handleResetPassword from "../services/auth/handleResetPassword"
import { generateAccessToken, generateRefreshToken } from "../services/auth/handleJwt"
import sendMail from "../services/auth/handleMail"
const crypto = require('crypto')
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {
        const user = await handleResgiter.emailExits(req.body.email)
        if (user) {
            return res.status(400).json({
                msg: 'E-mail already in use!'
            })
        } else {
            const hashPassword = await handleResgiter.hashPassword(req.body.password);
            await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPassword,
            });

            return res.status(200).json({
                msg: 'Register successfully!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await handleLogin.handleLogin(req.body.email, req.body.password)
        if (!user) {
            return res.status(400).json({
                msg: 'These credentials do not match our records!'
            })
        } else {
            const accessToken = generateAccessToken(user.id, user.role)
            const refreshToken = generateRefreshToken(user.id, user.role)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                accessToken,
                msg: 'Login successfully!',
                user: user,
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const authUser = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.id, { attributes: ['email', 'password', 'role'] })
        if (!user) {
            return res.status(400).json({
                msg: 'User not found!'
            })
        } else {
            return res.status(200).json({
                msg: 'Auth user!',
                user: user
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const cookie = req.cookies
        if (!cookie.refreshToken) {
            return res.status(400).json({
                msg: 'Do not have refresh token in cookie!'
            })
        } else {
            await jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
                if (err) {
                    return res.status(400).json({
                        msg: 'Invalid refresh token!'
                    })
                } else {
                    const newAccessToken = generateAccessToken(decode.id, decode.role)
                    return res.status(200).json({
                        accessToken: newAccessToken
                    })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const logout = async (req, res) => {
    try {
        const cookie = req.cookies
        if (!cookie.refreshToken) {
            return res.status(400).json({
                msg: 'Do not have refresh token in cookie!'
            })
        } else {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true
            })
            return res.status(200).json({
                msg: 'User is logout'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email }
        })

        if (!user) {
            return res.status(400).json({
                msg: 'These credentials do not match our records!'
            })
        } else {
            const resetToken = crypto.randomBytes(32).toString('hex')
            await user.update({
                passwordResetToken: crypto.createHash('sha256').update(resetToken).digest('hex'),
                passwordResetExpired: Date.now() + 15 * 60 * 1000
            });
            const emailTemplate = `You are receiving this email because we received a password reset request for your account.This password reset link will expire in 15 minutes. 
            <a href=${process.env.URL_SERVER}/api/reset-password/${resetToken}>Click here</a>`

            const data = {
                email: user.email,
                html: emailTemplate,
            }

            const sendingMail = await sendMail(data);
            if (!sendingMail) {
                return res.status(400).json({
                    msg: 'Mailing fail!'
                })
            } else {
                console.log(sendingMail)
                return res.status(200).json({
                    msg: 'A confirmation email has been sent to your email'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, resetToken } = req.body
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        
        const user = await db.User.findOne({
            where: {
                passwordResetToken: passwordResetToken,
                passwordResetExpired: {
                    [Op.gte]: Date.now()
                },
            }
        })

        if (!user) {
            return res.status(400).json({
                msg: 'Not found data!'
            })
        } else {
            user.password = await handleResetPassword.hashPassword(password)
            user.passwordResetToken = null
            user.passwordChangeAt = Date.now()
            user.passwordResetExpired = null
            await user.save()
            return res.status(200).json({
                msg: 'Update password successfully!'
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

module.exports = {
    register,
    login,
    authUser,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword,
}