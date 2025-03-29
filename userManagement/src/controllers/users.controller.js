const userService = require('../services/users.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');


const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query;

  const users = await userService.getAllUsers(query);

  res.status(200).json(users);
});


const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await userService.getUserById(userId);

  res.status(200).json(user);
});


const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  await userService.updateUser(userId, updateData);

  res.status(204).json();
});


const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  await userService.deleteUser(userId);

  res.status(204).json();
});


const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await userService.getUserById(userId);

  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
};
