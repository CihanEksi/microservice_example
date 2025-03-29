const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

async function createUser(userData) {
  const userExists = await User.findOne({ email: userData.email }).lean();

  if (userExists) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  const user = new User(userData);
  await user.save();

  const userObject = user.toObject();

  return {
    user: {
      userId: userObject._id,
      name: userObject.name,
      email: userObject.email,
    }
  }
}


async function loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("AUTH_FAILED");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("AUTH_FAILED");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

module.exports = {
  createUser,
  loginUser,
};
