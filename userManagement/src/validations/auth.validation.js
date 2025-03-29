const Joi = require('joi');

const createUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().min(6),
  })
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

module.exports = {
  createUserSchema,
  loginSchema
};
