import { type Router } from 'express'

const express = require('express')

const shopController = require('../controllers/shop')

const router: Router = express.Router()

router.get('/', shopController.getIndexPage)

router.get('/products', shopController.getProductsPage)

router.get('/products/:id', shopController.getProductPage)

router.get('/cart', shopController.getCartPage)

router.post('/cart', shopController.postCart)

router.get('/checkout', shopController.getCheckoutPage)

router.get('/orders', shopController.getOrdersPage)

module.exports = router
