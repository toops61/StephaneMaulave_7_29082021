const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

//const uri = process.env.URI;
//const path = require('path');

//const commentRoutes = require('./routes/comment');
//const userRoutes = require('./routes/user');
 

/* mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

//app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/comments', commentsRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;