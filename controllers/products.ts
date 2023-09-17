import { NextFunction, Request, Response } from "express";

const products: any = [];

exports.getAddProductPage = (req: Request, res: Response) => {
  res.render('pages/add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  products.push({ title: req.body.title })
  res.redirect('/');
}

exports.getProductsPage = (req: Request, res: Response, next: NextFunction) => {
  res.render('pages/shop', {
    docTitle: 'My Shop',
    path: '/',
    products: products
  });
}
