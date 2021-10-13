const { Message } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')
//const multer = require('../middleware/multer-config')


module.exports = (app) => {
    app.delete('/commentPage/:id', auth, (req, res) => {
        const id = req.params.id
        Message.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Message.destroy({ where: { id: id } })
                    .then(comment => {
                        if (comment === null) {
                            const message = 'Problème de chargement'
                            return res.status(404).json({ message })
                        }
                        const message = `Votre commentaire a bien été supprimé.`
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