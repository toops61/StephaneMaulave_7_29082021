const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
//const sequelize = require('./db/sequelize')

dotenv.config();

//const path = require('path');

//const sauceRoutes = require('./routes/sauce');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

require('./routes/subscribe')(app)
require('./routes/login')(app)
require('./routes/deleteUser')(app)
require('./routes/userProfile')(app)
require('./routes/updateProfile')(app)
require('./routes/commentsPage')(app)
require('./routes/comment')(app)
require('./routes/updateComment')(app)

//app.use('/api/auth', userRoutes);

//sequelize.initDb()

module.exports = app;