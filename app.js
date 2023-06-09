//app.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')
const { engine } = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const PORT = process.env.PORT || 3000

app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./helper/handlebars-helpers'),
  })
)
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})