const { ZodError } = require('zod');
const { sendError } = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return sendError(res, 'Validation failed', 400, err.errors);
  }

  if (err.code === 'P2002') {
    return sendError(res, 'Duplicate value violation', 409, err.meta);
  }

  if (err.code === 'P2025') {
    return sendError(res, 'Record not found', 404);
  }

  return sendError(res, err.message || 'Internal server error', err.statusCode || 500);
}

module.exports = errorHandler;
