const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchmea = Schema({
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
  category: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    index: true,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectID,
    ref: 'Category',
  },
})

module.exports = mongoose.model('Record', recordSchmea)
