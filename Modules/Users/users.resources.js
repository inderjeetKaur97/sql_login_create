const executeQuery = require('../../Config/db.config')
const createUser = async (name, email, password) => {
  console.log("userResource@createUser")
  try {
    let results = await executeQuery(`
INSERT INTO users (name,email,password)
VALUES (?,?,?)`, [name, email, password])
    if (results)
      return true
    return false
  } catch (error) {
    console.log("userResource@createUser", error)
    return false
  }
}
const findUserWithEmail = (email) => {
  console.log("userResource@findUserWithEmail")
  try {
    let results = executeQuery(`
SELECT * FROM users Where email=?`, [email])
    if (results)
      return results
    return false
  } catch (error) {
    console.log("userResource@findUserWithEmail", error)
    return false
  }
}
const createToken = async (token, userId, expiresAt) => {
  console.log("userResource@createToken")
  try {
    let results = await executeQuery(`
INSERT INTO user_tokens (token,user_id,expired_at)
VALUES (?,?,?)`, [token, userId, expiresAt])
    if (results)
      return true
    return false
  } catch (error) {
    console.log("userResource@createToken", error)
    return false
  }
}
const findUserToken = async (token) => {
  console.log("userResource@findUserToken")
  try {
    let results = await executeQuery(`
SELECT user_id from user_tokens where token =?`, [token])
    if (results)
      return results
    return false
  } catch (error) {
    console.log("userResource@findUserToken", error)
    return false
  }
}
const findUserWithId = async (userId) => {
  console.log("userResource@findUserWithId")
  try {
    let results = await executeQuery(`
SELECT * from users where id =?`, [userId])
    if (results && results.length)
      return results[0]
    return false
  } catch (error) {
    console.log("userResource@findUserWithId", error)
    return false
  }
}
module.exports = {
  createUser,
  createToken,
  findUserWithEmail,
  findUserToken,
  findUserWithId
}
