const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator")


const productoFilePath = path.join(__dirname, '../Json/catalogoBase.json');
const productos = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));

const productsController = {
	/*Detalle producto*/
    productDetail: function (req,res){
        let idProducto = req.params.id;
		let objProducto;

		for (let o of productos){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}
        res.render("products-detail", {producto: objProducto})
    },
	/*Catalogo productos*/
	catalogo: function (req,res){
        res.render("catalogo", {prod: productos});
    },
	/*Crear producto*/
    create: function (req,res){
        res.render("product-create")
    },
	store: function (req,res){
		const result = validationResult(req);
		
		if (result.errors.length > 0 ){
			return res.render("product-create", {errors: result.mapped(),
			oldData: req.body
			})

 		} else {
		
		idNuevo=0;
		for (let obje of productos){
			if (idNuevo < obje.id){
				idNuevo = obje.id;
			}
		}

		idNuevo ++;
		let nombreImagen = req.file.filename;
		let productoNuevo = {
			id: idNuevo,
			name: req.body.name,
			description: req.body.description,
			price:	req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			image: nombreImagen
		}
		productos.push(productoNuevo);
		fs.writeFileSync(productoFilePath, JSON.stringify(productos,null,' '));
		res.redirect("/");
		}
	},
	/*Editar producto*/
    edit: function (req,res){

        let idProducto = req.params.id;
		let objProducto;

		for (let o of productos){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}
		res.render('product-edit',{producto: objProducto})
    },
	update: (req, res) => {

		let idProducto = req.params.id;
		/*let nombreImagen = req.file.filename;*/

		for (let obj of productos){
			if (idProducto==obj.id){
				
				obj.name = req.body.name;
				obj.description = req.body.description;
				obj.price =	req.body.price;
				obj.discount = req.body.discount;
				obj.category = req.body.category;
				if (req.file != undefined){
					fs.unlinkSync(path.join(__dirname, '../../public/images/', obj.image));
					obj.image = req.file.filename;
				}
				break;
				/*obj.image = nombreImagen;

				break;*/
			}
		}
		fs.writeFileSync(productoFilePath,JSON.stringify(productos, null, " "));
		res.redirect("/");
	},
	destroy: (req, res) => {

		let idProducto = req.params.id;
		let productoEncontrado;

		let Nproducts = productos.filter(function(e){
			return idProducto != e.id;
		})

		for (let producto of productos){
			if (producto.id == idProducto){
				productoEncontrado = producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, "../../public/images", productoEncontrado.image));

		fs.writeFileSync(productoFilePath,JSON.stringify(Nproducts, null, " "));

		res.redirect("/");
	}

}

module.exports = productsController;