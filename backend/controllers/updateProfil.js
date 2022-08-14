const { User } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.updateUser = (req, res) => {
    const utilisateur = JSON.parse(req.body.user);
    const id = utilisateur.id;
    const photo = req.file;
    const filename = utilisateur.photoProfil.split('/images/')[1];
    
    User.findOne({ where: { email: utilisateur.email } })
    .then(user => {
            //console.log(user);
            bcrypt.compare(utilisateur.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(401).json('erreur de mot de passe')
                } else {
                    (photo && filename !== 'default-avatar.png' && fs.existsSync(`images/${filename}`)) && fs.unlink(`images/${filename}`, (err) => {
                        if (err) throw err;
                    });
                    bcrypt.hash(utilisateur.newPassword, 10, (err, hash) => {
                        utilisateur.password = hash;
                        User.update({
                                ...utilisateur,
                                photoProfil: photo ? `${req.protocol}://${req.get('host')}/images/${photo.filename}` : utilisateur.photoProfil
                            }, {where: { id: id }})
                            .then(_ => {
                                return User.findByPk(id).then(user => {
                                    if (user === null) {
                                        const message = 'L\'utilisateur demandé n\'existe pas, essayez un autre...'
                                        return res.status(404).json({ message })
                                    }
                                    const message = `L'utilisateur' ` + user.pseudo + ` a bien été modifié.`
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
            })
        })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté.`;
            return res.status(500).json({ message, data: error })
        })
}