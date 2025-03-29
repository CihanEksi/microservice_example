const Joi = require('joi');
const userEnum = require('../enums/user.enums');

const updateUser = Joi.object({
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

const getUsers = Joi.object({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    keyword: Joi.string(),
    sortBy: Joi.string().valid('createdAt', 'name', 'email'),
    orderBy: Joi.string().valid('asc', 'desc')
  })
});

const getUserById = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  })
});

const deleteUser = Joi.object({
  params: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = {
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
};
