const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const CartItem = sequelize.define('cartItem', {
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

module.exports = CartItem
