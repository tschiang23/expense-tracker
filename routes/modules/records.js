const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { validationResult } = require('express-validator');
const { checkRecord } = require('../../middleware/validator')

router.get('/new', async (req, res) => {
  const categories = await Category.find({}).lean()
  res.render('new', { categories })
})

// 新增一筆支出
router.post('/', checkRecord, async (req, res) => {
  try {
    const userId = req.user._id
    const categories = await Category.find({}).lean()
    let { categoryId } = req.body

    categories.forEach((category) => {
      category.selectedCategoryId = categoryId
    })

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('new', {
        errors: result.array(),
        categories,
        ...req.body
      })
    }
    let recordData = Object.assign({ userId }, req.body)
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
    let foundRecord = await Record.findOne({ _id, userId }).lean()
    const categories = await Category.find({}).lean()

    categories.forEach((category) => {
      category.selectedCategoryId = foundRecord.categoryId
    })

    foundRecord.date = foundRecord.date.toISOString().slice(0, 10)
    res.render('edit', { foundRecord, categories })
  } catch (err) {
    console.log(err)
  }
})

// 編輯一筆資料
router.put('/:id', checkRecord, async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    let { categoryId } = req.body

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const categories = await Category.find({}).lean()

      categories.forEach((category) => {
        category.selectedCategoryId = categoryId
      })
      // 合併_id 與req.body 
      let recordData = Object.assign({ _id }, req.body)
      return res.render('edit', { errors: result.array(), foundRecord: recordData, categories })
    }

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
