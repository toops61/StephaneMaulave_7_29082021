const express = require('express');
const user = require('./controllers/user');

exports.router = (() => {
    const apiRouter = express.Router();

    apiRouter.route('./users/subscribe').post(user.subscribe);
    apiRouter.route('./users/connect').post(user.connect);

    return apiRouter;
})();

