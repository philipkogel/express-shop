import { type Express, type Request } from 'express'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorsController = require('./controllers/errors')
const sequelize = require('./util/db')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const app: Express = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// FOR DEVELOPMENT USE DUMMY USER + CART
app.use((req: Request, res, next) => {
  User.findAll()
    .then((users: any[]) => {
      if (users[0]) {
        req.user = users[0]
        next()
      } else {
        User.create({ email: 'example@email.com', name: 'User1' })
          .then((user: any) => {
            req.user = user
            user.createCart()
            next()
          })
      }
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404ErrorPage)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize.sync()
  .then(() => app.listen(5000))
  .catch((err: any) => { console.log(err) })
