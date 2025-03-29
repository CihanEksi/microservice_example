const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validator = require('../middlewares/validator.middleware');
const { authenticate } = require('../middlewares/authControl.middleware');
const userValidation = require('../validations/users.validation');

router.get(
    '/list',
    authenticate,
    validator(userValidation.getUsers),
    userController.getAllUsers
);



module.exports = router;