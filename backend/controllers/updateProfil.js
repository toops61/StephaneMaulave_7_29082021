const { User } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');

exports.updateUser = (req, res) => {
    const utilisateur = JSON.parse(req.body.user);
    console.log(utilisateur);
    const id = utilisateur.id;
    const photo = req.file;
    const filename = utilisateur.photoProfil.split('/images/')[1];
    photo && utilisateur.photoProfil !== 'default-avatar.png' && fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
    });
    bcrypt.hash(utilisateur.password, 10, (err, hash) => {
        utilisateur.password = hash
        User.update({
                ...utilisateur,
                photoProfil: photo ? `${req.protocol}://${req.get('host')}/images/${photo.originalname}` : utilisateur.photoProfil
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