import { type Request, type Response } from 'express'
import { type ICartProduct, type ICart, type IProduct } from '../models'

const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndexPage = async (req: Request, res: Response) => {
  res.render('pages/shop/index', {
    docTitle: 'Fancy Shop',
    path: '/',
    products: await Product.fetchAll(),
    isAdmin: false
  })
}

exports.getProductsPage = async (req: Request, res: Response) => {
  res.render('pages/shop/product-list', {
    docTitle: 'Products',
    path: '/products',
    products: await Product.findAll(),
    isAdmin: false
  })
}

exports.getProductPage = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id)
  if (product) {
    res.render('pages/shop/product-detail', {
      docTitle: `Product - ${product.title}`,
      path: `/products/${product.id}`,
      product,
      isAdmin: false
    })
  }
}

exports.getCartPage = async (req: Request, res: Response) => {
  const cart: ICart = await Cart.fetch()
  const products: IProduct[] = await Product.fetchAll()
  const cartProducts: Array<{ productData: IProduct, qty: number }> = []
  for (const product of products) {
    const cartProductData = cart.products.find((prod: ICartProduct) => prod.id === product.id)
    if (cartProductData) {
      cartProducts.push({ productData: product, qty: cartProductData.qty })
    }
  }
  res.render('pages/shop/cart', {
    docTitle: 'Cart',
    path: '/cart',
    cartProducts
  })
}

exports.postCart = async (req: Request, res: Response) => {
  const productId = req.body.productId
  const product = await Product.fetch(productId)
  if (product) {
    await Cart.add(product.id, product.price)
  }
  res.redirect('/cart')
}

exports.postCart = async (req: Request, res: Response) => {
  const productId = req.body.productId
  const product = await Product.fetch(productId)
  if (product) {
    await Cart.add(product.id, product.price)
  }
  res.redirect('/cart')
}

exports.postCartDeleteItem = async (req: Request, res: Response) => {
  const productId = req.body.productId
  const product = await Product.fetch(productId)
  if (product) {
    Cart.delete(productId, product.price)
  }

  res.redirect('/cart')
}

exports.getCheckoutPage = async (req: Request, res: Response) => {
  res.render('pages/shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout',
    products: await Product.fetchAll()
  })
}

exports.getOrdersPage = async (req: Request, res: Response) => {
  res.render('pages/shop/orders', {
    docTitle: 'Orders',
    path: '/orders'
  })
}
