const express = require('express');
const router = express.Router();

//Controllers
const userController = require('./controllers/userController');

//Routes
router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router