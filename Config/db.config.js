const mysql = require('mysql2')
const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'narola_test',
  port: 3306,
  host: 'localhost',
  connectionLimit: 10,
  waitForConnections: true
}
const pool = mysql.createPool(dbConfig).promise()

pool.on('connection', () => {
  console.log("New Connection with mysql server established !")
})
const executeQuery = async (query, params) => {
  const connection = await pool.getConnection()
  try {
    const [rows, fields] = await connection.query(query, params)
    return rows
  } catch (error) {
    console.log("error@executeQuery", error)
  } finally {
    connection.release()
  }
}
module.exports = executeQuery
