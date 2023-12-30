import { type ICartProduct } from '.'
const getDb = require('../util/mongo-db').getDb

const ORDERS_COLLECTION = process.env.MONGO_ORDERS_COLLECTION

class Order {
  constructor (userId: string) {
    this.userId = userId
    this.products = []
    this._id = null
  }

  userId: string
  _id: string | null
  products: ICartProduct[]

  async getOrders (): Promise<any> {
    const db = getDb()
    try {
      return db.collection(ORDERS_COLLECTION).find({ userId: this.userId }).toArray()
    } catch (err: unknown) {
      console.log(err)
    }
  }

  static async create (cart: any): Promise<any> {
    const db = getDb()
    try {
      const products = await cart.getProducts()
      return db.collection(ORDERS_COLLECTION).insertOne({
        userId: cart.userId,
        products,
        createdAt: new Date().toLocaleDateString()
      })
        .then(async (order: any) => {
          await cart.clear()
          return order
        })
    } catch (err: unknown) {
      console.log(err)
    }
  }
}

module.exports = Order
