import db from "../models/index"
import handleResgiter from "../services/auth/handleRegister"

const register = async (req, res) => {
    try {
        let user = await handleResgiter.emailExits(req.body.email)
        if (user) {
            return res.status(400).json({
                msg: 'E-mail already in use!'
            })
        } else {
            let hashPassword = await handleResgiter.hashPassword(req.body.password);
            await db.User.create({
                firstName: req.body.firstName,
                lastName:req.body.lastName,
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

module.exports = {
    register
}