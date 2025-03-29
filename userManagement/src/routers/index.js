const express = require('express');
const router = express.Router();
const userRoutes = require('./users.router');
const authRoutes = require('./auth.router');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
