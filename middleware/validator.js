const { body } = require('express-validator');
const checkRecord = [
  body('name')
    .trim()
    .notEmpty().withMessage('名稱不能為空白')
    .bail() //第一個條件不通過 不繼續檢查
    .isLength({ min: 2, max: 20 }).withMessage('名稱至少需兩個字以上，最多二十個字'),
  body('date').exists().withMessage('日期為必填'),
  body('categoryId').exists().withMessage('類別為必填'),
  body('amount')
    .trim()
    .notEmpty().withMessage('金額不能為空白')
    .isLength({ max: 10 }).withMessage('金額最多十位')
]

module.exports = { checkRecord }