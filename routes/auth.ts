import { type Router } from 'express'

const express = require('express')

const authController = require('../controllers/auth')

const router: Router = express.Router()

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

module.exports = router
