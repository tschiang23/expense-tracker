if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/db')
const Category = require('../categorySchema')

const CATEGORY = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid',
}

db.once('open', async () => {
  for (const property in CATEGORY) {
    await Category.create({
      name: property,
      icon: CATEGORY[property],
    })
  }

  process.exit()
})
