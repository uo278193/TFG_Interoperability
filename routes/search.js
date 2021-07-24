const { Router } = require("express")
const { searchIntoCollection } = require("../controllers/search")

const router = Router()

router.get('/:collection/:term', searchIntoCollection)

module.exports = router