import jwt from "jsonwebtoken"

const generateAccessToken = (userId, role) => {
    return jwt.sign(
        {
            id: userId,
            role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' },
    )
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}