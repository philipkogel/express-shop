import { Request, Response } from "express";

const Product = require('../models/product');

exports.getAddProductPage = (req: Request, res: Response) => {
  const editMode = req.query.edit;
  res.render('pages/admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editMode: editMode,
  });
}

exports.getEditProductPage = async (req: Request, res: Response) => {
  const product = await Product.fetch(req.params.id);
  if (!product) {
    res.redirect('/');
  }
  const editMode = req.query.edit;
  res.render('pages/admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/edit-product',
    editMode: editMode,
    product: product,
  });
}

exports.postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
}

exports.postEditProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description, id } = req.body;
  const product = new Product(title, imageUrl, price, description, id);
  product.save();
  res.redirect('/admin/products');
}

exports.getProductsPage = async (req: Request, res: Response) => {
  res.render('pages/admin/product-list', {
    docTitle: 'Admin Products',
    path: '/admin/products',
    products: await Product.fetchAll(),
    isAdmin: true,
  });
}

