const { User } = require('../db/sequelize')

exports.getUser = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = 'L\'utilisateur demandé n\'existe pas, essayez un autre...'
                return res.status(404).json({ message })
            }
            const message = `Bienvenue, ${user.pseudo}`
            res.json({ message, data: user })
        })
        .catch(error => {
            const message = 'Nous n\'avons pas trouvé cet utilisateur. Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
}