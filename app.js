//app.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('./config/db')
const express = require('express')
const app = express()
const routes = require('./routes')
const { engine } = require('express-handlebars')

const PORT = process.env.PORT

db.once('open', () => {
  console.log('mongodb connected')

  app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }))
  app.set('view engine', 'hbs')

  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))

  app.use(routes)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
