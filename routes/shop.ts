import { Router } from "express";

const express = require('express');

const shopController = require('../controllers/shop');

const router: Router = express.Router();

router.get('/', shopController.getIndexPage);

router.get('/products', shopController.getProductsPage);

router.get('/cart', shopController.getCartPage);

router.get('/checkout', shopController.getCheckoutPage);

module.exports = router;