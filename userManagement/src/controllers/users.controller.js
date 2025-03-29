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

  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this user' });
  }

  const updateData = req.body;
  const updatedUser = await userService.updateUser(userId, updateData);
  res.status(200).json(updatedUser);
});


const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this user' });
  }

  const result = await userService.deleteUser(userId);
  res.status(200).json(result);
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
