const Category = require('../models/category')

let categories = []
Category.find({})
  .lean()
  .then((data) => {
    for (const category of data) {
      categories.push(category)
    }
  })
  .catch((err) => console.log(err))

module.exports = categories
