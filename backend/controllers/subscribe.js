const { User } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.createUser = (req, res) => {
    const utilisateur = JSON.parse(req.body.user);
    const photo = req.file;
    bcrypt.hash(utilisateur.password, 10, (err, hash) => {
        utilisateur.password = hash;
        const profil = {
            ...utilisateur,
            photoProfil: photo ? `${req.protocol}://${req.get('host')}/images/${photo.originalname}` : `http://localhost:4200/images/default-avatar.png`
        };
        User.create(profil)
            .then(user => {
                const message = `Votre profil est crée, ${profil.pseudo}. Bienvenue !`
                res.json({
                    message, data: user, token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '4h' }
                    )
                })
            })
            .catch(error => {
                let message = 'L\'utilisateur n\'a pas pu être créé, réésayez dans un instant...'
                if (error instanceof ValidationError) {
                    message = 'Vous n\'avez pas correctement rempli les champs ou le compte existe déjà.';
                    return res.status(400).json({ message: message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    message = 'Ce compte existe déjà, veuillez réessayer'
                    return res.status(400).json({ message: message, data: error })
                }
                res.status(500).json({ message, data: error })
            })
    })
}