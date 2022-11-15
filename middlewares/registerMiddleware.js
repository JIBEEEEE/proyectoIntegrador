const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('surname').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('home').notEmpty().withMessage('Tienes que escribir tu direccion'),
	body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail().isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
]