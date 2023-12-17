export interface IProduct {
  id: string | undefined
  title: string
  imageUrl: string
  description: string
  price: number
  deletedAt: string | undefined
}

interface ICartProduct {
  id: string
  qty: number
}

interface ICart {
  products: ICartProduct[]
  totalPrice: number
}
