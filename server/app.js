const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles')
const commentsRouter = require('./routes/comments')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/bloggerv2', { useNewUrlParser: true })

mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('DB Connected!');
});

app.use('/users', usersRouter);
app.use('/articles', articlesRouter)
app.use('/comments', commentsRouter)

module.exports = app;