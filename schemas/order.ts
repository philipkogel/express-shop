import { type Model, type Mongoose } from 'mongoose'
const mongoose: Mongoose = require('mongoose')

interface IOrder {
  products: Array<{ product: string, quantity: number }>
  user: {
    userId: string
    name: string
    email: string
  }
}

type CartModel = Model<IOrder, unknown>

const OrderSchema = new mongoose.Schema<IOrder, CartModel>({
  products: {
    type: [
      {
        product: {
          type: Object,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        }
      }],
    required: true
  },
  user: {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
})

module.exports = OrderSchema
