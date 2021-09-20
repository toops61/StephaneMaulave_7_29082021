const express = require('express');
const apiRouter = require('./apiRouter').router;
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour, bienvenue dans le serveur</h1>');
});

server.use('/api/', apiRouter);

server.listen(8080, () => {
    console.log('Server en écoute');
});