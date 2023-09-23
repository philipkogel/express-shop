import { Router } from "express";

const express = require('express');

const adminController = require('../controllers/admin');

const router: Router = express.Router();

router.get('/add-product', adminController.getAddProductPage);

router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product', adminController.getAddProductPage);

// router.put('/edit-product', adminController.postAddProduct);

router.get('/products', adminController.getProductsPage);

module.exports = router;
