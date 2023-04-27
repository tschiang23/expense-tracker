if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
const { seedUser, records } = require('./data')



db.once('open', async () => {
  await Promise.all(
    seedUser.map(async (user) => {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      const newUser = await User.create({ ...user })



      const userRecords = user.collection.map((element) => {
        records[element].userId = newUser._id
        return records[element]
      })


      const newRecords = []
      for (const record of userRecords) {
        const category = await Category.findOne({
          name: record.category,
        }).lean()
        record.categoryId = category._id
        newRecords.push(record)
      }
      await Record.create(newRecords)
    })
  )
  console.log('Create user and records done')
  process.exit()
})
