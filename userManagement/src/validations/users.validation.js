const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('user', 'admin'),
  isActive: Joi.boolean()
});

const getUsers = Joi.object({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    keyword: Joi.string(),
    sortBy: Joi.string().valid('createdAt', 'name', 'email'),
    orderBy: Joi.string().valid('asc', 'desc')
  })
});



module.exports = {
  updateUserSchema,
  getUsers,
};
