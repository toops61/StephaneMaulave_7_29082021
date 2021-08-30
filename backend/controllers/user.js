const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const key = process.env.ENCRYPT_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const User = require('../models/user');

dotenv.config();


exports.signup = (req, res) => {
  const enc = CryptoJS.AES.encrypt(req.body.email, keyutf, { iv: iv });
  const encMail = enc.toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: encMail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    const enc = CryptoJS.AES.encrypt(req.body.email, keyutf, { iv: iv });
    const encMail = enc.toString();
    User.findOne({ email: encMail })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  process.env.TOKEN_SECRET,
                  { expiresIn: '2h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};