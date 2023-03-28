const mongooge = require('mongoose')
const recordSchmea = new mongooge.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    min: 0,
  },
  uerID: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    index: true,
    required: true,
  },
  categoryID: {
    type: Schema.Types.ObjectID,
    ref: 'Category',
  },
})

module.exports = mongooge.model('Record', recordSchmea)
