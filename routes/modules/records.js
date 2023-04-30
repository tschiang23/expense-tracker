const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { recordValidator } = require('../../middleware/validator')

router.get('/new', async (req, res) => {
  const categories = await Category.find({}).lean()
  res.render('new', { categories })
})

// 新增一筆支出
router.post('/', recordValidator, async (req, res) => {
  try {
    const userId = req.user._id

    const recordData = Object.assign({ userId }, req.body)
    await Record.create(recordData)
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
    const foundRecord = await Record.findOne({ _id, userId }).populate('categoryId').lean()
    const categoryName = foundRecord.categoryId.name
    const categories = await Category.find({}).lean()
    res.render('edit', { foundRecord, categories, categoryName })
  } catch (err) {
    console.log(err)
  }
})

// 編輯一筆資料
router.put('/:id', recordValidator, async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id

    let foundRecord = await Record.findOne({ _id, userId })
    foundRecord = Object.assign(foundRecord, req.body)

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
