const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    // console.log('Validation middleware is running');  // Este log debería aparecer si el middleware se ejecuta.
    const errors = validationResult(req);
    // console.log('Validation Errors:', errors.array());  // Ver qué errores existen en la solicitud

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();  // Si no hay errores, pasamos al siguiente middleware (el controlador)
};

module.exports = { validateFields };
