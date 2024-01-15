require('dotenv').config()
const config = {
  APPLICATION_PORT: process.env.APPLICATION_PORT,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
}
module.exports = config
