import jwt from "jsonwebtoken"

const verifyAccessToken = (req, res, next) => {
    try {
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
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

module.exports = verifyAccessToken