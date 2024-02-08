const { body } = require('express-validator');
const validationResult = require("../validation/result.js");

module.exports = [
    body('username').notEmpty().withMessage('Usuario es requerido.'),
    body('password').notEmpty().withMessage('Contraseña es obligatoria.'), 
    validationResult
];
