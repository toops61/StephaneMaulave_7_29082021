const auth = require('../auth/auth')
const { Message } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/commentsPage/:id', auth, (req, res) => {

        Message.findAll()
            .then(messages => res.status(200).json(messages))
            .catch(error => {
                const message = `Vous n'êtes pas connecté`;
                return res.status(401).json({ message, data: error })
            })
    })
}