const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 articleId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Article'
 },
 comment: {
   required: true,
   type: String
 },
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment