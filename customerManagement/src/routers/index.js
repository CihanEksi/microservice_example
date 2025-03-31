const express = require('express');
const router = express.Router();
const customerRoutes = require('./customer.router');
const companyRoutes = require('./company.router');
const customerNotesRoutes = require('./customerNotes.router.js');

router.use('/customer', customerRoutes);
router.use('/company', companyRoutes);
router.use("/customer-notes", customerNotesRoutes);

module.exports = router;
