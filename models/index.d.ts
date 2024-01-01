export interface TProduct {
  _id: string
  title: string
  imageUrl: string
  description: string
  price: number
  createdAt: string
}

interface ICartProduct {
  productId: string
  quantity: number
}

export interface ICart {
  products: ICartProduct[]
  totalPrice: number
}
