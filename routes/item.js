const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const { existsCategoryById,
        existsItemById } = require('../helpers/db-validators')

const { itemsGet,
        itemGet,
        itemUpdate,
        itemDelete,
        itemCreate } = require('../controllers/item')

const router = Router()

router.get('/', itemsGet)

router.get('/:id',[
    check('id','id is not a valid MongoId - item').isMongoId(),
    check('id').custom( existsItemById ),
    validateFields
], itemGet)

router.post('/',[
    validateJWT,
    check('category', 'id is not a valid MongoId - category').isMongoId(),
    check('category').custom( existsCategoryById ),
    check('name','name is mandatory').not().isEmpty(),
    validateFields
], itemCreate)

router.delete('/:id',[
    validateJWT,
    check('id','id is not a valid MongoId - item').isMongoId(),
    check('id').custom( existsItemById ),
    validateFields
], itemDelete)

router.put('/:id',[
    validateJWT,
    check('id','id is not a valid MongoId - item').isMongoId(),
    check('id').custom( existsItemById ),
    validateFields
], itemUpdate)

module.exports = router