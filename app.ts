import { type Express, type Request } from 'express'
import { type Mongoose } from 'mongoose'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose: Mongoose = require('mongoose')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorsController = require('./controllers/errors')
const sequelize = require('./util/db')
const User = require('./models/user')
const Cart = require('./models/cart')

const app: Express = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// FOR DEVELOPMENT USE DUMMY USER + CART
app.use((req: Request, res, next) => {
  User.findAll()
    .then(async (users: any[]) => {
      if (users[0]) {
        req.user = users[0]
        req.cart = await Cart.findOne({ userId: users[0].id })
        if (!req.cart) {
          req.cart = new Cart({
            userId: users[0].id,
            items: []
          })
          await req.cart.save()
        }
      } else {
        console.log('CREATE USER')
        User.create({ email: 'example@email.com', name: 'User1' })
          .then(async (user: any) => {
            req.user = user
            req.cart = new Cart({
              userId: user.id,
              items: []
            })
            await req.cart.save()
          })
      }
      next()
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404ErrorPage)

sequelize.sync()
  .then(async () => await mongoose.connect('mongodb://shop:root@localhost:27017/shop?authSource=admin'))
  .then(() => app.listen(5000))
  .catch((err: any) => {
    console.log(err)
    throw err
  })
