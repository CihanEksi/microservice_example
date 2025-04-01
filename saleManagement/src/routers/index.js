const express = require('express');
const router = express.Router();
const salesRoutes = require('./sales.router.js');
// const companyRoutes = require('./company.router');
// const customerNotesRoutes = require('./customerNotes.router.js');

router.use('/sales', salesRoutes);
// router.use('/company', salesRoutes);
// router.use("/customer-notes", customerNotesRoutes);

module.exports = router;
