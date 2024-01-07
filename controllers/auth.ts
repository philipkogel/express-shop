import { type Request, type Response } from 'express'

exports.getLogin = (req: Request, res: Response) => {
  res.render('pages/auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: req.session.isAuthenticated
  })
}

exports.postLogin = (req: Request, res: Response) => {
  req.session.isAuthenticated = true
  res.redirect('/')
}
