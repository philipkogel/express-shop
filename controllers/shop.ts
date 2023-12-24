import { type Request, type Response } from 'express'
import { type ICartProduct, type ICart, type IProduct } from '../models'
import { type Model } from 'sequelize'

const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndexPage = async (req: Request, res: Response) => {
  await Product.findAll()
    .then((products: IProduct[]) => {
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
    .then((products: IProduct[]) => {
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
  const product = await Product.findByPk(req.params.id)
    .catch((err: any) => { console.log(err) })
  if (product) {
    res.render('pages/shop/product-detail', {
      docTitle: `Product - ${product.title}`,
      path: `/products/${product.id}`,
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
        cart.addProduct(prod)
      }
    })
    .then(() => { res.redirect('/cart') })
    .catch((err: Error) => { console.log(err) })
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
