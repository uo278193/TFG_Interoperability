const { Router } = require("express")
const { check } = require("express-validator")

const { uploadFile,
        updateFile,
        getFile, 
        updateFileCloudinary } = require("../controllers/upload")

const { allowedCollections } = require("../helpers")
const { validateFields } = require("../middlewares/validate-fields")
const { checkFileExists } = require("../middlewares/check-fileExists")

const router = Router()

router.post('/',[
    checkFileExists,
    validateFields
], uploadFile)

router.put('/:collection/:id', [
    checkFileExists,
    check('id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','items']) ),
    validateFields
],  updateFileCloudinary)

router.get('/:collection/:id', [
    check('id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','items']) ),
    validateFields
],  getFile)

module.exports = router