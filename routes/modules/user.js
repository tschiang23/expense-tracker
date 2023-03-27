const router = require('express').Router()
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt')
const passport = require('passport')

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

router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    let { name, email, password, confirmPassword } = req.body
    const hash = await bcrypt.hash(password, 10)

    const foundUser = await User.findOne({ email })

    const errors = []
    if (foundUser) {
      errors.push({ message: '帳號已經被註冊' })
    }

    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符' })
    }

    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }

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
