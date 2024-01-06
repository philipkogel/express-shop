import { type Request, type Response } from 'express'

exports.getLogin = (req: Request, res: Response) => {
  res.render('pages/auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: req.isAuthenticated
  })
}

exports.postLogin = (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', 'isAuthenticated=true; HttpOnly')
  res.redirect('/')
}
