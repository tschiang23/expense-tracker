const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const foundRecords = await Record.find({ userId })
      .populate('categoryId')
      .lean()

    // 將所有`amount`欄位加總起來，並存放在`total`欄位
    const totalAmount = await Record.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ])

    res.render('index', { records: foundRecords, totalAmount: totalAmount[0].total })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
