import { type Model, type Mongoose } from 'mongoose'
import { type ICartProduct, type TProduct } from '../models'
const mongoose: Mongoose = require('mongoose')

interface ICart {
  items: ICartProduct[]
  userId: string
}

interface ICartMethods {
  addItem: (product: TProduct) => any
  getProducts: () => TProduct[]
}

type CartModel = Model<ICart, unknown, ICartMethods>

const CartSchema = new mongoose.Schema<ICart, CartModel, ICartMethods>({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
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
  }
})

CartSchema.method('addItem', function (product: TProduct): any {
  const cartProdIdIndex = this.items.findIndex((p) => p.productId.toString() === product._id?.toString())
  const quantity = 1
  const updatedCartItems = [...this.items]
  if (cartProdIdIndex > -1) {
    updatedCartItems[cartProdIdIndex].quantity = this.items[cartProdIdIndex].quantity + 1
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity
    })
  }
  this.items = updatedCartItems
  try {
    return this.save()
  } catch (err: unknown) {
    console.log(err)
  }
})

CartSchema.method('getProducts', function (): any {
  return this.populate('items.productId')
    .then((products: any) => products.items)
})

module.exports = CartSchema
