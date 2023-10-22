import { type Request, type Response } from 'express'

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
    products: await Product.fetchAll(),
    isAdmin: false
  })
}

exports.getProductPage = async (req: Request, res: Response) => {
  const product = await Product.fetch(req.params.id)
  if (product !== undefined) {
    res.render('pages/shop/product-detail', {
      docTitle: `Product - ${product.title}`,
      path: `/products/${product.id}`,
      product,
      isAdmin: false
    })
  }
}

exports.getCartPage = async (req: Request, res: Response) => {
  res.render('pages/shop/cart', {
    docTitle: 'Cart',
    path: '/cart',
    products: await Product.fetchAll()
  })
}

exports.postCart = async (req: Request, res: Response) => {
  const productId = req.body.productId
  const product = await Product.fetch(productId)
  if (product !== undefined) {
    await Cart.add(product.id, product.price)
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
