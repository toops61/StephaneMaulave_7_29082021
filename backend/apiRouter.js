const express = require('express');
const usersCtrl = require('./routes/user');

exports.router = (() => {
    const apiRouter = express.Router();

    apiRouter.route('./user/subscribe').post(usersCtrl.subscribe);
    apiRouter.route('./user/connect').post(usersCtrl.connect);

    return apiRouter;
})();

