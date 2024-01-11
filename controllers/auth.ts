import { type Request, type Response } from 'express'

const User = require('../models/user')
const Cart = require('../models/cart')

exports.getLogin = (req: Request, res: Response) => {
  res.render('pages/auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: req.session.user
  })
}

exports.postLogin = (req: Request, res: Response) => {
  User.findAll()
    .then(async (users: any[]) => {
      if (users[0]) {
        req.session.user = users[0]
        req.session.cart = await Cart.findOne({ userId: users[0].id })
        if (!req.cart) {
          req.cart = new Cart({
            userId: users[0].id,
            items: []
          })
          await req.cart.save()
        }
      } else {
        User.create({ email: 'example@email.com', name: 'User1' })
          .then(async (user: any) => {
            req.session.user = user
            req.session.cart = new Cart({
              userId: user.id,
              items: []
            })
            await req.cart.save()
          })
      }
      res.redirect('/')
    })
}

exports.postLogout = (req: Request, res: Response) => {
  req.session.destroy((err: unknown) => {
    console.log(err)
    res.redirect('/')
  })
}
