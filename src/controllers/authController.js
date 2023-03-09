import db from "../models/index"
import handleResgiter from "../services/auth/handleRegister"
import handleLogin from "../services/auth/handleLogin"
import { generateAccessToken, generateRefreshToken } from "../services/auth/handleJwt"
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

module.exports = {
    register,
    login,
    authUser,
    refreshToken,
    logout,
}