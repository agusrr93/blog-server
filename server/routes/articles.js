const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {article} = require('../middleware/isHim')

const articleController = require('../controllers/articles')

router.get('/author', articleController.getArticleAuthor)
router.get('/', articleController.getArticle)
router.get('/:id', articleController.findArticle)
router.post('/',auth,articleController.createArticle)

router.delete('/:id',auth,article,articleController.deleteArticle)

router.put('/:id',auth,article,articleController.editArticle)


module.exports = router;