import bcrypt from 'bcrypt';
import db from '../../models/index'

let saltRounds = 10

let hashPassword = (userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(userPassword, salt, function (err, hash) {
                    resolve(hash)
                });
            });
        } catch (error) {
            reject(error)
        }
    })
}

let emailExits = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });
            if (!user) {
                resolve(false)
            } else {
                resolve(true)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    hashPassword,
    emailExits
}