const { Message } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')
const multer = require('../middleware/multer-config')
//const upload = multer({ dest: 'images/' })
//const fs = require('fs')

require('dotenv').config()

module.exports = (app) => {
    app.post('/commentsPage/', multer, auth, (req, res) => {
        const comment = req.body
        //utilisateur.photoProfil = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        Message.create(comment)
            .then(comment => {
                const message = `Votre commentaire est posté`
                res.json({
                    message,
                    data: comment
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = 'L\'utilisateur n\'a pas pu être créé, réésayez dans un instant...'
                res.status(500).json({ message, data: error })
            })


    })
}