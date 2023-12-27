import { type TProduct } from '.'
const mongodb = require('mongodb')
const getDb = require('../util/mongo-db').getDb

const PRODUCTS_COLLECTION = 'products'

class Product implements TProduct {
  constructor (prod: TProduct) {
    this.title = prod.title
    this.price = prod.price
    this.imageUrl = prod.imageUrl
    this.description = prod.description
    this._id = prod._id ? prod._id : undefined
    this.createdAt = prod.createdAt
  }

  _id: string | undefined
  createdAt: string
  title: string
  imageUrl: string
  description: string
  price: number

  static findAll (): TProduct[] | undefined {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).find().toArray()
    } catch (err: unknown) {
      console.log(err)
    }
  }

  static async findById (id: string): Promise<TProduct | undefined> {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).findOne({ _id: new mongodb.ObjectId(id) })
    } catch (err: unknown) {
      console.log(err)
    }
  }
}

module.exports = Product
