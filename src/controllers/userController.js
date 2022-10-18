const path = require("path");
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/userBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    login: function (req,res){
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render("login")
        //res.sendFile(path.resolve (__dirname, "../views/login.html"))
    },
    cart: function (req,res){
        res.render("cart")
        //res.sendFile(path.resolve (__dirname, "../views/cart.html"))
    },
    register: function(req,res){
        res.render('register');
    },
    store: function(req,res){


        let usuarioNuevo = {
			id: (users[users.length-1].id)+1,
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			home: req.body.home
		}
		users.push(usuarioNuevo);

		fs.writeFileSync(usersFilePath,JSON.stringify(users,null," "));

		res.redirect('/');

    }
}

module.exports = userController;