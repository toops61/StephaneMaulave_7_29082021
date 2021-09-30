const { Message } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')
//const multer = require('../middleware/multer-config')


module.exports = (app) => {
    app.put('/commentPage/:id', auth, (req, res) => {
        const USERS_id = req.params.id
        Message.update(req.body, {
            where: { USERS_id: USERS_id }
        })
            .then(_ => {
                return Message.findOne({ where: { USERS_id: USERS_id } })
                    .then(comment => {
                        if (comment === null) {
                            const message = 'Problème de chargement'
                            return res.status(404).json({ message })
                        }
                        const message = `Votre commentaire a bien été modifié.`
                        res.json({ message, data: comment })
                    })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = 'L\'utilisateur n\'a pas pu être récupéré :-( Réessayez dans quelques instants.'
                res.status(500).json({ message, data: error })
            })
    })
}