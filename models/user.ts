const Sequelize = require('sequelize')
const crypto = require('crypto')
const cryptoJs = require('crypto-js')
const sequelize = require('../util/db')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    get () {
      return (): string => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get () {
      return (): string => this.getDataValue('salt')
    }
  }
})

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function (plainText: string, salt: string) {
  const hash = cryptoJs.HmacSHA256(plainText, salt)
  return hash.toString(cryptoJs.enc.Hex)
}

const setSaltAndPassword = (user: any): void => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.prototype.correctPassword = function (enteredPassword: string) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}

module.exports = User
