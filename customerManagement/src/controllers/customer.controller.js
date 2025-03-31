const customerService = require('../services/customer.service.js');
const companyService = require('../services/company.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');


const createCustomer = asyncHandler(async (req, res) => {
  const body = req.body;

  const newCustomer = await customerService.createCustomer(body);
  const customerId = newCustomer.customer.customerId;
  const customer = await customerService.getCustomerById(customerId);

  res.status(201).json(customer);
});

const getCustomers = asyncHandler(async (req, res) => {
  const query = req.query;

  const users = await customerService.getCustomers(query);

  res.status(200).json(users);
});


const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await customerService.getUserById(userId);

  res.status(200).json(user);
});


const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  
  await customerService.updateCustomer(id, updateData);

  res.status(204).json();
});


const deleteCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;

  await customerService.deleteCustomer(customerId);

  res.status(204).json();
});




module.exports = {
  createCustomer,
  getCustomers,
  getUserById,
  updateCustomer,
  deleteCustomer,
};
