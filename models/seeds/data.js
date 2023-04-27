const seedUser = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    collection: [0, 1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    collection: [4, 5, 6, 7]
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

module.exports = { seedUser, records }
