import { type Router } from 'express'

const express = require('express')

const authController = require('../controllers/auth')

const router: Router = express.Router()

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post('/logout', authController.postLogout)

module.exports = router
