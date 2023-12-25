const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  }
})

module.exports = Cart
