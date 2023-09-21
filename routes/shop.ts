import { Router, Request, Response, NextFunction } from "express";

const express = require('express');

const productsController = require('../controllers/products');

const router: Router = express.Router();

router.get('/', productsController.getProductsPage);

module.exports = router;