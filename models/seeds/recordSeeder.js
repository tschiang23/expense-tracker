if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
const records = require('./data')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
  },
]

db.once('open', async () => {
  await Promise.all(
    SEED_USER.map(async (user) => {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      const newUser = await User.create({ ...user })

      const userRecords = []
      for (const record of records) {
        const category = await Category.findOne({
          name: record.category,
        }).lean()
        record.userId = newUser._id
        record.categoryId = category._id
        userRecords.push(record)
      }
      await Record.create(userRecords)
    })
  )
  console.log('Create user and records done')
  process.exit()
})
