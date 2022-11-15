const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/userBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

const userController = {
    login: (req,res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render('login')
        //res.sendFile(path.resolve (__dirname, "../views/login.html"))
    },
    profile: (req,res) => {

        let mailUsuario = req.body.email;
        console.log(req.body);
		let usuarioIngresado;

		for (let usuario of users){
			if (mailUsuario == usuario.email){
				usuarioIngresado = usuario;
				break;
			}
		}

        res.render('perfil', {usuario: usuarioIngresado});
    },

    cart: (req,res) => {
        res.render('cart')
        //res.sendFile(path.resolve (__dirname, "../views/cart.html"))
    },

    register: (req,res) => {
        res.render('register');
    },

    processRegister: (req,res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            
            console.log(resultValidation.errors);

            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body

            });

        } else {

                let usuarioNuevo = {
                    id: (users[users.length-1].id)+1,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    home: req.body.home,
                    avatarUsuario: req.body.avatarUsuario
                }
                users.push(usuarioNuevo);

                fs.writeFileSync(usersFilePath,JSON.stringify(users,null," "));

                res.render('perfil', {usuario: usuarioNuevo}); 
            }
    },

    edit: (req,res) => {
        let userEdit = req.params.id;
        let objUser;

        

        for (choosen of users) {
            if( userEdit == choosen.id ) {
                objUser = choosen;
                break;
            }
        }
        res.render('register-edit', {user: objUser});
    },

    update: (req,res) => {
        
        let userEdit = req.params.id;

        for ( choosen of users) {
            if( userEdit == choosen.id ) {
                choosen.name = req.body.name;
                choosen.surname = req.body.surname;
                choosen.email = req.body.email;
                choosen.home = req.body.home;

                break;
            }
        }
        fs.writeFileSync(usersFilePath,JSON.stringify(users,null," "));

		res.redirect('/');
    },

    delete: (req,res) => {
        let idProducto = req.params.id;
		
		let arrProductos = users.filter(function(elemento) {
			return elemento.id != idProducto;
		});

		fs.writeFileSync(usersFilePath,JSON.stringify(arrProductos,null," "));

		res.redirect('/');
    },

    detalle: (req,res) => {
        res.render('products');
    }

}

module.exports = userController;