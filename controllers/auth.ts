import { type Request, type Response } from 'express'

exports.getLogin = (req: Request, res: Response) => {
  res.status(404).render('pages/auth/login', {
    docTitle: 'Login',
    path: '/login'
  })
}
