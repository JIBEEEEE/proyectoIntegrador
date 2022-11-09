const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


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
router.get("/login", userController.login);
router.post("/perfil", userController.profile);

//CREAR USUARIO
router.get('/login/register', userController.register);
router.post('/login/perfil', userController.processRegister);

router.get('/login/register-edit/:id', userController.edit);
router.put('/login/register-edit/:id', userController.update);
router.delete('/login/delete/:id', userController.delete);

//DETALLE PRODUCTO USERS
router.get("/", userController.detalle);

router.get('/carrito', userController.cart)

module.exports = router;


