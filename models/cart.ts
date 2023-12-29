import { ObjectId } from 'mongodb'
import { type ICart, type TProduct, type ICartProduct } from '.'

const mongodb = require('mongodb')
const getDb = require('../util/mongo-db').getDb

const CARTS_COLLECTION = 'carts'

class Cart {
  constructor (userId: string) {
    this.userId = userId
    this.items = []
  }

  userId: string
  items: ICartProduct[]

  addItem (product: TProduct): any {
    const cartProdIdIndex = this.items.findIndex((p) => p.productId.toString() === product._id?.toString())
    const quantity = 1
    const updatedCartItems = this.items
    if (cartProdIdIndex > -1) {
      updatedCartItems[cartProdIdIndex].quantity = this.items[cartProdIdIndex].quantity + 1
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity
      })
    }
    const updatedCart = {
      userId: this.userId,
      items: updatedCartItems
    }
    const db = getDb()
    try {
      return db.collection(CARTS_COLLECTION).updateOne({ userId: this.userId }, { $set: updatedCart }, { upsert: true })
    } catch (err: unknown) {
      console.log(err)
    }
  }

  async fetch (): Promise<any> {
    const db = getDb()
    const cart = await db.collection(CARTS_COLLECTION).findOne({ userId: this.userId })
    this.items = cart.items

    return this
  }

  // static async findById (id: string): Promise<TProduct | undefined> {
  //   const db = getDb()
  //   try {
  //     return db.collection(PRODUCTS_COLLECTION).findOne({ _id: new mongodb.ObjectId(id) })
  //   } catch (err: unknown) {
  //     console.log(err)
  //   }
  // }
}

module.exports = Cart
