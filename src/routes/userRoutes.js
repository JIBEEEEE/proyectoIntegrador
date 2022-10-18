const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

//LOGUEARSE
router.get("/login", userController.login);

//CREAR USUARIO
router.get('/login/register', userController.register);
router.post('/login/register', userController.store);


router.get("/carrito", userController.cart)

module.exports = router;