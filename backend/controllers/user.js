const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const dotenv = require('dotenv');
//const CryptoJS = require('crypto-js');
const models = require('../models');

//const key = process.env.ENCRYPT_KEY;
//const keyutf = CryptoJS.enc.Utf8.parse(key);
//const iv = CryptoJS.enc.Base64.parse(key);

const User = require('../models/user');

//dotenv.config();

module.exports = {
  subscribe: (req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const pseudo = req.body.pseudo;
    const birthdate = req.body.birthdate;
    const job = req.body.job;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = false;

    if (email == null || lastname == null || firstname == null || pseudo == null || birthdate == null || job == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    const modelUser = models.User;
    let newUser;

    modelUser.findOne({
      attributes: ['email'],
      where: { email: email }
    })
      .then(userFound => {
        if (!userFound) {
          bcrypt.hash(password, 10, function (err, bcryptedPassword) {
            newUser = modelUser.create({
              lastname: lastname,
              firstname: firstname,
              pseudo: pseudo,
              birthdate: birthdate,
              job: job,
              email: email,
              password: bcryptedPassword,
              isAdmin: 0
            })
              .then(function (newUser) {
                return res.status(201).json({
                  'userId': newUser.id
                })
              })
              .catch(function (err) {
                return res.status(500).json({ 'error': 'cannot add user' });
              });
          });
        } else {
          return res.status(409).json({ 'error': 'user already exists' })
        }
      })
      .catch(function (err) {
        return res.status(500).json({ 'error': 'user already exists' })
      });

  },
  connect: function (req, res) {

  }
}


/* exports.subscribe = (req, res) => {
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

exports.connect = (req, res) => {
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
}; */