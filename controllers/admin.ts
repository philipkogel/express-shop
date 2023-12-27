import { type Request, type Response } from 'express'
import { type TProduct } from '../models'

const AdminProduct = require('../models/admin-product')

exports.getAddProductPage = (req: Request, res: Response) => {
  const editMode = req.query.edit
  res.render('pages/admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editMode
  })
}

exports.getEditProductPage = async (req: Request, res: Response) => {
  const product = await AdminProduct.findById(req.params.id, req.user.id)
  if (product) {
    const editMode = req.query.edit
    res.render('pages/admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode,
      product
    })
  } else {
    res.redirect('/')
  }
}

exports.postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description } = req.body
  const { id } = req.user
  new AdminProduct({
    title,
    price,
    imageUrl,
    description,
    userId: id
  }).save().then(() => { res.redirect('/admin/products') })
}

exports.postEditProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description, id } = req.body
  new AdminProduct({
    _id: id,
    title,
    price,
    imageUrl,
    description,
    userId: req.user.id
  }).update()
    .then(() => { res.redirect('/admin/products') })
}

exports.getProductsPage = async (req: Request, res: Response) => {
  const { id } = req.user
  AdminProduct.findAll(id)
    .then((products: TProduct[]) => {
      res.render('pages/admin/product-list', {
        docTitle: 'Admin Products',
        path: '/admin/products',
        products,
        isAdmin: true
      })
    })
    .catch((err: any) => { console.log(err) })
}

exports.postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body
  await AdminProduct.delete(id)
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}
