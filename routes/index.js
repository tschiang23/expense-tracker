const router = require('express').Router()
const home = require('./modules/home')
const user = require('./modules/user')

router.use('/', home)
router.use('/users', user)

module.exports = router
