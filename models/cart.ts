const { v4: uuidv4 } = require('uuid')

const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
    allowNull: false
  }
})

module.exports = Cart
