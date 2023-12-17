import { type IProduct } from '.'

const path = require('path')

const Cart = require('../models/cart')

const getProductFilePath = (): string => (path.join(path.dirname(require.main?.filename), 'data', 'products.json'))

const getProductsFromFile = async (): Promise<IProduct[]> => {
  return await Bun.file(getProductFilePath()).json()
}

module.exports = class Product implements IProduct {
  id: string | undefined
  title: string
  imageUrl: string
  description: string
  price: number
  deletedAt: string | undefined
  constructor (title: string, imageUrl: string, price: number, description: string, id?: string, deletedAt?: string) {
    this.id = id ?? crypto.randomUUID()
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
    this.deletedAt = deletedAt
  }

  async save (): Promise<void> {
    let productsFile: IProduct[] = []
    productsFile = await getProductsFromFile()
    const productIndex = productsFile.findIndex((p) => p.id === this.id)
    if (productIndex !== -1) {
      const updatedProducts = [...productsFile]
      if (productIndex !== -1) {
        updatedProducts[productIndex] = { ...this }
      }
      productsFile = updatedProducts
    } else {
      productsFile.push(this)
    }
    await Bun.write(getProductFilePath(), JSON.stringify(productsFile))
  }

  static async fetchAll (): Promise<IProduct[]> {
    return (await getProductsFromFile()).filter((p) => p.deletedAt === undefined)
  }

  static async fetch (productId: string): Promise<IProduct | undefined> {
    return (await this.fetchAll()).find((product: IProduct) => product.id === productId)
  }

  static async remove (id: string): Promise<void> {
    const products: IProduct[] = await getProductsFromFile()
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex !== -1) {
      const updatedProducts = [...products]
      updatedProducts[productIndex] = { ...products[productIndex], deletedAt: new Date().toISOString() }
      await Bun.write(getProductFilePath(), JSON.stringify(updatedProducts)).then(() => {
        Cart.delete(id, products[productIndex].price)
      })
    }
  }
}
