import { type Request, type Response } from 'express'
import { type TProduct } from '../models'

const Product = require('../models/product')

exports.getAddProductPage = (req: Request, res: Response) => {
  const editMode = req.query.edit
  res.render('pages/admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editMode,
    isAuthenticated: req.session.user
  })
}

exports.getEditProductPage = async (req: Request, res: Response) => {
  const product = await Product.findOne({ _id: req.params.id, userId: req.session.user.id })
    .catch((err: any) => { console.log(err) })
  if (product) {
    const editMode = req.query.edit
    res.render('pages/admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode,
      product,
      isAuthenticated: req.session.user
    })
  } else {
    res.redirect('/')
  }
}

exports.postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description } = req.body
  const { id } = req.session.user
  new Product({
    title,
    price,
    imageUrl,
    description,
    userId: id
  }).save()
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}

exports.postEditProduct = async (req: Request, res: Response) => {
  const { title, imageUrl, price, description, id } = req.body
  Product.updateOne({ _id: id, userId: req.session.user.id }, { title, imageUrl, price, description })
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}

exports.getProductsPage = async (req: Request, res: Response) => {
  const { id } = req.session.user
  Product.find({ userId: id })
    .then((products: TProduct[]) => {
      res.render('pages/admin/product-list', {
        docTitle: 'Admin Products',
        path: '/admin/products',
        products,
        isAdmin: true,
        isAuthenticated: req.session.user
      })
    })
    .catch((err: any) => { console.log(err) })
}

exports.postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body
  await Product.deleteOne({ _id: id, userId: req.session.user.id })
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}
