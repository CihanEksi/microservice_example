const companyService = require('../services/company.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const createCompany = asyncHandler(async (req, res) => {
  const data = req.body;
  const company = await companyService.createCompany(data);
  res.status(201).json(company);
});

const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await companyService.deleteCompany(id);
  res.status(204).json(result);
});

const list = asyncHandler(async (req, res) => {
  const query = req.query;
  const companies = await companyService.list(query);
  res.status(200).json(companies);
});

module.exports = {
  createCompany,
  deleteCompany,
  list,
};
