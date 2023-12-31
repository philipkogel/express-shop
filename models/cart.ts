import { type Mongoose } from 'mongoose'

const mongoose: Mongoose = require('mongoose')

const cartSchema = require('../schemas/cart')

module.exports = mongoose.model('Cart', cartSchema)

// const CARTS_COLLECTION = process.env.MONGO_CART_COLLECTION
// const PRODUCTS_COLLECTION = process.env.MONGO_PRODUCTS_COLLECTION

// class Cart {
//   constructor (userId: string) {
//     this.userId = userId
//     this.items = []
//   }

//   userId: string
//   items: ICartProduct[]

//   addItem (product: TProduct): any {
//     const cartProdIdIndex = this.items.findIndex((p) => p.productId.toString() === product._id?.toString())
//     const quantity = 1
//     const updatedCartItems = this.items
//     if (cartProdIdIndex > -1) {
//       updatedCartItems[cartProdIdIndex].quantity = this.items[cartProdIdIndex].quantity + 1
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity
//       })
//     }
//     const updatedCart = {
//       userId: this.userId,
//       items: updatedCartItems
//     }
//     const db = getDb()
//     try {
//       return db.collection(CARTS_COLLECTION).updateOne({ userId: this.userId }, { $set: updatedCart }, { upsert: true })
//     } catch (err: unknown) {
//       console.log(err)
//     }
//   }

//   async fetch (): Promise<any> {
//     const db = getDb()
//     try {
//       const cart = await db.collection(CARTS_COLLECTION).findOne({ userId: this.userId })
//       this.items = cart.items
//     } catch (err: unknown) {
//       console.log(err)
//     }

//     return this
//   }

//   async getProducts (): Promise<TProduct[] | undefined> {
//     const db = getDb()
//     try {
//       return db.collection(PRODUCTS_COLLECTION)
//         .find({ _id: { $in: this.items.map((i) => i.productId) } })
//         .toArray()
//         .then((products: TProduct[]) => products.map((p) => ({
//           ...p,
//           quantity: this.items.find((i) => i.productId.toString() === p._id?.toString())?.quantity
//         })))
//     } catch (err: unknown) {
//       console.log(err)
//     }
//   }

//   async deleteItem (productId: string): Promise<void> {
//     const db = getDb()
//     try {
//       return db.collection(CARTS_COLLECTION).updateOne({ userId: this.userId }, {
//         $set: {
//           items: this.items.filter((i) => i.productId.toString() !== productId)
//         }
//       })
//     } catch (err: unknown) {
//       console.log(err)
//     }
//   }

//   async clear (): Promise<void> {
//     const db = getDb()
//     try {
//       return db.collection(CARTS_COLLECTION).updateOne({ userId: this.userId }, {
//         $set: {
//           items: []
//         }
//       })
//     } catch (err: unknown) {
//       console.log(err)
//     }
//   }
// }

// module.exports = Cart
