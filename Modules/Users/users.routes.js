const express = require('express')
const { createUser, loginUser } = require('./users.controller')
const auth = require('../../Middleware/auth.middleware.js')
const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/test', (req, res) => {
  res.status(200).send({ user: req.user })
})
module.exports = router
