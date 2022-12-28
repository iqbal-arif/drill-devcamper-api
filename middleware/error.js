// Import Utils errorResponse
const ErrorResponse = require('../utils/errorResponse');
const colors = require('colors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // log to console for dev
  console.log(err.stack.red.inverse);
  // console.log(err);
  // console.log(err.red);

  //   Mongoose Bad ObjectID
  // console.log(err.name);
  if (err.name === 'CastError') {
    const message = `Non-formatted Id or Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  if (err.name.length === 24) {
    const message = `Formatted ID Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  //   Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = 'Duplicate field entered';
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
