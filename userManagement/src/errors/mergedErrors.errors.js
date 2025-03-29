const userErrors = require("./user.errors.json")
const authErrors = require("./auth.errors.json")

module.exports = { ...userErrors, ...authErrors }