const router = require('express').Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { body, validationResult } = require('express-validator');

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', [
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
    .custom(async (email) => {
      const foundUser = await User.findOne({ email })
      if (foundUser) {
        throw new Error('Email已經被註冊')
      }
    })
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
    })
], async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body

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

    const hash = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hash,
    })
    req.flash('success_msg', '帳號註冊成功')
    res.redirect('/users/register')
  } catch (err) {
    console.log(err)
  }
})

// logout
router.get('/logout', (req, res) => {
  req.logOut(() => {
    req.flash('success_msg', '你已經成功登出。')
    return res.redirect('/users/login')
  })
})

module.exports = router
