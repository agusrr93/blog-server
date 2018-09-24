const User = require('../models/users')
const encrypt = require('../middleware/encrypt')
const jwt = require('jsonwebtoken')

class Controller {

 static create(req, res) {
   let newUser = {
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   }

   User.create(newUser)
     .then(user => {
       res.status(201).json({name: user.name, email: user.email})
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }

 static login(req, res) {
   let hashed = encrypt.hashPassword(req.body.password, req.body.email)

   User.findOne({email: req.body.email, password: hashed})
     .then(user => {
       let objUser = {
         id: user._id,
         name: user.name,
         email: user.email
       }

       jwt.sign(objUser,'dani', (err, token) => {
         if (err) {
           res.status(500).json(err)
         } else {
           res.status(200).json({token: token, id: objUser.id, email: objUser.email})
         }
       })
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }

}

module.exports = Controller