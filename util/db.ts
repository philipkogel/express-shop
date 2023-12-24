const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'shop_db',
  'shop',
  'shop',
  { dialect: 'mysql', host: 'localhost' }
)

module.exports = sequelize
