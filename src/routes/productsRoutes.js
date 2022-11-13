const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const upload = multer({ storage });

const valido = [
    body("name").notEmpty().withMessage("Debes escribir el nombre del producto"),
    body("price").notEmpty().withMessage("Debes decidir un precio para el producto"),
    body("discount").notEmpty().withMessage("Debes detallar el descuento"),
    body("category").notEmpty().withMessage("Debes elegir una categoria"),  
    body("description").notEmpty().withMessage("Por favor escribir una breve descripcion del producto"),
    body("imageProduct").custom ((value, { req }) => {
        let file = req.file;
        let extensiones = [ ".jpg", ".png", ".jpeg", ".gif"]
        if (!file){
                throw new Error("Tienes que subir una imagen del producto")
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensiones.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensiones.join(", ")}`)
            }
        }
        return true;
    })
]

router.get("/", productsController.catalogo)

router.get("/detail/:id", productsController.productDetail)

router.get("/create", productsController.create)
router.post('/create', upload.single("imageProduct"), valido, productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single("imageProductEdit"), productsController.update); 

router.delete("/delete/:id", productsController.destroy)

module.exports = router;