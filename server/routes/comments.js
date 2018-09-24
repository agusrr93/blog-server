const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {comment} = require('../middleware/isHim')

const commentController = require('../controllers/comments')

router.post('/:id', auth, commentController.comment)
router.get('/:id',commentController.populateComment)
router.delete('/:id', auth, comment, commentController.deleteComment)

module.exports = router;