const router = require('express').Router()
const home = require('./modules/home')
const user = require('./modules/user')
const { authecticator } = require('../middleware/auth')

router.use('/users', user)
router.use('/', authecticator, home)

module.exports = router
