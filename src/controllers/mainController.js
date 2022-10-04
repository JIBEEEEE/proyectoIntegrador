const path = require("path");

const mainController = {
    index: function (req,res){
        res.render("index")
        //res.sendFile(path.resolve (__dirname, "../views/index.ejs"))
    },
    products: function (req,res){
        res.render("products")
        //res.sendFile(path.resolve (__dirname, "../views/products.html"))
    }
}

module.exports = mainController;