const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'shop',
  database: 'shop_db',
  password: 'shop'
})

module.exports = pool.promise()
