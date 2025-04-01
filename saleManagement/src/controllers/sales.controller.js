const saleService = require('../services/sale.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const createSale = asyncHandler(async (req, res) => {
  const data = req.body;
  const token = req.token;
  const createSale = await saleService.createSale(data, token);
  const saleDetail = await saleService.list({ saleId: createSale.saleId });
  res.status(201).json(saleDetail.sales.at(0));
});

const updateSale = asyncHandler(async (req, res) => {
  const data = req.body;
  const saleId = req.params.saleId;
  await saleService.updateSale(saleId, data);
  res.status(204).json();
});

const getSales = asyncHandler(async (req, res) => {
  const query = req.query;
  const companies = await saleService.list(query);
  res.status(200).json(companies);
});

module.exports = {
  createSale,
  getSales,
  updateSale,
};
