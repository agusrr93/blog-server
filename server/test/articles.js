var app  = require('../app.js')
var chai = require('chai')
var chaiHttp=require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
var Article = require('../models/articles')
var User = require('../models/users')
var jwt = require('jsonwebtoken')
var token
var userId
var articleId

describe('Articles', () => {

 beforeEach((done) => {
   User.create({name: 'dani', email: 'dani@mail.com', password: '123456'})
     .then(() => {
       User.findOne({email: 'dani@mail.com'})
         .then(user => {
           let objUser = {
             id: user._id,
             name: user.name,
             email: user.email
           }

           token = jwt.sign(objUser,'dani')
           userId = String(objUser.id)

           let newArticle = {
             title: 'Article 1',
             content: 'hello world',
             userId: userId
           }

           Article.create(newArticle)
             .then(article => {
               articleId = String(article._id)
               done()
             })
         })
     })
 })

 afterEach((done) => {
   Article.remove({}, () => {
     User.remove({}, () => {
       done()
     })
   })
 })


 it('GET /articles should return all article', (done) => {
   chai.request(app)
     .get('/articles')
     .end((err, result) => {
         console.log(result.body)
       expect(result).to.have.status(200)
       expect(result.body).to.be.a('array')
       expect(result.body).to.have.lengthOf(1)
       expect(result.body[0]).to.have.property('title')
       expect(result.body[0].title).to.equal('Article 1')
       done()
     })
 })

 it('POST /articles should return new article', (done) => {
   chai.request(app)
     .post('/articles')
     .send({title: 'Article 1', content: 'hello world'})
     .set('token', token)
     .end((err, result) => {
       expect(result).to.have.status(201)
       expect(result.body).to.have.property('title')
       expect(result.body.userId).to.equal(userId)
       done()
     })
 })

 it('DELETE /articles should return deleted article id', (done) => {
   chai.request(app)
     .delete(`/articles/${articleId}`)
     .set('token', token)
     .end((err, result) => {
       expect(result).to.have.status(200)
       expect(result.body.id).to.equal(articleId)
       done()
     })
 })

 it('It put/articles should return a success message , edit userdata', function(done) {
    chai.request(app)
      .put(`/articles/${articleId}`)
      .set('token', token)
      .send({
         title: 'ini artikel editan',
         content: 'lorep ipsum dores amet'
       })
      .end(function(err, result) {
        expect(result).to.have.status(200)
        expect(result.body.id).to.equal(articleId)
        console.log(result.body)
        expect(result.body).to.have.property('msg')
        done()
      })
  })

})