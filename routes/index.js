const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const { authecticator } = require('../middleware/auth')
const records = require('./modules/records')
const filter = require('./modules/filter')

router.use('/users', users)
router.use('/records', authecticator, records)
router.use('/filter', authecticator, filter)
router.use('/', authecticator, home)

module.exports = router
