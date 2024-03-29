import { type Express, type Request, type Response } from 'express'
import { type Mongoose } from 'mongoose'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose: Mongoose = require('mongoose')
const session = require('express-session')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

const errorsController = require('./controllers/errors')

const sequelize = require('./util/db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app: Express = express()

const middleware = require('./util/middleware')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: '$ecret',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false,
  proxy: true
}))

app.use((req: Request, _: Response, next) => middleware.cartMiddleware(req, next))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorsController.get404ErrorPage)

sequelize.sync()
  .then(async () => await mongoose.connect('mongodb://shop:root@localhost:27017/shop?authSource=admin'))
  .then(() => app.listen(5000))
  .catch((err: any) => {
    console.log(err)
    throw err
  })
