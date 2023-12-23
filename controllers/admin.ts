import { type Request, type Response } from 'express'
import { type IProduct } from '../models'

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
  const product = await Product.findByPk(req.params.id)
    .catch((err: any) => { console.log(err) })
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
  req.user?.createProduct({
    title,
    price,
    imageUrl,
    description
  }).then(() => { res.redirect('/admin/products') }).catch((err: Error) => { console.log(err) })
}

exports.postEditProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description, id } = req.body
  Product.update({ title, imageUrl, price, description }, {
    where: {
      id
    }
  })
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}

exports.getProductsPage = async (req: Request, res: Response) => {
  await Product.findAll()
    .then((products: IProduct[]) => {
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
  Product.destroy({
    where: {
      id
    }
  })
    .then(() => { res.redirect('/admin/products') })
    .catch((err: any) => { console.log(err) })
}
