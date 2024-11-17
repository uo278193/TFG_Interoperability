const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const { login, googleSignin } = require('../controllers/auth')

const router = Router()

const path = require('path');



router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),  // Validación de email
    check('password', 'Password is mandatory').not().isEmpty(),  // Validación de password
    validateFields,  // Middleware para validar errores
] , login)


router.post('/google',[
    check('id_token','id_token is mandatory').not().isEmpty(),
    validateFields
],googleSignin)


router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/singup', (req, res) => {
    res.render('singup')
});


module.exports = router