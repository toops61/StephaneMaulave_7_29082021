const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const auth = require('../auth/auth')

require('dotenv').config()

module.exports = (app) => {
    app.post('/api/subscribe', (req, res) => {
        const utilisateur = req.body
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            utilisateur.password = hash
            User.create(utilisateur)
                .then(user => {
                    const message = `Votre profil a bien été crée.`
                    res.json({
                        message, data: user, token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '4h' }
                        )
                    })
                })
                .catch(error => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message, data: error })
                    }
                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({ message: error.message, data: error })
                    }
                    const message = 'L\'utilisateur n\'a pas pu être créé, réésayez dans un instant...'
                    res.status(500).json({ message, data: error })
                })
        })

    })
}