const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const validator = require('../middlewares/validator.middleware');
const { authenticate } = require('../middlewares/authControl.middleware');
const { createCompanySchema, deleteCompanySchema } = require('../validations/company.validation');

router.post('/create', validator(createCompanySchema), authenticate, companyController.createCompany);
router.delete('/:id', validator(deleteCompanySchema), authenticate, companyController.deleteCompany);
router.get('/list', authenticate, companyController.list);

module.exports = router;
