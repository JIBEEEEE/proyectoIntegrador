const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = "Img-" + Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const upload = multer({ storage });

router.get("/", productsController.productos)
router.put("/edit/:id", productsController.edit)

router.get("/crear", productsController.create)

module.exports = router;