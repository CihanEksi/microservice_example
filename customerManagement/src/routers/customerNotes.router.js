const express = require('express');
const router = express.Router();
const customerNotesController = require('../controllers/customerNotes.controller.js');
const validator = require('../middlewares/validator.middleware.js');
const { authenticate } = require('../middlewares/authControl.middleware.js');
const customerNotesValidation = require('../validations/customerNotes.validation.js');

router.post(
    '/:customerId/create', 
    validator(customerNotesValidation.createCustomerNote),
    authenticate,
    customerNotesController.createCustomerNote
);

router.put(
    '/:customerNoteId',
    authenticate,
    validator(customerNotesValidation.updateCustomerNote),
    customerNotesController.updateCustomerNote
);

router.delete(
    '/:customerNoteId', 
    authenticate,
    validator(customerNotesValidation.deleteCustomerNote), 
    customerNotesController.deleteCustomerNote
);

module.exports = router;