const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller.js');
const validator = require('../middlewares/validator.middleware');
const { authenticate } = require('../middlewares/authControl.middleware');
const salesValidation = require('../validations/sales.validation.js');

router.post(
    '/create', 
    validator(salesValidation.createSaleSchema),
    authenticate,
    salesController.createSale
);

// router.get(
//     '/list',
//     authenticate,
//     validator(salesValidation.getSales),
//     salesController.getSales
// );

router.put(
    '/:saleId',
    authenticate,
    validator(salesValidation.updateSaleSchema),
    salesController.updateSale
);

module.exports = router;