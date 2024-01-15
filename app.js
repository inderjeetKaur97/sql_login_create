require('dotenv').config();
const express = require('express')
const app = express()
const config = require('./Config/env.config')
const executeQuery = require('./Config/db.config');
(async () => {
  try {
    let result = await executeQuery('show tables;', [])
    console.log(result)
  } catch (error) {
    console.log("error", error)
  }
})()
const userRoutes = require('./Modules/Users/users.routes');
const auth = require('./Middleware/auth.middleware.js');
app.use(auth)
app.use(express.json())

app.use('/user', userRoutes)
app.get('/', (req, res) => {
  res.status(200).send({
    msg: "hello world"
  })
})
app.post('/', (req, res) => {
  let { name, email, msg } = req.body
  res.status(200).send({
    name,
    email,
    msg
  })
})
app.use((err, req, res, next) => {
  console.log("Error : ", err)
  res.status(500).send({
    msg: err.message ? err.message : "internal server error!"
  })
})
app.listen(config.APPLICATION_PORT, () => {
  console.log(`Node application running at port ${config.APPLICATION_PORT}`)
})
