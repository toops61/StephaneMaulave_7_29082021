const { Message } = require('../db/sequelize')

exports.displayComments = (req, res) => {

    Message.findAll()
        .then(messages => res.status(200).json(messages))
        .catch(error => {
            const message = `Vous n'êtes pas connecté`;
            return res.status(401).json({ message, data: error })
        })
}