const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categories = require('../../config/getCategory')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const { category } = req.query

    if (!category) return res.redirect('/')
    const foundRecords = await Record.find({ userId, category }).lean()
    let totalAmount = 0

    const records = []
    for (const record of foundRecords) {
      totalAmount += record.amount
      const foundCategory = await Category.findById({ _id: record.categoryId })
      record.icon = foundCategory.icon
      record.date = record.date.toISOString().slice(0, 10)
      records.push(record)
    }

    res.render('index', { records, totalAmount, category })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
