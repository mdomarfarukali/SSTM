const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// Check if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token;
  let tokenSource = 'cookie';
  
  // Check for token in Authorization header if not in cookies
  if (!token && req.headers.authorization) {
    if (req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.replace('Bearer ', '');
      tokenSource = 'header (Bearer format)';
    } else {
      token = req.headers.authorization;
      tokenSource = 'header (raw format)';
    }
  }
  
  console.log(`Request path: ${req.method} ${req.originalUrl}`);
  console.log(`Token found: ${!!token} (from ${tokenSource})`);
  console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('Request cookies:', req.cookies);
  console.log('Auth header:', req.headers.authorization);
  
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded.id);
    
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      console.log('User not found with token ID:', decoded.id);
      return next(new ErrorHandler('User not found with this token.', 401));
    }
    
    console.log('User authenticated:', req.user.email);
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return next(new ErrorHandler('Invalid token. Please login again.', 401));
  }
});

// Handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
    }
    next();
  };
};