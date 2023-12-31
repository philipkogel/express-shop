import { type Mongoose } from 'mongoose'
const mongoose: Mongoose = require('mongoose')

const productSchema = require('../schemas/product')

module.exports = mongoose.model('Product', productSchema)
