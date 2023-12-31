export interface TProduct {
  _id: string
  title: string
  imageUrl: string
  description: string
  price: number
  createdAt: string
}

export type TAdminProduct = TProduct & {
  userId: string
}

interface ICartProduct {
  productId: string
  quantity: number
}

export interface ICart {
  products: ICartProduct[]
  totalPrice: number
}
