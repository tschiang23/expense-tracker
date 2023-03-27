const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const foundUser = await User.findOne({ email })
          if (!foundUser) {
            return done(null, false, {
              message: '帳號密碼不正確',
            })
          }

          const checkPassword = await bcrypt.compare(
            password,
            foundUser.password
          )
          if (!checkPassword) {
            return done(null, false, {
              message: '帳號密碼不正確',
            })
          }

          return done(null, foundUser)
        } catch (err) {
          return done(err, null)
        }
      }
    )
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
