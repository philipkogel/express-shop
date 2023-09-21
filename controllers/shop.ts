import { Request, Response } from "express";

const Product = require('../models/product');

exports.getIndexPage = async (req: Request, res: Response) => {
  res.render('pages/shop/index', {
    docTitle: 'Fancy Shop',
    path: '/',
    products: await Product.fetchAll(),
  })
}

exports.getProductsPage = async (req: Request, res: Response) => {
  res.render('pages/shop/product-list', {
    docTitle: 'Products',
    path: '/products',
    products: await Product.fetchAll(),
  });
}

exports.getCartPage = async (req: Request, res: Response) => {
  res.render('pages/shop/cart', {
    docTitle: 'Cart',
    path: '/cart',
    products: await Product.fetchAll(),
  });
}

exports.getCheckoutPage = async (req: Request, res: Response) => {
  res.render('pages/shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout',
    products: await Product.fetchAll(),
  });
}
