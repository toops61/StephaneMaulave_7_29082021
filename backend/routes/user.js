const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/subscribe', userCtrl.subscribe);
router.post('/connect', userCtrl.connect);

module.exports = router;