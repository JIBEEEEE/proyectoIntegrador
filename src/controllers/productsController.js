const path = require("path");

const productsController = {
    productos: function (req,res){
        res.render("products")
        //res.sendFile(path.resolve (__dirname, "../views/products.html"))
    }
}

module.exports = productsController;