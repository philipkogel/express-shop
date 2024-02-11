import { type Request, type Response } from 'express'

const User = require('../models/user')

exports.getLogin = (req: Request, res: Response) => {
  res.render('pages/auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: req.session.user
  })
}

exports.postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({
    where: {
      email
    }
  })
  const verified = await user.correctPassword(password)
  if (verified) {
    req.session.user = user
    res.redirect('/')
  }
}

exports.postLogout = (req: Request, res: Response) => {
  req.session.destroy((err: unknown) => {
    console.log(err)
    res.redirect('/')
  })
}

exports.getSignup = (req: Request, res: Response) => {
  res.render('pages/auth/signup', {
    path: '/signup',
    docTitle: 'Signup',
    isAuthenticated: false
  })
}

exports.postSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      password,
      name: email
    }
  })

  if (!created) {
    // TODO: Show error message
    console.log('user already exists!')
  }

  res.redirect('/login')
}
