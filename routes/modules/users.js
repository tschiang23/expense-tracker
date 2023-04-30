const router = require('express').Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { userValidator } = require('../../middleware/validator');

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

router.post('/register', userValidator, async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

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
