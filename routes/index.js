const { Router } = require('express')


const { index } = require('../controllers/index')

const router = Router()

const path = require('path');

router.get('/', index)

module.exports = router