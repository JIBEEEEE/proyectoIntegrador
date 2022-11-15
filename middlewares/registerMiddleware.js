const { body } = require('express-validator');  

const registerValidations = [
    body('name', 'Debes completar tu nombre')
        .notEmpty(),

    body('surname', 'Debes completar con un apellido')
        .notEmpty(),

    body('home','Debes completar una dirección')
        .notEmpty(),

    body('email')
        .notEmpty().withMessage('Debes completar un email')
        .isEmail().withMessage('Debes escribir un formato de correo válido'),

    body('password', 'Debes completar una contraseña de mínimo 5 caracteres')
        .trim()
        .isLength({ min: 4 }),
        
    body('confirm-password','Las contraseñas no coinciden')
        .trim()
        .isLength({ min: 4 })
        
        
];


module.exports = registerValidations;