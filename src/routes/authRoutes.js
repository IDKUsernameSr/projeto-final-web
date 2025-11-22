const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');

// paginas
router.get('/login', AuthController.loginPage);
router.get('/register', AuthController.registerPage);

// acoes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// sair
router.post('/logout', AuthController.logout);

module.exports = router;