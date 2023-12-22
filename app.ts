import { type Express } from 'express'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorsController = require('./controllers/errors')
const sequelize = require('./util/db')

const app: Express = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404ErrorPage)

sequelize.sync()
  .then(() => app.listen(5000))
  .catch((err: any) => { console.log(err) })
