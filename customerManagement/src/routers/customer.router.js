const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const validator = require('../middlewares/validator.middleware');
const { authenticate } = require('../middlewares/authControl.middleware');
const customerValidation = require('../validations/customer.validation');

router.post(
    '/create', 
    validator(customerValidation.createCustomer),
    authenticate,
    customerController.createCustomer
);

router.get(
    '/list',
    authenticate,
    validator(customerValidation.getCustomers),
    customerController.getCustomers
);

router.put(
    '/:id',
    authenticate,
    validator(customerValidation.updateCustomer),
    customerController.updateCustomer
);

router.delete(
    '/:id', 
    authenticate,
    validator(customerValidation.deleteCustomer), 
    customerController.deleteCustomer
);

module.exports = router;