const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()

    let totalAmount = 0
    for (const record of records) {
      totalAmount += Number(record.amount)
    }

    res.render('index', { records, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
