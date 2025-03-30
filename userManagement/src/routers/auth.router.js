const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validator = require('../middlewares/validator.middleware');
const { authenticate, isAdmin } = require('../middlewares/authControl.middleware');
const { createUserSchema, loginSchema } = require('../validations/auth.validation');

router.post('/register', validator(createUserSchema), authController.register);
router.post('/login', validator(loginSchema), authController.login);
router.get('/jwt', authenticate, authController.jwtCheck);

module.exports = router;