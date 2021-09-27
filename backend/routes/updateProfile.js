const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/user/:id', auth, (req, res) => {
        const id = req.params.id
        User.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return User.findByPk(id).then(user => {
                    if (user === null) {
                        const message = 'L\'utilisateur demandé n\'existe pas, essayez un autre...'
                        return res.status(404).json({ message })
                    }
                    const message = `L'utilisateur' ` + user.name + ` a bien été modifié.`
                    res.json({ message, data: user })
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