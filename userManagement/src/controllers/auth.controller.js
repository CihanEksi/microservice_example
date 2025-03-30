const authService = require('../services/auth.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const register = asyncHandler(async (req, res) => {
  const userData = req.body;
  const newUser = await authService.createUser(userData);
  res.status(201).json(newUser);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.status(200).json(result);
});

const jwtCheck = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = {
  register,
  login,
  jwtCheck,
};
