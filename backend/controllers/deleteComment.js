const { Message } = require('../db/sequelize')

exports.deleteComment = (req, res) => {
    const id = req.params.id;
    Message.findOne({ where: { id: id } })
        .then(comment => {
            /* if (comment === null) {
                const message = 'Le message demandé n\'existe pas, essayez un autre...'
                return res.status(404).json({ message })
            } */
            //console.log(comment)
            const commentDeleted = comment;
            return Message.destroy({
                where: { id: comment.id }
            })
                .then(_ => {
                    const message = `Le message a bien été supprimé.`
                    res.json({ message, data: commentDeleted })
                })
        })
        .catch(error => {
            const message = 'Le message n\'a pas pu être récupéré :-( Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
}