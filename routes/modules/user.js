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
  })
)

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  let { name, email, password, confirmPassword } = req.body

  try {
    const hash = await bcrypt.hash(password, 10)

    const foundUser = await User.findOne({ email })

    if (foundUser) {
      console.log('Email already exits.')
      return res.render('register')
    }

    if (password !== confirmPassword) {
      console.log('Password incorrect.')
      return res.render('register')
    }

    await User.create({
      name,
      email,
      password: hash,
    })
    res.redirect('/user/register')
  } catch (err) {
    console.log(err)
  }
})

// logout
router.get('/logout', (req, res) => {
  req.logOut(() => {
    res.redirect('/users/login')
  })
})

module.exports = router
