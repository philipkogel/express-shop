import { Router } from "express";

const express = require('express');

const productsController = require('../controllers/products');

const router: Router = express.Router();

router.get('/add-product', productsController.getAddProductPage);

router.post('/add-product', productsController.postAddProduct)

module.exports = router;

