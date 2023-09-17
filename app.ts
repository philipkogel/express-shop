import { Express, NextFunction, Request, Response } from "express";

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app: Express = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('pages/404', {
    docTitle: 'Page Not Found'
  });
})

app.listen(5000);