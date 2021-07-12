const { Router } = require('express')
const { check } = require('express-validator')
const { usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete } = require('../controllers/users')
const {validateFields} = require('../middlewares/validate-fields')

const router = Router()

router.get('/', usersGet)

router.put('/:id', usersPut)

router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory and length >= 6').isLength({min: 6}),
    check('email', 'email is not ok').isEmail(),
    //check('role', 'Role must one of this values ADMIN_ROLE, USER_ROLE').isIn(['ADMIN_ROLE', 'USER_ROLE'] ),
    validateFields
] , usersPost)

router.patch('/', usersPatch) 

router.delete('/', usersDelete)

module.exports = router