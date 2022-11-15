const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/userBase.json');
const productoFilePath = path.join(__dirname, '../database/catalogoBase.json');
const productos = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../models/User')

const userController = {
    login: (req,res) => {
        //const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render('login');
        //res.sendFile(path.resolve (__dirname, "../views/login.html"))
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 }) //equivale a 2 minutos
                }

                return res.redirect('/')
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son incorrectas'
                    }
                }
            })
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra registrado este correo electronico'
                }
            }
        })
    },

    cart: (req,res) => {
        res.render('cart', {producto: productos});

        //res.sendFile(path.resolve (__dirname, "../views/cart.html"))
    },

    register: (req,res) => {
        res.render('register');
    },

    store: (req,res) => {


        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }
        //console.log(req.body)

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10)
        }
        
        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
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
    },

    profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

    cerrarSesion: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = userController;