import { type Mongoose } from 'mongoose'
const mongoose: Mongoose = require('mongoose')

const orderSchema = require('../schemas/order')

module.exports = mongoose.model('Order', orderSchema)
