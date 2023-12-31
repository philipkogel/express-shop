import { type Request, type Response } from 'express'
import { type TProduct } from '../models'

const Order = require('../models/order')

const Product = require('../models/product')

exports.getIndexPage = (req: Request, res: Response) => {
  Product.find()
    .then((products: TProduct[]) => {
      res.render('pages/shop/index', {
        docTitle: 'Fancy Shop',
        path: '/',
        products,
        isAdmin: false
      })
    })
    .catch((err: any) => { console.log(err) })
}

exports.getProductsPage = (req: Request, res: Response) => {
  Product.find()
    .then((products: TProduct[]) => {
      res.render('pages/shop/product-list', {
        docTitle: 'Products',
        path: '/products',
        products,
        isAdmin: false
      })
    })
    .catch((err: any) => { console.log(err) })
}

exports.getProductPage = async (req: Request, res: Response) => {
  const product: TProduct = await Product.findById(req.params.id)
  if (product) {
    res.render('pages/shop/product-detail', {
      docTitle: `Product - ${product.title}`,
      path: `/products/${product._id}`,
      product,
      isAdmin: false
    })
  } else {
    res.redirect('/')
  }
}

exports.getCartPage = async (req: Request, res: Response) => {
  const cartProducts = await req.cart.getProducts()
  res.render('pages/shop/cart', {
    docTitle: 'Cart',
    path: '/cart',
    cartProducts
  })
}

exports.postCart = async (req: Request, res: Response) => {
  const product = await Product.findById(req.body.productId)
  console.log(req.cart)
  req.cart.addItem(product)
    .then(() => { res.redirect('/cart') })
}

exports.postCartDeleteItem = async (req: Request, res: Response) => {
  const productId = req.body.productId
  req.cart.deleteItem(productId).then(() => { res.redirect('/cart') })
}

exports.getCheckoutPage = async (req: Request, res: Response) => {
  res.render('pages/shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout',
    products: await Product.fetchAll()
  })
}

exports.getOrdersPage = async (req: Request, res: Response) => {
  const orders = await new Order(req.user.id).getOrders()
  res.render('pages/shop/orders', {
    docTitle: 'Your Orders',
    path: '/orders',
    orders
  })
}

exports.postOrder = async (req: Request, res: Response) => {
  const order = await Order.create(req.cart)
  res.redirect(`/orders/${order.insertedId}`)
}
