const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
// const { ObjectId } = require('mongodb')
const ObjectID = require("bson-objectid");

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const { categoryId } = req.query
    if (!categoryId) return res.redirect('/')

    const categories = await Category.find({}).lean()
    const category = categories.find(category => {
      return category._id.toString() === categoryId
    })

    // populate
    const foundRecords = await Record.find({ userId, categoryId })
      .populate('categoryId')
      .lean()

    // aggregate
    /**
    const foundRecords = await Record.aggregate([

      {
        $lookup: {
          from: "categories",  //要關聯的collection
          localField: "categoryId", //Record 關聯的字串
          foreignField: "_id", //categories關聯的字串
          as: "category"
        }
      },
      {
        $match: {
          $and: [
            { userId },
            { categoryId: ObjectID(categoryId) }
          ]
        }
      },
    ])
*/
    let totalAmount = 0
    if (foundRecords.length) {
      const result = await Record.aggregate([
        {
          $match: {
            $and: [
              { userId },
              { categoryId: ObjectID(categoryId) }
              // { categoryId: foundRecords[0].categoryId._id }
            ]
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        },
      ])

      totalAmount = result[0].total
    }

    res.render('index', { records: foundRecords, totalAmount, categories, categoryName: category.name })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
