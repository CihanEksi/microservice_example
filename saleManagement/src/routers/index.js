const express = require('express');
const router = express.Router();
const salesRoutes = require('./sales.router.js');


router.use('/sales', salesRoutes);

module.exports = router;
