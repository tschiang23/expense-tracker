const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categories = require('../../config/getCategory')

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

    req.flash('success_msg', '成功新增一筆支出')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 瀏覽一筆資料
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    let foundRecord = await Record.findOne({ _id, userId }).lean()
    foundRecord.date = foundRecord.date.toISOString().slice(0, 10)
    res.render('edit', { foundRecord })
  } catch (err) {
    console.log(err)
  }
})

// 編輯一筆資料
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    let { name, date, category, amount } = req.body
    name = name.trim()
    amount = amount.trim()

    if (!name.length || !amount.length) {
      req.flash('warning_msg', '欄位不能為空白')
      return res.redirect(`/records/${_id}/edit`)
    }
    amount = Number(amount)

    const foundCategory = await Category.findOne({ name: category })
    const categoryId = foundCategory._id
    let foundRecord = await Record.findOne({ _id, userId })
    foundRecord.set({
      name,
      date,
      category,
      amount,
      categoryId,
    })

    await foundRecord.save()

    req.flash('success_msg', '編輯成功')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 刪除一筆資料
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    await record.remove()
    req.flash('success_msg', '成功刪除資料')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
