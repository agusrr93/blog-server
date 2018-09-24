const Comment = require('../models/comments')
const Article = require('../models/articles')

class Controller {
  static comment(req, res) {
    let newComment = {
      articleId: req.params.id,
      comment: req.body.comment,
      userId: req.decoded.id
    }
    
    Comment.create(newComment)
      .then(comment => {
        let commentId = comment._id
        
        Article.updateOne({_id: req.params.id}, {$push: {comments: commentId}})
          .then(() => {
            res.status(201).json(newComment)
          })
          .catch(err => {
            res.status(500).json({error: err.message})
          })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static populateComment(req,res){
    Comment.find({articleId:req.params.id})
    .populate('userId')
    .then(commented => {
      res.status(200).json(commented)
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
  }

  static deleteComment(req, res) {
    Comment.deleteOne({_id: req.params.id})
      .then(() => {
        Article.updateOne({_id: req.body.articleId}, {$pull: {comments: req.params.id}})
          .then(() => {
            res.status(200).json({message: 'Comment deleted!', id: req.params.id})
          })
          .catch(err => {
            res.status(500).json({error: err.message})
          })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
   }
}

module.exports = Controller
