const { body, validationResult } = require('express-validator');
const Category = require('../models/category')

// example 
// exports.register = [
// check('email').isEmail(),
// (req, res, next) => { /* the rest of the existing function */ }
// ]
const userValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('姓名不能為空白')
    .bail() //第一個條件不通過 不繼續檢查
    .isLength({ min: 2, max: 20 }).withMessage('姓名至少需兩個字以上，最多二十個字')
  ,
  body('email')
    .isEmail().withMessage('必須是合法email')
    .bail()
    .isLength({ max: 32 })
  // 通常 validation 的用意是確認輸入的資料是否符合格式（validate, sanitize），因此檢查的部分建議放到後面會比較好
  // .custom(async (email) => {
  //   const foundUser = await User.findOne({ email })
  //   if (foundUser) {
  //     throw new Error('Email已經被註冊')
  //   }
  // })
  ,
  body('password').trim().isLength({ min: 6, max: 32 }).withMessage('密碼長度至少六位'),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      // 確認密碼欄位的值需要和密碼欄位的值相符
      if (value !== req.body.password) {
        // 驗證失敗時的錯誤訊息
        throw new Error('兩次輸入的密碼不相同')
      }
      // 成功驗證回傳 true
      return true
    }),
  (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('register', {
        errors: result.array(),
        name,
        email,
        password,
        confirmPassword,
      })
    }
    next()
  }
]

const recordValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('名稱不能為空白')
    .bail() //第一個條件不通過 不繼續檢查
    .isLength({ min: 2, max: 20 }).withMessage('名稱至少需兩個字以上，最多二十個字'),
  body('date').exists().withMessage('日期為必填'),
  body('categoryId').exists().withMessage('類別為必填'),
  body('amount')
    .trim()
    .notEmpty().withMessage('金額不能為空白')
    .isLength({ max: 10 }).withMessage('金額最多十位'),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const categoryId = req.body.categoryId
      const categories = await Category.find({}).lean()
      const category = categories.find(category => {
        return category._id.toString() === categoryId
      })

      if (!req.params.id) {
        // new
        return res.render('new', {
          errors: result.array(),
          categories,
          ...req.body,
          categoryName: category.name
        })
      } else {
        // edit
        // 合併_id 與req.body 
        const _id = req.params.id
        const recordData = Object.assign({ _id }, req.body)
        return res.render('edit', { errors: result.array(), foundRecord: recordData, categories, categoryName: category.name })
      }
    }
    next()
  }
]

module.exports = { recordValidator, userValidator }