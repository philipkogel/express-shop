const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = OrderItem
