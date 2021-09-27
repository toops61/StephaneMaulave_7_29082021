const { User } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/user/:id', auth, (req, res) => {
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
    })
}