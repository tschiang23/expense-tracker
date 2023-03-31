const mongooge = require('mongoose')
const userSchmea = new mongooge.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongooge.model('User', userSchmea)
