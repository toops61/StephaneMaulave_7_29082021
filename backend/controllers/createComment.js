const { Message } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
//const upload = multer({ dest: 'images/' })

require('dotenv').config()

exports.createComment = (req, res) => {
    const comment = JSON.parse(req.body.comment);
    const photo = req.file;
    Message.create({...comment,attachment: photo ? `${req.protocol}://${req.get('host')}/images/${photo.originalname}` : comment.attachment})
        .then(comment => {
            const message = `Votre commentaire est posté`
            res.json({
                message,
                data: comment
            })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: 'erreur validation', data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: 'erreur message unique', data: error })
            }
            const message = 'L\'utilisateur n\'a pas pu être créé, réésayez dans un instant...'
            res.status(500).json({ message, data: error })
        })
}
