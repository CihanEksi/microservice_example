const userErrors = require("./user.errors.json")
const authErrors = require("./auth.errors.json")
const systemErrors = require("./system.errors.json")
const customerErrors = require("./customer.errors.json")
const companyErrors = require("./company.errors.json")
const noteErrors = require("./note.errors.json")
const saleErrors = require("./sale.errors.json")

module.exports = { 
    ...userErrors, 
    ...authErrors, 
    ...systemErrors, 
    ...customerErrors,
    ...companyErrors,
    ...noteErrors,
    ...saleErrors
}