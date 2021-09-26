const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
//const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/subscribe', /* auth, */(req, res) => {
        User.create(req.body)
            .then(user => {
                const message = `Votre profil a bien été crée.`
                res.json({ message, data: user })
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
}