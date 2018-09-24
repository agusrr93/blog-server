const Article = require('../models/articles')
const Comment = require('../models/comments')

module.exports = {
 article: (req, res, next) => {
   Article.findById(req.params.id)
     .then(article => {
       if (article.userId == req.decoded.id) {
         next()
       } else {
         res.status(401).json({error: 'You are not allowed to access this article!'})
       }
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 },
 comment: (req, res, next) => {
   Comment.findById(req.params.id)
     .then(comment => {
       if (comment.userId == req.decoded.id) {
         next()
       } else {
         res.status(401).json({error: 'You are not allowed to access this comment!'})
       }
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }
}