const Joi = require('joi');
const userEnum = require('../enums/customer.enums');

const createCustomer = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().min(6),
  })
});

const updateCustomer = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid(...Object.values(userEnum.USER_ROLES)).optional(),
    isActive: Joi.boolean().optional(),
    password: Joi.string().min(6).optional(),
  })
});

const getCustomers = Joi.object({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    keyword: Joi.string(),
    sortBy: Joi.string().valid('createdAt', 'name', 'email'),
    orderBy: Joi.string().valid('asc', 'desc')
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
