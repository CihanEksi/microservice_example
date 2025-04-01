const Joi = require('joi');
const saleEnums = require('../enums/sale.enums');

const createSaleSchema = Joi.object({
  body: Joi.object({
    customerId: Joi.string().required(),
    totalAmount: Joi.number().min(0).optional(),
    note: Joi.string().optional(),
    date: Joi.date().optional(),
  })
});

const updateSaleSchema = Joi.object({
  params: Joi.object().keys({
    saleId: Joi.string().required()
  }),
  body: Joi.object({
    status: Joi.string().valid(...Object.values(saleEnums.SALE_STATUS)).optional(),
    totalAmount: Joi.number().min(0).allow(null).required(),
    note: Joi.string().optional(),
    date: Joi.date().optional(),
  })
});

module.exports = {
  createSaleSchema,
  updateSaleSchema,
};
