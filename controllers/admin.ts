import { type Request, type Response } from 'express'

const Product = require('../models/product')

exports.getAddProductPage = (req: Request, res: Response) => {
  const editMode = req.query.edit
  res.render('pages/admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editMode
  })
}

exports.getEditProductPage = async (req: Request, res: Response) => {
  const product = await Product.fetch(req.params.id)
  if (product === undefined) {
    res.redirect('/')
  }
  const editMode = req.query.edit
  res.render('pages/admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/edit-product',
    editMode,
    product
  })
}

exports.postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description } = req.body
  Product.create({
    title,
    price,
    imageUrl,
    description
  }).then(() => { res.redirect('/') }).catch((err: Error) => { console.log(err) })
}

exports.postEditProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description, id } = req.body
  const product = new Product(title, imageUrl, price, description, id)
  product.save().then().catch((err: Error) => { console.log(err) })
  res.redirect('/admin/products')
}

exports.getProductsPage = async (req: Request, res: Response) => {
  res.render('pages/admin/product-list', {
    docTitle: 'Admin Products',
    path: '/admin/products',
    products: await Product.fetchAll(),
    isAdmin: true
  })
}

exports.postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body
  console.log(id)
  await Product.remove(id)
  res.redirect('/admin/products')
}
