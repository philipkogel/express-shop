import { type Request, type Response } from 'express'
import { type TProduct } from '../models'

const mongodb = require('mongodb')
const Product = require('../models/product')

exports.getIndexPage = async (req: Request, res: Response) => {
  await Product.findAll()
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

exports.getProductsPage = async (req: Request, res: Response) => {
  await Product.findAll()
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
  req.user.getCart().then(async (cart: any) => {
    const cartProducts = await cart.getProducts()
    res.render('pages/shop/cart', {
      docTitle: 'Cart',
      path: '/cart',
      cartProducts
    })
  })
    .catch((err: Error) => { console.log(err) })
}

exports.postCart = async (req: Request, res: Response) => {
  const productId = req.body.productId
  req.user.getCart()
    .then(async (cart: any) => {
      const cartProducts = await cart.getProducts({ where: { id: productId } })
      if (cartProducts.length > 0) {
        const prod = cartProducts[0]
        const quantity = prod.cartItem.quantity + 1
        await cart.addProduct(prod, { through: { quantity } })
      } else {
        const prod = await Product.findByPk(productId)
        await cart.addProduct(prod)
      }
    })
    .then(() => { res.redirect('/cart') })
    .catch((err: Error) => { console.log(err) })
}

exports.postCartDeleteItem = async (req: Request, res: Response) => {
  const productId = req.body.productId
  req.user.getCart().then(async (cart: any) => {
    const products = await cart.getProducts({ where: { id: productId } })
    if (products.length > 0) {
      await products[0].cartItem.destroy()
    }
  })
    .then(() => { res.redirect('/cart') })
    .catch((err: any) => { console.log(err) })
}

exports.getCheckoutPage = async (req: Request, res: Response) => {
  res.render('pages/shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout',
    products: await Product.fetchAll()
  })
}

exports.getOrdersPage = async (req: Request, res: Response) => {
  req.user.getOrders({ include: ['products'] })
    .then((orders: any[]) => {
      res.render('pages/shop/orders', {
        docTitle: 'Your Orders',
        path: '/orders',
        orders
      })
    })
    .catch((err: Error) => { console.log(err) })
}

exports.postOrder = async (req: Request, res: Response) => {
  req.user.getCart().then(async (cart: any) => {
    const products = await cart.getProducts()
    const newOrder = await req.user.createOrder()
    await newOrder.addProducts(products.map((product: any) => {
      product.orderItem = { quantity: product.cartItem.quantity }
      return product
    }))
    await cart.setProducts(null)
    res.redirect(`/orders/${newOrder.id}`)
  })
    .catch((err: Error) => { console.log(err) })
}
