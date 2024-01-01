import { type Mongoose } from 'mongoose'

const mongoose: Mongoose = require('mongoose')

const cartSchema = require('../schemas/cart')

module.exports = mongoose.model('Cart', cartSchema)
