import { type MongoClient } from 'mongodb'

const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

const mongoConnect = (cb: (result: MongoClient) => void): void => {
  mongoClient.connect('mongodb://shop:root@localhost:27017?authSource=admin')
    .then((result: MongoClient) => {
      console.log('CONNECTED TO MONGO')
      cb(result)
    })
    .catch((err: Error) => { console.log(err) })
}

module.exports = mongoConnect
