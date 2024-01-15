const bcrypt = require('bcrypt')
const resources = require('./users.resources')
const generateUserToken = require('../../Helpers/generateUserToken')
const createUser = async (req, res, next) => {
  let { name, email, password } = req.body
  let hashPassword = await bcrypt.hash(password, 10)
  try {
    let userCreated = await resources.createUser(name, email, hashPassword)
    if (userCreated) {
      return res.status(200).send({
        status: true,
        msg: "user added successfully!",
      })
    }
    return res.status(500).send({
      status: false,
      msg: "user added failed!",
    })
  } catch (error) {
    console.log("userController@createUser", error)
    next(error)
  }
}
const loginUser = async (req, res, next) => {
  let { email, password } = req.body
  try {
    const userDetails = await resources.findUserWithEmail(email)
    console.log("first", userDetails)
    if (userDetails && userDetails.length) {
      let { name, email } = userDetails[0]
      let userId = userDetails[0].id
      let userPassword = userDetails[0].password
      let authenticated = await bcrypt.compare(password, userPassword)
      if (authenticated) {
        let userToken = generateUserToken({ name, email, userId })
        console.log("user", userToken)
        let tokenAdded = await resources.createToken(userToken.token, userId, userToken.expiresAt)
        if (tokenAdded) {
          return res.status(200).send({
            status: true,
            msg: "user login successfully!",
            payload: {
              token: userToken.token
            }
          })
        }
      }
    }
    return res.status(500).send({
      status: false,
      msg: "user login failed!",
    })
  } catch (error) {
    console.log("userController@loginUser", error)
    next(error)
  }
}
module.exports = { createUser, loginUser }
