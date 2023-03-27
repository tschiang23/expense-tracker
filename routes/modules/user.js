const router = require('express').Router()
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt')

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

module.exports = router
