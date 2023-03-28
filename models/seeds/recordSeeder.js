if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/db')
const Record = require('../recordSchema')
const User = require('../userSchema')
const Category = require('../categorySchema')
const bcrypt = require('bcrypt')

const users = [
  {
    name: 'user1',
    email: 'user1@test.com',
    password: '123456',
  },
]

const records = [
  {
    name: '午餐',
    amount: 100,
    category: '餐飲食品',
  },
  {
    name: '晚餐',
    amount: 100,
    category: '餐飲食品',
  },
  {
    name: '買日用品',
    amount: 200,
    category: '其他',
  },
  {
    name: '租金',
    amount: 1500,
    category: '家居物業',
  },
  {
    name: '計程車',
    amount: 100,
    category: '交通出行',
  },
]

db.once('open', async () => {
  await Promise.all(
    users.map(async (user) => {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      const newUser = await User.create({ ...user })
      console.log('user created')

      const userRecords = []
      for (const record of records) {
        const category = await Category.findOne({ name: record.category })
        record.userId = newUser._id
        record.categoryId = category._id
        userRecords.push(record)
      }
      await Record.create(userRecords)
    })
  )
  console.log('done')
  process.exit()
})
