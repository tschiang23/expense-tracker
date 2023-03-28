const mongooge = require('mongoose')
const categorySchmea = new mongooge.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
})

module.exports = mongooge.model('Category', categorySchmea)
