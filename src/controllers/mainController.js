const path = require("path");
const fs = require("fs");

/*const productsFilePath = path.join(__dirname, '../database/productsBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));*/
const productoFilePath = path.join(__dirname, '../database/catalogoBase.json');
const productos = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));

const mainController = {
    index: function (req,res){
        const productos = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));
        res.render("index", {ps: productos})
    }
}

module.exports = mainController;