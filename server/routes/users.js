const express = require('express');
const router = express.Router();

const userController = require('../controllers/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('Index user');
});

router.post('/', userController.create)

router.post('/login', userController.login)

module.exports = router;