const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../database/productsBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    productos: function (req,res){
        res.render("products")
    },
    create: function (req,res){
        res.render("product-create")
    },
    edit: function (req,res){
        res.render("product-edit")
    }
}

module.exports = productsController;