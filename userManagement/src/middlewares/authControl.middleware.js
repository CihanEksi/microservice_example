const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const middlewareError = require('../errors/middleware.errors');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return middlewareError('AUTHORIZATION_INVALID', res);
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ _id: decoded.userId }).select('-password').lean();

    if (!user) {
      return middlewareError('USER_NOT_FOUND', res);
    }

    if (!user.isActive) {
      return middlewareError('USER_INACTIVE', res);
    }
    
    req.user = user
    
    next();
  } catch (error) {
    return middlewareError('AUTHORIZATION_INVALID', res);
  }
};




module.exports = {
  authenticate,
};
