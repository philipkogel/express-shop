export interface TProduct {
  _id: string | undefined
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
  id: string
  qty: number
}

export interface ICart {
  products: ICartProduct[]
  totalPrice: number
}
