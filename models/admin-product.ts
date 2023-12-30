import { type TProduct, type TAdminProduct } from '.'
const mongodb = require('mongodb')
const getDb = require('../util/mongo-db').getDb

const PRODUCTS_COLLECTION = process.env.MONGO_PRODUCTS_COLLECTION

class AdminProduct implements TAdminProduct {
  constructor (prod: TAdminProduct) {
    this.title = prod.title
    this.price = prod.price
    this.imageUrl = prod.imageUrl
    this.description = prod.description
    this.userId = prod.userId
    this._id = prod._id ? new mongodb.ObjectId(prod._id) : null
    this.createdAt = prod.createdAt ? prod.createdAt : new Date().toDateString()
  }

  _id: string | undefined
  createdAt: string
  userId: string
  id: string | undefined
  title: string
  imageUrl: string
  description: string
  price: number

  save (): TProduct | undefined {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).insertOne(this)
    } catch (err: unknown) {
      console.log(err)
    }
  }

  update (): TProduct | undefined {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).updateOne(
        { _id: this._id, userId: this.userId },
        { $set: this }
      )
    } catch (err: unknown) {
      console.log(err)
    }
  }

  static findAll (userId: string): TProduct[] | undefined {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).find({ userId }).toArray()
    } catch (err: unknown) {
      console.log(err)
    }
  }

  static findById (id: string, userId: string): TProduct | undefined {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).findOne({ _id: new mongodb.ObjectId(id), userId })
    } catch (err: unknown) {
      console.log(err)
    }
  }

  static delete (id: string, userId: string): void {
    const db = getDb()
    try {
      return db.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new mongodb.ObjectId(id), userId })
    } catch (err: unknown) {
      console.log(err)
    }
  }
}

module.exports = AdminProduct
