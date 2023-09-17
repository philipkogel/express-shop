import { Router, Request, Response, NextFunction } from "express";

const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router: Router = express.Router();

const products: any = [];

router.get('/add-product', (req: Request, res: Response, next: NextFunction) => {
  res.render('pages/add-product', {
    docTitle: 'Add Product'
  });
});

router.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  products.push({ title: req.body.title })
  res.redirect('/');
})

exports.routes = router;
exports.products = products;
