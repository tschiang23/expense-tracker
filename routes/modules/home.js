const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const foundRecords = await Record.find({ userId })
      .sort({ _id: 'desc' })
      .lean()

    const categories = await Category.find({}).lean()

    let totalAmount = 0

    const records = []
    for (const record of foundRecords) {
      totalAmount += record.amount
      const foundCategory = categories.find(
        (category) => String(category._id) === String(record.categoryId)
      )
      record.icon = foundCategory.icon
      record.date = record.date.toISOString().slice(0, 10)
      records.push(record)
    }

    res.render('index', { records, totalAmount, categories })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
