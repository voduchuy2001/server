import db from '../../models/index'
import bcrypt from 'bcrypt'

const handleLogin = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (!user) {
                resolve(false)
            } else {
                const password = await bcrypt.compare(userPassword, user.password)
                if (!password) {
                    resolve(false)
                } else {
                    resolve(user)
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleLogin
}