
// const ErrorHandler = require('../utils/errorHandler');

// module.exports = (err, req, res, next) => {
//   let error = { ...err };
//   error.message = err.message;

//   // Log to console for dev
//   console.log(err);

//   // Wrong Mongoose Object ID Error
//   if (err.name === 'CastError') {
//     const message = 'Resource not found';
//     error = new ErrorHandler(message, 404);
//   }

//   // Handling Mongoose duplicate key errors
//   if (err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//     error = new ErrorHandler(message, 400);
//   }

//   // Handling Mongoose validation error
//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors).map(value => value.message);
//     error = new ErrorHandler(message, 400);
//   }

//   // Handling wrong JWT error
//   if (err.name === 'JsonWebTokenError') {
//     const message = 'JSON Web Token is invalid. Try Again!';
//     error = new ErrorHandler(message, 401);
//   }

//   // Handling Expired JWT error
//   if (err.name === 'TokenExpiredError') {
//     const message = 'JSON Web Token is expired. Try Again!';
//     error = new ErrorHandler(message, 401);
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     message: error.message || 'Internal Server Error'
//   });
// };

import ErrorHandler from '../utils/errorHandler.js';

export default (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Wrong Mongoose Object ID Error
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorHandler(message, 404);
  }

  // Handling Mongoose duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // Handling Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Handling wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON Web Token is invalid. Try Again!';
    error = new ErrorHandler(message, 401);
  }

  // Handling Expired JWT error
  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token is expired. Try Again!';
    error = new ErrorHandler(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
};