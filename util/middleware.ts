import { type Request } from 'express'

const Cart = require('../models/cart')

exports.cartMiddleware = async (req: Request, next: any) => {
  if (req.session.user) {
    const cart = await Cart.findOne({ userId: req.session.user.id })
    req.cart = cart
    if (!req.cart) {
      req.cart = new Cart({
        userId: req.session.user.id,
        items: []
      })
      await req.cart.save()
    }
  }
  next()
}
