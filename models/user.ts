const { v4: uuidv4 } = require('uuid')
const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User
