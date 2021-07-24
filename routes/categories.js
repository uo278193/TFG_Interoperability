const { Router, response, request } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const { createCategory,
        categoryGet,
        categoriesGet,
        categoryPut,
        categoryDelete } = require('../controllers/category')

const { existsCategoryById } = require('../helpers/db-validators')

const router = Router()

//Get all categories - public
router.get('/', categoriesGet)

//Get one category by id - public
router.get('/:id',[
    check('id','id is not a valid MongoId').isMongoId(),
    check('id').custom( existsCategoryById ),
    validateFields 
],categoryGet)

//Delete a category - Admin role
router.delete('/:id',[
    validateJWT,
    check('id','id is not a valid MongoId').isMongoId(),
    check('id').custom( existsCategoryById ),
    validateFields
],categoryDelete)

//Update a category - private - token mandatory
router.put('/:id',[
    validateJWT,
    check('id','id is not a valid MongoId').isMongoId(),
    check('id').custom( existsCategoryById ),
    validateFields
],categoryPut)

//Create new category - private - token mandatory
router.post('/',[
    validateJWT,
    check('name','name is mandatory').not().isEmpty(),
    validateFields
],createCategory)

module.exports = router