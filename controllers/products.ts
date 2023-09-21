import { NextFunction, Request, Response } from "express";

const Product = require('../models/product');

exports.getAddProductPage = (req: Request, res: Response) => {
  res.render('pages/add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProductsPage = async (req: Request, res: Response, next: NextFunction) => {
  res.render('pages/shop', {
    docTitle: 'My Shop',
    path: '/',
    products: await Product.fetchAll(),
  });
}
