const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  }
})

module.exports = Order
