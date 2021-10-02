const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Message } = require('../db/sequelize')
//const privateKey = require('../auth/private_key')

require('dotenv').config()

module.exports = (app) => {
    app.post('/login', (req, res) => {

        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    const message = 'l\'utilisateur demandé n\'existe pas.'
                    return res.status(404).json({ message })
                }

                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = `Le mot de passe est incorrect`
                        return res.status(401).json({ message })
                    }

                    const token = jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '4h' }
                    )

                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message, data: user, token })

                })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté.`;
                return res.status(500).json({ message, data: error })
            })

    })
}