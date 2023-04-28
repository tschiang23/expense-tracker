const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const foundRecords = await Record.find({ userId })
      .populate('categoryId')
      .lean()

    const totalAmount = await Record.aggregate([
      {
        $group: {
          _id: null, // 用 欄位做分組
          total: { $sum: "$amount" } // 使用 $sum 把price相加
        }
      }
    ])

    res.render('index', { records: foundRecords, totalAmount: totalAmount[0].total })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
