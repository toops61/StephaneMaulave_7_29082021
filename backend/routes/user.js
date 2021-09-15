const express = require('express');
const router = express.Router();

router.post('/subscribe', userCtrl.subscribe);
router.post('/connect', userCtrl.connect);

module.exports = router;