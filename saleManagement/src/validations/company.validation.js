const Joi = require('joi');

const createCompanySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
  })
});

const deleteCompanySchema = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = {
  createCompanySchema,
  deleteCompanySchema,
};
