const { findUserToken, findUserWithEmail, findUserWithId } = require("../Modules/Users/users.resources")

const auth = async (req, res, next) => {
  try {
    let token = req.headers['token']
    let data = await findUserToken(token)
    if (data && data.length) {
      let userId = data[0].user_id
      let user = await findUserWithId(userId)
      if (user)
        req.user = user
      return next()
    }
    return res.status(500).send({ msg: "unauthorised" })
  } catch (error) {
    console.log("middleware@auth", error)
    return next(error)
  }
}
module.exports = auth
