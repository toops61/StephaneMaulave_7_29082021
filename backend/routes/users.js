const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');
const multer = require('../middleware/multer-config');

const createUser = require('../controllers/subscribe');
const connectUser = require('../controllers/login');
const getUser = require('../controllers/userProfil');
const updateUser = require('../controllers/updateProfil');
const deleteUser = require('../controllers/deleteProfil');

router.get('/', auth, getUser.getUser);
router.post('/subscribe', multer, createUser.createUser);
router.post('/login', connectUser.connectUser);
router.put('/user/:id', auth, multer, updateUser.updateUser);
router.delete('/user/:id', auth, deleteUser.deleteUser);

module.exports = router;