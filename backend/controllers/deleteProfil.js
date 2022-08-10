const { User, Message } = require('../db/sequelize');
const fs = require('fs');

exports.deleteUser = (req, res) => {
    Message.findAll({ where: { USERS_id: req.params.id } })
            .then(articles => {
                articles.map(article => {
                    if (article.attachment.includes('/images/')) {
                        const filename = article.attachment.split('/images/')[1];
                        fs.existsSync(`images/${filename}`) && fs.unlink(`images/${filename}`, (err) => {
                            if (err) throw err;
                        });
                    }
                })
            })
            .catch(error => {
                res.status(500).json({ data: error })
            })
    User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = 'L\'utilisateur demandé n\'existe pas, essayez un autre...'
                return res.status(404).json({ message })
            }
            const filename = user.photoProfil.split('/images/')[1];
            filename !== 'default-avatar.png' && fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
            });
            const userDeleted = user;
            
            Message.destroy({
                where: { USERS_id: user.id }
            })
            return User.destroy({
                where: { id: user.id }
            })
                .then(_ => {
                    const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
                    res.json({ message, data: userDeleted })
                })
        })
        .catch(error => {
            const message = 'L\'utilisateur n\'a pas pu être récupéré :-( Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
}