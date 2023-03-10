import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
                if (err) {
                    return res.status(400).json({
                        msg: 'Invalid access token!'
                    })
                } else {
                    req.user = decode
                    next()
                }
            })
        } else {
            return res.status(400).json({
                msg: 'Require authentication!'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const admin = (req, res, next) => {
    try {
        const { role } = req.user
        
        if (role !== 'admin') {
            return res.status(401).json({
                msg: 'Access denied!'
            })
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyToken,
    admin
}