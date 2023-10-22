import { type Router } from 'express'

const express = require('express')

const adminController = require('../controllers/admin')

const router: Router = express.Router()

router.get('/add-product', adminController.getAddProductPage)

router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:id', adminController.getEditProductPage)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

router.get('/products', adminController.getProductsPage)

module.exports = router
