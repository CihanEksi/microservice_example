const Joi = require('joi');
const customerEnum = require('../enums/customer.enums');

const createCustomer = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string().allow(null).optional(),
    phone: Joi.string().optional(),
  })
});

const updateCustomer = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    company: Joi.string().allow(null).optional(),
    phone: Joi.string().optional(),
  })
});

const getCustomers = Joi.object({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    companyName: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
    sortBy: Joi.string().valid('createdAt', 'name', 'email', 'phone', 'companyName'),
    orderBy: Joi.string().valid('asc', 'desc'),
    id: Joi.string().optional(),
  })
});

const getCustomerById = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  })
});

const deleteCustomer = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById,
  deleteCustomer,
};
