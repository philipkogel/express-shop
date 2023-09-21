import { Request, Response } from "express";

const Product = require('../models/product');

exports.getAddProductPage = (req: Request, res: Response) => {
  res.render('pages/admin/add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req: Request, res: Response) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProductsPage = async (req: Request, res: Response) => {
  res.render('pages/shop/product-list', {
    docTitle: 'Admin Products',
    path: '/admin/products',
    products: await Product.fetchAll(),
  });
}