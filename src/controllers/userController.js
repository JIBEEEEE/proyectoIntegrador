const path = require("path");

const userController = {
    login: function (req,res){
        res.render("login")
        //res.sendFile(path.resolve (__dirname, "../views/login.html"))
    },
    cart: function (req,res){
        res.render("cart")
        //res.sendFile(path.resolve (__dirname, "../views/cart.html"))
    }
}

module.exports = userController;