const errorHandler = (err, req, res, next) => {
  if (err.stack) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};

// export default errorHandler;
module.exports = errorHandler;