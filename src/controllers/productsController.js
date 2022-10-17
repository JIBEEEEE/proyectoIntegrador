const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../database/productsBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    productDetail: function (req,res){
        let idProducto = req.params.id;
		let objProducto;

		for (let o of products){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}
        res.render("products-detail", {producto: objProducto})
    },
	catalogo: function (req,res){
        res.render("products")
    },
    create: function (req,res){
        res.render("product-create")
    },
    edit: function (req,res){

        let idProducto = req.params.id;
		let objProducto;

		for (let o of products){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}

		res.render('product-edit',{producto: objProducto})
    }
}

module.exports = productsController;