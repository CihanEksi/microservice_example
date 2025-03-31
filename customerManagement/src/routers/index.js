const express = require('express');
const router = express.Router();
const customerRoutes = require('./customer.router');
const companyRoutes = require('./company.router');

router.use('/customer', customerRoutes);
router.use('/company', companyRoutes);

module.exports = router;
