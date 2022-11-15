const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

//Middlewares
const validations = require('../../middlewares/validateRegisterMiddleware');
const guestMiddleWare = require('../../middlewares/guestMiddleware'); //para que si esta logeado no pueda ingresar a registrarse o logearse
const authMiddleware = require('../../middlewares/authMiddleware');//para que si no estas logeado, te mande a logearte.

//LOGUEARSE
router.get("/login", guestMiddleWare, userController.login);
router.post("/login", userController.loginProcess); //Progresar el login

//CREAR USUARIO
router.get('/login/register', guestMiddleWare, userController.register);
router.post('/login/register', validations, userController.store);

router.get('/login/register-edit/:id', userController.edit);
router.put('/login/register-edit/:id', userController.update);
router.delete('/login/delete/:id', userController.delete);

//Perfil de usuario
router.get('/profile', authMiddleware, userController.profile);

//Cerrar sesion
router.get('/cerrarsesion', userController.cerrarSesion)

//DETALLE PRODUCTO USERS
router.get("/", userController.detalle);

router.get('/carrito', userController.cart)

module.exports = router;