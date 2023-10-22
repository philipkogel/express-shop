const path = require('path')

const getCartFilePath = (): string => (path.join(path.dirname(require.main?.filename), 'data', 'cart.json'))

const getCartFromFile = async (): Promise<ICart> => {
  const cart = await Bun.file(getCartFilePath()).json()
  return cart ?? { products: [], totalPrice: 0 }
}

interface ICartProduct {
  id: string
  qty: number
}

interface ICart {
  products: ICartProduct[]
  totalPrice: number
}

module.exports = class Cart implements ICart {
  products: ICartProduct[]
  totalPrice: number
  constructor () {
    this.products = []
    this.totalPrice = 0
  }

  static async add (id: string, productPrice: number): Promise<void> {
    const cart = await getCartFromFile()
    const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
    const updatedProduct: ICartProduct = existingProductIndex !== -1
      ? {
          ...cart.products[existingProductIndex],
          qty: cart.products[existingProductIndex].qty + 1
        }
      : {
          id,
          qty: 1
        }
    if (existingProductIndex !== -1) {
      cart.products = [...cart.products]
      cart.products[existingProductIndex] = updatedProduct
    } else {
      cart.products = [...cart.products, updatedProduct]
    }
    cart.totalPrice = cart.totalPrice + +productPrice
    await Bun.write(getCartFilePath(), JSON.stringify(cart))
  }
}
