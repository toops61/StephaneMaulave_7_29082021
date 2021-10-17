const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Message } = require('../db/sequelize');

require('dotenv').config();

exports.connectUser = (req, res) => {

    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            let message = 'Il y a eu une erreur lors du remplissage du formulaire';
            if (!user) {
                return res.status(401).json({ message })
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(401).json({ message })
                }

                const token = jwt.sign(
                    { userId: user.id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '4h' }
                )

                message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user, token })

            })
        })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté.`;
            return res.status(500).json({ message, data: error })
        })
}