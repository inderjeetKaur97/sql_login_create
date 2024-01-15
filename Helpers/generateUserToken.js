const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../Config/env.config')
const generateUserToken = (data) => {
  token = jwt.sign(data, config.TOKEN_SECRET_KEY, { expiresIn: `${config.TOKEN_EXPIRES_IN}h` })
  const currentDate = moment();
  // Add 2 hours to the date
  let expiresAt = currentDate.add(config.TOKEN_EXPIRES_IN, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  return { token, expiresAt }
}
module.exports = generateUserToken
