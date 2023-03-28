if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_CATEGORY = {
  家居物業: 'fa-solid fa-house',
  交通出行: 'fa-solid fa-van-shuttle',
  休閒娛樂: 'fa-solid fa-face-grin-beam',
  餐飲食品: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen',
}

db.once('open', async () => {
  for (const property in SEED_CATEGORY) {
    await Category.create({
      name: property,
      icon: SEED_CATEGORY[property],
    })
  }

  process.exit()
})
