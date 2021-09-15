const express = require('express');
const app = express();
const dotenv = require('dotenv');
const apiRouter = require('./apiRouter').router;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour tout court</h1>');
})

app.use('/api/', apiRouter);
//app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/comments', commentsRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;



//const uri = process.env.URI;
//const path = require('path');

//const commentRoutes = require('./routes/comment');
//const userRoutes = require('./routes/user');


/* mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); */

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); */