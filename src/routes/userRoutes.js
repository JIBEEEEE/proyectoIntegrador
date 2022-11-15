const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { body } = require('express-validator');

//Middlewares
const guestMiddleWare = require('../../middlewares/guestMiddleware'); //para que si esta logeado no pueda ingresar a registrarse o logearse
const authMiddleware = require('../../middlewares/authMiddleware');//para que si no estas logeado, te mande a logearte.




const registerValidations = require('../../middlewares/registerMiddleware');

const multerDiskStorage = multer.diskStorage ({
    destination: (req, file, cb) => 
    { 
        cb(null, path.join(__dirname,'../../public/profileImages')); 
    },
    filename: (req,file,cb) => 
    {   
        const imageName = Date.now() + path.extname(file.originalname); 
        cb(null, imageName);          
    }
    
});
const fileUpload = multer({ multerDiskStorage});


//LOGUEARSE
router.get("/login", guestMiddleWare, userController.login);
router.post("/perfil", userController.profile);
router.post("/login", userController.loginProcess); //Progresar el login

//CREAR USUARIO
router.get('/login/register', userController.register);

//PROCESAR REGISTRO
router.post('/login/perfil',registerValidations, userController.processRegister);

//EDITAR USUARIO
router.get('/login/register-edit/:id', userController.edit);
router.put('/login/register-edit/:id', userController.update);

//ELIMINAR USUARIO
router.delete('/login/delete/:id', userController.delete);

router.get('/cerrarsesion', userController.cerrarSesion);

//DETALLE PRODUCTO USERS
router.get("/", userController.detalle);

router.get('/carrito/:id', userController.cart)

module.exports = router;
