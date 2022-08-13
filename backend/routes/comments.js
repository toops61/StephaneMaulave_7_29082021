const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');
const multer = require('../middleware/multer-config');

const createComment = require('../controllers/createComment');
const updateComment = require('../controllers/updateComment');
const displayComments = require('../controllers/displayComments');
const deleteComment = require('../controllers/deleteComment');

router.get('/', auth, displayComments.displayComments);
router.post('/', auth, multer, createComment.createComment);
router.put('/:id', auth, multer, updateComment.updateComment);
router.delete('/:id', auth, deleteComment.deleteComment);

module.exports = router;