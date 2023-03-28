const router = require('express').Router()
const Record = require('../../models/recordSchema')
const Category = require('../../models/categorySchema')

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
