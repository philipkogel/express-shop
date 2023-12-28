import { type ICart, type TProduct } from '.'

const getDb = require('../util/mongo-db').getDb

const CARTS_COLLECTION = 'carts'

class Cart {
  constructor (userId: string) {
    this.userId = userId
  }

  userId: string

  addItem (product: TProduct): any {
    const db = getDb()
    const updatedCart = { userId: this.userId, items: [{ ...product, quantity: 1 }] }
    try {
      return db.collection(CARTS_COLLECTION).updateOne({ userId: this.userId }, { $set: updatedCart }, { upsert: true })
    } catch (err: unknown) {
      console.log(err)
    }
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
