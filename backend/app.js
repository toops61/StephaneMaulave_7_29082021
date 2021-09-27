const express = require('express');
const app = express();
const dotenv = require('dotenv');
//const sequelize = require('./db/sequelize')

dotenv.config();

//const path = require('path');

//const sauceRoutes = require('./routes/sauce');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

require('./routes/subscribe')(app)
require('./routes/login')(app)
require('./routes/deleteUser')(app)
require('./routes/userProfile')(app)
require('./routes/updateProfile')(app)

//app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/sauces', sauceRoutes);
//app.use('/api/auth', userRoutes);

//sequelize.initDb()

module.exports = app;