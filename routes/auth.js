const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const { login, googleSignin , logout } = require('../controllers/auth')

const router = Router()

const path = require('path');
const { validateJWT } = require('../middlewares/validate-jwt')



router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),  // Validación de email
    check('password', 'Password is mandatory').not().isEmpty(),  // Validación de password
    validateFields,  // Middleware para validar errores
] , login)

router.post('/logout',logout)

router.post('/google',[
    check('id_token','id_token is mandatory').not().isEmpty(),
    validateFields
],googleSignin)

router.get('/personalinfo',validateJWT,(req, res) => {
    res.render('personalinfo');
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/singup', (req, res) => {
    res.render('singup')
});


module.exports = router