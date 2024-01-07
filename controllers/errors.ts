import { type Request, type Response } from 'express'

exports.get404ErrorPage = (req: Request, res: Response) => {
  res.status(404).render('pages/404', {
    docTitle: 'Page Not Found',
    path: '',
    isAuthenticated: req.session.isAuthenticated
  })
}
