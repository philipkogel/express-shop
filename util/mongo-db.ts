import { type Db, type MongoClient } from 'mongodb'

const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

let _db: Db

const mongoConnect = (cb: (client: MongoClient) => void): void => {
  mongoClient.connect('mongodb://shop:root@localhost:27017?authSource=admin')
    .then((client: MongoClient) => {
      console.log('Connected to MongoDV')
      _db = client.db('shop')
      cb(client)
    })
    .catch((err: Error) => { console.log(err) })
}

const getDb = (): Db => {
  if (_db) {
    return _db
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw 'No Database Connection.'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
