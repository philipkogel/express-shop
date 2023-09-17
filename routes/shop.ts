import { Router, Request, Response, NextFunction } from "express";

const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router: Router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(adminData.products)
  res.render('pages/shop', {
    docTitle: 'My Shop',
    products: adminData.products
  });
});

module.exports = router;