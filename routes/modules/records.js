const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆支出
router.post('/', async (req, res) => {
  try {
    let { name, date, category, amount } = req.body
    name = name.trim()
    amount = amount.trim()

    if (!name.length || !amount.length) {
      req.flash('warning_msg', '欄位不能為空白')
      return res.render('new', { name, date, category, amount })
    }
    amount = Number(amount)
    const userId = req.user._id
    const foundCategory = await Category.findOne({ name: category })
    const categoryId = foundCategory._id

    await Record.create({
      name,
      date,
      amount,
      category,
      userId,
      categoryId,
    })

    res.render('new')
  } catch (err) {
    console.log(err)
  }
})

// 瀏覽一筆資料
router.get('/:id/edit', async (req, res) => {
  try {
    let foundRecord = await Record.findById({ _id: req.params.id }).lean()
    foundRecord.date = foundRecord.date.toISOString().slice(0, 10)
    res.render('edit', { foundRecord })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
