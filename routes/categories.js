const { Router, response, request } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const { createCategory } = require('../controllers/category')

const router = Router()

//Get all categories - public
router.get('/', (req, res = response ) => res.json("todo ok get all"))

//Get one category by id - public
router.get('/:id', (req = request, res = response ) => res.json(`todo ok get ${id}`))

//Delete a category - Admin role
router.delete('/:id', (req = request, res = response ) => res.json(`todo ok delete ${req.id}`))

//Update a category - private - token mandatory
router.put('/;id', (req = request, res = response ) => res.json(`todo ok put ${req.id}`))

//Create new category - private - token mandatory
router.post('/',[
    validateJWT,
    check('name','name is mandatory').not().isEmpty(),
    validateFields
],createCategory)

module.exports = router