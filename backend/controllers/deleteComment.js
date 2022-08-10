const { Message } = require('../db/sequelize');
const fs = require('fs');

exports.deleteComment = (req, res) => {
    const id = req.params.id;
    console.log('id = ' + id);
    console.log(req.params);
    console.log(Message);
    Message.findOne({ where: { id: id } })
        .then(comment => {
            if (comment.attachment.includes('/images/')) {
                const filename = comment.attachment.split('/images/')[1];
                fs.existsSync(`images/${filename}`) && fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                });
            }
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