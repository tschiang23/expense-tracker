const mongooge = require('mongoose')
const categorySchmea = new mongooge.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

module.exports = mongooge.model('Category', categorySchmea)
